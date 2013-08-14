using Fayde.Xaml.Metadata;

namespace Fayde.Media.Animation
{
    public class SplineDoubleKeyFrame : DoubleKeyFrame
    {
        public static readonly PropertyDescription KeySplineProperty = PropertyDescription.Register("KeySpline", typeof(KeySpline), typeof(SplineDoubleKeyFrame));
    }
}