using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements.Controls
{
    [Element("Fayde.Controls")]
    public class RowDefinition : DependencyObject
    {
        public static readonly PropertyDescription HeightProperty = PropertyDescription.Register("Height", typeof(GridLength), typeof(RowDefinition));
    }
}