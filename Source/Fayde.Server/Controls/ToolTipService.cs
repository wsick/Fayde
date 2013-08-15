using Fayde.Core;
using Fayde.Xaml.Metadata;

namespace Fayde.Controls
{
    public class ToolTipService : DependencyObject
    {
        public static readonly AttachedPropertyDescription PlacementTargetProperty = AttachedPropertyDescription.Register("PlacementTarget", typeof(UIElement), typeof(ToolTipService));
        public static readonly AttachedPropertyDescription ToolTipProperty = AttachedPropertyDescription.Register("ToolTip", typeof(ToolTip), typeof(ToolTipService));
    }
}