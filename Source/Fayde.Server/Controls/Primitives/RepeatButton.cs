using Fayde.Core;
using Fayde.Xaml.Metadata;

namespace Fayde.Controls.Primitives
{
    public class RepeatButton : ButtonBase
    {
        public static readonly PropertyDescription DelayProperty = PropertyDescription.Register("Delay", typeof(Double), typeof(RepeatButton));
        public static readonly PropertyDescription IntervalProperty = PropertyDescription.Register("Interval", typeof(Double), typeof(RepeatButton));
    }
}
