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

        public override string ToJson(int tabIndent, IJsonOutputModifiers outputMods)
        {
            var sb = new StringBuilder();
            sb.AppendLine("{");
            sb.AppendLine("ParseType: Boolean,");
            if (!string.IsNullOrWhiteSpace(Key))
            {
                sb.Append("Key: \"");
                sb.Append(Key);
                sb.AppendLine("\",");
            }
            bool content;
            if (!bool.TryParse(Content, out content))
                content = false;

            sb.Append("Value: ");
            if (string.IsNullOrWhiteSpace(Content))
                sb.AppendLine("null");
            else
                sb.AppendLine(content.ToString().ToLower());
            sb.Append("}");

            return sb.ToString();
        }
    }
}