using System;
using System.Collections.Generic;
using System.IO;
using WickedSick.Server.XamlParser.Elements;

namespace WickedSick.Server.Framework.Fayde
{
    public class FapWriter : IDisposable
    {
        private static readonly string START_INITIALIZATION_SCRIPT =
@"      <script type=""text/javascript"">
        Fayde.Run = function () {";

        private static readonly string END_INITIALIZATION_SCRIPT =
@"          Fayde.Start(rjson, json, document.getElementById(""canvas""));
        }
        </script>";

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

        public bool Debug { get; set; }

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

        public void WriteScriptIncludes(string scriptResolution, IEnumerable<string> includes)
        {
            if (Debug)
            {
                foreach (var include in includes)
                {
                    Writer.WriteLine(string.Format("\t\t<script src=\"{0}Javascript/{1}\" type=\"text/javascript\"></script>", scriptResolution, include));
                }
            }
            else
            {
                Writer.WriteLine(string.Format("\t\t<script src=\"{0}Fayde.js\" type=\"text/javascript\"></script>", scriptResolution));
            }
            Writer.WriteLine(string.Format("\t\t<script src=\"{0}Fayde.Generic.js\" type=\"text/javascript\"></script>", scriptResolution));
        }

        public void WriteAppLoadScript(FaydeApplication fap)
        {
            string rjson = "{}";
            if (fap.Resources != null)
                rjson = fap.Resources.ToJson(0);

            string json = "{}";
            if (fap.Content != null)
                json = fap.Content.ToJson(0);

            Writer.WriteLine(START_INITIALIZATION_SCRIPT);
            Writer.WriteLine(string.Format("var rjson = {0};", rjson));
            Writer.WriteLine(string.Format("var json = {0};", json));
            Writer.WriteLine(END_INITIALIZATION_SCRIPT);
        }

        public void WriteBodyStart()
        {
            Writer.WriteLine("\t<body onload=\"Fayde.Initialize()\" onmousedown=\"return false;\" style=\"margin: 0;\">");
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