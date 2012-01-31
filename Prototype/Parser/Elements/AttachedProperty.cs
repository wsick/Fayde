using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Parser.Elements
{
    public class AttachedProperty
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
