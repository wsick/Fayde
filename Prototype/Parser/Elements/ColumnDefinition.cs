using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Serialization;
using Parser.TypeConverters;

namespace Parser.Elements
{
    [Element]
    public class ColumnDefinition: DependencyObject
    {
        [Property]
        [GridLengthConverter]
        public GridLength Width { get; set; }
    }
}
