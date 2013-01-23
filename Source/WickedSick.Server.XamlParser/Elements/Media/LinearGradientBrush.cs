using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements.Media
{
    [Element(NullstoneNamespace="Fayde.Media")]
    public class LinearGradientBrush : GradientBrush
    {
        public static readonly PropertyDescription StartPointProperty = PropertyDescription.Register("StartPoint", typeof(Point), typeof(LinearGradientBrush));
        public static readonly PropertyDescription EndPointProperty = PropertyDescription.Register("EndPoint", typeof(Point), typeof(LinearGradientBrush));
        public static readonly PropertyDescription GradientStopsProperty = PropertyDescription.Register("GradientStops", typeof(DependencyObjectCollection<GradientStop>), typeof(LinearGradientBrush), true);
    }
}