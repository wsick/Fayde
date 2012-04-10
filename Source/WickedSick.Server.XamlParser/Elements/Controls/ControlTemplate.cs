
namespace WickedSick.Server.XamlParser.Elements.Controls
{
    public class ControlTemplate: DependencyObject
    {
        public static readonly PropertyDescription Content = PropertyDescription.Register("Content", typeof(UIElement), typeof(ControlTemplate), true);
        public static readonly PropertyDescription TargetType = PropertyDescription.Register("TargetType", typeof(string), typeof(ControlTemplate));
    }
}
