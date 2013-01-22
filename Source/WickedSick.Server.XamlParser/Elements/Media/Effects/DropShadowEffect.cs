using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements.Media.Effects
{
    [Element(NullstoneNamespace = "Fayde.Media.Effects")]
    public class DropShadowEffect : Effect
    {
        public static readonly PropertyDescription BlurRadiusProperty = PropertyDescription.Register("BlurRadius", typeof(double), typeof(DropShadowEffect));
        public static readonly PropertyDescription ColorProperty = PropertyDescription.Register("Color", typeof(Color), typeof(DropShadowEffect));
        public static readonly PropertyDescription DirectionProperty = PropertyDescription.Register("Direction", typeof(double), typeof(DropShadowEffect));
        public static readonly PropertyDescription OpacityProperty = PropertyDescription.Register("Opacity", typeof(double), typeof(DropShadowEffect));
        public static readonly PropertyDescription ShadowDepthProperty = PropertyDescription.Register("ShadowDepth", typeof(double), typeof(DropShadowEffect));
    }
}