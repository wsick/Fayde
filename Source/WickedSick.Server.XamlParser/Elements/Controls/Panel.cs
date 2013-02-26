using WickedSick.Server.XamlParser.Elements.Media;

namespace WickedSick.Server.XamlParser.Elements.Controls
{
    [Element("Fayde.Controls")]
    public class Panel : FrameworkElement
    {
        public static readonly PropertyDescription BackgroundProperty = PropertyDescription.Register("Background", typeof(Brush), typeof(Panel));
        public static readonly PropertyDescription ChildrenProperty = PropertyDescription.Register("Children", typeof(DependencyObjectCollection<UIElement>), typeof(Panel), true);
    }
}