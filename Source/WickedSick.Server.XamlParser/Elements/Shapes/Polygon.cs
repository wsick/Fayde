using System.Collections.Generic;
using WickedSick.Server.XamlParser.TypeConverters;
using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements.Shapes
{
    public class Polygon : Shape
    {
        public static readonly PropertyDescription FillRuleProperty = PropertyDescription.Register("FillRule", typeof(FillRule), typeof(Polygon));
        public static readonly PropertyDescription PointsProperty = PropertyDescription.Register("Points", typeof(DependencyObjectCollection<Point>), typeof(Polygon));
    }
}