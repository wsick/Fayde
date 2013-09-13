using Fayde.Core;
using Fayde.Media;
using Fayde.Media.Imaging;
using Fayde.Xaml.Metadata;

namespace Fayde.Controls
{
    public class Image : FrameworkElement
    {
        public static readonly PropertyDescription StretchProperty = PropertyDescription.Register("Stretch", typeof(Stretch), typeof(Image));
        public static readonly PropertyDescription SourceProperty = PropertyDescription.Register("Source", typeof(ImageSource), typeof(Image));
    }
}