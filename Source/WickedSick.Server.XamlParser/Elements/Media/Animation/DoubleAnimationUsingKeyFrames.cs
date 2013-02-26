
namespace WickedSick.Server.XamlParser.Elements.Media.Animation
{
    [Element("Fayde.Media.Animation")]
    public class DoubleAnimationUsingKeyFrames : Timeline
    {
        public static readonly PropertyDescription KeyFramesProperty = PropertyDescription.Register("KeyFrames", typeof(DependencyObjectCollection<DoubleKeyFrame>), typeof(DoubleAnimationUsingKeyFrames), true);
    }
}