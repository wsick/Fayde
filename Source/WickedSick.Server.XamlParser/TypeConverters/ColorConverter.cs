using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.Elements;
using System.Reflection;
using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.TypeConverters
{
    public class ColorConverter: ITypeConverter
    {
        public object Convert(string from)
        {
            return Color.FromHex(from);
        }

        public Type ConversionType
        {
            get { return typeof(Color); }
        }
    }
}
