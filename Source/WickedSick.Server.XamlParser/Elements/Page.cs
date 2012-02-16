using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml;
using System.Xml.Serialization;

namespace WickedSick.Server.XamlParser.Elements
{
    [Element]
    public class Page: FrameworkElement
    {
        [Property]
        public string Title { get; set; }

        [Content]
        public UIElement Content { get; set; }

        public override string ToString()
        {
            StringBuilder sb = new StringBuilder();
            sb.AppendLine("<!DOCTYPE html>");
            sb.AppendLine("<html xmlns=\"http://www.w3.org/1999/xhtml\">");
            sb.AppendLine("\t<head>");
            sb.Append("\t\t<title>");
            sb.Append(Title);
            sb.AppendLine("</title>");

            sb.AppendLine("\t\t<script src=\"../Packages/jquery-1.7.js\" type=\"text/javascript\"></script>");

            var scripts = new List<string>
            {
                "../Packages/Fayde.Runtime.js",
                "../Packages/Fayde.Primitives.js",
                "../Packages/Fayde.Core.js",
                "../Packages/Fayde.Markup.js",
                "../Packages/Fayde.Engine.js",
                "../Packages/Fayde.Data.js",
                "../Packages/Fayde.Documents.js",
                "../Packages/Fayde.Media.js",
                "../Packages/Fayde.TextLayout.js",
                "../Packages/Fayde.Controls.js",
            };
            var scriptIncludeFormat = "\t\t<script src=\"{0}\" type=\"text/javascript\"></script>";
            foreach (var include in scripts)
            {
                sb.AppendLine(string.Format(scriptIncludeFormat, include));
            }

            sb.AppendLine("\t\t<script type=\"text/javascript\">");
            sb.AppendLine("\t\t\t$(document).ready(function () {");
            sb.AppendLine("\t\t\t\twindow.IsDocumentReady = function () { return true; }");
            sb.AppendLine("\t\t\t\tApp.Instance = new App();");
            sb.AppendLine("\t\t\t\t_Console.Init(\"#console\");");
            sb.AppendLine("\t\t\t\tRegisterHUD(\"mouse\", \"#hud-mouse\");");
            sb.AppendLine("\t\t\t\tRegisterHUD(\"els\", \"#hud-els\");");
            sb.AppendLine("\t\t\t\troot = buildTestView();");
            sb.AppendLine("\t\t\t\tApp.Instance.Load(root, $(\"#canvas\"));");
            sb.AppendLine("\t\t\t});");

            sb.AppendLine("\t\t\tfunction buildTestView() {");
            sb.AppendLine("\t\t\t\tvar namescope = new NameScope();");
            sb.AppendLine("\t\t\t\tvar parser = new JsonParser();");
            sb.Append("var json = ");
            sb.Append(Content.toJson(0));
            sb.AppendLine(";");
            sb.AppendLine("\t\t\t\tvar top = parser.CreateObject(json, namescope);");
            sb.AppendLine("\t\t\t\treturn top;");
            sb.AppendLine("\t\t\t}");
            sb.AppendLine("\t\t</script>");

            sb.AppendLine("\t\t</head>");
            sb.AppendLine("\t<body style=\"margin: 0\">");
            sb.AppendLine("\t\t<div>");
            sb.AppendLine("\t\t\t<div id=\"container\">");
            sb.AppendLine("\t\t\t\t<canvas id=\"canvas\" width=\"600\" height=\"600\"></canvas>");
            sb.AppendLine("\t\t\t</div>");
            sb.AppendLine("\t\t\t<div id=\"hud-mouse\" style=\"height: 25px;\"></div>");
            sb.AppendLine("\t\t\t<div id=\"hud-els\" style=\"height: 25px;\"></div>");
            sb.AppendLine("\t\t\t<div id=\"console\" style=\"margin-top: 10px; font-size: 12px; font-family: Consolas; overflow-y: scroll; height: 200px; border: solid 1px black;\"></div>");
            sb.AppendLine("\t\t</div>");
            sb.AppendLine("\t</body>");
            sb.AppendLine("</html>");
            return sb.ToString();
        }
    }
}
