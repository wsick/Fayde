using System.Text;
using Fayde.Xaml;
using Fayde.Xaml.Metadata;

namespace Fayde.Core
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
            var contents = "null";
            bool content = false;
            if (!string.IsNullOrWhiteSpace(contents) && bool.TryParse(Content, out content))
                contents = content.ToString();

            if (string.IsNullOrWhiteSpace(Key) || string.IsNullOrWhiteSpace(Name))
                return contents;

            var sb = new StringBuilder();
            sb.AppendLine("{");
            sb.AppendLine("ParseType: Boolean,");
            sb.Append("Key: \"");
            if (string.IsNullOrWhiteSpace(Key))
                sb.Append(Name);
            else
                sb.Append(Key);
            sb.AppendLine("\",");

            sb.AppendFormat("Value: {0}", contents);
            
            sb.Append("}");

            return sb.ToString();
        }
    }
}