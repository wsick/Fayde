using System;
using System.Collections.Generic;
using System.IO;
using WickedSick.Server.XamlParser.Elements;

namespace WickedSick.Server.Framework.Fayde
{
    public class FapWriter : IDisposable
    {
        public FapWriter(Stream outputStream)
        {
            Writer = new StreamWriter(outputStream);
        }

        public void Dispose()
        {
            if (Writer != null)
            {
                Writer.Dispose();
                Writer = null;
            }
        }

        protected StreamWriter Writer { get; set; }

        public void WriteStart()
        {
            Writer.WriteLine("<!DOCTYPE html>");
            Writer.WriteLine("<html xmlns=\"http://www.w3.org/1999/xhtml\">");
        }
        public void WriteEnd()
        {
            Writer.WriteLine("</html>");
        }

        public void WriteHeadStart()
        {
            Writer.WriteLine("\t<head>");
        }
        public void WriteHeadEnd()
        {
            Writer.WriteLine("\t</head>");
        }

        public void WriteTitle(string title)
        {
            Writer.WriteLine(string.Format("\t\t<title>{0}</title>", title));
        }

        public void WriteScriptIncludes(string directoryResolution, IEnumerable<string> includes)
        {
#if DEBUG
            foreach (var include in includes)
            {
                Writer.WriteLine(string.Format("\t\t<script src=\"{0}Javascript/{1}\" type=\"text/javascript\"></script>", directoryResolution, include));
            }
#else
            Writer.WriteLine(string.Format("\t\t<script src=\"{0}Fayde.js\" type=\"text/javascript\"></script>", directoryResolution));
#endif
            Writer.WriteLine(string.Format("\t\t<script src=\"{0}Fayde.Generic.js\" type=\"text/javascript\"></script>", directoryResolution));
        }

        public void WriteAppLoadScript(FaydeApplication fap)
        {
            Writer.WriteLine("\t\t<script type=\"text/javascript\">");
            Writer.WriteLine("\t\t\tfunction InitializeFayde() {");
            Writer.WriteLine("\t\t\t\tApp.Instance = new App();");

            if (fap.Resources != null)
            {
                Writer.Write("\t\t\t\tvar rjson = ");
                Writer.Write(fap.Resources.ToJson(4));
                Writer.WriteLine(";");
                Writer.WriteLine("\t\t\t\tApp.Instance.LoadResources(rjson);");
            }

            Writer.Write("\t\t\t\tvar json = ");
            if (fap.Content != null)
                Writer.Write(fap.Content.ToJson(4));
            else
                Writer.Write("{}");
            Writer.WriteLine(";");

            Writer.WriteLine("\t\t\t\tApp.Instance.LoadInitial(document.getElementById(\"canvas\"), json);");

            Writer.WriteLine("\t\t\t};");
            Writer.WriteLine("\t\t</script>");
        }

        public void WriteBodyStart()
        {
            Writer.WriteLine("\t<body onload=\"InitializeFayde()\" onmousedown=\"return false;\" style=\"margin: 0;\">");
        }
        public void WriteBodyEnd()
        {
            Writer.WriteLine("\t</body>");
        }

        public void WriteCanvas()
        {
            Writer.WriteLine("\t\t<canvas id=\"canvas\" tabindex=\"1\" style=\"position: absolute;\"></canvas>");
        }
    }
}