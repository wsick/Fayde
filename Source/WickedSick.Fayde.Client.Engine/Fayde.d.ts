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
class Dictionary {
    new (type1, type2): Dictionary;
    TryGetValue(key, data);
    GetValue(key): any;
    GetKeyFromValue(value): any;
    Add(key, value);
    Remove(key);
    Clear();
}

class AjaxJsonRequest {
    constructor (onSuccess: (json: string) => void, onError: (msg: string, error?) => void);
    Get(url: string, query: string);
    Post(url: string, query: string, data);
    Cancel();
}

class App extends DependencyObject {
    Address: Uri;
    Resources: ResourceDictionary;
    RootVisual: UIElement;
    Loaded: MulticastEvent;
    static Instance: App;
    static Version: string;
}

interface ICollection {
    GetCount(): number;
    GetValueAt(index: number): any;
    SetValueAt(index: number, value);
    Add(value);
    AddRange(newItems: any[]);
    AddRange(newItems: ICollection);
    Insert(index: number, value);
    Remove(value);
    RemoveAt(index: number);
    Clear();
    IndexOf(value): number;
    Contains(value): bool;
    ToArray(): any[];
}
class DependencyObjectCollection implements ICollection {
    GetCount(): number;
    GetValueAt(index: number): DependencyObject;
    SetValueAt(index: number, value: DependencyObject);
    Add(value: DependencyObject);
    AddRange(newItems: DependencyObject[]);
    AddRange(newItems: ICollection);
    Insert(index: number, value: DependencyObject);
    Remove(value: DependencyObject);
    RemoveAt(index: number);
    Clear();
    IndexOf(value: DependencyObject): number;
    Contains(value: DependencyObject): bool;
    ToArray(): DependencyObject[];

    IsElementType(element: any): bool;
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
    constructor (familyNames: string);
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
    constructor (left?: number, top?: number, right?: number, bottom?: number);
    Left: number;
    Top: number;
    Right: number;
    Bottom: number;
    toString(): string;
    static Equals(thickness1: Thickness, thickness2: Thickness): bool;
}
class TimeSpan {
    constructor (ticks: number);
    constructor (hours: number, minutes: number, seconds: number);
    constructor (days: number, hours: number, minutes: number, seconds: number);
    constructor (days: number, hours: number, minutes: number, seconds: number, milliseconds: number);

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
enum GradientSpreadMethod {
    Pad = 0,
    Reflect = 1,
    Repeat = 2,
}
enum BrushMappingMode {
    Absolute = 0,
    RelativeToBoundingBox = 1,
}
enum AlignmentX  {
    Left = 0,
    Center = 1,
    Right = 2
}
enum AlignmentY {
    Top = 0,
    Center = 1,
    Bottom = 2
}
enum Stretch {
    None = 0,
    Fill = 1,
    Uniform = 2,
    UniformToFill = 3
}
enum PenLineCap {
    Flat = 0,
    Square = 1,
    Round = 2,
    Triangle = 3,
}
enum PenLineJoin {
    Miter = 0,
    Bevel = 1,
    Round = 2,
}
enum SweepDirection {
    Counterclockwise = 0,
    Clockwise = 1,
}
enum FillRule {
    EvenOdd = 0,
    Nonzero = 1,
}
enum TextHintingMode {
    Fixed = 0,
    Animated = 1,
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
class Brush extends DependencyObject {
    static TransformProperty: DependencyProperty;
    Transform: Transform;
}
class SolidColorBrush extends Brush {
    static ColorProperty: DependencyProperty;
    Color: Color;
}
class GradientBrush extends Brush {
    static GradientStopsProperty: DependencyProperty;
    static MappingModeProperty: DependencyProperty;
    static SpreadMethodProperty: DependencyProperty;

    GradientStops: GradientStopsCollection;
    MappingMode: BrushMappingMode;
    SpreadMethod: GradientSpreadMethod;

}
class GradientStop extends DependencyObject {
    static ColorProperty: DependencyProperty;
    static OffsetProperty: DependencyProperty;
    Color: Color;
    Offset: number;
    toString(): string;
}
class GradientStopsCollection extends DependencyObjectCollection {
    GetValueAt(index: number): GradientStop;
    SetValueAt(index: number, value: GradientStop);
    Add(value: GradientStop);
    AddRange(newItems: GradientStop[]);
    AddRange(newItems: ICollection);
    Insert(index: number, value: GradientStop);
    Remove(value: GradientStop);
    IndexOf(value: GradientStop): number;
    Contains(value: GradientStop): bool;
    ToArray(): GradientStop[];
}
class GeneralTransform extends DependencyObject {
    Inverse: GeneralTransform;
    Transform(point: Point): Point;
    TransformBounds(rect: Rect): Rect;
}
class Transform extends GeneralTransform {
}
class Projection extends DependencyObject {
}
class Geometry extends DependencyObject {
    static TransformProperty: DependencyProperty;
    Transform: Transform;
    Bounds: Rect;
}
class Effect extends DependencyObject {
}

class Style {
}

class ResourceDictionary {
}

class Expression {
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
// SHAPES
//////////////////////////////////////////////////////////
class DoubleCollection implements ICollection {
    GetCount(): number;
    GetValueAt(index: number): number;
    SetValueAt(index: number, value: number);
    Add(value: number);
    AddRange(newItems: number[]);
    AddRange(newItems: ICollection);
    Insert(index: number, value: number);
    Remove(value: number);
    RemoveAt(index: number);
    Clear();
    IndexOf(value: number): number;
    Contains(value: number): bool;
    ToArray(): number[];
}
class PointCollection implements ICollection {
    GetCount(): number;
    GetValueAt(index: number): Point;
    SetValueAt(index: number, value: Point);
    Add(value: Point);
    AddRange(newItems: Point[]);
    AddRange(newItems: ICollection);
    Insert(index: number, value: Point);
    Remove(value: Point);
    RemoveAt(index: number);
    Clear();
    IndexOf(value: Point): number;
    Contains(value: Point): bool;
    ToArray(): Point[];
}
class Shape extends FrameworkElement {
    static FillProperty: DependencyProperty;
    static StretchProperty: DependencyProperty;
    static StrokeDashArrayProperty: DependencyProperty;
    static StrokeDashCapProperty: DependencyProperty;
    static StrokeDashOffsetProperty: DependencyProperty;
    static StrokeEndLineCapProperty: DependencyProperty;
    static StrokeLineJoinProperty: DependencyProperty;
    static StrokeMiterLimitProperty: DependencyProperty;
    static StrokeProperty: DependencyProperty;
    static StrokeStartLineCapProperty: DependencyProperty;
    static StrokeThicknessProperty: DependencyProperty;
    
    Fill: Brush;
    Stretch: Stretch;
    StrokeDashArray: DoubleCollection;
    StrokeDashCap: PenLineCap;
    StrokeDashOffset: number;
    StrokeEndLineCap: PenLineCap;
    StrokeLineJoin: PenLineJoin;
    StrokeMiterLimit: number;
    Stroke: Brush;
    StrokeStartLineCap: PenLineCap;
    StrokeThickness: number;
}
class Ellipse extends Shape {
}
class Line extends Shape {
    static X1Property: DependencyProperty;
    static Y1Property: DependencyProperty;
    static X2Property: DependencyProperty;
    static Y2Property: DependencyProperty;
    X1: number;
    Y1: number;
    X2: number;
    Y2: number;
}
class Path extends Shape {
    static DataProperty: DependencyProperty;
    Data: Geometry;
}
class Polygon extends Shape {
    static FillRuleProperty: DependencyProperty;
    static PointsProperty: DependencyProperty;
    FillRule: FillRule;
    Points: PointCollection;
}
class Polyline extends Shape {
    static FillRuleProperty: DependencyProperty;
    static PointsProperty: DependencyProperty;
    FillRule: FillRule;
    Points: PointCollection;
}
class Rectangle extends Shape {
    static RadiusXProperty: DependencyProperty;
    static RadiusYProperty: DependencyProperty;
    RadiusX: number;
    RadiusY: number;
}

//////////////////////////////////////////////////////////
// DATA
//////////////////////////////////////////////////////////
interface INotifyPropertyChanged {
    PropertyChanged: MulticastEvent;
}
class PropertyChangedEventArgs extends EventArgs {
    constructor (propertyName: string);
    PropertyName: string;
}
enum BindingMode {
    TwoWay = 0,
    OneWay = 1,
    OneTime = 2,
    OneWayToSource = 3,
}
enum RelativeSourceMode {
    TemplatedParent = 1,
    Self = 2,
    FindAncestor = 3,
}
enum UpdateSourceTrigger {
    Default = 0,
    PropertyChanged = 1,
    Explicit = 3,
}
interface IValueConverter {
    Convert(value, targetType, parameter, culture): any;
    ConvertBack(value, targetType, parameter, culture): any;
}
class RelativeSource implements IMarkupExtension {
    AncestorLevel: number;
    AncestorType;
    Mode: RelativeSourceMode;
}
interface IMarkupExtension {
}
class BindingBase implements IMarkupExtension {
    CheckSealed();
    FallbackValue;
    StringFormat: string;
    TargetNullValue;
}
class Binding extends BindingBase {
    BindsDirectlyToSource: bool;
    Converter: IValueConverter;
    ConverterCulture;
    ConverterParameter;
    ElementName: string;
    Mode: BindingMode;
    NotifyOnValidationError: bool;
    Path: string;
    RelativeSource: RelativeSource;
    Source;
    UpdateSourceTrigger: UpdateSourceTrigger;
    ValidatesOnDataErrors: bool;
    ValidatesOnExceptions: bool;
    ValidatesOnNotifyDataErrors: bool;
}
class BindingExpressionBase extends Expression {

}
class BindingExpression extends BindingExpressionBase {
    DataItem;
    ParentBinding: Binding;
    UpdateSource();
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
        constructor (execute?: (parameter) => void, canExecute?: (parameter) => bool);
        Execute(parameter): void;
        CanExecute(parameter): bool;
    }

    export class ObservableObject {
        PropertyChanged: MulticastEvent;
        OnPropertyChanged(propertyName: string);
    }

    export class ViewModelBase extends ObservableObject { }
}