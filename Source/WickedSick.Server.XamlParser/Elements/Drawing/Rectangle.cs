using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.TypeConverters;

namespace WickedSick.Server.XamlParser.Elements.Drawing
{
    [Element]
    public class Rectangle: Shape
    {
        public static readonly PropertyDescription RadiusX = PropertyDescription.Register("RadiusX", typeof(double), typeof(Rectangle));
        public static readonly PropertyDescription RadiusY = PropertyDescription.Register("RadiusY", typeof(double), typeof(Rectangle));
    }
}
