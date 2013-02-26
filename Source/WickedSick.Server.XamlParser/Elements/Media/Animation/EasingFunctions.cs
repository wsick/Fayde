using WickedSick.Server.XamlParser.Elements.Core;

namespace WickedSick.Server.XamlParser.Elements.Media.Animation
{
    [Element("Fayde.Media.Animation")]
    public class BackEase : EasingFunctionBase
    {
        public static readonly PropertyDescription AmplitudeProperty = PropertyDescription.Register("Amplitude", typeof(double), typeof(BackEase));
    }

    [Element("Fayde.Media.Animation")]
    public class BounceEase : EasingFunctionBase
    {
        public static readonly PropertyDescription BouncesProperty = PropertyDescription.Register("Bounces", typeof(Double), typeof(BounceEase));
        public static readonly PropertyDescription BouncinessProperty = PropertyDescription.Register("Bounciness", typeof(Double), typeof(BounceEase));
    }

    [Element("Fayde.Media.Animation")]
    public class CircleEase : EasingFunctionBase
    {
    }

    [Element("Fayde.Media.Animation")]
    public class CubicEase : EasingFunctionBase
    {
    }

    [Element("Fayde.Media.Animation")]
    public class ElasticEase : EasingFunctionBase
    {
        public static readonly PropertyDescription OscillationsProperty = PropertyDescription.Register("Oscillations", typeof(Double), typeof(ElasticEase));
        public static readonly PropertyDescription SpringinessProperty = PropertyDescription.Register("Springiness", typeof(Double), typeof(ElasticEase));
    }

    [Element("Fayde.Media.Animation")]
    public class ExponentialEase : EasingFunctionBase
    {
        public static readonly PropertyDescription ExponentProperty = PropertyDescription.Register("Exponent", typeof(Double), typeof(ExponentialEase));
    }

    [Element("Fayde.Media.Animation")]
    public class PowerEase : EasingFunctionBase
    {
        public static readonly PropertyDescription PowerProperty = PropertyDescription.Register("Power", typeof(Double), typeof(PowerEase));
    }

    [Element("Fayde.Media.Animation")]
    public class QuadraticEase : EasingFunctionBase
    {
    }

    [Element("Fayde.Media.Animation")]
    public class QuarticEase : EasingFunctionBase
    {
    }

    [Element("Fayde.Media.Animation")]
    public class QuinticEase : EasingFunctionBase
    {
    }

    [Element("Fayde.Media.Animation")]
    public class SineEase : EasingFunctionBase
    {
    }
}