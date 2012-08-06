
namespace WickedSick.Server.XamlParser.Elements.Bindings
{
    public class StaticResource: IJsonConvertible
    {
        public string Key { get; protected set; }

        public StaticResource(string key)
        {
            Key = key;
        }

        public string ToJson(int tabIndents)
        {
            return string.Format("new StaticResourceMarkup(\"{0}\")", Key);
        }
    }
}
