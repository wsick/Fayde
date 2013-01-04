using WickedSick.Server.XamlParser.Elements.Core;
using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements.Controls.Primitives
{
    public class ButtonBase : ContentControl
    {
        public static readonly PropertyDescription ClickModeProperty = PropertyDescription.Register("ClickMode", typeof(ClickMode), typeof(ButtonBase));
        public static readonly PropertyDescription IsPressedProperty = PropertyDescription.Register("IsPressed", typeof(Boolean), typeof(ButtonBase));
        public static readonly PropertyDescription IsFocusedProperty = PropertyDescription.Register("IsFocused", typeof(Boolean), typeof(ButtonBase));
        public static readonly PropertyDescription CommandProperty = PropertyDescription.Register("Command", typeof(ICommand), typeof(ButtonBase));
        public static readonly PropertyDescription CommandParameterProperty = PropertyDescription.Register("CommandParameter", typeof(object), typeof(ButtonBase));
    }
}