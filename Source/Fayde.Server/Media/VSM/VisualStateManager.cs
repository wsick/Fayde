using Fayde.Core;
using Fayde.Xaml.Metadata;

namespace Fayde.Media.VSM
{
    public class VisualStateManager : DependencyObject
    {
        public static readonly AttachedPropertyDescription VisualStateGroupsProperty = AttachedPropertyDescription.Register("VisualStateGroups", typeof(DependencyObjectCollection<VisualStateGroup>), typeof(VisualStateManager));
    }
}