using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements.Controls.Primitives
{
    public class ButtonBase : ContentControl
    {
        public static readonly PropertyDescription ClickModeProperty = PropertyDescription.Register("ClickMode", typeof(ClickMode), typeof(ButtonBase));
    }
}