
namespace WickedSick.Server.XamlParser.Elements.Controls.Primitives
{
    public class Popup : FrameworkElement
    {
        public static readonly PropertyDescription ChildProperty = PropertyDescription.Register("Child", typeof(UIElement), typeof(Popup), true);
        public static readonly PropertyDescription IsOpenProperty = PropertyDescription.Register("IsOpen", typeof(bool), typeof(Popup));
        public static readonly PropertyDescription HorizontalOffsetProperty = PropertyDescription.Register("HorizontalOffset", typeof(double), typeof(Popup));
        public static readonly PropertyDescription VerticalOffsetProperty = PropertyDescription.Register("VerticalOffset", typeof(double), typeof(Popup));
    }
}