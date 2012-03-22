using System;
using WickedSick.Server.XamlParser.Elements.Media.Imaging;

namespace WickedSick.Server.XamlParser.TypeConverters
{
    public class ImageSourceConverter : TypeConverterAttribute
    {
        public override object Convert(Elements.DependencyObject element, System.Reflection.PropertyInfo pi, string from)
        {
            Uri uri;
            if (!Uri.TryCreate(from, UriKind.RelativeOrAbsolute, out uri))
                return null;

            return new BitmapImage { UriSource = uri, };
        }
    }
}
