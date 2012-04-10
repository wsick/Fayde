using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.TypeConverters;

namespace WickedSick.Server.XamlParser.Elements
{
    public class Setter: DependencyObject
    {
        //TODO: Rewire specific SetterValueConverter
        public static readonly PropertyDescription Property = PropertyDescription.Register("Property", typeof(string), typeof(Setter));
        public static readonly PropertyDescription Value = PropertyDescription.Register("Value", typeof(object), typeof(Setter));
    }
}
