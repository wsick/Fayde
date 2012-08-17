using WickedSick.Server.XamlParser.Elements.Documents;
using WickedSick.Server.XamlParser.Elements.Media;
using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements.Controls
{
    public class TextBlock : FrameworkElement
    {
        public static readonly PropertyDescription InlinesProperty = PropertyDescription.Register("Inlines", typeof(InlineCollection), typeof(TextBlock), true);
        public static readonly PropertyDescription TextWrappingProperty = PropertyDescription.Register("TextWrapping", typeof(TextWrapping), typeof(TextBlock));
        public static readonly PropertyDescription ForegroundProperty = PropertyDescription.Register("Foreground", typeof(Brush), typeof(TextBlock));
        public static readonly PropertyDescription FontFamilyProperty = PropertyDescription.Register("FontFamily", typeof(string), typeof(TextBlock));
        public static readonly PropertyDescription FontStretchProperty = PropertyDescription.Register("FontStretch", typeof(FontStretch), typeof(TextBlock));
        public static readonly PropertyDescription FontStyleProperty = PropertyDescription.Register("FontStyle", typeof(FontStyle), typeof(TextBlock));
        public static readonly PropertyDescription FontWeightProperty = PropertyDescription.Register("FontWeight", typeof(FontWeight), typeof(TextBlock));
        public static readonly PropertyDescription FontSizeProperty = PropertyDescription.Register("FontSize", typeof(FontSize), typeof(TextBlock));
        public static readonly PropertyDescription TextProperty = PropertyDescription.Register("Text", typeof(string), typeof(TextBlock));
        public static readonly PropertyDescription TextDecorationsProperty = PropertyDescription.Register("TextDecorations", typeof(TextDecorationCollection), typeof(TextBlock));
    }
}