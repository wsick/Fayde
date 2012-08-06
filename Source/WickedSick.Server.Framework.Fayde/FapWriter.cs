using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using WickedSick.Server.XamlParser.Elements.Controls;
using WickedSick.Server.XamlParser;

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
            Writer.WriteLine(string.Format("\t\t<script src=\"{0}jquery-1.7.js\" type=\"text/javascript\"></script>", directoryResolution));
#if DEBUG
            foreach (var include in includes)
            {
                Writer.WriteLine(string.Format("\t\t<script src=\"{0}Javascript/{1}\" type=\"text/javascript\"></script>", directoryResolution, include));
            }
#else
            sb.AppendLine(string.Format("\t\t<script src=\"{0}Fayde.js\" type=\"text/javascript\"></script>", directoryResolution));
#endif
        }

        public void WriteAppLoadScript(IJsonConvertible j, string width, string widthType, string height, string heightType)
        {
            Writer.WriteLine("\t\t<script type=\"text/javascript\">");
            Writer.WriteLine("\t\t\t$(document).ready(function () {");
            Writer.WriteLine("\t\t\t\tApp.Instance = new App();");

            Writer.Write("\t\t\t\tvar json = ");
            Writer.Write(j.ToJson(4));
            Writer.WriteLine(";");

            Writer.WriteLine(string.Format("\t\t\t\tApp.Instance.Load(json, $(\"#canvas\"), {0}, {1}, {2}, {3});", width, widthType, height, heightType));
            Writer.WriteLine("\t\t\t});");
            Writer.WriteLine("\t\t</script>");
        }

        public void WriteBodyStart()
        {
            Writer.WriteLine("\t<body onmousedown=\"return false;\" style=\"margin: 0;\">");
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