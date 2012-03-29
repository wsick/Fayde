using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.Server.XamlParser.Elements.Media.Animation
{
    [Element]
    public class ColorAnimation: Timeline
    {
        public static readonly PropertyDescription To = PropertyDescription.Register("To", typeof(string), typeof(ColorAnimation));
    }
}
