using System;
using WickedSick.Server.XamlParser.Elements;
using System.Reflection;
using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.TypeConverters
{
    public class JsonUriConverter : ITypeConverter
    {
        public object Convert(string from)
        {
            Uri result;
            if (Uri.TryCreate(from, UriKind.RelativeOrAbsolute, out result))
                return new JsonUri(result);
            throw new FormatException("An invalid Uri has been specified.");
        }

        public Type ConversionType
        {
            get { return typeof(JsonUri); }
        }
    }
}
