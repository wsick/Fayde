
namespace WickedSick.Server.XamlParser.Elements.Bindings
{
    public class StaticResource: IJsonSerializable
    {
        public string Key { get; protected set; }

        public StaticResource(string key)
        {
            Key = key;
        }

        public string toJson(int tabIndents)
        {
            return string.Format("new StaticResourceMarkup(\"{0}\")", Key);
        }
    }
}
