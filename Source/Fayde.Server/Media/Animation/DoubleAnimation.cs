using Fayde.Xaml.Metadata;

namespace Fayde.Media.Animation
{
    public class DoubleAnimation : Timeline
    {
        public static readonly PropertyDescription FromProperty = PropertyDescription.Register("From", typeof(double), typeof(DoubleAnimation));
        public static readonly PropertyDescription ToProperty = PropertyDescription.Register("To", typeof(double), typeof(DoubleAnimation));
        public static readonly PropertyDescription ByProperty = PropertyDescription.Register("By", typeof(double), typeof(DoubleAnimation));
        public static readonly PropertyDescription EasingFunctionProperty = PropertyDescription.Register("EasingFunction", typeof(IEasingFunction), typeof(DoubleAnimation));
    }
}