using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements.Media.Animation
{
    public class ColorKeyFrame : DependencyObject
    {
        public static readonly PropertyDescription KeyTimeProperty = PropertyDescription.Register("KeyTime", typeof(KeyTime), typeof(ColorKeyFrame));
        public static readonly PropertyDescription ValueProperty = PropertyDescription.Register("Value", typeof(Color), typeof(ColorKeyFrame));
    }
}