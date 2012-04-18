using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.Server.XamlParser.Elements.Media
{
    public class SkewTransform: Transform
    {
        public static readonly PropertyDescription AngleX = PropertyDescription.Register("AngleX", typeof(double), typeof(SkewTransform));
        public static readonly PropertyDescription AngleY = PropertyDescription.Register("AngleY", typeof(double), typeof(SkewTransform));
    }
}
