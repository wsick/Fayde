using Fayde.Core;
using Fayde.Primitives;
using Fayde.Xaml.Metadata;

namespace Fayde.Media
{
    public class LinearGradientBrush : GradientBrush
    {
        public static readonly PropertyDescription StartPointProperty = PropertyDescription.Register("StartPoint", typeof(Point), typeof(LinearGradientBrush));
        public static readonly PropertyDescription EndPointProperty = PropertyDescription.Register("EndPoint", typeof(Point), typeof(LinearGradientBrush));
        public static readonly PropertyDescription GradientStopsProperty = PropertyDescription.Register("GradientStops", typeof(DependencyObjectCollection<GradientStop>), typeof(LinearGradientBrush), true);
    }
}