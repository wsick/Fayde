using WickedSick.Server.XamlParser.Elements.Media;
using WickedSick.Server.XamlParser.TypeConverters;
using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements.Media
{
    [Element(NullstoneName = "Fayde.Image")]
    public class Image : FrameworkElement
    {
        public static readonly PropertyDescription Stretch = PropertyDescription.Register("Stretch", typeof(Stretch), typeof(Image));
        public static readonly PropertyDescription Source = PropertyDescription.Register("Source", typeof(ImageSource), typeof(Image));
    }
}
