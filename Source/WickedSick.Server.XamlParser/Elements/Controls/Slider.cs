using WickedSick.Server.XamlParser.Elements.Controls.Primitives;
using WickedSick.Server.XamlParser.Elements.Core;

namespace WickedSick.Server.XamlParser.Elements.Controls
{
    [Element("Fayde.Controls")]
    public class Slider : RangeBase
    {
        public static readonly PropertyDescription OrientationProperty = PropertyDescription.Register("Orientation", typeof(Orientation), typeof(Slider));
    }
}