
namespace WickedSick.Server.XamlParser.Elements.Types
{
    public class JsType : IJsonConvertible
    {
        public string Value { get; protected set; }

        public JsType(string value)
        {
            Value = value;
        }

        public string ToJson(int tabIndents, IJsonOutputModifiers outputMods)
        {
            var type = TypeResolver.GetElementType(DependencyObject.DEFAULT_NS, Value);
            if (type == null)
                return Value;
            return ElementAttribute.GetFullNullstoneType(type, outputMods);
        }
    }
}