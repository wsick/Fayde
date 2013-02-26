
namespace WickedSick.Server.XamlParser.Elements.Media.Animation
{
    [Element("Fayde.Media.Animation")]
    public class ColorAnimationUsingKeyFrames : Timeline
    {
        public static readonly PropertyDescription KeyFramesProperty = PropertyDescription.Register("KeyFrames", typeof(DependencyObjectCollection<ColorKeyFrame>), typeof(ColorAnimationUsingKeyFrames), true);
    }
}