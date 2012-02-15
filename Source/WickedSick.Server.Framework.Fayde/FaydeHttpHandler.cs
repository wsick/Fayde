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
    public class FaydeHttpHandler: IHttpHandler
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

                Page p = Parser.ParseXmlNode(doc.DocumentElement, null) as Page;

                res.Write(p.ToString());
            }
            catch (Exception ex)
            {
                res.Write("An unexpected exception has occurred.");
                res.Write(ex.Message);
                res.Write(ex.StackTrace);
            }
        }
    }
}
