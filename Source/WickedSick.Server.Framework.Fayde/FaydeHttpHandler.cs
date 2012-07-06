using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Xml;
using WickedSick.Server.XamlParser;
using WickedSick.Server.XamlParser.Elements;
using WickedSick.Server.XamlParser.Elements.Controls;

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

            XmlDocument doc = new XmlDocument();
            string filePath = req.MapPath(req.CurrentExecutionFilePath);
            if (!File.Exists(filePath))
            {
                throw new Exception("Fayde file could not be found.");
            }
            doc.Load(filePath);
            if (!doc.DocumentElement.Name.ToLower().Equals("page"))
                throw new Exception("The root of your document must be a Page control.");

            FaydeApplication fa = context.Items[FaydeHttpModule.FAYDE_APPLICATION] as FaydeApplication;
            if (fa != null)
            {
                Page p = Parser.ParseXmlNode(doc.DocumentElement, null) as Page;
                res.Write(fa.BuildPage(p, CollectIncludes(FindOrderFile(filePath)), GetJsPrefix(req)));
            }
        }

        private string GetJsPrefix(HttpRequest request)
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
