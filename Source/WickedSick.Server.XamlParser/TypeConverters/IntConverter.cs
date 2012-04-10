using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WickedSick.Server.XamlParser.TypeConverters
{
    public class IntConverter: ITypeConverter
    {
        public Type ConversionType
        {
            get { return typeof(int); }
        }

        public object Convert(string from)
        {
            return int.Parse(from);
        }
    }
}
