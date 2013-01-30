
namespace WickedSick.Server.XamlParser.Elements.Core
{
    [Element(NullstoneNamespace = "Fayde", NullstoneName = "TemplateBindingMarkup")]
    public class TemplateBinding : IJsonConvertible
    {
        public string SourcePropertyName { get; set; }

        public string ToJson(int tabIndents)
        {
            return string.Format("new {0}(\"{1}\")", ElementAttribute.GetFullNullstoneType(GetType()), SourcePropertyName);
        }
    }
}