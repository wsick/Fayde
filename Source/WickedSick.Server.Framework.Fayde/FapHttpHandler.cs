using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using log4net;
using WickedSick.Server.XamlParser;
using WickedSick.Server.XamlParser.Elements;

namespace WickedSick.Server.Framework.Fayde
{
    public class FapHttpHandler : IHttpHandler
    {
        static readonly ILog logger = LogManager.GetLogger(typeof(FapHttpHandler));

        public bool IsReusable { get { return true; } }

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
                var isJs = context.Request.QueryString["js"];
                if (!string.IsNullOrWhiteSpace(isJs))
                    RedirectToCodeBehindJs(context, fap, fragment);
                else
                    WritePageJson(context.Response, GetPhysicalPath(context, fap, fragment));
            }
            else
            {
                var includes = new List<string>();
#if DEBUG
                if (fap.Debug)
                    includes = CollectIncludes(FindOrderFile(context.Request, fap)).ToList();
#endif
                WriteFapFull(context, fap, includes);
            }
        }

        private void WriteFapFull(HttpContext context, FaydeApplication fap, IEnumerable<string> includes)
        {
            using (var writer = new FapWriter(context.Response.OutputStream))
            {
#if DEBUG
                writer.Debug = fap.Debug;
#endif
                writer.WriteStart();
                writer.WriteHeadStart();
                writer.WriteScriptIncludes(fap.ScriptResolution, includes);

                var codeBehindPath = string.Format("{0}.js", context.Request.Path);
                if (File.Exists(context.Server.MapPath(codeBehindPath)))
                    writer.WriteScriptInclude(codeBehindPath);
                writer.WriteAppLoadScript(fap);
                writer.WriteHeadEnd();
                writer.WriteBodyStart();
                writer.WriteCanvas();
                writer.WriteBodyEnd();
                writer.WriteEnd();
            }
        }
        private void WritePageJson(HttpResponse response, string pageLocalPath)
        {
            if (string.IsNullOrWhiteSpace(pageLocalPath))
                return;

            using (var sw = new StreamWriter(response.OutputStream))
            {
                var page = Parser.Parse(pageLocalPath) as Page;
                var outputMods = new JsonOutputModifiers { IsNamespaceIncluded = true };
                sw.Write(page.ToJson(0, outputMods));
            }
        }
        private void RedirectToCodeBehindJs(HttpContext context, FaydeApplication fap, string fragment)
        {
            var pageRelativePath = GetRelativePath(context, fap, fragment);
            var codeBehindPath = string.Format("{0}.js", pageRelativePath);
            var codeBehindFile = new FileInfo(context.Server.MapPath(codeBehindPath));
            if (!codeBehindFile.Exists)
            {
                context.Response.End();
                return;
            }
            context.Response.WriteFile(codeBehindFile.FullName);
            context.Response.ContentType = "application/x-javascript";
            context.Response.End();
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
                throw;
            }
        }


        private string GetPhysicalPath(HttpContext context, FaydeApplication fap, string fragment)
        {
            var mappedPath = fap.MapUri(fragment);
            if (string.IsNullOrWhiteSpace(mappedPath))
                return mappedPath;
            return Path.Combine(Path.GetDirectoryName(context.Request.PhysicalPath), mappedPath.Replace("/", "\\").TrimStart('\\'));
        }
        private string GetRelativePath(HttpContext context, FaydeApplication fap, string fragment)
        {
            var fapVirtualPath = context.Request.CurrentExecutionFilePath;
            var fapVirtualDir =  System.Web.VirtualPathUtility.RemoveTrailingSlash(System.Web.VirtualPathUtility.GetDirectory(fapVirtualPath));
            var mappedPath = fap.MapUri(fragment);
            return string.Format("{0}/{1}", fapVirtualDir, mappedPath);
        }


        private string FindOrderFile(HttpRequest request, FaydeApplication fap)
        {
            var localRes = request.MapPath(fap.ScriptResolution);
            var orderFile = new FileInfo(Path.Combine(localRes, "Fayde.order"));
            return orderFile.FullName;
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