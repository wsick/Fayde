using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Serialization;
using Parser.TypeConverters;

namespace Parser.Elements
{
    public abstract class FrameworkElement: UIElement
    {
        [Property]
        [ThicknessConverter]
        public Thickness Margin { get; set; }

        [Property]
        [ThicknessConverter]
        public Thickness Padding { get; set; }
        
        [Property]
        [HorizontalAlignmentConverter]
        public HorizontalAlignment HorizontalAlignment { get; set; }
        
        [Property]
        [VerticalAlignmentConverter]
        public VerticalAlignment VerticalAlignment { get; set; }
        
        [Property]
        [DoubleConverter]
        public double? MinWidth { get; set; }
        
        [Property]
        [DoubleConverter]
        public double? MinHeight { get; set; }

        [Property]
        public Style Style { get; set; }
    }
}
