using System;
using WickedSick.Server.XamlParser.Elements;
using System.Reflection;

namespace WickedSick.Server.XamlParser.TypeConverters
{
    public class JsonUri : IJsonSerializable
    {
        private Uri _Uri;

        public JsonUri(Uri uri)
        {
            _Uri = uri;
        }

        public string toJson(int tabIndents)
        {
            return string.Format("new Uri(\"{0}\")", _Uri);
        }
    }

    public class UriTypeConverterAttribute : TypeConverterAttribute
    {
        public override object Convert(DependencyObject element, PropertyInfo pi, string from)
        {
            Uri result;
            if (Uri.TryCreate(from, UriKind.RelativeOrAbsolute, out result))
                return new JsonUri(result);
            throw new FormatException("An invalid Uri has been specified.");
        }
    }
}
