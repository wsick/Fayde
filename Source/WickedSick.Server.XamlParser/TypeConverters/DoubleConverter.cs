using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.Elements;
using System.Reflection;

namespace WickedSick.Server.XamlParser.TypeConverters
{
    public class DoubleConverter : ITypeConverter
    {
        public object Convert(string from)
        {
            return double.Parse(from);
        }

        public Type ConversionType
        {
            get { return typeof(double); }
        }
    }
}
