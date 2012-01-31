using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Serialization;
using Parser.TypeConverters;

namespace Parser.Elements
{
    [Element]
    public class RowDefinition: IJsonSerializable
    {
        [Property]
        [GridLengthConverter]
        public GridLength Height { get; set; }

        public string toJson(int tabIndents)
        {
            StringBuilder sb = new StringBuilder();
            sb.AppendLine("{");
            sb.AppendLine("Type: RowDefinition,");
            if (Height != null)
            {
                sb.AppendLine("Props:");
                sb.AppendLine("{");
                sb.AppendLine(string.Format("Height: new GridLength({0}, {1}.{2}),", Height.Value, Height.UnitType.GetType().Name, Height.UnitType.ToString()));
                sb.AppendLine("}");
            }
            sb.AppendLine("}");
            return sb.ToString();
        }
    }
}
