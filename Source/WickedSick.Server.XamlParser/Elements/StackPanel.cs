using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Serialization;
using WickedSick.Server.XamlParser.TypeConverters;

namespace WickedSick.Server.XamlParser.Elements
{
    [Element]
    public class StackPanel: Panel
    {
        public static readonly PropertyDescription Orientation = PropertyDescription.Register("Orientation", typeof(Orientation), typeof(StackPanel));
    }
}
