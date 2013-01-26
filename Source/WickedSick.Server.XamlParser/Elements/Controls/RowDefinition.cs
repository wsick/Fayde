using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements.Controls
{
    [Element(NullstoneNamespace = "Fayde.Controls")]
    public class RowDefinition : DependencyObject
    {
        public static readonly PropertyDescription Height = PropertyDescription.Register("Height", typeof(GridLength), typeof(RowDefinition));
    }
}