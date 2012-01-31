using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Parser.TypeConverters;

namespace Parser.Elements
{
    [Element]
    public class Border: FrameworkElement
    {
        [Property]
        [BrushTypeConverter]
        public Brush Background { get; set; }

        [Property]
        [BrushTypeConverter]
        public Brush BorderBrush { get; set; }
        
        [Property]
        [ThicknessConverter]
        public Thickness BorderThickness { get; set; }
        
        [Property]
        [CornerRadiusConverter]
        public CornerRadius CornerRadius { get; set; }
        
        [Content]
        public UIElement Child { get; set; }
    }
}
