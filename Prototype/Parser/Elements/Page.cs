using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml;
using System.Xml.Serialization;

namespace Parser.Elements
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
            sb.AppendLine("<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">");
            sb.AppendLine("<html xmlns=\"http://www.w3.org/1999/xhtml\">");
            sb.AppendLine("\t<head>");
            sb.Append("\t\t<title>");
            sb.Append(Title);
            sb.AppendLine("</title>");

            sb.AppendLine("\t\t<script src=\"../../Scripts/jquery-1.7.js\" type=\"text/javascript\"></script>");

            var scripts = new List<string>
            {
                "../../Scripts/Framework/Debug.js",
                "../../Scripts/Framework/RefObject.js",
                "../../Scripts/Framework/Validators.js",
                "../../Scripts/Framework/BError.js",
                "../../Scripts/Framework/DependencyProperty.js",
                "../../Scripts/Framework/Dirty.js",
                "../../Scripts/Framework/EventArgs.js",
                "../../Scripts/Framework/Expression.js",
                "../../Scripts/Framework/JsonParser.js",
                "../../Scripts/Framework/List.js",
                "../../Scripts/Framework/MulticastEvent.js",
                "../../Scripts/Framework/NotifyProperty.js",
                "../../Scripts/Framework/Primitives.js",
                "../../Scripts/Framework/PropertyPath.js",
                "../../Scripts/Framework/PropertyValueProviders.js",
                "../../Scripts/Framework/RelativeSource.js",
                "../../Scripts/Framework/Surface.js",
                "../../Scripts/Framework/TextLayout.js",
                "../../Scripts/Framework/VisualTreeHelper.js",
                "../../Scripts/Framework/Binding.js",
                "../../Scripts/Framework/DependencyObject.js",
                "../../Scripts/Framework/Geometry.js",
                "../../Scripts/Framework/LayoutInformation.js",
                "../../Scripts/Framework/Templates.js",
                "../../Scripts/Framework/TextElement.js",
                "../../Scripts/Framework/UIElement.js",
                "../../Scripts/Framework/App.js",
                "../../Scripts/Framework/Brushes.js",
                "../../Scripts/Framework/Collections.js",
                "../../Scripts/Framework/FrameworkElement.js",
                "../../Scripts/Framework/Panel.js",
                "../../Scripts/Framework/StackPanel.js",
                "../../Scripts/Framework/Style.js",
                "../../Scripts/Framework/TextBlock.js",
                "../../Scripts/Framework/VisualStateManager.js",
                "../../Scripts/Framework/Border.js",
                "../../Scripts/Framework/Canvas.js",
                "../../Scripts/Framework/ContentPresenter.js",
                "../../Scripts/Framework/Control.js",
                "../../Scripts/Framework/Grid.js",
                "../../Scripts/Framework/ItemsControl.js",
                "../../Scripts/Framework/TextBox.js",
                "../../Scripts/Framework/UserControl.js",
                "../../Scripts/Framework/ContentControl.js",
                "../../Scripts/Framework/ButtonBase.js",
                "../../Scripts/Framework/Button.js",
            };
            var scriptIncludeFormat = "\t\t<script src=\"{0}\" type=\"text/javascript\"></script>";
            foreach (var include in scripts)
            {
                sb.AppendLine(string.Format(scriptIncludeFormat, include));
            }

            sb.AppendLine("\t\t<script type=\"text/javascript\">");
            sb.AppendLine("\t\t\t$(document).ready(function () {");
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
