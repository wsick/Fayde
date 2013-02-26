using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements.Media
{
    [Element("Fayde.Media")]
    public class TextOptions
    {
        public static readonly AttachedPropertyDescription TextHintingModeProperty = AttachedPropertyDescription.Register("TextHintingMode", typeof(TextHintingMode), typeof(TextOptions));
    }
}