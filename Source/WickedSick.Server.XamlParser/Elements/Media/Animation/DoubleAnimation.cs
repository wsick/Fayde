using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.TypeConverters;

namespace WickedSick.Server.XamlParser.Elements.Media.Animation
{
    [Element]
    public class DoubleAnimation: Timeline
    {
        [Property]
        [DoubleConverter]
        public double From { get; set; }

        [Property]
        [DoubleConverter]
        public double To { get; set; }

        [Property]
        [DoubleConverter]
        public double By { get; set; }
    }
}
