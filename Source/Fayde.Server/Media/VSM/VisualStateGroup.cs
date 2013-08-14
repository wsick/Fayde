using Fayde.Core;
using Fayde.Xaml.Metadata;

namespace Fayde.Media.VSM
{
    public class VisualStateGroup : DependencyObject
    {
        public static readonly PropertyDescription VisualStates = PropertyDescription.Register("VisualStates", typeof(DependencyObjectCollection<VisualState>), typeof(VisualStateGroup), true);
        public static readonly PropertyDescription TransitionsProperty = PropertyDescription.Register("Transitions", typeof(DependencyObjectCollection<VisualTransition>), typeof(VisualStateGroup));
    }
}