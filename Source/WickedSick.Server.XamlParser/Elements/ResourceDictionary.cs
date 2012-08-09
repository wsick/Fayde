using System.Text;

namespace WickedSick.Server.XamlParser.Elements
{
    public class ResourceDictionary : DependencyObjectCollection<DependencyObject>
    {
        public override string ToJson(int tabIndents)
        {
            var sb = new StringBuilder();
            sb.AppendLine("{");
            sb.AppendLine("Type: ResourceDictionary, ");
            sb.Append("Children: ");
            sb.AppendLine(base.ToJson(tabIndents + 1));
            sb.Append("}");
            return sb.ToString();
        }
    }
}