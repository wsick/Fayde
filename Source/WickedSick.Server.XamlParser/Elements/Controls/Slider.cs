using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.Elements.Controls.Primitives;
using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements.Controls
{
    public class Slider : RangeBase
    {
        public static readonly PropertyDescription OrientationProperty = PropertyDescription.Register("Orientation", typeof(Orientation), typeof(Slider));
    }
}