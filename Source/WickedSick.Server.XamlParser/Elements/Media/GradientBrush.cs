using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements.Media
{
    [Element(NullstoneNamespace = "Fayde.Media")]
    public class GradientBrush : Brush
    {
        public static readonly PropertyDescription SpreadMethodProperty = PropertyDescription.Register("SpreadMethod", typeof(GradientSpreadMethod), typeof(GradientBrush));
        public static readonly PropertyDescription MappingModeProperty = PropertyDescription.Register("MappingMode", typeof(BrushMappingMode), typeof(GradientBrush));
    }
}