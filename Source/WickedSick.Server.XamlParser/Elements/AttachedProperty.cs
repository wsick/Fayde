using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.Server.XamlParser.Elements
{
    public class AttachedProperty: IJsonSerializable
    {
        public string Owner { get; set; }
        public string Property { get; set; }
        public string Value { get; set; }

        public string toJson(int tabIndents)
        {
            StringBuilder sb = new StringBuilder();
            sb.AppendLine("{");
            sb.AppendLine(string.Format("Owner: {0},", Owner));
            sb.AppendLine(string.Format("Prop: \"{0}\",", Property));
            sb.AppendLine(string.Format("Value: {0}", Value));
            sb.Append("}");
            return sb.ToString();
        }
    }
}
