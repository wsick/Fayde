
namespace WickedSick.Server.XamlParser.Elements.Media.Animation
{
    public class ObjectAnimationUsingKeyFrames : Timeline
    {
        public static readonly PropertyDescription KeyFrames = PropertyDescription.Register("KeyFrames", typeof(DependencyObjectCollection<ObjectKeyFrame>), typeof(ObjectAnimationUsingKeyFrames), true);
    }
}