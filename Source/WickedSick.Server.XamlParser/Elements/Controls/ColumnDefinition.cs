using WickedSick.Server.XamlParser.Elements.Core;
using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements.Controls
{
    [Element("Fayde.Controls")]
    public class ColumnDefinition : DependencyObject
    {
        public static readonly PropertyDescription WidthProperty = PropertyDescription.Register("Width", typeof(GridLength), typeof(ColumnDefinition));
        public static readonly PropertyDescription MaxWidthProperty = PropertyDescription.Register("MaxWidth", typeof(Double), typeof(ColumnDefinition));
        public static readonly PropertyDescription MinWidthProperty = PropertyDescription.Register("MinWidth", typeof(Double), typeof(ColumnDefinition));
    }
}