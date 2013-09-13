using Fayde.Core;
using Fayde.Xaml.Metadata;

namespace Fayde.Media.Animation
{
    public class BeginStoryboard : TriggerAction
    {
        public static readonly PropertyDescription StoryboardProperty = PropertyDescription.Register("Storyboard", typeof(Storyboard), typeof(BeginStoryboard), true);
    }
}