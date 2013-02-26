using WickedSick.Server.XamlParser.Elements.Media;
using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements.Controls
{
    [Element("Fayde.Controls")]
    public class Border : FrameworkElement
    {
        public static readonly PropertyDescription ChildProperty = PropertyDescription.Register("Child", typeof(UIElement), typeof(Border), true);

        public static readonly PropertyDescription BackgroundProperty = PropertyDescription.Register("Background", typeof(Brush), typeof(Border));
        public static readonly PropertyDescription BorderBrushProperty = PropertyDescription.Register("BorderBrush", typeof(Brush), typeof(Border));
        public static readonly PropertyDescription BorderThicknessProperty = PropertyDescription.Register("BorderThickness", typeof(Thickness), typeof(Border));
        public static readonly PropertyDescription CornerRadiusProperty = PropertyDescription.Register("CornerRadius", typeof(CornerRadius), typeof(Border));
        public static readonly PropertyDescription PaddingProperty = PropertyDescription.Register("Padding", typeof(Thickness), typeof(Border));
    }
}