using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements.Controls
{
    public class ControlTemplate : DependencyObject
    {
        public static readonly PropertyDescription ContentProperty = PropertyDescription.Register("Content", typeof(UIElement), typeof(ControlTemplate), true);
        public static readonly PropertyDescription TargetTypeProperty = PropertyDescription.Register("TargetType", typeof(JsType), typeof(ControlTemplate));
    }
}