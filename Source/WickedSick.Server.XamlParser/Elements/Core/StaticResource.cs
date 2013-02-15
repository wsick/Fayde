
namespace WickedSick.Server.XamlParser.Elements.Core
{
    [Element(NullstoneNamespace = "Fayde", NullstoneName = "StaticResourceMarkup")]
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

        public override string ToJson(int tabIndents, IJsonOutputModifiers outputMods)
        {
            return string.Format("new {0}(\"{1}\")", GetTypeName(outputMods), ResourceKey);
        }
    }
}