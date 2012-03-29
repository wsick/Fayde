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
        public static readonly PropertyDescription From = PropertyDescription.Register("From", typeof(double), typeof(DoubleAnimation));
        public static readonly PropertyDescription To = PropertyDescription.Register("To", typeof(double), typeof(DoubleAnimation));
        public static readonly PropertyDescription By = PropertyDescription.Register("By", typeof(double), typeof(DoubleAnimation));
    }
}
