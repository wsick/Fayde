using Fayde.Xaml.Metadata;

namespace Fayde.Media.Imaging
{
    public class ImageBrush : TileBrush
    {
        public static readonly PropertyDescription ImageSourceProperty = PropertyDescription.Register("ImageSource", typeof(ImageSource), typeof(ImageBrush));
    }
}