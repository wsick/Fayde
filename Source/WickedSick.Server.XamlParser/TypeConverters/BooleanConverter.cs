using System;

namespace WickedSick.Server.XamlParser.TypeConverters
{
    public class BooleanConverter : ITypeConverter
    {
        public Type ConversionType
        {
            get { return typeof(Elements.Core.Boolean); }
        }

        public object Convert(string from)
        {
            var b = new Elements.Core.Boolean();
            b.Content = from;
            return b;
        }
    }
}