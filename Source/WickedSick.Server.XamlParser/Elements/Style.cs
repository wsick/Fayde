using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.Server.XamlParser.Elements
{
    [Element]
    public class Style: DependencyObject
    {
        public static readonly PropertyDescription Setters = PropertyDescription.Register("Setters", typeof(List<Setter>), typeof(Style), true);
        public static readonly PropertyDescription TargetType = PropertyDescription.Register("TargetType", typeof(string), typeof(Style));
    }
}
