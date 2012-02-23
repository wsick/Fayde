using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.Elements;
using System.Reflection;

namespace WickedSick.Server.XamlParser.TypeConverters
{
    public class DoubleConverterAttribute : TypeConverterAttribute
    {
        public override object Convert(DependencyObject element, PropertyInfo pi, string from)
        {
            return double.Parse(from);
        }
    }
}
