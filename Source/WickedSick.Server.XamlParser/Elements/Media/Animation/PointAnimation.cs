using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements.Media.Animation
{
    [Element(NullstoneNamespace = "Fayde.Media.Animation")]
    public class PointAnimation: Timeline
    {
        public static readonly PropertyDescription To = PropertyDescription.Register("To", typeof(Point), typeof(Timeline));
    }
}