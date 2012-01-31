using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Parser.TypeConverters;

namespace Parser.Elements
{
    [Element]
    public class Border: FrameworkElement
    {
        [Property]
        [BrushTypeConverter]
        public Brush Background { get; set; }
        [Content]
        public UIElement Child { get; set; }

        public override string toJson(int tabIndents)
        {
            StringBuilder sb = new StringBuilder();
            sb.AppendLine("{");
            sb.AppendLine("\tType: Border,");
            sb.AppendLine("\tProps:");
            sb.AppendLine("\t{");
            sb.Append(base.propsToJson());
            if (Background != null)
                sb.Append("Background: ");
                sb.AppendLine(Background.toJson(0));
            if (Child != null)
                sb.AppendLine(string.Format("Child: {0}", Child.toJson(0)));
            sb.AppendLine("\t}");
            sb.AppendLine("}");
            return sb.ToString();
        }
    }
}
