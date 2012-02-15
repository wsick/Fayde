using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.Server.XamlParser.TypeConverters
{
    public class DoubleConverterAttribute : TypeConverterAttribute
    {
        public override object Convert(string from)
        {
            return double.Parse(from);
        }
    }
}
