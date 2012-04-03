using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.Server.XamlParser.TypeConverters
{
    public class BoolConverter: ITypeConverter
    {
        public Type ConversionType
        {
            get { return typeof(bool); }
        }

        public object Convert(string from)
        {
            return bool.Parse(from);
        }
    }
}
