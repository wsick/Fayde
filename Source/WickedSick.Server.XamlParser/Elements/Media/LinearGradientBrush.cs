using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.TypeConverters;
using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements.Media
{
    public class LinearGradientBrush : GradientBrush
    {
        public static readonly PropertyDescription StartPoint = PropertyDescription.Register("StartPoint", typeof(Point), typeof(LinearGradientBrush));
        public static readonly PropertyDescription EndPoint = PropertyDescription.Register("EndPoint", typeof(Point), typeof(LinearGradientBrush));
        public static readonly PropertyDescription GradientStops = PropertyDescription.Register("GradientStops", typeof(DependencyObjectCollection<GradientStop>), typeof(LinearGradientBrush), true);
    }
}
