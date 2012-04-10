using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.Elements;
using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.TypeConverters
{
    public class PropertyPathConverter: ITypeConverter
    {
        public Type ConversionType
        {
            get { return typeof(PropertyPath); }
        }

        public object Convert(string from)
        {
            return new PropertyPath() { Path = from };
        }
    }
}
