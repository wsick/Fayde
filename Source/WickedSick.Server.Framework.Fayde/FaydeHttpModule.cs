using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.IO;
using WickedSick.Server.XamlParser;
using System.Xml;
using WickedSick.Server.XamlParser.Elements;

namespace WickedSick.Server.Framework.Fayde
{
    public class FaydeHttpModule: IHttpModule
    {
        public static readonly string FAYDE_APPLICATION = "FaydeApplication";

        public void Dispose() { }

        public void Init(HttpApplication context)
        {
            context.BeginRequest += new EventHandler(context_BeginRequest);
        }

        private void context_BeginRequest(object sender, EventArgs e)
        {
            HttpApplication app = sender as HttpApplication;
            if (!app.Context.Items.Contains(FAYDE_APPLICATION))
            {
                XmlDocument doc = GetApplicationDocument(app.Request);
                if (doc != null)
                {
                    FaydeApplication fa = (FaydeApplication)Parser.ParseXmlNode(doc.DocumentElement, null);
                    app.Context.Items.Add(FAYDE_APPLICATION, fa);
                }
            }

            string filePath = app.Context.Request.AppRelativeCurrentExecutionFilePath;
            FaydeApplication fapp = app.Context.Items[FAYDE_APPLICATION] as FaydeApplication;
            if (filePath.Equals("~/") && fapp != null)
            {
                string defaultUri = (string)fapp.GetValue("DefaultPageUri");
                app.Context.RewritePath(defaultUri);
            }
        }

        private XmlDocument GetApplicationDocument(HttpRequest req)
        {
            string[] appFiles = Directory.GetFiles(req.MapPath("~/"), "*.fa", SearchOption.AllDirectories);
            if (appFiles.Count() == 0)
                return null;

            if (appFiles.Count() > 1)
                throw new Exception("More than one fayde application file has been defined.");

            XmlDocument doc = new XmlDocument();
            doc.Load(appFiles[0]);
            if (doc.DocumentElement.Name.ToLower().Equals("faydeapplication"))
                return doc;

            return null;
        }
    }
}
