using WickedSick.Server.XamlParser.Elements.Media;
using WickedSick.Server.XamlParser.Elements.Media.Effects;
using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements
{
    public abstract class UIElement : DependencyObject
    {
        public static readonly PropertyDescription EffectProperty = PropertyDescription.Register("Effect", typeof(Effect), typeof(UIElement));
        public static readonly PropertyDescription IsHitTestVisibleProperty = PropertyDescription.Register("IsHitTestVisible", typeof(bool), typeof(UIElement));
        public static readonly PropertyDescription OpacityProperty = PropertyDescription.Register("Opacity", typeof(double), typeof(UIElement));
        public static readonly PropertyDescription RenderTransformOriginProperty = PropertyDescription.Register("RenderTransformOrigin", typeof(Point), typeof(UIElement));
        public static readonly PropertyDescription RenderTransformProperty = PropertyDescription.Register("RenderTransform", typeof(Transform), typeof(UIElement));
        public static readonly PropertyDescription UseLayoutRoundingProperty = PropertyDescription.Register("UseLayoutRounding", typeof(bool), typeof(UIElement));
        public static readonly PropertyDescription VisibilityProperty = PropertyDescription.Register("Visibility", typeof(Visibility), typeof(UIElement));
    }
}