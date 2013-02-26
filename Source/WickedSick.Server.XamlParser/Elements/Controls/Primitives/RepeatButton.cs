
namespace WickedSick.Server.XamlParser.Elements.Controls.Primitives
{
    [Element("Fayde.Controls.Primitives")]
    public class RepeatButton : ButtonBase
    {
        public static readonly PropertyDescription DelayProperty = PropertyDescription.Register("Delay", typeof(double), typeof(RepeatButton));
        public static readonly PropertyDescription IntervalProperty = PropertyDescription.Register("Interval", typeof(double), typeof(RepeatButton));
    }
}
