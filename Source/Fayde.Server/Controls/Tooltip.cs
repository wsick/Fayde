using Fayde.Core;
using Fayde.Xaml.Metadata;

namespace Fayde.Controls
{
    public class ToolTip : ContentControl
    {
        public static readonly PropertyDescription Placement = PropertyDescription.Register("Placement", typeof(PlacementMode), typeof(ToolTip));
        public static readonly PropertyDescription PlacementTarget = PropertyDescription.Register("PlacementTarget", typeof(UIElement), typeof(ToolTip));
    }
}