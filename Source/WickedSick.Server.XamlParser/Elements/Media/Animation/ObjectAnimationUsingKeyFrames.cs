
namespace WickedSick.Server.XamlParser.Elements.Media.Animation
{
    [Element(NullstoneNamespace = "Fayde.Media.Animation")]
    public class ObjectAnimationUsingKeyFrames : Timeline
    {
        public static readonly PropertyDescription KeyFrames = PropertyDescription.Register("KeyFrames", typeof(DependencyObjectCollection<ObjectKeyFrame>), typeof(ObjectAnimationUsingKeyFrames), true);
    }
}