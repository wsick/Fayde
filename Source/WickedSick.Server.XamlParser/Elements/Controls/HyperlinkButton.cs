using WickedSick.Server.XamlParser.Elements.Controls.Primitives;
using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements.Controls
{
    [Element("Fayde.Controls")]
    public class HyperlinkButton : ButtonBase
    {
        public static readonly PropertyDescription NavigateUriProperty = PropertyDescription.Register("NavigateUri", typeof(JsonUri), typeof(HyperlinkButton));
        public static readonly PropertyDescription TargetNameProperty = PropertyDescription.Register("TargetName", typeof(string), typeof(HyperlinkButton));
    }
}