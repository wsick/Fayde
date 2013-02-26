using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements.Controls
{
    [Element("Fayde.Controls")]
    public class ColumnDefinition : DependencyObject
    {
        public static readonly PropertyDescription WidthProperty = PropertyDescription.Register("Width", typeof(GridLength), typeof(ColumnDefinition));
    }
}