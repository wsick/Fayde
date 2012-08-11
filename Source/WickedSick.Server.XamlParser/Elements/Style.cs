using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements
{
    public class Style : DependencyObject
    {
        public static readonly PropertyDescription Setters = PropertyDescription.Register("Setters", typeof(DependencyObjectCollection<Setter>), typeof(Style), true);
        public static readonly PropertyDescription TargetType = PropertyDescription.Register("TargetType", typeof(JsType), typeof(Style));
        public static readonly PropertyDescription BasedOnProperty = PropertyDescription.Register("BasedOn", typeof(Style), typeof(Style));
    }
}