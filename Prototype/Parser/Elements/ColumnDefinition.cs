using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Serialization;
using Parser.TypeConverters;

namespace Parser.Elements
{
    [Element]
    public class ColumnDefinition: IJsonSerializable
    {
        [Property]
        [GridLengthConverter]
        public GridLength Width { get; set; }

        public string toJson(int tabIndents)
        {
            StringBuilder sb = new StringBuilder();
            sb.AppendLine("{");
            sb.AppendLine("Type: ColumnDefinition,");
            if (Width != null)
            {
                sb.AppendLine("Props:");
                sb.AppendLine("{");
                sb.AppendLine(string.Format("Width: new GridLength({0}, {1}.{2}),", Width.Value, Width.UnitType.GetType().Name, Width.UnitType.ToString()));
                sb.AppendLine("}");
            }
            sb.AppendLine("}");
            return sb.ToString();
        }
    }
}
