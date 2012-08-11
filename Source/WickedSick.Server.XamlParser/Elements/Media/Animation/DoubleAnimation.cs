
namespace WickedSick.Server.XamlParser.Elements.Media.Animation
{
    public class DoubleAnimation : Timeline
    {
        public static readonly PropertyDescription From = PropertyDescription.Register("From", typeof(double), typeof(DoubleAnimation));
        public static readonly PropertyDescription To = PropertyDescription.Register("To", typeof(double), typeof(DoubleAnimation));
        public static readonly PropertyDescription By = PropertyDescription.Register("By", typeof(double), typeof(DoubleAnimation));
        public static readonly PropertyDescription EasingFunctionProperty = PropertyDescription.Register("EasingFunction", typeof(IEasingFunction), typeof(DoubleAnimation));
    }
}