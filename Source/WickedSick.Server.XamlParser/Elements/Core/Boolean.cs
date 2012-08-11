using System.Text;

namespace WickedSick.Server.XamlParser.Elements.Core
{
    public class Boolean : DependencyObject
    {
        public static readonly PropertyDescription ContentProperty = PropertyDescription.Register("Content", typeof(string), typeof(Boolean), true);
        public string Content
        {
            get { return GetValue("Content") as string; }
            set { SetValue("Content", value); }
        }

        public override string ToJson(int tabIndent)
        {
            var sb = new StringBuilder();
            sb.AppendLine("{");
            sb.AppendLine("Type: Boolean,");
            if (!string.IsNullOrWhiteSpace(Key))
            {
                sb.Append("Key: \"");
                sb.Append(Key);
                sb.AppendLine("\",");
            }
            sb.Append("Value: ");
            sb.AppendLine(Content);
            sb.Append("}");

            return sb.ToString();
        }
    }
}