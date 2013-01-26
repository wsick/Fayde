using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements.Controls
{
    [Element(NullstoneNamespace = "Fayde.Controls")]
    public class TextBox : Control
    {
        //LineHeight
        //LineStackingStrategy
        //MaxLength
        public static readonly PropertyDescription TextProperty = PropertyDescription.Register("Text", typeof(string), typeof(TextBox), true);
        //TextAlignment
        public static readonly PropertyDescription TextWrappingProperty = PropertyDescription.Register("TextWrapping", typeof(TextWrapping), typeof(TextBox));
    }
}