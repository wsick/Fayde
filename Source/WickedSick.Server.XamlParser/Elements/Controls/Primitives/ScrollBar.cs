using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements.Controls.Primitives
{
    public class ScrollBar : RangeBase
    {
        public static readonly PropertyDescription OrientationProperty = PropertyDescription.Register("Orientation", typeof(Orientation), typeof(ScrollBar));
        public static readonly PropertyDescription ViewportSizeProperty = PropertyDescription.Register("ViewportSize", typeof(double), typeof(ScrollBar));
    }
}