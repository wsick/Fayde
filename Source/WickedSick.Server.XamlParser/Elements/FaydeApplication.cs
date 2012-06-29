using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.TypeConverters;
using WickedSick.Server.XamlParser.Elements.Controls;
using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements
{
    public class FaydeApplication : DependencyObject
    {
        public static readonly PropertyDescription DefaultPageUri = PropertyDescription.Register("DefaultPageUri", typeof(string), typeof(FaydeApplication));
        public static readonly PropertyDescription Width = PropertyDescription.Register("Width", typeof(PageLength), typeof(FaydeApplication));
        public static readonly PropertyDescription Height = PropertyDescription.Register("Height", typeof(PageLength), typeof(FaydeApplication));
        public static readonly PropertyDescription Debug = PropertyDescription.Register("Debug", typeof(bool), typeof(FaydeApplication));
        public static readonly PropertyDescription Resources = PropertyDescription.Register("Resources", typeof(ResourceDictionary), typeof(FaydeApplication));

        public string BuildPage(Page p, IEnumerable<string> includes, string baseDirResolution)
        {   
            bool pageDebug = false;
            object oDebug = GetValue("Debug");
            if (oDebug != null)
                pageDebug = (bool)oDebug;

            var width = "null";
            var widthType = "null";
            var plWidth = GetValue("Width") as PageLength;
            if (plWidth != null)
            {
                width = plWidth.Value.ToString();
                widthType = "\"" + plWidth.LengthType.ToString() + "\"";
            }

            var height = "null";
            var heightType = "null";
            var plHeight = GetValue("Height") as PageLength;
            if (plHeight != null)
            {
                height = plHeight.Value.ToString();
                heightType = "\"" + plHeight.LengthType.ToString() + "\"";
            }

            StringBuilder sb = new StringBuilder();
            sb.AppendLine("<!DOCTYPE html>");
            sb.AppendLine("<html xmlns=\"http://www.w3.org/1999/xhtml\">");
            sb.AppendLine("\t<head>");
            sb.Append("\t\t<title>");
            sb.Append(p.GetValue("Title"));
            sb.AppendLine("</title>");

            sb.AppendLine(string.Format("\t\t<script src=\"{0}jquery-1.7.js\" type=\"text/javascript\"></script>", baseDirResolution));
#if DEBUG
            foreach (var include in includes)
            {
                sb.AppendLine(string.Format("\t\t<script src=\"{0}Javascript/{1}\" type=\"text/javascript\"></script>", baseDirResolution, include));
            }
#else
            sb.AppendLine(string.Format("\t\t<script src=\"{0}Fayde.js\" type=\"text/javascript\"></script>", baseDirResolution));
#endif

            sb.AppendLine("\t\t<script type=\"text/javascript\">");
            sb.AppendLine("\t\t\t$(document).ready(function () {");
            sb.AppendLine("\t\t\t\tApp.Instance = new App();");
            if (pageDebug)
            {
                //sb.AppendLine("\t\t\t\tRegisterHUD(\"mouse\", \"#hud-mouse\");");
                //sb.AppendLine("\t\t\t\tRegisterHUD(\"els\", \"#hud-els\");");
            }
            sb.Append("var json = ");
            var pageUserControl = new UserControl();
            pageUserControl.AddContent(p.GetValue("Content"));
            sb.Append(pageUserControl.toJson(0));
            sb.AppendLine(";");

            sb.AppendLine(string.Format("\t\t\t\tApp.Instance.Load(json, $(\"#canvas\"), {0}, {1}, {2}, {3});", width, widthType, height, heightType));
            sb.AppendLine("\t\t\t});");
            sb.AppendLine("\t\t</script>");

            sb.AppendLine("\t\t</head>");
            sb.Append("\t<body onmousedown=\"return false;\" style=\"margin: 0;\">");
            sb.Append("<canvas id=\"canvas\" tabindex=\"1\" style=\"position: absolute;\"></canvas>");

            /*
            if (pageDebug)
            {
                //sb.AppendLine("\t\t<div id=\"hud-mouse\" style=\"height: 25px;\"></div>");
                //sb.AppendLine("\t\t<div id=\"hud-els\" style=\"height: 25px;\"></div>");
            }
            */
            sb.Append("</body>");
            sb.Append("</html>");
            return sb.ToString();
        }
    }
}
