using WickedSick.Server.XamlParser.Elements.Controls;

namespace WickedSick.Server.XamlParser.Elements.Controls
{
    [Element(NullstoneNamespace = "Fayde.Controls")]
    public class ToolTipService : DependencyObject
    {
        public static readonly AttachedPropertyDescription PlacementTargetProperty = AttachedPropertyDescription.Register("PlacementTarget", typeof(UIElement), typeof(ToolTipService));
        public static readonly AttachedPropertyDescription ToolTipProperty = AttachedPropertyDescription.Register("ToolTip", typeof(ToolTip), typeof(ToolTipService));
    }
}