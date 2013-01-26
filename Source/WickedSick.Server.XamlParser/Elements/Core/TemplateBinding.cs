
namespace WickedSick.Server.XamlParser.Elements.Core
{
    public class TemplateBinding : IJsonConvertible
    {
        public string SourcePropertyName { get; set; }

        public string ToJson(int tabIndents)
        {
            return string.Format("new TemplateBindingMarkup(\"{0}\")", SourcePropertyName);
        }
    }
}