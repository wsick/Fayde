using Fayde.Xaml.Metadata;

namespace Fayde.Media.Imaging
{
    public class BitmapSource : ImageSource
    {
        public static readonly PropertyDescription PixelWidth = PropertyDescription.Register("PixelWidth", typeof(double), typeof(BitmapSource));
        public static readonly PropertyDescription PixelHeight = PropertyDescription.Register("PixelHeight", typeof(double), typeof(BitmapSource));
    }
}