using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.TypeConverters;

namespace WickedSick.Server.XamlParser.Elements
{
    [Element]
    public class SolidColorBrush : Brush
    {
        [Property]
        [ColorTypeConverter]
        public Color Color { get; set; }
    }
}
