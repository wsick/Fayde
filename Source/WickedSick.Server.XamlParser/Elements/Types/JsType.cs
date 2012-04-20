
namespace WickedSick.Server.XamlParser.Elements.Types
{
    public class JsType : IJsonSerializable
    {
        public string Value { get; protected set; }

        public JsType(string value)
        {
            Value = value;
        }

        public string toJson(int tabIndents)
        {
            return Value;
        }
    }
}