using Fayde.Xaml.Metadata;

namespace Fayde.Media
{
    public class TextOptions
    {
        public static readonly AttachedPropertyDescription TextHintingModeProperty = AttachedPropertyDescription.Register("TextHintingMode", typeof(TextHintingMode), typeof(TextOptions));
    }
}