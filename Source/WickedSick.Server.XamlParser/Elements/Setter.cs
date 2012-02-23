using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.TypeConverters;

namespace WickedSick.Server.XamlParser.Elements
{
    [Element]
    public class Setter: DependencyObject
    {
        [Property]
        [SetterValueConverter]
        public string Property { get; set; }

        [Property]
        [SetterValueConverter]
        public object Value { get; set; }
    }
}
