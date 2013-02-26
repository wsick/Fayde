using System.Text;

namespace WickedSick.Server.XamlParser.Elements
{
    [Element("Fayde")]
    public class ResourceDictionary : DependencyObjectCollection<DependencyObject>
    {
        public override string ToJson(int tabIndents, IJsonOutputModifiers outputMods)
        {
            var sb = new StringBuilder();
            sb.AppendLine("{");
            sb.AppendLine(string.Format("Type: {0}, ", GetTypeName(outputMods)));
            sb.Append("Children: ");
            sb.AppendLine(base.ToJson(tabIndents + 1, outputMods));
            sb.Append("}");
            return sb.ToString();
        }
    }
}