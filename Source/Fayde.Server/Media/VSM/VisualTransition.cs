using Fayde.Core;
using Fayde.Media.Animation;
using Fayde.Primitives;
using Fayde.Xaml.Metadata;

namespace Fayde.Media.VSM
{
    public class VisualTransition : DependencyObject
    {
        public static readonly PropertyDescription StoryboardProperty = PropertyDescription.Register("Storyboard", typeof(Storyboard), typeof(VisualTransition), true);
        public static readonly PropertyDescription FromProperty = PropertyDescription.Register("From", typeof(string), typeof(VisualTransition));
        public static readonly PropertyDescription ToProperty = PropertyDescription.Register("To", typeof(string), typeof(VisualTransition));
        public static readonly PropertyDescription GeneratedDurationProperty = PropertyDescription.Register("GeneratedDuration", typeof(Duration), typeof(VisualTransition));
    }
}