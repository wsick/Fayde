using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Web;
using WickedSick.Server.XamlParser;
using WickedSick.Server.XamlParser.Elements;
using WickedSick.Server.XamlParser.Elements.Controls;

namespace WickedSick.Server.Framework.Fayde
{
    public class FapHttpHandler : IHttpHandler
    {
        public bool IsReusable { get { return true; } }

        private static Assembly _RootAssembly;
        public static void SetRootAssembly()
        {
            _RootAssembly = Assembly.GetCallingAssembly();
        }

        public void ProcessRequest(HttpContext context)
        {
            var page = context.Request.QueryString["p"];
            var xmlNs = context.Request.QueryString["xmlns"];
            if (page != null)
                ProcessPageRequest(context, page, context.Request.QueryString["js"]);
            else if (xmlNs != null)
                ProcessGenericRequest(context, xmlNs, context.Request.QueryString["xmlname"], context.Request.QueryString["js"]);
            else
                ProcessAppRequest(context);
        }

        protected void ProcessAppRequest(HttpContext context)
        {
            var result = CreateFap(context.Request);
            var fap = result.RootObject as FaydeApplication;
            WriteFapFull(context, fap);
            WriteDependencyHeader(context.Response, result);
        }
        protected void ProcessPageRequest(HttpContext context, string page, string js)
        {
            var fap = GetFaydeApplication(context);
            if (fap == null)
            {
                context.Response.StatusCode = 404;
                return;
            }
            if (!string.IsNullOrWhiteSpace(js))
                RedirectToCodeBehindJs(context, fap, page);
            else
                WritePageJson(context, fap, page);
        }
        protected void ProcessGenericRequest(HttpContext context, string xmlNs, string xmlName, string js)
        {
            var fap = GetFaydeApplication(context);
            if (fap == null)
            {
                context.Response.StatusCode = 404;
                return;
            }
            WriteGeneric(context, fap, xmlNs, xmlName, js);
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

            var result = CreateFap(request);
            var fap = result.RootObject as FaydeApplication;
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
        private IParseResult CreateFap(HttpRequest request)
        {
            try
            {
                return Parser.ParseApp(request.PhysicalPath, _RootAssembly);
            }
            catch (Exception ex)
            {
                throw new Exception("Could not load Fayde Application.", ex);
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
            var path = Path.Combine(localRes, "Fayde.tsorder");
            var orderFile = new FileInfo(path);
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
                        yield return string.Format("Javascript/{0}", line);
                }
            }
        }
        private IEnumerable<string> CollectNewIncludes(string orderFilepath)
        {
            using (var sr = new StreamReader(orderFilepath))
            {
                while (!sr.EndOfStream)
                {
                    var line = sr.ReadLine();
                    if (string.IsNullOrWhiteSpace(line))
                        continue;
                    if (line.EndsWith(".ts"))
                        line = line.Remove(line.Length - 2) + "js";
                    line = line.Replace("\\", "/");
                    yield return string.Format("{0}", line);
                }
            }
        }

        private void WriteFapFull(HttpContext context, FaydeApplication fap)
        {
            using (var writer = new FapWriter(context.Response.OutputStream))
            {
                writer.WriteStart();
                writer.WriteHeadStart();
                var theme = string.IsNullOrWhiteSpace(fap.Theme) ? "Default" : fap.Theme;
                writer.WriteScriptIncludes(fap.ScriptResolution, theme);

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
        private void WritePageJson(HttpContext context, FaydeApplication fap, string fragment)
        {
            var pageLocalPath = GetPhysicalPath(context, fap, fragment);
            if (string.IsNullOrWhiteSpace(pageLocalPath))
                return;
            WriteXaml(context.Response, fap, pageLocalPath);
        }
        private void WriteGeneric(HttpContext context, FaydeApplication fap, string xmlNamespace, string xmlName, string js)
        {
            var response = context.Response;
            var type = fap.ResolveType(xmlNamespace, xmlName);
            if (!type.IsSubclassOf(typeof(UserControl)))
            {
                response.StatusCode = 404;
                return;
            }

            var instance = (UserControl)Activator.CreateInstance(type);
            var isJs = !string.IsNullOrWhiteSpace(js);
            if (isJs)
            {
                using (var stream = instance.GetJsResource())
                {
                    stream.CopyTo(response.OutputStream);
                }
                response.ContentType = "application/x-javascript";
            }
            else
            {
                IParseResult result;
                using (var stream = instance.GetXamlResource())
                {
                    result = fap.Parser.Parse(stream);
                }
                WriteXaml(context.Response, result);
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
        private void WriteXaml(HttpResponse response, FaydeApplication fap, string localFilepath)
        {
            var result = fap.Parser.Parse(localFilepath);
            WriteXaml(response, result);
        }
        private void WriteXaml(HttpResponse response, IParseResult result)
        {
            using (var sw = new StreamWriter(response.OutputStream))
            {
                var outputMods = new JsonOutputModifiers { IsNamespaceIncluded = true };
                sw.Write(result.RootObject.ToJson(0, outputMods));
            }
            WriteDependencyHeader(response, result);
        }
        private void WriteDependencyHeader(HttpResponse response, IParseResult result)
        {
            var value = string.Join("|", result.Metadata.GetDependencies().Select(t => string.Format("xmlns={0}&xmlname={1}", t.Item1, t.Item2)));
            response.AppendHeader("Dependencies", value);
        }
    }
}