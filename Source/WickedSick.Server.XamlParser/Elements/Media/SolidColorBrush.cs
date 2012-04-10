using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.TypeConverters;
using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements.Media
{
    public class SolidColorBrush : Brush
    {
        public static readonly PropertyDescription Color = PropertyDescription.Register("Color", typeof(Color), typeof(SolidColorBrush));
    }
}
