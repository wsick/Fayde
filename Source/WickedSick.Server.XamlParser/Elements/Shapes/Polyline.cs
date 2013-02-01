using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements.Shapes
{
    [Element(NullstoneNamespace = "Fayde.Shapes")]
    public class Polyline : Shape
    {
        public static readonly PropertyDescription FillRuleProperty = PropertyDescription.Register("FillRule", typeof(FillRule), typeof(Polyline));
        public static readonly PropertyDescription PointsProperty = PropertyDescription.Register("Points", typeof(PointCollection), typeof(Polyline));
    }
}