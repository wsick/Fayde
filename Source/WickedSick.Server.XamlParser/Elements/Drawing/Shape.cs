using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.TypeConverters;

namespace WickedSick.Server.XamlParser.Elements.Drawing
{
    public class Shape: FrameworkElement
    {
        public static readonly PropertyDescription Fill = PropertyDescription.Register("Fill", typeof(Brush), typeof(Shape));
        public static readonly PropertyDescription Stroke = PropertyDescription.Register("Stroke", typeof(Brush), typeof(Shape));
        public static readonly PropertyDescription StrokeThickness = PropertyDescription.Register("StrokeThickness", typeof(double), typeof(Shape));
    }
}
