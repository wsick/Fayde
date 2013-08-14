using Fayde.Core;
using Fayde.Media.Animation;
using Fayde.Xaml.Metadata;

namespace Fayde.Media.VSM
{
    public class VisualState : DependencyObject
    {
        public static readonly PropertyDescription Storyboard = PropertyDescription.Register("Storyboard", typeof(Storyboard), typeof(VisualState), true);
    }
}