using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Xml;
using WickedSick.Server.XamlParser;
using WickedSick.Server.XamlParser.Elements;

namespace WickedSick.Server.Framework.Fayde
{
    public class FaydeHttpHandler : IHttpHandler
    {
        public bool IsReusable
        {
            get { return false; }
        }

        public void ProcessRequest(HttpContext context)
        {
            HttpRequest req = context.Request;
            HttpResponse res = context.Response;
            try
            {
                XmlDocument doc = new XmlDocument();
                string filePath = req.MapPath(req.CurrentExecutionFilePath);
                if (!File.Exists(filePath))
                {
                    res.Write("Fayde file could not be found.");
                    return;
                }
                doc.Load(filePath);
                if (!doc.DocumentElement.Name.ToLower().Equals("page"))
                    throw new Exception("We currently only support the Page element as the document root.");

                FaydeApplication fa = context.Items[FaydeHttpModule.FAYDE_APPLICATION] as FaydeApplication;
                if (fa != null)
                {
                    Page p = Parser.ParseXmlNode(doc.DocumentElement, null) as Page;
                    res.Write(fa.BuildPage(p, CollectIncludes(FindOrderFile(filePath))));
                }
            }
            catch (Exception ex)
            {
                res.Write("<p>An unexpected exception has occurred.</p>");
                res.Write("<p>" + ex.Message + "</p>");
                res.Write("<p>" + ex.StackTrace.Replace(Environment.NewLine, "<br>") + "</p>");
            }
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
