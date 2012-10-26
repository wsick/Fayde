using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements.Media.Animation
{
    public class Storyboard : Timeline
    {
        public static readonly PropertyDescription AnimationsProperty = PropertyDescription.Register("Animations", typeof(DependencyObjectCollection<Timeline>), typeof(Storyboard), true);
        public static readonly AttachedPropertyDescription TargetNameProperty = AttachedPropertyDescription.Register("TargetName", typeof(string), typeof(Storyboard));
        public static readonly AttachedPropertyDescription TargetPropertyProperty = AttachedPropertyDescription.Register("TargetProperty", typeof(PropertyPath), typeof(Storyboard));
    }
}