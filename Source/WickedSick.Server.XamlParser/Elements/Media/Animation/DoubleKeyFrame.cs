using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements.Media.Animation
{
    public class DoubleKeyFrame : DependencyObject
    {
        public static readonly PropertyDescription KeyTimeProperty = PropertyDescription.Register("KeyTime", typeof(KeyTime), typeof(DoubleKeyFrame));
        public static readonly PropertyDescription ValueProperty = PropertyDescription.Register("Value", typeof(double), typeof(DoubleKeyFrame));
    }
}