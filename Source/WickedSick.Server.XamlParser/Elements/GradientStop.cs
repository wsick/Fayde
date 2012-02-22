using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.TypeConverters;

namespace WickedSick.Server.XamlParser.Elements
{
    [Element]
    public class GradientStop: DependencyObject
    {
        [Property]
        [ColorTypeConverter]
        public Color Color { get; set; }

        [Property]
        [DoubleConverter]
        public double Offset { get; set; }
    }
}
