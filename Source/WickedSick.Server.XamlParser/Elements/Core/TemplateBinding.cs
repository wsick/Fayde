
namespace WickedSick.Server.XamlParser.Elements.Core
{
    [Element("Fayde", "TemplateBindingMarkup")]
    public class TemplateBinding : IJsonConvertible
    {
        public string SourcePropertyName { get; set; }

        public string ToJson(int tabIndents, IJsonOutputModifiers outputMods)
        {
            return string.Format("new {0}(\"{1}\")", ElementAttribute.GetFullNullstoneType(GetType(), outputMods), SourcePropertyName);
        }
    }
}