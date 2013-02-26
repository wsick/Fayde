using WickedSick.Server.XamlParser.Elements.Core;

namespace WickedSick.Server.XamlParser.Elements.Controls
{
    [Element("Fayde.Controls")]
    public class StackPanel : Panel
    {
        public static readonly PropertyDescription OrientationProperty = PropertyDescription.Register("Orientation", typeof(Orientation), typeof(StackPanel));
    }
}