using WickedSick.Server.XamlParser.Elements.Media;

namespace WickedSick.Server.XamlParser.Elements.Controls
{
    [Element(NullstoneNamespace = "Fayde.Controls")]
    public class Panel : FrameworkElement
    {
        public static readonly PropertyDescription Background = PropertyDescription.Register("Background", typeof(Brush), typeof(Panel));
        public static readonly PropertyDescription Children = PropertyDescription.Register("Children", typeof(DependencyObjectCollection<UIElement>), typeof(Panel), true);
    }
}