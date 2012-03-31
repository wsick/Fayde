using System.Collections.Generic;

namespace WickedSick.Server.XamlParser.Elements.Shapes
{
    [Element]
    public class Polyline : Shape
    {
        public static readonly PropertyDescription FillRuleProperty = PropertyDescription.Register("FillRule", typeof(FillRule), typeof(Polyline));
        public static readonly PropertyDescription PointsProperty = PropertyDescription.Register("Points", typeof(List<Points>), typeof(Polyline));
    }
}