using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements.Media
{
    public class GradientBrush: Brush
    {
        public static readonly PropertyDescription SpreadMethod = PropertyDescription.Register("SpreadMethod", typeof(GradientSpreadMethod), typeof(GradientBrush));
        public static readonly PropertyDescription MappingMode = PropertyDescription.Register("MappingMode", typeof(BrushMappingMode), typeof(GradientBrush));
    }
}
