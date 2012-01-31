using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Serialization;
using Parser.TypeConverters;

namespace Parser.Elements
{
    [Element]
    public class RowDefinition: DependencyObject
    {
        [Property]
        [GridLengthConverter]
        public GridLength Height { get; set; }
    }
}
