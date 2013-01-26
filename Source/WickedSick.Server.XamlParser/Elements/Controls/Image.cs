using WickedSick.Server.XamlParser.Elements.Media;
using WickedSick.Server.XamlParser.Elements.Media.Imaging;

namespace WickedSick.Server.XamlParser.Elements.Controls
{
    [Element(NullstoneNamespace = "Fayde.Controls")]
    public class Image : FrameworkElement
    {
        public static readonly PropertyDescription StretchProperty = PropertyDescription.Register("Stretch", typeof(Stretch), typeof(Image));
        public static readonly PropertyDescription SourceProperty = PropertyDescription.Register("Source", typeof(ImageSource), typeof(Image));
    }
}