using System.Collections.Generic;
using WickedSick.Server.XamlParser.TypeConverters;

namespace WickedSick.Server.XamlParser.Elements.Shapes
{
    [Element]
    public class Polyline : Shape
    {
        public static readonly PropertyDescription FillRuleProperty = PropertyDescription.Register("FillRule", typeof(FillRule), typeof(Polyline));
        public static readonly PropertyDescription PointsProperty = PropertyDescription.Register("Points", typeof(List<Point>), typeof(Polyline));
    }
}