using Fayde.Core;
using Fayde.Xaml.Metadata;

namespace Fayde.Controls.Primitives
{
    public class RangeBase : Control
    {
        public readonly static PropertyDescription MinimumProperty = PropertyDescription.Register("Minimum", typeof(Double), typeof(RangeBase));
        public readonly static PropertyDescription MaximumProperty = PropertyDescription.Register("Maximum", typeof(Double), typeof(RangeBase));
        public readonly static PropertyDescription LargeChangeProperty = PropertyDescription.Register("LargeChange", typeof(Double), typeof(RangeBase));
        public readonly static PropertyDescription SmallChangeProperty = PropertyDescription.Register("SmallChange", typeof(Double), typeof(RangeBase));
        public readonly static PropertyDescription ValueProperty = PropertyDescription.Register("Value", typeof(Double), typeof(RangeBase));
    }
}