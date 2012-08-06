
namespace WickedSick.Server.XamlParser.Elements.Types
{
    public class JsType : IJsonConvertible
    {
        public string Value { get; protected set; }

        public JsType(string value)
        {
            Value = value;
        }

        public string ToJson(int tabIndents)
        {
            return Value;
        }
    }
}