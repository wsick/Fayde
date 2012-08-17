using WickedSick.Server.XamlParser.Elements.Controls.Primitives;

namespace WickedSick.Server.XamlParser.Elements.Controls
{
    public class CheckBox : ToggleButton
    {
        public static readonly PropertyDescription IsCheckedProperty = PropertyDescription.Register("IsChecked", typeof(Core.Boolean), typeof(CheckBox));
        public static readonly PropertyDescription IsIndeterminateProperty = PropertyDescription.Register("IsIndeterminate", typeof(bool), typeof(CheckBox));
    }
}