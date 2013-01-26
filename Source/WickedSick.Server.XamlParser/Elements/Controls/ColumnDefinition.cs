using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements.Controls
{
    [Element(NullstoneNamespace = "Fayde.Controls")]
    public class ColumnDefinition : DependencyObject
    {
        public static readonly PropertyDescription Width = PropertyDescription.Register("Width", typeof(GridLength), typeof(ColumnDefinition));
    }
}