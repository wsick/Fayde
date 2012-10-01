using WickedSick.Server.XamlParser.Elements.Controls;

namespace WickedSick.Server.XamlParser.Elements
{
    public class ToolTipService : DependencyObject
    {
        static ToolTipService() { }
        public static readonly AttachedPropertyDescription PlacementTarget = AttachedPropertyDescription.Register("PlacementTarget", typeof(UIElement), typeof(ToolTipService));
        public static readonly AttachedPropertyDescription ToolTip = AttachedPropertyDescription.Register("ToolTip", typeof(ToolTip), typeof(ToolTipService));
    }
}