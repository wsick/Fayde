using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WickedSick.Server.XamlParser.Elements.Media.Imaging;
using WickedSick.Server.XamlParser.Elements.Media;

namespace WickedSick.Server.XamlParser.TypeConverters
{
    public class ImageSourceConverter : ITypeConverter
    {
        public Type ConversionType
        {
            get { return typeof(ImageSource); }
        }

        public object Convert(string from)
        {
            BitmapImage bi = new BitmapImage();
            bi.SetValue("UriSource", from);
            return bi;
        }
    }
}
