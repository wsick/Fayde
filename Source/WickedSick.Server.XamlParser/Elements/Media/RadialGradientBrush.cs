using WickedSick.Server.XamlParser.Elements.Core;
using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements.Media
{
    [Element("Fayde.Media")]
    public class RadialGradientBrush : GradientBrush
    {
        public static readonly PropertyDescription CenterProperty = PropertyDescription.Register("Center", typeof(Point), typeof(RadialGradientBrush));
        public static readonly PropertyDescription GradientOriginProperty = PropertyDescription.Register("GradientOrigin", typeof(Point), typeof(RadialGradientBrush));
        public static readonly PropertyDescription RadiusXProperty = PropertyDescription.Register("RadiusX", typeof(Double), typeof(RadialGradientBrush));
        public static readonly PropertyDescription RadiusYProperty = PropertyDescription.Register("RadiusY", typeof(Double), typeof(RadialGradientBrush));
    }
}
