class Nullstone {
    static RefEquals(obj1, obj2): bool;
    static Equals(obj1, obj2): bool;
    static As(obj, type): any;
    static Is(obj, type): bool;
    static DoesInheritFrom(t, type): bool;
    static DoesImplement(obj, interfaceType): bool;

    static AutoProperties(type, arr);
    static AutoProperty(type, nameOrDp, converter, isOverride);
    static AutoPropertiesReadOnly(type, arr);
    static AutoPropertyReadOnly(type, nameOrDp, isOverride);
    static AbstractProperty(type, name, isReadOnly);
    static Property(type, name, data);
    static AutoNotifyProperty(type, name);

    static GetPropertyDescriptor(obj, name: string): PropertyDescriptor;
    static HasProperty(obj, name: string): PropertyDescriptor;
}

class EventArgs {
}

class MulticastEvent {
    Subscribe(callback: (sender, args: EventArgs) => void, closure);
    SubscribeSpecific(callback: (sender, args: EventArgs) => void, closure, matchClosure);
    Unsubscribe(callback: (sender, args: EventArgs) => void, closure, matchClosure?);
    Raise(sender, args: EventArgs);
    RaiseAsync(sender, args: EventArgs);
}


class Clip {
}
class Color {
    A: number;
    R: number;
    G: number;
    B: number;
}
class CornerRadius {
    TopLeft: number;
    TopRight: number;
    BottomRight: number;
    BottomLeft: number;
}
class Duration {
}
class Font {
}
class FontFamily {
}
class KeyTime {
}
class Matrix {
}
class Matrix3D {
}
class Point {
    X: number;
    Y: number;
}
class Rect {
    X: number;
    Y: number;
    Width: number;
    Height: number;
}
class Size {
    Width: number;
    Height: number;
}
class Thickness {
    Left: number;
    Top: number;
    Right: number;
    Bottom: number;
}
class TimeSpan {
}
class Uri {
}

enum Visibility {
    Visible = 0,
    Collapsed = 1,
}

enum HorizontalAlignment {
    Left = 0,
    Center = 1,
    Right = 2,
    Stretch = 3,
}
enum VerticalAlignment {
    Top = 0,
    Center = 1,
    Bottom = 2,
    Stretch = 3,
}

enum FlowDirection {
    LeftToRight = 0,
    RightToLeft = 1,
}


class DependencyObject {
    $SetValue(propd: DependencyProperty, value): any;
    $GetValue(propd: DependencyProperty): any;
    $ReadLocalValue(propd: DependencyProperty): any;
    $ClearValue(propd: DependencyProperty);
}

class DependencyProperty {
    Name: string;

    static Register(name: string, getTargetType: Function, ownerType, defaultValue, changedCallback): DependencyProperty;
    static RegisterAttached(name: string, getTargetType: Function, ownerType, defaultValue, changedCallback): DependencyProperty;
}

class UIElement extends DependencyObject {
    //Dependency Properties
    static AllowDropProperty: DependencyProperty;
    static CacheModeProperty: DependencyProperty;
    static ClipProperty: DependencyProperty;
    static EffectProperty: DependencyProperty;
    static IsHitTestVisibleProperty: DependencyProperty;
    static OpacityMaskProperty: DependencyProperty;
    static OpacityProperty: DependencyProperty;
    static ProjectionProperty: DependencyProperty;
    static RenderTransformProperty: DependencyProperty;
    static RenderTransformOriginProperty: DependencyProperty;
    static ResourcesProperty: DependencyProperty;
    static TriggersProperty: DependencyProperty;
    static UseLayoutRoundingProperty: DependencyProperty;
    static VisibilityProperty: DependencyProperty;
    static TagProperty: DependencyProperty;
    
    //Properties
    AllowDrop: bool;
    CacheMode: any;
    Clip: Geometry;
    Effect: Effect;
    IsHitTestVisible: bool;
    OpacityMask: Brush;
    Opacity: number;
    Projection: Projection;
    RenderTransform: Transform;
    RenderTransformOrigin: Point;
    Resources: ResourceDictionary;
    Triggers: any;
    UseLayoutRounding: bool;
    Visibility: Visibility;
    Tag: any;

    //Events
    GotFocus: MulticastEvent;
    KeyDown: MulticastEvent;
    KeyUp: MulticastEvent;
    LostFocus: MulticastEvent;
    LostMouseCapture: MulticastEvent;
    MouseEnter: MulticastEvent;
    MouseLeave: MulticastEvent;
    MouseLeftButtonDown: MulticastEvent;
    MouseLeftButtonUp: MulticastEvent;
    MouseMove: MulticastEvent;
    MouseRightButtonDown: MulticastEvent;
    MouseRightButtonUp: MulticastEvent;
    MouseWheel: MulticastEvent;

    //Methods
    CaptureMouse(): bool;
    ReleaseMouseCapture();

    InvalidateMeasure();
    Measure(availableSize: Size);

    InvalidateArrange();
    Arrange(finalRect: Rect);
    
    UpdateLayout();

    TransformToVisual(): GeneralTransform;
}

class FrameworkElement extends UIElement {
    //Dependency Properties
    static ActualHeightProperty: DependencyProperty;
    static ActualWidthProperty: DependencyProperty;
    static CursorProperty: DependencyProperty;
    static DataContextProperty: DependencyProperty;
    static FlowDirectionProperty: DependencyProperty;
    static HeightProperty: DependencyProperty;
    static HorizontalAlignmentProperty: DependencyProperty;
    static LanguageProperty: DependencyProperty;
    static MarginProperty: DependencyProperty;
    static MaxHeightProperty: DependencyProperty;
    static MaxWidthProperty: DependencyProperty;
    static MinHeightProperty: DependencyProperty;
    static MinWidthProperty: DependencyProperty;
    static NameProperty: DependencyProperty;
    static StyleProperty: DependencyProperty;
    static VerticalAlignmentProperty: DependencyProperty;
    static WidthProperty: DependencyProperty;

    //Properties
    ActualHeight: number;
    ActualWidth: number;
    Cursor: string;
    DataContext: any;
    FlowDirection: FlowDirection;
    Height: number;
    HorizontalAlignment: HorizontalAlignment;
    Language: any;
    Margin: Thickness;
    MaxHeight: number;
    MaxWidth: number;
    MinHeight: number;
    MinWidth: number;;
    Style: Style;
    Tag: any;
    VerticalAlignment: VerticalAlignment;
    Width: number;

    //Events
    DataContextChanged: MulticastEvent;
    LayoutUpdated: MulticastEvent;
    Loaded: MulticastEvent;
    SizeChanged: MulticastEvent;
    Unloaded: MulticastEvent;

    //Methods
    FindName(name: string): any;
    MeasureOverride(availableSize): Size;
    ArrangeOverride(finalSize: Size): Size;
    GetBindingExpression(dp: DependencyProperty): BindingExpression;
    SetBinding(dp: DependencyProperty, binding: Binding): BindingExpressionBase;
    OnApplyTemplate();
}

class Brush {
}
class GeneralTransform {
}
class Transform extends GeneralTransform {
}
class Projection {
}
class Geometry {
}
class Effect {
}

class Style {
}

class ResourceDictionary {
}