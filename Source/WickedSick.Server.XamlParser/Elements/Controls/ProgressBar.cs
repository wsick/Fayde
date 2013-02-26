using WickedSick.Server.XamlParser.Elements.Controls.Primitives;

namespace WickedSick.Server.XamlParser.Elements.Controls
{
    [Element("Fayde.Controls")]
    public class ProgressBar : RangeBase
    {
        public static readonly PropertyDescription IsIndeterminateProperty = PropertyDescription.Register("IsIndeterminate", typeof(bool), typeof(ProgressBar));
    }
}