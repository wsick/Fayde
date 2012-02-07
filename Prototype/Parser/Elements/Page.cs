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
            sb.AppendLine("\t\t<script src=\"../../Scripts/Framework/Debug.js\" type=\"text/javascript\"></script>");
            sb.AppendLine("\t\t<script src=\"../../Scripts/Framework/RefObject.js\" type=\"text/javascript\"></script>");
            sb.AppendLine("\t\t<script src=\"../../Scripts/Framework/Validators.js\" type=\"text/javascript\"></script>");
            sb.AppendLine("\t\t<script src=\"../../Scripts/Framework/BError.js\" type=\"text/javascript\"></script>");
            sb.AppendLine("\t\t<script src=\"../../Scripts/Framework/Binding.js\" type=\"text/javascript\"></script>");
            sb.AppendLine("\t\t<script src=\"../../Scripts/Framework/DependencyProperty.js\" type=\"text/javascript\"></script>");
            sb.AppendLine("\t\t<script src=\"../../Scripts/Framework/Dirty.js\" type=\"text/javascript\"></script>");
            sb.AppendLine("\t\t<script src=\"../../Scripts/Framework/EventArgs.js\" type=\"text/javascript\"></script>");
            sb.AppendLine("\t\t<script src=\"../../Scripts/Framework/Expression.js\" type=\"text/javascript\"></script>");
            sb.AppendLine("\t\t<script src=\"../../Scripts/Framework/JsonParser.js\" type=\"text/javascript\"></script>");
            sb.AppendLine("\t\t<script src=\"../../Scripts/Framework/List.js\" type=\"text/javascript\"></script>");
            sb.AppendLine("\t\t<script src=\"../../Scripts/Framework/MulticastEvent.js\" type=\"text/javascript\"></script>");
            sb.AppendLine("\t\t<script src=\"../../Scripts/Framework/Primitives.js\" type=\"text/javascript\"></script>");
            sb.AppendLine("\t\t<script src=\"../../Scripts/Framework/PropertyValueProviders.js\" type=\"text/javascript\"></script>");
            sb.AppendLine("\t\t<script src=\"../../Scripts/Framework/Surface.js\" type=\"text/javascript\"></script>");
            sb.AppendLine("\t\t<script src=\"../../Scripts/Framework/TextLayout.js\" type=\"text/javascript\"></script>");
            sb.AppendLine("\t\t<script src=\"../../Scripts/Framework/VisualTreeHelper.js\" type=\"text/javascript\"></script>");
            sb.AppendLine("\t\t<script src=\"../../Scripts/Framework/DependencyObject.js\" type=\"text/javascript\"></script>");
            sb.AppendLine("\t\t<script src=\"../../Scripts/Framework/Geometry.js\" type=\"text/javascript\"></script>");
            sb.AppendLine("\t\t<script src=\"../../Scripts/Framework/LayoutInformation.js\" type=\"text/javascript\"></script>");
            sb.AppendLine("\t\t<script src=\"../../Scripts/Framework/Templates.js\" type=\"text/javascript\"></script>");
            sb.AppendLine("\t\t<script src=\"../../Scripts/Framework/TextElement.js\" type=\"text/javascript\"></script>");
            sb.AppendLine("\t\t<script src=\"../../Scripts/Framework/UIElement.js\" type=\"text/javascript\"></script>");
            sb.AppendLine("\t\t<script src=\"../../Scripts/Framework/App.js\" type=\"text/javascript\"></script>");
            sb.AppendLine("\t\t<script src=\"../../Scripts/Framework/Brushes.js\" type=\"text/javascript\"></script>");
            sb.AppendLine("\t\t<script src=\"../../Scripts/Framework/Collections.js\" type=\"text/javascript\"></script>");
            sb.AppendLine("\t\t<script src=\"../../Scripts/Framework/FrameworkElement.js\" type=\"text/javascript\"></script>");
            sb.AppendLine("\t\t<script src=\"../../Scripts/Framework/Panel.js\" type=\"text/javascript\"></script>");
            sb.AppendLine("\t\t<script src=\"../../Scripts/Framework/StackPanel.js\" type=\"text/javascript\"></script>");
            sb.AppendLine("\t\t<script src=\"../../Scripts/Framework/Style.js\" type=\"text/javascript\"></script>");
            sb.AppendLine("\t\t<script src=\"../../Scripts/Framework/TextBlock.js\" type=\"text/javascript\"></script>");
            sb.AppendLine("\t\t<script src=\"../../Scripts/Framework/VisualStateManager.js\" type=\"text/javascript\"></script>");
            sb.AppendLine("\t\t<script src=\"../../Scripts/Framework/Border.js\" type=\"text/javascript\"></script>");
            sb.AppendLine("\t\t<script src=\"../../Scripts/Framework/Canvas.js\" type=\"text/javascript\"></script>");
            sb.AppendLine("\t\t<script src=\"../../Scripts/Framework/ContentPresenter.js\" type=\"text/javascript\"></script>");
            sb.AppendLine("\t\t<script src=\"../../Scripts/Framework/Control.js\" type=\"text/javascript\"></script>");
            sb.AppendLine("\t\t<script src=\"../../Scripts/Framework/Grid.js\" type=\"text/javascript\"></script>");
            sb.AppendLine("\t\t<script src=\"../../Scripts/Framework/ItemsControl.js\" type=\"text/javascript\"></script>");
            sb.AppendLine("\t\t<script src=\"../../Scripts/Framework/TextBox.js\" type=\"text/javascript\"></script>");
            sb.AppendLine("\t\t<script src=\"../../Scripts/Framework/UserControl.js\" type=\"text/javascript\"></script>");
            sb.AppendLine("\t\t<script src=\"../../Scripts/Framework/ContentControl.js\" type=\"text/javascript\"></script>");
            sb.AppendLine("\t\t<script src=\"../../Scripts/Framework/ButtonBase.js\" type=\"text/javascript\"></script>");
            sb.AppendLine("\t\t<script src=\"../../Scripts/Framework/Button.js\" type=\"text/javascript\"></script>");

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
