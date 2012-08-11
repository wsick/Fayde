
namespace WickedSick.Server.XamlParser.Elements.Bindings
{
    public class StaticResource : DependencyObject
    {
        public StaticResource() { }

        public StaticResource(string resourceKey)
        {
            ResourceKey = resourceKey;
        }

        public static readonly PropertyDescription ResourceKeyProperty = PropertyDescription.Register("ResourceKey", typeof(string), typeof(StaticResource));
        public string ResourceKey
        {
            get { return GetValue("ResourceKey") as string; }
            set { SetValue("ResourceKey", value); }
        }

        public override string ToJson(int tabIndents)
        {
            return string.Format("new StaticResourceMarkup(\"{0}\")", ResourceKey);
        }
    }
}
