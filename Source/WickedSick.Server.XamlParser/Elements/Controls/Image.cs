using WickedSick.Server.XamlParser.Elements.Media;
using WickedSick.Server.XamlParser.TypeConverters;

namespace WickedSick.Server.XamlParser.Elements.Controls
{
    [Element]
    public class Image : FrameworkElement
    {
        [Property]
        [StretchConverter]
        public Stretch Stretch { get; set; }

        [Property]
        [ImageSourceConverter]
        public ImageSource Source { get; set; }

        protected override string GetTypeName()
        {
            return "Fayde.Image";
        }
    }
}
