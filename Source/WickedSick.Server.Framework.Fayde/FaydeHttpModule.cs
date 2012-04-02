using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.IO;

namespace WickedSick.Server.Framework.Fayde
{
    public class FaydeHttpModule: IHttpModule
    {
        public void Dispose() { }

        public void Init(HttpApplication context)
        {
            context.MapRequestHandler += new EventHandler(context_MapRequestHandler);
            context.BeginRequest += new EventHandler(context_BeginRequest);
        }

        private void context_BeginRequest(object sender, EventArgs e)
        {
            HttpApplication app = sender as HttpApplication;
            string rootPath = app.Server.MapPath("/");
            string[] appFiles = Directory.GetFiles(rootPath, "*.fa", SearchOption.AllDirectories);
            if (appFiles.Count() > 1)
                throw new Exception("Only one fayde application can be defined.");
            
            throw new NotImplementedException();
        }

        private void context_MapRequestHandler(object sender, EventArgs e)
        {
            throw new NotImplementedException();
        }
    }
}
