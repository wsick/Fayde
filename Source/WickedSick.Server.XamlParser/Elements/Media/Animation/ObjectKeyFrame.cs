using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements.Media.Animation
{
    [Element(NullstoneNamespace = "Fayde.Media.Animation")]
    public class ObjectKeyFrame : DependencyObject
    {
        public static readonly PropertyDescription KeyTime = PropertyDescription.Register("KeyTime", typeof(KeyTime), typeof(ObjectKeyFrame));
        public static readonly PropertyDescription Value = PropertyDescription.Register("Value", typeof(object), typeof(ObjectKeyFrame));
    }
}
