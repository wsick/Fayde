using WickedSick.Server.XamlParser.Elements.Media;
using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements.Controls
{
    public class TextBlock : FrameworkElement
    {
        public static readonly PropertyDescription TextWrapping = PropertyDescription.Register("TextWrapping", typeof(TextWrapping), typeof(TextBlock));
        public static readonly PropertyDescription Foreground = PropertyDescription.Register("Foreground", typeof(Brush), typeof(TextBlock));
        public static readonly PropertyDescription FontFamily = PropertyDescription.Register("FontFamily", typeof(string), typeof(TextBlock));
        public static readonly PropertyDescription FontStretch = PropertyDescription.Register("FontStretch", typeof(FontStretch), typeof(TextBlock));
        public static readonly PropertyDescription FontStyle = PropertyDescription.Register("FontStyle", typeof(FontStyle), typeof(TextBlock));
        public static readonly PropertyDescription FontWeight = PropertyDescription.Register("FontWeight", typeof(FontWeight), typeof(TextBlock));
        public static readonly PropertyDescription FontSize = PropertyDescription.Register("FontSize", typeof(FontSize), typeof(TextBlock));
        public static readonly PropertyDescription Text = PropertyDescription.Register("Text", typeof(string), typeof(TextBlock), true);
        public static readonly PropertyDescription TextDecorations = PropertyDescription.Register("TextDecorations", typeof(DependencyObjectCollection<TextDecoration>), typeof(TextBlock));
    }
}