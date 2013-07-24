
namespace WickedSick.Server.XamlParser.Elements.Controls.Primitives
{
    [Element("Fayde.Controls.Primitives")]
    public class Selector : ItemsControl
    {
        public static readonly PropertyDescription SelectedItemProperty = PropertyDescription.Register("SelectedItem", typeof(object), typeof(Selector));
    }
}