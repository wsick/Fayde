using Fayde.Xaml.Metadata;

namespace Fayde.Shapes
{
    [Element("Fayde.Shapes")]
    public class Polyline : Shape
    {
        public static readonly PropertyDescription FillRuleProperty = PropertyDescription.Register("FillRule", typeof(FillRule), typeof(Polyline));
        public static readonly PropertyDescription PointsProperty = PropertyDescription.Register("Points", typeof(PointCollection), typeof(Polyline));
    }
}