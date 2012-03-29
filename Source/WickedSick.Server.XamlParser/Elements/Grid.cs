using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Serialization;
using WickedSick.Server.XamlParser.TypeConverters;

namespace WickedSick.Server.XamlParser.Elements
{
    [Element]
    public class Grid: Panel
    {
        public static readonly PropertyDescription ColumnDefinitions = PropertyDescription.Register("ColumnDefinitions", typeof(List<ColumnDefinition>), typeof(Grid));
        public static readonly PropertyDescription RowDefinitions = PropertyDescription.Register("RowDefinitions", typeof(List<RowDefinition>), typeof(Grid));
    }
}
