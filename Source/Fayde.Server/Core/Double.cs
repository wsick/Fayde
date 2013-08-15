using System.Text;
using Fayde.Xaml;
using Fayde.Xaml.Metadata;

namespace Fayde.Core
{
    public class Double : DependencyObject
    {
        public static readonly PropertyDescription ContentProperty = PropertyDescription.Register("Content", typeof(string), typeof(Double), true);
        public string Content
        {
            get { return GetValue("Content") as string; }
            set { SetValue("Content", value); }
        }

        public override string ToJson(int tabIndent, IJsonOutputModifiers outputMods)
        {
            if (string.IsNullOrWhiteSpace(Key) && string.IsNullOrWhiteSpace(Name))
                return Content;

            var sb = new StringBuilder();
            sb.AppendLine("{");
            sb.AppendLine("ParseType: Number,");
            sb.Append("Key: \"");
            if (string.IsNullOrWhiteSpace(Key))
                sb.Append(Name);
            else
                sb.Append(Key);
            sb.AppendLine("\",");
            sb.Append("Value: ");
            sb.AppendLine(Content);
            sb.Append("}");

            return sb.ToString();
        }
    }
}