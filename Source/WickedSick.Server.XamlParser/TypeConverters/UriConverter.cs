using System;

namespace WickedSick.Server.XamlParser.TypeConverters
{
    public class UriConverter : ITypeConverter
    {
        public object Convert(string from)
        {
            return new Uri(from, UriKind.RelativeOrAbsolute);
        }

        public Type ConversionType
        {
            get { return typeof(Uri); }
        }
    }
}
