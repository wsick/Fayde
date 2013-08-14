using Fayde.Core;
using Fayde.Primitives;
using Fayde.Xaml.Metadata;

namespace Fayde.Media.Animation
{
    public class ColorKeyFrame : DependencyObject
    {
        public static readonly PropertyDescription KeyTimeProperty = PropertyDescription.Register("KeyTime", typeof(KeyTime), typeof(ColorKeyFrame));
        public static readonly PropertyDescription ValueProperty = PropertyDescription.Register("Value", typeof(Color), typeof(ColorKeyFrame));
    }
}