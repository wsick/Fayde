
namespace WickedSick.Server.XamlParser.Elements.Media.Animation
{
    public class EasingColorKeyFrame : ColorKeyFrame
    {
        public static readonly PropertyDescription EasingFunctionProperty = PropertyDescription.Register("EasingFunction", typeof(IEasingFunction), typeof(EasingColorKeyFrame));
    }
}