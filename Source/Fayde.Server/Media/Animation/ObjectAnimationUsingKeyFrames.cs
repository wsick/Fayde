using Fayde.Core;
using Fayde.Xaml.Metadata;

namespace Fayde.Media.Animation
{
    public class ObjectAnimationUsingKeyFrames : Timeline
    {
        public static readonly PropertyDescription KeyFrames = PropertyDescription.Register("KeyFrames", typeof(DependencyObjectCollection<ObjectKeyFrame>), typeof(ObjectAnimationUsingKeyFrames), true);
    }
}