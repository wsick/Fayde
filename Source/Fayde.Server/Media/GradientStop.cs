using Fayde.Core;
using Fayde.Primitives;
using Fayde.Xaml.Metadata;

namespace Fayde.Media
{
    public class GradientStop : DependencyObject
    {
        public static readonly PropertyDescription ColorProperty = PropertyDescription.Register("Color", typeof(Color), typeof(GradientStop));
        public static readonly PropertyDescription OffsetProperty = PropertyDescription.Register("Offset", typeof(Double), typeof(GradientStop));
    }
}