using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements.Media.Animation
{
    [Element("Fayde.Media.Animation")]
    public class KeySpline : DependencyObject
    {
        public static readonly PropertyDescription ControlPoint1Property = PropertyDescription.Register("ControlPoint1", typeof(Point), typeof(KeySpline));
        public static readonly PropertyDescription ControlPoint2Property = PropertyDescription.Register("ControlPoint2", typeof(Point), typeof(KeySpline));
    }
}