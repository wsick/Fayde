using Fayde.Primitives;
using Fayde.Xaml.Metadata;

namespace Fayde.Core
{
    [Element("Fayde")]
    public class Style : DependencyObject
    {
        public static readonly PropertyDescription SettersProperty = PropertyDescription.Register("Setters", typeof(DependencyObjectCollection<Setter>), typeof(Style), true);
        public static readonly PropertyDescription TargetTypeProperty = PropertyDescription.Register("TargetType", typeof(JsType), typeof(Style));
        public static readonly PropertyDescription BasedOnProperty = PropertyDescription.Register("BasedOn", typeof(Style), typeof(Style));
    }
}