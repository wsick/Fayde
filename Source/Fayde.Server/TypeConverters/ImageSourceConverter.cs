using System;
using Fayde.Media.Imaging;

namespace Fayde.TypeConverters
{
    public class ImageSourceConverter : ITypeConverter
    {
        public Type ConversionType
        {
            get { return typeof(ImageSource); }
        }

        public object Convert(string from)
        {
            var bi = new BitmapImage();
            bi.SetValue("UriSource", from);
            return bi;
        }
    }
}