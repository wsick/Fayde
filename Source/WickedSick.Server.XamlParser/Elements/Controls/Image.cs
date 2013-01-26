using WickedSick.Server.XamlParser.Elements.Media.Imaging;
using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements.Controls
{
    [Element(NullstoneNamespace = "Fayde.Controls")]
    public class Image : FrameworkElement
    {
        public static readonly PropertyDescription Stretch = PropertyDescription.Register("Stretch", typeof(Stretch), typeof(Image));
        public static readonly PropertyDescription Source = PropertyDescription.Register("Source", typeof(ImageSource), typeof(Image));
    }
}