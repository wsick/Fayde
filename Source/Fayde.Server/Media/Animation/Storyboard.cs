using Fayde.Core;
using Fayde.Data;
using Fayde.Xaml.Metadata;

namespace Fayde.Media.Animation
{
    public class Storyboard : Timeline
    {
        public static readonly PropertyDescription AnimationsProperty = PropertyDescription.Register("Animations", typeof(DependencyObjectCollection<Timeline>), typeof(Storyboard), true);
        public static readonly AttachedPropertyDescription TargetNameProperty = AttachedPropertyDescription.Register("TargetName", typeof(string), typeof(Storyboard));
        public static readonly AttachedPropertyDescription TargetPropertyProperty = AttachedPropertyDescription.Register("TargetProperty", typeof(PropertyPath), typeof(Storyboard));
    }
}