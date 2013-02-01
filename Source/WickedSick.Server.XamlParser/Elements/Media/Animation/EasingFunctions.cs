using WickedSick.Server.XamlParser.Elements.Core;

namespace WickedSick.Server.XamlParser.Elements.Media.Animation
{
    [Element(NullstoneNamespace="Fayde.Media.Animation")]
    public class BackEase : EasingFunctionBase
    {
        public static readonly PropertyDescription AmplitudeProperty = PropertyDescription.Register("Amplitude", typeof(double), typeof(BackEase));
    }

    [Element(NullstoneNamespace = "Fayde.Media.Animation")]
    public class BounceEase : EasingFunctionBase
    {
        public static readonly PropertyDescription BouncesProperty = PropertyDescription.Register("Bounces", typeof(Double), typeof(BounceEase));
        public static readonly PropertyDescription BouncinessProperty = PropertyDescription.Register("Bounciness", typeof(Double), typeof(BounceEase));
    }

    [Element(NullstoneNamespace = "Fayde.Media.Animation")]
    public class CircleEase : EasingFunctionBase
    {
    }

    [Element(NullstoneNamespace = "Fayde.Media.Animation")]
    public class CubicEase : EasingFunctionBase
    {
    }

    [Element(NullstoneNamespace = "Fayde.Media.Animation")]
    public class ElasticEase : EasingFunctionBase
    {
        public static readonly PropertyDescription OscillationsProperty = PropertyDescription.Register("Oscillations", typeof(Double), typeof(ElasticEase));
        public static readonly PropertyDescription SpringinessProperty = PropertyDescription.Register("Springiness", typeof(Double), typeof(ElasticEase));
    }

    [Element(NullstoneNamespace = "Fayde.Media.Animation")]
    public class ExponentialEase : EasingFunctionBase
    {
        public static readonly PropertyDescription ExponentProperty = PropertyDescription.Register("Exponent", typeof(Double), typeof(ExponentialEase));
    }

    [Element(NullstoneNamespace = "Fayde.Media.Animation")]
    public class PowerEase : EasingFunctionBase
    {
        public static readonly PropertyDescription PowerProperty = PropertyDescription.Register("Power", typeof(Double), typeof(PowerEase));
    }

    [Element(NullstoneNamespace = "Fayde.Media.Animation")]
    public class QuadraticEase : EasingFunctionBase
    {
    }

    [Element(NullstoneNamespace = "Fayde.Media.Animation")]
    public class QuarticEase : EasingFunctionBase
    {
    }

    [Element(NullstoneNamespace = "Fayde.Media.Animation")]
    public class QuinticEase : EasingFunctionBase
    {
    }

    [Element(NullstoneNamespace = "Fayde.Media.Animation")]
    public class SineEase : EasingFunctionBase
    {
    }
}