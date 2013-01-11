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

//////////////////////////////////////////////////////////
// PRIMITIVES
//////////////////////////////////////////////////////////
class Clip {
    X: number;
    Y: number;
    Width: number;
    Height: number;
}
class Color {
    A: number;
    R: number;
    G: number;
    B: number;
    Add(color: Color): Color;
    Subtract(color: Color): Color;
    Multiply(factor: number): Color;
    toString(): string;
    static LERP(start: Color, end: Color, p: number): Color;
    static FromHex(hex: string): Color;
    static KnownColors: {
        AliceBlue: Color;
        AntiqueWhite: Color;
        Aqua: Color;
        Aquamarine: Color;
        Azure: Color;
        Beige: Color;
        Bisque: Color;
        Black: Color;
        BlanchedAlmond: Color;
        Blue: Color;
        BlueViolet: Color;
        Brown: Color;
        BurlyWood: Color;
        CadetBlue: Color;
        Chartreuse: Color;
        Chocolate: Color;
        Coral: Color;
        CornflowerBlue: Color;
        Cornsilk: Color;
        Crimson: Color;
        Cyan: Color;
        DarkBlue: Color;
        DarkCyan: Color;
        DarkGoldenrod: Color;
        DarkGray: Color;
        DarkGreen: Color;
        DarkKhaki: Color;
        DarkMagenta: Color;
        DarkOliveGreen: Color;
        DarkOrange: Color;
        DarkOrchid: Color;
        DarkRed: Color;
        DarkSalmon: Color;
        DarkSeaGreen: Color;
        DarkSlateBlue: Color;
        DarkSlateGray: Color;
        DarkTurquoise: Color;
        DarkViolet: Color;
        DeepPink: Color;
        DeepSkyBlue: Color;
        DimGray: Color;
        DodgerBlue: Color;
        Firebrick: Color;
        FloralWhite: Color;
        ForestGreen: Color;
        Fuchsia: Color;
        Gainsboro: Color;
        GhostWhite: Color;
        Gold: Color;
        Goldenrod: Color;
        Gray: Color;
        Green: Color;
        GreenYellow: Color;
        Honeydew: Color;
        HotPink: Color;
        IndianRed: Color;
        Indigo: Color;
        Ivory: Color;
        Khaki: Color;
        Lavender: Color;
        LavenderBlush: Color;
        LawnGreen: Color;
        LemonChiffon: Color;
        LightBlue: Color;
        LightCoral: Color;
        LightCyan: Color;
        LightGoldenrodYellow: Color;
        LightGray: Color;
        LightGreen: Color;
        LightPink: Color;
        LightSalmon: Color;
        LightSeaGreen: Color;
        LightSkyBlue: Color;
        LightSlateGray: Color;
        LightSteelBlue: Color;
        LightYellow: Color;
        Lime: Color;
        LimeGreen: Color;
        Linen: Color;
        Magenta: Color;
        Maroon: Color;
        MediumAquamarine: Color;
        MediumBlue: Color;
        MediumOrchid: Color;
        MediumPurple: Color;
        MediumSeaGreen: Color;
        MediumSlateBlue: Color;
        MediumSpringGreen: Color;
        MediumTurquoise: Color;
        MediumVioletRed: Color;
        MidnightBlue: Color;
        MintCream: Color;
        MistyRose: Color;
        Moccasin: Color;
        NavajoWhite: Color;
        Navy: Color;
        OldLace: Color;
        Olive: Color;
        OliveDrab: Color;
        Orange: Color;
        OrangeRed: Color;
        Orchid: Color;
        PaleGoldenrod: Color;
        PaleGreen: Color;
        PaleTurquoise: Color;
        PaleVioletRed: Color;
        PapayaWhip: Color;
        PeachPuff: Color;
        Peru: Color;
        Pink: Color;
        Plum: Color;
        PowderBlue: Color;
        Purple: Color;
        Red: Color;
        RosyBrown: Color;
        RoyalBlue: Color;
        SaddleBrown: Color;
        Salmon: Color;
        SandyBrown: Color;
        SeaGreen: Color;
        SeaShell: Color;
        Sienna: Color;
        Silver: Color;
        SkyBlue: Color;
        SlateBlue: Color;
        SlateGray: Color;
        Snow: Color;
        SpringGreen: Color;
        SteelBlue: Color;
        Tan: Color;
        Teal: Color;
        Thistle: Color;
        Tomato: Color;
        Transparent: Color;
        Turquoise: Color;
        Violet: Color;
        Wheat: Color;
        White: Color;
        WhiteSmoke: Color;
        Yellow: Color;
        YellowGreen: Color;
    };
}
class CornerRadius {
    TopLeft: number;
    TopRight: number;
    BottomRight: number;
    BottomLeft: number;
}
class Duration {
    static CreateAutomatic(): Duration;
    static CreateForever(): Duration;
    static CreateTimeSpan(): Duration;
    
    TimeSpan: TimeSpan;
    HasTimeSpan: bool;
    IsForever: bool;
    IsAutomatic: bool;
}
class Font {
    Family: string;
    Stretch: string;
    Style: string;
    Weight: FontWeight;
    Size: number;
}
class FontFamily {
    new (familyNames: string): FontFamily;
    FamilyNames: string;
}
class KeyTime {
    IsPaced: bool;
    IsUniform: bool;
    HasTimeSpan: bool;
    TimeSpan: TimeSpan;
    HasPercent: bool;
    Percent: number;
    static CreateUniform(): KeyTime;
    static CreateTimeSpan(ts: TimeSpan): KeyTime;
}
class Matrix {
    M11: number;
    M12: number;
    M21: number;
    M22: number;
    OffsetX: number;
    OffsetY: number;
    Inverse: Matrix;
    toString(): string;
}
class Matrix3D {
    //TODO
}
class Point {
    X: number;
    Y: number;
    toString(): string;
    static LERP(start: Point, end: Point, p: number): Point;
}
class Rect {
    X: number;
    Y: number;
    Width: number;
    Height: number;
    toString(): string;
    static Equals(rect1: Rect, rect2: Rect): bool;
}
class Size {
    Width: number;
    Height: number;
    toString(): string;
    static Equals(size1: Size, size2: Size): bool;
}
class Thickness {
    new (left?: number, top?: number, right?: number, bottom?: number): Thickness;
    Left: number;
    Top: number;
    Right: number;
    Bottom: number;
    toString(): string;
    static Equals(thickness1: Thickness, thickness2: Thickness): bool;
}
class TimeSpan {
    new (ticks: number): TimeSpan;
    new (hours: number, minutes: number, seconds: number): TimeSpan;
    new (days: number, hours: number, minutes: number, seconds: number): TimeSpan;
    new (days: number, hours: number, minutes: number, seconds: number, milliseconds: number): TimeSpan;

    AddTicks(ticks: number);
    AddMilliseconds(milliseconds: number);

    Add(ts2: TimeSpan): TimeSpan;
    Subtract(ts2: TimeSpan): TimeSpan;
    Multiply(v): TimeSpan;
    Divide(ts2: TimeSpan): TimeSpan;
    CompareTo(ts2: TimeSpan): number;
    IsZero(): bool;
}
class Uri {
    toString(): string;
    static IsNullOrEmpty(uri: Uri): bool;
}

//////////////////////////////////////////////////////////
// ENUMS
//////////////////////////////////////////////////////////
enum FontWeight {
    Thin = 100,
    ExtraLight = 200,
    Light = 300,
    Normal = 400,
    Medium = 500,
    SemiBold = 600,
    Bold = 700,
    ExtraBold = 800,
    Black = 900,
    ExtraBlack = 950,
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
enum TextDecorations {
    None = 0,
    Underline = 1,
}
enum LineStackingStrategy {
    MaxHeight = 0,
    BlockLineHeight = 1,
}
enum ClickMode {
    Release = 0,
    Press = 1,
    Hover = 2,
}

//////////////////////////////////////////////////////////
// CORE
//////////////////////////////////////////////////////////
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

//////////////////////////////////////////////////////////
// MEDIA
//////////////////////////////////////////////////////////
class Brush {
}
class PointCollection {
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

class BindingBase {
}
class Binding {
}

class Expression {
}
class BindingExpressionBase extends Expression {
}
class BindingExpression extends BindingExpressionBase {
}

module Fayde {
    export class TypeConverters {
        static Thickness(str: string): Thickness;
        static CornerRadius(str: string): CornerRadius;
        static Brush(str: string): Brush;
        static Color(str: string): Color;
    }
    export class TypeConverter {
        static ConvertObject(propd: DependencyProperty, val, objectType, doStringConversion: bool);
        static GeometryFromString(val): Geometry;
        static PointCollectionFromString(val): PointCollection;
    }
    export function Start(appType, rjson, json, canvas);
    export function Clone(value): any;
}

//////////////////////////////////////////////////////////
// MVVM
//////////////////////////////////////////////////////////
module Fayde.MVVM {
    export interface ICommand {
        Execute(parameter): void;
        CanExecute(parameter): bool;
    }
    
    export class RelayCommand implements ICommand { 
        new (execute?: (parameter) => void, canExecute?: (parameter) => bool): RelayCommand;
        Execute(parameter): void;
        CanExecute(parameter): bool;
    }

    export class ObservableObject {
        PropertyChanged: MulticastEvent;
        OnPropertyChanged(propertyName: string);
    }

    export class ViewModelBase extends ObservableObject { }
}