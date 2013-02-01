
namespace WickedSick.Server.XamlParser.Elements.Media.Imaging
{
    [Element(NullstoneNamespace="Fayde.Media.Imaging")]
    public class ImageBrush : TileBrush
    {
        public static readonly PropertyDescription ImageSourceProperty = PropertyDescription.Register("ImageSource", typeof(ImageSource), typeof(ImageBrush));
    }
}