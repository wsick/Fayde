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
        public static readonly PropertyDescription Color = PropertyDescription.Register("Color", typeof(Color), typeof(GradientStop));
        public static readonly PropertyDescription Offset = PropertyDescription.Register("Offset", typeof(double), typeof(GradientStop));
    }
}
