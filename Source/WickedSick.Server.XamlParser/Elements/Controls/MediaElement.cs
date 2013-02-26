using WickedSick.Server.XamlParser.Elements.Core;
using WickedSick.Server.XamlParser.Elements.Media;

namespace WickedSick.Server.XamlParser.Elements.Controls
{
    [Element("Fayde.Controls")]
    public class MediaElement : FrameworkElement
    {
        public static readonly PropertyDescription AutoPlayProperty = PropertyDescription.Register("AutoPlay", typeof(Boolean), typeof(MediaElement));
        public static readonly PropertyDescription BalanceProperty = PropertyDescription.Register("Balance", typeof(Double), typeof(MediaElement));
        public static readonly PropertyDescription IsMutedProperty = PropertyDescription.Register("IsMuted", typeof(Boolean), typeof(MediaElement));
        public static readonly PropertyDescription PlaybackRateProperty = PropertyDescription.Register("PlaybackRate", typeof(Double), typeof(MediaElement));
        public static readonly PropertyDescription StretchProperty = PropertyDescription.Register("Stretch", typeof(Stretch), typeof(MediaElement));
        public static readonly PropertyDescription SourceProperty = PropertyDescription.Register("Source", typeof(Uri), typeof(MediaElement));
        public static readonly PropertyDescription VolumeProperty = PropertyDescription.Register("Volume", typeof(Double), typeof(MediaElement));
    }
}