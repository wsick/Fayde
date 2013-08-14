using Fayde.Core;
using Fayde.Primitives;
using Fayde.Xaml.Metadata;

namespace Fayde.Media.Animation
{
    public class DoubleKeyFrame : DependencyObject
    {
        public static readonly PropertyDescription KeyTimeProperty = PropertyDescription.Register("KeyTime", typeof(KeyTime), typeof(DoubleKeyFrame));
        public static readonly PropertyDescription ValueProperty = PropertyDescription.Register("Value", typeof(double), typeof(DoubleKeyFrame));
    }
}