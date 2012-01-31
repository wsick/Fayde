using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Serialization;
using Parser.TypeConverters;

namespace Parser.Elements
{
    [Element]
    public class StackPanel: Panel
    {
        [Property]
        [OrientationConverter]
        public Orientation Orientation { get; set; }

        public override string toJson(int tabIndents)
        {
            StringBuilder sb = new StringBuilder();
            sb.AppendLine("{");
            sb.AppendLine("\tType: StackPanel,");
            sb.AppendLine("\tProps:");
            sb.AppendLine("\t{");
            sb.Append(base.propsToJson());
            if (Orientation != null)
            {
                sb.Append("Orientation: ");
                sb.AppendLine(Orientation.toJson(0));
            }
            sb.AppendLine("\t},");
            sb.AppendLine("\tChildren: [");
            sb.Append(base.contentToJson());
            sb.AppendLine("\t]");
            sb.AppendLine("}");
            return sb.ToString();
        }
    }
}
