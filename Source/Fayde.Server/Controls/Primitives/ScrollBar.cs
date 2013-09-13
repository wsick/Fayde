using Fayde.Core;
using Fayde.Xaml.Metadata;

namespace Fayde.Controls.Primitives
{
    public class ScrollBar : RangeBase
    {
        public static readonly PropertyDescription OrientationProperty = PropertyDescription.Register("Orientation", typeof(Orientation), typeof(ScrollBar));
        public static readonly PropertyDescription ViewportSizeProperty = PropertyDescription.Register("ViewportSize", typeof(Double), typeof(ScrollBar));
    }
}