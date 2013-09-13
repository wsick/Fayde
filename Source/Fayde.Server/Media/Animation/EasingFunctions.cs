using Fayde.Core;
using Fayde.Xaml.Metadata;

namespace Fayde.Media.Animation
{
    public class BackEase : EasingFunctionBase
    {
        public static readonly PropertyDescription AmplitudeProperty = PropertyDescription.Register("Amplitude", typeof(Double), typeof(BackEase));
    }

    public class BounceEase : EasingFunctionBase
    {
        public static readonly PropertyDescription BouncesProperty = PropertyDescription.Register("Bounces", typeof(Double), typeof(BounceEase));
        public static readonly PropertyDescription BouncinessProperty = PropertyDescription.Register("Bounciness", typeof(Double), typeof(BounceEase));
    }

    public class CircleEase : EasingFunctionBase
    {
    }

    public class CubicEase : EasingFunctionBase
    {
    }

    public class ElasticEase : EasingFunctionBase
    {
        public static readonly PropertyDescription OscillationsProperty = PropertyDescription.Register("Oscillations", typeof(Double), typeof(ElasticEase));
        public static readonly PropertyDescription SpringinessProperty = PropertyDescription.Register("Springiness", typeof(Double), typeof(ElasticEase));
    }

    public class ExponentialEase : EasingFunctionBase
    {
        public static readonly PropertyDescription ExponentProperty = PropertyDescription.Register("Exponent", typeof(Double), typeof(ExponentialEase));
    }

    public class PowerEase : EasingFunctionBase
    {
        public static readonly PropertyDescription PowerProperty = PropertyDescription.Register("Power", typeof(Double), typeof(PowerEase));
    }

    public class QuadraticEase : EasingFunctionBase
    {
    }

    public class QuarticEase : EasingFunctionBase
    {
    }

    public class QuinticEase : EasingFunctionBase
    {
    }

    public class SineEase : EasingFunctionBase
    {
    }
}