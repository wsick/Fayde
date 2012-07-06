
namespace WickedSick.Server.XamlParser.Elements.Media
{
    public class ImageBrush : TileBrush
    {
        public static readonly PropertyDescription ImageSourceProperty = PropertyDescription.Register("ImageSource", typeof(ImageSource), typeof(ImageBrush));
    }
}