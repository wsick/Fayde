using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements.Media
{
    [Element("Fayde.Media")]
    public class GradientStop : DependencyObject
    {
        public static readonly PropertyDescription ColorProperty = PropertyDescription.Register("Color", typeof(Color), typeof(GradientStop));
        public static readonly PropertyDescription OffsetProperty = PropertyDescription.Register("Offset", typeof(double), typeof(GradientStop));
    }
}