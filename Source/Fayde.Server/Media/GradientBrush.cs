using Fayde.Xaml.Metadata;

namespace Fayde.Media
{
    public class GradientBrush : Brush
    {
        public static readonly PropertyDescription SpreadMethodProperty = PropertyDescription.Register("SpreadMethod", typeof(GradientSpreadMethod), typeof(GradientBrush));
        public static readonly PropertyDescription MappingModeProperty = PropertyDescription.Register("MappingMode", typeof(BrushMappingMode), typeof(GradientBrush));
    }
}