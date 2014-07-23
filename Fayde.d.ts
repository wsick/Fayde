declare module Fayde {
    var Version: string;
}
interface IInterfaceDeclaration<T> extends IType {
    Name: string;
    Is(o: any): boolean;
    As(o: any): T;
}
interface IType {
}
declare module Fayde {
    var XMLNS: string;
    var XMLNSX: string;
    class Interface<T> implements IInterfaceDeclaration<T> {
        public Name: string;
        constructor(name: string);
        public Is(o: any): boolean;
        public As(o: any): T;
    }
    function RegisterType(type: Function, ns?: string, xmlns?: string): void;
    function RegisterTypeInterfaces(type: Function, ...interfaces: IInterfaceDeclaration<any>[]): void;
    function RegisterTypeName(type: Function, xmlns: string, localName?: string): void;
    function GetTypeName(type: Function): string;
    function GetTypeParent(type: Function): Function;
    function RegisterEnum(e: any, name: string, xmlns?: string): void;
    function RegisterInterface<T>(name: string): IInterfaceDeclaration<T>;
    interface ITypeResolution {
        IsPrimitive: boolean;
        IsSystem: boolean;
        IsSimple: boolean;
        IsEnum: boolean;
        Type: Function;
    }
    interface INamespacePrefixResolver {
        lookupNamespaceURI(prefix: string): string;
    }
    interface ITypeResolver {
        Resolve(xmlns: string, xmlname: string): ITypeResolution;
        ResolveFullyQualifiedName(xmlname: string, resolver: INamespacePrefixResolver): ITypeResolution;
    }
    var TypeResolver: ITypeResolver;
    function ConvertAnyToType(val: any, type: Function): any;
    function RegisterTypeConverter(type: Function, converter: (val: any) => any): void;
    function RegisterEnumConverter(e: any, converter: (val: any) => any): void;
}
declare class EventArgs {
    static Empty: EventArgs;
}
declare module Fayde.Collections {
    enum CollectionChangedAction {
        Add = 1,
        Remove = 2,
        Replace = 3,
        Reset = 4,
    }
    class CollectionChangedEventArgs extends EventArgs {
        public Action: CollectionChangedAction;
        public OldStartingIndex: number;
        public NewStartingIndex: number;
        public OldItems: any[];
        public NewItems: any[];
        static Reset(allValues: any[]): CollectionChangedEventArgs;
        static Replace(newValue: any, oldValue: any, index: number): CollectionChangedEventArgs;
        static Add(newValue: any, index: number): CollectionChangedEventArgs;
        static AddRange(newValues: any[], index: number): CollectionChangedEventArgs;
        static Remove(oldValue: any, index: number): CollectionChangedEventArgs;
    }
}
declare module Fayde {
    interface IEnumerable<T> {
        getEnumerator(): IEnumerator<T>;
    }
    var IEnumerable_: IInterfaceDeclaration<IEnumerable<any>>;
    interface IEnumerator<T> {
        current: T;
        moveNext(): boolean;
    }
    var IEnumerator_: IInterfaceDeclaration<IEnumerator<any>>;
    class ArrayEx {
        static EmptyEnumerator: IEnumerator<any>;
        static GetEnumerator<T>(arr: T[], isReverse?: boolean): IEnumerator<T>;
        static GetNodeEnumerator<T extends XamlObject, U extends XamlNode>(arr: T[], isReverse?: boolean): IEnumerator<U>;
    }
}
declare module Fayde.Collections {
    interface INotifyCollectionChanged {
        CollectionChanged: MulticastEvent<CollectionChangedEventArgs>;
    }
    var INotifyCollectionChanged_: IInterfaceDeclaration<INotifyCollectionChanged>;
}
declare module Fayde {
    class PropertyChangedEventArgs extends EventArgs {
        public PropertyName: string;
        constructor(propertyName: string);
    }
    interface INotifyPropertyChanged {
        PropertyChanged: MulticastEvent<PropertyChangedEventArgs>;
    }
    var INotifyPropertyChanged_: IInterfaceDeclaration<INotifyPropertyChanged>;
}
declare module Fayde.Collections {
    class ObservableCollection<T> implements IEnumerable<T>, INotifyCollectionChanged, INotifyPropertyChanged {
        private _ht;
        public getEnumerator(): IEnumerator<T>;
        public CollectionChanged: MulticastEvent<CollectionChangedEventArgs>;
        public PropertyChanged: MulticastEvent<PropertyChangedEventArgs>;
        public Count : number;
        public ToArray(): T[];
        public GetValueAt(index: number): T;
        public SetValueAt(index: number, value: T): void;
        public Add(value: T): void;
        public AddRange(values: T[]): void;
        public Insert(value: T, index: number): void;
        public IndexOf(value: T): number;
        public Contains(value: T): boolean;
        public Remove(value: T): void;
        public RemoveAt(index: number): void;
        public Clear(): void;
        private _RaisePropertyChanged(propertyName);
    }
}
declare module Fayde.Collections {
    class DeepObservableCollection<T> extends ObservableCollection<T> {
        public ItemPropertyChanged: MulticastEvent<ItemPropertyChangedEventArgs<T>>;
        constructor();
        private _OnCollectionChanged(sender, e);
        private _OnItemPropertyChanged(sender, e);
    }
}
declare module Fayde.Collections {
    class FilteredCollection<T> extends DeepObservableCollection<T> {
        private _Source;
        public Source : DeepObservableCollection<T>;
        private _Filter;
        public Filter : (item: any) => boolean;
        constructor(filter?: (item: any) => boolean, source?: DeepObservableCollection<T>);
        private _OnSourceCollectionChanged(sender, e);
        private _OnSourceItemPropertyChanged(sender, e);
        public Update(): void;
    }
}
declare module Fayde.Collections {
    class ItemPropertyChangedEventArgs<T> extends PropertyChangedEventArgs {
        public Item: T;
        constructor(item: T, propertyName: string);
    }
}
declare module Fayde {
    enum VisualTreeDirection {
        Logical = 0,
        LogicalReverse = 1,
        ZFoward = 2,
        ZReverse = 3,
    }
    interface IIsAttachedMonitor {
        Callback: (newIsAttached: boolean) => void;
        Detach(): any;
    }
    class XamlNode {
        public XObject: XamlObject;
        public ParentNode: XamlNode;
        public Name: string;
        public NameScope: NameScope;
        public DocNameScope: NameScope;
        private IsShareable;
        private _OwnerNameScope;
        private _LogicalChildren;
        private _IAMonitors;
        constructor(xobj: XamlObject);
        private _DataContext;
        public DataContext : any;
        public OnDataContextChanged(oldDataContext: any, newDataContext: any): void;
        private _IsEnabled;
        public IsEnabled : boolean;
        public OnIsEnabledChanged(oldValue: boolean, newValue: boolean): void;
        public FindName(name: string, doc?: boolean): XamlNode;
        public SetName(name: string): void;
        public FindNameScope(): NameScope;
        public IsAttached: boolean;
        public SetIsAttached(value: boolean): void;
        public OnIsAttachedChanged(newIsAttached: boolean): void;
        public MonitorIsAttached(func: (newIsAttached: boolean) => void): IIsAttachedMonitor;
        public AttachTo(parentNode: XamlNode, error: BError): boolean;
        public Detach(): void;
        public OnParentChanged(oldParentNode: XamlNode, newParentNode: XamlNode): void;
        public GetInheritedEnumerator(): IEnumerator<DONode>;
        public GetVisualTreeEnumerator(direction?: VisualTreeDirection): IEnumerator<FENode>;
        static SetShareable(xn: XamlNode): void;
    }
}
declare module Fayde {
    class XamlObject implements Providers.IIsPropertyInheritable {
        private static _LastID;
        private _ID;
        public XamlNode: XamlNode;
        public TemplateOwner: DependencyObject;
        constructor();
        public CreateNode(): XamlNode;
        public Name : string;
        public Parent : XamlObject;
        public FindName(name: string, doc?: boolean): XamlObject;
        public Clone(): XamlObject;
        public CloneCore(source: XamlObject): void;
        public IsInheritable(propd: DependencyProperty): boolean;
    }
}
interface IOutIsValid {
    IsValid: boolean;
}
declare class DependencyProperty {
    static UnsetValue: {};
    private static _IDs;
    private static _LastID;
    public _ID: number;
    public Name: string;
    public GetTargetType: () => IType;
    public OwnerType: any;
    public DefaultValue: any;
    public IsReadOnly: boolean;
    public IsCustom: boolean;
    public IsAttached: boolean;
    public IsInheritable: boolean;
    public IsImmutable: boolean;
    public ChangedCallback: (dobj: Fayde.DependencyObject, args: DependencyPropertyChangedEventArgs) => void;
    public AlwaysChange: boolean;
    public Store: Fayde.Providers.PropertyStore;
    private _Coercer;
    private _Validator;
    static Register(name: string, getTargetType: () => IType, ownerType: any, defaultValue?: any, changedCallback?: (dobj: Fayde.DependencyObject, args: DependencyPropertyChangedEventArgs) => void): DependencyProperty;
    static RegisterReadOnly(name: string, getTargetType: () => IType, ownerType: any, defaultValue?: any, changedCallback?: (dobj: Fayde.DependencyObject, args: DependencyPropertyChangedEventArgs) => void): DependencyProperty;
    static RegisterAttached(name: string, getTargetType: () => IType, ownerType: any, defaultValue?: any, changedCallback?: (dobj: Fayde.DependencyObject, args: DependencyPropertyChangedEventArgs) => void): DependencyProperty;
    static RegisterCore(name: string, getTargetType: () => IType, ownerType: any, defaultValue?: any, changedCallback?: (dobj: Fayde.DependencyObject, args: DependencyPropertyChangedEventArgs) => void): DependencyProperty;
    static RegisterReadOnlyCore(name: string, getTargetType: () => IType, ownerType: any, defaultValue?: any, changedCallback?: (dobj: Fayde.DependencyObject, args: DependencyPropertyChangedEventArgs) => void): DependencyProperty;
    static RegisterAttachedCore(name: string, getTargetType: () => IType, ownerType: any, defaultValue?: any, changedCallback?: (dobj: Fayde.DependencyObject, args: DependencyPropertyChangedEventArgs) => void): DependencyProperty;
    static RegisterImmutable<T>(name: string, getTargetType: () => IType, ownerType: any): ImmutableDependencyProperty<T>;
    static RegisterInheritable(name: string, getTargetType: () => IType, ownerType: any, defaultValue?: any, changedCallback?: (dobj: Fayde.DependencyObject, args: DependencyPropertyChangedEventArgs) => void): DependencyProperty;
    static RegisterFull(name: string, getTargetType: () => IType, ownerType: any, defaultValue?: any, changedCallback?: (dobj: Fayde.DependencyObject, args: DependencyPropertyChangedEventArgs) => void, coercer?: (dobj: Fayde.DependencyObject, propd: DependencyProperty, value: any) => any, alwaysChange?: boolean, validator?: (dobj: Fayde.DependencyObject, propd: DependencyProperty, value: any) => boolean, isCustom?: boolean, isReadOnly?: boolean, isAttached?: boolean): DependencyProperty;
    private FinishRegister();
    public ExtendTo(type: any): DependencyProperty;
    public ValidateSetValue(dobj: Fayde.DependencyObject, value: any, isValidOut: IOutIsValid): any;
    static GetDependencyProperty(ownerType: any, name: string, noError?: boolean): DependencyProperty;
}
declare class ImmutableDependencyProperty<T> extends DependencyProperty {
    public IsImmutable: boolean;
    public Initialize(dobj: Fayde.DependencyObject): T;
}
declare module Fayde.Providers {
    enum PropertyPrecedence {
        IsEnabled = 0,
        LocalValue = 1,
        LocalStyle = 2,
        ImplicitStyle = 3,
        Inherited = 4,
        InheritedDataContext = 5,
        DefaultValue = 6,
        Lowest = 6,
        Highest = 0,
        Count = 7,
    }
    interface IPropertyChangedListener {
        Property: DependencyProperty;
        OnPropertyChanged(sender: DependencyObject, args: IDependencyPropertyChangedEventArgs): any;
        Detach(): any;
    }
    interface IPropertyStorage {
        OwnerNode: DONode;
        Property: DependencyProperty;
        Precedence: PropertyPrecedence;
        Animations: Media.Animation.IAnimationStorage[];
        Local: any;
        LocalStyleValue: any;
        ImplicitStyleValue: any;
        PropListeners: IPropertyChangedListener[];
    }
    interface IPropertyStorageOwner {
        _PropertyStorage: IPropertyStorage[];
    }
    function GetStorage(dobj: DependencyObject, propd: DependencyProperty): IPropertyStorage;
    class PropertyStore {
        static Instance: PropertyStore;
        public GetValue(storage: IPropertyStorage): any;
        public GetValuePrecedence(storage: IPropertyStorage): PropertyPrecedence;
        public SetLocalValue(storage: IPropertyStorage, newValue: any): void;
        public SetLocalStyleValue(storage: IPropertyStorage, newValue: any): void;
        public SetImplicitStyle(storage: IPropertyStorage, newValue: any): void;
        public ClearValue(storage: IPropertyStorage): void;
        public OnPropertyChanged(storage: IPropertyStorage, effectivePrecedence: PropertyPrecedence, oldValue: any, newValue: any): IDependencyPropertyChangedEventArgs;
        public ListenToChanged(target: DependencyObject, propd: DependencyProperty, func: (sender: any, args: IDependencyPropertyChangedEventArgs) => void, closure: any): IPropertyChangedListener;
        public CreateStorage(dobj: DependencyObject, propd: DependencyProperty): IPropertyStorage;
        public Clone(dobj: DependencyObject, sourceStorage: IPropertyStorage): IPropertyStorage;
    }
}
declare module Fayde.Providers {
    interface IDataContextStorage extends IPropertyStorage {
        InheritedValue: any;
    }
    class DataContextStore extends PropertyStore {
        static Instance: DataContextStore;
        public GetValue(storage: IDataContextStorage): any;
        public GetValuePrecedence(storage: IDataContextStorage): PropertyPrecedence;
        public OnInheritedChanged(storage: IDataContextStorage, newInherited?: any): void;
        public CreateStorage(dobj: DependencyObject, propd: DependencyProperty): IDataContextStorage;
        public OnPropertyChanged(storage: IDataContextStorage, effectivePrecedence: PropertyPrecedence, oldValue: any, newValue: any): IDependencyPropertyChangedEventArgs;
        private TryUpdateDataContextExpression(storage, newDataContext);
    }
}
declare module Fayde {
    class DONode extends XamlNode {
        public XObject: DependencyObject;
        constructor(xobj: DependencyObject);
        public OnParentChanged(oldParentNode: XamlNode, newParentNode: XamlNode): void;
        public DataContext : any;
        public OnDataContextChanged(oldDataContext: any, newDataContext: any): void;
    }
    class DependencyObject extends XamlObject implements ICloneable, Providers.IPropertyStorageOwner {
        private _Expressions;
        public _PropertyStorage: Providers.IPropertyStorage[];
        static DataContextProperty: DependencyProperty;
        public DataContext: any;
        constructor();
        public XamlNode: DONode;
        public CreateNode(): DONode;
        public GetValue(propd: DependencyProperty): any;
        public SetValue(propd: DependencyProperty, value: any): void;
        public SetValueInternal(propd: DependencyProperty, value: any): void;
        public SetCurrentValue(propd: DependencyProperty, value: any): void;
        public ClearValue(propd: DependencyProperty): void;
        public ReadLocalValue(propd: DependencyProperty): any;
        public ReadLocalValueInternal(propd: DependencyProperty): any;
        private _AddExpression(propd, expr);
        private _RemoveExpression(propd);
        public _HasDeferredValueExpression(propd: DependencyProperty): boolean;
        public GetBindingExpression(propd: DependencyProperty): Data.BindingExpressionBase;
        public HasValueOrExpression(propd: DependencyProperty): boolean;
        public SetBinding(propd: DependencyProperty, binding: Data.Binding): Data.BindingExpressionBase;
        public CloneCore(source: DependencyObject): void;
    }
}
declare module Fayde.Providers {
    interface IInheritedStorage extends IPropertyStorage {
        InheritedValue: any;
    }
    interface IIsPropertyInheritable {
        IsInheritable(propd: DependencyProperty): boolean;
    }
    class InheritedStore extends PropertyStore {
        static Instance: InheritedStore;
        public GetValue(storage: IInheritedStorage): any;
        public GetValuePrecedence(storage: IInheritedStorage): PropertyPrecedence;
        public OnPropertyChanged(storage: IPropertyStorage, effectivePrecedence: PropertyPrecedence, oldValue: any, newValue: any): IDependencyPropertyChangedEventArgs;
        public CreateStorage(dobj: DependencyObject, propd: DependencyProperty): IInheritedStorage;
        static PropagateInheritedOnAdd(dobj: DependencyObject, subtreeNode: DONode): void;
        static ClearInheritedOnRemove(dobj: DependencyObject, subtreeNode: DONode): void;
        private Propagate(ownerNode, propd, newValue);
        private SetInheritedValue(don, propd, newValue);
    }
}
declare module Fayde {
    enum Orientation {
        Horizontal = 0,
        Vertical = 1,
    }
    enum Visibility {
        Visible = 0,
        Collapsed = 1,
    }
    enum CursorType {
        Default = 0,
        Hand = 1,
        IBeam = 2,
        Wait = 3,
        SizeNESW = 4,
        SizeNWSE = 5,
        SizeNS = 6,
        SizeWE = 7,
    }
    var CursorTypeMappings: {
        Default: string;
        Hand: string;
        IBeam: string;
        Wait: string;
        SizeNESW: string;
        SizeNWSE: string;
        SizeNS: string;
        SizeWE: string;
    };
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
    enum TextAlignment {
        Left = 0,
        Center = 1,
        Right = 2,
        Justify = 3,
    }
    enum TextDecorations {
        None = 0,
        Underline = 1,
    }
    enum LineStackingStrategy {
        MaxHeight = 0,
        BlockLineHeight = 1,
    }
}
declare var FontStyle: {
    Normal: string;
    Italic: string;
    Oblique: string;
};
declare var FontStretch: {
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
declare var FontWeight: {
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
declare class Font {
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
    public IsChanged : boolean;
    public GetActualHeight(): number;
    public _Descender(): number;
    public _Ascender(): number;
    private _PurgeCache();
    public ToHtml5Object(): string;
    private _BuildTranslation();
    private static _MeasureHeight(font);
}
declare module Fayde {
    interface IFontChangeable {
        FontChanged(args: IDependencyPropertyChangedEventArgs): any;
    }
    class InheritableOwner {
        static _UseLayoutRoundingPropertyChanged(dobj: DependencyObject, args: IDependencyPropertyChangedEventArgs): void;
        static UseLayoutRoundingProperty: DependencyProperty;
        static _FlowDirectionPropertyChanged(dobj: DependencyObject, args: IDependencyPropertyChangedEventArgs): void;
        static FlowDirectionProperty: DependencyProperty;
        static _FontFamilyPropertyChanged(dobj: DependencyObject, args: IDependencyPropertyChangedEventArgs): void;
        static FontFamilyProperty: DependencyProperty;
        static _FontSizePropertyChanged(dobj: DependencyObject, args: IDependencyPropertyChangedEventArgs): void;
        static FontSizeProperty: DependencyProperty;
        static _FontStretchPropertyChanged(dobj: DependencyObject, args: IDependencyPropertyChangedEventArgs): void;
        static FontStretchProperty: DependencyProperty;
        static _FontStylePropertyChanged(dobj: DependencyObject, args: IDependencyPropertyChangedEventArgs): void;
        static FontStyleProperty: DependencyProperty;
        static _FontWeightPropertyChanged(dobj: DependencyObject, args: IDependencyPropertyChangedEventArgs): void;
        static FontWeightProperty: DependencyProperty;
        static _ForegroundPropertyChanged(dobj: DependencyObject, args: IDependencyPropertyChangedEventArgs): void;
        static ForegroundProperty: DependencyProperty;
        static _TextDecorationsPropertyChanged(dobj: DependencyObject, args: IDependencyPropertyChangedEventArgs): void;
        static TextDecorationsProperty: DependencyProperty;
        static _LanguagePropertyChanged(dobj: DependencyObject, args: IDependencyPropertyChangedEventArgs): void;
        static LanguageProperty: DependencyProperty;
        static AllInheritedProperties: DependencyProperty[];
    }
}
declare module Fayde {
    class UINode extends DONode {
        public XObject: UIElement;
        public LayoutUpdater: LayoutUpdater;
        public IsTopLevel: boolean;
        public _Surface: Surface;
        public IsMouseOver: boolean;
        public SetSurfaceFromVisualParent(): UINode;
        public SetSurface(surface: Surface): void;
        constructor(xobj: UIElement);
        public VisualParentNode: UINode;
        public GetVisualRoot(): UINode;
        public GetInheritedEnumerator(): IEnumerator<DONode>;
        public OnIsAttachedChanged(newIsAttached: boolean): void;
        public IsLoaded: boolean;
        public SetIsLoaded(value: boolean): void;
        public OnVisualChildAttached(uie: UIElement): void;
        public OnVisualChildDetached(uie: UIElement): void;
        private SetVisualParentNode(visualParentNode);
        public Focus(recurse?: boolean): boolean;
        public _EmitFocusChange(type: string): void;
        private _EmitLostFocus();
        private _EmitGotFocus();
        public _EmitKeyDown(args: Input.KeyEventArgs): void;
        public _EmitKeyUp(args: Input.KeyEventArgs): void;
        public _EmitLostMouseCapture(pos: Point): void;
        public _EmitMouseEvent(type: Input.MouseInputType, isLeftButton: boolean, isRightButton: boolean, args: Input.MouseEventArgs): boolean;
        public _EmitTouchEvent(type: Input.TouchInputType, args: Input.TouchEventArgs): boolean;
        public _EmitGotTouchCapture(e: Input.TouchEventArgs): void;
        public _EmitLostTouchCapture(e: Input.TouchEventArgs): void;
        public CanCaptureMouse(): boolean;
        public CaptureMouse(): boolean;
        public ReleaseMouseCapture(): void;
        public ResortChildrenByZIndex(): void;
        public InvalidateParent(r: rect): void;
        public InvalidateClip(oldClip: Media.Geometry, newClip: Media.Geometry): void;
        public InvalidateEffect(oldEffect: Media.Effects.Effect, newEffect: Media.Effects.Effect): void;
        public InvalidateOpacity(): void;
        public InvalidateVisibility(newVisibility: Visibility): void;
        public IsAncestorOf(uin: UINode): boolean;
        public TransformToVisual(uin: UINode): Media.GeneralTransform;
    }
    class UIElement extends DependencyObject implements Providers.IIsPropertyInheritable {
        public XamlNode: UINode;
        private _ClipListener;
        private _EffectListener;
        private _TransformListener;
        public CreateNode(): UINode;
        public CreateLayoutUpdater(uin: UINode): LayoutUpdater;
        public IsItemsControl : boolean;
        public VisualParent : UIElement;
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
        static TagProperty: DependencyProperty;
        static TriggersProperty: DependencyProperty;
        static UseLayoutRoundingProperty: DependencyProperty;
        static VisibilityProperty: DependencyProperty;
        public IsInheritable(propd: DependencyProperty): boolean;
        public IsMouseOver : boolean;
        public DesiredSize : size;
        public RenderSize : size;
        public Clip: Media.Geometry;
        public Effect: Media.Effects.Effect;
        public IsHitTestVisible: boolean;
        public Cursor: CursorType;
        public OpacityMask: Media.Brush;
        public Opacity: number;
        public Projection: Media.Projection;
        public RenderTransform: Media.Transform;
        public RenderTransformOrigin: Point;
        public Tag: any;
        public Triggers: TriggerCollection;
        public UseLayoutRounding: boolean;
        public Visibility: Visibility;
        public Focus(): boolean;
        public CaptureMouse(): boolean;
        public ReleaseMouseCapture(): void;
        public IsAncestorOf(uie: UIElement): boolean;
        public TransformToVisual(uie: UIElement): Media.GeneralTransform;
        public InvalidateMeasure(): void;
        public Measure(availableSize: size): void;
        public InvalidateArrange(): void;
        public Arrange(finalRect: rect): void;
        public LostFocus: RoutedEvent<RoutedEventArgs>;
        public GotFocus: RoutedEvent<RoutedEventArgs>;
        public LostMouseCapture: RoutedEvent<Input.MouseEventArgs>;
        public KeyDown: RoutedEvent<Input.KeyEventArgs>;
        public KeyUp: RoutedEvent<Input.KeyEventArgs>;
        public MouseLeftButtonUp: RoutedEvent<Input.MouseButtonEventArgs>;
        public MouseRightButtonUp: RoutedEvent<Input.MouseButtonEventArgs>;
        public MouseLeftButtonDown: RoutedEvent<Input.MouseButtonEventArgs>;
        public MouseRightButtonDown: RoutedEvent<Input.MouseButtonEventArgs>;
        public MouseLeave: RoutedEvent<Input.MouseEventArgs>;
        public MouseEnter: RoutedEvent<Input.MouseEventArgs>;
        public MouseMove: RoutedEvent<Input.MouseEventArgs>;
        public MouseWheel: RoutedEvent<Input.MouseWheelEventArgs>;
        public TouchDown: RoutedEvent<Input.TouchEventArgs>;
        public TouchUp: RoutedEvent<Input.TouchEventArgs>;
        public TouchEnter: RoutedEvent<Input.TouchEventArgs>;
        public TouchLeave: RoutedEvent<Input.TouchEventArgs>;
        public TouchMove: RoutedEvent<Input.TouchEventArgs>;
        public GotTouchCapture: RoutedEvent<Input.TouchEventArgs>;
        public LostTouchCapture: RoutedEvent<Input.TouchEventArgs>;
        public OnGotFocus(e: RoutedEventArgs): void;
        public OnLostFocus(e: RoutedEventArgs): void;
        public OnLostMouseCapture(e: Input.MouseEventArgs): void;
        public OnKeyDown(e: Input.KeyEventArgs): void;
        public OnKeyUp(e: Input.KeyEventArgs): void;
        public OnMouseEnter(e: Input.MouseEventArgs): void;
        public OnMouseLeave(e: Input.MouseEventArgs): void;
        public OnMouseLeftButtonDown(e: Input.MouseButtonEventArgs): void;
        public OnMouseLeftButtonUp(e: Input.MouseButtonEventArgs): void;
        public OnMouseMove(e: Input.MouseEventArgs): void;
        public OnMouseRightButtonDown(e: Input.MouseButtonEventArgs): void;
        public OnMouseRightButtonUp(e: Input.MouseButtonEventArgs): void;
        public OnMouseWheel(e: Input.MouseWheelEventArgs): void;
        public OnTouchDown(e: Input.TouchEventArgs): void;
        public OnTouchUp(e: Input.TouchEventArgs): void;
        public OnTouchEnter(e: Input.TouchEventArgs): void;
        public OnTouchLeave(e: Input.TouchEventArgs): void;
        public OnTouchMove(e: Input.TouchEventArgs): void;
        public OnGotTouchCapture(e: Input.TouchEventArgs): void;
        public OnLostTouchCapture(e: Input.TouchEventArgs): void;
        private _ClipChanged(args);
        private _EffectChanged(args);
        private _UseLayoutRoundingChanged(args);
        private _IsHitTestVisibleChanged(args);
        private _TriggersChanged(args);
        private _RenderTransformChanged(args);
        public MeasureOverride(availableSize: size): size;
        public ArrangeOverride(finalSize: size): size;
    }
}
declare module Fayde.Providers {
    class ImmutableStore extends PropertyStore {
        static Instance: ImmutableStore;
        public GetValue(storage: IPropertyStorage): any;
        public GetValuePrecedence(storage: IPropertyStorage): PropertyPrecedence;
        public SetLocalValue(storage: IPropertyStorage, newValue: any): void;
        public ClearValue(storage: IPropertyStorage): void;
        public ListenToChanged(target: DependencyObject, propd: DependencyProperty, func: (sender: any, args: IDependencyPropertyChangedEventArgs) => void, closure: any): IPropertyChangedListener;
        public Clone(dobj: DependencyObject, sourceStorage: IPropertyStorage): IPropertyStorage;
    }
}
declare module Fayde.Providers {
    class ActualSizeStore extends PropertyStore {
        static Instance: ActualSizeStore;
        public GetValue(storage: IPropertyStorage): number;
        public GetValuePrecedence(storage: IPropertyStorage): PropertyPrecedence;
        public SetLocalValue(storage: IPropertyStorage, newValue: number): void;
        public SetLocalStyleValue(storage: IPropertyStorage, newValue: any): void;
        public SetImplicitStyle(storage: IPropertyStorage, newValue: any): void;
        public ClearValue(storage: IPropertyStorage, notifyListeners?: boolean): void;
    }
}
declare module Fayde {
    interface ILayoutPass {
        MeasureList: LayoutUpdater[];
        ArrangeList: LayoutUpdater[];
        SizeList: LayoutUpdater[];
        Count: number;
        Updated: boolean;
    }
    class LayoutUpdater {
        static LayoutExceptionUpdater: LayoutUpdater;
        public Surface: Surface;
        public LayoutClip: rect;
        public CompositeLayoutClip: rect;
        public LayoutSlot: rect;
        public PreviousConstraint: size;
        public LastRenderSize: size;
        public HiddenDesire: size;
        public DesiredSize: size;
        public RenderSize: size;
        public VisualOffset: Point;
        public ActualHeight: number;
        public ActualWidth: number;
        public AbsoluteXform: number[];
        public LayoutXform: number[];
        public LocalXform: number[];
        public RenderXform: number[];
        public CarrierXform: number[];
        public LocalProjection: number[];
        public AbsoluteProjection: number[];
        public RenderProjection: number[];
        public CarrierProjection: number[];
        public TotalOpacity: number;
        public TotalIsRenderVisible: boolean;
        public TotalIsHitTestVisible: boolean;
        public TotalRenderProjection: boolean;
        public Extents: rect;
        public ExtentsWithChildren: rect;
        public GlobalBoundsWithChildren: rect;
        public SurfaceBoundsWithChildren: rect;
        public EffectPadding: Thickness;
        public ClipBounds: rect;
        public IsContainer: boolean;
        public IsLayoutContainer: boolean;
        public BreaksLayoutClipRender: boolean;
        public CanHitElement: boolean;
        public ShouldSkipHitTest: boolean;
        public IsNeverInsideObject: boolean;
        private Flags;
        private DirtyFlags;
        public InUpDirty: boolean;
        public InDownDirty: boolean;
        public DirtyRegion: rect;
        private _ForceInvalidateOfNewBounds;
        public Node: UINode;
        constructor(uin: UINode);
        public OnIsAttachedChanged(newIsAttached: boolean, visualParentNode: UINode): void;
        public OnAddedToTree(): void;
        public OnRemovedFromTree(): void;
        public SetContainerMode(isLayoutContainer: boolean, isContainer?: boolean): void;
        public HasMeasureArrangeHint(): boolean;
        public ProcessDown(): boolean;
        public ProcessUp(): boolean;
        private _PropagateDirtyFlagToChildren(dirt);
        private _AddDirtyElement(dirt);
        public FullInvalidate(invTransforms?: boolean): void;
        public Invalidate(r?: rect): void;
        private _CacheInvalidateHint();
        public ComputeComposite(): void;
        public InvalidateBitmapCache(): void;
        public InvalidateMeasure(): void;
        public InvalidateArrange(): void;
        public InvalidateSubtreePaint(): void;
        public InvalidateVisibility(newVisibility: Visibility): void;
        public InvalidateHitTestVisibility(newHitTestVisibility: boolean): void;
        public InvalidateChildrenZIndices(): void;
        public UpdateClip(): void;
        public SetLayoutClip(layoutClip: rect): void;
        public ComputeLayoutClip(vpLu: LayoutUpdater): void;
        public UpdateTransform(): void;
        public ComputeLocalTransform(uie: UIElement): void;
        public ComputeLocalProjection(uie: UIElement): void;
        public ComputeTransform(uin: UINode, vplu: LayoutUpdater): void;
        public PostComputeTransform(hasProjection: boolean): void;
        public UpdateProjection(): void;
        public TransformPoint(p: Point): void;
        public TransformToVisual(toUin: UINode): Media.GeneralTransform;
        public GetTransformOrigin(uie: UIElement): IPoint;
        public GetTextBlockTransformOrigin(tb: Controls.TextBlock): IPoint;
        public UpdateRenderVisibility(vpLu: LayoutUpdater): void;
        public UpdateTotalRenderVisibility(): void;
        public UpdateHitTestVisibility(vpLu: LayoutUpdater): void;
        public UpdateTotalHitTestVisibility(): void;
        public UpdateBounds(forceRedraw?: boolean): void;
        public ComputeBounds(): void;
        public ComputeExtents(actualSize: size): void;
        public ComputePaintBounds(): void;
        public IntersectBoundsWithClipPath(dest: rect, xform: number[]): rect;
        private _UpdateActualSize();
        public ComputeActualSize(): size;
        public GetBrushSize(): ISize;
        public CoerceSize(s: size): size;
        private _HasFlag(flag);
        private _PropagateFlagUp(flag);
        public UpdateLayer(pass: ILayoutPass, error: BError): void;
        private _DoMeasureWithError(error);
        public _Measure(availableSize: size, error: BError): void;
        public MeasureOverride(availableSize: size, error: BError): size;
        private _DoArrangeWithError(error);
        public _Arrange(finalRect: rect, error: BError): void;
        public ArrangeOverride(finalSize: size, error: BError): size;
        public DoRender(ctx: RenderContextEx, r: rect): void;
        public Render(ctx: RenderContextEx, region: rect): void;
        public FindElementsInHostCoordinates(p: Point): UINode[];
        private _FindElementsInHostCoordinates(ctx, p, uinlist, applyXform);
        public HitTestPoint(ctx: RenderContextEx, p: Point, uinlist: UINode[]): void;
        public InsideObject(ctx: RenderContextEx, x: number, y: number): boolean;
        private _InsideClip(ctx, x, y);
        private _InsideLayoutClip(ctx, x, y);
        public RenderLayoutClip(ctx: RenderContextEx): void;
        private _DebugLayout();
        private _SerializeDirt();
        private _SerializeFlags();
        private _DebugToString();
    }
}
declare module Fayde {
    class FENode extends UINode implements Providers.IStyleHolder, Providers.IImplicitStyleHolder {
        public _LocalStyle: Style;
        public _ImplicitStyles: Style[];
        public _StyleMask: number;
        public _Surface: Surface;
        public XObject: FrameworkElement;
        constructor(xobj: FrameworkElement);
        public SubtreeNode: XamlNode;
        public SetSubtreeNode(subtreeNode: XamlNode, error: BError): boolean;
        public SetIsLoaded(value: boolean): void;
        public OnIsLoadedChanged(newIsLoaded: boolean): void;
        public InvokeLoaded(): void;
        public AttachVisualChild(uie: UIElement, error: BError): boolean;
        public DetachVisualChild(uie: UIElement, error: BError): boolean;
        public ApplyTemplateWithError(error: BError): boolean;
        public DoApplyTemplateWithError(error: BError): boolean;
        public FinishApplyTemplateWithError(uie: UIElement, error: BError): boolean;
        public _HasFocus(): boolean;
        public GetFocusedElement(): UIElement;
        public UpdateLayout(): void;
        public GetVisualTreeEnumerator(direction?: VisualTreeDirection): IEnumerator<FENode>;
        public _SizeChanged(args: IDependencyPropertyChangedEventArgs): void;
        public _FlowDirectionChanged(args: IDependencyPropertyChangedEventArgs): void;
    }
    class FrameworkElement extends UIElement implements IResourcable, Providers.IIsPropertyInheritable {
        public XamlNode: FENode;
        public Resources: ResourceDictionary;
        constructor();
        public CreateNode(): FENode;
        static ActualHeightProperty: DependencyProperty;
        static ActualWidthProperty: DependencyProperty;
        static CursorProperty: DependencyProperty;
        static FlowDirectionProperty: DependencyProperty;
        static HeightProperty: DependencyProperty;
        static HorizontalAlignmentProperty: DependencyProperty;
        static LanguageProperty: DependencyProperty;
        static MarginProperty: DependencyProperty;
        static MaxHeightProperty: DependencyProperty;
        static MaxWidthProperty: DependencyProperty;
        static MinHeightProperty: DependencyProperty;
        static MinWidthProperty: DependencyProperty;
        static StyleProperty: DependencyProperty;
        static VerticalAlignmentProperty: DependencyProperty;
        static WidthProperty: DependencyProperty;
        static ResourcesProperty: ImmutableDependencyProperty<ResourceDictionary>;
        static DefaultStyleKeyProperty: DependencyProperty;
        public IsInheritable(propd: DependencyProperty): boolean;
        public ActualHeight: number;
        public ActualWidth: number;
        public FlowDirection: FlowDirection;
        public Height: number;
        public HorizontalAlignment: HorizontalAlignment;
        public Language: string;
        public Margin: Thickness;
        public MaxWidth: number;
        public MaxHeight: number;
        public MinWidth: number;
        public MinHeight: number;
        public Style: Style;
        public VerticalAlignment: VerticalAlignment;
        public Width: number;
        public DefaultStyleKey: Function;
        public SizeChanged: RoutedEvent<RoutedEventArgs>;
        public Loaded: RoutedEvent<RoutedEventArgs>;
        public Unloaded: RoutedEvent<RoutedEventArgs>;
        public LayoutUpdated: MulticastEvent<EventArgs>;
        public OnApplyTemplate(): void;
        public TemplateApplied: MulticastEvent<EventArgs>;
        public UpdateLayout(): void;
        private _StyleChanged(args);
        private _AlignmentChanged(args);
        public _WidthChanged(args: IDependencyPropertyChangedEventArgs): void;
        public _HeightChanged(args: IDependencyPropertyChangedEventArgs): void;
    }
}
declare module Fayde {
    function Annotation(type: Function, name: string, value: any, forbidMultiple?: boolean): void;
    function GetAnnotations(type: Function, name: string): any[];
    interface ITypedAnnotation<T> {
        (type: Function, ...values: T[]): any;
        Get(type: Function): T[];
    }
    function CreateTypedAnnotation<T>(name: string): ITypedAnnotation<T>;
}
declare module Fayde.Xaml {
    interface IContentAnnotation {
        (type: Function, prop: DependencyProperty): any;
        Get(type: Function): DependencyProperty;
    }
    var Content: IContentAnnotation;
    interface ITextContentAnnotation {
        (type: Function, prop: DependencyProperty): any;
        Get(type: Function): DependencyProperty;
    }
    var TextContent: ITextContentAnnotation;
}
declare module Fayde.Controls {
    class Border extends FrameworkElement {
        public CreateLayoutUpdater(node: UINode): BorderLayoutUpdater;
        static BackgroundProperty: DependencyProperty;
        static BorderBrushProperty: DependencyProperty;
        static BorderThicknessProperty: DependencyProperty;
        static ChildProperty: DependencyProperty;
        static CornerRadiusProperty: DependencyProperty;
        static PaddingProperty: DependencyProperty;
        public Background: Media.Brush;
        public BorderBrush: Media.Brush;
        public BorderThickness: Thickness;
        public Child: UIElement;
        public CornerRadius: CornerRadius;
        public Padding: Thickness;
        private _BackgroundListener;
        private _BorderBrushListener;
        private _ChildChanged(args);
        private _BackgroundChanged(args);
        private _BorderBrushChanged(args);
        private _BorderThicknessChanged(args);
        private _PaddingChanged(args);
    }
    class BorderLayoutUpdater extends LayoutUpdater {
        private _Renderer;
        constructor(node: UINode);
        public MeasureOverride(availableSize: size, error: BError): size;
        public ArrangeOverride(finalSize: size, error: BError): size;
        public Render(ctx: RenderContextEx, region: rect): void;
    }
}
declare module Fayde.Providers {
    interface IIsEnabledStorage extends IPropertyStorage {
        InheritedValue: boolean;
    }
    class IsEnabledStore extends PropertyStore {
        static Instance: IsEnabledStore;
        public GetValue(storage: IIsEnabledStorage): boolean;
        public GetValuePrecedence(storage: IIsEnabledStorage): PropertyPrecedence;
        public SetLocalValue(storage: IIsEnabledStorage, newValue: boolean): void;
        public OnPropertyChanged(storage: IPropertyStorage, effectivePrecedence: PropertyPrecedence, oldValue: any, newValue: any): IDependencyPropertyChangedEventArgs;
        public CreateStorage(dobj: DependencyObject, propd: DependencyProperty): IIsEnabledStorage;
        public EmitInheritedChanged(storage: IIsEnabledStorage, newInherited: boolean): void;
        static EmitInheritedChanged(cn: Controls.ControlNode, value: boolean): void;
    }
}
interface IOutValue {
    Value: any;
}
interface ICloneable {
    Clone(): any;
}
declare class Nullstone {
    static Equals(val1: any, val2: any): boolean;
    static DoesInheritFrom(t: IType, type: any): boolean;
    static GetPropertyDescriptor(obj: any, name: string): PropertyDescriptor;
    static HasProperty(obj: any, name: string): boolean;
}
declare function NotImplemented(str: string): void;
declare function Warn(str: string): void;
declare module Fayde.Input {
    enum KeyboardNavigationMode {
        Continue = 0,
        Once = 1,
        Cycle = 2,
        None = 3,
        Contained = 4,
        Local = 5,
    }
    enum ModifierKeys {
        None = 0,
        Alt = 1,
        Control = 2,
        Shift = 4,
        Windows = 8,
        Apple = 16,
    }
    interface IModifiersOn {
        Shift: boolean;
        Ctrl: boolean;
        Alt: boolean;
    }
    class Keyboard {
        static Modifiers: ModifierKeys;
        static RefreshModifiers(e: IModifiersOn): void;
        static HasControl(): boolean;
        static HasAlt(): boolean;
        static HasShift(): boolean;
    }
}
declare module Fayde.Controls {
    interface IIsEnabledListener {
        Callback: (newIsEnabled: boolean) => void;
        Detach(): any;
    }
    class ControlNode extends FENode {
        public _Surface: Surface;
        public XObject: Control;
        public TemplateRoot: FrameworkElement;
        public IsFocused: boolean;
        constructor(xobj: Control);
        public TabTo(): boolean;
        public DoApplyTemplateWithError(error: BError): boolean;
        public GetDefaultVisualTree(): UIElement;
        public OnIsAttachedChanged(newIsAttached: boolean): void;
        public OnParentChanged(oldParentNode: XamlNode, newParentNode: XamlNode): void;
        public OnTemplateChanged(oldTemplate: ControlTemplate, newTemplate: ControlTemplate): void;
        public IsEnabled : boolean;
        public OnIsEnabledChanged(oldValue: boolean, newValue: boolean): void;
        public Focus(recurse?: boolean): boolean;
        public CanCaptureMouse(): boolean;
    }
    class Control extends FrameworkElement implements Providers.IIsPropertyInheritable {
        public XamlNode: ControlNode;
        public CreateNode(): ControlNode;
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
        public IsInheritable(propd: DependencyProperty): boolean;
        public Background: Media.Brush;
        public BorderBrush: Media.Brush;
        public BorderThickness: Thickness;
        public FontFamily: string;
        public FontSize: number;
        public FontStretch: string;
        public FontStyle: string;
        public FontWeight: FontWeight;
        public Foreground: Media.Brush;
        public HorizontalContentAlignment: HorizontalAlignment;
        public IsEnabled: boolean;
        public IsTabStop: boolean;
        public Padding: Thickness;
        public TabIndex: number;
        public TabNavigation: Input.KeyboardNavigationMode;
        public Template: ControlTemplate;
        public VerticalContentAlignment: VerticalAlignment;
        public IsFocused : boolean;
        public GetTemplateChild(childName: string, type?: Function): DependencyObject;
        public ApplyTemplate(): boolean;
        public GetDefaultStyle(): Style;
        public IsEnabledChanged: MulticastEvent<DependencyPropertyChangedEventArgs>;
        public _IsEnabledChanged(args: IDependencyPropertyChangedEventArgs): void;
        public OnIsEnabledChanged(e: IDependencyPropertyChangedEventArgs): void;
        public OnGotFocus(e: RoutedEventArgs): void;
        public OnLostFocus(e: RoutedEventArgs): void;
        public UpdateVisualState(useTransitions?: boolean): void;
        public GoToStates(gotoFunc: (state: string) => boolean): void;
        public GoToStateCommon(gotoFunc: (state: string) => boolean): boolean;
        public GoToStateFocus(gotoFunc: (state: string) => boolean): boolean;
        public GoToStateSelection(gotoFunc: (state: string) => boolean): boolean;
        private _PaddingChanged(args);
        private _BorderThicknessChanged(args);
        private _ContentAlignmentChanged(args);
    }
    interface ITemplateVisualStateDefinition {
        Name: string;
        GroupName: string;
    }
    var TemplateVisualStates: ITypedAnnotation<ITemplateVisualStateDefinition>;
    interface ITemplatePartDefinition {
        Name: string;
        Type: Function;
    }
    var TemplateParts: ITypedAnnotation<ITemplatePartDefinition>;
}
declare module Fayde.Controls {
    class ContentControlNode extends ControlNode {
        public XObject: ContentControl;
        constructor(xobj: ContentControl);
        public OnContentChanged(o: any, n: any): void;
        public GetDefaultVisualTree(): UIElement;
        public OnTemplateChanged(oldTemplate: ControlTemplate, newTemplate: ControlTemplate): void;
    }
    class ContentControl extends Control {
        public XamlNode: ContentControlNode;
        public CreateNode(): ContentControlNode;
        static ContentProperty: DependencyProperty;
        public Content: any;
        private OnContentPropertyChanged(args);
        public OnContentChanged(oldContent: any, newContent: any): void;
        static ContentTemplateProperty: DependencyProperty;
        public ContentTemplate: DataTemplate;
        public OnContentTemplateChanged(oldContentTemplate: DataTemplate, newContentTemplate: DataTemplate): void;
        static ContentUriProperty: DependencyProperty;
        public ContentUri: Uri;
        private OnContentUriPropertyChanged(args);
        public OnContentUriChanged(oldSourceUri: Uri, newSourceUri: Uri): void;
        private _OnLoadedUri(xd);
        private _OnErroredUri(err, src);
    }
}
declare module Fayde.Controls {
    enum TextWrapping {
        NoWrap = 0,
        Wrap = 1,
        WrapWithOverflow = 2,
    }
    enum ScrollBarVisibility {
        Disabled = 0,
        Auto = 1,
        Hidden = 2,
        Visible = 3,
    }
    enum TextTrimming {
        None = 0,
    }
    enum ClickMode {
        Release = 0,
        Press = 1,
        Hover = 2,
    }
    enum PlacementMode {
        Bottom = 0,
        Right = 1,
        Mouse = 2,
        Left = 3,
        Top = 4,
    }
    enum SelectionMode {
        Single = 0,
        Multiple = 1,
        Extended = 2,
    }
    enum MediaElementState {
        Closed = 0,
        Opening = 1,
        Buffering = 4,
        Playing = 5,
        Paused = 6,
        Stopped = 7,
    }
}
declare module Fayde.Controls.Primitives {
    class ButtonBase extends ContentControl {
        static ClickModeProperty: DependencyProperty;
        static IsPressedProperty: DependencyProperty;
        static IsFocusedProperty: DependencyProperty;
        static CommandProperty: DependencyProperty;
        static CommandParameterProperty: DependencyProperty;
        public ClickMode: ClickMode;
        public IsPressed: boolean;
        public IsFocused: boolean;
        public Command: Input.ICommand;
        public CommandParameter: any;
        public Click: RoutedEvent<RoutedEventArgs>;
        private _IsMouseCaptured;
        private _IsMouseLeftButtonDown;
        private _IsSpaceKeyDown;
        public _MousePosition: Point;
        private _SuspendStateChanges;
        constructor();
        public OnIsPressedChanged(args: IDependencyPropertyChangedEventArgs): void;
        public OnIsEnabledChanged(e: IDependencyPropertyChangedEventArgs): void;
        public OnMouseEnter(e: Input.MouseEventArgs): void;
        public OnMouseLeave(e: Input.MouseEventArgs): void;
        public OnMouseMove(e: Input.MouseEventArgs): void;
        public OnMouseLeftButtonDown(e: Input.MouseButtonEventArgs): void;
        public OnMouseLeftButtonUp(e: Input.MouseButtonEventArgs): void;
        public OnGotFocus(e: RoutedEventArgs): void;
        public OnLostFocus(e: RoutedEventArgs): void;
        public OnClick(): void;
        private _DoWithSuspend(action);
        public UpdateVisualState(useTransitions?: boolean): void;
        public GoToStateCommon(gotoFunc: (state: string) => boolean): boolean;
        private _CaptureMouseInternal();
        private _ReleaseMouseCaptureInternal();
        private _IsValidMousePosition();
        private OnCommandChanged(args);
        private OnCommandCanExecuteChanged(sender, e);
        private OnCommandParameterChanged(args);
    }
}
declare module Fayde.Controls {
    class Button extends Primitives.ButtonBase {
        constructor();
        public OnApplyTemplate(): void;
        public OnIsEnabledChanged(e: IDependencyPropertyChangedEventArgs): void;
    }
}
declare module Fayde {
    class XamlObjectCollection<T extends XamlObject> extends XamlObject implements IEnumerable<T> {
        public _ht: T[];
        public AttachTo(xobj: XamlObject): void;
        public Count : number;
        public GetRange(startIndex: number, endIndex: number): T[];
        public GetValueAt(index: number): T;
        public SetValueAt(index: number, value: T): boolean;
        public Add(value: T): number;
        public Insert(index: number, value: T): boolean;
        public Remove(value: T): boolean;
        public RemoveAt(index: number): boolean;
        public Clear(): boolean;
        public IndexOf(value: T): number;
        public Contains(value: T): boolean;
        public CanAdd(value: T): boolean;
        public AddingToCollection(value: T, error: BError): boolean;
        public RemovedFromCollection(value: T, isValueSafe: boolean): void;
        public getEnumerator(reverse?: boolean): IEnumerator<T>;
        public GetNodeEnumerator<U extends XamlNode>(reverse?: boolean): IEnumerator<U>;
        public _RaiseItemAdded(value: T, index: number): void;
        public _RaiseItemRemoved(value: T, index: number): void;
        public _RaiseItemReplaced(removed: T, added: T, index: number): void;
        public _RaiseCleared(old: T[]): void;
        public CloneCore(source: XamlObjectCollection<T>): void;
        public ToArray(): T[];
    }
}
declare module Fayde.Controls {
    class PanelNode extends FENode {
        public XObject: Panel;
        constructor(xobj: Panel);
        public AttachVisualChild(uie: UIElement, error: BError): boolean;
        public DetachVisualChild(uie: UIElement, error: BError): boolean;
        public _InvalidateChildrenZIndices(): void;
        public ResortChildrenByZIndex(): void;
        public OnIsAttachedChanged(newIsAttached: boolean): void;
        public GetVisualTreeEnumerator(direction?: VisualTreeDirection): IEnumerator<FENode>;
    }
    class Panel extends FrameworkElement {
        public XamlNode: PanelNode;
        public CreateNode(): PanelNode;
        public CreateLayoutUpdater(node: PanelNode): PanelLayoutUpdater;
        static ZIndexProperty: DependencyProperty;
        static ZProperty: DependencyProperty;
        static BackgroundProperty: DependencyProperty;
        static ChildrenProperty: ImmutableDependencyProperty<XamlObjectCollection<UIElement>>;
        public Background: Media.Brush;
        public Children: XamlObjectCollection<UIElement>;
        private _BackgroundListener;
        constructor();
        static GetZIndex(uie: UIElement): number;
        static SetZIndex(uie: UIElement, value: number): void;
        static GetZ(uie: UIElement): number;
        static SetZ(uie: UIElement, value: number): void;
        private _BackgroundChanged(args);
    }
    class PanelLayoutUpdater extends LayoutUpdater {
        constructor(node: PanelNode);
        public InsideObject(ctx: RenderContextEx, x: number, y: number): boolean;
        public ComputeExtents(actualSize: size): void;
        public Render(ctx: RenderContextEx, region: rect): void;
    }
}
declare module Fayde.Controls {
    class CanvasNode extends PanelNode {
        public XObject: Canvas;
        constructor(xobj: Canvas);
        public AttachVisualChild(uie: UIElement, error: BError): boolean;
        public DetachVisualChild(uie: UIElement, error: BError): boolean;
        private _UpdateIsLayoutContainerOnAdd(uie);
        private _UpdateIsLayoutContainerOnRemove(uie);
    }
    class Canvas extends Panel {
        public CreateNode(): CanvasNode;
        public CreateLayoutUpdater(node: PanelNode): CanvasLayoutUpdater;
        static TopProperty: DependencyProperty;
        static GetTop(d: DependencyObject): number;
        static SetTop(d: DependencyObject, value: number): void;
        static LeftProperty: DependencyProperty;
        static GetLeft(d: DependencyObject): number;
        static SetLeft(d: DependencyObject, value: number): void;
    }
    class CanvasLayoutUpdater extends PanelLayoutUpdater {
        constructor(node: PanelNode);
        public MeasureOverride(availableSize: size, error: BError): size;
        public ArrangeOverride(finalSize: size, error: BError): size;
        public ComputeBounds(): void;
    }
}
declare module Fayde.Controls.Primitives {
    class ToggleButton extends ButtonBase {
        public Checked: RoutedEvent<RoutedEventArgs>;
        public Indeterminate: RoutedEvent<RoutedEventArgs>;
        public Unchecked: RoutedEvent<RoutedEventArgs>;
        static IsCheckedProperty: DependencyProperty;
        static IsThreeStateProperty: DependencyProperty;
        public IsChecked: boolean;
        public IsThreeState: boolean;
        constructor();
        public OnApplyTemplate(): void;
        public OnContentChanged(oldContent: any, newContent: any): void;
        public OnClick(): void;
        public UpdateVisualState(useTransitions?: boolean): void;
        public OnIsCheckedChanged(args: IDependencyPropertyChangedEventArgs): void;
        public OnToggle(): void;
    }
}
declare module Fayde.Controls {
    class CheckBox extends Primitives.ToggleButton {
        constructor();
    }
}
declare module Fayde.Controls {
    interface IColumnDefinitionListener {
        ColumnDefinitionChanged(colDefinition: ColumnDefinition): any;
    }
    class ColumnDefinition extends DependencyObject {
        static WidthProperty: DependencyProperty;
        static MaxWidthProperty: DependencyProperty;
        static MinWidthProperty: DependencyProperty;
        static ActualWidthProperty: DependencyProperty;
        public Width: GridLength;
        public MaxWidth: number;
        public MinWidth: number;
        public ActualWidth: number;
        private _Listener;
        public Listen(listener: IColumnDefinitionListener): void;
        public Unlisten(listener: IColumnDefinitionListener): void;
        private _WidthsChanged(args);
    }
    interface IColumnDefinitionsListener {
        ColumnDefinitionsChanged(colDefinitions: ColumnDefinitionCollection): any;
    }
    class ColumnDefinitionCollection extends XamlObjectCollection<ColumnDefinition> implements IColumnDefinitionListener {
        private _Listener;
        public Listen(listener: IColumnDefinitionsListener): void;
        public Unlisten(listener: IColumnDefinitionsListener): void;
        public ColumnDefinitionChanged(colDefinition: ColumnDefinition): void;
        public AddingToCollection(value: ColumnDefinition, error: BError): boolean;
        public RemovedFromCollection(value: ColumnDefinition, isValueSafe: boolean): void;
    }
}
declare module Fayde.Controls {
    class ItemsControlNode extends ControlNode {
        public XObject: ItemsControl;
        constructor(xobj: ItemsControl);
        public ItemsPresenter: ItemsPresenter;
        public GetDefaultVisualTree(): UIElement;
    }
    class ItemsControl extends Control {
        public XamlNode: ItemsControlNode;
        public CreateNode(): ItemsControlNode;
        public IsItemsControl : boolean;
        static DisplayMemberPathProperty: DependencyProperty;
        static ItemsPanelProperty: DependencyProperty;
        static ItemsSourceProperty: DependencyProperty;
        static ItemsProperty: ImmutableDependencyProperty<ItemCollection>;
        static ItemTemplateProperty: DependencyProperty;
        static IsItemsHostProperty: DependencyProperty;
        static GetIsItemsHost(d: DependencyObject): boolean;
        static SetIsItemsHost(d: DependencyObject, value: boolean): void;
        public DisplayMemberPath: string;
        public ItemsPanel: ItemsPanelTemplate;
        public ItemsSource: IEnumerable<any>;
        public Items: ItemCollection;
        public ItemTemplate: DataTemplate;
        public OnDisplayMemberPathChanged(e: IDependencyPropertyChangedEventArgs): void;
        public OnItemsSourceChanged(e: IDependencyPropertyChangedEventArgs): void;
        public OnItemTemplateChanged(e: IDependencyPropertyChangedEventArgs): void;
        private _ItemContainersManager;
        public ItemContainersManager : Internal.IItemContainersManager;
        constructor();
        public PrepareContainerForItem(container: UIElement, item: any): void;
        public ClearContainerForItem(container: UIElement, item: any): void;
        public GetContainerForItem(): UIElement;
        public IsItemItsOwnContainer(item: any): boolean;
        private _IsDataBound;
        private _SuspendItemsChanged;
        private _OnItemsUpdated(sender, e);
        private _OnItemsSourceUpdated(sender, e);
        public OnItemsChanged(e: Collections.CollectionChangedEventArgs): void;
        public OnItemsAdded(index: number, newItems: any[]): void;
        public OnItemsRemoved(index: number, oldItems: any[]): void;
        private UpdateContainerTemplate(container, item);
        private _DisplayMemberTemplate;
        private _GetDisplayMemberTemplate();
    }
}
declare module Fayde.Controls.Primitives {
    class Selector extends ItemsControl {
        static IsSynchronizedWithCurrentItemProperty: DependencyProperty;
        static SelectedIndexProperty: DependencyProperty;
        static SelectedItemProperty: DependencyProperty;
        static SelectedValueProperty: DependencyProperty;
        static SelectedValuePathProperty: DependencyProperty;
        static IsSelectionActiveProperty: DependencyProperty;
        static SelectionModeProperty: DependencyProperty;
        public IsSynchronizedWithCurrentItem: boolean;
        public SelectedIndex: number;
        public SelectedItem: any;
        public SelectedValue: any;
        public SelectedValuePath: string;
        public IsSelectionActive: boolean;
        public SelectionMode: SelectionMode;
        public SelectionChanged: RoutedEvent<SelectionChangedEventArgs>;
        private _Selection;
        private _SelectedItems;
        public _SelectedItemsIsInvalid: boolean;
        public $TemplateScrollViewer: ScrollViewer;
        private _SelectedValueWalker;
        private SynchronizeWithCurrentItem;
        constructor();
        public SelectedItems : Collections.ObservableCollection<any>;
        private _OnIsSynchronizedWithCurrentItemChanged(args);
        private _OnSelectedIndexChanged(args);
        private _OnSelectedItemChanged(args);
        private _OnSelectedValueChanged(args);
        private _OnSelectedValuePathChanged(args);
        private _OnSelectionModeChanged(args);
        public OnApplyTemplate(): void;
        public OnItemsChanged(e: Collections.CollectionChangedEventArgs): void;
        public OnItemsSourceChanged(args: IDependencyPropertyChangedEventArgs): void;
        public OnItemContainerStyleChanged(oldStyle: any, newStyle: any): void;
        public ClearContainerForItem(element: UIElement, item: any): void;
        public PrepareContainerForItem(element: UIElement, item: any): void;
        public _GetValueFromItem(item: any): any;
        private _SelectItemFromValue(selectedValue, ignoreSelectedValue?);
        public SelectAll(): void;
        private _OnCurrentItemChanged(sender, e);
        public _RaiseSelectionChanged(oldVals: any[], newVals: any[]): void;
        public OnSelectionChanged(args: SelectionChangedEventArgs): void;
        public NotifyListItemClicked(lbi: ListBoxItem): void;
        public NotifyListItemLoaded(lbi: ListBoxItem): void;
        public NotifyListItemGotFocus(lbi: ListBoxItem): void;
        public NotifyListItemLostFocus(lbi: ListBoxItem): void;
    }
}
declare module Fayde.Xaml {
    class XamlDocument {
        private _RequiredDependencies;
        public Document: Document;
        constructor(xaml: string);
        static Get(url: Uri): XamlDocument;
        static Get(url: string): XamlDocument;
        static GetAsync(url: string, ctx?: IDependencyAsyncContext): IAsyncRequest<XamlDocument>;
        static GetAsync(url: Uri, ctx?: IDependencyAsyncContext): IAsyncRequest<XamlDocument>;
        public Resolve(ctx: IDependencyAsyncContext): IAsyncRequest<any>;
    }
}
declare module Fayde.Xaml {
    class FrameworkTemplate extends XamlObject {
        private ResourceChain;
        private TemplateElement;
        constructor();
        public GetVisualTree(bindingSource: DependencyObject): UIElement;
    }
    function Load(doc: Document): XamlObject;
}
declare module Fayde.Controls {
    class ContentPresenterNode extends FENode {
        private _ContentRoot;
        public ContentRoot : UIElement;
        public XObject: ContentPresenter;
        constructor(xobj: ContentPresenter);
        public DoApplyTemplateWithError(error: BError): boolean;
        public ClearRoot(): void;
        public _ContentChanged(args: IDependencyPropertyChangedEventArgs): void;
        public _ContentTemplateChanged(): void;
        private _ShouldInvalidateImplicitTemplate(oldValue, newValue);
        private _GetContentTemplate(type);
    }
    class ContentPresenter extends FrameworkElement {
        public XamlNode: ContentPresenterNode;
        public CreateNode(): ContentPresenterNode;
        static ContentProperty: DependencyProperty;
        static ContentTemplateProperty: DependencyProperty;
        public Content: any;
        public ContentTemplate: DataTemplate;
    }
}
declare module Fayde.Controls.Primitives {
    class PopupNode extends FENode {
        public XObject: Popup;
        public GetInheritedEnumerator(): IEnumerator<DONode>;
        public OnIsAttachedChanged(newIsAttached: boolean): void;
        private _HorizontalOffset;
        private _VerticalOffset;
        private _IsVisible;
        private _IsCatchingClick;
        private _Catcher;
        private _VisualChild;
        public _ChildChanged(oldChild: FrameworkElement, newChild: FrameworkElement): void;
        private _PrepareVisualChild(newChild);
        public CatchClickedOutside(): void;
        private _UpdateCatcher();
        private _RaiseClickedOutside(sender, e);
        public OnHorizontalOffsetChanged(args: IDependencyPropertyChangedEventArgs): void;
        public OnVerticalOffsetChanged(args: IDependencyPropertyChangedEventArgs): void;
        public _Hide(): void;
        public _Show(): void;
    }
    class Popup extends FrameworkElement {
        public XamlNode: PopupNode;
        public CreateNode(): PopupNode;
        public CreateLayoutUpdater(node: PopupNode): PopupLayoutUpdater;
        static ChildProperty: DependencyProperty;
        static HorizontalOffsetProperty: DependencyProperty;
        static VerticalOffsetProperty: DependencyProperty;
        static IsOpenProperty: DependencyProperty;
        public Child: UIElement;
        public HorizontalOffset: number;
        public VerticalOffset: number;
        public IsOpen: boolean;
        public Opened: MulticastEvent<EventArgs>;
        public Closed: MulticastEvent<EventArgs>;
        public ClickedOutside: MulticastEvent<EventArgs>;
        private _OnChildChanged(args);
        private _OnIsOpenChanged(args);
    }
    class PopupLayoutUpdater extends LayoutUpdater {
        public ComputeBounds(): void;
        public PostComputeTransform(hasProjection: boolean): void;
    }
}
declare module Fayde.Controls.Primitives {
    interface IScrollInfo {
        ScrollOwner: ScrollViewer;
        LineUp(): boolean;
        LineDown(): boolean;
        LineLeft(): boolean;
        LineRight(): boolean;
        MouseWheelUp(): boolean;
        MouseWheelDown(): boolean;
        MouseWheelLeft(): boolean;
        MouseWheelRight(): boolean;
        PageUp(): boolean;
        PageDown(): boolean;
        PageLeft(): boolean;
        PageRight(): boolean;
        MakeVisible(uie: UIElement, rectangle: rect): rect;
        SetHorizontalOffset(offset: number): boolean;
        SetVerticalOffset(offset: number): boolean;
        CanHorizontallyScroll: boolean;
        CanVerticallyScroll: boolean;
        ExtentHeight: number;
        ExtentWidth: number;
        HorizontalOffset: number;
        VerticalOffset: number;
        ViewportHeight: number;
        ViewportWidth: number;
    }
    var IScrollInfo_: IInterfaceDeclaration<IScrollInfo>;
}
declare module Fayde.Controls {
    class ScrollContentPresenter extends ContentPresenter implements Primitives.IScrollInfo {
        private _ScrollData;
        private _IsClipPropertySet;
        private _ClippingRectangle;
        public ScrollOwner : ScrollViewer;
        public CanHorizontallyScroll : boolean;
        public CanVerticallyScroll : boolean;
        public ExtentWidth : number;
        public ExtentHeight : number;
        public ViewportWidth : number;
        public ViewportHeight : number;
        public HorizontalOffset : number;
        public VerticalOffset : number;
        public LineUp(): boolean;
        public LineDown(): boolean;
        public LineLeft(): boolean;
        public LineRight(): boolean;
        public MouseWheelUp(): boolean;
        public MouseWheelDown(): boolean;
        public MouseWheelLeft(): boolean;
        public MouseWheelRight(): boolean;
        public PageUp(): boolean;
        public PageDown(): boolean;
        public PageLeft(): boolean;
        public PageRight(): boolean;
        public MakeVisible(uie: UIElement, rectangle: rect): rect;
        public SetHorizontalOffset(offset: number): boolean;
        public SetVerticalOffset(offset: number): boolean;
        public OnApplyTemplate(): void;
        private _UpdateClip(arrangeSize);
        private _CalculateTextBoxClipRect(arrangeSize);
        public MeasureOverride(availableSize: size): size;
        public ArrangeOverride(finalSize: size): size;
        private _UpdateExtents(viewport, extentWidth, extentHeight);
        private _ClampOffsets();
        private _ClampHorizontal(x);
        private _ClampVertical(y);
    }
}
declare module Fayde.Controls.Primitives {
    class RangeBase extends Control {
        static MinimumProperty: DependencyProperty;
        static MaximumProperty: DependencyProperty;
        static LargeChangeProperty: DependencyProperty;
        static SmallChangeProperty: DependencyProperty;
        static ValueProperty: DependencyProperty;
        public Minimum: number;
        public Maximum: number;
        public SmallChange: number;
        public LargeChange: number;
        public Value: number;
        public OnMinimumChanged(oldMin: number, newMin: number): void;
        public OnMaximumChanged(oldMax: number, newMax: number): void;
        public OnValueChanged(oldVal: number, newVal: number): void;
        public ValueChanged: RoutedPropertyChangedEvent<number>;
        private _Coercer;
        constructor();
    }
}
declare module Fayde.Controls.Primitives {
    class RepeatButton extends ButtonBase {
        static DelayProperty: DependencyProperty;
        static IntervalProperty: DependencyProperty;
        public Delay: number;
        public Interval: number;
        private _KeyboardCausingRepeat;
        private _MouseCausingRepeat;
        public _MousePosition: Point;
        private _IntervalID;
        private _NewInterval;
        private _ElementRoot;
        constructor();
        public OnApplyTemplate(): void;
        public OnDelayChanged(args: IDependencyPropertyChangedEventArgs): void;
        public OnIntervalChanged(args: IDependencyPropertyChangedEventArgs): void;
        public OnIsEnabledChanged(e: IDependencyPropertyChangedEventArgs): void;
        public OnKeyDown(e: Input.KeyEventArgs): void;
        public OnKeyUp(e: Input.KeyEventArgs): void;
        public OnLostFocus(e: RoutedEventArgs): void;
        public OnMouseEnter(e: Input.MouseEventArgs): void;
        public OnMouseLeave(e: Input.MouseEventArgs): void;
        public OnMouseLeftButtonDown(e: Input.MouseButtonEventArgs): void;
        public OnMouseLeftButtonUp(e: Input.MouseButtonEventArgs): void;
        public OnMouseMove(e: Input.MouseEventArgs): void;
        private _UpdateMousePosition(e);
        private _UpdateRepeatState();
        private _StartRepeatingAfterDelay();
        private _OnTimeout();
    }
}
declare module Fayde.Controls.Primitives {
    class Thumb extends Control {
        private _PreviousPosition;
        private _Origin;
        public DragCompleted: RoutedEvent<DragCompletedEventArgs>;
        public DragDelta: RoutedEvent<DragDeltaEventArgs>;
        public DragStarted: RoutedEvent<DragStartedEventArgs>;
        static IsDraggingProperty: DependencyProperty;
        static IsFocusedProperty: DependencyProperty;
        public IsDragging: boolean;
        public IsFocused: boolean;
        constructor();
        public OnApplyTemplate(): void;
        private OnDraggingChanged(args);
        public OnGotFocus(e: RoutedEventArgs): void;
        public OnLostFocus(e: RoutedEventArgs): void;
        private _FocusChanged(hasFocus);
        public OnLostMouseCapture(e: Input.MouseEventArgs): void;
        public OnMouseEnter(e: Input.MouseEventArgs): void;
        public OnMouseLeave(e: Input.MouseEventArgs): void;
        public OnMouseLeftButtonDown(e: Input.MouseButtonEventArgs): void;
        public OnMouseMove(e: Input.MouseEventArgs): void;
        public CancelDrag(): void;
        private _RaiseDragStarted();
        private _RaiseDragDelta(x, y);
        private _RaiseDragCompleted(canceled);
        public GoToStateCommon(gotoFunc: (state: string) => boolean): boolean;
    }
}
declare module Fayde.Controls.Primitives {
    class ScrollBar extends RangeBase {
        private _DragValue;
        public Scroll: RoutedEvent<ScrollEventArgs>;
        static OrientationProperty: DependencyProperty;
        static ViewportSizeProperty: DependencyProperty;
        public Orientation: Orientation;
        public ViewportSize: number;
        public IsDragging : boolean;
        constructor();
        private $HorizontalTemplate;
        private $HorizontalSmallIncrease;
        private $HorizontalSmallDecrease;
        private $HorizontalLargeIncrease;
        private $HorizontalLargeDecrease;
        private $HorizontalThumb;
        private $VerticalTemplate;
        private $VerticalSmallIncrease;
        private $VerticalSmallDecrease;
        private $VerticalLargeIncrease;
        private $VerticalLargeDecrease;
        private $VerticalThumb;
        public OnApplyTemplate(): void;
        public OnMaximumChanged(oldMax: number, newMax: number): void;
        public OnMinimumChanged(oldMin: number, newMin: number): void;
        public OnValueChanged(oldValue: number, newValue: number): void;
        private _OnThumbDragStarted(sender, e);
        private _OnThumbDragDelta(sender, e);
        private _OnThumbDragCompleted(sender, e);
        private _SmallDecrement(sender, e);
        private _SmallIncrement(sender, e);
        private _LargeDecrement(sender, e);
        private _LargeIncrement(sender, e);
        private _HandleSizeChanged(sender, e);
        private _OnOrientationChanged();
        private _UpdateTrackLayout();
        private _UpdateThumbSize(trackLength);
        private _GetTrackLength();
        private _ConvertViewportSizeToDisplayUnits(trackLength);
        private _RaiseScroll(type);
    }
}
declare module Fayde.Controls {
    class ScrollViewer extends ContentControl {
        private static _ScrollBarVisibilityChanged(d, args);
        static HorizontalScrollBarVisibilityProperty: DependencyProperty;
        static GetHorizontalScrollBarVisibility(d: DependencyObject): ScrollBarVisibility;
        static SetHorizontalScrollBarVisibility(d: DependencyObject, value: ScrollBarVisibility): void;
        public HorizontalScrollBarVisibility : ScrollBarVisibility;
        static VerticalScrollBarVisibilityProperty: DependencyProperty;
        static GetVerticalScrollBarVisibility(d: DependencyObject): ScrollBarVisibility;
        static SetVerticalScrollBarVisibility(d: DependencyObject, value: ScrollBarVisibility): void;
        public VerticalScrollBarVisibility : ScrollBarVisibility;
        static ComputedHorizontalScrollBarVisibilityProperty: DependencyProperty;
        static ComputedVerticalScrollBarVisibilityProperty: DependencyProperty;
        static HorizontalOffsetProperty: DependencyProperty;
        static VerticalOffsetProperty: DependencyProperty;
        static ScrollableWidthProperty: DependencyProperty;
        static ScrollableHeightProperty: DependencyProperty;
        static ViewportWidthProperty: DependencyProperty;
        static ViewportHeightProperty: DependencyProperty;
        static ExtentWidthProperty: DependencyProperty;
        static ExtentHeightProperty: DependencyProperty;
        public ComputedHorizontalScrollBarVisibility: Visibility;
        public ComputedVerticalScrollBarVisibility: Visibility;
        public HorizontalOffset: number;
        public VerticalOffset: number;
        public ScrollableWidth: number;
        public ScrollableHeight: number;
        public ViewportWidth: number;
        public ViewportHeight: number;
        public ExtentWidth: number;
        public ExtentHeight: number;
        public $TemplatedParentHandlesScrolling: boolean;
        public $ScrollContentPresenter: ScrollContentPresenter;
        private $HorizontalScrollBar;
        private $VerticalScrollBar;
        constructor();
        private _ScrollInfo;
        public ScrollInfo : Primitives.IScrollInfo;
        public InvalidateScrollInfo(): void;
        private _UpdateScrollBarVisibility();
        private _UpdateScrollBar(orientation, value);
        public OnApplyTemplate(): void;
        public OnMouseLeftButtonDown(e: Input.MouseButtonEventArgs): void;
        public OnMouseWheel(e: Input.MouseWheelEventArgs): void;
        public OnKeyDown(e: Input.KeyEventArgs): void;
        public ScrollInDirection(key: Input.Key): void;
        public ScrollToHorizontalOffset(offset: number): void;
        public ScrollToVerticalOffset(offset: number): void;
        public LineUp(): void;
        public LineDown(): void;
        public LineLeft(): void;
        public LineRight(): void;
        public PageHome(): void;
        public PageEnd(): void;
        public PageUp(): void;
        public PageDown(): void;
        public PageLeft(): void;
        public PageRight(): void;
        private _HandleScroll(orientation, e);
        private _HandleHorizontalScroll(e);
        private _HandleVerticalScroll(e);
    }
}
declare module Fayde.Controls {
    class ComboBox extends Primitives.Selector {
        public DropDownOpened: MulticastEvent<EventArgs>;
        public DropDownClosed: MulticastEvent<EventArgs>;
        static IsDropDownOpenProperty: DependencyProperty;
        static ItemContainerStyleProperty: DependencyProperty;
        static MaxDropDownHeightProperty: DependencyProperty;
        static IsSelectionActiveProperty: DependencyProperty;
        public IsDropDownOpen: boolean;
        public ItemContainerStyle: Style;
        public MaxDropDownHeight: number;
        private $ContentPresenter;
        private $Popup;
        private $DropDownToggle;
        private $DisplayedItem;
        private $SelectionBoxItem;
        private $SelectionBoxItemTemplate;
        private _NullSelFallback;
        private _FocusedIndex;
        constructor();
        private _IsDropDownOpenChanged(args);
        private _MaxDropDownHeightChanged(args);
        private _GetChildOfType(name, type);
        public OnApplyTemplate(): void;
        public OnItemContainerStyleChanged(args: IDependencyPropertyChangedEventArgs): void;
        public IsItemItsOwnContainer(item: any): boolean;
        public GetContainerForItem(): UIElement;
        public PrepareContainerForItem(container: UIElement, item: any): void;
        public GoToStateFocus(gotoFunc: (state: string) => boolean): boolean;
        public OnIsEnabledChanged(e: IDependencyPropertyChangedEventArgs): void;
        public OnMouseLeftButtonDown(e: Input.MouseButtonEventArgs): void;
        public OnMouseEnter(e: Input.MouseEventArgs): void;
        public OnMouseLeave(e: Input.MouseEventArgs): void;
        public OnKeyDown(e: Input.KeyEventArgs): void;
        public OnGotFocus(e: RoutedEventArgs): void;
        public OnLostFocus(e: RoutedEventArgs): void;
        private _OnChildKeyDown(sender, e);
        public OnSelectionChanged(e: Primitives.SelectionChangedEventArgs): void;
        private _OnToggleChecked(sender, e);
        private _OnToggleUnchecked(sender, e);
        private _PopupClickedOutside();
        private _UpdateDisplayedItem(selectedItem);
        private _UpdatePopupSizeAndPosition(sender, e);
        private _UpdatePopupMaxHeight(height);
    }
}
declare module Fayde.Controls {
    class ListBoxItem extends ContentControl {
        private _ParentSelector;
        public ParentSelector : Primitives.Selector;
        public ParentSelectorChanged: MulticastEvent<EventArgs>;
        static IsSelectedProperty: DependencyProperty;
        public IsSelected: boolean;
        constructor();
        public OnApplyTemplate(): void;
        public OnMouseLeftButtonDown(e: Input.MouseButtonEventArgs): void;
        public OnMouseEnter(e: Input.MouseEventArgs): void;
        public OnMouseLeave(e: Input.MouseEventArgs): void;
        public OnGotFocus(e: RoutedEventArgs): void;
        public OnLostFocus(e: RoutedEventArgs): void;
        public GoToStateSelection(gotoFunc: (state: string) => boolean): boolean;
        private OnIsSelectedChanged(args);
    }
}
declare module Fayde.Controls {
    class ComboBoxItem extends ListBoxItem {
        constructor();
        public OnMouseLeftButtonUp(e: Input.MouseButtonEventArgs): void;
    }
}
declare module Fayde.Controls {
    class ControlTemplate extends Xaml.FrameworkTemplate {
        public TargetType: Function;
        constructor();
        public GetVisualTree(bindingSource: DependencyObject): UIElement;
    }
}
declare module Fayde.Controls {
    class UserControl extends Control {
        static ContentProperty: DependencyProperty;
        public Content: any;
        public CreateLayoutUpdater(node: UINode): UserControlLayoutUpdater;
        public InitializeComponent(): void;
        private _InvalidateContent(args);
    }
    class UserControlLayoutUpdater extends LayoutUpdater {
        constructor(node: UINode);
        public MeasureOverride(availableSize: size, error: BError): size;
        public ArrangeOverride(finalSize: size, error: BError): size;
    }
}
declare module Fayde.Controls {
    class Page extends UserControl {
        static TitleProperty: DependencyProperty;
        public Title: string;
        constructor();
        static GetAsync(url: string): IAsyncRequest<Page>;
    }
}
declare module Fayde.Controls {
    class Frame extends ContentControl {
        static IsDeepLinkedProperty: DependencyProperty;
        static CurrentSourceProperty: DependencyProperty;
        static SourceProperty: DependencyProperty;
        static UriMapperProperty: DependencyProperty;
        public IsDeepLinked: boolean;
        public CurrentSource: Uri;
        public Source: Uri;
        public UriMapper: Navigation.UriMapper;
        private _NavService;
        constructor();
        public Navigate(uri: Uri): void;
        public GoForward(): void;
        public GoBackward(): void;
        public StopLoading(): void;
        private _FrameLoaded(sender, e);
        private _HandleDeepLink();
        private _LoadContent(source);
        private _HandleSuccess(page);
        private _HandleError(error);
        private _SetPage(page);
        private SourcePropertyChanged(args);
    }
}
declare module Fayde.Controls {
    class Grid extends Panel implements IRowDefinitionsListener, IColumnDefinitionsListener {
        public CreateLayoutUpdater(node: PanelNode): GridLayoutUpdater;
        private static _AttachedPropChanged(d, args);
        static ColumnProperty: DependencyProperty;
        static GetColumn(d: DependencyObject): number;
        static SetColumn(d: DependencyObject, value: number): void;
        static ColumnSpanProperty: DependencyProperty;
        static GetColumnSpan(d: DependencyObject): number;
        static SetColumnSpan(d: DependencyObject, value: number): void;
        static RowProperty: DependencyProperty;
        static GetRow(d: DependencyObject): number;
        static SetRow(d: DependencyObject, value: number): void;
        static RowSpanProperty: DependencyProperty;
        static GetRowSpan(d: DependencyObject): number;
        static SetRowSpan(d: DependencyObject, value: number): void;
        static ColumnDefinitionsProperty: ImmutableDependencyProperty<ColumnDefinitionCollection>;
        static RowDefinitionsProperty: ImmutableDependencyProperty<RowDefinitionCollection>;
        static ShowGridLinesProperty: DependencyProperty;
        public ShowGridLines: boolean;
        public ColumnDefinitions: ColumnDefinitionCollection;
        public RowDefinitions: RowDefinitionCollection;
        constructor();
        private _ShowGridLinesChanged(args);
        public RowDefinitionsChanged(rowDefinitions: RowDefinitionCollection): void;
        public ColumnDefinitionsChanged(colDefinitions: ColumnDefinitionCollection): void;
    }
    class GridLayoutUpdater extends PanelLayoutUpdater {
        private _Measurer;
        public MeasureOverride(availableSize: size, error: BError): size;
        public ArrangeOverride(finalSize: size, error: BError): size;
        public Render(ctx: RenderContextEx, region: rect): void;
        public ComputeExtents(actualSize: size): void;
    }
    interface ISegment {
        DesiredSize: number;
        OfferedSize: number;
        OriginalSize: number;
        Min: number;
        Max: number;
        Stars: number;
        Type: GridUnitType;
        Clamp: (value: number) => number;
        SetOfferedToDesired: () => number;
        SetDesiredToOffered: () => number;
    }
}
declare module Fayde.Controls {
    enum GridUnitType {
        Auto = 0,
        Pixel = 1,
        Star = 2,
    }
    class GridLength implements ICloneable {
        public Value: number;
        public Type: GridUnitType;
        constructor(value?: number, unitType?: GridUnitType);
        static Equals(gl1: GridLength, gl2: GridLength): boolean;
        public Clone(): GridLength;
    }
}
declare module Fayde.Controls {
    class HeaderedContentControl extends ContentControl {
        static HeaderProperty: DependencyProperty;
        public Header: any;
        static HeaderTemplateProperty: DependencyProperty;
        public HeaderTemplate: DataTemplate;
        constructor();
        public OnHeaderChanged(oldHeader: any, newHeader: any): void;
        public OnHeaderTemplateChanged(oldHeaderTemplate: DataTemplate, newHeaderTemplate: DataTemplate): void;
    }
}
declare module Fayde.Controls {
    class HyperlinkButton extends Primitives.ButtonBase {
        static NavigateUriProperty: DependencyProperty;
        static TargetNameProperty: DependencyProperty;
        public NavigateUri: Uri;
        public TargetName: string;
        constructor();
        public OnApplyTemplate(): void;
        public OnClick(): void;
        private _Navigate();
    }
}
declare module Fayde.Media {
    enum BrushMappingMode {
        Absolute = 0,
        RelativeToBoundingBox = 1,
    }
    enum GradientSpreadMethod {
        Pad = 0,
        Reflect = 1,
        Repeat = 2,
    }
    enum Stretch {
        None = 0,
        Fill = 1,
        Uniform = 2,
        UniformToFill = 3,
    }
    enum AlignmentX {
        Left = 0,
        Center = 1,
        Right = 2,
    }
    enum AlignmentY {
        Top = 0,
        Center = 1,
        Bottom = 2,
    }
    enum TextHintingMode {
        Fixed = 0,
        Animated = 1,
    }
}
declare module Fayde.Controls {
    class Image extends FrameworkElement implements Media.Imaging.IImageChangedListener {
        public CreateLayoutUpdater(node: UINode): ImageLayoutUpdater;
        private static _SourceCoercer(d, propd, value);
        static SourceProperty: DependencyProperty;
        static StretchProperty: DependencyProperty;
        public Source: Media.Imaging.ImageSource;
        public Stretch: Media.Stretch;
        public ImageOpened: MulticastEvent<EventArgs>;
        public ImageFailed: MulticastEvent<EventArgs>;
        public MeasureOverride(availableSize: size): size;
        public ArrangeOverride(finalSize: size): size;
        private _SourceChanged(args);
        public OnImageErrored(source: Media.Imaging.BitmapSource, e: Event): void;
        public OnImageLoaded(source: Media.Imaging.BitmapSource, e: Event): void;
        public ImageChanged(source: Media.Imaging.BitmapSource): void;
    }
    class ImageLayoutUpdater extends LayoutUpdater {
        constructor(node: UINode);
        public InsideObject(ctx: RenderContextEx, x: number, y: number): boolean;
        public ComputeActualSize(): size;
        public Render(ctx: RenderContextEx, region: rect): void;
    }
    interface IImageRenderMetrics {
        Matrix: number[];
        Overlap: number;
    }
}
declare module Fayde.Controls.Internal {
    interface IItemContainersOwner {
        PrepareContainerForItem(container: UIElement, item: any): any;
        ClearContainerForItem(container: UIElement, item: any): any;
        GetContainerForItem(): UIElement;
        IsItemItsOwnContainer(item: any): boolean;
    }
    interface IItemContainersManager {
        IsRecycling: boolean;
        IndexFromContainer(container: UIElement): number;
        ContainerFromIndex(index: number): UIElement;
        ItemFromContainer(container: UIElement): any;
        ContainerFromItem(item: any): UIElement;
        OnItemsAdded(index: number, newItems: any[]): any;
        OnItemsRemoved(index: number, oldItems: any[]): any;
        DisposeContainers(index?: number, count?: number): UIElement[];
        CreateGenerator(index: number, count: number): IContainerGenerator;
        GetEnumerator(index?: number, count?: number): IContainerEnumerator;
    }
    class ItemContainersManager implements IItemContainersManager {
        public Owner: IItemContainersOwner;
        private _Items;
        private _Containers;
        private _Cache;
        public IsRecycling: boolean;
        constructor(Owner: IItemContainersOwner);
        public IndexFromContainer(container: UIElement): number;
        public ContainerFromIndex(index: number): UIElement;
        public ItemFromContainer(container: UIElement): any;
        public ContainerFromItem(item: any): UIElement;
        public OnItemsAdded(index: number, newItems: any[]): void;
        public OnItemsRemoved(index: number, oldItems: any[]): void;
        public DisposeContainers(index?: number, count?: number): UIElement[];
        public CreateGenerator(index: number, count: number): IContainerGenerator;
        public GetEnumerator(start?: number, count?: number): IContainerEnumerator;
    }
    interface IContainerGenerator {
        IsCurrentNew: boolean;
        Current: UIElement;
        CurrentItem: any;
        CurrentIndex: number;
        GenerateIndex: number;
        Generate(): boolean;
    }
    interface IContainerEnumerator extends IEnumerator<UIElement> {
        CurrentItem: any;
        CurrentIndex: number;
    }
}
declare module Fayde.Controls.Internal {
    interface IRange {
        Minimum: number;
        Maximum: number;
        Value: number;
        OnMinimumChanged(oldMin: number, newMin: number): any;
        OnMaximumChanged(oldMax: number, newMax: number): any;
        OnValueChanged(oldVal: number, newVal: number): any;
    }
    interface IRangeCoercer {
        OnMinimumChanged(oldMinimum: number, newMinimum: number): any;
        OnMaximumChanged(oldMaximum: number, newMaximum: number): any;
        OnValueChanged(oldValue: number, newValue: number): any;
    }
    class RangeCoercer implements IRangeCoercer {
        public Range: IRange;
        public OnCoerceMaximum: (val: any) => void;
        public OnCoerceValue: (val: any) => void;
        public InitialMax: number;
        public InitialVal: number;
        public RequestedMax: number;
        public RequestedVal: number;
        public PreCoercedMax: number;
        public PreCoercedVal: number;
        public CoerceDepth: number;
        public Minimum : number;
        public Maximum : number;
        public Value : number;
        constructor(Range: IRange, OnCoerceMaximum: (val: any) => void, OnCoerceValue: (val: any) => void);
        public OnMinimumChanged(oldMinimum: number, newMinimum: number): void;
        public OnMaximumChanged(oldMaximum: number, newMaximum: number): void;
        public OnValueChanged(oldValue: number, newValue: number): void;
        public CoerceMaximum(): void;
        public CoerceValue(): void;
    }
}
declare module Fayde.Controls {
    interface IItemCollection {
        ItemsChanged: MulticastEvent<Collections.CollectionChangedEventArgs>;
        ToArray(): any[];
        Count: number;
        GetValueAt(index: number): any;
        GetRange(startIndex: number, endIndex: number): any[];
        SetValueAt(index: number, value: any): any;
        Contains(value: any): boolean;
        IndexOf(value: any): number;
        Add(value: any): any;
        AddRange(values: any[]): any;
        Insert(index: number, value: any): any;
        Remove(value: any): any;
        RemoveAt(index: number): any;
        Clear(): any;
    }
    class ItemCollection extends XamlObjectCollection<any> implements IItemCollection {
        public ItemsChanged: MulticastEvent<Collections.CollectionChangedEventArgs>;
        public ToArray(): any[];
        public Count : number;
        public IsReadOnly: boolean;
        public GetValueAt(index: number): XamlObject;
        public GetRange(startIndex: number, endIndex: number): XamlObject[];
        public SetValueAt(index: number, value: XamlObject): boolean;
        public SetValueAtImpl(index: number, value: any): void;
        public Add(value: XamlObject): number;
        public AddImpl(value: any): number;
        public AddRange(values: any[]): void;
        public AddRangeImpl(values: any[]): void;
        public Insert(index: number, value: XamlObject): boolean;
        public InsertImpl(index: number, value: XamlObject): void;
        public IndexOf(value: XamlObject): number;
        public Contains(value: XamlObject): boolean;
        public Remove(value: XamlObject): boolean;
        public RemoveImpl(value: XamlObject): void;
        public RemoveAt(index: number): boolean;
        public RemoveAtImpl(index: number): void;
        public Clear(): boolean;
        public ClearImpl(): void;
        private _ValidateReadOnly();
    }
}
declare module Fayde.Controls {
    class ItemsPanelTemplate extends Xaml.FrameworkTemplate {
        constructor();
        public GetVisualTree(bindingSource: DependencyObject): Panel;
    }
}
declare module Fayde.Controls {
    class ItemsPresenterNode extends FENode {
        public XObject: ItemsPresenter;
        constructor(xobj: ItemsPresenter);
        private _ElementRoot;
        public ElementRoot : Panel;
        public DoApplyTemplateWithError(error: BError): boolean;
    }
    class ItemsPresenter extends FrameworkElement {
        public TemplateOwner: ItemsControl;
        public XamlNode: ItemsPresenterNode;
        public CreateNode(): ItemsPresenterNode;
        public ItemsControl : ItemsControl;
        public Panel : Panel;
        static Get(panel: Panel): ItemsPresenter;
        public OnItemsAdded(index: number, newItems: any[]): void;
        public OnItemsRemoved(index: number, oldItems: any[]): void;
    }
}
declare module Fayde.Controls {
    class ListBox extends Primitives.Selector {
        private _FocusedIndex;
        static ItemContainerStyleProperty: DependencyProperty;
        static IsSelectionActiveProperty: DependencyProperty;
        public ItemContainerStyle: Style;
        public ScrollIntoView(item: any): void;
        private _NavigateByPage(forward);
        private _ScrollInDirection(key);
        private _IsOnCurrentPage(item, itemsHostRectOut?, listBoxItemsRectOut?);
        private _GetFirstItemOnCurrentPage(startingIndex, forward);
        public OnItemContainerStyleChanged(args: IDependencyPropertyChangedEventArgs): void;
        public OnKeyDown(args: Input.KeyEventArgs): void;
        private _GetIsVerticalOrientation();
        public IsItemItsOwnContainer(item: any): boolean;
        public GetContainerForItem(): UIElement;
        public PrepareContainerForItem(element: UIElement, item: any): void;
        public OnGotFocus(e: RoutedEventArgs): void;
        public OnLostFocus(e: RoutedEventArgs): void;
        public NotifyListItemGotFocus(lbi: ListBoxItem): void;
        public NotifyListItemLostFocus(lbi: ListBoxItem): void;
    }
}
declare module Fayde.Controls {
    class MediaElement extends FrameworkElement {
        public CreateLayoutUpdater(node: UINode): MediaElementLayoutUpdater;
    }
    class MediaElementLayoutUpdater extends LayoutUpdater {
        public InsideObject(ctx: RenderContextEx, x: number, y: number): boolean;
        public MeasureOverride(availableSize: size, error: BError): size;
        public ArrangeOverride(finalSize: size, error: BError): size;
    }
}
declare module Fayde {
    class RoutedEventArgs extends EventArgs {
        public Handled: boolean;
        public Source: any;
        public OriginalSource: any;
    }
}
declare module Fayde.Input {
    enum Key {
        None = 0,
        Back = 1,
        Tab = 2,
        Enter = 3,
        Shift = 4,
        Ctrl = 5,
        Alt = 6,
        CapsLock = 7,
        Escape = 8,
        Space = 9,
        PageUp = 10,
        PageDown = 11,
        End = 12,
        Home = 13,
        Left = 14,
        Up = 15,
        Right = 16,
        Down = 17,
        Insert = 18,
        Delete = 19,
        D0 = 20,
        D1 = 21,
        D2 = 22,
        D3 = 23,
        D4 = 24,
        D5 = 25,
        D6 = 26,
        D7 = 27,
        D8 = 28,
        D9 = 29,
        A = 30,
        B = 31,
        C = 32,
        D = 33,
        E = 34,
        F = 35,
        G = 36,
        H = 37,
        I = 38,
        J = 39,
        K = 40,
        L = 41,
        M = 42,
        N = 43,
        O = 44,
        P = 45,
        Q = 46,
        R = 47,
        S = 48,
        T = 49,
        U = 50,
        V = 51,
        W = 52,
        X = 53,
        Y = 54,
        Z = 55,
        F1 = 56,
        F2 = 57,
        F3 = 58,
        F4 = 59,
        F5 = 60,
        F6 = 61,
        F7 = 62,
        F8 = 63,
        F9 = 64,
        F10 = 65,
        F11 = 66,
        F12 = 67,
        NumPad0 = 68,
        NumPad1 = 69,
        NumPad2 = 70,
        NumPad3 = 71,
        NumPad4 = 72,
        NumPad5 = 73,
        NumPad6 = 74,
        NumPad7 = 75,
        NumPad8 = 76,
        NumPad9 = 77,
        Multiply = 78,
        Add = 79,
        Subtract = 80,
        Decimal = 81,
        Divide = 82,
        Unknown = 255,
    }
    class KeyboardEventArgs extends RoutedEventArgs {
    }
    class KeyEventArgs extends KeyboardEventArgs {
        public Modifiers: IModifiersOn;
        public PlatformKeyCode: number;
        public Key: Key;
        public Char: string;
        constructor(modifiers: IModifiersOn, keyCode: number, key: Key, c?: string);
    }
}
declare module Fayde.Controls {
    enum TextBoxModelChangedType {
        Nothing = 0,
        TextAlignment = 1,
        TextWrapping = 2,
        Selection = 3,
        Brush = 4,
        Font = 5,
        Text = 6,
    }
    enum TextBoxEmitChangedType {
        NOTHING = 0,
        SELECTION,
        TEXT,
    }
    interface ITextModelArgs {
        Changed: TextBoxModelChangedType;
        NewValue: any;
    }
    interface ITextModelListener {
        OnTextModelChanged(args: ITextModelArgs): any;
    }
    class TextBoxBase extends Control implements Text.ITextAttributesSource, Text.IBufferOwner {
        private _Undo;
        private _Redo;
        public _Buffer: string;
        private _Emit;
        private _NeedIMReset;
        private _Selecting;
        private _Captured;
        private _SettingValue;
        private _SelectionCursor;
        private _SelectionAnchor;
        private _SelectedText;
        private _EventsMask;
        private _TextProperty;
        private _Font;
        private _CursorOffset;
        private _Batch;
        public $View: Internal.TextBoxView;
        public $ContentElement: FrameworkElement;
        public $IsReadOnly: boolean;
        public $IsFocused: boolean;
        public $AcceptsReturn: boolean;
        public $MaxLength: number;
        public $HasOffset: boolean;
        constructor(eventsMask: TextBoxEmitChangedType, textPropd: DependencyProperty);
        public Cursor : CursorType;
        public SelectionCursor : number;
        public HasSelectedText : boolean;
        public CaretBrush: Media.Brush;
        public TextAlignment: TextAlignment;
        public TextWrapping: TextWrapping;
        public SelectionStart: number;
        public SelectionLength: number;
        public DisplayText : string;
        public SelectionBackground: Media.Brush;
        public SelectionForeground: Media.Brush;
        public Background: Media.Brush;
        public Foreground: Media.Brush;
        public Font : Font;
        public Direction : FlowDirection;
        public TextDecorations : TextDecorations;
        public OnApplyTemplate(): void;
        private _ModelListener;
        public Listen(listener: ITextModelListener): void;
        public Unlisten(listener: ITextModelListener): void;
        public _ModelChanged(type: TextBoxModelChangedType, newValue: any): void;
        private _UpdateFont();
        public _SelectedTextChanged(newValue: string): void;
        public _SelectionStartChanged(newValue: number): void;
        public _SelectionLengthChanged(newValue: number): void;
        public _TextChanged(newValue: string): void;
        private _BatchPush();
        private _BatchPop();
        private _SyncAndEmit(syncText?);
        private _SyncText();
        public _EmitTextChanged(): void;
        public SelectAll(): void;
        public ClearSelection(start: number): void;
        public Select(start: number, length: number): boolean;
        private _SyncSelectedText();
        public _EmitSelectionChanged(): void;
        public _ResetIMContext(): void;
        public CanUndo(): boolean;
        public Undo(): void;
        public CanRedo(): boolean;
        public Redo(): void;
        public OnLostFocus(e: RoutedEventArgs): void;
        public OnGotFocus(e: RoutedEventArgs): void;
        public OnMouseLeftButtonDown(e: Input.MouseButtonEventArgs): void;
        public OnMouseLeftButtonUp(e: Input.MouseButtonEventArgs): void;
        public OnMouseMove(e: Input.MouseEventArgs): void;
        public CursorDown(cursor: number, isPage: boolean): number;
        public CursorUp(cursor: number, isPage: boolean): number;
        public CursorNextWord(cursor: number): number;
        public CursorPrevWord(cursor: number): number;
        public CursorLineBegin(cursor: number): number;
        public CursorLineEnd(cursor: number): number;
        public _EmitCursorPositionChanged(height: number, x: number, y: number): void;
        public OnKeyDown(args: Input.KeyEventArgs): void;
        public PostOnKeyDown(args: Input.KeyEventArgs): void;
        private _KeyDownBackSpace(modifiers);
        private _KeyDownDelete(modifiers);
        private _KeyDownPageDown(modifiers);
        private _KeyDownPageUp(modifiers);
        private _KeyDownHome(modifiers);
        private _KeyDownEnd(modifiers);
        private _KeyDownLeft(modifiers);
        private _KeyDownRight(modifiers);
        private _KeyDownDown(modifiers);
        private _KeyDownUp(modifiers);
        private _KeyDownChar(c);
    }
}
declare module Fayde.Controls {
    class PasswordBox extends TextBoxBase implements Text.ITextAttributesSource {
        static BaselineOffsetProperty: DependencyProperty;
        static CaretBrushProperty: DependencyProperty;
        static MaxLengthProperty: DependencyProperty;
        static PasswordCharProperty: DependencyProperty;
        static PasswordProperty: DependencyProperty;
        static SelectionForegroundProperty: DependencyProperty;
        static SelectionBackgroundProperty: DependencyProperty;
        static SelectionLengthProperty: DependencyProperty;
        static SelectionStartProperty: DependencyProperty;
        public BaselineOffset: number;
        public CaretBrush: Media.Brush;
        public MaxLength: any;
        public number: any;
        public PasswordChar: string;
        public Password: string;
        public SelectionForeground: Media.Brush;
        public SelectionBackground: Media.Brush;
        public SelectionLength: number;
        public SelectionStart: number;
        public PasswordChangedEvent: RoutedEvent<RoutedEventArgs>;
        constructor();
        public DisplayText : string;
        public CursorDown(cursor: number, isPage: boolean): number;
        public CursorUp(cursor: number, isPage: boolean): number;
        public CursorNextWord(cursor: number): number;
        public CursorPrevWord(cursor: number): number;
        public CursorLineBegin(cursor: number): number;
        public CursorLineEnd(cursor: number): number;
        public _EmitTextChanged(): void;
        private _SelectionBackgroundListener;
        private _SelectionBackgroundChanged(args);
        private _SelectionForegroundListener;
        private _SelectionForegroundChanged(args);
    }
}
declare module Fayde.Controls.Primitives {
    class DragCompletedEventArgs extends RoutedEventArgs {
        public HorizontalChange: number;
        public VerticalChange: number;
        public Canceled: boolean;
        constructor(horizontal: number, vertical: number, canceled: boolean);
    }
    class DragDeltaEventArgs extends RoutedEventArgs {
        public HorizontalChange: number;
        public VerticalChange: number;
        constructor(horizontal: number, vertical: number);
    }
    class DragStartedEventArgs extends RoutedEventArgs {
        public HorizontalOffset: number;
        public VerticalOffset: number;
        constructor(horizontal: number, vertical: number);
    }
}
declare module Fayde.Controls.Primitives {
    class ScrollData {
        public CanHorizontallyScroll: boolean;
        public CanVerticallyScroll: boolean;
        public ScrollOwner: ScrollViewer;
        public OffsetX: number;
        public OffsetY: number;
        public CachedOffsetX: number;
        public CachedOffsetY: number;
        public ViewportWidth: number;
        public ViewportHeight: number;
        public ExtentWidth: number;
        public ExtentHeight: number;
        public MaxDesiredWidth: number;
        public MaxDesiredHeight: number;
    }
}
declare module Fayde.Controls.Primitives {
    enum ScrollEventType {
        SmallDecrement = 0,
        SmallIncrement = 1,
        LargeDecrement = 2,
        LargeIncrement = 3,
        ThumbPosition = 4,
        ThumbTrack = 5,
        First = 6,
        Last = 7,
        EndScroll = 8,
    }
    class ScrollEventArgs extends RoutedEventArgs {
        public ScrollEventType: ScrollEventType;
        public Value: number;
        constructor(scrollEventType: ScrollEventType, value: number);
    }
}
declare module Fayde.Controls.Primitives {
    class SelectionChangedEventArgs extends RoutedEventArgs {
        public OldValues: any[];
        public NewValues: any[];
        constructor(oldValues: any[], newValues: any[]);
    }
}
declare module Fayde.Controls.Primitives {
    class SelectorSelection {
        private _Owner;
        private _SelectedItems;
        private _SelectedItem;
        private _IsUpdating;
        private _AnchorIndex;
        public Mode: SelectionMode;
        public IsUpdating : boolean;
        constructor(owner: Selector);
        private _HandleOwnerSelectionChanged(sender, e);
        public RepopulateSelectedItems(): void;
        public ClearSelection(ignoreSelectedValue?: boolean): void;
        public Select(item: any): void;
        private _SelectSingle(item, selIndex);
        private _SelectExtended(item, selIndex);
        private _SelectMultiple(item, selIndex);
        public SelectRange(startIndex: number, endIndex: number): void;
        public SelectAll(items: any[]): void;
        public SelectOnly(item: any): void;
        public Unselect(item: any): void;
        public AddToSelected(item: any): void;
        public RemoveFromSelected(item: any): void;
        public ReplaceSelection(item: any): void;
        public UpdateSelectorProperties(item: any, index: number, value: any): void;
        public UpdateCollectionView(item: any): boolean;
    }
}
declare module Fayde.Controls {
    class ProgressBar extends Primitives.RangeBase {
        private _Track;
        private _Indicator;
        static IsIndeterminateProperty: DependencyProperty;
        public IsIndeterminate: boolean;
        private OnIsIndeterminateChanged(args);
        public OnMinimumChanged(oldMinimum: number, newMinimum: number): void;
        public OnMaximumChanged(oldMaximum: number, newMaximum: number): void;
        public OnValueChanged(oldValue: number, newValue: number): void;
        constructor();
        public OnApplyTemplate(): void;
        public GoToStates(gotoFunc: (state: string) => boolean): void;
        private _OnTrackSizeChanged(sender, e);
        private _UpdateIndicator();
    }
}
declare module Fayde.Controls {
    class RadioButton extends Primitives.ToggleButton {
        static GroupNameProperty: DependencyProperty;
        public GroupName: string;
        public OnGroupNameChanged(args: IDependencyPropertyChangedEventArgs): void;
        constructor();
        public OnIsCheckedChanged(e: IDependencyPropertyChangedEventArgs): void;
        public OnToggle(): void;
        public UpdateRadioButtonGroup(): void;
    }
}
declare module Fayde.Controls {
    class _RichTextBoxView {
    }
    class RichTextBox extends Control {
        public HorizontalScrollBarVisibility: ScrollBarVisibility;
        public TextWrapping: TextWrapping;
    }
}
declare module Fayde.Controls {
    interface IRowDefinitionListener {
        RowDefinitionChanged(rowDefinition: RowDefinition): any;
    }
    class RowDefinition extends DependencyObject {
        static HeightProperty: DependencyProperty;
        static MaxHeightProperty: DependencyProperty;
        static MinHeightProperty: DependencyProperty;
        static ActualHeightProperty: DependencyProperty;
        public Height: GridLength;
        public MaxHeight: number;
        public MinHeight: number;
        public ActualHeight: number;
        private _Listener;
        public Listen(listener: IRowDefinitionListener): void;
        public Unlisten(listener: IRowDefinitionListener): void;
        private _HeightsChanged(args);
    }
    interface IRowDefinitionsListener {
        RowDefinitionsChanged(rowDefinitions: RowDefinitionCollection): any;
    }
    class RowDefinitionCollection extends XamlObjectCollection<RowDefinition> implements IRowDefinitionListener {
        private _Listener;
        public Listen(listener: IRowDefinitionsListener): void;
        public Unlisten(listener: IRowDefinitionsListener): void;
        public RowDefinitionChanged(rowDefinition: RowDefinition): void;
        public AddingToCollection(value: RowDefinition, error: BError): boolean;
        public RemovedFromCollection(value: RowDefinition, isValueSafe: boolean): void;
    }
}
declare module Fayde.Controls {
    class Slider extends Primitives.RangeBase {
        private _DragValue;
        static IsDirectionReversedProperty: DependencyProperty;
        static IsFocusedProperty: DependencyProperty;
        static OrientationProperty: DependencyProperty;
        public IsDirectionReversed: boolean;
        public IsFocused: boolean;
        public Orientation: Orientation;
        constructor();
        private $HorizontalTemplate;
        private $HorizontalLargeIncrease;
        private $HorizontalLargeDecrease;
        private $HorizontalThumb;
        private $VerticalTemplate;
        private $VerticalLargeIncrease;
        private $VerticalLargeDecrease;
        private $VerticalThumb;
        public OnApplyTemplate(): void;
        public OnIsEnabledChanged(e: IDependencyPropertyChangedEventArgs): void;
        public OnMinimumChanged(oldMin: number, newMin: number): void;
        public OnMaximumChanged(oldMax: number, newMax: number): void;
        public OnValueChanged(oldValue: number, newValue: number): void;
        private _HandleSizeChanged(sender, e);
        private _OnOrientationChanged();
        private _UpdateTrackLayout();
        private _OnThumbDragStarted(sender, e);
        private _OnThumbDragDelta(sender, e);
        public OnMouseEnter(e: Input.MouseEventArgs): void;
        public OnMouseLeave(e: Input.MouseEventArgs): void;
        public OnMouseLeftButtonDown(e: Input.MouseButtonEventArgs): void;
        public OnLostMouseCapture(e: Input.MouseEventArgs): void;
        public OnKeyDown(e: Input.KeyEventArgs): void;
        public OnGotFocus(e: RoutedEventArgs): void;
        public OnLostFocus(e: RoutedEventArgs): void;
    }
}
declare module Fayde.Controls {
    class StackPanel extends Panel {
        public CreateLayoutUpdater(node: PanelNode): StackPanelLayoutUpdater;
        static OrientationProperty: DependencyProperty;
        public Orientation: Orientation;
        private _OrientationChanged(args);
    }
    class StackPanelLayoutUpdater extends PanelLayoutUpdater {
        public MeasureOverride(availableSize: size, error: BError): size;
        public ArrangeOverride(finalSize: size, error: BError): size;
    }
}
declare module Fayde.Controls {
    class TextBlockNode extends FENode implements Documents.IInlinesChangedListener {
        public XObject: TextBlock;
        private _ActualWidth;
        private _ActualHeight;
        public _Layout: Text.TextLayout;
        private _WasSet;
        private _Dirty;
        private _Font;
        private _SetsValue;
        constructor(xobj: TextBlock);
        public GetInheritedEnumerator(): IEnumerator<DONode>;
        public Measure(constraint: size): size;
        public Arrange(constraint: size, padding: Thickness): void;
        public Layout(constraint: size): void;
        public ComputeActualSize(lu: LayoutUpdater, padding: Thickness): size;
        public Render(ctx: RenderContextEx): void;
        public _FontChanged(args: IDependencyPropertyChangedEventArgs): void;
        public _TextChanged(args: IDependencyPropertyChangedEventArgs): void;
        public _LineStackingStrategyChanged(args: IDependencyPropertyChangedEventArgs): void;
        public _LineHeightChanged(args: IDependencyPropertyChangedEventArgs): void;
        public _TextAlignmentChanged(args: IDependencyPropertyChangedEventArgs): void;
        public _TextTrimmingChanged(args: IDependencyPropertyChangedEventArgs): void;
        public _TextWrappingChanged(args: IDependencyPropertyChangedEventArgs): void;
        public _InvalidateDirty(setDirty?: boolean): void;
        private _UpdateFont(force?);
        private _UpdateFonts(force?);
        private _UpdateLayoutAttributes();
        private _UpdateLayoutAttributesForInline(item, length, runs);
        private _GetTextInternal(inlines);
        private _SetTextInternal(text);
        public InlinesChanged(newInline: Documents.Inline, isAdd: boolean): void;
    }
    class TextBlock extends FrameworkElement implements IFontChangeable {
        public XamlNode: TextBlockNode;
        public CreateNode(): TextBlockNode;
        public CreateLayoutUpdater(node: TextBlockNode): TextBlockLayoutUpdater;
        static PaddingProperty: DependencyProperty;
        static FontFamilyProperty: DependencyProperty;
        static FontSizeProperty: DependencyProperty;
        static FontStretchProperty: DependencyProperty;
        static FontStyleProperty: DependencyProperty;
        static FontWeightProperty: DependencyProperty;
        static ForegroundProperty: DependencyProperty;
        static TextDecorationsProperty: DependencyProperty;
        static TextProperty: DependencyProperty;
        static InlinesProperty: ImmutableDependencyProperty<Documents.InlineCollection>;
        static LineStackingStrategyProperty: DependencyProperty;
        static LineHeightProperty: DependencyProperty;
        static TextAlignmentProperty: DependencyProperty;
        static TextTrimmingProperty: DependencyProperty;
        static TextWrappingProperty: DependencyProperty;
        public Padding: Thickness;
        public Foreground: Media.Brush;
        public FontFamily: string;
        public FontStretch: string;
        public FontStyle: string;
        public FontWeight: FontWeight;
        public FontSize: number;
        public TextDecorations: TextDecorations;
        public Text: string;
        public Inlines: Documents.InlineCollection;
        public LineStackingStrategy: LineStackingStrategy;
        public LineHeight: number;
        public TextAlignment: TextAlignment;
        public TextTrimming: TextTrimming;
        public TextWrapping: TextWrapping;
        constructor();
        public MeasureOverride(availableSize: size): size;
        public ArrangeOverride(finalSize: size): size;
        private _ForegroundListener;
        public FontChanged(args: IDependencyPropertyChangedEventArgs): void;
        public IsInheritable(propd: DependencyProperty): boolean;
    }
    class TextBlockLayoutUpdater extends LayoutUpdater {
        public ComputeActualSize(): size;
        public ComputeExtents(actualSize: size): void;
        public Render(ctx: RenderContextEx, region: rect): void;
    }
}
declare module Fayde.Controls {
    class TextBox extends TextBoxBase implements Text.ITextAttributesSource, IFontChangeable {
        static AcceptsReturnProperty: DependencyProperty;
        static CaretBrushProperty: DependencyProperty;
        static MaxLengthProperty: DependencyProperty;
        static IsReadOnlyProperty: DependencyProperty;
        static SelectionForegroundProperty: DependencyProperty;
        static SelectionBackgroundProperty: DependencyProperty;
        static BaselineOffsetProperty: DependencyProperty;
        static SelectionLengthProperty: DependencyProperty;
        static SelectionStartProperty: DependencyProperty;
        static TextProperty: DependencyProperty;
        static TextAlignmentProperty: DependencyProperty;
        static TextWrappingProperty: DependencyProperty;
        static HorizontalScrollBarVisibilityProperty: DependencyProperty;
        static VerticalScrollBarVisibilityProperty: DependencyProperty;
        public AcceptsReturn: boolean;
        public CaretBrush: Media.Brush;
        public MaxLength: number;
        public IsReadOnly: boolean;
        public BaselineOffset: number;
        public SelectionLength: number;
        public SelectionStart: number;
        public Text: string;
        public TextAlignment: TextAlignment;
        public TextWrapping: TextWrapping;
        public HorizontalScrollBarVisibility: ScrollBarVisibility;
        public VerticalScrollBarVisibility: ScrollBarVisibility;
        public SelectionForeground: Media.Brush;
        public SelectionBackground: Media.Brush;
        public SelectionChanged: RoutedEvent<RoutedEventArgs>;
        public TextChanged: RoutedEvent<RoutedEventArgs>;
        constructor();
        public OnApplyTemplate(): void;
        public DisplayText : string;
        public CursorDown(cursor: number, isPage: boolean): number;
        public CursorUp(cursor: number, isPage: boolean): number;
        public CursorNextWord(cursor: number): number;
        public CursorPrevWord(cursor: number): number;
        public CursorLineBegin(cursor: number): number;
        public CursorLineEnd(cursor: number): number;
        public _EmitTextChanged(): void;
        public _EmitSelectionChanged(): void;
        private _IsReadOnlyChanged(args);
        public FontChanged(args: IDependencyPropertyChangedEventArgs): void;
        private _SelectionBackgroundListener;
        private _SelectionBackgroundChanged(args);
        private _SelectionForegroundListener;
        private _SelectionForegroundChanged(args);
        private _TextAlignmentChanged(args);
        private _TextWrappingChanged(args);
        private _HorizontalScrollBarVisibilityChanged(args);
        private _VerticalScrollBarVisibilityChanged(args);
        public OnMouseEnter(e: Input.MouseEventArgs): void;
        public OnMouseLeave(e: Input.MouseEventArgs): void;
        public OnGotFocus(e: RoutedEventArgs): void;
        public OnLostFocus(e: RoutedEventArgs): void;
        public GoToStateCommon(gotoFunc: (state: string) => boolean): boolean;
    }
}
declare module Fayde.Controls.Internal {
    class TextBoxView extends FrameworkElement implements ITextModelListener {
        public CreateLayoutUpdater(node: UINode): TextBoxViewLayoutUpdater;
        private _Cursor;
        private _Layout;
        private _SelectionChanged;
        private _HadSelectedText;
        private _CursorVisible;
        private _EnableCursor;
        private _BlinkTimeout;
        private _TextBox;
        private _Dirty;
        public SetTextBox(textBox: TextBoxBase): void;
        public SetEnableCursor(value: boolean): void;
        public _Blink(): boolean;
        public _ConnectBlinkTimeout(multiplier: any): void;
        public _DisconnectBlinkTimeout(): void;
        public _GetCursorBlinkTimeout(): number;
        public _ResetCursorBlink(delay: boolean): void;
        private _DelayCursorBlink();
        private _BeginCursorBlink();
        private _EndCursorBlink();
        private _InvalidateCursor();
        private _ShowCursor();
        private _HideCursor();
        private _UpdateCursor(invalidate);
        private _UpdateText();
        public MeasureOverride(availableSize: size): size;
        public ArrangeOverride(finalSize: size): size;
        public Layout(constraint: size): void;
        public GetBaselineOffset(): number;
        public GetLineFromY(y: number): Text.TextLayoutLine;
        public GetLineFromIndex(index: number): Text.TextLayoutLine;
        public GetCursorFromXY(x: number, y: number): number;
        public OnLostFocus(e: any): void;
        public OnGotFocus(e: any): void;
        public OnMouseLeftButtonDown(e: any): void;
        public OnMouseLeftButtonUp(e: any): void;
        public OnTextModelChanged(args: ITextModelArgs): void;
        public ComputeActualExtents(): size;
        public PreRender(): void;
        public Render(ctx: RenderContextEx, region: rect, renderSize: size): void;
    }
    class TextBoxViewLayoutUpdater extends LayoutUpdater {
        public ComputeActualSize(): size;
        public Render(ctx: RenderContextEx, region: rect): void;
    }
}
declare module Fayde.Controls {
    class ToolTip extends ContentControl {
        static HorizontalOffsetProperty: DependencyProperty;
        static VerticalOffsetProperty: DependencyProperty;
        static IsOpenProperty: DependencyProperty;
        static PlacementProperty: DependencyProperty;
        static PlacementTargetProperty: DependencyProperty;
        public HorizontalOffset: number;
        public VerticalOffset: number;
        public IsOpen: boolean;
        public Placement: PlacementMode;
        public PlacementTarget: UIElement;
        private _TooltipParent;
        private _TooltipParentDCListener;
        public TooltipParent : FrameworkElement;
        public PlacementOverride: PlacementMode;
        public PlacementTargetOverride: UIElement;
        public Opened: RoutedEvent<RoutedEventArgs>;
        public Closed: RoutedEvent<RoutedEventArgs>;
        private _ParentPopup;
        constructor();
        public OnApplyTemplate(): void;
        private OnHorizontalOffsetChanged(args);
        private OnVerticalOffsetChanged(args);
        private OnIsOpenChanged(args);
        private OnOffsetChanged(horizontalOffset, verticalOffset);
        private OnLayoutUpdated(sender, e);
        private OnTooltipParentDataContextChanged(sender, args);
        private HookupParentPopup();
        private OnPopupOpened(sender, e);
        private OnPopupClosed(sender, e);
        private PerformPlacement(horizontalOffset, verticalOffset);
        public GoToStates(gotoFunc: (state: string) => boolean): void;
    }
}
interface IPoint {
    X: number;
    Y: number;
}
declare class Point implements ICloneable, IPoint {
    public X: number;
    public Y: number;
    constructor(x?: number, y?: number);
    public toString(): string;
    public Equals(other: Point): boolean;
    public Clone(): Point;
    static Equals(p1: Point, p2: Point): boolean;
    static LERP(start: Point, end: Point, p: number): Point;
}
declare module Fayde.Controls {
    class ToolTipService {
        static ToolTipProperty: DependencyProperty;
        static GetToolTip(dobj: DependencyObject): ToolTip;
        static SetToolTip(dobj: DependencyObject, value: ToolTip): void;
        static PlacementProperty: DependencyProperty;
        static GetPlacement(dobj: DependencyObject): PlacementMode;
        static SetPlacement(dobj: DependencyObject, value: PlacementMode): void;
        static PlacementTargetProperty: DependencyProperty;
        static GetPlacementTarget(dobj: DependencyObject): UIElement;
        static SetPlacementTarget(dobj: DependencyObject, value: UIElement): void;
        static MousePosition : Point;
    }
}
declare module Fayde.Controls {
    enum VirtualizationMode {
        Standard = 0,
        Recycling = 1,
    }
    class VirtualizingPanel extends Panel {
        static VirtualizationModeProperty: DependencyProperty;
        static GetVirtualizationMode(d: DependencyObject): VirtualizationMode;
        static SetVirtualizationMode(d: DependencyObject, value: VirtualizationMode): void;
        private static OnVirtualizationModePropertyChanged(dobj, args);
        static IsVirtualizingProperty: DependencyProperty;
        static GetIsVirtualizing(d: DependencyObject): boolean;
        static SetIsVirtualizing(d: DependencyObject, value: boolean): void;
        public ItemsControl : ItemsControl;
        public OnItemsAdded(index: number, newItems: any[]): void;
        public OnItemsRemoved(index: number, oldItems: any[]): void;
    }
}
declare module Fayde.Controls {
    class VirtualizingStackPanel extends VirtualizingPanel implements Primitives.IScrollInfo {
        private _CanHorizontallyScroll;
        private _CanVerticallyScroll;
        private _HorizontalOffset;
        private _VerticalOffset;
        private _ExtentWidth;
        private _ExtentHeight;
        private _ViewportWidth;
        private _ViewportHeight;
        public ScrollOwner: ScrollViewer;
        public CanHorizontallyScroll : boolean;
        public CanVerticallyScroll : boolean;
        public ExtentWidth : number;
        public ExtentHeight : number;
        public ViewportWidth : number;
        public ViewportHeight : number;
        public HorizontalOffset : number;
        public VerticalOffset : number;
        public LineUp(): boolean;
        public LineDown(): boolean;
        public LineLeft(): boolean;
        public LineRight(): boolean;
        public MouseWheelUp(): boolean;
        public MouseWheelDown(): boolean;
        public MouseWheelLeft(): boolean;
        public MouseWheelRight(): boolean;
        public PageUp(): boolean;
        public PageDown(): boolean;
        public PageLeft(): boolean;
        public PageRight(): boolean;
        public MakeVisible(uie: UIElement, rectangle: rect): rect;
        public SetHorizontalOffset(offset: number): boolean;
        public SetVerticalOffset(offset: number): boolean;
        static OrientationProperty: DependencyProperty;
        public Orientation: Orientation;
        public MeasureOverride(availableSize: size): size;
        public ArrangeOverride(finalSize: size): size;
        public OnItemsAdded(index: number, newItems: any[]): void;
        public OnItemsRemoved(index: number, oldItems: any[]): void;
    }
}
declare module Fayde {
    function Clone(value: any): any;
}
declare module Fayde {
    class DataTemplate extends Xaml.FrameworkTemplate {
        public DataType: Function;
        constructor();
        public GetVisualTree(bindingSource?: DependencyObject): UIElement;
    }
}
declare module Fayde {
    class Expression {
        public IsUpdating: boolean;
        public IsAttached: boolean;
        public GetValue(propd: DependencyProperty): any;
        public OnAttached(target: XamlObject): void;
        public OnDetached(target: XamlObject): void;
        public OnDataContextChanged(newDataContext: any): void;
    }
}
declare module Fayde {
    class DeferredValueExpression extends Expression {
        public GetValue(propd: DependencyProperty): any;
        public toString(): string;
    }
}
interface IDependencyPropertyChangedEventArgs {
    Property: DependencyProperty;
    OldValue: any;
    NewValue: any;
}
declare class DependencyPropertyChangedEventArgs extends EventArgs implements IDependencyPropertyChangedEventArgs {
    public Property: DependencyProperty;
    public OldValue: any;
    public NewValue: any;
}
declare module Fayde {
    interface IEventFilter {
        Filter(sender: any, e: EventArgs, parameter: any): boolean;
    }
    var IEventFilter_: IInterfaceDeclaration<IEventFilter>;
    class EventBinding implements Xaml.IMarkup {
        public CommandBinding: Data.Binding;
        public CommandParameterBinding: Data.Binding;
        public Filter: IEventFilter;
        public Transmute(ctx: Xaml.ITransmuteContext): Expression;
    }
}
declare module Fayde {
    interface IEventBindingArgs<T extends EventArgs> {
        sender: any;
        args: T;
        parameter: any;
    }
    class EventBindingExpression extends Expression {
        public IsUpdating: boolean;
        public IsAttached: boolean;
        private _EventBinding;
        private _CommandWalker;
        private _CommandParameterWalker;
        private _Target;
        private _Event;
        private _EventName;
        constructor(eventBinding: EventBinding);
        public Init(event: MulticastEvent<EventArgs>, eventName: string): void;
        public GetValue(propd: DependencyProperty): any;
        public OnAttached(target: XamlObject): void;
        public OnDetached(target: XamlObject): void;
        public OnDataContextChanged(newDataContext: any): void;
        private _Callback(sender, e);
    }
}
declare module Fayde {
    class HierarchicalDataTemplate extends DataTemplate {
        constructor();
        private _ItemsSource;
        public ItemsSource : Data.Binding;
        public IsItemTemplateSet: boolean;
        private _ItemTemplate;
        public ItemTemplate : DataTemplate;
        public IsItemContainerStyleSet: boolean;
        private _ItemContainerStyle;
        public ItemContainerStyle : Style;
    }
}
declare module Fayde {
    class LayoutInformation {
        static GetLayoutClip(uie: UIElement): Media.Geometry;
        static GetLayoutExceptionElement(): UIElement;
        static GetLayoutSlot(uie: UIElement): rect;
    }
}
declare module Fayde {
    class NameScope {
        public IsRoot: boolean;
        private XNodes;
        constructor(isRoot?: boolean);
        public FindName(name: string): XamlNode;
        public RegisterName(name: string, xnode: XamlNode): void;
        public UnregisterName(name: string): void;
        public Absorb(otherNs: NameScope): void;
    }
}
declare module Fayde.Providers {
    enum StyleIndex {
        VisualTree = 0,
        ApplicationResources = 1,
        Theme = 2,
        Count = 3,
    }
    enum StyleMask {
        None = 0,
        VisualTree,
        ApplicationResources,
        Theme,
        All,
    }
    interface IImplicitStyleHolder {
        _ImplicitStyles: Style[];
        _StyleMask: number;
    }
    class ImplicitStyleBroker {
        static Set(fe: FrameworkElement, mask: StyleMask, styles?: Style[]): void;
        private static SetImpl(fe, mask, styles);
        static Clear(fe: FrameworkElement, mask: StyleMask): void;
        private static ApplyStyles(fe, mask, styles);
    }
}
declare module Fayde.Providers {
    interface IStyleHolder {
        _LocalStyle: Style;
    }
    class LocalStyleBroker {
        static Set(fe: FrameworkElement, newStyle: Style): void;
    }
}
declare module Fayde.Providers {
    function SwapStyles(fe: FrameworkElement, oldWalker: IStyleWalker, newWalker: IStyleWalker, isImplicit: boolean): void;
}
declare module Fayde {
    interface IResourcable {
        Resources: ResourceDictionary;
    }
    class ResourceDictionaryCollection extends XamlObjectCollection<ResourceDictionary> {
        public Get(key: any): any;
        public AddingToCollection(value: ResourceDictionary, error: BError): boolean;
        private _AssertNoCycles(subtreeRoot, firstAncestorNode, error);
    }
    class ResourceDictionary extends XamlObject implements IEnumerable<any> {
        private _Keys;
        private _Values;
        private _IsSourceLoaded;
        private _MergedDictionaries;
        public MergedDictionaries : ResourceDictionaryCollection;
        public Source: Uri;
        public Count : number;
        public AttachTo(xobj: XamlObject): void;
        public Contains(key: any): boolean;
        public Get(key: any): any;
        public Set(key: any, value: any): boolean;
        public Remove(key: any): boolean;
        public getEnumerator(reverse?: boolean): IEnumerator<any>;
        public GetNodeEnumerator<U extends XamlNode>(reverse?: boolean): IEnumerator<U>;
    }
}
interface IEventListener<T extends EventArgs> {
    Closure: any;
    Callback: (sender: any, e: T) => void;
}
declare class MulticastEvent<T extends EventArgs> {
    private _Listeners;
    public Subscribe(callback: (sender: any, e: T) => void, closure: any): void;
    public Unsubscribe(callback: (sender: any, e: T) => void, closure: any): void;
    public Raise(sender: any, args: T): void;
    public RaiseAsync(sender: any, args: T): void;
}
declare module Fayde {
    class RoutedEvent<T extends RoutedEventArgs> extends MulticastEvent<T> {
    }
}
declare module Fayde {
    class RoutedPropertyChangedEvent<T> extends RoutedEvent<RoutedPropertyChangedEventArgs<T>> {
    }
    class RoutedPropertyChangedEventArgs<T> extends RoutedEventArgs {
        public OldValue: T;
        public NewValue: T;
        constructor(oldValue: T, newValue: T);
    }
}
declare module Fayde {
    class RoutedPropertyChangingEvent<T> extends RoutedEvent<RoutedPropertyChangingEventArgs<T>> {
    }
    class RoutedPropertyChangingEventArgs<T> extends RoutedEventArgs {
        public Property: DependencyProperty;
        public OldValue: T;
        public NewValue: T;
        private _IsCancelable;
        public IsCancellable : boolean;
        private _Cancel;
        public Cancel : boolean;
        public InCoercion: boolean;
        constructor(propd: DependencyProperty, oldValue: T, newValue: T, isCancelable: boolean);
    }
}
declare module Fayde {
    class SetterCollection extends XamlObjectCollection<Setter> {
        private _IsSealed;
        public XamlNode: XamlNode;
        public _Seal(targetType: Function): void;
        public AddingToCollection(value: Setter, error: BError): boolean;
        private _ValidateSetter(setter, error);
    }
    class Setter extends DependencyObject {
        private _IsSealed;
        static PropertyProperty: DependencyProperty;
        static ValueProperty: DependencyProperty;
        public Property: DependencyProperty;
        public Value: any;
        public ConvertedValue: any;
        public _Seal(targetType: Function): void;
        static Compare(setter1: Setter, setter2: Setter): number;
    }
}
declare module Fayde {
    class SizeChangedEventArgs extends RoutedEventArgs {
        public PreviousSize: size;
        public NewSize: size;
        constructor(previousSize: size, newSize: size);
    }
}
declare module Fayde {
    class Style extends DependencyObject {
        private _IsSealed;
        static SettersProperty: ImmutableDependencyProperty<SetterCollection>;
        static BasedOnProperty: DependencyProperty;
        static TargetTypeProperty: DependencyProperty;
        public Setters: SetterCollection;
        public BasedOn: Style;
        public TargetType: Function;
        constructor();
        public Seal(): void;
        public Validate(instance: DependencyObject, error: BError): boolean;
    }
}
declare module Fayde {
    class TemplateBindingExpression extends Expression {
        private _Target;
        private _Listener;
        public SourceProperty: DependencyProperty;
        public TargetProperty: DependencyProperty;
        constructor(sourcePropd: DependencyProperty, targetPropd: DependencyProperty);
        public GetValue(propd: DependencyProperty): any;
        public OnAttached(dobj: DependencyObject): void;
        public OnDetached(dobj: DependencyObject): void;
        public OnSourcePropertyChanged(sender: DependencyObject, args: IDependencyPropertyChangedEventArgs): void;
        private _AttachListener();
        private _DetachListener();
    }
}
declare module Fayde {
    class TriggerAction extends DependencyObject {
        public Fire(): void;
    }
    class TriggerActionCollection extends XamlObjectCollection<TriggerAction> {
        public Fire(): void;
    }
    class TriggerBase extends DependencyObject {
        public Attach(target: XamlObject): void;
        public Detach(target: XamlObject): void;
    }
    class EventTrigger extends TriggerBase {
        static ActionsProperty: ImmutableDependencyProperty<TriggerActionCollection>;
        static RoutedEventProperty: DependencyProperty;
        public Actions: TriggerActionCollection;
        public RoutedEvent: string;
        private _IsAttached;
        constructor();
        public Attach(target: XamlObject): void;
        public Detach(target: XamlObject): void;
        private _FireActions(sender, e);
        private _ParseEventName(target);
    }
    class TriggerCollection extends XamlObjectCollection<TriggerBase> {
        public XamlNode: XamlNode;
        private ParentXamlObject;
        public AddingToCollection(value: TriggerBase, error: BError): boolean;
        public RemovedFromCollection(value: TriggerBase, isValueSafe: boolean): void;
        public AttachTarget(target: XamlObject): void;
        public DetachTarget(target: XamlObject): void;
    }
}
declare module Fayde {
    class VisualTreeHelper {
        static GetParent(d: DependencyObject): DependencyObject;
        static GetParentOfType<T extends DependencyObject>(d: DependencyObject, type: any): T;
        static GetRoot(d: DependencyObject): DependencyObject;
        static GetChild(d: DependencyObject, childIndex: number): DependencyObject;
        static GetChildrenCount(d: DependencyObject): number;
        static FindElementsInHostCoordinates(intersectingPoint: Point, subtree: UIElement): UIElement[];
        static __Debug(ui: any, func?: (uin: UINode, tabIndex: number) => string): string;
        private static __DebugTree(curNode, matchNode, tabIndex, func);
        private static __DebugUIElement(uin, tabIndex);
        private static __DebugGrid(uin, tabIndex);
        private static __DebugUIElementLayout(uin, tabIndex);
        static __DebugLayout(ui: any): string;
        private static __GetById(id);
    }
}
declare module Fayde {
    interface IWalker {
        Step(): any;
    }
    interface IStyleWalker extends IWalker {
        Step(): Setter;
    }
    interface IDeepTreeWalker extends IWalker {
        Step(): UINode;
        SkipBranch(): any;
    }
    interface ITabNavigationWalker {
        FocusChild(): boolean;
    }
    function SingleStyleWalker(style: Style): IStyleWalker;
    function MultipleStylesWalker(styles: Style[]): IStyleWalker;
    function DeepTreeWalker(topNode: UINode, direction?: VisualTreeDirection): IDeepTreeWalker;
    class TabNavigationWalker implements ITabNavigationWalker {
        private _Root;
        private _Current;
        private _Forwards;
        private _TabSorted;
        constructor(root: UINode, cur: UINode, forwards: boolean);
        public FocusChild(): boolean;
        static Focus(uin: UINode, forwards?: boolean): boolean;
    }
}
declare module Fayde.Data {
    interface IValueConverter {
        Convert(value: any, targetType: IType, parameter: any, culture: any): any;
        ConvertBack(value: any, targetType: IType, parameter: any, culture: any): any;
    }
    var IValueConverter_: IInterfaceDeclaration<IValueConverter>;
    class Binding implements Xaml.IMarkup {
        private _IsSealed;
        private _StringFormat;
        private _FallbackValue;
        private _TargetNullValue;
        private _BindsDirectlyToSource;
        private _Converter;
        private _ConverterParameter;
        private _ConverterCulture;
        private _ElementName;
        private _Mode;
        private _NotifyOnValidationError;
        private _RelativeSource;
        private _Path;
        private _Source;
        private _UpdateSourceTrigger;
        private _ValidatesOnExceptions;
        private _ValidatesOnDataErrors;
        private _ValidatesOnNotifyDataErrors;
        constructor(path?: string);
        public BindsDirectlyToSource : boolean;
        public Converter : IValueConverter;
        public ConverterParameter : any;
        public ConverterCulture : any;
        public ElementName : string;
        public Mode : BindingMode;
        public NotifyOnValidationError : boolean;
        public RelativeSource : RelativeSource;
        public Path : PropertyPath;
        public Source : any;
        public UpdateSourceTrigger : UpdateSourceTrigger;
        public ValidatesOnExceptions : boolean;
        public ValidatesOnDataErrors : boolean;
        public ValidatesOnNotifyDataErrors : boolean;
        public StringFormat : string;
        public FallbackValue : any;
        public TargetNullValue : any;
        private CheckSealed();
        public Seal(): void;
        public Clone(): Binding;
        public Transmute(ctx: Xaml.ITransmuteContext): Expression;
    }
}
declare module Fayde.Data {
    class BindingExpressionBase extends Expression implements IPropertyPathWalkerListener {
        public ParentBinding: Binding;
        public Target: DependencyObject;
        public Property: DependencyProperty;
        private PropertyPathWalker;
        private _PropertyListener;
        private _SourceAvailableMonitor;
        private _IsDataContextBound;
        private _DataContext;
        private _TwoWayLostFocusElement;
        public DataItem : any;
        private _Cached;
        private _CachedValue;
        constructor(binding: Binding, target: DependencyObject, propd: DependencyProperty);
        private _Init(binding, target, propd);
        public GetValue(propd: DependencyProperty): any;
        public OnAttached(element: DependencyObject): void;
        private _OnSourceAvailable();
        private _FindSource();
        private _FindSourceByElementName();
        public OnDetached(element: DependencyObject): void;
        public IsBrokenChanged(): void;
        public ValueChanged(): void;
        public UpdateSource(): void;
        public _TryUpdateSourceObject(value: any): void;
        private _UpdateSourceCallback(sender, args);
        private _TargetLostFocus(sender, e);
        private _ShouldUpdateSource();
        private _UpdateSourceObject(value?);
        public OnDataContextChanged(newDataContext: any): void;
        private _Invalidate();
        public Refresh(): void;
        private _ConvertFromTargetToSource(binding, node, value);
        private _ConvertToType(propd, value);
        private _MaybeEmitError(message, exception);
        private _AttachToNotifyError(element);
        private _NotifyErrorsChanged(o, e);
    }
}
declare module Fayde.Data {
    class BindingExpression extends BindingExpressionBase {
        constructor(binding: Binding, target: DependencyObject, propd: DependencyProperty);
    }
}
declare module Fayde.Data {
    class CollectionViewSource extends DependencyObject {
        static SourceProperty: DependencyProperty;
        static ViewProperty: DependencyProperty;
        public Source: any;
        public View: ICollectionView;
    }
}
declare module Fayde.Data {
    enum RelativeSourceMode {
        TemplatedParent = 1,
        Self = 2,
        FindAncestor = 3,
        ItemsControlParent = 4,
    }
    enum BindingMode {
        TwoWay = 0,
        OneWay = 1,
        OneTime = 2,
        OneWayToSource = 3,
    }
    enum UpdateSourceTrigger {
        Default = 0,
        PropertyChanged = 1,
        Explicit = 3,
    }
}
declare module Fayde.Data {
    interface ICollectionView extends IEnumerable<any> {
        CurrentChanged: MulticastEvent<EventArgs>;
        CurrentItem: any;
        MoveCurrentTo(item: any): boolean;
    }
    var ICollectionView_: IInterfaceDeclaration<ICollectionView>;
}
declare module Fayde.Data {
    class PropertyPath implements ICloneable {
        private _Path;
        private _ExpandedPath;
        private _Propd;
        constructor(path?: string, expandedPath?: string);
        static CreateFromParameter(parameter: any): PropertyPath;
        public TryResolveDependencyProperty(refobj: IOutValue, promotedValues: any[]): DependencyProperty;
        public Path : string;
        public ExpandedPath : string;
        public ParsePath : string;
        public HasDependencyProperty : boolean;
        public DependencyProperty : DependencyProperty;
        static ResolvePropertyPath(refobj: IOutValue, propertyPath: PropertyPath, promotedValues: any[]): DependencyProperty;
        public Clone(): PropertyPath;
    }
}
declare module Fayde.Data {
    interface IPropertyPathParserData {
        typeName: string;
        propertyName: string;
        index: number;
    }
    enum PropertyNodeType {
        None = 0,
        AttachedProperty = 1,
        Indexed = 2,
        Property = 3,
    }
    class PropertyPathParser {
        public Path: string;
        constructor(path: string);
        public Step(data: IPropertyPathParserData): PropertyNodeType;
    }
}
declare module Fayde.Data {
    interface IPropertyPathWalkerListener {
        IsBrokenChanged(): any;
        ValueChanged(): any;
    }
    interface IPropertyPathNode {
        Next: IPropertyPathNode;
        Value: any;
        IsBroken: boolean;
        ValueType: IType;
        SetSource(source: any): any;
        SetValue(value: any): any;
        Listen(listener: IPropertyPathNodeListener): any;
        Unlisten(listener: IPropertyPathNodeListener): any;
    }
    interface ICollectionViewNode extends IPropertyPathNode {
        BindToView: boolean;
    }
    interface IPropertyPathNodeListener {
        IsBrokenChanged(node: IPropertyPathNode): any;
        ValueChanged(node: IPropertyPathNode): any;
    }
    class PropertyPathWalker implements IPropertyPathNodeListener {
        public Path: string;
        public IsDataContextBound: boolean;
        public Source: any;
        public ValueInternal: any;
        public Node: IPropertyPathNode;
        public FinalNode: IPropertyPathNode;
        private _Listener;
        public IsPathBroken : boolean;
        constructor(path: string, bindDirectlyToSource?: boolean, bindsToView?: boolean, isDataContextBound?: boolean);
        public GetValue(item: any): any;
        public Update(source: any): void;
        public Listen(listener: IPropertyPathWalkerListener): void;
        public Unlisten(listener: IPropertyPathWalkerListener): void;
        public IsBrokenChanged(node: IPropertyPathNode): void;
        public ValueChanged(node: IPropertyPathNode): void;
        public GetContext(): any;
    }
}
declare module Fayde.Data {
    class RelativeSource {
        public Mode: RelativeSourceMode;
        private _AncestorLevel;
        public AncestorLevel : number;
        public AncestorType: Function;
        constructor(mode?: RelativeSourceMode);
        public Clone(): RelativeSource;
    }
}
declare module Fayde.Documents {
    class TextElementNode extends DONode {
        public XObject: TextElement;
        constructor(xobj: TextElement, inheritedWalkProperty: string);
        public InheritedWalkProperty: string;
        public GetInheritedEnumerator(): IEnumerator<DONode>;
    }
    class TextElement extends DependencyObject implements Text.ITextAttributesSource, IFontChangeable, Providers.IIsPropertyInheritable {
        public XamlNode: TextElementNode;
        public CreateNode(): TextElementNode;
        static FontFamilyProperty: DependencyProperty;
        static FontSizeProperty: DependencyProperty;
        static FontStretchProperty: DependencyProperty;
        static FontStyleProperty: DependencyProperty;
        static FontWeightProperty: DependencyProperty;
        static ForegroundProperty: DependencyProperty;
        static TextDecorationsProperty: DependencyProperty;
        static LanguageProperty: DependencyProperty;
        public Foreground: Media.Brush;
        public FontFamily: string;
        public FontStretch: string;
        public FontStyle: string;
        public FontWeight: FontWeight;
        public FontSize: number;
        public Language: string;
        public TextDecorations: TextDecorations;
        public IsInheritable(propd: DependencyProperty): boolean;
        private _Font;
        constructor();
        public _SerializeText(): string;
        private _UpdateFont(force?);
        public Background : Media.Brush;
        public SelectionBackground : Media.Brush;
        public SelectionForeground : Media.Brush;
        public Font : Font;
        public Direction : FlowDirection;
        public IsUnderlined : boolean;
        public Start: number;
        public Equals(te: TextElement): boolean;
        public FontChanged(args: IDependencyPropertyChangedEventArgs): void;
    }
}
declare module Fayde.Documents {
    interface IBlocksChangedListener {
        BlocksChanged(newBlock: Block, isAdd: boolean): any;
    }
    class Block extends TextElement {
    }
    class BlockCollection extends XamlObjectCollection<Block> {
        private _Listener;
        public Listen(listener: IBlocksChangedListener): void;
        public Unlisten(listener: IBlocksChangedListener): void;
        public AddingToCollection(value: Block, error: BError): boolean;
        public RemovedFromCollection(value: Block, isValueSafe: boolean): void;
    }
}
declare module Fayde.Documents {
    interface IInlinesChangedListener {
        InlinesChanged(newInline: Inline, isAdd: boolean): any;
    }
    class Inline extends TextElement {
        public Autogen: boolean;
    }
    class InlineCollection extends XamlObjectCollection<Inline> {
        private _Listener;
        public Listen(listener: IInlinesChangedListener): void;
        public Unlisten(listener: IInlinesChangedListener): void;
        public AddingToCollection(value: Inline, error: BError): boolean;
        public RemovedFromCollection(value: Inline, isValueSafe: boolean): void;
    }
}
declare module Fayde.Documents {
    class LineBreak extends Inline {
    }
}
declare module Fayde.Documents {
    class Paragraph extends Block {
        public CreateNode(): TextElementNode;
        static InlinesProperty: ImmutableDependencyProperty<InlineCollection>;
        public Inlines: InlineCollection;
        constructor();
        public InlinesChanged(newInline: Inline, isAdd: boolean): void;
    }
}
declare module Fayde.Documents {
    class Run extends Inline implements Providers.IIsPropertyInheritable {
        static FlowDirectionProperty: DependencyProperty;
        static TextProperty: DependencyProperty;
        public FlowDirection: FlowDirection;
        public Text: string;
        public _SerializeText(): string;
        public IsInheritable(propd: DependencyProperty): boolean;
    }
}
declare module Fayde.Documents {
    class Section extends TextElement implements IBlocksChangedListener {
        public CreateNode(): TextElementNode;
        static BlocksProperty: ImmutableDependencyProperty<BlockCollection>;
        public Blocks: BlockCollection;
        constructor();
        public BlocksChanged(newBlock: Block, isAdd: boolean): void;
    }
}
declare module Fayde.Documents {
    class Span extends Inline implements IInlinesChangedListener {
        public CreateNode(): TextElementNode;
        static InlinesProperty: ImmutableDependencyProperty<InlineCollection>;
        public Inlines: InlineCollection;
        constructor();
        public InlinesChanged(newInline: Inline, isAdd: boolean): void;
        public _SerializeText(): string;
    }
}
declare module Fayde.Documents {
    class Underline extends Span {
    }
}
interface ITimeline {
    Update(nowTime: number): any;
}
declare module Fayde {
    class Application extends DependencyObject implements IResourcable, ITimerListener {
        static Current: Application;
        public MainSurface: Surface;
        public Loaded: MulticastEvent<EventArgs>;
        public Address: Uri;
        public DebugInterop: DebugInterop;
        private _IsRunning;
        private _IsLoaded;
        private _Storyboards;
        private _ClockTimer;
        private _RootVisual;
        private _CoreLibrary;
        static ResourcesProperty: ImmutableDependencyProperty<ResourceDictionary>;
        static ThemeNameProperty: DependencyProperty;
        public Resources: ResourceDictionary;
        public ThemeName: string;
        private OnThemeNameChanged(args);
        private _ApplyTheme();
        public Resized: RoutedEvent<SizeChangedEventArgs>;
        public OnResized(oldSize: size, newSize: size): void;
        constructor();
        public RootVisual : UIElement;
        public $$SetRootVisual(value: UIElement): void;
        public Attach(canvas: HTMLCanvasElement): void;
        public Start(): void;
        public OnTicked(lastTime: number, nowTime: number): void;
        private StopEngine();
        private ProcessStoryboards(lastTime, nowTime);
        private Update();
        private Render();
        public RegisterStoryboard(storyboard: ITimeline): void;
        public UnregisterStoryboard(storyboard: ITimeline): void;
        private __DebugLayers();
        private __GetById(id);
        static GetAsync(url: string): IAsyncRequest<Application>;
        public Resolve(): IAsyncRequest<Application>;
    }
    function Run(loaded?: (app: Application) => void): void;
}
declare module Fayde {
    interface ITimerListener {
        OnTicked(lastTime: number, nowTime: number): any;
    }
    class ClockTimer {
        private _Listeners;
        private _LastTime;
        public RegisterTimer(listener: ITimerListener): void;
        public UnregisterTimer(listener: ITimerListener): void;
        private _DoTick();
        private _RequestAnimationTick();
    }
}
declare module Fayde {
    interface IDebugInteropCache {
        Node: UINode;
        Visual: UIElement;
        Children: IDebugInteropCache[];
        ID: number;
        Name: string;
        TypeName: string;
    }
    class DebugInterop {
        private _Cache;
        private _CachedHitTest;
        private _DPCache;
        public LastFrameTime: Date;
        public NumFrames: number;
        public App: Application;
        public Surface: Surface;
        constructor(app: Application);
        public LayoutUpdated(): void;
        public IsCacheInvalidated : boolean;
        public InvalidateCache(): void;
        public GetCache(): string;
        private GenerateCache();
        private PopulateCacheChildren(item);
        private CreateDebugInteropCacheItem(node);
        public GetDPCache(): string;
        private GenerateDPCache();
        public GetStorages(id: number): string;
        public GetLayoutMetrics(id: number): string;
        public GetById(id: number, cur?: IDebugInteropCache): IDebugInteropCache;
        public GetResetPerfInfo(): string;
        public RegisterHitTestDebugService(): void;
        public GetVisualIDsInHitTest(): string;
        private static _StringifyReplacer(key, value, visited?);
    }
}
declare module Fayde {
    function _VisualTree(id: number): string;
}
declare class Exception {
    public Message: string;
    constructor(message: string);
    public toString(): string;
}
declare class ArgumentException extends Exception {
    constructor(message: string);
}
declare class ArgumentNullException extends Exception {
    constructor(message: string);
}
declare class InvalidOperationException extends Exception {
    constructor(message: string);
}
declare class XamlParseException extends Exception {
    constructor(message: string);
}
declare class XamlMarkupParseException extends Exception {
    constructor(message: string);
}
declare class NotSupportedException extends Exception {
    constructor(message: string);
}
declare class IndexOutOfRangeException extends Exception {
    constructor(index: number);
}
declare class ArgumentOutOfRangeException extends Exception {
    constructor(msg: string);
}
declare class AttachException extends Exception {
    public Data: any;
    constructor(message: string, data: any);
}
declare class InvalidJsonException extends Exception {
    public JsonText: string;
    public InnerException: Error;
    constructor(jsonText: string, innerException: Error);
}
declare class TargetInvocationException extends Exception {
    public InnerException: Exception;
    constructor(message: string, innerException: Exception);
}
declare class UnknownTypeException extends Exception {
    public FullTypeName: string;
    constructor(fullTypeName: string);
}
declare class FormatException extends Exception {
    constructor(message: string);
}
declare module Fayde.Engine {
    class FocusManager {
        private _State;
        private _ChangedEvents;
        public Node: UINode;
        constructor(state: IInputState);
        public GetFocusToRoot(): UINode[];
        public OnNodeDetached(node: UINode): void;
        public TabFocus(isShift: boolean): boolean;
        public Focus(ctrlNode: Controls.ControlNode, recurse?: boolean): boolean;
        private _FocusNode(uin?);
        public EmitChanges(): void;
        public EmitChangesAsync(): void;
        private _EmitFocusList(type, list);
        public FocusAnyLayer(layers: UINode[]): void;
    }
}
declare module Fayde.Engine {
    interface IInputState {
        IsUserInitiated: boolean;
        IsFirstUserInitiated: boolean;
    }
    class InputManager {
        private _Surface;
        private _KeyInterop;
        private _MouseInterop;
        private _TouchInterop;
        private _Focus;
        private _State;
        private _Cursor;
        public SetCursor: (cursor: CursorType) => void;
        private _CurrentPos;
        private _EmittingMouseEvent;
        private _InputList;
        private _Captured;
        private _PendingCapture;
        private _PendingReleaseCapture;
        private _CapturedInputList;
        public FocusedNode : UINode;
        public Focus(node: Controls.ControlNode, recurse?: boolean): boolean;
        constructor(surface: Surface);
        public Register(canvas: HTMLCanvasElement): void;
        public OnNodeDetached(node: UINode): void;
        public SetIsUserInitiatedEvent(value: boolean): void;
        public HandleKeyDown(args: Input.KeyEventArgs): void;
        private _EmitKeyDown(list, args, endIndex?);
        public HandleMousePress(button: number, pos: Point): boolean;
        public HandleMouseRelease(button: number, pos: Point): void;
        public HandleMouseEvent(type: Input.MouseInputType, button: number, pos: Point, delta?: number, emitLeave?: boolean, emitEnter?: boolean): boolean;
        private _EmitMouseList(type, button, pos, delta, list, endIndex?);
        public HitTestPoint(pos: Point): UINode[];
        public UpdateCursorFromInputList(): void;
        public SetMouseCapture(uin: UINode): boolean;
        public ReleaseMouseCapture(uin: UINode): void;
        private _PerformCapture(uin);
        private _PerformReleaseCapture();
    }
}
declare module Fayde.Engine {
    class Inspection {
        static TryHandle(type: Input.MouseInputType, isLeftButton: boolean, isRightButton: boolean, args: Input.MouseEventArgs, htlist: UINode[]): boolean;
        static Kill(): void;
    }
}
declare module Fayde {
    interface RenderContextEx extends CanvasRenderingContext2D {
        currentTransform: number[];
        resetTransform(): any;
        transformMatrix(mat: number[]): any;
        transformTransform(transform: Media.Transform): any;
        pretransformMatrix(mat: number[]): any;
        pretransformTransform(transform: Media.Transform): any;
        clear(r: rect): any;
        fillEx(brush: Media.Brush, r: rect, fillRule?: string): any;
        fillRectEx(brush: Media.Brush, r: rect, fillRule?: string): any;
        setupStroke(pars: Path.IStrokeParameters): boolean;
        strokeEx(brush: Media.Brush, pars: Path.IStrokeParameters, region: rect): any;
        isPointInStroke(x: number, y: number): any;
        isPointInStrokeEx(pars: Path.IStrokeParameters, x: number, y: number): any;
        clipRect(r: rect): any;
        clipGeometry(g: Media.Geometry): any;
        hasFillRule: boolean;
        createTemporaryContext(width: number, height: number): RenderContextEx;
    }
    function ExtendRenderContext(ctx: CanvasRenderingContext2D): RenderContextEx;
}
declare var resizeTimeout: number;
declare module Fayde {
    class Surface {
        static TestCanvas: HTMLCanvasElement;
        public TestRenderContext: RenderContextEx;
        private _App;
        public _RootLayer: UIElement;
        private _Layers;
        private _UpDirty;
        private _DownDirty;
        private _Canvas;
        private _Ctx;
        private _PercentageWidth;
        private _PercentageHeight;
        private _Extents;
        private _InvalidatedRect;
        private _RenderContext;
        private _InputMgr;
        public HitTestCallback: (inputList: UINode[]) => void;
        constructor(app: Application);
        public Extents : size;
        public App : Application;
        public Register(canvas: HTMLCanvasElement, width?: number, widthType?: string, height?: number, heightType?: string): void;
        public Attach(uie: UIElement): void;
        public GetLayers(): UINode[];
        public AttachLayer(layer: UIElement): void;
        public DetachLayer(layer: UIElement): void;
        public ProcessDirtyElements(): boolean;
        public _UpdateLayout(error: BError): boolean;
        private _ProcessDownDirtyElements();
        private _ProcessUpDirtyElements();
        private _GetChildNodeInUpListIndex(lu);
        private _PropagateDirtyFlagToChildren(element, dirt);
        private _RemoveDirtyElement(lu);
        public OnNodeDetached(lu: LayoutUpdater): void;
        public _Invalidate(r?: rect): void;
        public Render(): void;
        private _HandleResize(evt);
        private _HandleResizeTimeout(evt);
        private _ResizeCanvas();
        public FocusedNode : UINode;
        public Focus(node: Controls.ControlNode, recurse?: boolean): boolean;
        public RemoveFocusFrom(lu: LayoutUpdater): void;
        public HitTestPoint(pos: Point): UINode[];
        public SetMouseCapture(uin: UINode): boolean;
        public ReleaseMouseCapture(uin: UINode): void;
        static MeasureWidth(text: string, font: Font): number;
        public __DebugLayers(): string;
        public __GetById(id: number): UIElement;
    }
}
declare module Fayde {
    class Theme {
        constructor(uri?: Uri);
        private _Uri;
        public Uri : Uri;
        public Resources: ResourceDictionary;
        static Get(url: string): Theme;
        private _IsLoaded;
        private _LoadError;
        private _Deferrables;
        public Resolve(ctx: IDependencyAsyncContext): IAsyncRequest<Theme>;
        private _Load(ctx);
        private _HandleSuccess(xd);
        private _HandleError(error);
        public GetImplicitStyle(type: any): Style;
    }
}
declare module Fayde.Input {
    interface ICommand {
        Execute(parameter: any): any;
        CanExecute(parameter: any): boolean;
        CanExecuteChanged: MulticastEvent<EventArgs>;
    }
    var ICommand_: IInterfaceDeclaration<ICommand>;
}
declare module Fayde.Input {
    module InteractionHelper {
        function GetLogicalKey(flowDirection: FlowDirection, key: Key): Key;
    }
}
declare module Fayde.Input {
    interface IKeyInterop {
        RegisterEvents(inputHandler: Engine.InputManager): any;
    }
    function CreateKeyInterop(): IKeyInterop;
}
declare module Fayde.Input {
    class KeyboardNavigation {
        static AcceptsReturnProperty: DependencyProperty;
        static GetAcceptsReturn(d: DependencyObject): boolean;
        static SetAcceptsReturn(d: DependencyObject, value: boolean): void;
        static ControlTabNavigationProperty: DependencyProperty;
        static GetControlTabNavigation(d: DependencyObject): KeyboardNavigationMode;
        static SetControlTabNavigation(d: DependencyObject, value: KeyboardNavigationMode): void;
        static DirectionalNavigationProperty: DependencyProperty;
        static GetDirectionalNavigation(d: DependencyObject): KeyboardNavigationMode;
        static SetDirectionalNavigation(d: DependencyObject, value: KeyboardNavigationMode): void;
        static IsTabStopProperty: DependencyProperty;
        static GetIsTabStop(d: DependencyObject): boolean;
        static SetIsTabStop(d: DependencyObject, value: boolean): void;
        static TabIndexProperty: DependencyProperty;
        static GetTabIndex(d: DependencyObject): number;
        static SetTabIndex(d: DependencyObject, value: number): void;
        static TabNavigationProperty: DependencyProperty;
        static GetTabNavigation(d: DependencyObject): KeyboardNavigationMode;
        static SetTabNavigation(d: DependencyObject, value: KeyboardNavigationMode): void;
    }
}
declare module Fayde.Input {
    class MouseEventArgs extends RoutedEventArgs {
        public AbsolutePos: Point;
        constructor(absolutePos: Point);
        public GetPosition(relativeTo: UIElement): Point;
    }
    class MouseButtonEventArgs extends MouseEventArgs {
        constructor(absolutePos: Point);
    }
    class MouseWheelEventArgs extends MouseEventArgs {
        public Delta: number;
        constructor(absolutePos: Point, delta: number);
    }
}
declare module Fayde.Input {
    enum MouseInputType {
        NoOp = 0,
        MouseUp = 1,
        MouseDown = 2,
        MouseLeave = 3,
        MouseEnter = 4,
        MouseMove = 5,
        MouseWheel = 6,
    }
    interface IMouseInterop {
        RegisterEvents(input: Engine.InputManager, canvas: HTMLCanvasElement): any;
        CreateEventArgs(type: MouseInputType, pos: Point, delta: number): MouseEventArgs;
        IsLeftButton(button: number): boolean;
        IsRightButton(button: number): boolean;
    }
    function CreateMouseInterop(): IMouseInterop;
}
declare module Fayde.Input {
    class TouchEventArgs extends RoutedEventArgs {
        public Device: ITouchDevice;
        constructor(device: ITouchDevice);
        public GetTouchPoint(relativeTo: UIElement): TouchPoint;
    }
}
interface Touch {
    identifier: number;
    target: EventTarget;
    screenX: number;
    screenY: number;
    clientX: number;
    clientY: number;
    pageX: number;
    pageY: number;
    radiusX: number;
    radiusY: number;
    rotationAngle: number;
    force: number;
}
interface TouchList {
    length: number;
    item(index: number): Touch;
    identifiedTouch(identifier: number): Touch;
}
interface TouchEvent extends UIEvent {
    touches: TouchList;
    targetTouches: TouchList;
    changedTouches: TouchList;
    altKey: boolean;
    metaKey: boolean;
    ctrlKey: boolean;
    shiftKey: boolean;
    initTouchEvent(type: string, canBubble: boolean, cancelable: boolean, view: any, detail: number, ctrlKey: boolean, altKey: boolean, shiftKey: boolean, metaKey: boolean, touches: TouchList, targetTouches: TouchList, changedTouches: TouchList): any;
}
declare var TouchEvent: {
    prototype: TouchEvent;
    new(): TouchEvent;
};
declare module Fayde.Input.TouchInternal {
    interface ITouchHandler {
        HandleTouches(type: TouchInputType, touches: ActiveTouchBase[], emitLeave?: boolean, emitEnter?: boolean): boolean;
    }
    class ActiveTouchBase {
        public Identifier: number;
        public Position: Point;
        public Device: ITouchDevice;
        public InputList: UINode[];
        private _IsEmitting;
        private _PendingCapture;
        private _PendingReleaseCapture;
        private _Captured;
        private _CapturedInputList;
        private _FinishReleaseCaptureFunc;
        constructor(touchHandler: ITouchHandler);
        public Capture(uie: UIElement): boolean;
        public ReleaseCapture(uie: UIElement): void;
        private _PerformCapture(uin);
        private _PerformReleaseCapture();
        public Emit(type: TouchInputType, newInputList: UINode[], emitLeave?: boolean, emitEnter?: boolean): boolean;
        private _EmitList(type, list, endIndex?);
        public GetTouchPoint(relativeTo: UIElement): TouchPoint;
        public CreateTouchPoint(p: Point): TouchPoint;
        private CreateTouchDevice();
    }
}
declare module Fayde.Input.TouchInternal {
    interface IOffset {
        left: number;
        top: number;
    }
    class TouchInteropBase implements ITouchInterop, ITouchHandler {
        public Input: Engine.InputManager;
        public CanvasOffset: IOffset;
        public ActiveTouches: ActiveTouchBase[];
        public CoordinateOffset : IOffset;
        public Register(input: Engine.InputManager, canvas: HTMLCanvasElement): void;
        private _CalcOffset(canvas);
        public HandleTouches(type: TouchInputType, touches: ActiveTouchBase[], emitLeave?: boolean, emitEnter?: boolean): boolean;
    }
}
declare module Fayde.Input.TouchInternal {
    class NonPointerTouchInterop extends TouchInteropBase {
        public Register(input: Engine.InputManager, canvas: HTMLCanvasElement): void;
        private _HandleTouchStart(e);
        private _HandleTouchEnd(e);
        private _HandleTouchMove(e);
        private _HandleTouchEnter(e);
        private _HandleTouchLeave(e);
        private TouchArrayFromList(list);
        private FindTouchInList(identifier);
    }
}
declare module Fayde.Input.TouchInternal {
    class PointerTouchInterop extends TouchInteropBase {
        public Register(input: Engine.InputManager, canvas: HTMLCanvasElement): void;
        private _HandlePointerDown(e);
        private _HandlePointerUp(e);
        private _HandlePointerMove(e);
        private _HandlePointerEnter(e);
        private _HandlePointerLeave(e);
        private GetActiveTouch(e);
        private FindTouchInList(identifier);
    }
}
declare module Fayde.Input {
    interface ITouchDevice {
        Identifier: number;
        Captured: UIElement;
        Capture(uie: UIElement): boolean;
        ReleaseCapture(uie: UIElement): any;
        GetTouchPoint(relativeTo: UIElement): TouchPoint;
    }
    enum TouchInputType {
        NoOp = 0,
        TouchDown = 1,
        TouchUp = 2,
        TouchMove = 3,
        TouchEnter = 4,
        TouchLeave = 5,
    }
    interface ITouchInterop {
        Register(input: Engine.InputManager, canvas: HTMLCanvasElement): any;
    }
    function CreateTouchInterop(): ITouchInterop;
}
declare module Fayde.Input {
    class TouchPoint {
        public Position: Point;
        public Force: number;
        constructor(position: Point, force: number);
    }
}
declare class TimeSpan {
    static _TicksPerMillisecond: number;
    static _TicksPerSecond: number;
    static _TicksPerMinute: number;
    static _TicksPerHour: number;
    static _TicksPerDay: number;
    private _Ticks;
    static Zero : TimeSpan;
    static MinValue : TimeSpan;
    static MaxValue : TimeSpan;
    static FromDays(value: number): TimeSpan;
    static FromHours(value: number): TimeSpan;
    static FromMinutes(value: number): TimeSpan;
    static FromSeconds(value: number): TimeSpan;
    static FromMilliseconds(value: number): TimeSpan;
    constructor();
    constructor(ticks: number);
    constructor(hours: number, minutes: number, seconds: number);
    constructor(days: number, hours: number, minutes: number, seconds: number, milliseconds?: number);
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
    public IsZero(): boolean;
    public GetJsDelay(): number;
    public toString(format?: string): string;
    public valueOf(): Object;
}
declare enum DayOfWeek {
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6,
}
declare enum DateTimeKind {
    Local = 0,
    Unspecified = 1,
    Utc = 2,
}
declare class DateTime {
    private static _MinDateTicks;
    private static _MaxDateTicks;
    static MinValue : DateTime;
    static MaxValue : DateTime;
    static Now : DateTime;
    static Today : DateTime;
    static Compare(dt1: DateTime, dt2: DateTime): number;
    static DaysInMonth(year: number, month: number): number;
    private _InternalDate;
    private _Kind;
    constructor();
    constructor(ticks: number);
    constructor(ticks: number, kind: DateTimeKind);
    constructor(year: number, month: number, day: number);
    constructor(year: number, month: number, day: number, hour: number, minute: number, second: number);
    constructor(year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number);
    constructor(year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number, kind: DateTimeKind);
    public Ticks : number;
    public Kind : DateTimeKind;
    public Date : DateTime;
    public Day : number;
    public DayOfWeek : DayOfWeek;
    public DayOfYear : number;
    public Hour : number;
    public Millisecond : number;
    public Minute : number;
    public Month : number;
    public Second : number;
    public TimeOfDay : TimeSpan;
    public Year : number;
    public Add(value: TimeSpan): DateTime;
    public AddYears(value: number): DateTime;
    public AddMonths(value: number): DateTime;
    public AddDays(value: number): DateTime;
    public AddHours(value: number): DateTime;
    public AddMinutes(value: number): DateTime;
    public AddSeconds(value: number): DateTime;
    public AddMilliseconds(value: number): DateTime;
    public AddTicks(value: number): DateTime;
    public Subtract(value: DateTime): TimeSpan;
    public Subtract(value: TimeSpan): DateTime;
    public ToUniversalTime(): DateTime;
    public toString(format?: string): string;
    public valueOf(): Object;
}
declare module Fayde.Localization {
    class Calendar {
        public ID: number;
        public Eras: number[];
        public EraNames: string[];
        public CurrentEraValue: number;
        public TwoDigitYearMax: number;
        public MaxSupportedDateTime: DateTime;
        public MinSupportedDateTime: DateTime;
    }
}
declare module Fayde.Localization {
    enum CalendarWeekRule {
        FirstDay = 0,
        FirstFullWeek = 1,
        FirstFourDayWeek = 2,
    }
    class DateTimeFormatInfo {
        public AbbreviatedDayNames: string[];
        public AbbreviatedMonthGenitiveNames: string[];
        public AbbreviatedMonthNames: string[];
        public AMDesignator: string;
        public Calendar: Calendar;
        public CalendarWeekRule: CalendarWeekRule;
        public DateSeparator: string;
        public DayNames: string[];
        public FirstDayOfWeek: DayOfWeek;
        public FullDateTimePattern: string;
        public LongDatePattern: string;
        public LongTimePattern: string;
        public MonthDayPattern: string;
        public MonthGenitiveNames: string[];
        public MonthNames: string[];
        public PMDesignator: string;
        public RFC1123Pattern: string;
        public ShortDatePattern: string;
        public ShortestDayNames: string[];
        public ShortTimePattern: string;
        public SortableDateTimePattern: string;
        public TimeSeparator: string;
        public UniversalSortableDateTimePattern: string;
        public YearMonthPattern: string;
        public HasForceTwoDigitYears: boolean;
        public GetEraName(era: number): string;
        static Instance: DateTimeFormatInfo;
        static ParseRepeatPattern(format: string, pos: number, patternChar: string): number;
        static ParseNextChar(format: string, pos: number): number;
        static ParseQuoteString(format: string, pos: number, result: string[]): number;
        static FormatDigits(sb: string[], value: number, len: number, overrideLenLimit?: boolean): void;
        static FormatMonth(month: number, repeat: number, info: DateTimeFormatInfo): string;
        static FormatDayOfWeek(dayOfWeek: DayOfWeek, repeat: number, info: DateTimeFormatInfo): string;
        static HebrewFormatDigits(sb: string[], digits: number): string;
        static FormatHebrewMonthName(obj: DateTime, month: number, repeat: number, info: DateTimeFormatInfo): string;
    }
}
declare module Fayde.Localization {
    function Format(format: string, ...items: any[]): string;
    function FormatSingle(obj: any, format: string): string;
    interface IFormattable {
        (obj: any, format: string, provider?: any): string;
    }
    function RegisterFormattable(type: Function, formatter: IFormattable): void;
}
declare module Fayde.Localization {
}
declare module Fayde.Localization {
    class NumberFormatInfo {
        public CurrencyDecimalDigits: number;
        public CurrencyDecimalSeparator: string;
        public CurrencyGroupSeparator: string;
        public CurrencyGroupSizes: number[];
        public CurrencyNegativePattern: number;
        public CurrencyPositivePattern: number;
        public CurrencySymbol: string;
        public NaNSymbol: string;
        public NegativeInfinitySymbol: string;
        public PositiveInfinitySymbol: string;
        public NegativeSign: string;
        public PositiveSign: string;
        public NumberDecimalDigits: number;
        public NumberDecimalSeparator: string;
        public NumberGroupSeparator: string;
        public NumberGroupSizes: number[];
        public NumberNegativePattern: number;
        public PercentDecimalDigits: number;
        public PercentDecimalSeparator: string;
        public PercentGroupSeparator: string;
        public PercentGroupSizes: number[];
        public PercentNegativePattern: number;
        public PercentPositivePattern: number;
        public PercentSymbol: string;
        public PerMilleSymbol: string;
        static Instance: NumberFormatInfo;
        public FormatCurrency(num: number, precision: number): string;
        public FormatNumber(num: number, precision: number, ignoreGroupSep?: boolean): string;
        public FormatPercent(num: number, precision: number): string;
        public FormatGeneral(num: number, precision: number): string;
        public FormatDecimal(num: number, precision: number): string;
        public FormatExponential(num: number, precision: number): string;
        public FormatHexadecimal(num: number, precision: number): string;
        public FormatRawNumber(num: number, precision: number, decSep: string, groupSep: string, groupSizes: number[]): string;
    }
}
declare module Fayde.Localization {
}
declare module Fayde.Localization {
}
declare module Fayde.MVVM {
    function NotifyProperties(type: any, propNames: string[]): void;
    class ObservableObject implements INotifyPropertyChanged {
        public PropertyChanged: MulticastEvent<PropertyChangedEventArgs>;
        public OnPropertyChanged(propertyName: string): void;
    }
}
declare module Fayde.MVVM {
    class RelayCommand implements Input.ICommand {
        constructor(execute?: (parameter: any) => void, canExecute?: (parameter: any) => boolean);
        public Execute(parameter: any): void;
        public CanExecute(parameter: any): boolean;
        public CanExecuteChanged: MulticastEvent<EventArgs>;
        public ForceCanExecuteChanged(): void;
    }
}
declare module Fayde.MVVM {
    class ViewModelBase extends ObservableObject {
    }
}
declare module Fayde.Media.Animation {
    enum EasingMode {
        EaseOut = 0,
        EaseIn = 1,
        EaseInOut = 2,
    }
    enum FillBehavior {
        HoldEnd = 0,
        Stop = 1,
    }
}
declare module Fayde.Media.Animation {
    class RepeatBehavior {
        private _Duration;
        private _Count;
        public IsForever: boolean;
        static FromRepeatDuration(duration: Duration): RepeatBehavior;
        static FromIterationCount(count: number): RepeatBehavior;
        public HasCount : boolean;
        public Count : number;
        public HasDuration : boolean;
        public Duration : Duration;
        public Clone(): RepeatBehavior;
        static Forever: RepeatBehavior;
    }
}
declare module Fayde.Media.Animation {
    interface IClockData {
        CurrentTime: TimeSpan;
        Progress: number;
        Completed: boolean;
    }
    class Timeline extends DependencyObject implements ITimeline {
        static DEFAULT_REPEAT_BEHAVIOR: RepeatBehavior;
        static AutoReverseProperty: DependencyProperty;
        static BeginTimeProperty: DependencyProperty;
        static DurationProperty: DependencyProperty;
        static RepeatBehaviorProperty: DependencyProperty;
        static SpeedRatioProperty: DependencyProperty;
        static FillBehaviorProperty: DependencyProperty;
        public AutoReverse: boolean;
        public BeginTime: TimeSpan;
        public Duration: Duration;
        public RepeatBehavior: RepeatBehavior;
        public SpeedRatio: number;
        public FillBehavior: FillBehavior;
        public Completed: MulticastEvent<EventArgs>;
        private _IsPaused;
        private _BeginPauseTime;
        private _TicksPaused;
        private _IsFirstUpdate;
        private _HasBegun;
        private _BeginTicks;
        private _InitialStep;
        private _HasCompleted;
        public ManualTarget: DependencyObject;
        public HasManualTarget : boolean;
        public Reset(): void;
        public Pause(): void;
        public Resume(): void;
        public Stop(): void;
        public OnCompleted(): void;
        public Update(nowTime: number): void;
        public UpdateInternal(clockData: IClockData): void;
        public HoldEnd(): void;
        private CreateClockData(nowTime);
        private IsAfterBeginTime(nowTime);
        public GetNaturalDuration(): Duration;
        public GetNaturalDurationCore(): Duration;
        public GenerateFrom(): AnimationBase;
        public GenerateTo(isEntering: boolean): AnimationBase;
    }
    class TimelineCollection extends XamlObjectCollection<Timeline> {
    }
}
declare module Fayde.Media.Animation {
    class AnimationBase extends Timeline {
        private _AnimStorage;
        private _IsHolding;
        constructor();
        public Resolve(target: DependencyObject, propd: DependencyProperty): boolean;
        public HoldEnd(): void;
        public Stop(): void;
        public UpdateInternal(clockData: IClockData): void;
        public GetNaturalDurationCore(): Duration;
        public GetCurrentValue(defaultOriginalValue: any, defaultDestinationValue: any, clockData: IClockData): any;
        public _Hookup(promotedValues: any[], error: BError): boolean;
    }
}
declare module Fayde.Media.Animation {
    interface IAnimationStorage {
        ID: number;
        Animation: AnimationBase;
        PropStorage: Providers.IPropertyStorage;
        IsDisabled: boolean;
        BaseValue: any;
        CurrentValue: any;
        StopValue: any;
    }
    class AnimationStore {
        static Create(target: DependencyObject, propd: DependencyProperty): IAnimationStorage;
        static Attach(animStorage: IAnimationStorage): void;
        static Detach(animStorage: IAnimationStorage): boolean;
        static ApplyCurrent(animStorage: IAnimationStorage): void;
        static ApplyStop(animStorage: IAnimationStorage): void;
    }
}
declare module Fayde.Media.Animation {
    class AnimationUsingKeyFrames extends AnimationBase {
        static KeyFramesProperty: ImmutableDependencyProperty<KeyFrameCollection>;
        public KeyFrames: KeyFrameCollection;
        constructor();
        public Resolve(target: DependencyObject, propd: DependencyProperty): boolean;
        public GetCurrentValue(defaultOriginValue: any, defaultDestinationValue: any, clockData: IClockData): any;
        public GetNaturalDurationCore(): Duration;
        public AddKeyFrame(kf: KeyFrame): void;
        public RemoveKeyFrame(kf: KeyFrame): void;
    }
}
declare module Fayde.Media.Animation {
    class BeginStoryboard extends TriggerAction {
        static StoryboardProperty: DependencyProperty;
        public Storyboard: Storyboard;
        public Fire(): void;
    }
}
declare module Fayde.Media.Animation {
    class ColorAnimation extends AnimationBase {
        static ByProperty: DependencyProperty;
        static EasingFunctionProperty: DependencyProperty;
        static FromProperty: DependencyProperty;
        static ToProperty: DependencyProperty;
        public By: Color;
        public EasingFunction: IEasingFunction;
        public From: Color;
        public To: Color;
        private _FromCached;
        private _ToCached;
        private _ByCached;
        private _EasingCached;
        constructor();
        public GetCurrentValue(defaultOriginalValue: any, defaultDestinationValue: any, clockData: IClockData): Color;
        private _FromChanged(args);
        private _ToChanged(args);
        private _ByChanged(args);
        private _EasingChanged(args);
        public GenerateFrom(): AnimationBase;
        public GenerateTo(isEntering: boolean): AnimationBase;
    }
}
declare module Fayde.Media.Animation {
    class ColorAnimationUsingKeyFrames extends AnimationUsingKeyFrames {
        public GenerateFrom(): AnimationBase;
        public GenerateTo(isEntering: boolean): AnimationBase;
    }
}
declare module Fayde.Media.Animation {
    interface IKeyFrameListener {
        KeyFrameChanged(source: KeyFrame): any;
    }
    interface IKeyFrame {
        _ResolvedKeyTime: TimeSpan;
        _Resolved: boolean;
        Value: any;
        InterpolateValue(baseValue: any, keyFrameProgress: number): any;
    }
    class KeyFrame extends DependencyObject implements IKeyFrame {
        public _ResolvedKeyTime: TimeSpan;
        public _Resolved: boolean;
        private _Listener;
        static KeyTimeProperty: DependencyProperty;
        public KeyTime: KeyTime;
        public Value: any;
        public CoerceKeyTime(dobj: DependencyObject, propd: DependencyProperty, value: any, coerced: IOutValue, error: BError): boolean;
        public InterpolateValue(baseValue: any, keyFrameProgress: number): any;
        public CompareToTimeSpan(otherTs: TimeSpan): number;
        public Listen(listener: IKeyFrameListener): void;
        public Unlisten(listener: IKeyFrameListener): void;
        public InvalidateKeyFrame(): void;
        static Comparer(kf1: KeyFrame, kf2: KeyFrame): number;
        static ResolveKeyFrames(animation: AnimationBase, arr: KeyFrame[]): KeyFrame[];
    }
    class KeyFrameCollection extends XamlObjectCollection<KeyFrame> {
        private _Resolved;
        private _SortedList;
        public GetKeyFrameForTime(t: TimeSpan, prevFrameRef: IOutValue): KeyFrame;
        public Clear(): boolean;
        public AddingToCollection(value: KeyFrame, error: BError): boolean;
        public RemovedFromCollection(value: KeyFrame, isValueSafe: boolean): void;
        public KeyFrameChanged(source: KeyFrame): void;
        static ResolveKeyFrames(animation: AnimationBase, coll: KeyFrameCollection): KeyFrame[];
    }
}
declare module Fayde.Media.Animation {
    class ColorKeyFrame extends KeyFrame {
        static ValueProperty: DependencyProperty;
        public Value: Color;
    }
    class DiscreteColorKeyFrame extends ColorKeyFrame {
        public InterpolateValue(baseValue: Color, keyFrameProgress: number): Color;
    }
    class EasingColorKeyFrame extends ColorKeyFrame {
        static EasingFunctionProperty: DependencyProperty;
        public EasingFunction: EasingFunctionBase;
        public InterpolateValue(baseValue: Color, keyFrameProgress: number): Color;
    }
    class LinearColorKeyFrame extends ColorKeyFrame {
        public InterpolateValue(baseValue: Color, keyFrameProgress: number): Color;
    }
    class SplineColorKeyFrame extends ColorKeyFrame {
        static KeySplineProperty: DependencyProperty;
        public KeySpline: KeySpline;
        public InterpolateValue(baseValue: Color, keyFrameProgress: number): Color;
    }
}
declare module Fayde.Media.Animation {
    interface ICurvePoint {
        x: number;
        y: number;
    }
    interface IQuadraticCurve {
        c0: ICurvePoint;
        c1: ICurvePoint;
        c2: ICurvePoint;
    }
    interface ICubicCurve {
        c0: ICurvePoint;
        c1: ICurvePoint;
        c2: ICurvePoint;
        c3: ICurvePoint;
    }
    interface ISubdiviedCubicCurve {
        b1: ICubicCurve;
        b2: ICubicCurve;
    }
    class Curves {
        static QuadraticArrayYForX(arr: IQuadraticCurve[], x: number, count: number): number;
        static QuadraticYForX(x: number, src: IQuadraticCurve): number;
        static SubdivideCubicAtLevel(b: ICubicCurve[], lvl: number, src: ICubicCurve): void;
        static RecursiveSubdivide(b: ICubicCurve[], lvl: number, currentlvl: number, pos: number, src: ICubicCurve): number;
        static SubdivideCubic(data: ISubdiviedCubicCurve, src: ICubicCurve): void;
        static HalfLerpPoint(p: ICurvePoint, p1: ICurvePoint, p2: ICurvePoint): void;
        static ConvertCubicsToQuadratics(srcArray: ICubicCurve[], count: number): IQuadraticCurve[];
        static QuadraticFromCubic(src: ICubicCurve): IQuadraticCurve;
    }
}
declare module Fayde.Media.Animation {
    class DoubleAnimation extends AnimationBase {
        static ByProperty: DependencyProperty;
        static EasingFunctionProperty: DependencyProperty;
        static FromProperty: DependencyProperty;
        static ToProperty: DependencyProperty;
        public By: number;
        public EasingFunction: IEasingFunction;
        public From: number;
        public To: number;
        private _FromCached;
        private _ToCached;
        private _ByCached;
        private _EasingCached;
        constructor();
        public GetCurrentValue(defaultOriginalValue: any, defaultDestinationValue: any, clockData: IClockData): number;
        private _FromChanged(args);
        private _ToChanged(args);
        private _ByChanged(args);
        private _EasingChanged(args);
        public GenerateFrom(): AnimationBase;
        public GenerateTo(isEntering: boolean): AnimationBase;
    }
}
declare module Fayde.Media.Animation {
    class DoubleAnimationUsingKeyFrames extends AnimationUsingKeyFrames {
        public GenerateFrom(): AnimationBase;
        public GenerateTo(isEntering: boolean): AnimationBase;
    }
}
declare module Fayde.Media.Animation {
    class DoubleKeyFrame extends KeyFrame {
        static ValueProperty: DependencyProperty;
        public Value: number;
    }
    class DiscreteDoubleKeyFrame extends DoubleKeyFrame {
        public InterpolateValue(baseValue: number, keyFrameProgress: number): number;
    }
    class EasingDoubleKeyFrame extends DoubleKeyFrame {
        static EasingFunctionProperty: DependencyProperty;
        public EasingFunction: EasingFunctionBase;
        public InterpolateValue(baseValue: number, keyFrameProgress: number): number;
    }
    class LinearDoubleKeyFrame extends DoubleKeyFrame {
        public InterpolateValue(baseValue: number, keyFrameProgress: number): number;
    }
    class SplineDoubleKeyFrame extends DoubleKeyFrame {
        static KeySplineProperty: DependencyProperty;
        public KeySpline: KeySpline;
        public InterpolateValue(baseValue: number, keyFrameProgress: number): number;
    }
}
declare module Fayde.Media.Animation {
    interface IEasingFunction {
        Ease(normalizedTime: number): number;
    }
    class EasingFunctionBase extends DependencyObject implements IEasingFunction {
        static EasingModeProperty: DependencyProperty;
        public EasingMode: EasingMode;
        public Ease(normalizedTime: number): number;
        public EaseInCore(t: number): number;
    }
}
declare module Fayde.Media.Animation {
    class BackEase extends EasingFunctionBase {
        static AmplitudeProperty: DependencyProperty;
        public Amplitude: number;
        public EaseInCore(t: number): number;
    }
    class BounceEase extends EasingFunctionBase {
        static BouncesProperty: DependencyProperty;
        static BouncinessProperty: DependencyProperty;
        public Bounces: number;
        public Bounciness: number;
        public EaseInCore(t: number): number;
    }
    class CircleEase extends EasingFunctionBase {
        public EaseInCore(t: number): number;
    }
    class CubicEase extends EasingFunctionBase {
        public EaseInCore(t: number): number;
    }
    class ElasticEase extends EasingFunctionBase {
        static OscillationsProperty: DependencyProperty;
        static SpringinessProperty: DependencyProperty;
        public Oscillations: number;
        public Springiness: number;
        public EaseInCore(t: number): number;
    }
    class ExponentialEase extends EasingFunctionBase {
        static ExponentProperty: DependencyProperty;
        public Exponent: number;
        public EaseInCore(t: number): number;
    }
    class PowerEase extends EasingFunctionBase {
        static PowerProperty: DependencyProperty;
        public Power: number;
        public EaseInCore(t: number): number;
    }
    class QuadraticEase extends EasingFunctionBase {
        public EaseInCore(t: number): number;
    }
    class QuarticEase extends EasingFunctionBase {
        public EaseInCore(t: number): number;
    }
    class QuinticEase extends EasingFunctionBase {
        public EaseInCore(t: number): number;
    }
    class SineEase extends EasingFunctionBase {
        public EaseInCore(t: number): number;
    }
}
declare module Fayde.Media.Animation {
    class KeySpline extends DependencyObject {
        static PRECISION_LEVEL: number;
        static TOTAL_COUNT: number;
        static ControlPoint1Property: DependencyProperty;
        static ControlPoint2Property: DependencyProperty;
        public ControlPoint1: Point;
        public ControlPoint2: Point;
        private _QuadraticsArray;
        public GetSplineProgress(linearProgress: number): number;
        private InvalidateControlPoints();
        private _RegenerateQuadratics();
    }
}
declare module Fayde.Media.Animation {
    class ObjectAnimationUsingKeyFrames extends AnimationUsingKeyFrames {
        public Resolve(target: DependencyObject, propd: DependencyProperty): boolean;
    }
}
declare module Fayde.Media.Animation {
    class ObjectKeyFrame extends KeyFrame {
        static ValueProperty: DependencyProperty;
        public Value: any;
        public ConvertedValue: any;
    }
    class DiscreteObjectKeyFrame extends ObjectKeyFrame {
        public InterpolateValue(baseValue: any, keyFrameProgress: number): any;
    }
}
declare module Fayde.Media.Animation {
    class PointAnimation extends AnimationBase {
        static ByProperty: DependencyProperty;
        static EasingFunctionProperty: DependencyProperty;
        static FromProperty: DependencyProperty;
        static ToProperty: DependencyProperty;
        public By: Point;
        public EasingFunction: IEasingFunction;
        public From: Point;
        public To: Point;
        private _FromCached;
        private _ToCached;
        private _ByCached;
        private _EasingCached;
        constructor();
        public GetCurrentValue(defaultOriginalValue: any, defaultDestinationValue: any, clockData: IClockData): Point;
        private _FromChanged(args);
        private _ToChanged(args);
        private _ByChanged(args);
        private _EasingChanged(args);
        public GenerateFrom(): AnimationBase;
        public GenerateTo(isEntering: boolean): AnimationBase;
    }
}
declare module Fayde.Media.Animation {
    class PointAnimationUsingKeyFrames extends AnimationUsingKeyFrames {
        public GenerateFrom(): AnimationBase;
        public GenerateTo(isEntering: boolean): AnimationBase;
    }
}
declare module Fayde.Media.Animation {
    class PointKeyFrame extends KeyFrame {
        static ValueProperty: DependencyProperty;
        public Value: Point;
    }
    class DiscretePointKeyFrame extends PointKeyFrame {
        public InterpolateValue(baseValue: Point, keyFrameProgress: number): Point;
    }
    class EasingPointKeyFrame extends PointKeyFrame {
        static EasingFunctionProperty: DependencyProperty;
        public EasingFunction: EasingFunctionBase;
        public InterpolateValue(baseValue: Point, keyFrameProgress: number): Point;
    }
    class LinearPointKeyFrame extends PointKeyFrame {
        public InterpolateValue(baseValue: Point, keyFrameProgress: number): Point;
    }
    class SplinePointKeyFrame extends PointKeyFrame {
        static KeySplineProperty: DependencyProperty;
        public KeySpline: KeySpline;
        public InterpolateValue(baseValue: Point, keyFrameProgress: number): Point;
    }
}
declare module Fayde.Media.Animation {
    interface IStoryboadResolution {
        Target: DependencyObject;
        Property: Data.PropertyPath;
    }
    class Storyboard extends Timeline {
        static TargetNameProperty: DependencyProperty;
        static GetTargetName(d: DependencyObject): string;
        static SetTargetName(d: DependencyObject, value: string): void;
        public TargetName: string;
        static TargetPropertyProperty: DependencyProperty;
        static GetTargetProperty(d: DependencyObject): Data.PropertyPath;
        static SetTargetProperty(d: DependencyObject, value: Data.PropertyPath): void;
        public TargetProperty: Data.PropertyPath;
        static ResolveTarget(timeline: Timeline): IStoryboadResolution;
        static ChildrenProperty: ImmutableDependencyProperty<TimelineCollection>;
        public Children: TimelineCollection;
        constructor();
        static SetTarget(timeline: Timeline, target: DependencyObject): void;
        public Begin(): void;
        public Pause(): void;
        public Resume(): void;
        public Stop(): void;
        public UpdateInternal(clockData: IClockData): void;
        public GetNaturalDurationCore(): Duration;
    }
}
declare module Fayde.Media {
    interface IBrushChangedListener {
        Callback: (newBrush: Brush) => void;
        Detach(): any;
    }
    class Brush extends DependencyObject {
        static TransformProperty: DependencyProperty;
        public Transform: Transform;
        private _CachedBounds;
        private _CachedBrush;
        private _Listeners;
        constructor();
        public SetupBrush(ctx: CanvasRenderingContext2D, bounds: rect): void;
        public CreateBrush(ctx: CanvasRenderingContext2D, bounds: rect): any;
        public ToHtml5Object(): any;
        public Listen(func: (newBrush: Brush) => void): IBrushChangedListener;
        public InvalidateBrush(): void;
        private _TransformListener;
        private _TransformChanged(args);
    }
}
declare module Fayde.Media {
    class GeneralTransform extends DependencyObject {
        public Inverse: GeneralTransform;
        public Transform(p: Point): Point;
        public TransformBounds(r: rect): rect;
        public TryTransform(inPoint: Point, outPoint: Point): boolean;
    }
    class InternalTransform extends GeneralTransform {
        private _Raw;
        constructor(raw: number[]);
        public Inverse : InternalTransform;
        public Value : Matrix3D;
        public Transform(p: Point): Point;
        public TransformBounds(r: rect): rect;
        public CreateMatrix3DProjection(): Matrix3DProjection;
    }
}
declare module Fayde.Media.Effects {
    interface IEffectListener {
        EffectChanged(effect: Effect): any;
    }
    class Effect extends DependencyObject {
        private _Listener;
        static EffectMappingProperty: DependencyProperty;
        public EffectMapping: GeneralTransform;
        public Padding(): Thickness;
        public GetPadding(thickness: Thickness): boolean;
        public PreRender(ctx: RenderContextEx): void;
        public Listen(listener: IEffectListener): void;
        public Unlisten(listener: IEffectListener): void;
        public _EffectChanged(args: IDependencyPropertyChangedEventArgs): void;
    }
}
declare module Fayde.Media.Effects {
    class BlurEffect extends Effect {
        static RadiusProperty: DependencyProperty;
        public Radius: number;
    }
}
declare class Color implements ICloneable {
    private static __NoAlphaRegex;
    private static __AlphaRegex;
    public R: number;
    public G: number;
    public B: number;
    public A: number;
    public Add(color2: Color): Color;
    public Subtract(color2: Color): Color;
    public Multiply(factor: number): Color;
    public Equals(other: Color): boolean;
    public toString(): string;
    public ToHexStringNoAlpha(): string;
    public Clone(): Color;
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
declare module Fayde.Media.Effects {
    class DropShadowEffect extends Effect {
        static MAX_BLUR_RADIUS: number;
        static MAX_SHADOW_DEPTH: number;
        static BlurRadiusProperty: DependencyProperty;
        static ColorProperty: DependencyProperty;
        static DirectionProperty: DependencyProperty;
        static OpacityProperty: DependencyProperty;
        static ShadowDepthProperty: DependencyProperty;
        public BlurRadius: number;
        public Color: Color;
        public Direction: number;
        public Opacity: number;
        public ShadowDepth: number;
        public Padding(): Thickness;
        public GetPadding(thickness: Thickness): boolean;
        public PreRender(ctx: RenderContextEx): void;
    }
}
declare module Fayde.Media {
    interface IGeometryListener {
        GeometryChanged(newGeometry: Geometry): any;
    }
    class Geometry extends DependencyObject {
        private _Path;
        private _LocalBounds;
        private _Listener;
        static TransformProperty: DependencyProperty;
        public Transform: Transform;
        constructor();
        public GetBounds(pars?: Path.IStrokeParameters): rect;
        public Draw(ctx: RenderContextEx): void;
        public ComputePathBounds(pars: Path.IStrokeParameters): rect;
        public _InvalidateGeometry(): void;
        public _Build(): Path.RawPath;
        public Listen(listener: IGeometryListener): void;
        public Unlisten(listener: IGeometryListener): void;
        private _TransformListener;
        private _TransformChanged(args);
        public Serialize(): string;
    }
    class GeometryCollection extends XamlObjectCollection<Geometry> implements IGeometryListener {
        private _Listener;
        public Listen(listener: IGeometryListener): void;
        public Unlisten(listener: IGeometryListener): void;
        public AddingToCollection(value: Geometry, error: BError): boolean;
        public RemovedFromCollection(value: Geometry, isValueSafe: boolean): void;
        public GeometryChanged(newGeometry: Geometry): void;
    }
}
declare module Fayde.Media {
    class EllipseGeometry extends Geometry {
        static CenterProperty: DependencyProperty;
        static RadiusXProperty: DependencyProperty;
        static RadiusYProperty: DependencyProperty;
        public Center: Point;
        public RadiusX: number;
        public RadiusY: number;
        public _Build(): Path.RawPath;
    }
}
declare module Fayde.Shapes {
    enum ShapeFlags {
        None = 0,
        Empty = 1,
        Normal = 2,
        Degenerate = 4,
        Radii = 8,
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
    enum FillRule {
        EvenOdd = 0,
        NonZero = 1,
    }
    enum SweepDirection {
        Counterclockwise = 0,
        Clockwise = 1,
    }
}
declare module Fayde.Media {
    class GeometryGroup extends Geometry implements IGeometryListener {
        static FillRulleProperty: DependencyProperty;
        static ChildrenProperty: ImmutableDependencyProperty<GeometryCollection>;
        public FillRule: Shapes.FillRule;
        public Children: GeometryCollection;
        constructor();
        public ComputePathBounds(pars: Path.IStrokeParameters): rect;
        public Draw(ctx: RenderContextEx): void;
        public GeometryChanged(newGeometry: Geometry): void;
    }
}
declare module Fayde.Media {
    class GradientBrush extends Brush implements IGradientStopsListener {
        static GradientStopsProperty: ImmutableDependencyProperty<GradientStopCollection>;
        static MappingModeProperty: DependencyProperty;
        static SpreadMethodProperty: DependencyProperty;
        public GradientStops: GradientStopCollection;
        public MappingMode: BrushMappingMode;
        public SpreadMethod: GradientSpreadMethod;
        constructor();
        public CreateBrush(ctx: CanvasRenderingContext2D, bounds: rect): any;
        public _CreatePad(ctx: CanvasRenderingContext2D, bounds: rect): void;
        public _CreateRepeat(ctx: CanvasRenderingContext2D, bounds: rect): void;
        public _CreateReflect(ctx: CanvasRenderingContext2D, bounds: rect): void;
        public _GetMappingModeTransform(bounds: rect): number[];
        public GradientStopsChanged(newGradientStops: GradientStopCollection): void;
    }
}
declare module Fayde.Media {
    interface ICoordinates {
        x: number;
        y: number;
    }
    class GradientMetrics {
        static Calculate(dir: ICoordinates, first: ICoordinates, last: ICoordinates, bounds: rect): void;
        private static E(dir, first, last, bounds);
        private static W(dir, first, last, bounds);
        private static S(dir, first, last, bounds);
        private static N(dir, first, last, bounds);
        private static NW(dir, first, last, bounds);
        private static SW(dir, first, last, bounds);
        private static NE(dir, first, last, bounds);
        private static SE(dir, first, last, bounds);
    }
}
declare module Fayde.Media {
    interface IGradientStopListener {
        GradientStopChanged(newGradientStop: GradientStop): any;
    }
    class GradientStop extends DependencyObject {
        private _Listener;
        static ColorProperty: DependencyProperty;
        static OffsetProperty: DependencyProperty;
        public Color: Color;
        public Offset: number;
        public Listen(listener: IGradientStopListener): void;
        public Unlisten(listener: IGradientStopListener): void;
        private _GradientStopChanged();
        public toString(): string;
    }
    interface IGradientStopsListener {
        GradientStopsChanged(newGradientStops: GradientStopCollection): any;
    }
    class GradientStopCollection extends XamlObjectCollection<GradientStop> implements IGradientStopListener {
        private _Listener;
        public Listen(listener: IGradientStopsListener): void;
        public Unlisten(listener: IGradientStopsListener): void;
        public AddingToCollection(value: GradientStop, error: BError): boolean;
        public RemovedFromCollection(value: GradientStop, isValueSafe: boolean): boolean;
        public GradientStopChanged(newGradientStop: GradientStop): void;
    }
}
declare module Fayde.Media.Imaging {
    class ImageSource extends DependencyObject {
        public PixelWidth: number;
        public PixelHeight: number;
        public Lock(): void;
        public Unlock(): void;
        public Image : HTMLImageElement;
    }
}
declare module Fayde.Media.Imaging {
    interface IImageChangedListener {
        OnImageErrored(source: BitmapSource, e: Event): any;
        OnImageLoaded(source: BitmapSource, e: Event): any;
        ImageChanged(source: BitmapSource): any;
    }
    class BitmapSource extends ImageSource {
        static PixelWidthProperty: DependencyProperty;
        static PixelHeightProperty: DependencyProperty;
        private _Listener;
        private _Image;
        public Image : HTMLImageElement;
        public ResetImage(): void;
        public UriSourceChanged(oldValue: Uri, newValue: Uri): void;
        public Listen(listener: IImageChangedListener): void;
        public Unlisten(listener: IImageChangedListener): void;
        public _OnErrored(e: Event): void;
        public _OnLoad(e: Event): void;
    }
}
declare enum UriKind {
    Absolute = 0,
    Relative = 1,
    RelativeOrAbsolute = 2,
}
declare class Uri implements ICloneable {
    private _OriginalString;
    private _Kind;
    constructor(originalString: string, kind?: UriKind);
    public OriginalString : string;
    public Fragment : string;
    public toString(): string;
    public Clone(): Uri;
    static IsNullOrEmpty(uri: Uri): boolean;
    static Equals(uri1: Uri, uri2: Uri): boolean;
}
declare module Fayde.Media.Imaging {
    class BitmapImage extends BitmapSource {
        static UriSourceProperty: DependencyProperty;
        public UriSource: Uri;
        public ImageFailed: MulticastEvent<EventArgs>;
        public ImageOpened: MulticastEvent<EventArgs>;
        constructor(uri?: Uri);
        private _UriSourceChanged(args);
        public _OnErrored(e: Event): void;
        public _OnLoad(e: Event): void;
    }
}
declare module Fayde.Media {
    class TileBrush extends Brush {
        static AlignmentXProperty: DependencyProperty;
        static AlignmentYProperty: DependencyProperty;
        static StretchProperty: DependencyProperty;
        public AlignmentX: AlignmentX;
        public AlignmentY: AlignmentY;
        public Stretch: Stretch;
        public CreateBrush(ctx: CanvasRenderingContext2D, bounds: rect): CanvasPattern;
        public GetTileExtents(): rect;
        public DrawTile(canvasCtx: CanvasRenderingContext2D, bounds: rect): void;
    }
}
declare module Fayde.Media.Imaging {
    class ImageBrush extends TileBrush implements IImageChangedListener {
        private static _SourceCoercer(d, propd, value);
        static ImageSourceProperty: DependencyProperty;
        public ImageSource: ImageSource;
        public ImageFailed: MulticastEvent<EventArgs>;
        public ImageOpened: MulticastEvent<EventArgs>;
        public SetupBrush(ctx: CanvasRenderingContext2D, bounds: rect): void;
        public GetTileExtents(): rect;
        public DrawTile(canvasCtx: CanvasRenderingContext2D, bounds: rect): void;
        private _ImageSourceChanged(args);
        public OnImageErrored(source: BitmapSource, e: Event): void;
        public OnImageLoaded(source: BitmapSource, e: Event): void;
        public ImageChanged(source: BitmapSource): void;
    }
}
declare module Fayde.Media {
    class LineGeometry extends Geometry {
        static StartPointProperty: DependencyProperty;
        static EndPointProperty: DependencyProperty;
        public StartPoint: Point;
        public EndPoint: Point;
        public _Build(): Path.RawPath;
    }
}
declare module Fayde.Media {
    class LinearGradientBrush extends GradientBrush {
        static StartPointProperty: DependencyProperty;
        static EndPointProperty: DependencyProperty;
        public StartPoint: Point;
        public EndPoint: Point;
        public _CreatePad(ctx: CanvasRenderingContext2D, bounds: rect): CanvasGradient;
        public _CreateRepeat(ctx: CanvasRenderingContext2D, bounds: rect): CanvasGradient;
        public _CreateReflect(ctx: CanvasRenderingContext2D, bounds: rect): void;
        private _GetPointData(bounds);
        public toString(): string;
    }
}
declare module Fayde.Media {
    interface IMatrixChangedListener {
        Callback: (newMatrix: Matrix) => void;
        Detach(): any;
    }
    class Matrix {
        public _Raw: number[];
        private _Inverse;
        constructor(raw?: number[]);
        static Identity : Matrix;
        public M11 : number;
        public M12 : number;
        public M21 : number;
        public M22 : number;
        public OffsetX : number;
        public OffsetY : number;
        public Inverse : Matrix;
        private _Listeners;
        public Listen(func: (newMatrix: Matrix) => void): IMatrixChangedListener;
        private _OnChanged();
        public Clone(): Matrix;
        public toString(): string;
    }
}
declare module Fayde.Media {
    interface IMatrix3DChangedListener {
        Callback: (newMatrix3D: Matrix3D) => void;
        Detach(): any;
    }
    class Matrix3D {
        public _Raw: number[];
        private _Inverse;
        static FromRaw(raw: number[]): Matrix3D;
        public M11 : number;
        public M12 : number;
        public M13 : number;
        public M14 : number;
        public M21 : number;
        public M22 : number;
        public M23 : number;
        public M24 : number;
        public M31 : number;
        public M32 : number;
        public M33 : number;
        public M34 : number;
        public OffsetX : number;
        public OffsetY : number;
        public OffsetZ : number;
        public M44 : number;
        public Inverse : Matrix3D;
        private _Listeners;
        public Listen(func: (newMatrix: Matrix3D) => void): IMatrix3DChangedListener;
        private _OnChanged();
        public toString(): string;
    }
}
declare module Fayde.Media {
    interface IProjectionChangedListener {
        Callback: (source: Projection) => void;
        Detach(): any;
    }
    class Projection extends DependencyObject {
        private _ProjectionMatrix;
        public _ObjectWidth: number;
        public _ObjectHeight: number;
        public SetObjectSize(size: ISize): void;
        public GetDistanceFromXYPlane(): number;
        public GetTransform(): number[];
        public CreateProjectionMatrix(): Matrix3D;
        private _Listeners;
        public Listen(func: (source: Projection) => void): IProjectionChangedListener;
        public _InvalidateProjection(): void;
    }
}
declare module Fayde.Media {
    class Matrix3DProjection extends Projection {
        static ProjectionMatrixProperty: DependencyProperty;
        public ProjectionMatrix: Matrix3D;
        public CreateProjectionMatrix(): Matrix3D;
    }
}
declare module Fayde.Media {
    function ParseGeometry(val: string): Geometry;
    function ParseShapePoints(val: string): Point[];
}
declare module Fayde.Media {
    interface IPathFigureListener {
        PathFigureChanged(newPathFigure: PathFigure): any;
    }
    class PathFigure extends DependencyObject implements IPathSegmentListener {
        static IsClosedProperty: DependencyProperty;
        static StartPointProperty: DependencyProperty;
        static IsFilledProperty: DependencyProperty;
        static SegmentsProperty: ImmutableDependencyProperty<PathSegmentCollection>;
        public IsClosed: boolean;
        public Segments: PathSegmentCollection;
        public StartPoint: Point;
        public IsFilled: boolean;
        private _Path;
        private _Listener;
        constructor();
        private _Build();
        public PathSegmentChanged(newPathSegment: PathSegment): void;
        private InvalidatePathFigure();
        public Listen(listener: IPathFigureListener): void;
        public Unlisten(listener: IPathFigureListener): void;
        public MergeInto(rp: Path.RawPath): void;
    }
    class PathFigureCollection extends XamlObjectCollection<PathFigure> implements IPathFigureListener {
        private _Listener;
        public AddingToCollection(value: PathFigure, error: BError): boolean;
        public RemovedFromCollection(value: PathFigure, isValueSafe: boolean): void;
        public Listen(listener: IPathFigureListener): void;
        public Unlisten(listener: IPathFigureListener): void;
        public PathFigureChanged(newPathFigure: PathFigure): void;
    }
}
declare module Fayde.Media {
    class PathGeometry extends Geometry implements IPathFigureListener {
        private _OverridePath;
        static FillRuleProperty: DependencyProperty;
        static FiguresProperty: ImmutableDependencyProperty<PathFigureCollection>;
        public FillRule: Shapes.FillRule;
        public Figures: PathFigureCollection;
        constructor();
        public OverridePath(path: Path.RawPath): void;
        public _Build(): Path.RawPath;
        public PathFigureChanged(newPathFigure: PathFigure): void;
    }
}
declare module Fayde.Media {
    interface IPathSegmentListener {
        PathSegmentChanged(newPathSegment: PathSegment): any;
    }
    class PathSegment extends DependencyObject {
        private _Listener;
        public _Append(path: Path.RawPath): void;
        public Listen(listener: IPathSegmentListener): void;
        public Unlisten(listener: IPathSegmentListener): void;
    }
    class PathSegmentCollection extends XamlObjectCollection<PathSegment> implements IPathSegmentListener {
        private _Listener;
        public AddingToCollection(value: PathSegment, error: BError): boolean;
        public RemovedFromCollection(value: PathSegment, isValueSafe: boolean): void;
        public Listen(listener: IPathSegmentListener): void;
        public Unlisten(listener: IPathSegmentListener): void;
        public PathSegmentChanged(newPathSegment: PathSegment): void;
    }
}
declare module Fayde.Media {
    class ArcSegment extends PathSegment {
        static IsLargeArcProperty: DependencyProperty;
        static PointProperty: DependencyProperty;
        static RotationAngleProperty: DependencyProperty;
        static SizeProperty: DependencyProperty;
        static SweepDirectionProperty: DependencyProperty;
        public IsLargeArc: boolean;
        public Point: Point;
        public RotationAngle: number;
        public Size: size;
        public SweepDirection: Shapes.SweepDirection;
        public _Append(path: Path.RawPath): void;
    }
    class BezierSegment extends PathSegment {
        static Point1Property: DependencyProperty;
        static Point2Property: DependencyProperty;
        static Point3Property: DependencyProperty;
        public Point1: Point;
        public Point2: Point;
        public Point3: Point;
        public _Append(path: Path.RawPath): void;
    }
    class LineSegment extends PathSegment {
        static PointProperty: DependencyProperty;
        public Point: Point;
        public _Append(path: Path.RawPath): void;
    }
    class PolyBezierSegment extends PathSegment {
        static PointsProperty: ImmutableDependencyProperty<Shapes.PointCollection>;
        public Points: Shapes.PointCollection;
        constructor();
        public _Append(path: Path.RawPath): void;
    }
    class PolyLineSegment extends PathSegment {
        static PointsProperty: ImmutableDependencyProperty<Shapes.PointCollection>;
        public Points: Shapes.PointCollection;
        constructor();
        public _Append(path: Path.RawPath): void;
    }
    class PolyQuadraticBezierSegment extends PathSegment {
        static PointsProperty: ImmutableDependencyProperty<Shapes.PointCollection>;
        public Points: Shapes.PointCollection;
        constructor();
        public _Append(path: Path.RawPath): void;
    }
    class QuadraticBezierSegment extends PathSegment {
        static Point1Property: DependencyProperty;
        static Point2Property: DependencyProperty;
        public Point1: Point;
        public Point2: Point;
        public _Append(path: Path.RawPath): void;
    }
}
declare module Fayde.Media {
    class PlaneProjection extends Projection {
        static CenterOfRotationXProperty: DependencyProperty;
        static CenterOfRotationYProperty: DependencyProperty;
        static CenterOfRotationZProperty: DependencyProperty;
        static GlobalOffsetXProperty: DependencyProperty;
        static GlobalOffsetYProperty: DependencyProperty;
        static GlobalOffsetZProperty: DependencyProperty;
        static LocalOffsetXProperty: DependencyProperty;
        static LocalOffsetYProperty: DependencyProperty;
        static LocalOffsetZProperty: DependencyProperty;
        static RotationXProperty: DependencyProperty;
        static RotationYProperty: DependencyProperty;
        static RotationZProperty: DependencyProperty;
        public CenterOfRotationX: number;
        public CenterOfRotationY: number;
        public CenterOfRotationZ: number;
        public GlobalOffsetX: number;
        public GlobalOffsetY: number;
        public GlobalOffsetZ: number;
        public LocalOffsetX: number;
        public LocalOffsetY: number;
        public LocalOffsetZ: number;
        public RotationX: number;
        public RotationY: number;
        public RotationZ: number;
        public GetDistanceFromXYPlane(): number;
        public CreateProjectionMatrix3D(): Matrix3D;
    }
}
declare module Fayde.Media {
    class RadialGradientBrush extends GradientBrush {
        static CenterProperty: DependencyProperty;
        static GradientOriginProperty: DependencyProperty;
        static RadiusXProperty: DependencyProperty;
        static RadiusYProperty: DependencyProperty;
        public Center: Point;
        public GradientOrigin: Point;
        public RadiusX: number;
        public RadiusY: number;
        public CreateBrush(ctx: CanvasRenderingContext2D, bounds: rect): any;
    }
}
declare module Fayde.Media {
    class RectangleGeometry extends Geometry {
        static RectProperty: DependencyProperty;
        static RadiusXProperty: DependencyProperty;
        static RadiusYProperty: DependencyProperty;
        public Rect: rect;
        public RadiusX: number;
        public RadiusY: number;
        public _Build(): Path.RawPath;
    }
}
declare module Fayde.Media {
    class SolidColorBrush extends Brush {
        static ColorProperty: DependencyProperty;
        public Color: Color;
        constructor(...args: any[]);
        static FromColor(color: Color): SolidColorBrush;
        public CreateBrush(ctx: CanvasRenderingContext2D, bounds: rect): any;
    }
}
declare module Fayde.Media {
    class TextOptions {
        static TextHintingModeProperty: DependencyProperty;
        static GetTextHintingMode(d: DependencyObject): TextHintingMode;
        static SetTextHintingMode(d: DependencyObject, value: TextHintingMode): void;
    }
}
declare module Fayde.Media {
    interface ITransformChangedListener {
        Callback: (source: Transform) => void;
        Detach(): any;
    }
    class Transform extends GeneralTransform {
        private _Value;
        constructor();
        public Value : Matrix;
        public Inverse : Transform;
        public Transform(p: Point): Point;
        public TransformBounds(r: rect): rect;
        public TryTransform(inPoint: Point, outPoint: Point): boolean;
        private _Listeners;
        public Listen(func: (source: Transform) => void): ITransformChangedListener;
        public _InvalidateValue(): void;
        public _BuildValue(): number[];
    }
    class MatrixTransform extends Transform {
        static MatrixProperty: DependencyProperty;
        public Matrix: Matrix;
        public _BuildValue(): number[];
        public Clone(): MatrixTransform;
        private _MatrixListener;
        public _MatrixChanged(args: IDependencyPropertyChangedEventArgs): void;
    }
}
declare module Fayde.Media {
    class RotateTransform extends Transform {
        static AngleProperty: DependencyProperty;
        static CenterXProperty: DependencyProperty;
        static CenterYProperty: DependencyProperty;
        public Angle: number;
        public CenterX: number;
        public CenterY: number;
        public _BuildValue(): number[];
    }
    class ScaleTransform extends Transform {
        static CenterXProperty: DependencyProperty;
        static CenterYProperty: DependencyProperty;
        static ScaleXProperty: DependencyProperty;
        static ScaleYProperty: DependencyProperty;
        public CenterX: number;
        public CenterY: number;
        public ScaleX: number;
        public ScaleY: number;
        public _BuildValue(): number[];
    }
    class SkewTransform extends Transform {
        static AngleXProperty: DependencyProperty;
        static AngleYProperty: DependencyProperty;
        static CenterXProperty: DependencyProperty;
        static CenterYProperty: DependencyProperty;
        public AngleX: number;
        public AngleY: number;
        public CenterX: number;
        public CenterY: number;
        public _BuildValue(): number[];
    }
    class TranslateTransform extends Transform {
        static XProperty: DependencyProperty;
        static YProperty: DependencyProperty;
        public X: number;
        public Y: number;
        public _BuildValue(): number[];
    }
    interface ITransformChangedChildListener extends ITransformChangedListener {
        Child: Transform;
    }
    class TransformCollection extends XamlObjectCollection<Transform> {
        private _Relayer;
        private _ChildTransformListeners;
        public AddingToCollection(value: Transform, error: BError): boolean;
        public RemovedFromCollection(value: Transform, isValueSafe: boolean): boolean;
        public RelayChanges(func: () => void): void;
    }
    class TransformGroup extends Transform {
        static ChildrenProperty: ImmutableDependencyProperty<TransformCollection>;
        public Children: TransformCollection;
        private _TransformListener;
        constructor();
        public _BuildValue(): number[];
    }
}
declare module Fayde.Media.VSM {
    class VisualState extends DependencyObject {
        static StoryboardProperty: DependencyProperty;
        public Storyboard: Animation.Storyboard;
    }
    class VisualStateCollection extends XamlObjectCollection<VisualState> {
    }
}
declare module Fayde.Media.VSM {
    class VisualStateChangedEventArgs extends EventArgs {
        public OldState: VisualState;
        public NewState: VisualState;
        public Control: Controls.Control;
        constructor(oldState: VisualState, newState: VisualState, control: Controls.Control);
    }
    class VisualStateGroup extends DependencyObject {
        static StatesProperty: ImmutableDependencyProperty<VisualStateCollection>;
        public States: VisualStateCollection;
        static TransitionsProperty: ImmutableDependencyProperty<XamlObjectCollection<VisualTransition>>;
        public Transitions: XamlObjectCollection<VisualTransition>;
        private _CurrentStoryboards;
        public CurrentStoryboards : Animation.Storyboard[];
        public CurrentStateChanging: MulticastEvent<VisualStateChangedEventArgs>;
        public CurrentStateChanged: MulticastEvent<VisualStateChangedEventArgs>;
        public CurrentState: VisualState;
        constructor();
        public GetState(stateName: string): VisualState;
        public StartNewThenStopOld(element: FrameworkElement, newStoryboards: Animation.Storyboard[]): void;
        public StopCurrentStoryboards(element: FrameworkElement): void;
        public RaiseCurrentStateChanging(element: FrameworkElement, oldState: VisualState, newState: VisualState, control: Controls.Control): void;
        public RaiseCurrentStateChanged(element: FrameworkElement, oldState: VisualState, newState: VisualState, control: Controls.Control): void;
    }
    class VisualStateGroupCollection extends XamlObjectCollection<VisualStateGroup> {
    }
}
declare module Fayde.Media.VSM {
    interface IStateData {
        state: VisualState;
        group: VisualStateGroup;
    }
    class VisualStateManager extends DependencyObject {
        static VisualStateGroupsProperty: DependencyProperty;
        static GetVisualStateGroups(d: DependencyObject): VisualStateGroupCollection;
        static SetVisualStateGroups(d: DependencyObject, value: VisualStateGroupCollection): void;
        static CustomVisualStateManagerProperty: DependencyProperty;
        static GetCustomVisualStateManager(d: DependencyObject): VisualStateManager;
        static SetCustomVisualStateManager(d: DependencyObject, value: VisualStateManager): void;
        static GoToState(control: Controls.Control, stateName: string, useTransitions: boolean): boolean;
        public GoToStateCore(control: Controls.Control, element: FrameworkElement, stateName: string, group: VisualStateGroup, state: VisualState, useTransitions: boolean): boolean;
        private static GoToStateInternal(control, element, group, state, useTransitions);
        static DestroyStoryboards(control: Controls.Control, root: FrameworkElement): boolean;
        private static _GetTemplateRoot(control);
        static GetGroup(control: Controls.Control, name: string): VisualStateGroup;
        private static _TryGetState(groups, stateName, data);
        private static _GetTransition(element, group, from, to);
    }
}
declare module Fayde.Media.VSM {
    class VisualTransition extends DependencyObject {
        public From: string;
        public To: string;
        public Storyboard: Animation.Storyboard;
        private _GeneratedDuration;
        public GeneratedDuration : Duration;
        public DynamicStoryboardCompleted: boolean;
        public ExplicitStoryboardCompleted: boolean;
        public GeneratedEasingFunction: Animation.EasingFunctionBase;
        public IsDefault : boolean;
    }
}
declare module Fayde.Navigation {
    class NavigationService {
        public Href: string;
        public Hash: string;
        public LocationChanged: MulticastEvent<EventArgs>;
        constructor();
        private _HandleFragmentChange();
    }
}
declare module Fayde.Navigation {
    class UriMapper extends DependencyObject {
        static UriMappingsProperty: ImmutableDependencyProperty<XamlObjectCollection<UriMapping>>;
        public UriMappings: XamlObjectCollection<UriMapping>;
        constructor();
        public MapUri(uri: Uri): Uri;
    }
}
declare module Fayde.Navigation {
    class UriMapping extends DependencyObject {
        static MappedUriProperty: DependencyProperty;
        static UriProperty: DependencyProperty;
        public MappedUri: Uri;
        public Uri: Uri;
        public MapUri(uri: Uri): Uri;
    }
}
declare module Fayde.Path {
    interface IArc extends IPathEntry {
        x: number;
        y: number;
        radius: number;
        sAngle: number;
        eAngle: number;
        aClockwise: boolean;
    }
    function Arc(x: number, y: number, radius: number, sa: number, ea: number, cc: boolean): IArc;
}
declare function radToDegrees(rad: any): number;
declare module Fayde.Path {
    interface IArcTo extends IPathEntry {
        cpx: number;
        cpy: number;
        x: number;
        y: number;
        radius: number;
    }
    function ArcTo(cpx: number, cpy: number, x: number, y: number, radius: number): IArcTo;
}
declare module Fayde.Path {
    interface IClose extends IPathEntry {
        isClose: boolean;
    }
    function Close(): IClose;
}
declare module Fayde.Path {
    interface ICubicBezier extends IPathEntry {
        cp1x: number;
        cp1y: number;
        cp2x: number;
        cp2y: number;
        x: number;
        y: number;
    }
    function CubicBezier(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): ICubicBezier;
}
declare module Fayde.Path {
    interface IEllipse extends IPathEntry {
        x: number;
        y: number;
        width: number;
        height: number;
    }
    function Ellipse(x: number, y: number, width: number, height: number): IEllipse;
}
declare module Fayde.Path {
    interface IEllipticalArc extends IPathEntry {
        width: number;
        height: number;
        rotationAngle: number;
        isLargeArcFlag: boolean;
        sweepDirectionFlag: Shapes.SweepDirection;
        ex: number;
        ey: number;
    }
    function EllipticalArc(width: number, height: number, rotationAngle: number, isLargeArcFlag: boolean, sweepDirectionFlag: Shapes.SweepDirection, ex: number, ey: number): IEllipticalArc;
}
declare module Fayde.Path {
    interface ILine extends IPathEntry {
        x: number;
        y: number;
    }
    function Line(x: number, y: number): ILine;
}
declare module Fayde.Path {
    interface IMove extends IPathEntry {
        x: number;
        y: number;
        isMove: boolean;
    }
    function Move(x: number, y: number): IMove;
}
declare module Fayde.Path {
    interface IQuadraticBezier extends IPathEntry {
        cpx: number;
        cpy: number;
        x: number;
        y: number;
    }
    function QuadraticBezier(cpx: number, cpy: number, x: number, y: number): IQuadraticBezier;
}
declare module Fayde.Path {
    interface IStrokeParameters {
        thickness: number;
        join: Shapes.PenLineJoin;
        startCap: Shapes.PenLineCap;
        endCap: Shapes.PenLineCap;
        miterLimit: number;
    }
    interface IBoundingBox {
        l: number;
        r: number;
        t: number;
        b: number;
    }
    interface IPathEntry {
        sx: number;
        sy: number;
        ex: number;
        ey: number;
        isSingle: boolean;
        draw: (canvasCtx: CanvasRenderingContext2D) => void;
        extendFillBox: (box: IBoundingBox) => void;
        extendStrokeBox: (box: IBoundingBox, pars: IStrokeParameters) => void;
        getStartVector(): number[];
        getEndVector(): number[];
    }
    class RawPath {
        private _Path;
        private _EndX;
        private _EndY;
        public EndX : number;
        public EndY : number;
        public Move(x: number, y: number): void;
        public Line(x: number, y: number): void;
        public Rect(x: number, y: number, width: number, height: number): void;
        public RoundedRectFull(x: number, y: number, width: number, height: number, topLeft: number, topRight: number, bottomRight: number, bottomLeft: number): void;
        public RoundedRect(x: number, y: number, width: number, height: number, radiusX: number, radiusY: number): void;
        public QuadraticBezier(cpx: number, cpy: number, x: number, y: number): void;
        public CubicBezier(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void;
        public Ellipse(x: number, y: number, width: number, height: number): void;
        public EllipticalArc(width: number, height: number, rotationAngle: number, isLargeArcFlag: boolean, sweepDirectionFlag: Shapes.SweepDirection, ex: number, ey: number): void;
        public Arc(x: number, y: number, r: number, sAngle: number, eAngle: number, aClockwise: boolean): void;
        public ArcTo(cpx: number, cpy: number, x: number, y: number, radius: number): void;
        public Close(): void;
        public Draw(ctx: CanvasRenderingContext2D): void;
        public CalculateBounds(pars?: IStrokeParameters): rect;
        private _CalcFillBox();
        private _CalcStrokeBox(pars);
        static Merge(path1: RawPath, path2: RawPath): void;
        public Serialize(): string;
    }
    function findMiterTips(previous: IPathEntry, entry: IPathEntry, hs: number, miterLimit: number): {
        x: number;
        y: number;
    }[];
    function findBevelTips(previous: IPathEntry, entry: IPathEntry, hs: number): {
        x: number;
        y: number;
    }[];
}
declare module Fayde.Path {
    interface IRect extends IPathEntry {
        x: number;
        y: number;
        width: number;
        height: number;
    }
    function Rect(x: number, y: number, width: number, height: number): IRect;
}
declare module Fayde.Path {
    function RectRounded(x: number, y: number, width: number, height: number, radiusX: number, radiusY: number): IRect;
}
declare module Fayde.Path {
    function RectRoundedFull(x: number, y: number, width: number, height: number, topLeft: number, topRight: number, bottomRight: number, bottomLeft: number): IRect;
}
declare class Clip {
    public X: number;
    public Y: number;
    public Width: number;
    public Height: number;
    constructor(r: rect);
}
declare class CornerRadius implements ICloneable {
    public TopLeft: number;
    public TopRight: number;
    public BottomRight: number;
    public BottomLeft: number;
    constructor(topLeft?: number, topRight?: number, bottomRight?: number, bottomLeft?: number);
    public IsZero(): boolean;
    public Equals(other: CornerRadius): boolean;
    public toString(): string;
    static Equals(cr1: CornerRadius, cr2: CornerRadius): boolean;
    public Clone(): CornerRadius;
}
declare enum DurationType {
    Automatic = 0,
    Forever = 1,
    TimeSpan = 2,
}
declare class Duration implements ICloneable {
    private _Type;
    private _TimeSpan;
    constructor(ts?: TimeSpan);
    public Clone(): Duration;
    public Type : DurationType;
    public TimeSpan : TimeSpan;
    public HasTimeSpan : boolean;
    public IsForever : boolean;
    public IsAutomatic : boolean;
    public IsZero : boolean;
    static Automatic: Duration;
    static Forever: Duration;
}
declare class FontFamily implements ICloneable {
    public FamilyNames: string;
    constructor(FamilyNames: string);
    public toString(): string;
    public Clone(): FontFamily;
}
declare class KeyTime implements ICloneable {
    private _IsPaced;
    private _IsUniform;
    private _TimeSpan;
    private _Percent;
    public IsValid: boolean;
    static CreateUniform(): KeyTime;
    static CreateTimeSpan(ts: TimeSpan): KeyTime;
    public Clone(): KeyTime;
    public IsPaced : boolean;
    public IsUniform : boolean;
    public HasTimeSpan : boolean;
    public TimeSpan : TimeSpan;
    public HasPercent : boolean;
    public Percent : number;
}
declare class Length {
}
declare module vec2 {
    function createFrom(x: number, y: number): number[];
}
declare module vec4 {
    function create(vec?: number[]): number[];
    function createFrom(x: number, y: number, z: number, w: number): number[];
}
declare module mat3 {
    function create(mat?: number[]): number[];
    function inverse(mat: number[], dest?: number[]): number[];
    function multiply(mat: number[], mat2: number[], dest?: number[]): number[];
    function set(mat: number[], dest: number[]): number[];
    function identity(dest?: number[]): number[];
    function str(mat: number[]): string;
    function clone(mat: number[]): number[];
    function toAffineMat4(mat: number[], dest?: number[]): number[];
    function transformVec2(mat: number[], vec: number[], dest?: number[]): number[];
    function translate(mat: number[], x: number, y: number): number[];
    function createTranslate(x: number, y: number, dest?: number[]): number[];
    function scale(mat: number[], x: number, y: number): number[];
    function createScale(x: number, y: number, dest?: number[]): number[];
    function createRotate(angleRad: number, dest?: number[]): number[];
    function createSkew(angleRadX: number, angleRadY: number, dest?: number[]): number[];
}
declare module mat4 {
    function create(mat?: number[]): number[];
    function set(mat: number[], dest: number[]): number[];
    function equal(a: number[], b: number[]): boolean;
    function identity(dest?: number[]): number[];
    function inverse(mat: number[], dest?: number[]): number[];
    function multiply(mat: number[], mat2: number[], dest?: number[]): number[];
    function transformVec4(mat: number[], vec: number[], dest?: number[]): number[];
    function toAffineMat3(mat: number[], dest?: number[]): number[];
    function clone(mat: number[]): number[];
    function str(mat: number[]): string;
    function createTranslate(x: number, y: number, z: number, dest?: number[]): number[];
    function createScale(x: number, y: number, z: number, dest?: number[]): number[];
    function createPerspective(fieldOfViewY: number, aspectRatio: number, zNearPlane: number, zFarPlane: number, dest?: number[]): number[];
    function createViewport(width: number, height: number, dest?: number[]): number[];
    function createRotateX(theta: number, dest?: number[]): number[];
    function createRotateY(theta: number, dest?: number[]): number[];
    function createRotateZ(theta: number, dest?: number[]): number[];
    function translate(mat: number[], x: number, y: number, z: number): number[];
    function scale(mat: number[], x: number, y: number, z: number): number[];
}
declare class Thickness implements ICloneable {
    public Left: number;
    public Top: number;
    public Right: number;
    public Bottom: number;
    constructor(left?: number, top?: number, right?: number, bottom?: number);
    public Plus(thickness2: Thickness): Thickness;
    public IsEmpty(): boolean;
    public IsBalanced(): boolean;
    public toString(): string;
    public Clone(): Thickness;
    static Equals(thickness1: Thickness, thickness2: Thickness): boolean;
}
declare module Vector {
    function create(x: number, y: number): number[];
    function reverse(v: number[]): number[];
    function orthogonal(v: number[]): number[];
    function normalize(v: number[]): number[];
    function rotate(v: number[], theta: number): number[];
    function angleBetween(u: number[], v: number[]): number;
    function isClockwiseTo(v1: number[], v2: number[]): boolean;
    function intersection(s1: number[], d1: number[], s2: number[], d2: number[]): number[];
}
declare var RectOverlap: {
    Out: number;
    In: number;
    Part: number;
};
declare class rect implements ICloneable {
    public X: number;
    public Y: number;
    public Width: number;
    public Height: number;
    public toString(): string;
    public Clone(): rect;
    static getRight(r: rect): number;
    static getBottom(r: rect): number;
    static fromSize(size: size): rect;
    static clear(dest: rect): void;
    static set(dest: rect, x: number, y: number, width: number, height: number): rect;
    static isEmpty(rect1: rect): boolean;
    static isEmptyLogical(rect1: rect): boolean;
    static copyTo(src: rect, dest?: rect): rect;
    static isEqual(rect1: rect, rect2: rect): boolean;
    static intersection(dest: rect, rect2: rect): rect;
    static union(dest: rect, rect2: rect): rect;
    static unionLogical(dest: rect, rect2: rect): rect;
    static growBy(dest: rect, left: number, top: number, right: number, bottom: number): rect;
    static growByThickness(dest: rect, thickness: any): rect;
    static shrinkBy(dest: rect, left: number, top: number, right: number, bottom: number): rect;
    static shrinkByThickness(dest: rect, thickness: Thickness): rect;
    static extendTo(rect1: rect, x: number, y: number): void;
    static transform(dest: rect, xform: number[]): rect;
    private static clipmask(clip);
    static transform4(dest: rect, projection: number[]): rect;
    static round(dest: rect): rect;
    static roundOut(dest: rect): rect;
    static roundIn(dest: rect): rect;
    static copyGrowTransform(dest: rect, src: rect, thickness: any, xform: number[]): void;
    static copyGrowTransform4(dest: rect, src: rect, thickness: any, projection: any): void;
    static containsPoint(rect1: rect, p: Point): boolean;
    static containsPointXY(rect1: rect, x: number, y: number): boolean;
    static rectIn(rect1: rect, rect2: rect): number;
    static isRectContainedIn(src: rect, test: rect): boolean;
}
interface ISize {
    Width: number;
    Height: number;
}
declare class size implements ICloneable, ISize {
    public Width: number;
    public Height: number;
    public toString(): string;
    public Clone(): size;
    static fromRaw(width: number, height: number): size;
    static fromRect(src: rect): size;
    static createInfinite(): size;
    static createNegativeInfinite(): size;
    static copyTo(src: size, dest?: size): size;
    static clear(dest: size): void;
    static isEqual(size1: size, size2: size): boolean;
    static growBy(dest: size, width: number, height: number): size;
    static growByThickness(dest: size, thickness: Thickness): size;
    static shrinkBy(dest: size, width: number, height: number): size;
    static shrinkByThickness(dest: size, thickness: Thickness): size;
    static min(dest: size, other: size): size;
    static max(dest: size, other: size): size;
}
declare class BError {
    static Argument: number;
    static InvalidOperation: number;
    static XamlParse: number;
    static Attach: number;
    public Message: string;
    public Number: number;
    public Data: any;
    public ThrowException(): void;
}
declare module Fayde {
    module Render {
        var Debug: boolean;
        var DebugIndent: number;
    }
    module Layout {
        var Debug: boolean;
        var DebugIndent: number;
    }
    module Media {
        module Animation {
            var Log: boolean;
            var LogApply: boolean;
        }
        module VSM {
            var Debug: boolean;
        }
    }
    module Data {
        var Debug: boolean;
        var IsCounterEnabled: boolean;
        var DataContextCounter: number;
    }
    var IsInspectionOn: boolean;
}
declare class Enum implements IType {
    public Object: any;
    constructor(Object: any);
}
interface IAsyncRequest<T> {
    success(callback: (result: T) => void): IAsyncRequest<T>;
    error(callback: (error: any) => void): IAsyncRequest<T>;
}
interface IDeferrable<T> {
    resolve: (result: T) => void;
    reject: (error: any) => void;
    request: IAsyncRequest<T>;
}
declare function defer<T>(): IDeferrable<T>;
declare function deferArraySimple(arr: IAsyncRequest<any>[]): IAsyncRequest<any>;
declare function deferArray<S, T>(arr: S[], resolver: (s: S) => IAsyncRequest<T>): IAsyncRequest<T[]>;
declare module Fayde {
    interface IDependencyAsyncContext {
        ThemeName: string;
        Resolving: Library[];
    }
    class Library {
        public Name: string;
        private _Module;
        public Module : any;
        private _CurrentTheme;
        public CurrentTheme : Theme;
        private _Themes;
        private _IsLoading;
        private _IsLoaded;
        private _LoadError;
        private _Deferrables;
        constructor(Name: string);
        static TryGetClass(xmlns: string, xmlname: string): any;
        static Get(xmlns: string): Library;
        static GetThemeStyle(type: any): Style;
        static ChangeTheme(themeName: string): IAsyncRequest<any>;
        public Resolve(ctx: IDependencyAsyncContext): IAsyncRequest<Library>;
        private _Load(ctx);
        private _LoadTheme(ctx);
        private _FinishLoad(ctx, error?);
        public GetModuleRequireUrl(): string;
        public GetThemeRequireUrl(themeName: string): string;
    }
    function RegisterLibrary(name: string, moduleUrl?: string, themeUrlFunc?: (themeName: string) => string): Library;
}
declare module NumberEx {
    function AreClose(val1: number, val2: number): boolean;
    function IsLessThanClose(val1: number, val2: number): boolean;
    function IsGreaterThanClose(val1: number, val2: number): boolean;
}
interface IPropertyInfo {
}
declare class PropertyInfo implements IPropertyInfo {
    public GetFunc: () => any;
    public SetFunc: (value: any) => any;
    public GetValue(ro: any): any;
    public SetValue(ro: any, value: any): void;
    static Find(typeOrObj: any, name: string): PropertyInfo;
}
declare class IndexedPropertyInfo implements IPropertyInfo {
    public GetFunc: (index: number) => any;
    public SetFunc: (index: number, value: any) => any;
    public PropertyType : Function;
    public GetValue(ro: any, index: number): any;
    public SetValue(ro: any, index: number, value: any): void;
    static Find(typeOrObj: any): IndexedPropertyInfo;
}
declare module StringEx {
    function Format(format: string, ...items: any[]): string;
}
interface ITimelineEvent {
    Type: string;
    Name: string;
    Time: number;
}
interface ITimelineGroup {
    Type: string;
    Data: string;
    Start: number;
    Length: number;
}
declare class TimelineProfile {
    private static _Events;
    static Groups: ITimelineGroup[];
    static TimelineStart: number;
    static IsNextLayoutPassProfiled: boolean;
    static Parse(isStart: boolean, name: string): void;
    static Navigate(isStart: boolean, name?: string): void;
    static LayoutPass(isStart: boolean): void;
    private static _FinishEvent(type, name?);
}
declare module Fayde.Shapes {
    class DoubleCollection extends XamlObjectCollection<XamlObject> {
    }
}
declare module Fayde.Shapes {
    class Shape extends FrameworkElement {
        public CreateLayoutUpdater(node: UINode): ShapeLayoutUpdater;
        private static _StrokePropertyChanged(dobj, args);
        static FillProperty: DependencyProperty;
        static StretchProperty: DependencyProperty;
        static StrokeProperty: DependencyProperty;
        static StrokeThicknessProperty: DependencyProperty;
        static StrokeDashArrayProperty: DependencyProperty;
        static StrokeDashCapProperty: DependencyProperty;
        static StrokeDashOffsetProperty: DependencyProperty;
        static StrokeEndLineCapProperty: DependencyProperty;
        static StrokeLineJoinProperty: DependencyProperty;
        static StrokeMiterLimitProperty: DependencyProperty;
        static StrokeStartLineCapProperty: DependencyProperty;
        public Fill: Media.Brush;
        public Stretch: Media.Stretch;
        public Stroke: Media.Brush;
        public StrokeThickness: number;
        public StrokeDashArray: DoubleCollection;
        public StrokeDashCap: PenLineCap;
        public StrokeDashOffset: number;
        public StrokeEndLineCap: PenLineCap;
        public StrokeLineJoin: PenLineJoin;
        public StrokeMiterLimit: number;
        public StrokeStartLineCap: PenLineCap;
        private _FillListener;
        private _FillChanged(args);
        private _StrokeListener;
        private _StrokeChanged(args);
        private _StretchChanged(args);
        public _WidthChanged(args: IDependencyPropertyChangedEventArgs): void;
        public _HeightChanged(args: IDependencyPropertyChangedEventArgs): void;
    }
    class ShapeLayoutUpdater extends LayoutUpdater {
        public NaturalBounds: rect;
        public StretchXform: number[];
        public Path: Path.RawPath;
        public SFlags: ShapeFlags;
        public Stroke: Media.Brush;
        public Fill: Media.Brush;
        public Stretch: Media.Stretch;
        public FillRule: FillRule;
        public StrokeThickness: number;
        public StrokeStartLineCap: PenLineCap;
        public StrokeEndLineCap: PenLineCap;
        public StrokeLineJoin: PenLineJoin;
        public StrokeMiterLimit: number;
        public StrokeDashArray: DoubleCollection;
        public StrokeDashCap: PenLineCap;
        public StrokeDashOffset: number;
        public GetFillRule(): string;
        public GetBrushSize(): ISize;
        public MeasureOverride(availableSize: size, error: BError): size;
        public ArrangeOverride(finalSize: size, error: BError): size;
        public GetNaturalBounds(): rect;
        public InvalidateNaturalBounds(): void;
        public InvalidateStretch(): void;
        public InvalidatePathCache(free?: boolean): void;
        public ComputeExtents(actualSize: size): void;
        public ComputeStretchBounds(actualSize: size): rect;
        public ComputeShapeBounds(logical: boolean): rect;
        public ComputeShapeBoundsImpl(logical: boolean, matrix?: number[]): rect;
        public ComputeActualSize(): size;
        public InsideObject(ctx: RenderContextEx, x: number, y: number): boolean;
        public InsideShape(ctx: RenderContextEx, x: number, y: number): boolean;
        public Render(ctx: RenderContextEx, region: rect): boolean;
        public Draw(ctx: RenderContextEx): void;
        public BuildPath(): Path.RawPath;
        public CreateStrokeParameters(logical?: boolean): Path.IStrokeParameters;
    }
}
declare module Fayde.Shapes {
    class Ellipse extends Shape {
        public CreateLayoutUpdater(node: UINode): EllipseLayoutUpdater;
        constructor();
    }
    class EllipseLayoutUpdater extends ShapeLayoutUpdater {
        public MeasureOverride(availableSize: size, error: BError): size;
        public ComputeStretchBounds(): rect;
        public ComputeShapeBounds(logical: boolean): rect;
        public ComputeShapeBoundsImpl(logical: boolean, matrix?: any): rect;
        public BuildPath(): Path.RawPath;
    }
}
declare module Fayde.Shapes {
    class Line extends Shape {
        public CreateLayoutUpdater(node: UINode): LineLayoutUpdater;
        private static _InvalidateCoordinate(dobj, args);
        static X1Property: DependencyProperty;
        static Y1Property: DependencyProperty;
        static X2Property: DependencyProperty;
        static Y2Property: DependencyProperty;
        public X1: number;
        public Y1: number;
        public X2: number;
        public Y2: number;
    }
    class LineLayoutUpdater extends ShapeLayoutUpdater {
        public X1: number;
        public Y1: number;
        public X2: number;
        public Y2: number;
        public BuildPath(): Path.RawPath;
    }
}
declare module Fayde.Shapes {
    class Path extends Shape implements Media.IGeometryListener {
        public CreateLayoutUpdater(node: UINode): PathLayoutUpdater;
        private static _DataCoercer(d, propd, value);
        static DataProperty: DependencyProperty;
        public Data: Media.Geometry;
        private _OnDataChanged(args);
        public GeometryChanged(newGeometry: Media.Geometry): void;
    }
    class PathLayoutUpdater extends ShapeLayoutUpdater {
        public Data: Media.Geometry;
        public ComputeShapeBoundsImpl(logical: boolean, matrix?: number[]): rect;
        public Draw(ctx: RenderContextEx): void;
        public GetFillRule(): string;
    }
}
declare module Fayde.Shapes {
    class PointCollection implements IEnumerable<Point> {
        private _ht;
        public OnChanged: () => void;
        public Count : number;
        static FromData(data: string): PointCollection;
        static FromArray(data: Point[]): PointCollection;
        public GetValueAt(index: number): Point;
        public SetValueAt(index: number, value: Point): boolean;
        public Add(value: Point): void;
        public AddRange(points: Point[]): void;
        public Insert(index: number, value: Point): void;
        public Remove(value: Point): void;
        public RemoveAt(index: number): void;
        public Clear(): void;
        public IndexOf(value: Point): number;
        public Contains(value: Point): boolean;
        public getEnumerator(reverse?: boolean): IEnumerator<Point>;
    }
}
declare module Fayde.Shapes {
    class Polygon extends Shape {
        public CreateLayoutUpdater(node: UINode): PolygonLayoutUpdater;
        private static _PointsCoercer(d, propd, value);
        static FillRuleProperty: DependencyProperty;
        static PointsProperty: DependencyProperty;
        public FillRule: FillRule;
        public Points: PointCollection;
        constructor();
        private _PointsChanged(args);
        private _FillRuleChanged(args);
    }
    class PolygonLayoutUpdater extends ShapeLayoutUpdater {
        public Points: PointCollection;
        public BuildPath(): Path.RawPath;
    }
}
declare module Fayde.Shapes {
    class Polyline extends Shape {
        public CreateLayoutUpdater(node: UINode): PolylineLayoutUpdater;
        private static _PointsCoercer(d, propd, value);
        static FillRuleProperty: DependencyProperty;
        static PointsProperty: DependencyProperty;
        public FillRule: FillRule;
        public Points: PointCollection;
        constructor();
        private _PointsChanged(args);
        private _FillRuleChanged(args);
    }
    class PolylineLayoutUpdater extends ShapeLayoutUpdater {
        public Points: PointCollection;
        public BuildPath(): Path.RawPath;
    }
}
declare module Fayde.Shapes {
    class Rectangle extends Shape {
        public CreateLayoutUpdater(node: UINode): RectangleLayoutUpdater;
        static RadiusXProperty: DependencyProperty;
        static RadiusYProperty: DependencyProperty;
        public RadiusX: number;
        public RadiusY: number;
        constructor();
        private _RadiusChanged(args);
    }
    class RectangleLayoutUpdater extends ShapeLayoutUpdater {
        public RadiusX: number;
        public RadiusY: number;
        public MeasureOverride(availableSize: size, error: BError): size;
        public ComputeStretchBounds(): rect;
        public ComputeShapeBounds(logical: boolean): rect;
        public ComputeShapeBoundsImpl(logical: boolean, matrix?: number[]): rect;
        public BuildPath(): Path.RawPath;
    }
}
declare module Fayde.Text {
    interface ITextBoxUndoAction {
        SelectionAnchor: number;
        SelectionCursor: number;
        Undo(bufferholder: IBufferOwner): any;
        Redo(bufferholder: IBufferOwner): number;
    }
    interface IBufferOwner {
        _Buffer: string;
    }
    class TextBoxUndoActionDelete implements ITextBoxUndoAction {
        public SelectionAnchor: number;
        public SelectionCursor: number;
        public Start: number;
        public Text: string;
        constructor(selectionAnchor: number, selectionCursor: number, buffer: string, start: number, length: number);
        public Undo(bo: IBufferOwner): void;
        public Redo(bo: IBufferOwner): number;
    }
    class TextBoxUndoActionInsert implements ITextBoxUndoAction {
        public SelectionAnchor: number;
        public SelectionCursor: number;
        public Start: number;
        public Text: string;
        public IsGrowable: boolean;
        constructor(selectionAnchor: number, selectionCursor: number, start: number, inserted: string, isAtomic?: boolean);
        public Undo(bo: IBufferOwner): void;
        public Redo(bo: IBufferOwner): number;
        public Insert(start: number, text: string): boolean;
    }
    class TextBoxUndoActionReplace implements ITextBoxUndoAction {
        public SelectionAnchor: number;
        public SelectionCursor: number;
        public Start: number;
        public Length: number;
        public Deleted: string;
        public Inserted: string;
        constructor(selectionAnchor: number, selectionCursor: number, buffer: string, start: number, length: number, inserted: string);
        public Undo(bo: IBufferOwner): void;
        public Redo(bo: IBufferOwner): number;
    }
    class TextBuffer {
        static Cut(text: string, start: number, len: number): string;
        static Insert(text: string, index: number, str: string): string;
        static Replace(text: string, start: number, len: number, str: string): string;
    }
}
declare module Fayde.Text {
    interface ITextAttributes {
        GetBackground(selected: boolean): Media.Brush;
        GetForeground(selected: boolean): Media.Brush;
        Font: Font;
        Direction: FlowDirection;
        IsUnderlined: boolean;
        Start: number;
    }
    interface ITextAttributesSource {
        SelectionBackground: Media.Brush;
        Background: Media.Brush;
        SelectionForeground: Media.Brush;
        Foreground: Media.Brush;
        Font: Font;
        Direction: FlowDirection;
        TextDecorations: TextDecorations;
    }
    class TextLayoutAttributes implements ITextAttributes {
        private _Source;
        public Start: number;
        constructor(source: ITextAttributesSource, start?: number);
        private static DEFAULT_SELECTION_BACKGROUND;
        public GetBackground(selected: boolean): Media.Brush;
        private static DEFAULT_SELECTION_FOREGROUND;
        public GetForeground(selected: boolean): Media.Brush;
        public Font : Font;
        public Direction : FlowDirection;
        public IsUnderlined : boolean;
    }
}
declare module Fayde.Text {
    interface IBreakOp {
        Advance: number;
        Index: number;
        Btype: number;
        c: string;
    }
    interface ILayoutWord {
        Advance: number;
        LineAdvance: number;
        Length: number;
        BreakOps: IBreakOp[];
        Font: Font;
    }
    class TextLayoutGlyphCluster {
        private _Text;
        private _Selected;
        public _Advance: number;
        constructor(text: string, font: Font, selected?: boolean);
        public _Render(ctx: RenderContextEx, origin: Point, attrs: ITextAttributes, x: number, y: number): void;
    }
    class TextLayoutRun {
        private _Clusters;
        public _Attrs: ITextAttributes;
        public _Start: number;
        private _Line;
        public _Advance: number;
        public _Length: number;
        constructor(line: TextLayoutLine, attrs: ITextAttributes, start: number);
        public _GenerateCache(): void;
        public _ClearCache(): void;
        public _Render(ctx: RenderContextEx, origin: Point, x: number, y: number): void;
        public __Debug(allText: any): any;
    }
    class TextLayoutLine {
        public _Runs: TextLayoutRun[];
        public _Layout: TextLayout;
        public _Start: number;
        private _Offset;
        public _Advance: number;
        public _Descend: number;
        public _Height: number;
        public _Width: number;
        public _Length: number;
        constructor(layout: TextLayout, start: number, offset: number);
        public GetCursorFromX(offset: Point, x: number): number;
        public _Render(ctx: any, origin: Point, left: number, top: number): void;
        public __Debug(allText: any): string;
    }
    class TextLayout {
        private _Attrs;
        private _SelectionStart;
        private _SelectionLength;
        private _Text;
        public AvailableWidth: number;
        private _Strategy;
        private _Alignment;
        private _Trimming;
        private _Wrapping;
        private _MaxHeight;
        private _MaxWidth;
        private _BaseDescent;
        private _BaseHeight;
        private _ActualHeight;
        private _ActualWidth;
        private _LineHeight;
        private _Lines;
        private _IsWrapped;
        private _Length;
        public SelectionStart : number;
        public SelectionLength : number;
        public ActualExtents : size;
        public RenderExtents : rect;
        public MaxWidth : number;
        public TextAlignment : TextAlignment;
        public SetTextAlignment(align: TextAlignment): boolean;
        public TextTrimming : Controls.TextTrimming;
        public SetTextTrimming(value: Controls.TextTrimming): boolean;
        public TextWrapping : Controls.TextWrapping;
        public SetTextWrapping(wrapping: Controls.TextWrapping): boolean;
        public LineStackingStrategy : LineStackingStrategy;
        public LineStackingStategy : any;
        public SetLineStackingStategy(strategy: LineStackingStrategy): boolean;
        public LineHeight : number;
        public SetLineHeight(value: number): boolean;
        public TextAttributes : ITextAttributes[];
        public Text : string;
        public GetSelectionCursor(offset: Point, pos: number): rect;
        public GetBaselineOffset(): number;
        public GetLineFromY(offset: Point, y: number): TextLayoutLine;
        public GetLineFromIndex(index: number): TextLayoutLine;
        public GetCursorFromXY(offset: Point, x: number, y: number): number;
        public Select(start: number, length: number): void;
        public Layout(): void;
        public _HorizontalAlignment(lineWidth: number): number;
        public Render(ctx: RenderContextEx, origin?: Point, offset?: Point): void;
        public __Debug(): string;
        public ResetState(): void;
        private _ClearCache();
        private _ClearLines();
        private _OverrideLineHeight();
        private _GetLineHeightOverride();
        private _GetDescendOverride();
    }
}
declare module Fayde.Xaml {
    interface IMarkupParseContext {
        Owner: DependencyObject;
        Property: DependencyProperty;
        ResourceChain: ResourceDictionary[];
        TemplateBindingSource: DependencyObject;
        Resolver: INamespacePrefixResolver;
        ObjectStack: any[];
    }
    interface ITransmuteContext {
        Owner: DependencyObject;
        Property: DependencyProperty;
        TemplateBindingSource: DependencyObject;
        ObjectStack: any[];
    }
    interface IMarkup {
        Transmute(ctx: ITransmuteContext): Expression;
    }
    var IMarkup_: IInterfaceDeclaration<IMarkup>;
    class MarkupExpressionParser {
        static Parse(value: string, ctx: IMarkupParseContext): any;
        static GetComponents(value: string): string[];
    }
}
declare module Fayde.Xaml {
    class TemplateBinding implements IMarkup {
        public Property: string;
        constructor(property?: string);
        public Transmute(ctx: ITransmuteContext): Expression;
    }
}
