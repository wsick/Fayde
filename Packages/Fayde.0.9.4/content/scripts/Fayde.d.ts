class Nullstone {
    static RegisterType(f, typeName: string, baseClass? , interfaces?: any[]): any;
    static RegisterObject(o);

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

    static ImportJsFile(file: string);
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

class App extends Fayde.DependencyObject {
    Address: Uri;
    Resources: Fayde.ResourceDictionary;
    RootVisual: Fayde.UIElement;
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
    Weight: Fayde.FontWeight;
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
// CORE
//////////////////////////////////////////////////////////
module Fayde {
    export class TypeConverters {
        static Thickness(str: string): Thickness;
        static CornerRadius(str: string): CornerRadius;
        static Brush(str: string): Fayde.Media.Brush;
        static Color(str: string): Color;
    }
    export class TypeConverter {
        static ConvertObject(propd: DependencyProperty, val, objectType, doStringConversion: bool);
        static GeometryFromString(val): Fayde.Media.Geometry;
        static PointCollectionFromString(val): Fayde.Shapes.PointCollection;
    }
    export function Start(appType, rjson, json, canvas);
    export function Clone(value): any;
}

module Fayde {
    export enum Orientation {
        Horizontal = 0,
        Vertical = 1,
    }
    export enum Visibility {
        Visible = 0,
        Collapsed = 1,
    }
    export enum HorizontalAlignment {
        Left = 0,
        Center = 1,
        Right = 2,
        Stretch = 3,
    }
    export enum VerticalAlignment {
        Top = 0,
        Center = 1,
        Bottom = 2,
        Stretch = 3,
    }
    export enum TextDecorations {
        None = 0,
        Underline = 1,
    }
    export enum TextAlignment {
        Left = 0,
        Center = 1,
        Right = 2,
    }
    export enum FontWeight {
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
    export enum FlowDirection {
        LeftToRight = 0,
        RightToLeft = 1,
    }
    export enum LineStackingStrategy {
        MaxHeight = 0,
        BlockLineHeight = 1,
    }

    export class DataTemplate extends FrameworkTemplate {
        //LoadContent(): DependencyObject;
        //DataType;
    }
    export class DependencyObject {
        $SetValue(propd: DependencyProperty, value): any;
        $GetValue(propd: DependencyProperty): any;
        $ReadLocalValue(propd: DependencyProperty): any;
        $ClearValue(propd: DependencyProperty);
    }
    export class DependencyObjectCollection implements ICollection {
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
    export class Expression {
    }
    export class FrameworkElement extends UIElement {
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
        FlowDirection: Fayde.FlowDirection;
        Height: number;
        HorizontalAlignment: Fayde.HorizontalAlignment;
        Language: any;
        Margin: Thickness;
        MaxHeight: number;
        MaxWidth: number;
        MinHeight: number;
        MinWidth: number;;
            Style: Fayde.Style;
        Tag: any;
        VerticalAlignment: Fayde.VerticalAlignment;
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
        GetBindingExpression(dp: DependencyProperty): Fayde.Data.BindingExpression;
        SetBinding(dp: DependencyProperty, binding: Fayde.Data.Binding): Fayde.Data.BindingExpressionBase;
        OnApplyTemplate();
    }
    export class FrameworkTemplate extends DependencyObject {
    }
    export interface ISupportInitialize {
        BeginInit();
        EndInit();
    }
    export class LayoutInformation {
        static LayoutClipProperty: DependencyProperty;
        static GetLayoutClip(d: DependencyObject): Fayde.Media.Geometry;
        static SetLayoutClip(d: DependencyObject, value: Fayde.Media.Geometry);

        static LayoutExceptionElementProperty: DependencyProperty;
        static GetLayoutExceptionElement(d: DependencyObject): UIElement;
        static SetLayoutExceptionElement(d: DependencyObject, value: UIElement);

        static LayoutSlotProperty: DependencyProperty;
        static GetLayoutSlot(d: DependencyObject): Rect;
        static SetLayoutSlot(d: DependencyObject, value: Rect);

        static PreviousConstraintProperty: DependencyProperty;
        static GetPreviousConstraint(d: DependencyObject): Size;
        static SetPreviousConstraint(d: DependencyObject, value: Size);

        static FinalRectProperty: DependencyProperty;
        static GetFinalRect(d: DependencyObject): Rect;
        static SetFinalRect(d: DependencyObject, value: Rect);

        static LastRenderSizeProperty: DependencyProperty;
        static GetLastRenderSize(d: DependencyObject): Size;
        static SetLastRenderSize(d: DependencyObject, value: Size);

        static VisualOffsetProperty: DependencyProperty;
        static GetVisualOffset(d: DependencyObject): Point;
        static SetVisualOffset(d: DependencyObject, value: Point);
    }
    export class PresentationFrameworkCollection extends DependencyObject implements ICollection {
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
    export class ResourceDictionary extends DependencyObject implements ICollection {
        static MergedDictionariesProperty: DependencyProperty;
        MergedDictionaries: ResourceDictionaryCollection;

        GetCount(): number;
        GetValueAt(index: number): any;
        SetValueAt(index: number, value);
        Add(value);
        AddRange(newItems: any[]);
        AddRange(newItems: ICollection);
        Insert(index: number, value);
        Remove(key);
        RemoveAt(index: number);
        Clear();
        IndexOf(value): number;
        Contains(value): bool;
        ToArray(): any[];

        ContainsKey(key): bool;
        Get(key): any;
        Set(key, value);
        Add(key, value);
    }
    export class ResourceDictionaryCollection extends DependencyObjectCollection {
    }
    export class RoutedEvent extends MulticastEvent {
        Subscribe(callback: (sender, args: RoutedEventArgs) => void , closure);
        SubscribeSpecific(callback: (sender, args: RoutedEventArgs) => void , closure, matchClosure);
        Unsubscribe(callback: (sender, args: RoutedEventArgs) => void , closure, matchClosure? );
        Raise(sender, args: RoutedEventArgs);
        RaiseAsync(sender, args: RoutedEventArgs);
    }
    export class RoutedEventArgs extends EventArgs {
        Handled: bool;
    }
    export class SetterBase extends DependencyObject {
        IsSealed: bool;
    }
    export class SetterBaseCollection extends DependencyObjectCollection {
        GetValueAt(index: number): SetterBase;
        SetValueAt(index: number, value: SetterBase);
        Add(value: SetterBase);
        AddRange(newItems: SetterBase[]);
        AddRange(newItems: ICollection);
        Insert(index: number, value: SetterBase);
        Remove(value: SetterBase);
        IndexOf(value: SetterBase): number;
        Contains(value: SetterBase): bool;
        ToArray(): SetterBase[];
    }
    export class Setter extends SetterBase {
        Property: DependencyProperty;
        Value;
    }
    export class Style extends DependencyObject {
        BasedOn: Style;
        IsSealed: bool;
        Setters: SetterBaseCollection;
        TargetType;
        Seal();
    }
    export class UIElement extends DependencyObject {
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
        CacheMode: Fayde.Media.CacheMode;
        Clip: Fayde.Media.Geometry;
        Effect: Fayde.Media.Effects.Effect;
        IsHitTestVisible: bool;
        OpacityMask: Fayde.Media.Brush;
        Opacity: number;
        Projection: Fayde.Media.Projection;
        RenderTransform: Fayde.Media.Transform;
        RenderTransformOrigin: Point;
        Resources: ResourceDictionary;
        Triggers: any;
        UseLayoutRounding: bool;
        Visibility: Fayde.Visibility;
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

        TransformToVisual(): Fayde.Media.GeneralTransform;
    }
    export class UIElementCollection extends DependencyObjectCollection {
        GetValueAtZIndex();
        GetZSortedCount();
        ResortByZIndex();
    }
    export class VisualTreeHelper {
        static GetChild(d: DependencyObject, childIndex: number): DependencyObject;
        static GetChildrenCount(d: DependencyObject): DependencyObject;
        static GetParent(d: DependencyObject): DependencyObject;
        static GetRoot(d: DependencyObject): DependencyObject;
    }
    export class RequestBringIntoViewEventArgs extends RoutedEventArgs {
        TargetObject: DependencyObject;
        TargetRect: Rect;
    }
    export class RoutedPropertyChangedEventArgs extends RoutedEventArgs {
        OldValue;
        NewValue;
    }
    export class SizeChangedEventArgs extends RoutedEventArgs {
        PreviousSize: Size;
        NewSize: Size;
    }
    export class UnsetValue { }
}

class DependencyProperty {
    Name: string;
    static Register(name: string, getTargetType: Function, ownerType, defaultValue, changedCallback): DependencyProperty;
    static RegisterAttached(name: string, getTargetType: Function, ownerType, defaultValue, changedCallback): DependencyProperty;
}

//////////////////////////////////////////////////////////
// INPUT
//////////////////////////////////////////////////////////
module Fayde.Input {
    export enum KeyboardNavigationMode {
        Continue = 0,
        Once = 1,
        Cycle = 2,
        None = 3,
        Contained = 4,
        Local = 5
    }
    export class KeyboardNavigation {
        AcceptsReturnProperty: DependencyProperty;
        GetAcceptsReturn(d: DependencyObject): bool;
        SetAcceptsReturn(d: DependencyObject, value: bool);

        ControlTabNavigationProperty: DependencyProperty;
        GetControlTabNavigation(d: DependencyObject): KeyboardNavigationMode;
        SetControlTabNavigation(d: DependencyObject, value: KeyboardNavigationMode);

        DirectionalNavigationProperty: DependencyProperty;
        GetDirectionalNavigation(d: DependencyObject): KeyboardNavigationMode;
        SetDirectionalNavigation(d: DependencyObject, value: KeyboardNavigationMode);

        IsTabStopProperty: DependencyProperty;
        GetIsTabStop(d: DependencyObject): bool;
        SetIsTabStop(d: DependencyObject, value: bool);

        TabIndexProperty: DependencyProperty;
        GetTabIndex(d: DependencyObject): number;
        SetTabIndex(d: DependencyObject, value: number);

        TabNavigationProperty: DependencyProperty;
        GetTabNavigation(d: DependencyObject): KeyboardNavigationMode;
        SetTabNavigation(d: DependencyObject, value: KeyboardNavigationMode);
    }
    export class MouseEventArgs extends RoutedEventArgs {
    }
    export class MouseButtonEventArgs extends MouseEventArgs {
    }
    export class MouseWheelEventArgs extends MouseEventArgs {
    }
    export class KeyEventArgs extends RoutedEventArgs {
    }
    export interface ICommand {
        Execute(parameter): void;
        CanExecute(parameter): bool;
    }
}

//////////////////////////////////////////////////////////
// DOCUMENTS
//////////////////////////////////////////////////////////
module Fayde.Documents {
    export class TextElement extends DependencyObject {
        static FontFamilyProperty: DependencyProperty;
        static FontSizeProperty: DependencyProperty;
        static FontStretchProperty: DependencyProperty;
        static FontStyleProperty: DependencyProperty;
        static FontWeightProperty: DependencyProperty;
        static ForegroundProperty: DependencyProperty;
        FontFamily: string;
        FontSize: number;
        FontStretch: string;
        FontStyle: string;
        FontWeight: FontWeight;
        Foreground: Fayde.Media.Brush;
    }
    export class Block extends TextElement {
        static LineHeightProperty: DependencyProperty;
        static LineStackStrategyProperty: DependencyProperty;
        static TextAlignmentProperty: DependencyProperty;
        LineHeight: number;
        LineStackingStrategy: LineStackingStrategy;
        TextAlignment: TextAlignment;
    }
    export class Paragraph extends Block {
        Inlines: InlineCollection;
    }
    export class Section extends Block {
        Blocks: BlockCollection;
    }
    export class Inline extends TextElement {
    }
    export class LineBreak extends Inline {
    }
    export class Run extends Inline {
        static FlowDirectionProperty: DependencyProperty;
        FlowDirection: FlowDirection;
        Text: string;
    }
    export class Span extends Inline {
        Inlines: InlineCollection;
    }
    export class Bold extends Span {
    }
    export class Italic extends Span {
    }
    export class Underline extends Span {
    }
    export class Hyperlink extends Span {
        static CommandProperty: DependencyProperty;
        static CommandParameterProperty: DependencyProperty;
        static MouseOverForegroundProperty: DependencyProperty;
        static MouseOverTextDecorationsProperty: DependencyProperty;
        static NavigateUriProperty: DependencyProperty;
        static TargetNameProperty: DependencyProperty;

        Command: Input.ICommand;
        CommandParameter;
        MouseOverForeground: Fayde.Media.Brush;
        MouseOverTextDecorations: TextDecorations;
        NavigateUri: Uri;
        TargetName: string;
        Click: RoutedEvent;
    }
    export class TextElementCollection extends DependencyObjectCollection {
        GetValueAt(index: number): TextElement;
        SetValueAt(index: number, value: TextElement);
        Add(value: TextElement);
        AddRange(newItems: TextElement[]);
        AddRange(newItems: ICollection);
        Insert(index: number, value: TextElement);
        Remove(value: TextElement);
        IndexOf(value: TextElement): number;
        Contains(value: TextElement): bool;
        ToArray(): TextElement[];
    }
    export class InlineCollection extends TextElementCollection {
        GetValueAt(index: number): Inline;
        SetValueAt(index: number, value: Inline);
        Add(value: Inline);
        AddRange(newItems: Inline[]);
        AddRange(newItems: ICollection);
        Insert(index: number, value: Inline);
        Remove(value: Inline);
        IndexOf(value: Inline): number;
        Contains(value: Inline): bool;
        ToArray(): Inline[];
    }
    export class BlockCollection extends TextElementCollection {
        GetValueAt(index: number): Block;
        SetValueAt(index: number, value: Block);
        Add(value: Block);
        AddRange(newItems: Block[]);
        AddRange(newItems: ICollection);
        Insert(index: number, value: Block);
        Remove(value: Block);
        IndexOf(value: Block): number;
        Contains(value: Block): bool;
        ToArray(): Block[];
    }
    export class TextSelection {
        //TODO: Finish
    }
}

//////////////////////////////////////////////////////////
// CONTROLS
//////////////////////////////////////////////////////////
module Fayde.Controls {
    module Primitives {
        export enum ScrollEventType {
            SmallDecrement = 0,
            SmallIncrement = 1,
            LargeDecrement = 2,
            LargeIncrement = 3,
            ThumbPosition = 4,
            ThumbTrack = 5,
            First = 6,
            Last = 7,
            EndScroll = 8
        }
        export class ButtonBase extends ContentControl {
            static ClickModeProperty: DependencyProperty;
            static CommandParameterProperty: DependencyProperty;
            static CommandProperty: DependencyProperty;
            static IsFocusedProperty: DependencyProperty;
            static IsMouseOverProperty: DependencyProperty;
            static IsPressedProperty: DependencyProperty;
            ClickMode: ClickMode;
            Command: Input.ICommand;
            CommandParameter;
            IsFocused: bool;
            IsMouseOver: bool;
            IsPressed: bool;
            OnApplyTemplate();
            OnClick();
            OnGotFocus(e: RoutedEventArgs);
            OnIsPressedChanged(e: RoutedEvent);
            OnKeyDown(e: Input.KeyEventArgs);
            OnKeyUp(e: Input.KeyEventArgs);
            OnLostFocus(e: RoutedEventArgs);
            OnLostMouseCapture(e: Input.MouseEventArgs);
            OnMouseEnter(e: Input.MouseEventArgs);
            OnMouseLeave(e: Input.MouseEventArgs);
            OnMouseLeftButtonDown(e: Input.MouseButtonEventArgs);
            OnMouseLeftButtonUp(e: Input.MouseButtonEventArgs);
            OnMouseMove(e: Input.MouseEventArgs);
            Click: RoutedEvent;
        }
        export class DragCompletedEventArgs extends RoutedEventArgs {
            HorizontalChange: number;
            VerticalChanged: number;
            Canceled: bool;
        }
        export class DragDeltaEventArgs extends RoutedEventArgs {
            HorizontalChange: number;
            VerticalChanged: number;
        }
        export class DragStartedEventArgs extends RoutedEventArgs {
            HorizontalOffset: number;
            VerticalOffset: number;
        }
        export interface IScrollInfo {
            LineDown();
            LineLeft();
            LineRight();
            LineUp();
            MouseWheelDown();
            MouseWheelLeft();
            MouseWheelRight();
            MouseWheelUp();
            PageDown();
            PageLeft();
            PageRight();
            PageUp();
            SetHorizontalOffset(offset: number);
            SetVerticalOffset(offset: number);
            MakeVisible(visual: UIElement, rectangle: Rect);
        }
        export class ItemsChangedEventArgs extends EventArgs {
            Action: Collections.NotifyCollectionChangedAction;
            ItemCount: number;
            ItemUICount: number;
            OldPosition: number;
            Position: number;
        }
        export class Popup extends FrameworkElement {
            static ChildProperty: DependencyProperty;
            static HorizontalOffsetProperty: DependencyProperty;
            static IsOpenProperty: DependencyProperty;
            static VerticalOffsetProperty: DependencyProperty;
            Child: UIElement;
            HorizontalOffset: number;
            IsOpen: bool;
            VerticalOffset: number;

            Opened: MulticastEvent;
            Closed: MulticastEvent;
        }
        export class RangeBase extends Control {
            static LargeChangeProperty: DependencyProperty;
            static MaximumProperty: DependencyProperty;
            static MinimumProperty: DependencyProperty;
            static SmallChangeProperty: DependencyProperty;
            static ValueProperty: DependencyProperty;
            LargeChange: number;
            Maximum: number;
            Minimum: number;
            SmallChange: number;
            Value: number;
            OnMaximumChanged();
            OnMinimumChanged();
            OnValueChanged();
            ValueChanged: RoutedEvent;
        }
        export class RepeatButton extends ButtonBase {
            static DelayProperty: DependencyProperty;
            static IntervalProperty: DependencyProperty;
            Delay: number;
            Interval: number;
        }
        export class ScrollBar extends RangeBase {
            static OrientationProperty: DependencyProperty;
            static ViewportSizeProperty: DependencyProperty;
            Orientation: Orientation;
            ViewportSize: number;
            Scroll: MulticastEvent;
        }
        export class ScrollEventArgs extends EventArgs {
            ScrollEvent: ScrollEventType;
            Value: number;
        }
        export class SelectionChangedEventArgs extends EventArgs {
            OldValues: any[];
            NewValues: any[];
        }
        export class Selector extends ItemsControl implements ISupportInitialize {
            static SelectedIndexProperty: DependencyProperty;
            static SelectedItemProperty: DependencyProperty;
            static SelectedValuePathProperty: DependencyProperty;
            static SelectedValueProperty: DependencyProperty;
            HasItems: bool;
            SelectedIndex: number;
            SelectedItem;
            SelectedValue;
            SelectedValuePath: string;
            static GetIsSelectionActive(element: DependencyObject): bool;
            SelectionChanged: MulticastEvent;
            BeginInit();
            EndInit();
        }
        export class Thumb extends Control {
            static IsDraggingProperty: DependencyProperty;
            static IsFocusedProperty: DependencyProperty;
            IsDragging: bool;
            IsFocused: bool;
            CancelDrag();
            DragCompleted: MulticastEvent;
            DragDelta: MulticastEvent;
            DragStarted: MulticastEvent;
        }
        export class ToggleButton extends ButtonBase {
            static IsCheckedProperty: DependencyProperty;
            static IsThreeStateProperty: DependencyProperty;
            IsChecked: bool;
            IsThreeState: bool;
            OnToggle();
            Checked: RoutedEvent;
            Indeterminate: RoutedEvent;
            Unchecked: RoutedEvent;
        }
    }

    export enum GridUnitType {
        Auto = 0,
        Pixel = 1,
        Star = 2,
    }
    export enum PlacementMode {
        Bottom = 0,
        Right = 1,
        Mouse = 2,
        Left = 3,
        Top = 4,
    }
    export enum ScrollBarVisibility {
        Disabled = 0,
        Auto = 1,
        Hidden = 2,
        Visible = 3,
    }
    export enum SelectionMode {
        Single = 0,
        Multiple = 1,
        Extended = 2,
    }
    export enum VirtualizationMode {
        Standard = 0,
        Recycling = 1,
    }
    export enum TextTrimming {
        None = 0,
    }
    export enum TextWrapping {
        NoWrap = 0,
        Wrap = 1,
        WrapWithOverflow = 2,
    }
    export enum ClickMode {
        Release = 0,
        Press = 1,
        Hover = 2,
    }
    export enum MediaElementState {
        Closed = 0,
        Opening = 1,
        Buffering = 4,
        Playing = 5,
        Paused = 6,
        Stopped = 7,
    }

    export class Border extends FrameworkElement {
        static BackgroundProperty: DependencyProperty;
        static BorderBrushProperty: DependencyProperty;
        static BorderThicknessProperty: DependencyProperty;
        static ChildProperty: DependencyProperty;
        static CornerRadiusProperty: DependencyProperty;
        static PaddingProperty: DependencyProperty;

        Background: Fayde.Media.Brush;
        BorderBrush: Fayde.Media.Brush;
        BorderThickness: Thickness;
        Child: UIElement;
        CornerRadius: CornerRadius;
        Padding: Thickness;
    }
    export class Button extends Primitives.ButtonBase {
    }
    export class Canvas extends Panel {
        static LeftProperty: DependencyProperty;
        static GetLeft(d: DependencyObject): number;
        static SetLeft(d: DependencyObject, value: number);

        static TopProperty: DependencyProperty;
        static GetTop(d: DependencyObject): number;
        static SetTop(d: DependencyObject, value: number);

        static ZIndexProperty: DependencyProperty;
        static GetZIndex(d: DependencyObject): number;
        static SetZIndex(d: DependencyObject, value: number);

        MeasureOverride(constraint: Size): Size;
        ArrangeOverride(arrangeSize: Size): Size;
    }
    export class CheckBox extends Primitives.ToggleButton {
    }
    export class ColumnDefinition extends DependencyObject {
        static MaxWidthProperty: DependencyProperty;
        static MinWidthProperty: DependencyProperty;
        static WidthProperty: DependencyProperty;
        ActualWidth: number;
        MaxWidth: number;
        MinWidth: number;
        Width: GridLength;
    }
    export class ColumnDefinitionCollection extends DependencyObjectCollection {
        GetValueAt(index: number): ColumnDefinition;
        SetValueAt(index: number, value: ColumnDefinition);
        Add(value: ColumnDefinition);
        AddRange(newItems: ColumnDefinition[]);
        AddRange(newItems: ICollection);
        Insert(index: number, value: ColumnDefinition);
        Remove(value: ColumnDefinition);
        IndexOf(value: ColumnDefinition): number;
        Contains(value: ColumnDefinition): bool;
        ToArray(): ColumnDefinition[];
    }
    export class ComboBox extends Primitives.Selector {
        static IsDropDownOpenProperty: DependencyProperty;
        static IsSelectionActiveProperty: DependencyProperty;
        static ItemContainerStyleProperty: DependencyProperty;
        static MaxDropDownHeightProperty: DependencyProperty;
        IsDropDownOpen: bool;
        IsSelectionActive: bool;
        ItemContainerStyle: Style;
        MaxDropDownHeight: number;
        IsEditable: bool;
        IsSelectionBoxHighlighted: bool;
        SelectionBoxItem;
        SelectionBoxItemTemplate: DataTemplate;
        DropDownClosed: RoutedEvent;
        DropDownOpened: RoutedEvent;
    }
    export class ComboBoxItem extends ListBoxItem {
    }
    export class ContentControl extends Control {
        static ContentProperty: DependencyProperty;
        static ContentTemplateProperty: DependencyProperty;
        Content;
        ContentTemplate: ControlTemplate;
        OnContentChanged(oldContent, newContent);
    }
    export class ContentPresenter extends FrameworkElement {
        static ContentProperty: DependencyProperty;
        static ContentTemplateProperty: DependencyProperty;
        Content;
        ContentTemplate: DataTemplate;
    }
    export class Control extends FrameworkElement {
        static BackgroundProperty: DependencyProperty;
        static BorderBrushProperty: DependencyProperty;
        static BorderThicknessProperty: DependencyProperty;
        static FontFamilyProperty: DependencyProperty;
        static FontSizeProperty: DependencyProperty;
        static FontStretchProperty: DependencyProperty;
        static FontStyleProperty: DependencyProperty;
        static FontWeightProperty: DependencyProperty;
        static ForegroundProperty: DependencyProperty;
        static HorizontalContentAlignmentProperty: DependencyProperty;
        static IsEnabledProperty: DependencyProperty;
        static IsTabStopProperty: DependencyProperty;
        static PaddingProperty: DependencyProperty;
        static TabIndexProperty: DependencyProperty;
        static TabNavigationProperty: DependencyProperty;
        static TemplateProperty: DependencyProperty;
        static VerticalContentAlignmentProperty: DependencyProperty;

        Background: Fayde.Media.Brush;
        BorderBrush: Fayde.Media.Brush;
        BorderThickness: Thickness;
        FontFamily: string;
        FontSize: number;
        FontStretch: string;
        FontStyle: string;
        FontWeight: FontWeight;
        Foreground: Fayde.Media.Brush;
        HorizontalContentAlignment: HorizontalAlignment;
        IsEnabled: bool;
        IsTabStop: bool;
        Padding: Thickness;
        TabIndex: number;
        TabNavigation: number;
        Template: ControlTemplate;
        VerticalContentAlignment: VerticalAlignment;
        IsFocused: bool;

        Focus(): bool;
        GetTemplateChild(name: string): DependencyObject;

        IsEnabledChanged: RoutedEvent;
    }
    export class ControlTemplate extends FrameworkTemplate {
        TargetType;
    }
    export class Frame extends ContentControl {
        static IsDeepLinkedProperty: DependencyProperty;
        static CurrentSourceProperty: DependencyProperty;
        static SourceProperty: DependencyProperty;
        IsDeepLinked: bool;
        CurrentSource: Uri;
        Source: Uri;
        GoForward();
        GoBackward();
        StopLoading();
        Navigate(source: Uri);
    }
    export class Grid extends Panel {
        static ColumnProperty: DependencyProperty;
        static GetColumn(d: DependencyObject): number;
        static SetColumn(d: DependencyObject, value: number);

        static ColumnSpanProperty: DependencyProperty;
        static GetColumnSpan(d: DependencyObject): number;
        static SetColumnSpan(d: DependencyObject, value: number);

        static RowProperty: DependencyProperty;
        static GetRow(d: DependencyObject): number;
        static SetRow(d: DependencyObject, value: number);

        static RowSpanProperty: DependencyProperty;
        static GetRowSpan(d: DependencyObject): number;
        static SetRowSpan(d: DependencyObject, value: number);

        static ShowGridLinesProperty: DependencyProperty;
        static GetShowGridLines(d: DependencyObject): number;
        static SetShowGridLines(d: DependencyObject, value: number);

        ColumnDefinitions: ColumnDefinitionCollection;
        RowDefinitions: RowDefinitionCollection;
        ShowGridLines: bool;

        MeasureOverride(constraint: Size): Size;
        ArrangeOverride(arrangeSize: Size): Size;
    }
    export class GridLength {
        Value: number;
        Type: GridUnitType;
    }
    export class HyperlinkButton extends Primitives.ButtonBase {
        static NavigateUriProperty: DependencyProperty;
        static TargetNameProperty: DependencyProperty;
        NavigateUri: Uri;
        TargetName: string;
    }
    export class Image extends FrameworkElement {
        static SourceProperty: DependencyProperty;
        static StretchProperty: DependencyProperty;
        Source: Fayde.Media.Imaging.ImageSource;
        Stretch: Fayde.Media.Stretch;
        ImageFailed: MulticastEvent;
        ImageOpened: MulticastEvent;
    }
    export class ItemCollection extends PresentationFrameworkCollection implements Collections.INotifyCollectionChanged {
        CollectionChanged: Collections.NotifyCollectionChangedEventHandler;
    }
    export class ItemContainerGenerator {
        ItemsChanged: MulticastEvent;
    }
    export class ItemsControl extends Control {
        static DisplayMemberPathProperty: DependencyProperty;
        static ItemsPanelProperty: DependencyProperty;
        static ItemsSourceProperty: DependencyProperty;
        static ItemTemplateProperty: DependencyProperty;
        DisplayMemberPath: string;
        ItemsPanel: ItemsPanelTemplate;
        ItemsSource;
        ItemTemplate: DataTemplate;
        Items: ItemCollection;
        ItemContainerGenerator: ItemContainerGenerator;
        ClearContainerForItemOverride(element: DependencyObject, item);
        GetContainerForItemOverride(): DependencyObject;
        IsItemItsOwnContainerOverride(item): bool;
        ItemsControlFromItemContainer(container: DependencyObject): ItemsControl;
        OnItemsChanged(e: Collections.NotifyCollectionChangedEventArgs);
        PrepareContainerForItemOverride(element: DependencyObject, item);
    }
    export class ItemsPanelTemplate extends FrameworkTemplate {
    }
    export class ItemsPresenter extends FrameworkElement {
    }
    export class ListBox extends Primitives.Selector {
        static IsSelectionActiveProperty: DependencyProperty;
        static ItemContainerStyleProperty: DependencyProperty;
        static SelectionModeProperty: DependencyProperty;
        IsSelectionActive: bool;
        ItemContainerStyle: Style;
        SelectionMode: SelectionMode;
        SelectAll();
        ScrollIntoView(item);
    }
    export class ListBoxItem extends ContentControl {
        static IsSelectedProperty: DependencyProperty;
        IsSelected: bool;
    }
    export class MediaElement extends FrameworkElement {
        static AutoPlayProperty: DependencyProperty;
        static BufferingProgressProperty: DependencyProperty;
        static BufferingTimeProperty: DependencyProperty;
        static CanPauseProperty: DependencyProperty;
        static CanSeekProperty: DependencyProperty;
        static CurrentStateProperty: DependencyProperty;
        static DownloadProgressProperty: DependencyProperty;
        static DownloadProgressOffsetProperty: DependencyProperty;
        static IsMutedProperty: DependencyProperty;
        static NaturalDurationProperty: DependencyProperty;
        static NaturalVideoHeightProperty: DependencyProperty;
        static NaturalVideoWidthProperty: DependencyProperty;
        static PlaybackRateProperty: DependencyProperty;
        static PositionProperty: DependencyProperty;
        static SourceProperty: DependencyProperty;
        static StretchProperty: DependencyProperty;
        static VolumeProperty: DependencyProperty;

        AutoPlay: bool;
        BufferingProgress: number;
        BufferingTime: TimeSpan;
        CanPause: bool;
        CanSeek: bool;
        CurrentState: MediaElementState;
        DownloadProgress: number;
        DownloadProgressOffset: number;
        IsMuted: bool;
        NaturalDuration: Duration;
        NaturalVideoHeight: number;
        NaturalVideoWidth: number;
        PlaybackRate: number;
        Position: TimeSpan;
        Source: Uri;
        Stretch: Fayde.Media.Stretch;
        Volume: number;
    }
    export class Page extends UserControl {
        static TitleProperty: DependencyProperty;
        Title: string;
    }
    export class Panel extends FrameworkElement {
        static BackgroundProperty: DependencyProperty;
        static ChildrenProperty: DependencyProperty;
        static IsItemsHostProperty: DependencyProperty;
        Background: Fayde.Media.Brush;
        Children: UIElementCollection;
        IsItemsHost: bool;
    }
    export class PasswordBox extends Control {
        static CaretBrushProperty: DependencyProperty;
        static MaxLengthProperty: DependencyProperty;
        static SelectionForegroundProperty: DependencyProperty;
        static SelectionBackgroundProperty: DependencyProperty;
        static PasswordProperty: DependencyProperty;
        CaretBrush: Fayde.Media.Brush;
        MaxLength: number;
        SelectionForeground: Fayde.Media.Brush;
        SelectionBackground: Fayde.Media.Brush;
        Password: string;
        SelectAll();
        PasswordChanged: RoutedEvent;
    }
    export class ProgressBar extends Primitives.RangeBase {
        static IsIndeterminateProperty: DependencyProperty;
        IsIndeterminate: bool;
    }
    export class RadioButton extends Primitives.ToggleButton {
        static GroupNameProperty: DependencyProperty;
        GroupName: string;
    }
    export class RichTextBox extends Control {
        static AcceptsReturnProperty: DependencyProperty;
        static CaretBrushProperty: DependencyProperty;
        static IsReadOnlyProperty: DependencyProperty;
        static LineHeightProperty: DependencyProperty;
        static LineStackingStrategyProperty: DependencyProperty;
        static TextAlignmentProperty: DependencyProperty;
        static TextWrappingProperty: DependencyProperty;
        AcceptsReturn: bool;
        BaselineOffset: number;
        Blocks: Documents.BlockCollection;
        CaretBrush: Fayde.Media.Brush;
        HorizontalScrollBarVisibility: ScrollBarVisibility;
        IsReadOnly: bool;
        LineHeight: number;
        LineStackingStrategy: LineStackingStrategy;
        Selection: Documents.TextSelection;
        TextAlignment: TextAlignment;
        TextWrapping: TextWrapping;
        VerticalScrollBarVisibility: ScrollBarVisibility;
        Xaml: string;

        ContentChanged: RoutedEvent;
        SelectionChanged: RoutedEvent;
    }
    export class RowDefinition extends DependencyObject {
        static MaxHeightProperty: DependencyProperty;
        static MinHeightProperty: DependencyProperty;
        static HeightProperty: DependencyProperty;
        ActualHeight: number;
        MaxHeight: number;
        MinHeight: number;
        Height: GridLength;
    }
    export class RowDefinitionCollection extends DependencyObjectCollection {
        GetValueAt(index: number): RowDefinition;
        SetValueAt(index: number, value: RowDefinition);
        Add(value: RowDefinition);
        AddRange(newItems: RowDefinition[]);
        AddRange(newItems: ICollection);
        Insert(index: number, value: RowDefinition);
        Remove(value: RowDefinition);
        IndexOf(value: RowDefinition): number;
        Contains(value: RowDefinition): bool;
        ToArray(): RowDefinition[];
    }
    export class ScrollContentPresenter extends ContentPresenter implements Primitives.IScrollInfo {
        LineDown();
        LineLeft();
        LineRight();
        LineUp();
        MouseWheelDown();
        MouseWheelLeft();
        MouseWheelRight();
        MouseWheelUp();
        PageDown();
        PageLeft();
        PageRight();
        PageUp();
        SetHorizontalOffset(offset: number);
        SetVerticalOffset(offset: number);
        MakeVisible(visual: UIElement, rectangle: Rect);
    }
    export class ScrollViewer extends ContentControl {
        static HorizontalScrollBarVisibilityProperty: DependencyProperty;
        static GetHorizontalScrollBarVisibility(d: DependencyObject): ScrollBarVisibility;
        static SetHorizontalScrollBarVisibility(d: DependencyObject, value: ScrollBarVisibility);

        static VerticalScrollBarVisibilityProperty: DependencyProperty;
        static GetVerticalScrollBarVisibility(d: DependencyObject): ScrollBarVisibility;
        static SetVerticalScrollBarVisibility(d: DependencyObject, value: ScrollBarVisibility);

        static ComputedHorizontalScrollBarVisibilityProperty: DependencyProperty;
        static ComputedVerticalScrollBarVisibilityProperty: DependencyProperty;
        static HorizontalOffsetProperty: DependencyProperty;
        static VerticalOffsetProperty: DependencyProperty;
        static ScrollableWidthProperty: DependencyProperty;
        static ScrollableHeightProperty: DependencyProperty;
        static ExtentWidthProperty: DependencyProperty;
        static ExtentHeightProperty: DependencyProperty;
        static ViewportWidthProperty: DependencyProperty;
        static ViewportHeightProperty: DependencyProperty;

        HorizontalScrollBarVisibility: ScrollBarVisibility;
        VerticalScrollBarVisibility: ScrollBarVisibility;
        ComputedHorizontalScrollBarVisibility: ScrollBarVisibility;
        ComputedVerticalScrollBarVisibility: ScrollBarVisibility;
        HorizontalOffset: number;
        VerticalOffset: number;
        ScrollableWidth: number;
        ScrollableHeight: number;
        ExtentWidth: number;
        ExtentHeight: number;
        ViewportWidth: number;
        ViewportHeight: number;

        InvalidateScrollInfo();
        ScrollToHorizontalOffset(offset: number);
        ScrollToVerticalOffset(offset: number);
    }
    export class Slider extends Primitives.RangeBase {
        static IsDirectionReversedProperty: DependencyProperty;
        static IsFocusedProperty: DependencyProperty;
        static OrientationProperty: DependencyProperty;
        IsDirectionReversed: bool;
        IsFocused: bool;
        Orientation: Orientation;
    }
    export class StackPanel extends Panel {
        static OrientationProperty: DependencyProperty;
        Orientation: Orientation;
        MeasureOverride(constraint: Size): Size;
        ArrangeOverride(arrangeSize: Size): Size;
    }
    export class TextBlock extends FrameworkElement {
        static FontFamilyProperty: DependencyProperty;
        static FontSizeProperty: DependencyProperty;
        static FontStretchProperty: DependencyProperty;
        static FontStyleProperty: DependencyProperty;
        static FontWeightProperty: DependencyProperty;
        static ForegroundProperty: DependencyProperty;
        static InlinesProperty: DependencyProperty;
        static LineHeightProperty: DependencyProperty;
        static LineStackingStrategyProperty: DependencyProperty;
        static PaddingProperty: DependencyProperty;
        static TextAlignmentProperty: DependencyProperty;
        static TextDecorationsProperty: DependencyProperty;
        static TextProperty: DependencyProperty;
        static TextTrimmingProperty: DependencyProperty;
        static TextWrappingProperty: DependencyProperty;
        FontFamily: string;
        FontSize: number;
        FontStretch: string;
        FontStyle: string;
        FontWeight: FontWeight;
        Foreground: Fayde.Media.Brush;
        Inlines: Fayde.Documents.InlineCollection;
        LineHeight: number;
        LineStackingStrategy: LineStackingStrategy;
        Padding: Thickness;
        TextAlignment: TextAlignment;
        TextDecorations: TextDecorations;
        Text: string;
        TextTrimming: TextTrimming;
        TextWrapping: TextWrapping;
    }
    export class TextBox extends Control {
        static AcceptsReturnProperty: DependencyProperty;
        static CaretBrushProperty: DependencyProperty;
        static MaxLengthProperty: DependencyProperty;
        static IsReadOnlyProperty: DependencyProperty;
        static SelectionForegroundProperty: DependencyProperty;
        static SelectionBackgroundProperty: DependencyProperty;
        static BaselineOffsetProperty: DependencyProperty;
        static SelectedTextProperty: DependencyProperty;
        static SelectionLengthProperty: DependencyProperty;
        static SelectionStartProperty: DependencyProperty;
        static TextProperty: DependencyProperty;
        static TextAlignmentProperty: DependencyProperty;
        static TextWrappingProperty: DependencyProperty;
        static HorizontalScrollBarVisibilityProperty: DependencyProperty;
        static VerticalScrollBarVisibilityProperty: DependencyProperty;
        AcceptsReturn: bool;
        CaretBrush: Fayde.Media.Brush;
        MaxLength: number;
        IsReadOnly: bool;
        SelectionForeground: Fayde.Media.Brush;
        SelectionBackground: Fayde.Media.Brush;
        BaselineOffset: number;
        SelectedText: string;
        SelectionLength: number;
        SelectionStart: number;
        Text: string;
        TextAlignment: TextAlignment;
        TextWrapping: TextWrapping;
        HorizontalScrollBarVisibility: ScrollBarVisibility;
        VerticalScrollBarVisibility: ScrollBarVisibility;
        Select(start: number, length: number);
        SelectAll();
        SelectionChanged: RoutedEvent;
        TextChanged: RoutedEvent;
    }
    export class ToolTip extends ContentControl {
        static HorizontalOffsetProperty: DependencyProperty;
        static IsOpenProperty: DependencyProperty;
        static PlacementProperty: DependencyProperty;
        static PlacementTargetProperty: DependencyProperty;
        static VerticalOffsetProperty: DependencyProperty;
        HorizontalOffset: number;
        IsOpen: bool;
        Placement: PlacementMode;
        PlacementTarget: UIElement;
        VerticalOffset: number;
        Closed: RoutedEvent;
        Opened: RoutedEvent;
    }
    export class ToolTipService {
        static PlacementProperty: DependencyProperty;
        static GetPlacement(d: DependencyObject): PlacementMode;
        static SetPlacement(d: DependencyObject, value: PlacementMode);

        static PlacementTargetProperty: DependencyProperty;
        static GetPlacementTarget(d: DependencyObject): UIElement;
        static SetPlacementTarget(d: DependencyObject, value: UIElement);

        static ToolTipProperty: DependencyProperty;
        static GetToolTip(d: DependencyObject): ToolTip;
        static SetToolTip(d: DependencyObject, value: ToolTip);
    }
    export class UserControl extends Control {
        static ContentProperty: DependencyProperty;
        Content: UIElement;
    }
    export class VirtualizingPanel extends Panel {
        ItemContainerGenerator: ItemContainerGenerator;
        AddInternalChild(child: UIElement);
        BringIndexIntoView(index: number);
        InsertInternalChild(index: number, child: UIElement);
        OnClearChildren();
        OnItemsChanged(sender, args: Primitives.ItemsChangedEventArgs);
        RemoveInternalChildRange(index: number, range: number);
    }
    export class VirtualizingStackPanel extends VirtualizingPanel implements Primitives.IScrollInfo {
        static IsVirtualizingProperty: DependencyProperty;
        static GetIsVirtualizing(d: DependencyObject): bool;
        static SetIsVirtualizing(d: DependencyObject, value: bool);

        static OrientationProperty: DependencyProperty;

        static VirtualizationMode: DependencyProperty;
        static GetVirtualizationMode(d: DependencyObject): VirtualizationMode;
        static SetVirtualizationMode(d: DependencyObject, value: VirtualizationMode);

        MeasureOverride(constraint: Size): Size;
        ArrangeOverride(arrangeSize: Size): Size;

        //IScrollInfo Members
        LineDown();
        LineLeft();
        LineRight();
        LineUp();
        MouseWheelDown();
        MouseWheelLeft();
        MouseWheelRight();
        MouseWheelUp();
        PageDown();
        PageLeft();
        PageRight();
        PageUp();
        SetHorizontalOffset(offset: number);
        SetVerticalOffset(offset: number);
        MakeVisible(visual: UIElement, rectangle: Rect);
    }
}

//////////////////////////////////////////////////////////
// MEDIA
//////////////////////////////////////////////////////////
module Fayde.Media {
    export class CacheMode extends DependencyObject {
    }
    export enum TextHintingMode {
        Fixed = 0,
        Animated = 1,
    }
    export class TextOptions {
        static TextHintingModeProperty: DependencyProperty;
        static GetTextHintingMode(d: DependencyObject): TextHintingMode;
        static SetTextHintingMode(d: DependencyObject, value: TextHintingMode);
    }
    //Brushes
    export enum AlignmentX  {
        Left = 0,
        Center = 1,
        Right = 2
    }
    export enum AlignmentY {
        Top = 0,
        Center = 1,
        Bottom = 2
    }
    export enum Stretch {
        None = 0,
        Fill = 1,
        Uniform = 2,
        UniformToFill = 3
    }
    export enum GradientSpreadMethod {
        Pad = 0,
        Reflect = 1,
        Repeat = 2,
    }
    export enum BrushMappingMode {
        Absolute = 0,
        RelativeToBoundingBox = 1,
    }
    export class Brush extends DependencyObject {
        static TransformProperty: DependencyProperty;
        Transform: Fayde.Media.Transform;
    }
    export class SolidColorBrush extends Brush {
        static ColorProperty: DependencyProperty;
        Color: Color;
    }
    export class GradientBrush extends Brush {
        static GradientStopsProperty: DependencyProperty;
        static MappingModeProperty: DependencyProperty;
        static SpreadMethodProperty: DependencyProperty;
        GradientStops: GradientStopsCollection;
        MappingMode: BrushMappingMode;
        SpreadMethod: GradientSpreadMethod;

    }
    export class GradientStop extends DependencyObject {
        static ColorProperty: DependencyProperty;
        static OffsetProperty: DependencyProperty;
        Color: Color;
        Offset: number;
        toString(): string;
    }
    export class GradientStopsCollection extends DependencyObjectCollection {
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
    export class LinearGradientBrush extends GradientBrush {
        static StartPointProperty: DependencyProperty;
        static EndPointProperty: DependencyProperty;
        StartPoint: Point;
        EndPoint: Point;
    }
    export class RadialGradientBrush extends GradientBrush {
        static CenterProperty: DependencyProperty;
        static GradientOriginProperty: DependencyProperty;
        static RadiusXProperty: DependencyProperty;
        static RadiusYProperty: DependencyProperty;
        Center: Point;
        GradientOrigin: Point;
        RadiusX: number;
        RadiusY: number;
    }
    export class TileBrush extends Brush {
        static AlignmentXProperty: DependencyProperty;
        static AlignmentYProperty: DependencyProperty;
        static StretchProperty: DependencyProperty;
        AlignmentX: AlignmentX;
        AlignmentY: AlignmentY;
        Stretch: Stretch;
    }
    //Geometries
    export class Geometry extends DependencyObject {
        static TransformProperty: DependencyProperty;
        Transform: Fayde.Media.Transform;
        Bounds: Rect;
    }
    export class GeometryCollection extends DependencyObjectCollection {
        GetValueAt(index: number): Geometry;
        SetValueAt(index: number, value: Geometry);
        Add(value: Geometry);
        AddRange(newItems: Geometry[]);
        AddRange(newItems: ICollection);
        Insert(index: number, value: Geometry);
        Remove(value: Geometry);
        IndexOf(value: Geometry): number;
        Contains(value: Geometry): bool;
        ToArray(): Geometry[];
    }
    export class GeometryGroup extends Geometry {
        static FillRuleProperty: DependencyProperty;
        static ChildrenProperty: DependencyProperty;
        FillRule: Fayde.Shapes.FillRule;
        Children: GeometryCollection;
    }
    export class PathSegment extends DependencyObject {
    }
    export class PathSegmentCollection extends DependencyObjectCollection {
        GetValueAt(index: number): PathSegment;
        SetValueAt(index: number, value: PathSegment);
        Add(value: PathSegment);
        AddRange(newItems: PathSegment[]);
        AddRange(newItems: ICollection);
        Insert(index: number, value: PathSegment);
        Remove(value: PathSegment);
        IndexOf(value: PathSegment): number;
        Contains(value: PathSegment): bool;
        ToArray(): PathSegment[];
    }
    export class PathFigure extends DependencyObject {
        static IsClosedProperty: DependencyProperty;
        static SegmentsProperty: DependencyProperty;
        static StartPointProperty: DependencyProperty;
        static IsFilledProperty: DependencyProperty;
        IsClosedProperty: bool;
        SegmentsProperty: PathSegmentCollection;
        StartPointProperty: Point;
        IsFilledProperty: bool;
    }
    export class PathFigureCollection extends DependencyObjectCollection {
        GetValueAt(index: number): PathFigure;
        SetValueAt(index: number, value: PathFigure);
        Add(value: PathFigure);
        AddRange(newItems: PathFigure[]);
        AddRange(newItems: ICollection);
        Insert(index: number, value: PathFigure);
        Remove(value: PathFigure);
        IndexOf(value: PathFigure): number;
        Contains(value: PathFigure): bool;
        ToArray(): PathFigure[];
    }
    export class ArcSegment extends PathSegment {
        static IsLargeArcProperty: DependencyProperty;
        static PointProperty: DependencyProperty;
        static RotationAngleProperty: DependencyProperty;
        static SizeProperty: DependencyProperty;
        static SweepDirectionProperty: DependencyProperty;
        IsLargeArc: bool;
        Point: Point;
        RotationAngle: number;
        Size: Size;
        SweepDirection: Fayde.Shapes.SweepDirection;
    }
    export class PathGeometry extends Geometry {
        static FillRuleProperty: DependencyProperty;
        static FiguresProperty: DependencyProperty;
        FillRule: Fayde.Shapes.FillRule;
        Figures: PathFigureCollection;
    }
    export class RectangleGeometry extends Geometry {
        static RectProperty: DependencyProperty;
        static RadiusXProperty: DependencyProperty;
        static RadiusYProperty: DependencyProperty;
        Rect: Rect;
        RadiusX: number;
        RadiusY: number;
    }
    //Transforms/Projections
    export class GeneralTransform extends DependencyObject {
        Inverse: GeneralTransform;
        Transform(point: Point): Point;
        TransformBounds(rect: Rect): Rect;
    }
    export class Transform extends GeneralTransform {
    }
    export class MatrixTransform extends Transform {
        static MatrixProperty: DependencyProperty;
        Matrix: Matrix;
    }
    export class RotateTransform extends Transform {
        static AngleProperty: DependencyProperty;
        static CenterXProperty: DependencyProperty;
        static CenterYProperty: DependencyProperty;
        Angle: number;
        CenterX: number;
        CenterY: number;
    }
    export class ScaleTransform extends Transform {
        static CenterXProperty: DependencyProperty;
        static CenterYProperty: DependencyProperty;
        static ScaleXProperty: DependencyProperty;
        static ScaleYProperty: DependencyProperty;
        CenterX: number;
        CenterY: number;
        ScaleX: number;
        ScaleY: number;
    }
    export class SkewTransform extends Transform {
        static AngleXProperty: DependencyProperty;
        static AngleYProperty: DependencyProperty;
        static CenterXProperty: DependencyProperty;
        static CenterYProperty: DependencyProperty;
        AngleX: number;
        AngleY: number;
        CenterX: number;
        CenterY: number;
    }
    export class TranslateTransform extends Transform {
        static XProperty: DependencyProperty;
        static YProperty: DependencyProperty;
        X: number;
        Y: number;
    }
    export class TransformCollection extends DependencyObjectCollection {
        GetValueAt(index: number): Transform;
        SetValueAt(index: number, value: Transform);
        Add(value: Transform);
        AddRange(newItems: Transform[]);
        AddRange(newItems: ICollection);
        Insert(index: number, value: Transform);
        Remove(value: Transform);
        IndexOf(value: Transform): number;
        Contains(value: Transform): bool;
        ToArray(): Transform[];
    }
    export class TransformGroup extends Transform {
        static ChildrenProperty: DependencyProperty;
        Children: TransformCollection;
    }
    export class Projection extends DependencyObject {
    }
    export class Matrix3DProjection extends Projection {
        static ProjectionMatrixProperty: DependencyProperty;
        ProjectionMatrix: Matrix3D;
    }
}

//////////////////////////////////////////////////////////
// IMAGING
//////////////////////////////////////////////////////////
module Fayde.Media.Imaging {
    export class ImageSource extends DependencyObject {
    }
    export class BitmapSource extends ImageSource {
        static PixelWidthProperty: DependencyProperty;
        static PixelHeightProperty: DependencyProperty;
        PixelWidth: number;
        PixelHeight: number;
    }
    export class BitmapImage extends BitmapSource {
        static UriSourceProperty: DependencyProperty;
        UriSource: Uri;
        ImageFailed: MulticastEvent;
        ImageOpened: MulticastEvent;
        DownloadProgress: MulticastEvent;
    }
    export class ImageBrush extends TileBrush {
        static ImageSourceProperty: DependencyProperty;
        ImageSource: ImageBrush;
    }
}

//////////////////////////////////////////////////////////
// EFFECTS
//////////////////////////////////////////////////////////
module Fayde.Media.Effects {
    export class Effect extends DependencyObject {
        static EffectMappingProperty: DependencyProperty;
        EffectMapping: GeneralTransform;
    }
    export class BlurEffect extends Effect {
        static RadiusProperty: DependencyProperty;
        Radius: number;
    }
    export class DropShadowEffect extends Effect {
        static BlurRadiusProperty: DependencyProperty;
        static ColorProperty: DependencyProperty;
        static DirectionProperty: DependencyProperty;
        static OpacityProperty: DependencyProperty;
        static ShadowDepthProperty: DependencyProperty;
        BlurRadius: number;
        Color: Color;
        Direction: number;
        Opacity: number;
        ShadowDepth: number;
    }
}

//////////////////////////////////////////////////////////
// VISUAL STATE MANAGER
//////////////////////////////////////////////////////////
module Fayde.Media.VisualStateManager {
    export class VisualTransition extends DependencyObject {
        From: string;
        To: string;
        Storyboard: Fayde.Media.Animation.Storyboard;
        GeneratedDuration: Duration;
        GeneratedEasingFunction: Fayde.Media.Animation.IEasingFunction;
    }
    export class VisualTransitionCollection extends DependencyObjectCollection {
        GetValueAt(index: number): VisualTransition;
        SetValueAt(index: number, value: VisualTransition);
        Add(value: VisualTransition);
        AddRange(newItems: VisualTransition[]);
        AddRange(newItems: ICollection);
        Insert(index: number, value: VisualTransition);
        Remove(value: VisualTransition);
        IndexOf(value: VisualTransition): number;
        Contains(value: VisualTransition): bool;
        ToArray(): VisualTransition[];
    }
    export class VisualStateGroup extends DependencyObject {
        States: VisualStateCollection;
        CurrentStateChanging: MulticastEvent;
        CurrentStateChanged: MulticastEvent;
    }
    export class VisualStateGroupCollection implements ICollection {
        GetCount(): number;
        GetValueAt(index: number): VisualStateGroup;
        SetValueAt(index: number, value: VisualStateGroup);
        Add(value: VisualStateGroup);
        AddRange(newItems: VisualStateGroup[]);
        AddRange(newItems: ICollection);
        Insert(index: number, value: VisualStateGroup);
        Remove(value: VisualStateGroup);
        RemoveAt(index: number);
        Clear();
        IndexOf(value: VisualStateGroup): number;
        Contains(value: VisualStateGroup): bool;
        ToArray(): VisualStateGroup[];
    }
    export class VisualState extends DependencyObject {
        static StoryboardProperty: DependencyProperty;
        Storyboard: Fayde.Media.Animation.Storyboard;
    }
    export class VisualStateCollection extends DependencyObjectCollection {
        GetValueAt(index: number): VisualState;
        SetValueAt(index: number, value: VisualState);
        Add(value: VisualState);
        AddRange(newItems: VisualState[]);
        AddRange(newItems: ICollection);
        Insert(index: number, value: VisualState);
        Remove(value: VisualState);
        IndexOf(value: VisualState): number;
        Contains(value: VisualState): bool;
        ToArray(): VisualState[];
    }
    export class VisualStateManager extends DependencyObject {
        static VisualStateGroupsProperty: DependencyProperty;
        static GetVisualStateGroups(d: DependencyObject): VisualStateGroupCollection;

        static CustomVisualStateManagerProperty: DependencyProperty;
        static GetCustomVisualStateManager(d: DependencyObject): VisualStateManager;
        static SetCustomVisualStateManager(d: DependencyObject, value: VisualStateManager);

        static GoToStateCore(control: Fayde.Controls.Control, element: FrameworkElement, stateName: string, group: VisualStateGroup, state: VisualState, useTransitions: bool): bool;
        static GoToState(control: Fayde.Controls.Control, stateName: string, useTransitions: bool): bool;
    }
}

//////////////////////////////////////////////////////////
// ANIMATIONS
//////////////////////////////////////////////////////////
module Fayde.Media.Animation {
    export class RepeatBehavior {
        static FromRepeatDuration(duration: Duration): RepeatBehavior;
        static FromIterationCount(count: number): RepeatBehavior;
        static FromForever(): RepeatBehavior;
        HasCount: bool;
        Count: number;
        HasDuration: bool;
        Duration: Duration;
        IsForever: bool;
    }
    export class Timeline extends DependencyObject {
        static AutoReverseProperty: DependencyProperty;
        static BeginTimeProperty: DependencyProperty;
        static DurationProperty: DependencyProperty;
        static RepeatBehaviorProperty: DependencyProperty;
        static SpeedRatioProperty: DependencyProperty;
        static FillBehaviorProperty: DependencyProperty;
        AutoReverse: bool;
        BeginTime: TimeSpan;
        Duration: Duration;
        RepeatBehavior: RepeatBehavior;
        SpeedRatio: number;
        FillBehavior: FillBehavior;
        Completed: MulticastEvent;
    }
    export class TimelineCollection implements ICollection {
        GetCount(): number;
        GetValueAt(index: number): Timeline;
        SetValueAt(index: number, value: Timeline);
        Add(value: Timeline);
        AddRange(newItems: Timeline[]);
        AddRange(newItems: ICollection);
        Insert(index: number, value: Timeline);
        Remove(value: Timeline);
        RemoveAt(index: number);
        Clear();
        IndexOf(value: Timeline): number;
        Contains(value: Timeline): bool;
        ToArray(): Timeline[];
    }
    export class ColorAnimation extends Timeline {
        static ByProperty: DependencyProperty;
        static EasingFunctionProperty: DependencyProperty;
        static FromProperty: DependencyProperty;
        static ToProperty: DependencyProperty;
        By: Color;
        EasingFunction: IEasingFunction;
        From: Color;
        To: Color;
    }
    export class ColorAnimationUsingKeyFrames extends Timeline {
        static KeyFramesProperty: DependencyProperty;
        KeyFrames: ColorKeyFrameCollection;
    }
    export class DoubleAnimation extends Timeline {
        static ByProperty: DependencyProperty;
        static EasingFunctionProperty: DependencyProperty;
        static FromProperty: DependencyProperty;
        static ToProperty: DependencyProperty;
        By: number;
        EasingFunction: IEasingFunction;
        From: number;
        To: number;
    }
    export class DoubleAnimationUsingKeyFrames extends Timeline {
        static KeyFramesProperty: DependencyProperty;
        KeyFrames: DoubleKeyFrameCollection;
    }
    export class ObjectAnimationUsingKeyFrames extends Timeline {
        static KeyFramesProperty: DependencyProperty;
        KeyFrames: ObjectKeyFrameCollection;
    }
    export class PointAnimation extends Timeline {
        static ByProperty: DependencyProperty;
        static EasingFunctionProperty: DependencyProperty;
        static FromProperty: DependencyProperty;
        static ToProperty: DependencyProperty;
        By: Point;
        EasingFunction: IEasingFunction;
        From: Point;
        To: Point;
    }
    export class PointAnimationUsingKeyFrames extends Timeline {
        static KeyFramesProperty: DependencyProperty;
        KeyFrames: PointKeyFrameCollection;
    }
    export class Storyboard extends Timeline {
        static ChildrenProperty: DependencyProperty;

        static TargetNameProperty: DependencyProperty;
        static GetTargetName(t: Timeline): string;
        static SetTargetName(t: Timeline, value: string);

        static TargetPropertyProperty: DependencyProperty;
        static GetTargetProperty(t: Timeline): Fayde.Data.PropertyPath;
        static SetTargetProperty(t: Timeline, value: Fayde.Data.PropertyPath);

        Children: TimelineCollection;

        Begin();
        Pause();
        Resume();
        Stop();
        //GetCurrentState(): ClockState;
        //GetCurrentTime(): TimeSpan;
        //Seek(offset: TimeSpan);
        //SeekAlignedToLastTick(offset: TimeSpan);
        //SkipToFill();
    }
    export class BeginStoryboard {
        static StoryboardProperty: DependencyProperty;
        Storyboard: Storyboard;
    }
    export class KeySpline extends DependencyObject {
        ControlPoint1: Point;
        ControlPoint2: Point;
    }
    export class KeyFrame extends DependencyObject {
        KeyTime: KeyTime;
        Value: any;
    }
    export class ColorKeyFrame extends KeyFrame {
        static KeyTimeProperty: DependencyProperty;
        static ValueProperty: DependencyProperty;
        KeyTime: KeyTime;
        Value: Color;
    }
    export class DoubleKeyFrame extends KeyFrame {
        static KeyTimeProperty: DependencyProperty;
        static ValueProperty: DependencyProperty;
        KeyTime: KeyTime;
        Value: number;
    }
    export class ObjectKeyFrame extends KeyFrame {
        static KeyTimeProperty: DependencyProperty;
        static ValueProperty: DependencyProperty;
        KeyTime: KeyTime;
        Value: any;
    }
    export class PointKeyFrame extends KeyFrame {
        static KeyTimeProperty: DependencyProperty;
        static ValueProperty: DependencyProperty;
        KeyTime: KeyTime;
        Value: Point;
    }
    export class KeyFrameCollection extends DependencyObjectCollection {
        GetValueAt(index: number): KeyFrame;
        SetValueAt(index: number, value: KeyFrame);
        Add(value: KeyFrame);
        AddRange(newItems: KeyFrame[]);
        AddRange(newItems: ICollection);
        Insert(index: number, value: KeyFrame);
        Remove(value: KeyFrame);
        IndexOf(value: KeyFrame): number;
        Contains(value: KeyFrame): bool;
        ToArray(): KeyFrame[];
    }
    export class ColorKeyFrameCollection extends KeyFrameCollection {
        GetValueAt(index: number): ColorKeyFrame;
        SetValueAt(index: number, value: ColorKeyFrame);
        Add(value: ColorKeyFrame);
        AddRange(newItems: ColorKeyFrame[]);
        AddRange(newItems: ICollection);
        Insert(index: number, value: ColorKeyFrame);
        Remove(value: ColorKeyFrame);
        IndexOf(value: ColorKeyFrame): number;
        Contains(value: ColorKeyFrame): bool;
        ToArray(): ColorKeyFrame[];
    }
    export class DoubleKeyFrameCollection extends KeyFrameCollection {
        GetValueAt(index: number): DoubleKeyFrame;
        SetValueAt(index: number, value: DoubleKeyFrame);
        Add(value: DoubleKeyFrame);
        AddRange(newItems: DoubleKeyFrame[]);
        AddRange(newItems: ICollection);
        Insert(index: number, value: DoubleKeyFrame);
        Remove(value: DoubleKeyFrame);
        IndexOf(value: DoubleKeyFrame): number;
        Contains(value: DoubleKeyFrame): bool;
        ToArray(): DoubleKeyFrame[];
    }
    export class ObjectKeyFrameCollection extends KeyFrameCollection {
        GetValueAt(index: number): ObjectKeyFrame;
        SetValueAt(index: number, value: ObjectKeyFrame);
        Add(value: ObjectKeyFrame);
        AddRange(newItems: ObjectKeyFrame[]);
        AddRange(newItems: ICollection);
        Insert(index: number, value: ObjectKeyFrame);
        Remove(value: ObjectKeyFrame);
        IndexOf(value: ObjectKeyFrame): number;
        Contains(value: ObjectKeyFrame): bool;
        ToArray(): ObjectKeyFrame[];
    }
    export class PointKeyFrameCollection extends KeyFrameCollection {
        GetValueAt(index: number): PointKeyFrame;
        SetValueAt(index: number, value: PointKeyFrame);
        Add(value: PointKeyFrame);
        AddRange(newItems: PointKeyFrame[]);
        AddRange(newItems: ICollection);
        Insert(index: number, value: PointKeyFrame);
        Remove(value: PointKeyFrame);
        IndexOf(value: PointKeyFrame): number;
        Contains(value: PointKeyFrame): bool;
        ToArray(): PointKeyFrame[];
    }
    export class DiscreteColorKeyFrame extends ColorKeyFrame {
    }
    export class DiscreteDoubleKeyFrame extends DoubleKeyFrame {
    }
    export class DiscreteObjectKeyFrame extends ObjectKeyFrame {
    }
    export class DiscretePointKeyFrame extends PointKeyFrame {
    }
    export class EasingColorKeyFrame extends ColorKeyFrame {
        static EasingFunctionProperty: DependencyProperty;
        EasingFunction: IEasingFunction;
    }
    export class EasingDoubleKeyFrame extends DoubleKeyFrame {
        static EasingFunctionProperty: DependencyProperty;
        EasingFunction: IEasingFunction;
    }
    export class EasingPointKeyFrame extends PointKeyFrame {
        static EasingFunctionProperty: DependencyProperty;
        EasingFunction: IEasingFunction;
    }
    export class LinearColorKeyFrame extends ColorKeyFrame {
    }
    export class LinearDoubleKeyFrame extends DoubleKeyFrame {
    }
    export class LinearPointKeyFrame extends PointKeyFrame {
    }
    export class SplineColorKeyFrame extends ColorKeyFrame {
        static KeySplineProperty: DependencyProperty;
        KeySpline: KeySpline;
    }
    export class SplineDoubleKeyFrame extends DoubleKeyFrame {
        static KeySplineProperty: DependencyProperty;
        KeySpline: KeySpline;
    }
    export class SplinePointKeyFrame extends PointKeyFrame {
        static KeySplineProperty: DependencyProperty;
        KeySpline: KeySpline;
    }
    export interface IEasingFunction {
    }
    export class EasingFunctionBase extends DependencyObject implements IEasingFunction {
        static EasingModeProperty: DependencyProperty;
        EasingMode: EasingMode;
        Ease(normalizedTime: number): number;
        EaseInCore(normalizedTime: number): number;
    }
    export class BackEase extends EasingFunctionBase {
        static AmplitudeProperty: DependencyProperty;
        Amplitude: number;
    }
    export class BounceEase extends EasingFunctionBase {
        static BouncesProperty: DependencyProperty;
        static BouncinessProperty: DependencyProperty;
        Bounces: number;
        Bounciness: number;
    }
    export class CircleEase extends EasingFunctionBase {
    }
    export class CubicEase extends EasingFunctionBase {
    }
    export class ElasticEase extends EasingFunctionBase {
        static OscillationsProperty: DependencyProperty;
        static SpringinessProperty: DependencyProperty;
        Oscillations: number;
        Springiness: number;
    }
    export class ExponentialEase extends EasingFunctionBase {
        static ExponentProperty: DependencyProperty;
        Exponent: number;
    }
    export class PowerEase extends EasingFunctionBase {
        static PowerProperty: DependencyProperty;
        Power: number;
    }
    export class QuadraticEase extends EasingFunctionBase {
    }
    export class QuarticEase extends EasingFunctionBase {
    }
    export class QuinticEase extends EasingFunctionBase {
    }
    export class SineEase extends EasingFunctionBase {
    }
    export enum FillBehavior {
        HoldEnd = 0,
        Stop = 1,
    }
    export enum EasingMode {
        EaseOut = 0,
        EaseIn = 1,
        EaseInOut = 2,
    }
}

//////////////////////////////////////////////////////////
// SHAPES
//////////////////////////////////////////////////////////
module Fayde.Shapes {
    export enum FillRule {
        EvenOdd = 0,
        NonZero = 1,
    }
    export enum SweepDirection {
        Counterclockwise = 0,
        Clockwise = 1,
    }
    export enum PenLineCap {
        Flat = 0,
        Square = 1,
        Round = 2,
        Triangle = 3,
    }
    export enum PenLineJoin {
        Miter = 0,
        Bevel = 1,
        Round = 2,
    }
    export class DoubleCollection implements ICollection {
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
    export class PointCollection implements ICollection {
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
    export class Shape extends FrameworkElement {
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

        Fill: Fayde.Media.Brush;
        Stretch: Fayde.Media.Stretch;
        StrokeDashArray: DoubleCollection;
        StrokeDashCap: PenLineCap;
        StrokeDashOffset: number;
        StrokeEndLineCap: PenLineCap;
        StrokeLineJoin: PenLineJoin;
        StrokeMiterLimit: number;
        Stroke: Fayde.Media.Brush;
        StrokeStartLineCap: PenLineCap;
        StrokeThickness: number;
    }
    export class Ellipse extends Shape {
    }
    export class Line extends Shape {
        static X1Property: DependencyProperty;
        static Y1Property: DependencyProperty;
        static X2Property: DependencyProperty;
        static Y2Property: DependencyProperty;
        X1: number;
        Y1: number;
        X2: number;
        Y2: number;
    }
    export class Path extends Shape {
        static DataProperty: DependencyProperty;
        Data: Fayde.Media.Geometry;
    }
    export class Polygon extends Shape {
        static FillRuleProperty: DependencyProperty;
        static PointsProperty: DependencyProperty;
        FillRule: FillRule;
        Points: PointCollection;
    }
    export class Polyline extends Shape {
        static FillRuleProperty: DependencyProperty;
        static PointsProperty: DependencyProperty;
        FillRule: FillRule;
        Points: PointCollection;
    }
    export class Rectangle extends Shape {
        static RadiusXProperty: DependencyProperty;
        static RadiusYProperty: DependencyProperty;
        RadiusX: number;
        RadiusY: number;
    }
}

//////////////////////////////////////////////////////////
// COLLECTIONS
//////////////////////////////////////////////////////////
module Fayde.Collections {
    export enum NotifyCollectionChangedAction {
        Add = 1,
        Remove = 2,
        Replace = 3,
        Reset = 4,
    }
    export class NotifyCollectionChangedEventHandler extends MulticastEvent {
        Subscribe(callback: (sender, args: NotifyCollectionChangedEventArgs) => void , closure);
        SubscribeSpecific(callback: (sender, args: NotifyCollectionChangedEventArgs) => void , closure, matchClosure);
        Unsubscribe(callback: (sender, args: NotifyCollectionChangedEventArgs) => void , closure, matchClosure? );
        Raise(sender, args: NotifyCollectionChangedEventArgs);
        RaiseAsync(sender, args: NotifyCollectionChangedEventArgs);
    }
    export class NotifyCollectionChangedEventArgs extends EventArgs {
        constructor (action: NotifyCollectionChangedAction);
        constructor (action: NotifyCollectionChangedAction, items: any[], index: number);
        constructor (action: NotifyCollectionChangedAction, newItems: any[], oldItems: any[], index: number);
        Action: NotifyCollectionChangedAction;
        NewItems: any[];
        OldItems: any[];
        OldStartingIndex: number;
        NewStartingIndex: number;
    }
    export interface INotifyCollectionChanged {
        CollectionChanged: Collections.NotifyCollectionChangedEventHandler;
    }
    export class ObservableCollection implements INotifyCollectionChanged, ICollection {
        CollectionChanged: NotifyCollectionChangedEventHandler;

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
    }
}

//////////////////////////////////////////////////////////
// DATA
//////////////////////////////////////////////////////////
module Fayde.Data {
    export class BindingOperations {
        static SetBinding(target: DependencyObject, dp: DependencyProperty, binding: BindingBase): BindingExpressionBase;
    }
    export interface INotifyPropertyChanged {
        PropertyChanged: MulticastEvent;
    }
    export class PropertyChangedEventArgs extends EventArgs {
        constructor (propertyName: string);
        PropertyName: string;
    }
    export enum BindingMode {
        TwoWay = 0,
        OneWay = 1,
        OneTime = 2,
        OneWayToSource = 3,
    }
    export enum RelativeSourceMode {
        TemplatedParent = 1,
        Self = 2,
        FindAncestor = 3,
    }
    export enum UpdateSourceTrigger {
        Default = 0,
        PropertyChanged = 1,
        Explicit = 3,
    }
    export interface IValueConverter {
        Convert(value, targetType, parameter, culture): any;
        ConvertBack(value, targetType, parameter, culture): any;
    }
    export class RelativeSource implements IMarkupExtension {
        AncestorLevel: number;
        AncestorType;
        Mode: RelativeSourceMode;
    }
    export interface IMarkupExtension {
    }
    export class BindingBase implements IMarkupExtension {
        CheckSealed();
        FallbackValue;
        StringFormat: string;
        TargetNullValue;
    }
    export class Binding extends BindingBase {
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
    export class BindingExpressionBase extends Expression {

    }
    export class BindingExpression extends BindingExpressionBase {
        DataItem;
        ParentBinding: Binding;
        UpdateSource();
    }
    export class PropertyPath {
    }
}

//////////////////////////////////////////////////////////
// MVVM
//////////////////////////////////////////////////////////
module Fayde.MVVM {
    export class RelayCommand implements Input.ICommand { 
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