using WickedSick.Server.XamlParser.Elements.Media;
using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements.Documents
{
    public abstract class TextElement : DependencyObject
    {
        public static readonly PropertyDescription FontFamilyProperty = PropertyDescription.Register("FontFamily", typeof(string), typeof(TextElement));
        public static readonly PropertyDescription FontSizeProperty = PropertyDescription.Register("FontSize", typeof(double), typeof(TextElement));
        public static readonly PropertyDescription FontStretchProperty = PropertyDescription.Register("FontStretch", typeof(FontStretch), typeof(TextElement));
        public static readonly PropertyDescription FontStyleProperty = PropertyDescription.Register("FontStyle", typeof(FontStyle), typeof(TextElement));
        public static readonly PropertyDescription FontWeightProperty = PropertyDescription.Register("FontWeight", typeof(FontWeight), typeof(TextElement));
        public static readonly PropertyDescription ForegroundProperty = PropertyDescription.Register("Foreground", typeof(Brush), typeof(TextElement));
    }
}