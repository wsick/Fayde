using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.TypeConverters;
using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements.Media.Animation
{
    public class PointAnimation: Timeline
    {
        public static readonly PropertyDescription To = PropertyDescription.Register("To", typeof(Point), typeof(Timeline));
    }
}
