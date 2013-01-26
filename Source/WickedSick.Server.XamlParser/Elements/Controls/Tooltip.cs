using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements.Controls
{
    [Element(NullstoneNamespace = "Fayde.Controls")]
    public class ToolTip : ContentControl
    {
        public static readonly PropertyDescription Placement = PropertyDescription.Register("Placement", typeof(PlacementMode), typeof(ToolTip));
        public static readonly PropertyDescription PlacementTarget = PropertyDescription.Register("PlacementTarget", typeof(UIElement), typeof(ToolTip));
    }
}