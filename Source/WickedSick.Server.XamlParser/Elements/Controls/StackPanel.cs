using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements.Controls
{
    [Element(NullstoneNamespace = "Fayde.Controls")]
    public class StackPanel : Panel
    {
        public static readonly PropertyDescription Orientation = PropertyDescription.Register("Orientation", typeof(Orientation), typeof(StackPanel));
    }
}