using System;
using WickedSick.Server.XamlParser.Elements.Data;

namespace WickedSick.Server.XamlParser.TypeConverters
{
    public class PropertyPathConverter : ITypeConverter
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