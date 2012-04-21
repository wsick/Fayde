using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements.Media.Animation
{
    public class ColorAnimation: Timeline
    {
        public static readonly PropertyDescription To = PropertyDescription.Register("To", typeof(Color), typeof(ColorAnimation));
    }
}