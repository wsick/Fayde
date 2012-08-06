using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using log4net;
using WickedSick.Server.XamlParser;
using WickedSick.Server.XamlParser.Elements;
using WickedSick.Server.XamlParser.Elements.Controls;
using WickedSick.Server.XamlParser.Elements.Types;

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

#if DEBUG
            var orderFile = FindOrderFile(context.Request.PhysicalApplicationPath);
            Includes = CollectIncludes(orderFile).ToList();
            DirectoryResolution = "";
#endif

            var localPath = GetPhysicalPath(context, fap);
            if (IsJsonOnly(context))
                WritePageJson(context.Response.OutputStream, localPath);
            else
                WriteFapFull(fap, context.Response.OutputStream, localPath);
        }


        private void WriteFapFull(FaydeApplication fap, Stream stream, string localPath)
        {
            Page page = null;
            if (string.IsNullOrWhiteSpace(localPath))
            {
                localPath = fap.MapUri(new Uri("", UriKind.Relative));
                if (string.IsNullOrWhiteSpace(localPath))
                    throw new XamlParseException("No UriMapping to map to the default page.");
            }
            page = Parser.Parse(localPath) as Page;
            if (page == null)
                throw new XamlParseException("UriMapping refers to a document that is not a Page.");

            using (var writer = new FapWriter(stream))
            {
                writer.WriteStart();
                writer.WriteHeadStart();
                writer.WriteTitle(page.GetValue("Title") as string);
                writer.WriteScriptIncludes(DirectoryResolution, Includes);
                WriteAppLoadScriptForPage(writer, page);
                writer.WriteHeadEnd();
                writer.WriteBodyStart();
                writer.WriteCanvas();
                writer.WriteBodyEnd();
                writer.WriteEnd();
            }
        }

        private void WriteAppLoadScriptForPage(FapWriter writer, Page page)
        {
            var width = "null";
            var widthType = "null";
            var plWidth = page.GetValue("Width") as PageLength;
            if (plWidth != null)
            {
                width = plWidth.Value.ToString();
                widthType = "\"" + plWidth.LengthType.ToString() + "\"";
            }

            var height = "null";
            var heightType = "null";
            var plHeight = page.GetValue("Height") as PageLength;
            if (plHeight != null)
            {
                height = plHeight.Value.ToString();
                heightType = "\"" + plHeight.LengthType.ToString() + "\"";
            }

            var userControl = new UserControl();
            userControl.AddContent(page);
            writer.WriteAppLoadScript(userControl, width, widthType, height, heightType);
        }

        private void WritePageJson(Stream stream, string pageLocalPath)
        {
            if (string.IsNullOrWhiteSpace(pageLocalPath))
                return;
            using (var sw = new StreamWriter(stream))
            {
                sw.Write(Parser.Parse(pageLocalPath).ToJson(0));
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


        private bool IsJsonOnly(HttpContext context)
        {
            bool onlyJson;
            return bool.TryParse(context.Request.Headers["JsonOnly"], out onlyJson) && onlyJson;
        }

        private string GetPhysicalPath(HttpContext context, FaydeApplication fap)
        {
            var mappedPath = fap.MapUri(context.Request.Url);
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