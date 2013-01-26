using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements.Controls
{
    [Element(NullstoneNamespace = "Fayde.Controls")]
    public class ScrollViewer : ContentControl
    {
        public static readonly PropertyDescription HorizontalScrollBarVisibilityProperty = PropertyDescription.Register("HorizontalScrollBarVisibility", typeof(ScrollBarVisibility), typeof(ScrollViewer));
        public static readonly PropertyDescription VerticalScrollBarVisibilityProperty = PropertyDescription.Register("VerticalScrollBarVisibility", typeof(ScrollBarVisibility), typeof(ScrollViewer));
    }
}