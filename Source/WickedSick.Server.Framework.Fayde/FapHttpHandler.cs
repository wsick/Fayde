using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.Elements;
using System.Web;
using System.Xml;
using WickedSick.Server.XamlParser;
using log4net;
using System.IO;
using WickedSick.Server.XamlParser.Elements.Types;
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

            var localPath = fap.MapUri(context.Request.Url);
            if (string.IsNullOrWhiteSpace(localPath))
                WriteFapFull(context);
            else
                WriteFapPage(context, localPath);
        }


        private void WriteFapFull(HttpContext context)
        {
            if (IsJsonOnly(context))
                return;
            Page page = null;
            using (var writer = new FapWriter(context.Response.OutputStream))
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

        private void WriteFapPage(HttpContext context, string localPath)
        {
            if (IsJsonOnly(context))
            {
            }
        }

        private void WriteJson(StreamWriter sw, IJsonConvertible j)
        {
            sw.Write(j.ToJson(0));
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
            var xd = new XmlDocument();
            try
            {
                xd.Load(request.PhysicalPath);
            }
            catch (Exception ex)
            {
                logger.Error("Could not load Fayde Application document.", ex);
                return null;
            }

            return (FaydeApplication)Parser.ParseXmlNode(xd.DocumentElement, null);
        }


        private bool IsJsonOnly(HttpContext context)
        {
            bool onlyJson;
            return bool.TryParse(context.Request.Headers["JsonOnly"], out onlyJson) && onlyJson;
        }


        private static string GetJsPrefix(HttpRequest request)
        {
            var path = request.AppRelativeCurrentExecutionFilePath.TrimStart('~', '/');
            return string.Join("", Enumerable.Repeat("../", Occurrences(path, "/")));
        }

        private static int Occurrences(string s, string match)
        {
            int count = 0;
            for (int i = 0; i < s.Length; i++)
            {
                var cur = s.Substring(i);
                if (cur.StartsWith(match))
                {
                    count++;
                    i += match.Length - 1;
                }
            }
            return count;
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