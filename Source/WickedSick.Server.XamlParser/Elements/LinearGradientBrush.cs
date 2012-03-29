using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.TypeConverters;

namespace WickedSick.Server.XamlParser.Elements
{
    [Element]
    public class LinearGradientBrush : Brush
    {
        public static readonly PropertyDescription StartPoint = PropertyDescription.Register("StartPoint", typeof(Point), typeof(LinearGradientBrush));
        public static readonly PropertyDescription EndPoint = PropertyDescription.Register("EndPoint", typeof(Point), typeof(LinearGradientBrush));
        public static readonly PropertyDescription GradientStops = PropertyDescription.Register("GradientStops", typeof(List<GradientStop>), typeof(LinearGradientBrush), true);
    }
}
