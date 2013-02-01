
namespace WickedSick.Server.XamlParser.Elements.Media.Animation
{
    [Element(NullstoneNamespace = "Fayde.Media.Animation")]
    public class EasingDoubleKeyFrame : DoubleKeyFrame
    {
        public static readonly PropertyDescription EasingFunctionProperty = PropertyDescription.Register("EasingFunction", typeof(IEasingFunction), typeof(EasingDoubleKeyFrame));
    }
}