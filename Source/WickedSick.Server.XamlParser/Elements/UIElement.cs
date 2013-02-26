using WickedSick.Server.XamlParser.Elements.Core;
using WickedSick.Server.XamlParser.Elements.Media;
using WickedSick.Server.XamlParser.Elements.Media.Effects;
using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements
{
    [Element("Fayde")]
    public abstract class UIElement : DependencyObject
    {
        public static readonly PropertyDescription EffectProperty = PropertyDescription.Register("Effect", typeof(Effect), typeof(UIElement));
        public static readonly PropertyDescription IsHitTestVisibleProperty = PropertyDescription.Register("IsHitTestVisible", typeof(bool), typeof(UIElement));
        public static readonly PropertyDescription OpacityProperty = PropertyDescription.Register("Opacity", typeof(double), typeof(UIElement));
        public static readonly PropertyDescription RenderTransformOriginProperty = PropertyDescription.Register("RenderTransformOrigin", typeof(Point), typeof(UIElement));
        public static readonly PropertyDescription RenderTransformProperty = PropertyDescription.Register("RenderTransform", typeof(Transform), typeof(UIElement));
        public static readonly PropertyDescription UseLayoutRoundingProperty = PropertyDescription.Register("UseLayoutRounding", typeof(bool), typeof(UIElement));
        public static readonly PropertyDescription VisibilityProperty = PropertyDescription.Register("Visibility", typeof(Visibility), typeof(UIElement));

        public static readonly EventDescription MouseMoveEvent = EventDescription.Register("MouseMove", typeof(UIElement));
        public static readonly EventDescription MouseLeftButtonDownEvent = EventDescription.Register("MouseLeftButtonDown", typeof(UIElement));
        public static readonly EventDescription MouseLeftButtonUpEvent = EventDescription.Register("MouseLeftButtonUp", typeof(UIElement));
        public static readonly EventDescription MouseRightButtonDownEvent = EventDescription.Register("MouseRightButtonDown", typeof(UIElement));
        public static readonly EventDescription MouseRightButtonUpEvent = EventDescription.Register("MouseRightButtonUp", typeof(UIElement));
        public static readonly EventDescription MouseEnterEvent = EventDescription.Register("MouseEnter", typeof(UIElement));
        public static readonly EventDescription MouseLeaveEvent = EventDescription.Register("MouseLeave", typeof(UIElement));
        public static readonly EventDescription MouseWheelEvent = EventDescription.Register("MouseWheel", typeof(UIElement));
        public static readonly EventDescription LostMouseCaptureEvent = EventDescription.Register("LostMouseCapture", typeof(UIElement));
        public static readonly EventDescription GotFocusEvent = EventDescription.Register("GotFocus", typeof(UIElement));
        public static readonly EventDescription LostFocusEvent = EventDescription.Register("LostFocus", typeof(UIElement));
        public static readonly EventDescription KeyDownEvent = EventDescription.Register("KeyDown", typeof(UIElement));
        public static readonly EventDescription KeyUpEvent = EventDescription.Register("KeyUp", typeof(UIElement));
    }
}