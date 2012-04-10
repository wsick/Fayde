using System.Collections.Generic;
using WickedSick.Server.XamlParser.TypeConverters;
using WickedSick.Server.XamlParser.Elements.Types;
using WickedSick.Server.XamlParser.Elements.Media;

namespace WickedSick.Server.XamlParser.Elements.Shapes
{
    public class Shape : FrameworkElement
    {
        public static readonly PropertyDescription FillProperty = PropertyDescription.Register("Fill", typeof(Brush), typeof(Shape));
        public static readonly PropertyDescription StretchProperty = PropertyDescription.Register("Stretch", typeof(Stretch), typeof(Shape));
        public static readonly PropertyDescription StrokeProperty = PropertyDescription.Register("Stroke", typeof(Brush), typeof(Shape));
        public static readonly PropertyDescription StrokeDashArrayProperty = PropertyDescription.Register("StrokeDashArray", typeof(List<double>), typeof(Shape));
        public static readonly PropertyDescription StrokeDashCapProperty = PropertyDescription.Register("StrokeDashCap", typeof(PenLineCap), typeof(Shape));
        public static readonly PropertyDescription StrokeDashOffsetProperty = PropertyDescription.Register("StrokeDashOffset", typeof(double), typeof(Shape));
        public static readonly PropertyDescription StrokeEndLineCapProperty = PropertyDescription.Register("StrokeEndLineCap", typeof(PenLineCap), typeof(Shape));
        public static readonly PropertyDescription StrokeLineJoinProperty = PropertyDescription.Register("StrokeLineJoin", typeof(PenLineJoin), typeof(Shape));
        public static readonly PropertyDescription StrokeMiterLimitProperty = PropertyDescription.Register("StrokeMiterLimit", typeof(double), typeof(Shape));
        public static readonly PropertyDescription StrokeStartLineCapProperty = PropertyDescription.Register("StrokeStartLineCap", typeof(PenLineCap), typeof(Shape));
        public static readonly PropertyDescription StrokeThicknessProperty = PropertyDescription.Register("StrokeThickness", typeof(double), typeof(Shape));
    }
}
