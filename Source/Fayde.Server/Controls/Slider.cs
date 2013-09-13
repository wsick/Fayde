using Fayde.Controls.Primitives;
using Fayde.Core;
using Fayde.Xaml.Metadata;

namespace Fayde.Controls
{
    public class Slider : RangeBase
    {
        public static readonly PropertyDescription OrientationProperty = PropertyDescription.Register("Orientation", typeof(Orientation), typeof(Slider));
    }
}