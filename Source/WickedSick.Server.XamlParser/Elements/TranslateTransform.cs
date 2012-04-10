using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.Server.XamlParser.Elements
{
    [Element]
    public class TranslateTransform: Transform
    {
        public static readonly PropertyDescription X = PropertyDescription.Register("X", typeof(double), typeof(TranslateTransform));
        public static readonly PropertyDescription Y = PropertyDescription.Register("Y", typeof(double), typeof(TranslateTransform));
    }
}
