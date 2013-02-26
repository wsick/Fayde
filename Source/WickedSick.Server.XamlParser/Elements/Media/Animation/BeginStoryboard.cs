
namespace WickedSick.Server.XamlParser.Elements.Media.Animation
{
    [Element("Fayde.Media.Animation")]
    public class BeginStoryboard : TriggerAction
    {
        public static readonly PropertyDescription StoryboardProperty = PropertyDescription.Register("Storyboard", typeof(Storyboard), typeof(BeginStoryboard), true);
    }
}