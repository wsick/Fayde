
namespace WickedSick.Server.XamlParser.Elements.Controls.Primitives
{
    public class RangeBase : Control
    {
        public readonly static PropertyDescription MinimumProperty = PropertyDescription.Register("Minimum", typeof(double), typeof(RangeBase));
        public readonly static PropertyDescription MaximumProperty = PropertyDescription.Register("Maximum", typeof(double), typeof(RangeBase));
        public readonly static PropertyDescription LargeChangeProperty = PropertyDescription.Register("LargeChange", typeof(double), typeof(RangeBase));
        public readonly static PropertyDescription SmallChangeProperty = PropertyDescription.Register("SmallChange", typeof(double), typeof(RangeBase));
        public readonly static PropertyDescription CurrentValueProperty = PropertyDescription.Register("CurrentValue", typeof(double), typeof(RangeBase));
    }
}