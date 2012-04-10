﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.TypeConverters;
using WickedSick.Server.XamlParser.Elements.Controls;
using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements
{
    public class FaydeApplication: DependencyObject
    {
        public static readonly PropertyDescription DefaultPageUri = PropertyDescription.Register("DefaultPageUri", typeof(string), typeof(FaydeApplication));
        public static readonly PropertyDescription Width = PropertyDescription.Register("Width", typeof(PageLength), typeof(FaydeApplication));
        public static readonly PropertyDescription Height = PropertyDescription.Register("Height", typeof(PageLength), typeof(FaydeApplication));
        public static readonly PropertyDescription Debug = PropertyDescription.Register("Debug", typeof(bool), typeof(FaydeApplication));
        public static readonly PropertyDescription Resources = PropertyDescription.Register("Resources", typeof(ResourceDictionary), typeof(FaydeApplication));

        public string BuildPage(Page p, IEnumerable<string> includes)
        {
            string pageWidth = "800";
            object oWidth = GetValue("Width");
            if (oWidth != null)
                pageWidth = ((PageLength)oWidth).Value.ToString();
            string pageHeight = "700";
            object oHeight = GetValue("Height");
            if (oHeight != null)
                pageHeight = ((PageLength)oHeight).Value.ToString();
            bool pageDebug = false;
            object oDebug = GetValue("Debug");
            if (oDebug != null)
                pageDebug = (bool)oDebug;

            StringBuilder sb = new StringBuilder();
            sb.AppendLine("<!DOCTYPE html>");
            sb.AppendLine("<html xmlns=\"http://www.w3.org/1999/xhtml\">");
            sb.AppendLine("\t<head>");
            sb.Append("\t\t<title>");
            sb.Append(p.GetValue("Title"));
            sb.AppendLine("</title>");

            var prependResolver = "../";

            sb.AppendLine(string.Format("\t\t<script src=\"{0}jquery-1.7.js\" type=\"text/javascript\"></script>", prependResolver));
#if DEBUG
            foreach (var include in includes)
            {
                sb.AppendLine(string.Format("\t\t<script src=\"{0}Javascript/{1}\" type=\"text/javascript\"></script>", prependResolver, include));
            }
#else
            sb.AppendLine(string.Format("\t\t<script src=\"{0}Fayde.js\" type=\"text/javascript\"></script>", prependResolve));
#endif

            sb.AppendLine("\t\t<script type=\"text/javascript\">");
            sb.AppendLine("\t\t\t$(document).ready(function () {");
            sb.AppendLine("\t\t\t\twindow.IsDocumentReady = function () { return true; }");
            sb.AppendLine("\t\t\t\tApp.Instance = new App();");
            if (pageDebug)
            {
                sb.AppendLine("\t\t\t\t_Console.Init(\"#console\");");
                sb.AppendLine("\t\t\t\tRegisterHUD(\"mouse\", \"#hud-mouse\");");
                sb.AppendLine("\t\t\t\tRegisterHUD(\"els\", \"#hud-els\");");
            }
            sb.AppendLine("\t\t\t\troot = buildTestView();");
            sb.AppendLine("\t\t\t\tApp.Instance.Load(root, $(\"#canvas\"));");
            sb.AppendLine("\t\t\t});");

            sb.AppendLine("\t\t\tfunction buildTestView() {");
            sb.AppendLine("\t\t\t\tvar namescope = new NameScope();");
            sb.AppendLine("\t\t\t\tvar parser = new JsonParser();");
            sb.Append("var json = ");
            sb.Append(((IJsonSerializable)p.GetValue("Content")).toJson(0));
            sb.AppendLine(";");
            sb.AppendLine("\t\t\t\tvar top = parser.CreateObject(json, namescope);");
            sb.AppendLine("\t\t\t\treturn top;");
            sb.AppendLine("\t\t\t}");
            sb.AppendLine("\t\t</script>");

            sb.AppendLine("\t\t</head>");
            sb.AppendLine("\t<body onmousedown=\"return false;\" style=\"margin: 0\">");
            sb.AppendLine("\t\t<canvas id=\"canvas\" tabindex=\"1\" width=\"" + pageWidth + "\" height=\"" + pageHeight + "\"></canvas>");
            if (pageDebug)
            {
                sb.AppendLine("\t\t<div id=\"hud-mouse\" style=\"height: 25px;\"></div>");
                sb.AppendLine("\t\t<div id=\"hud-els\" style=\"height: 25px;\"></div>");
                sb.AppendLine("\t\t<div id=\"console\" style=\"margin-top: 10px; font-size: 12px; font-family: Consolas; overflow-y: scroll; height: 200px; border: solid 1px black;\"></div>");
            }
            sb.AppendLine("\t</body>");
            sb.AppendLine("</html>");
            return sb.ToString();
        }
    }
}
