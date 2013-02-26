using WickedSick.Server.XamlParser.Elements.Controls.Primitives;
using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements.Controls
{
    [Element("Fayde.Controls")]
    public class ListBox : Selector
    {
        public static readonly PropertyDescription SelectionModeProperty = PropertyDescription.Register("SelectionMode", typeof(SelectionMode), typeof(ListBox));
    }
}