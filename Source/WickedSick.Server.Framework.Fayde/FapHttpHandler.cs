using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using log4net;
using WickedSick.Server.XamlParser;
using WickedSick.Server.XamlParser.Elements;
using WickedSick.Server.XamlParser.Elements.Controls;

namespace WickedSick.Server.Framework.Fayde
{
    public class FapHttpHandler : IHttpHandler
    {
        static readonly ILog logger = LogManager.GetLogger(typeof(FapHttpHandler));

        public bool IsReusable { get { return true; } }

        protected string DirectoryResolution { get; set; }
        protected List<string> Includes { get; set; }

        public void ProcessRequest(HttpContext context)
        {
            var fap = GetFaydeApplication(context);
            if (fap == null)
            {
                context.Response.StatusCode = 404;
                return;
            }

            var fragment = context.Request.QueryString["p"];
            if (fragment != null)
            {
                WritePageJson(context.Response.OutputStream, GetPhysicalPath(context, fap, fragment));
            }
            else
            {
#if DEBUG
                var orderFile = FindOrderFile(context.Request.PhysicalApplicationPath);
                Includes = CollectIncludes(orderFile).ToList();
                DirectoryResolution = "";
#endif
                WriteFapFull(fap, context.Response.OutputStream);
            }
        }


        private void WriteFapFull(FaydeApplication fap, Stream stream)
        {
            using (var writer = new FapWriter(stream))
            {
                writer.WriteStart();
                writer.WriteHeadStart();
                writer.WriteScriptIncludes(DirectoryResolution, Includes);
                writer.WriteAppLoadScript(fap);
                writer.WriteHeadEnd();
                writer.WriteBodyStart();
                writer.WriteCanvas();
                writer.WriteBodyEnd();
                writer.WriteEnd();
            }
        }

        private void WritePageJson(Stream stream, string pageLocalPath)
        {
            if (string.IsNullOrWhiteSpace(pageLocalPath))
                return;

            using (var sw = new StreamWriter(stream))
            {
                var page = Parser.Parse(pageLocalPath) as Page;
                sw.Write(page.ToJson(0));
            }
        }


        private FaydeApplication GetFaydeApplication(HttpContext context)
        {
            var request = context.Request;
            var path = request.Url.GetComponents(UriComponents.Path, UriFormat.UriEscaped);
            if (!path.EndsWith(".fap"))
                return null;

            var faps = GetFaydeApplications(context);
            if (faps.ContainsKey(path))
                return faps[path];

            var fap = CreateFap(request);
            faps[path] = fap;
            return fap;
        }

        private Dictionary<string, FaydeApplication> GetFaydeApplications(HttpContext context)
        {
            if (context.Items.Contains("faps"))
                return context.Items["faps"] as Dictionary<string, FaydeApplication>;
            var dict = new Dictionary<string, FaydeApplication>();
            context.Items["faps"] = dict;
            return dict;
        }

        private FaydeApplication CreateFap(HttpRequest request)
        {
            try
            {
                return Parser.Parse(request.PhysicalPath) as FaydeApplication;
            }
            catch (Exception ex)
            {
                logger.Error("Could not load Fayde Application document.", ex);
                return null;
            }
        }


        private string GetPhysicalPath(HttpContext context, FaydeApplication fap, string fragment)
        {
            var mappedPath = fap.MapUri(fragment);
            if (string.IsNullOrWhiteSpace(mappedPath))
                return mappedPath;
            return Path.Combine(Path.GetDirectoryName(context.Request.PhysicalPath), mappedPath.Replace("/", "\\").TrimStart('\\'));
        }


        private string FindOrderFile(string execPath)
        {
            var fi = new FileInfo(execPath);
            var di = fi.Directory;
            while (di != null && !di.GetFiles("Fayde.order", SearchOption.TopDirectoryOnly).Any())
            {
                di = di.Parent;
            }
            return new FileInfo(Path.Combine(di.FullName, "Fayde.order")).FullName;
        }

        private IEnumerable<string> CollectIncludes(string orderFilepath)
        {
            using (var sr = new StreamReader(orderFilepath))
            {
                while (!sr.EndOfStream)
                {
                    var line = sr.ReadLine();
                    if (!string.IsNullOrWhiteSpace(line))
                        yield return line;
                }
            }
        }
    }
}