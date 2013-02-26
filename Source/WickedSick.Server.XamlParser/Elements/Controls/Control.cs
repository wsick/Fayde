using WickedSick.Server.XamlParser.Elements.Core;
using WickedSick.Server.XamlParser.Elements.Input;
using WickedSick.Server.XamlParser.Elements.Media;
using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements.Controls
{
    [Element("Fayde.Controls")]
    public abstract class Control : FrameworkElement
    {
        public static readonly PropertyDescription BackgroundProperty = PropertyDescription.Register("Background", typeof(Brush), typeof(Control));
        public static readonly PropertyDescription BorderBrushProperty = PropertyDescription.Register("BorderBrush", typeof(Brush), typeof(Control));
        public static readonly PropertyDescription BorderThicknessProperty = PropertyDescription.Register("BorderThickness", typeof(Thickness), typeof(Control));
        public static readonly PropertyDescription FontFamilyProperty = PropertyDescription.Register("FontFamily", typeof(string), typeof(Control));
        public static readonly PropertyDescription FontSizeProperty = PropertyDescription.Register("FontSize", typeof(double), typeof(Control));
        public static readonly PropertyDescription FontStretchProperty = PropertyDescription.Register("FontStretch", typeof(FontStretch), typeof(Control));
        public static readonly PropertyDescription FontStyleProperty = PropertyDescription.Register("FontStyle", typeof(FontStyle), typeof(Control));
        public static readonly PropertyDescription FontWeightProperty = PropertyDescription.Register("FontWeight", typeof(FontWeight), typeof(Control));
        public static readonly PropertyDescription ForegroundProperty = PropertyDescription.Register("Foreground", typeof(Brush), typeof(Control));
        public static readonly PropertyDescription HorizontalContentAlignmentProperty = PropertyDescription.Register("HorizontalContentAlignment", typeof(HorizontalAlignment), typeof(Control));
        public static readonly PropertyDescription IsEnabledProperty = PropertyDescription.Register("IsEnabled", typeof(bool), typeof(Control));
        public static readonly PropertyDescription IsTabStopProperty = PropertyDescription.Register("IsTabStop", typeof(bool), typeof(Control));
        public static readonly PropertyDescription PaddingProperty = PropertyDescription.Register("Padding", typeof(Thickness), typeof(Control));
        public static readonly PropertyDescription TabIndexProperty = PropertyDescription.Register("TabIndex", typeof(int), typeof(Control));
        public static readonly PropertyDescription TabNavigationProperty = PropertyDescription.Register("TabNavigation", typeof(KeyboardNavigationMode), typeof(Control));
        public static readonly PropertyDescription TemplateProperty = PropertyDescription.Register("Template", typeof(ControlTemplate), typeof(Control));
        public static readonly PropertyDescription VerticalContentAlignmentProperty = PropertyDescription.Register("VerticalContentAlignment", typeof(VerticalAlignment), typeof(Control));
    }
}