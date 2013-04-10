class Exception {
    public Message: string;
    constructor(message: string);
}
class ArgumentException extends Exception {
    constructor(message: string);
}
class InvalidOperationException extends Exception {
    constructor(message: string);
}
class XamlParseException extends Exception {
    constructor(message: string);
}
class NotSupportedException extends Exception {
    constructor(message: string);
}
module Fayde {
    class NameScope {
        public IsRoot: bool;
        private XNodes;
        public FindName(name: string): XamlNode;
        public RegisterName(name: string, xnode: XamlNode): void;
        public UnregisterName(name: string): void;
        public Absorb(otherNs: NameScope): void;
    }
}
class BError {
    static Argument: number;
    static InvalidOperation: number;
    public Message: string;
    public Number: number;
    public ThrowException(): void;
}
module Fayde {
    interface IEnumerable {
        GetEnumerator(reverse?: bool): IEnumerator;
    }
    interface IEnumerator {
        Current: any;
        MoveNext(): bool;
    }
    class ArrayEx {
        static GetEnumerator(arr: any[], isReverse?: bool): {
            MoveNext: any;
            Current: any;
        };
    }
}
module Fayde {
    enum VisualTreeDirection {
        Logical,
        LogicalReverse,
        ZFoward,
        ZReverse,
    }
    class XamlNode {
        public XObject: XamlObject;
        public ParentNode: XamlNode;
        public Name: string;
        public NameScope: NameScope;
        constructor(xobj: XamlObject);
        public FindNameScope(): NameScope;
        public IsAttached: bool;
        public SetIsAttached(value: bool): void;
        public OnIsAttachedChanged(newIsAttached: bool): void;
        public AttachTo(parentNode: XamlNode, error: BError): bool;
        public Detach(): void;
        public GetInheritedEnumerator(): IEnumerator;
        public GetVisualTreeEnumerator(direction?: VisualTreeDirection): IEnumerator;
    }
}
module Fayde {
    class XamlObject {
        public XamlNode: XamlNode;
        constructor();
        public CreateNode(): XamlNode;
        public Name : string;
    }
}
interface IAutoCreator {
    GetValue(propd: DependencyProperty, dobj: Fayde.DependencyObject): any;
}
interface IDependencyPropertyChangedEventArgs {
    Property: DependencyProperty;
    OldValue: any;
    NewValue: any;
}
interface IOutIsValid {
    IsValid: bool;
}
class DependencyProperty {
    static _IDs;
    static _Inherited;
    static _LastID;
    public _ID: number;
    public Name: string;
    public GetTargetType: () => Function;
    public OwnerType: Function;
    public DefaultValue: any;
    public IsReadOnly: bool;
    public IsCustom: bool;
    public _HasDefaultValue: bool;
    public _ChangedCallback: (dobj: Fayde.DependencyObject, args: IDependencyPropertyChangedEventArgs) => void;
    public _AutoCreator: IAutoCreator;
    public _IsAutoCreated: bool;
    private _Coercer;
    public _AlwaysChange: bool;
    private _Validator;
    public _IsAttached: bool;
    public _BitmaskCache: number;
    public _Inheritable: number;
    static Register(name: string, getTargetType: () => Function, ownerType: Function, defaultValue?: any, changedCallback?: (dobj: Fayde.DependencyObject, args: IDependencyPropertyChangedEventArgs) => void): DependencyProperty;
    static RegisterReadOnly(name: string, getTargetType: () => Function, ownerType: Function, defaultValue?: any, changedCallback?: (dobj: Fayde.DependencyObject, args: IDependencyPropertyChangedEventArgs) => void): DependencyProperty;
    static RegisterAttached(name: string, getTargetType: () => Function, ownerType: Function, defaultValue?: any, changedCallback?: (dobj: Fayde.DependencyObject, args: IDependencyPropertyChangedEventArgs) => void): DependencyProperty;
    static RegisterCore(name: string, getTargetType: () => Function, ownerType: Function, defaultValue?: any, changedCallback?: (dobj: Fayde.DependencyObject, args: IDependencyPropertyChangedEventArgs) => void): DependencyProperty;
    static RegisterReadOnlyCore(name: string, getTargetType: () => Function, ownerType: Function, defaultValue?: any, changedCallback?: (dobj: Fayde.DependencyObject, args: IDependencyPropertyChangedEventArgs) => void): DependencyProperty;
    static RegisterAttachedCore(name: string, getTargetType: () => Function, ownerType: Function, defaultValue?: any, changedCallback?: (dobj: Fayde.DependencyObject, args: IDependencyPropertyChangedEventArgs) => void): DependencyProperty;
    static RegisterInheritable(name: string, getTargetType: () => Function, ownerType: Function, defaultValue?: any, changedCallback?: (dobj: Fayde.DependencyObject, args: IDependencyPropertyChangedEventArgs) => void, autocreator?: IAutoCreator, inheritable?): DependencyProperty;
    static RegisterFull(name: string, getTargetType: () => Function, ownerType: Function, defaultValue?: any, changedCallback?: (dobj: Fayde.DependencyObject, args: IDependencyPropertyChangedEventArgs) => void, autocreator?: IAutoCreator, coercer?: (dobj: Fayde.DependencyObject, propd: DependencyProperty, value: any) => any, alwaysChange?: bool, validator?: (dobj: Fayde.DependencyObject, propd: DependencyProperty, value: any) => bool, isCustom?: bool, isReadOnly?: bool, isAttached?: bool, inheritable?): DependencyProperty;
    public ValidateSetValue(dobj: Fayde.DependencyObject, value: any, isValidOut: IOutIsValid);
}
class Nullstone {
    static Equals(val1: any, val2: any): bool;
}
class Enum {
    public Object: any;
    constructor(Object: any);
}
class CornerRadius {
    static _TypeName: string;
    public TopLeft: number;
    public TopRight: number;
    public BottomRight: number;
    public BottomLeft: number;
    constructor(topLeft?: number, topRight?: number, bottomRight?: number, bottomLeft?: number);
    public IsZero(): bool;
    public Equals(other: CornerRadius): bool;
    public toString(): string;
}
class Color {
    static __NoAlphaRegex;
    static __AlphaRegex;
    public R: number;
    public G: number;
    public B: number;
    public A: number;
    public Add(color2: Color): Color;
    public Subtract(color2: Color): Color;
    public Multiply(factor: number): Color;
    public Equals(other: Color): bool;
    public toString(): string;
    public ToHexStringNoAlpha(): string;
    static LERP(start: Color, end: Color, p: number): Color;
    static FromRgba(r: number, g: number, b: number, a: number): Color;
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
class Thickness {
    static _TypeName: string;
    public Left: number;
    public Top: number;
    public Right: number;
    public Bottom: number;
    constructor(left?: number, top?: number, right?: number, bottom?: number);
    public Plus(thickness2: Thickness): Thickness;
    public IsEmpty(): bool;
    public IsBalanced(): bool;
    public toString(): string;
    static Equals(thickness1: Thickness, thickness2: Thickness): bool;
}
module Fayde.Media {
    class Geometry {
    }
}
module Fayde.Media {
    function ParseGeometry(val: string): Geometry;
}
module Fayde.Shapes {
    class PointCollection {
    }
}
module Fayde.Shapes {
    function ParsePointCollection(val: string): PointCollection;
}
module Fayde.Media {
    class Brush {
    }
}
module Fayde.Media {
    class SolidColorBrush extends Brush {
        public Color: Color;
    }
}
module Fayde {
    class TypeConverter {
        static ConvertObject(propd: DependencyProperty, val: any, objectType: Function, doStringConversion: bool);
        static GeometryFromString(val: string): Media.Geometry;
        static PointCollectionFromString(val: string): Shapes.PointCollection;
    }
}
module Fayde {
    class SetterCollection extends XamlObjectCollection {
        private _IsSealed;
        public _Seal(targetType: Function): void;
        public AddedToCollection(value: XamlObject, error: BError): bool;
        private _ValidateSetter(setter, error);
    }
    class Setter extends XamlObject {
        private _IsSealed;
        public Property: DependencyProperty;
        public Value: any;
        public ConvertedValue: any;
        public _Seal(targetType: Function): void;
    }
}
module Fayde {
    class Style extends XamlObject {
        private _IsSealed;
        public Setters: SetterCollection;
        public BasedOn: Style;
        public TargetType: Function;
        public Seal(): void;
    }
}
module Fayde {
    interface IWalker {
        Step(): any;
    }
    interface IStyleWalker extends IWalker {
        Step(): Setter;
    }
    interface IDeepTreeWalker extends IWalker {
        Step(): UINode;
        SkipBranch();
    }
    function SingleStyleWalker(style: Style): IStyleWalker;
    function MultipleStylesWalker(styles: Style[]): IStyleWalker;
    function DeepTreeWalker(top: UIElement, direction?: VisualTreeDirection): IDeepTreeWalker;
}
module Fayde {
    class UINode extends XamlNode {
        public XObject: UIElement;
        constructor(xobj: UIElement);
        public VisualParentNode: UINode;
        public GetInheritedEnumerator(): IEnumerator;
        public OnIsAttachedChanged(newIsAttached: bool): void;
        public _ElementAdded(uie: UIElement): void;
        public _ElementRemoved(uie: UIElement): void;
    }
    class UIElement extends DependencyObject {
        public XamlNode: UINode;
        public CreateNode(): XamlNode;
    }
}
var RectOverlap: {
    Out: number;
    In: number;
    Part: number;
};
class rect {
    public X: number;
    public Y: number;
    public Width: number;
    public Height: number;
    public toString(): string;
    static _TypeName: string;
    static fromSize(size: size): rect;
    static clear(dest: rect): void;
    static set(dest: rect, x: number, y: number, width: number, height: number): void;
    static isEmpty(rect1: rect): bool;
    static isEmptyLogical(rect1: rect): bool;
    static copyTo(src: rect, dest: rect): void;
    static clone(src: rect): rect;
    static isEqual(rect1: rect, rect2: rect): bool;
    static intersection(rect1: rect, rect2: rect): void;
    static union(rect1: rect, rect2: rect): void;
    static unionLogical(rect1: rect, rect2: rect): void;
    static growBy(dest: rect, left: number, top: number, right: number, bottom: number): void;
    static growByThickness(dest: rect, thickness): void;
    static shrinkBy(dest: rect, left: number, top: number, right: number, bottom: number): void;
    static shrinkByThickness(dest: rect, thickness): void;
    static extendTo(rect1: rect, x: number, y: number): void;
    static transform(dest: rect, xform): void;
    static clipmask(clip);
    static transform4(dest: rect, projection): void;
    static round(dest: rect): rect;
    static roundOut(dest: rect): rect;
    static roundIn(dest: rect): rect;
    static copyGrowTransform(dest: rect, src: rect, thickness, xform): void;
    static copyGrowTransform4(dest: rect, src: rect, thickness, projection): void;
    static containsPoint(rect1: rect, p): bool;
    static containsPointXY(rect1: rect, x: number, y: number): bool;
    static rectIn(rect1: rect, rect2: rect): number;
    static isRectContainedIn(src: rect, test: rect): bool;
}
class size {
    public Width: number;
    public Height: number;
    public toString(): string;
    static _TypeName: string;
    static fromRaw(width: number, height: number): size;
    static fromRect(src: rect): size;
    static createInfinite(): size;
    static createNegativeInfinite(): size;
    static copyTo(src: size, dest: size): void;
    static clone(src: size): size;
    static clear(dest: size): void;
    static isEqual(size1: size, size2: size): bool;
    static growBy(dest: size, width: number, height: number): size;
    static growByThickness(dest: size, thickness): size;
    static shrinkBy(dest: size, width: number, height: number): size;
    static shrinkByThickness(dest: size, thickness): size;
    static min(dest: size, other: size): size;
    static max(dest: size, other: size): size;
}
module Fayde {
    class XamlObjectCollection extends XamlObject implements IEnumerable {
        private _ht;
        private _listeners;
        public Count : number;
        public GetValueAt(index: number): XamlObject;
        public SetValueAt(index: number, value: XamlObject): bool;
        public Add(value: XamlObject): number;
        public Insert(index: number, value: XamlObject): bool;
        public Remove(value: XamlObject): bool;
        public RemoveAt(index: number): bool;
        public Clear(): bool;
        public IndexOf(value: XamlObject): number;
        public Contains(value: XamlObject): bool;
        public CanAdd(value: XamlObject): bool;
        public AddedToCollection(value: XamlObject, error: BError): bool;
        public RemovedFromCollection(value: XamlObject, isValueSafe: bool): void;
        public GetEnumerator(reverse?: bool): IEnumerator;
        public _RaiseItemAdded(value: XamlObject, index: number): void;
        public _RaiseItemRemoved(value: XamlObject, index: number): void;
        public _RaiseItemReplaced(removed: XamlObject, added: XamlObject, index: number): void;
        public _RaiseCleared(): void;
    }
}
module Fayde {
    class ResourceDictionaryCollection extends XamlObjectCollection {
        public AddedToCollection(value: ResourceDictionary, error: BError): bool;
        private _AssertNoCycles(subtreeRoot, firstAncestorNode, error);
    }
    class ResourceDictionary extends XamlObjectCollection {
        private _KeyIndex;
        public MergedDictionaries: ResourceDictionaryCollection;
        public Source: string;
        constructor();
        public ContainsKey(key: any): bool;
        public Get(key: any): XamlObject;
        public Set(key: any, value: XamlObject): bool;
        public Add(value: XamlObject): number;
        public Remove(value: XamlObject): bool;
        private _GetFromMerged(key);
    }
}
module Fayde {
    class FENode extends UINode {
        public XObject: FrameworkElement;
        constructor(xobj: FrameworkElement);
        public SubtreeNode: XamlNode;
        public SetSubtreeNode(subtreeNode: XamlNode): void;
        public IsLoaded: bool;
        public SetIsLoaded(value: bool): void;
        public OnIsLoadedChanged(newIsLoaded: bool): void;
        public OnIsAttachedChanged(newIsAttached: bool): void;
        public GetVisualTreeEnumerator(direction?: VisualTreeDirection): IEnumerator;
    }
    class FrameworkElement extends UIElement {
        public Resources: ResourceDictionary;
        constructor();
        public CreateNode(): XamlNode;
        static DataContextProperty: DependencyProperty;
        static ActualWidthProperty: DependencyProperty;
        static ActualHeightProperty: DependencyProperty;
        public _ComputeActualSize(): size;
    }
}
module Fayde.Controls {
    class Image extends FrameworkElement {
    }
}
module Fayde.Controls {
    class MediaElement extends FrameworkElement {
    }
}
module Fayde.Provider.Inherited {
    class _InheritedContext {
        public ForegroundSource: DependencyObject;
        public FontFamilySource: DependencyObject;
        public FontStretchSource: DependencyObject;
        public FontStyleSource: DependencyObject;
        public FontWeightSource: DependencyObject;
        public FontSizeSource: DependencyObject;
        public LanguageSource: DependencyObject;
        public FlowDirectionSource: DependencyObject;
        public UseLayoutRoundingSource: DependencyObject;
        public TextDecorationsSource: DependencyObject;
        static FromSources(foregroundSource: DependencyObject, fontFamilySource: DependencyObject, fontStretchSource: DependencyObject, fontStyleSource: DependencyObject, fontWeightSource: DependencyObject, fontSizeSource: DependencyObject, languageSource: DependencyObject, flowDirectionSource: DependencyObject, useLayoutRoundingSource: DependencyObject, textDecorationsSource: DependencyObject): _InheritedContext;
        static FromObject(dobj: DependencyObject, parentContext: _InheritedContext): _InheritedContext;
        public Compare(withContext: _InheritedContext, props): _Inheritable;
        public GetLocalSource(dobj: DependencyObject, prop): DependencyObject;
    }
    enum _Inheritable {
        Foreground,
        FontFamily,
        FontStretch,
        FontStyle,
        FontWeight,
        FontSize,
        Language,
        FlowDirection,
        UseLayoutRounding,
        TextDecorations,
        All,
        None,
    }
    class InheritedProvider extends PropertyProvider {
        private _ht;
        public GetPropertyValue(store: ProviderStore, propd: DependencyProperty): any;
        public WalkSubtree(rootParent: DependencyObject, element: DependencyObject, context: _InheritedContext, props, adding): void;
        public WalkTree(rootParent: DependencyObject, element: DependencyObject, context: _InheritedContext, props: _Inheritable, adding: bool): void;
        public MaybePropagateInheritedValue(source: DependencyObject, prop, props, element: DependencyObject): void;
        public MaybeRemoveInheritedValue(source: DependencyObject, prop, props, element: DependencyObject): void;
        public PropagateInheritedPropertiesOnAddingToTree(store: ProviderStore, subtree: DependencyObject): void;
        public PropagateInheritedProperty(store: ProviderStore, propd: DependencyProperty, source: DependencyObject, subtree: DependencyObject): void;
        public ClearInheritedPropertiesOnRemovingFromTree(store: ProviderStore, subtree: DependencyObject): void;
        public _GetPropertySource(inheritable: _Inheritable): DependencyObject;
        public _SetPropertySource(inheritable: _Inheritable, source: DependencyObject): void;
    }
}
module Fayde.Controls {
    class Control extends FrameworkElement {
        static IsEnabledProperty: DependencyProperty;
    }
}
module Fayde.Provider {
    enum _PropertyPrecedence {
        IsEnabled,
        LocalValue,
        DynamicValue,
        LocalStyle,
        ImplicitStyle,
        Inherited,
        InheritedDataContext,
        DefaultValue,
        AutoCreate,
        Lowest,
        Highest,
        Count,
    }
    enum _StyleIndex {
        VisualTree,
        ApplicationResources,
        GenericXaml,
        Count,
    }
    enum _StyleMask {
        None,
        VisualTree,
        ApplicationResources,
        GenericXaml,
        All,
    }
    interface IPropertyChangedListener {
        OnPropertyChanged(sender: DependencyObject, args: IDependencyPropertyChangedEventArgs);
    }
    class PropertyProvider {
        public GetPropertyValue(store: ProviderStore, propd: DependencyProperty): any;
        public RecomputePropertyValueOnClear(propd: DependencyProperty, error: BError): void;
        public RecomputePropertyValueOnLower(propd: DependencyProperty, error: BError): void;
    }
    class DefaultValueProvider extends PropertyProvider {
        public GetPropertyValue(store: ProviderStore, propd: DependencyProperty): any;
    }
    class AutoCreateProvider extends PropertyProvider {
        private _ht;
        public GetPropertyValue(store: ProviderStore, propd: DependencyProperty): any;
        public ReadLocalValue(propd: DependencyProperty): any;
        public RecomputePropertyValueOnClear(propd: DependencyProperty): void;
        public ClearValue(propd: DependencyProperty): void;
    }
    class LocalValueProvider extends PropertyProvider {
        private _ht;
        public GetPropertyValue(store: ProviderStore, propd: DependencyProperty): any;
        public SetValue(propd: DependencyProperty, value: any): void;
        public ClearValue(propd: DependencyProperty): void;
    }
    class InheritedIsEnabledProvider extends PropertyProvider {
        private _Source;
        private _CurrentValue;
        private _Store;
        constructor(store: ProviderStore);
        public GetPropertyValue(store: ProviderStore, propd: DependencyProperty): any;
        public SetDataSource(source: DependencyObject): void;
        private _AttachListener(source);
        private _DetachListener(source);
        private _IsEnabledChanged(sender, args);
        public LocalValueChanged(propd?: DependencyProperty): bool;
    }
    class InheritedDataContextProvider extends PropertyProvider {
        private _Source;
        private _Store;
        constructor(store: ProviderStore);
        public GetPropertyValue(store: ProviderStore, propd: DependencyProperty): any;
        public SetDataSource(source: FrameworkElement): void;
        private _AttachListener(source);
        private _DetachListener(source);
        private _SourceDataContextChanged(sender, args);
        private EmitChanged();
    }
    class LocalStyleProvider extends PropertyProvider {
        private _ht;
        private _Style;
        private _Store;
        constructor(store: ProviderStore);
        public GetPropertyValue(store: ProviderStore, propd: DependencyProperty): any;
        public RecomputePropertyValueOnClear(propd: DependencyProperty, error: BError): void;
        public UpdateStyle(style: Style, error: BError): void;
    }
    class ImplicitStyleProvider extends PropertyProvider {
        private _ht;
        private _Styles;
        private _StyleMask;
        private _Store;
        constructor(store: ProviderStore);
        public GetPropertyValue(store: ProviderStore, propd: DependencyProperty): any;
        public RecomputePropertyValueOnClear(propd: DependencyProperty, error: BError): void;
        public SetStyles(styleMask: _StyleMask, styles: Style[], error: BError): void;
        public ClearStyles(styleMask: _StyleMask, error: BError): void;
        private _ApplyStyles(styleMask, styles, error);
    }
    class FrameworkElementDynamicProvider extends PropertyProvider {
        private _ActualHeight;
        private _ActualWidth;
        public GetPropertyValue(store: ProviderStore, propd: DependencyProperty): any;
    }
    class ProviderStore {
        public _Object: DependencyObject;
        private _Providers;
        private _PropertyChangedListeners;
        public _ProviderBitmasks: number[];
        private _AnimStorage;
        private _InheritedIsEnabledProvider;
        private _LocalValueProvider;
        private _DynamicValueProvider;
        private _LocalStyleProvider;
        private _ImplicitStyleProvider;
        private _InheritedProvider;
        private _InheritedDataContextProvider;
        private _DefaultValueProvider;
        private _AutoCreateProvider;
        constructor(dobj: DependencyObject);
        static BuildBitmask(propd: DependencyProperty): number;
        public GetValue(propd: DependencyProperty);
        public GetValueSpec(propd: DependencyProperty, startingPrecedence?, endingPrecedence?): any;
        public SetValue(propd: DependencyProperty, value: any): void;
        public ClearValue(propd: DependencyProperty, notifyListeners?: bool): void;
        public ReadLocalValue(propd: DependencyProperty): any;
        public _ProviderValueChanged(providerPrecedence: number, propd: DependencyProperty, oldProviderValue: any, newProviderValue: any, notifyListeners: bool, setParent: bool, mergeNamesOnSetParent: bool, error: BError): void;
        private _GetAnimationStorageFor(propd);
        private _CloneAnimationStorage(sourceStore);
        private _AttachAnimationStorage(propd, storage);
        private _DetachAnimationStorage(propd, storage);
        private _CallRecomputePropertyValueForProviders(propd, providerPrecedence);
        public _SubscribePropertyChanged(listener: IPropertyChangedListener): void;
        public _UnsubscribePropertyChanged(listener: IPropertyChangedListener): void;
        private _RaisePropertyChanged(args);
        private _AttachValue(value, error);
        private _DetachValue(value);
    }
}
module Fayde {
    class Expression {
        public IsUpdating: bool;
        public IsAttached: bool;
        public GetValue(propd: DependencyProperty): any;
        public OnAttached(dobj: DependencyObject): void;
        public OnDetached(dobj: DependencyObject): void;
    }
}
module Fayde.Data {
    enum RelativeSourceMode {
        TemplatedParent,
        Self,
        FindAncestor,
    }
    enum BindingMode {
        TwoWay,
        OneWay,
        OneTime,
        OneWayToSource,
    }
    enum UpdateSourceTrigger {
        Default,
        PropertyChanged,
        Explicit,
    }
    enum _PropertyNodeType {
        AttachedProperty,
        Property,
        Indexed,
        None,
    }
}
module Fayde.Data {
    class BindingExpressionBase extends Expression {
        private _Binding;
        public Binding : any;
        public _TryUpdateSourceObject(value): void;
    }
}
module Fayde {
    class UnsetValue {
    }
    class DependencyObject extends XamlObject {
        private _Expressions;
        public _Store: Provider.ProviderStore;
        public _CachedValues: any[];
        constructor();
        public GetValue(propd: DependencyProperty): any;
        public SetValue(propd: DependencyProperty, value: any): void;
        public SetValueInternal(propd: DependencyProperty, value: any): void;
        public ClearValue(propd: DependencyProperty): void;
        public ReadLocalValue(propd: DependencyProperty): any;
        public _OnPropertyChanged(args: IDependencyPropertyChangedEventArgs): void;
        private _AddExpression(propd, expr);
        private _RemoveExpression(propd);
    }
}
module Fayde.Controls {
    class TextBlockNode extends UINode {
        public GetInheritedWalker(): IEnumerator;
    }
    class TextBlock extends FrameworkElement {
        static InlinesProperty;
        public CreateNode(): XamlNode;
    }
}
module Fayde.Controls.Primitives {
    class PopupNode extends UINode {
        public GetInheritedWalker(): IEnumerator;
    }
    class Popup extends FrameworkElement {
        public Child: UIElement;
        public CreateNode(): XamlNode;
    }
}
module Fayde {
    class DependencyObjectCollection extends XamlObjectCollection implements Provider.IPropertyChangedListener {
        private _HandleItemChanged;
        constructor(handleItemChanged: bool);
        public AddedToCollection(value: DependencyObject, error: BError): bool;
        public RemovedFromCollection(value: DependencyObject, isValueSafe: bool): void;
        public OnPropertyChanged(sender: DependencyObject, args: IDependencyPropertyChangedEventArgs): void;
        public _RaiseItemChanged(item, propd: DependencyProperty, oldValue: DependencyObject, newValue: DependencyObject): void;
    }
}
module Fayde.Controls {
    class PanelNode extends FENode {
        public XObject: Panel;
        constructor(xobj: Panel);
        public _ElementAdded(uie: UIElement): void;
        public _ElementRemoved(uie: UIElement): void;
        public _InvalidateChildrenZIndices(): void;
    }
    class Panel extends FrameworkElement {
        public XamlNode: PanelNode;
        static BackgroundProperty: DependencyProperty;
        static IsItemsHostProperty: DependencyProperty;
        static ZIndexProperty: DependencyProperty;
        static ZProperty: DependencyProperty;
        public Children: DependencyObjectCollection;
        static GetZIndex(uie: UIElement): number;
        static SetZIndex(uie: UIElement, value: number): void;
        static GetZ(uie: UIElement): number;
        static SetZ(uie: UIElement, value: number): void;
        public CreateNode(): XamlNode;
    }
}
class Clip {
    static _TypeName: string;
    public X: number;
    public Y: number;
    public Width: number;
    public Height: number;
    constructor(r: rect);
}
class Point {
    static _TypeName: string;
    public X: number;
    public Y: number;
    constructor(x?: number, y?: number);
    public toString(): string;
    public Equals(other: Point): bool;
    static Equals(p1: Point, p2: Point): bool;
    static LERP(start: Point, end: Point, p: number): Point;
}
class TimeSpan {
    static _TypeName: string;
    static _TicksPerMillisecond;
    static _TicksPerSecond;
    static _TicksPerMinute;
    static _TicksPerHour;
    static _TicksPerDay;
    private _Ticks;
    static FromTicks(ticks: number): TimeSpan;
    static FromArgs(days: number, hours: number, minutes: number, seconds: number, milliseconds?: number): TimeSpan;
    public Days : number;
    public Hours : number;
    public Minutes : number;
    public Seconds : number;
    public Milliseconds : number;
    public Ticks : number;
    public TotalDays : number;
    public TotalHours : number;
    public TotalMinutes : number;
    public TotalSeconds : number;
    public TotalMilliseconds : number;
    public AddTicks(ticks: number): void;
    public AddMilliseconds(milliseconds: number): void;
    public Add(ts2: TimeSpan): TimeSpan;
    public Subtract(ts2: TimeSpan): TimeSpan;
    public Multiply(v: number): TimeSpan;
    public Divide(ts2: TimeSpan): TimeSpan;
    public CompareTo(ts2: TimeSpan): number;
    public IsZero(): bool;
    public GetJsDelay(): number;
}
enum DurationType {
    Automatic,
    Forever,
    TimeSpan,
}
class Duration {
    static _TypeName: string;
    private _Type;
    private _TimeSpan;
    static CreateAutomatic(): Duration;
    static CreateForever(): Duration;
    static CreateTimeSpan(ts: TimeSpan): Duration;
    public Type : DurationType;
    public TimeSpan : TimeSpan;
    public HasTimeSpan : bool;
    public IsForever : bool;
    public IsAutomatic : bool;
}
class KeyTime {
    static _TypeName: string;
    private _IsPaced;
    private _IsUniform;
    private _TimeSpan;
    private _Percent;
    static CreateUniform(): KeyTime;
    static CreateTimeSpan(ts: TimeSpan): KeyTime;
    public IsPaced : bool;
    public IsUniform : bool;
    public HasTimeSpan : bool;
    public TimeSpan : TimeSpan;
    public HasPercent : bool;
    public Percent : number;
}
var FontStyle: {
    Normal: string;
    Italic: string;
    Oblique: string;
};
var FontStretch: {
    UltraCondensed: string;
    ExtraCondensed: string;
    Condensed: string;
    SemiCondensed: string;
    Normal: string;
    SemiExpanded: string;
    Expanded: string;
    ExtraExpanded: string;
    UltraExpanded: string;
};
var FontWeight: {
    Thin: number;
    ExtraLight: number;
    Light: number;
    Normal: number;
    Medium: number;
    SemiBold: number;
    Bold: number;
    ExtraBold: number;
    Black: number;
    ExtraBlack: number;
};
class Font {
    static _TypeName: string;
    static DEFAULT_FAMILY: string;
    static DEFAULT_STRETCH: string;
    static DEFAULT_STYLE: string;
    static DEFAULT_WEIGHT: number;
    static DEFAULT_SIZE: number;
    private _Family;
    private _Stretch;
    private _Style;
    private _Weight;
    private _Size;
    private _CachedTranslation;
    private _CachedHeight;
    public Family : string;
    public Stretch : string;
    public Style : string;
    public Weight : number;
    public Size : number;
    public IsChanged : bool;
    public GetActualHeight(): number;
    private _Descender();
    private _Ascender();
    private _PurgeCache();
    public ToHtml5Object(): string;
    private _BuildTranslation();
    static _MeasureHeight(font);
}
class FontFamily {
    public FamilyNames: string;
    static _TypeName: string;
    constructor(FamilyNames: string);
    public toString(): string;
}
class Uri {
    static _TypeName: string;
    private _OriginalString;
    constructor(originalString: string);
    public GetFragment(): string;
    public toString(): string;
    static IsNullOrEmpty(uri: Uri): bool;
}
module Fayde.Documents {
    class TextElementNode extends XamlNode {
        public XObject: TextElement;
        public InheritedWalkProperty: DependencyProperty;
        public GetInheritedEnumerator(): IEnumerator;
    }
    class TextElement extends DependencyObject {
        public CreateNode(): XamlNode;
    }
}
module Fayde.Documents {
    class Inline extends TextElement {
    }
}
module Fayde.Documents {
    class Span extends Inline {
        static InlinesProperty;
        public CreateNode(): XamlNode;
    }
}
module Fayde.Documents {
    class Block extends TextElement {
    }
}
module Fayde.Documents {
    class Paragraph extends Block {
        static InlinesProperty;
        public CreateNode(): XamlNode;
    }
}
module Fayde.Documents {
    class Section extends TextElement {
        static BlocksProperty;
        public CreateNode(): XamlNode;
    }
}
