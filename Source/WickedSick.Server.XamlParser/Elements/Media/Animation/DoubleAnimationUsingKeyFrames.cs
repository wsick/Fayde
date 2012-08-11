
namespace WickedSick.Server.XamlParser.Elements.Media.Animation
{
    public class DoubleAnimationUsingKeyFrames : Timeline
    {
        public static readonly PropertyDescription KeyFrames = PropertyDescription.Register("KeyFrames", typeof(DependencyObjectCollection<DoubleKeyFrame>), typeof(DoubleAnimationUsingKeyFrames), true);
    }
}