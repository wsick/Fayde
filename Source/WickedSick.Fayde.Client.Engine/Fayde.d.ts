module Fayde.Controls {
    enum TextWrapping {
        NoWrap,
        Wrap,
        WrapWithOverflow,
    }
    enum ScrollBarVisibility {
        Disabled,
        Auto,
        Hidden,
        Visible,
    }
    enum TextTrimming {
        None,
    }
    enum ClickMode {
        Release,
        Press,
        Hover,
    }
    enum PlacementMode {
        Bottom,
        Right,
        Mouse,
        Left,
        Top,
    }
    enum SelectionMode {
        Single,
        Multiple,
        Extended,
    }
    enum MediaElementState {
        Closed,
        Opening,
        Buffering,
        Playing,
        Paused,
        Stopped,
    }
}
module Fayde.Controls {
    interface IGeneratorPosition {
        Index: number;
        Offset: number;
    }
    interface IGenerationState {
        AllowStartAtRealizedItem: bool;
        Position: IGeneratorPosition;
        Step: number;
        Dispose: () => void;
    }
    interface IItemContainerGenerator {
        GenerateNext(isNewlyRealized: IOutValue): DependencyObject;
        GetItemContainerGeneratorForPanel(panel: Panel): IItemContainerGenerator;
        PrepareItemContainer(container: DependencyObject);
        Remove(position: IGeneratorPosition, count: number);
        RemoveAll();
        StartAt(position: IGeneratorPosition, forward: bool, allowStartAtRealizedItem: bool): IGenerationState;
    }
    interface IRecyclingItemContainerGenerator {
        Recycle(position: IGeneratorPosition, count: number);
    }
    class ItemContainerGenerator implements IItemContainerGenerator, IRecyclingItemContainerGenerator {
        public Owner: ItemsControl;
        private _GenerationState;
        private _Cache;
        private _Containers;
        private _RealizedCount;
        private _Items;
        public ItemsChanged: MulticastEvent;
        constructor(Owner: ItemsControl);
        public GenerateNext(isNewlyRealized: IOutValue): DependencyObject;
        public GetItemContainerGeneratorForPanel(panel: Panel): IItemContainerGenerator;
        public PrepareItemContainer(container: DependencyObject): void;
        public Recycle(position: IGeneratorPosition, count: number): void;
        public Remove(position: IGeneratorPosition, count: number): void;
        public RemoveAll(): void;
        public StartAt(position: IGeneratorPosition, forward: bool, allowStartAtRealizedItem: bool): IGenerationState;
        public IndexFromContainer(container: DependencyObject): number;
        public ContainerFromIndex(index: number): DependencyObject;
        public ItemFromContainer(container: DependencyObject): any;
        public ContainerFromItem(item: any): DependencyObject;
        public GeneratorPositionFromIndex(itemIndex: number): IGeneratorPosition;
        public IndexFromGeneratorPosition(position: IGeneratorPosition): number;
        public OnOwnerItemsItemsChanged(e: Collections.NotifyCollectionChangedEventArgs): void;
        private _GetNumAlreadyRealizedItems(items);
        private _KillContainers(position, count, recycle);
    }
}
module Fayde.Controls.Primitives {
    class ScrollData {
        public CanHorizontallyScroll: bool;
        public CanVerticallyScroll: bool;
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
module Fayde {
    function Clone(value: any): any;
}
module Fayde {
    enum Orientation {
        Horizontal,
        Vertical,
    }
    enum Visibility {
        Visible,
        Collapsed,
    }
    var CursorType: {
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
        Left,
        Center,
        Right,
        Stretch,
    }
    enum VerticalAlignment {
        Top,
        Center,
        Bottom,
        Stretch,
    }
    enum FlowDirection {
        LeftToRight,
        RightToLeft,
    }
    enum FontWeight {
        Thin,
        ExtraLight,
        Light,
        Normal,
        Medium,
        SemiBold,
        Bold,
        ExtraBold,
        Black,
        ExtraBlack,
    }
    enum TextAlignment {
        Left,
        Center,
        Right,
    }
    enum TextDecorations {
        None,
        Underline,
    }
    enum LineStackingStrategy {
        MaxHeight,
        BlockLineHeight,
    }
}
module Fayde {
    class VisualTreeHelper {
        static GetParent(d: DependencyObject): DependencyObject;
        static GetRoot(d: DependencyObject): DependencyObject;
        static GetChild(d: DependencyObject, childIndex: number): DependencyObject;
        static GetChildrenCount(d: DependencyObject): number;
        static FindElementsInHostCoordinates(intersectingPoint: Point, subtree: UIElement): UIElement[];
        static __Debug(ui: any, func?: (uin: UINode, tabIndex: number) => string): string;
        static __DebugTree(curNode, matchNode, tabIndex, func);
        static __DebugUIElement(uin, tabIndex);
        static __DebugGrid(uin, tabIndex);
        static __DebugUIElementLayout(uin, tabIndex);
        static __DebugLayout(ui: any): string;
        static _SerializeDirt(dirt);
        static _SerializeFlags(flags);
        static __GetById(id);
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
    interface ITabNavigationWalker {
        FocusChild(): bool;
    }
    function SingleStyleWalker(style: Style): IStyleWalker;
    function MultipleStylesWalker(styles: Style[]): IStyleWalker;
    function DeepTreeWalker(topNode: UINode, direction?: VisualTreeDirection): IDeepTreeWalker;
    class TabNavigationWalker implements ITabNavigationWalker {
        private _Root;
        private _Current;
        private _Forwards;
        private _TabSorted;
        constructor(root: UINode, cur: UINode, forwards: bool);
        public FocusChild(): bool;
        static Focus(uin: UINode, forwards?: bool): bool;
    }
}
module Fayde.Providers {
    enum StyleIndex {
        VisualTree,
        ApplicationResources,
        GenericXaml,
        Count,
    }
    enum StyleMask {
        None,
        VisualTree,
        ApplicationResources,
        GenericXaml,
        All,
    }
    interface IImplicitStyleHolder {
        _ImplicitStyles: Style[];
        _StyleMask: number;
    }
    class ImplicitStyleBroker {
        static Set(fe: FrameworkElement, mask: StyleMask, styles?: Style[]): void;
        static SetImpl(fe, mask, styles);
        static Clear(fe: FrameworkElement, mask: StyleMask): void;
        static ApplyStyles(fe, mask, styles);
        static GetImplicitStyles(fe, mask);
        static GetGenericXamlStyleFor(type);
    }
}
module Fayde.Providers {
    interface IStyleHolder {
        _LocalStyle: Style;
    }
    class LocalStyleBroker {
        static Set(fe: FrameworkElement, newStyle: Style): void;
    }
}
module Fayde {
    var UnsetValue: {};
}
module Fayde.Providers {
    enum PropertyPrecedence {
        IsEnabled,
        LocalValue,
        LocalStyle,
        ImplicitStyle,
        Inherited,
        InheritedDataContext,
        DefaultValue,
        Lowest,
        Highest,
        Count,
    }
    interface IPropertyChangedListener {
        Property: DependencyProperty;
        OnPropertyChanged(sender: DependencyObject, args: IDependencyPropertyChangedEventArgs);
        Detach();
    }
    interface IPropertyStorage {
        OwnerNode: DONode;
        Property: DependencyProperty;
        Precedence: PropertyPrecedence;
        Animation: Media.Animation.IAnimationStorage[];
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
        public ClearValue(storage: IPropertyStorage, notifyListeners?: bool): void;
        public OnPropertyChanged(storage: IPropertyStorage, effectivePrecedence: PropertyPrecedence, oldValue: any, newValue: any): void;
        public ListenToChanged(target: DependencyObject, propd: DependencyProperty, func: (sender: any, args: IDependencyPropertyChangedEventArgs) => void, closure: any): IPropertyChangedListener;
        public CreateStorage(dobj: DependencyObject, propd: DependencyProperty): IPropertyStorage;
        public Clone(dobj: DependencyObject, sourceStorage: IPropertyStorage): IPropertyStorage;
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
    interface IPropertyPathParserData {
        typeName: string;
        propertyName: string;
        index: number;
    }
    enum PropertyNodeType {
        None,
        AttachedProperty,
        Indexed,
        Property,
    }
    class PropertyPathParser {
        public Path: string;
        constructor(path: string);
        public Step(data: IPropertyPathParserData): PropertyNodeType;
    }
}
module Fayde.Data {
    interface IPropertyPathWalkerListener {
        IsBrokenChanged();
        ValueChanged();
    }
    interface IPropertyPathNode {
        Next: IPropertyPathNode;
        Value: any;
        IsBroken: bool;
        ValueType: Function;
        SetSource(source: any);
        SetValue(value: any);
        Listen(listener: IPropertyPathNodeListener);
        Unlisten(listener: IPropertyPathNodeListener);
    }
    interface ICollectionViewNode extends IPropertyPathNode {
        BindToView: bool;
    }
    interface IPropertyPathNodeListener {
        IsBrokenChanged(node: IPropertyPathNode);
        ValueChanged(node: IPropertyPathNode);
    }
    class PropertyPathWalker implements IPropertyPathNodeListener {
        public Path: string;
        public IsDataContextBound: bool;
        public Source: any;
        public ValueInternal: any;
        public Node: IPropertyPathNode;
        public FinalNode: IPropertyPathNode;
        private _Listener;
        private _Value;
        public Value : any;
        public IsPathBroken : bool;
        constructor(path: string, bindDirectlyToSource?: bool, bindsToView?: bool, isDataContextBound?: bool);
        public GetValue(item: any);
        public Update(source: any): void;
        public Listen(listener: IPropertyPathWalkerListener): void;
        public Unlisten(listener: IPropertyPathWalkerListener): void;
        public IsBrokenChanged(node: IPropertyPathNode): void;
        public ValueChanged(node: IPropertyPathNode): void;
    }
}
enum _Dirty {
    Transform,
    LocalTransform,
    LocalProjection,
    Clip,
    LocalClip,
    LayoutClip,
    RenderVisibility,
    HitTestVisibility,
    Measure,
    Arrange,
    ChildrenZIndices,
    Bounds,
    NewBounds,
    Invalidate,
    InUpDirtyList,
    InDownDirtyList,
    DownDirtyState,
    UpDirtyState,
}
module Fayde {
    class XamlResolver {
        public OnSuccess: (xamlResult: AjaxJsonResult, scriptResult: HTMLScriptElement) => void;
        public OnSubSuccess;
        public OnError: (error: string) => void;
        private _IsXamlLoaded;
        private _IsScriptLoaded;
        private _BaseHref;
        private _ScriptResult;
        private _XamlResult;
        constructor(OnSuccess: (xamlResult: AjaxJsonResult, scriptResult: HTMLScriptElement) => void, OnSubSuccess, OnError: (error: string) => void);
        public Load(href: string, hash: string): void;
        public LoadGeneric(href: string, hash: string): void;
        private _HandleScriptSuccess(script);
        private _HandleXamlSuccess(result);
        private _HandleXamlFailed(error);
        private _CheckIfLoaded();
        public ResolveDependencies(onResolve: () => void, onFail: (error: string) => void): void;
    }
}
module Fayde.Media {
    enum BrushMappingMode {
        Absolute,
        RelativeToBoundingBox,
    }
    enum GradientSpreadMethod {
        Pad,
        Reflect,
        Repeat,
    }
    enum Stretch {
        None,
        Fill,
        Uniform,
        UniformToFill,
    }
    enum AlignmentX {
        Left,
        Center,
        Right,
    }
    enum AlignmentY {
        Top,
        Center,
        Bottom,
    }
    enum TextHintingMode {
        Fixed,
        Animated,
    }
}
module Fayde.Media {
    interface ICoordinates {
        x: number;
        y: number;
    }
    class GradientMetrics {
        static Calculate(dir: ICoordinates, first: ICoordinates, last: ICoordinates, bounds: rect): void;
        static E(dir, first, last, bounds);
        static W(dir, first, last, bounds);
        static S(dir, first, last, bounds);
        static N(dir, first, last, bounds);
        static NW(dir, first, last, bounds);
        static SW(dir, first, last, bounds);
        static NE(dir, first, last, bounds);
        static SE(dir, first, last, bounds);
    }
}
module Fayde.Media {
    function ParseGeometry(val: string): Geometry;
    function ParseShapePoints(val: string): Point[];
}
module Fayde.Media.Animation {
    interface IAnimationStorage {
        Animation: AnimationBase;
        TargetObj: DependencyObject;
        TargetProp: DependencyProperty;
        IsDisabled: bool;
        BaseValue: any;
        CurrentValue: any;
        StopValue: any;
    }
    interface IAnimStorageHidden {
        _Storage: IAnimationStorage;
    }
    class AnimationStore {
        static Clone(oldanims: IAnimationStorage[], newTarget: DependencyObject): IAnimationStorage[];
        static AttachAnimation(animation: AnimationBase, targetObj: DependencyObject, targetProp: DependencyProperty): IAnimationStorage;
        static UpdateCurrentValueAndApply(storage: IAnimationStorage, clockData: IClockData): void;
        static Disable(storage: IAnimationStorage): void;
        static Stop(storage: IAnimationStorage): void;
        static Attach(dobj, propd, animStorage);
        static Detach(dobj, propd, animStorage);
        static Enable(storage);
        static ApplyCurrentValue(storage);
    }
}
module Fayde.Media.Animation {
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
        static RecursiveSubdivide(b: ICubicCurve[], lvl: number, currentlvl: number, pos: number, src: ICubicCurve);
        static SubdivideCubic(data: ISubdiviedCubicCurve, src: ICubicCurve): void;
        static HalfLerpPoint(p: ICurvePoint, p1: ICurvePoint, p2: ICurvePoint): void;
        static ConvertCubicsToQuadratics(srcArray: ICubicCurve[], count: number): IQuadraticCurve[];
        static QuadraticFromCubic(src: ICubicCurve): IQuadraticCurve;
    }
}
module Fayde.Media.Animation {
    enum EasingMode {
        EaseOut,
        EaseIn,
        EaseInOut,
    }
    enum FillBehavior {
        HoldEnd,
        Stop,
    }
}
module vec2 {
    function createFrom(x: number, y: number): number[];
}
module vec4 {
    function create(vec?: number[]): number[];
    function createFrom(x: number, y: number, z: number, w: number): number[];
}
module mat3 {
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
module mat4 {
    function create(mat?: number[]): number[];
    function set(mat: number[], dest: number[]): number[];
    function equal(a: number[], b: number[]): bool;
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
module Fayde {
    class AjaxJsonResult {
        private xmlhttp;
        constructor(xmlhttp: XMLHttpRequest);
        public CreateJson(): any;
        public GetHeader(name: string): string;
    }
    class AjaxJsonRequest {
        public OnSuccess: (result: AjaxJsonResult) => void;
        public OnError: (error: string) => void;
        private xmlhttp;
        constructor(OnSuccess: (result: AjaxJsonResult) => void, OnError: (error: string) => void);
        public Get(url: string, query?: string): void;
        public Post(url: string, query: string, data: any): void;
        public Cancel(): void;
        private _PrepareRequest();
        private _HandleStateChange();
    }
}
interface IOutValue {
    Value: any;
}
interface ICloneable {
    Clone(): any;
}
interface IInterfaceDeclaration {
    Name: string;
}
class Nullstone {
    static RegisterType(type: Function, name: string, interfaces?: IInterfaceDeclaration[]): void;
    static Equals(val1: any, val2: any): bool;
    static DoesInheritFrom(t: Function, type: Function): bool;
    static GetPropertyDescriptor(obj: any, name: string): PropertyDescriptor;
    static HasProperty(obj: any, name: string): bool;
    static RegisterInterface(name: string): IInterfaceDeclaration;
    static ImplementsInterface(obj: any, i: IInterfaceDeclaration): bool;
    static ImportJsFile(url: string, onComplete: (script: HTMLScriptElement) => void): void;
}
function NotImplemented(str: string): void;
function Warn(str: string): void;
interface IPropertyInfo {
}
class PropertyInfo implements IPropertyInfo {
    public GetFunc: () => any;
    public SetFunc: (value: any) => any;
    public GetValue(ro: any): any;
    public SetValue(ro: any, value: any): void;
    static Find(typeOrObj, name: string): PropertyInfo;
}
class IndexedPropertyInfo implements IPropertyInfo {
    public GetFunc: (index: number) => any;
    public SetFunc: (index: number, value: any) => any;
    public PropertyType : Function;
    public GetValue(ro: any, index: number): any;
    public SetValue(ro: any, index: number, value: any): void;
    static Find(typeOrObj): IndexedPropertyInfo;
}
class StringEx {
    static Format(format: string, ...items: any[]): string;
}
module Fayde.Shapes {
    enum PathEntryType {
        Move,
        Line,
        Rect,
        Quadratic,
        Bezier,
        EllipticalArc,
        Arc,
        ArcTo,
        Close,
    }
    enum ShapeFlags {
        None,
        Empty,
        Normal,
        Degenerate,
        Radii,
    }
    enum PenLineCap {
        Flat,
        Square,
        Round,
        Triangle,
    }
    enum PenLineJoin {
        Miter,
        Bevel,
        Round,
    }
    enum FillRule {
        EvenOdd,
        NonZero,
    }
    enum SweepDirection {
        Counterclockwise,
        Clockwise,
    }
}
module Fayde.Shapes {
    interface IRange {
        min: number;
        max: number;
    }
    interface IPointRange {
        xMin: number;
        xMax: number;
        yMin: number;
        yMax: number;
    }
    interface IPathEntry {
        type: PathEntryType;
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
        public RoundedRectFull(left: number, top: number, width: number, height: number, topLeft: number, topRight: number, bottomRight: number, bottomLeft: number): void;
        public RoundedRect(left: number, top: number, width: number, height: number, radiusX: number, radiusY: number): void;
        public Quadratic(cpx: number, cpy: number, x: number, y: number): void;
        public Bezier(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void;
        public Ellipse(x: number, y: number, width: number, height: number): void;
        public EllipticalArc(width: number, height: number, rotationAngle: number, isLargeArcFlag: bool, sweepDirectionFlag: SweepDirection, ex: number, ey: number): void;
        public Arc(x: number, y: number, r: number, sAngle: number, eAngle: number, aClockwise: bool): void;
        public ArcTo(cpx: number, cpy: number, x: number, y: number, radius: number): void;
        public Close(): void;
        public DrawRenderCtx(ctx: RenderContext): void;
        public DrawCanvasCtx(canvasCtx: CanvasRenderingContext2D): void;
        public CalculateBounds(thickness: number): rect;
        static _CalculateQuadraticBezierRange(a, b, c);
        static _CalculateCubicBezierRange(a, b, c, d);
        static _CalculateArcRange(cx, cy, r, sa, ea, cc);
        static _CalculateArcToRange(sx, sy, cpx, cpy, ex, ey, r);
        static _CalculateArcPointsRange(cx, cy, sx, sy, ex, ey, r, cc);
        static _ArcContainsPoint(sx, sy, ex, ey, cpx, cpy, cc);
        static Merge(path1: RawPath, path2: RawPath): void;
        public Serialize(): string;
    }
}
module Fayde.Text {
    interface ITextBoxUndoAction {
        SelectionAnchor: number;
        SelectionCursor: number;
        Undo(bufferholder: IBufferOwner);
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
        public IsGrowable: bool;
        constructor(selectionAnchor: number, selectionCursor: number, start: number, inserted: string, isAtomic?: bool);
        public Undo(bo: IBufferOwner): void;
        public Redo(bo: IBufferOwner): number;
        public Insert(start: number, text: string): bool;
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
module Fayde.Text {
    interface ITextAttributes {
        GetBackground(selected: bool): Media.Brush;
        GetForeground(selected: bool): Media.Brush;
        Font: Font;
        Direction: FlowDirection;
        IsUnderlined: bool;
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
        public GetBackground(selected: bool): Media.Brush;
        public GetForeground(selected: bool): Media.Brush;
        public Font : Font;
        public Direction : FlowDirection;
        public IsUnderlined : bool;
    }
}
module Fayde.Text {
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
        constructor(text: string, font: Font, selected?: bool);
        public _Render(ctx: RenderContext, origin: Point, attrs: ITextAttributes, x: number, y: number): void;
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
        public _Render(ctx: RenderContext, origin: Point, x: number, y: number): void;
        public __Debug(allText);
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
        public _Render(ctx, origin: Point, left: number, top: number): void;
        public __Debug(allText): string;
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
        public SetTextAlignment(align: TextAlignment): bool;
        public TextTrimming : Controls.TextTrimming;
        public SetTextTrimming(value: Controls.TextTrimming): bool;
        public TextWrapping : Controls.TextWrapping;
        public SetTextWrapping(wrapping: Controls.TextWrapping): bool;
        public LineStackingStrategy : LineStackingStrategy;
        public LineStackingStategy : any;
        public SetLineStackingStategy(strategy: LineStackingStrategy): bool;
        public LineHeight : number;
        public SetLineHeight(value: number): bool;
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
        public Render(ctx: RenderContext, origin?: Point, offset?: Point): void;
        public __Debug(): string;
        public ResetState(): void;
        private _ClearCache();
        private _ClearLines();
        private _OverrideLineHeight();
        private _GetLineHeightOverride();
        private _GetDescendOverride();
    }
}
module Fayde.Collections {
    interface INotifyCollectionChanged {
        CollectionChanged: MulticastEvent;
    }
    var INotifyCollectionChanged_: IInterfaceDeclaration;
}
module Fayde.Controls {
    enum GridUnitType {
        Auto,
        Pixel,
        Star,
    }
    class GridLength implements ICloneable {
        public Value: number;
        public Type: GridUnitType;
        constructor(value?: number, unitType?: GridUnitType);
        static Equals(gl1: GridLength, gl2: GridLength): bool;
        public Clone(): GridLength;
    }
}
module Fayde.Controls.Primitives {
    interface IScrollInfo {
        ScrollOwner: ScrollViewer;
        LineUp();
        LineDown();
        LineLeft();
        LineRight();
        MouseWheelUp();
        MouseWheelDown();
        MouseWheelLeft();
        MouseWheelRight();
        PageUp();
        PageDown();
        PageLeft();
        PageRight();
        MakeVisible(uie: UIElement, rectangle: rect): rect;
        SetHorizontalOffset(offset: number);
        SetVerticalOffset(offset: number);
        CanHorizontallyScroll: bool;
        CanVerticallyScroll: bool;
        ExtentHeight: number;
        ExtentWidth: number;
        HorizontalOffset: number;
        VerticalOffset: number;
        ViewportHeight: number;
        ViewportWidth: number;
    }
    var IScrollInfo_: IInterfaceDeclaration;
}
module Fayde.Controls.Primitives {
    class SelectorSelection {
        private _Owner;
        private _SelectedItems;
        private _SelectedItem;
        private _IsUpdating;
        public Mode: SelectionMode;
        public IsUpdating : bool;
        constructor(owner: Selector);
        private _HandleOwnerSelectionChanged(sender, e);
        public RepopulateSelectedItems(): void;
        public ClearSelection(ignoreSelectedValue?: bool): void;
        public Select(item: any, ignoreSelectedValue?: bool): void;
        public SelectRange(startIndex: number, endIndex: number): void;
        public SelectAll(items: any[]): void;
        public SelectOnly(item: any): void;
        public Unselect(item: any): void;
        public AddToSelected(item: any): void;
        public RemoveFromSelected(item: any): void;
        public ReplaceSelection(item: any): void;
        public UpdateSelectorProperties(item: any, index: number, value: any): void;
        public UpdateCollectionView(item: any): bool;
    }
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
    static _LastID;
    public _ID: number;
    public Name: string;
    public GetTargetType: () => Function;
    public OwnerType: Function;
    public DefaultValue: any;
    public IsReadOnly: bool;
    public IsCustom: bool;
    public IsAttached: bool;
    public IsInheritable: bool;
    public ChangedCallback: (dobj: Fayde.DependencyObject, args: IDependencyPropertyChangedEventArgs) => void;
    public AlwaysChange: bool;
    public Store: Fayde.Providers.PropertyStore;
    private _Coercer;
    private _Validator;
    static Register(name: string, getTargetType: () => Function, ownerType: Function, defaultValue?: any, changedCallback?: (dobj: Fayde.DependencyObject, args: IDependencyPropertyChangedEventArgs) => void): DependencyProperty;
    static RegisterReadOnly(name: string, getTargetType: () => Function, ownerType: Function, defaultValue?: any, changedCallback?: (dobj: Fayde.DependencyObject, args: IDependencyPropertyChangedEventArgs) => void): DependencyProperty;
    static RegisterAttached(name: string, getTargetType: () => Function, ownerType: Function, defaultValue?: any, changedCallback?: (dobj: Fayde.DependencyObject, args: IDependencyPropertyChangedEventArgs) => void): DependencyProperty;
    static RegisterCore(name: string, getTargetType: () => Function, ownerType: Function, defaultValue?: any, changedCallback?: (dobj: Fayde.DependencyObject, args: IDependencyPropertyChangedEventArgs) => void): DependencyProperty;
    static RegisterReadOnlyCore(name: string, getTargetType: () => Function, ownerType: Function, defaultValue?: any, changedCallback?: (dobj: Fayde.DependencyObject, args: IDependencyPropertyChangedEventArgs) => void): DependencyProperty;
    static RegisterAttachedCore(name: string, getTargetType: () => Function, ownerType: Function, defaultValue?: any, changedCallback?: (dobj: Fayde.DependencyObject, args: IDependencyPropertyChangedEventArgs) => void): DependencyProperty;
    static RegisterInheritable(name: string, getTargetType: () => Function, ownerType: Function, defaultValue?: any, changedCallback?: (dobj: Fayde.DependencyObject, args: IDependencyPropertyChangedEventArgs) => void): DependencyProperty;
    static RegisterFull(name: string, getTargetType: () => Function, ownerType: Function, defaultValue?: any, changedCallback?: (dobj: Fayde.DependencyObject, args: IDependencyPropertyChangedEventArgs) => void, coercer?: (dobj: Fayde.DependencyObject, propd: DependencyProperty, value: any) => any, alwaysChange?: bool, validator?: (dobj: Fayde.DependencyObject, propd: DependencyProperty, value: any) => bool, isCustom?: bool, isReadOnly?: bool, isAttached?: bool): DependencyProperty;
    private FinishRegister();
    public ExtendTo(type: any): DependencyProperty;
    public ValidateSetValue(dobj: Fayde.DependencyObject, value: any, isValidOut: IOutIsValid);
    static GetDependencyProperty(ownerType: Function, name: string, noError?: bool): DependencyProperty;
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
module Fayde {
    class FrameworkTemplate {
        public ResChain: ResourceDictionary[];
    }
}
module Fayde {
    class LayoutInformation {
        static GetLayoutClip(uie: UIElement): Media.Geometry;
        static GetLayoutExceptionElement(): UIElement;
        static GetLayoutSlot(uie: UIElement): rect;
    }
}
module Fayde {
    enum UIElementFlags {
        None,
        RenderVisible,
        HitTestVisible,
        TotalRenderVisible,
        TotalHitTestVisible,
        DirtyArrangeHint,
        DirtyMeasureHint,
        DirtySizeHint,
    }
    interface ILayoutPass {
        MeasureList: LayoutUpdater[];
        ArrangeList: LayoutUpdater[];
        SizeList: LayoutUpdater[];
        Count: number;
        Updated: bool;
    }
    interface IMeasurable {
        MeasureOverride(availableSize: size): size;
    }
    interface IMeasurableHidden {
        _MeasureOverride(availableSize: size, error: BError): size;
    }
    interface IArrangeable {
        ArrangeOverride(finalSize: size): size;
    }
    interface IArrangeableHidden {
        _ArrangeOverride(finalSize: size, error: BError): size;
    }
    interface IRenderable {
        Render(ctx: RenderContext, lu: LayoutUpdater, region: rect);
    }
    interface IActualSizeComputable {
        ComputeActualSize(baseComputer: () => size, lu: LayoutUpdater);
    }
    interface IBoundsComputable {
        ComputeBounds(baseComputer: () => void, lu: LayoutUpdater);
    }
    interface IPostComputeTransformable {
        PostCompute(lu: LayoutUpdater, hasLocalProjection: bool);
    }
    interface IPostInsideObject {
        PostInsideObject(ctx: RenderContext, lu: LayoutUpdater, x: number, y: number): bool;
    }
    class LayoutUpdater {
        public Node: UINode;
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
        public TotalIsRenderVisible: bool;
        public TotalIsHitTestVisible: bool;
        public TotalRenderProjection: bool;
        public Extents: rect;
        public ExtentsWithChildren: rect;
        public Bounds: rect;
        public BoundsWithChildren: rect;
        public GlobalBounds: rect;
        public GlobalBoundsWithChildren: rect;
        public SurfaceBounds: rect;
        public SurfaceBoundsWithChildren: rect;
        public EffectPadding: Thickness;
        public ClipBounds: rect;
        public IsContainer: bool;
        public IsLayoutContainer: bool;
        public BreaksLayoutClipRender: bool;
        public CanHitElement: bool;
        public ShouldSkipHitTest: bool;
        public IsNeverInsideObject: bool;
        public Flags: UIElementFlags;
        public DirtyFlags: _Dirty;
        public InUpDirty: bool;
        public InDownDirty: bool;
        public DirtyRegion: rect;
        private _ForceInvalidateOfNewBounds;
        constructor(Node: UINode);
        public OnIsAttachedChanged(newIsAttached: bool, visualParentNode: UINode): void;
        public OnAddedToTree(): void;
        public OnRemovedFromTree(): void;
        public SetContainerMode(isLayoutContainer: bool, isContainer?: bool): void;
        public HasMeasureArrangeHint(): bool;
        public ProcessDown(): bool;
        public ProcessUp(): bool;
        private _PropagateDirtyFlagToChildren(dirt);
        public FullInvalidate(invTransforms?: bool): void;
        public Invalidate(r?: rect): void;
        private _CacheInvalidateHint();
        public ComputeComposite(): void;
        public InvalidateBitmapCache(): void;
        public InvalidateMeasure(): void;
        public InvalidateArrange(): void;
        public InvalidateSubtreePaint(): void;
        public UpdateClip(): void;
        public SetLayoutClip(layoutClip: rect): void;
        public ComputeLayoutClip(vpLu: LayoutUpdater): void;
        public UpdateTransform(): void;
        public ComputeLocalTransform(uie: UIElement): void;
        public ComputeLocalProjection(uie: UIElement): void;
        public ComputeTransform(uin: UINode, vplu: LayoutUpdater): void;
        public UpdateProjection(): void;
        public TransformPoint(p: Point): void;
        public TransformToVisual(toUin: UINode): Media.GeneralTransform;
        public GetTransformOrigin(uie: UIElement): IPoint;
        public GetTextBlockTransformOrigin(tb: Controls.TextBlock): IPoint;
        public UpdateRenderVisibility(vpLu: LayoutUpdater): void;
        public UpdateTotalRenderVisibility(): void;
        public UpdateHitTestVisibility(vpLu: LayoutUpdater): void;
        public UpdateTotalHitTestVisibility(): void;
        public UpdateBounds(forceRedraw?: bool): void;
        public ComputeBounds(): void;
        public ComputeGlobalBounds(): void;
        public ComputeSurfaceBounds(): void;
        public IntersectBoundsWithClipPath(dest: rect, xform: number[]): void;
        private _UpdateActualSize();
        private _ComputeActualSize();
        private _GetBrushSize();
        private _GetShapeBrushSize(shape);
        public CoerceSize(s: size): size;
        private _HasFlag(flag);
        private _ClearFlag(flag);
        private _SetFlag(flag);
        private _PropagateFlagUp(flag);
        public UpdateLayer(pass: ILayoutPass, error: BError): void;
        private _DoMeasureWithError(error);
        public _Measure(availableSize: size, error: BError): void;
        private _DoArrangeWithError(error);
        public _Arrange(finalRect: rect, error: BError): void;
        public DoRender(ctx: RenderContext, r: rect): void;
        public FindElementsInHostCoordinates(p: Point): UINode[];
        private _FindElementsInHostCoordinates(ctx, p, uinlist, applyXform);
        public HitTestPoint(ctx: RenderContext, p: Point, uinlist: UINode[]): void;
        private _InsideObject(ctx, x, y);
        private _InsideClip(ctx, x, y);
        private _InsideLayoutClip(ctx, x, y);
        public RenderLayoutClip(ctx: RenderContext): void;
    }
}
module Fayde {
    class NameScope {
        public IsRoot: bool;
        private XNodes;
        constructor(isRoot?: bool);
        public FindName(name: string): XamlNode;
        public RegisterName(name: string, xnode: XamlNode): void;
        public UnregisterName(name: string): void;
        public Absorb(otherNs: NameScope): void;
    }
}
module Fayde {
    class StaticResourceExpression extends Expression {
        private _Key;
        private _Target;
        private _Property;
        private _PropertyName;
        private _ResChain;
        constructor(key, target: XamlObject, propd: DependencyProperty, propName: string, templateBindingSource: XamlObject, resChain: ResourceDictionary[]);
        public GetValue(propd: DependencyProperty): any;
        private _GetValue(resChain);
        public Resolve(parser: JsonParser): void;
    }
}
module Fayde {
    class TemplateBindingExpression extends Expression {
        private _Target;
        private _Listener;
        public SourceProperty: DependencyProperty;
        public TargetProperty: DependencyProperty;
        public TargetPropertyName: string;
        private _SetsParent;
        constructor(sourcePropd: DependencyProperty, targetPropd: DependencyProperty, targetPropName: string);
        public GetValue(propd: DependencyProperty);
        public OnAttached(dobj: DependencyObject): void;
        public OnDetached(dobj: DependencyObject): void;
        public OnSourcePropertyChanged(sender: DependencyObject, args: IDependencyPropertyChangedEventArgs): void;
        private _AttachListener();
        private _DetachListener();
    }
}
module Fayde {
    enum VisualTreeDirection {
        Logical,
        LogicalReverse,
        ZFoward,
        ZReverse,
    }
    interface IDataContextMonitor {
        Callback: (newDataContext: any) => void;
        Detach();
    }
    interface IIsAttachedMonitor {
        Callback: (newIsAttached: bool) => void;
        Detach();
    }
    interface IShareableHidden {
        IsShareable: bool;
    }
    class XamlNode implements IShareableHidden {
        public XObject: XamlObject;
        public ParentNode: XamlNode;
        public Name: string;
        public NameScope: NameScope;
        private IsShareable;
        private _OwnerNameScope;
        private _LogicalChildren;
        private _DCMonitors;
        private _IAMonitors;
        constructor(xobj: XamlObject);
        private _DataContext;
        public DataContext : any;
        public OnDataContextChanged(oldDataContext: any, newDataContext: any): void;
        public MonitorDataContext(func: (newDataContext: any) => void): IDataContextMonitor;
        private _IsEnabled;
        public IsEnabled : bool;
        public OnIsEnabledChanged(oldValue: bool, newValue: bool): void;
        public FindName(name: string): XamlNode;
        public SetName(name: string): void;
        public FindNameScope(): NameScope;
        public IsAttached: bool;
        public SetIsAttached(value: bool): void;
        public OnIsAttachedChanged(newIsAttached: bool): void;
        public MonitorIsAttached(func: (newIsAttached: bool) => void): IIsAttachedMonitor;
        public AttachTo(parentNode: XamlNode, error: BError): bool;
        public Detach(): void;
        public OnParentChanged(oldParentNode: XamlNode, newParentNode: XamlNode): void;
        public GetInheritedEnumerator(): IEnumerator;
        public GetVisualTreeEnumerator(direction?: VisualTreeDirection): IEnumerator;
    }
}
module Fayde {
    class XamlObject implements Providers.IIsPropertyInheritable {
        static _LastID;
        private _ID;
        public XamlNode: XamlNode;
        public TemplateOwner: DependencyObject;
        constructor();
        public CreateNode(): XamlNode;
        public Name : string;
        public Clone(): XamlObject;
        public CloneCore(source: XamlObject): void;
        private IsInheritable(propd);
    }
}
module Fayde.Providers {
    class ActualSizeStore extends PropertyStore {
        static Instance: ActualSizeStore;
        public GetValue(storage: IPropertyStorage): number;
        public GetValuePrecedence(storage: IPropertyStorage): PropertyPrecedence;
        public SetLocalValue(storage: IPropertyStorage, newValue: number): void;
        public SetLocalStyleValue(storage: IPropertyStorage, newValue: any): void;
        public SetImplicitStyle(storage: IPropertyStorage, newValue: any): void;
        public ClearValue(storage: IPropertyStorage, notifyListeners?: bool): void;
    }
}
module Fayde.Providers {
    interface IDataContextStorage extends IPropertyStorage {
        InheritedValue: any;
    }
    class DataContextStore extends PropertyStore {
        static Instance: DataContextStore;
        public GetValue(storage: IDataContextStorage): any;
        public GetValuePrecedence(storage: IDataContextStorage): PropertyPrecedence;
        public EmitInheritedChanged(storage: IDataContextStorage, newInherited?: any): void;
        public CreateStorage(dobj: DependencyObject, propd: DependencyProperty): IDataContextStorage;
    }
}
module Fayde.Providers {
    interface IInheritedStorage extends IPropertyStorage {
        InheritedValue: any;
    }
    interface IIsPropertyInheritable {
        IsInheritable(propd: DependencyProperty): bool;
    }
    class InheritedStore extends PropertyStore {
        static Instance: InheritedStore;
        public GetValue(storage: IInheritedStorage): any;
        public GetValuePrecedence(storage: IInheritedStorage): PropertyPrecedence;
        public OnPropertyChanged(storage: IPropertyStorage, effectivePrecedence: PropertyPrecedence, oldValue: any, newValue: any): void;
        public CreateStorage(dobj: DependencyObject, propd: DependencyProperty): IInheritedStorage;
        static PropagateInheritedOnAdd(dobj: DependencyObject, subtreeNode: DONode): void;
        static ClearInheritedOnRemove(dobj: DependencyObject, subtreeNode: DONode): void;
        private Propagate(ownerNode, propd, newValue);
        private SetInheritedValue(don, propd, newValue);
    }
}
module Fayde.Providers {
    interface IIsEnabledStorage extends IPropertyStorage {
        InheritedValue: bool;
    }
    class IsEnabledStore extends PropertyStore {
        static Instance: IsEnabledStore;
        public GetValue(storage: IIsEnabledStorage): bool;
        public GetValuePrecedence(storage: IIsEnabledStorage): PropertyPrecedence;
        public SetLocalValue(storage: IIsEnabledStorage, newValue: bool): void;
        public OnPropertyChanged(storage: IPropertyStorage, effectivePrecedence: PropertyPrecedence, oldValue: any, newValue: any): void;
        public CreateStorage(dobj: DependencyObject, propd: DependencyProperty): IIsEnabledStorage;
        public EmitInheritedChanged(storage: IIsEnabledStorage, newInherited: bool): void;
        static EmitInheritedChanged(cn: Controls.ControlNode, value: bool): void;
    }
}
module Fayde.Data {
    class BindingBase {
        private _IsSealed;
        private _StringFormat;
        private _FallbackValue;
        private _TargetNullValue;
        public StringFormat : string;
        public FallbackValue : any;
        public TargetNullValue : any;
        public CheckSealed(): void;
        public Seal(): void;
    }
}
module Fayde.Data {
    class BindingExpressionBase extends Expression implements IPropertyPathWalkerListener {
        private _Binding;
        public Target: DependencyObject;
        public Property: DependencyProperty;
        private PropertyPathWalker;
        private _DataContextSourceNode;
        private _PropertyListener;
        private _DataContextPropertyMonitor;
        private _SourceAvailableMonitor;
        private _IsBoundToAnyDataContext;
        private _TwoWayTextBox;
        public Binding : Binding;
        public DataSource : any;
        private _Cached;
        private _CachedValue;
        constructor(binding: Binding, target: DependencyObject, propd: DependencyProperty);
        public IsBrokenChanged(): void;
        public ValueChanged(): void;
        public GetValue(propd: DependencyProperty): any;
        public OnAttached(element: DependencyObject): void;
        private _UpdateSourceCallback(sender, args);
        public OnDetached(element: DependencyObject): void;
        private _TextBoxLostFocus();
        public _TryUpdateSourceObject(value: any): void;
        public _UpdateSourceObject(value?: any, force?: bool): void;
        private _MaybeEmitError(message, exception);
        private _ConvertFromTargetToSource(value);
        private _ConvertFromSourceToTarget(value);
        private _ConvertToType(propd, value);
        private _AttachToNotifyError(element);
        private _NotifyErrorsChanged(o, e);
        private _CalculateDataSource();
        private _OnSourceAvailable();
        private _FindSourceByElementName();
        public SetDataContextSource(value: XamlObject): void;
        private _DataContextChanged(newDataContext);
        private _Invalidate();
        public Refresh(): void;
    }
}
module Fayde.Data {
    interface ICollectionView extends IEnumerable {
        CurrentChanged: MulticastEvent;
        CurrentItem: any;
        MoveCurrentTo(item: any): bool;
    }
    var ICollectionView_: IInterfaceDeclaration;
}
module Fayde.Data {
    class RelativeSource {
        public Mode: RelativeSourceMode;
        constructor(mode?: RelativeSourceMode);
    }
}
module Fayde {
    function Run(): void;
    function Start(appType: Function, rjson: any, json: any, canvas: HTMLCanvasElement): void;
}
interface ITimeline {
    Update(nowTime: number);
}
class App implements Fayde.IResourcable {
    static Version: string;
    static Current: App;
    public MainSurface: Surface;
    public Resources: Fayde.ResourceDictionary;
    public Loaded: MulticastEvent;
    public Address: Uri;
    public NavService: Fayde.Navigation.NavService;
    public DebugInterop: Fayde.DebugInterop;
    private _IsRunning;
    private _Storyboards;
    private _ClockTimer;
    static _GenericResourceDictionary;
    constructor();
    public RootVisual : Fayde.UIElement;
    public LoadResources(json: any): void;
    public LoadInitial(canvas: HTMLCanvasElement, json: any): void;
    private EmitLoaded();
    private StartEngine();
    private Tick(lastTime, nowTime);
    private StopEngine();
    private ProcessStoryboards(lastTime, nowTime);
    private Update();
    private Render();
    public RegisterStoryboard(storyboard: ITimeline): void;
    public UnregisterStoryboard(storyboard: ITimeline): void;
    static GetGenericResourceDictionary(): Fayde.ResourceDictionary;
    static GetGenericResourceDictionaryImpl();
    private __DebugLayers();
    private __GetById(id);
}
module Fayde {
    interface ITimerListener {
        Tick(lastTime: number, nowTime: number);
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
module Fayde {
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
        public App: App;
        public Surface: Surface;
        constructor(app: App);
        public LayoutUpdated(): void;
        public IsCacheInvalidated : bool;
        public InvalidateCache(): void;
        public GetCache(): string;
        private GenerateCache();
        private PopulateCacheChildren(item);
        private CreateDebugInteropCacheItem(node);
        public GetDPCache(): string;
        private GenerateDPCache();
        public GetStorages(id: number): string;
        public GetById(id: number, cur?: IDebugInteropCache): IDebugInteropCache;
        public GetResetPerfInfo(): string;
        public RegisterHitTestDebugService(): void;
        public GetVisualIDsInHitTest(): string;
        static _StringifyReplacer(key, value);
    }
}
class Exception {
    public Message: string;
    constructor(message: string);
    public toString(): string;
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
class IndexOutOfRangeException extends Exception {
    constructor(index: number);
}
class AttachException extends Exception {
    public Data: any;
    constructor(message: string, data: any);
}
class InvalidJsonException extends Exception {
    public JsonText: string;
    public InnerException: Error;
    constructor(jsonText: string, innerException: Error);
}
class TargetInvocationException extends Exception {
    public InnerException: Exception;
    constructor(message: string, innerException: Exception);
}
class UnknownTypeException extends Exception {
    public FullTypeName: string;
    constructor(fullTypeName: string);
}
module Fayde {
    class RenderContext {
        public CanvasContext: CanvasRenderingContext2D;
        public CurrentTransform: number[];
        private _Transforms;
        constructor(ctx: CanvasRenderingContext2D);
        public DoRender(layers: UINode[], r: rect): void;
        public Save(): void;
        public Restore(): void;
        public ClipRect(r: rect): void;
        public ClipGeometry(g: Media.Geometry): void;
        public ClipRawPath(p: any): void;
        public IsPointInPath(x: number, y: number): bool;
        public IsPointInClipPath(clip: Media.Geometry, x: number, y: number): bool;
        public Rect(r: rect): void;
        public Fill(brush: Media.Brush, r: rect): void;
        public FillRect(brush: Media.Brush, r: rect): void;
        public StrokeAndFillRect(strokeBrush: Media.Brush, thickness: number, strokeRect: rect, fillBrush: Media.Brush, fillRect: rect): void;
        public Stroke(stroke: Media.Brush, thickness: number, region: rect): void;
        public Clear(r: rect): void;
        public SetLineDash(offsets: number[]): void;
        public PreTransformMatrix(mat: number[]): void;
        public PreTransform(transform: Media.Transform): void;
        public TransformMatrix(mat: number[]): void;
        public Transform(transform: Media.Transform): void;
        public Translate(x: number, y: number): void;
    }
}
var resizeTimeout: number;
interface IFocusChangedEvents {
    GotFocus: Fayde.UINode[];
    LostFocus: Fayde.UINode[];
}
enum InputType {
    NoOp,
    MouseUp,
    MouseDown,
    MouseLeave,
    MouseEnter,
    MouseMove,
    MouseWheel,
}
interface ICommonElementIndices {
    Index1: number;
    Index2: number;
}
class Surface {
    static TestCanvas: HTMLCanvasElement;
    public TestRenderContext: Fayde.RenderContext;
    private _App;
    public _TopLevel: Fayde.UIElement;
    private _Layers;
    private _UpDirty;
    private _DownDirty;
    private _Canvas;
    private _Ctx;
    private _PercentageWidth;
    private _PercentageHeight;
    private _CanvasOffset;
    private _Extents;
    private _KeyInterop;
    private _CapturedInputList;
    private _InputList;
    private _FocusedNode;
    public FocusedNode : Fayde.UINode;
    private _FocusChangedEvents;
    private _FirstUserInitiatedEvent;
    private _UserInitiatedEvent;
    private _Captured;
    private _PendingCapture;
    private _PendingReleaseCapture;
    private _CurrentPos;
    private _EmittingMouseEvent;
    private _Cursor;
    private _InvalidatedRect;
    private _RenderContext;
    public HitTestCallback: (inputList: Fayde.UINode[]) => void;
    constructor(app: App);
    public Extents : size;
    public Register(canvas: HTMLCanvasElement, width?: number, widthType?: string, height?: number, heightType?: string): void;
    private _InitializeCanvas(canvas, width, widthType, height, heightType);
    private _CalculateOffset();
    private _RegisterEvents();
    public Attach(uie: Fayde.UIElement): void;
    public AttachLayer(layer: Fayde.UIElement): void;
    public DetachLayer(layer: Fayde.UIElement): void;
    public ProcessDirtyElements(): bool;
    public _UpdateLayout(error: BError): bool;
    private _ProcessDownDirtyElements();
    private _ProcessUpDirtyElements();
    private _GetChildNodeInUpListIndex(lu);
    private _PropagateDirtyFlagToChildren(element, dirt);
    public _AddDirtyElement(lu: Fayde.LayoutUpdater, dirt: _Dirty): void;
    private _RemoveDirtyElement(lu);
    public OnNodeDetached(lu: Fayde.LayoutUpdater): void;
    public _Invalidate(r?: rect): void;
    public Render(): void;
    private _HandleResize(evt);
    private _HandleResizeTimeout(evt);
    private _ResizeCanvas();
    private _UpdateCursorFromInputList();
    private _SetCursor(cursor);
    public _HandleKeyDown(args: Fayde.Input.KeyEventArgs): void;
    private _EmitKeyDown(list, args, endIndex?);
    private _HandleButtonPress(evt);
    private _HandleButtonRelease(evt);
    private _HandleOut(evt);
    private _HandleMove(evt);
    private _HandleWheel(evt);
    private _HandleMouseEvent(type, button, pos, delta?, emitLeave?, emitEnter?);
    private _GetMousePosition(evt);
    private _FindFirstCommonElement(list1, list2, outObj);
    private _EmitMouseList(type, button, pos, delta, list, endIndex?);
    private _CreateEventArgs(type, pos, delta);
    public SetMouseCapture(uin: Fayde.UINode): bool;
    public ReleaseMouseCapture(uin: Fayde.UINode): void;
    private _PerformCapture(uin);
    private _PerformReleaseCapture();
    private _SetUserInitiatedEvent(val);
    public Focus(ctrlNode: Fayde.Controls.ControlNode, recurse?: bool): bool;
    private _FocusNode(uin?);
    private _EnsureElementFocused();
    public _RemoveFocusFrom(lu: Fayde.LayoutUpdater): void;
    private _EmitFocusChangeEventsAsync();
    private _EmitFocusChangeEvents();
    private _EmitFocusList(type, list);
    static _ElementPathToRoot(source);
    static IsLeftButton(button);
    static IsRightButton(button);
    static MeasureWidth(text: string, font: Font): number;
    public __DebugLayers(): string;
    public __GetById(id: number): Fayde.UIElement;
}
module Fayde.Input {
    interface ICommand {
        Execute(parameter: any);
        CanExecute(parameter: any): bool;
        CanExecuteChanged: MulticastEvent;
    }
    var ICommand_: IInterfaceDeclaration;
}
module Fayde.Input {
    enum KeyboardNavigationMode {
        Continue,
        Once,
        Cycle,
        None,
        Contained,
        Local,
    }
    enum ModifierKeys {
        None,
        Alt,
        Control,
        Shift,
        Windows,
        Apple,
    }
    interface IModifiersOn {
        Shift: bool;
        Ctrl: bool;
        Alt: bool;
    }
    class Keyboard {
        static Modifiers: ModifierKeys;
        static RefreshModifiers(e: IModifiersOn): void;
        static HasControl(): bool;
        static HasAlt(): bool;
        static HasShift(): bool;
    }
}
module Fayde {
    interface IAttachedDefinition {
        Owner: Function;
        Prop: string;
        Value: any;
    }
    class JsonParser {
        private _ResChain;
        private _RootXamlObject;
        private _TemplateBindingSource;
        private _SRExpressions;
        static Parse(json: any, templateBindingSource?: DependencyObject, namescope?: NameScope, resChain?: ResourceDictionary[], rootXamlObject?: XamlObject): any;
        static ParseUserControl(uc: Controls.UserControl, json: any): UIElement;
        static ParseResourceDictionary(rd: ResourceDictionary, json: any): void;
        static ParsePage(json: any): Controls.Page;
        public CreateObject(json: any, namescope: NameScope, ignoreResolve?: bool): any;
        public SetObject(json: any, xobj: XamlObject, namescope: NameScope, ignoreResolve?: bool): any;
        public TrySetPropertyValue(xobj: XamlObject, propd: DependencyProperty, propValue: any, namescope: NameScope, isAttached: bool, ownerType: Function, propName: string): void;
        public TrySetCollectionProperty(subJson: any[], xobj: XamlObject, propd: DependencyProperty, propertyName: string, namescope: NameScope): bool;
        public SetResourceDictionary(rd: ResourceDictionary, json: any, namescope: NameScope): void;
        public ResolveStaticResourceExpressions(): void;
        public SetValue(xobj: XamlObject, propd: DependencyProperty, propName: string, value: any): void;
        private GetAnnotationMember(type, member);
    }
}
module Fayde {
    class Markup {
        public Transmute(target: XamlObject, propd: DependencyProperty, propName: string, templateBindingSource: DependencyObject, resChain: ResourceDictionary[]): void;
    }
}
module Fayde {
    class StaticResourceMarkup extends Markup {
        public Key: any;
        constructor(key: any);
        public Transmute(target: XamlObject, propd: DependencyProperty, propName: string, templateBindingSource: DependencyObject, resChain: ResourceDictionary[]): StaticResourceExpression;
    }
}
module Fayde {
    class TemplateBindingMarkup extends Markup {
        public Path: string;
        constructor(path: string);
        public Transmute(target: XamlObject, propd: DependencyProperty, propName: string, templateBindingSource: DependencyObject, resChain: ResourceDictionary[]): TemplateBindingExpression;
    }
}
module Fayde.Media {
    interface IMatrixChangedListener {
        Callback: (newMatrix: Matrix) => void;
        Detach();
    }
    class Matrix {
        public _Raw: number[];
        private _Inverse;
        constructor(raw?: number[]);
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
        public toString(): string;
    }
}
module Fayde.Media {
    interface IMatrix3DChangedListener {
        Callback: (newMatrix3D: Matrix3D) => void;
        Detach();
    }
    class Matrix3D {
        public _Raw: number[];
        private _Inverse;
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
module Fayde.Media.Animation {
    class RepeatBehavior {
        private _Duration;
        private _Count;
        public IsForever: bool;
        static FromRepeatDuration(duration: Duration): RepeatBehavior;
        static FromIterationCount(count: number): RepeatBehavior;
        static FromForever(): RepeatBehavior;
        public HasCount : bool;
        public Count : number;
        public HasDuration : bool;
        public Duration : Duration;
        public Clone(): RepeatBehavior;
    }
}
module Fayde.Navigation {
    class NavService {
        public App: App;
        public Href: string;
        public Hash: string;
        public LocationChanged: MulticastEvent;
        constructor(app: App);
        private _HandleFragmentChange();
    }
}
class Clip {
    public X: number;
    public Y: number;
    public Width: number;
    public Height: number;
    constructor(r: rect);
}
class Color implements ICloneable {
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
class CornerRadius implements ICloneable {
    public TopLeft: number;
    public TopRight: number;
    public BottomRight: number;
    public BottomLeft: number;
    constructor(topLeft?: number, topRight?: number, bottomRight?: number, bottomLeft?: number);
    public IsZero(): bool;
    public Equals(other: CornerRadius): bool;
    public toString(): string;
    public Clone(): CornerRadius;
}
enum DurationType {
    Automatic,
    Forever,
    TimeSpan,
}
class Duration implements ICloneable {
    private _Type;
    private _TimeSpan;
    static CreateAutomatic(): Duration;
    static CreateForever(): Duration;
    static CreateTimeSpan(ts: TimeSpan): Duration;
    public Clone(): Duration;
    public Type : DurationType;
    public TimeSpan : TimeSpan;
    public HasTimeSpan : bool;
    public IsForever : bool;
    public IsAutomatic : bool;
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
    public _Descender(): number;
    public _Ascender(): number;
    private _PurgeCache();
    public ToHtml5Object(): string;
    private _BuildTranslation();
    static _MeasureHeight(font);
}
class FontFamily implements ICloneable {
    public FamilyNames: string;
    constructor(FamilyNames: string);
    public toString(): string;
    public Clone(): FontFamily;
}
class KeyTime implements ICloneable {
    private _IsPaced;
    private _IsUniform;
    private _TimeSpan;
    private _Percent;
    public IsValid: bool;
    static CreateUniform(): KeyTime;
    static CreateTimeSpan(ts: TimeSpan): KeyTime;
    public Clone(): KeyTime;
    public IsPaced : bool;
    public IsUniform : bool;
    public HasTimeSpan : bool;
    public TimeSpan : TimeSpan;
    public HasPercent : bool;
    public Percent : number;
}
interface IPoint {
    X: number;
    Y: number;
}
class Point implements ICloneable, IPoint {
    public X: number;
    public Y: number;
    constructor(x?: number, y?: number);
    public toString(): string;
    public Equals(other: Point): bool;
    public Clone(): Point;
    static Equals(p1: Point, p2: Point): bool;
    static LERP(start: Point, end: Point, p: number): Point;
}
var RectOverlap: {
    Out: number;
    In: number;
    Part: number;
};
class rect implements ICloneable {
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
    static set(dest: rect, x: number, y: number, width: number, height: number): void;
    static isEmpty(rect1: rect): bool;
    static isEmptyLogical(rect1: rect): bool;
    static copyTo(src: rect, dest?: rect): rect;
    static isEqual(rect1: rect, rect2: rect): bool;
    static intersection(dest: rect, rect2: rect): rect;
    static union(dest: rect, rect2: rect): rect;
    static unionLogical(dest: rect, rect2: rect): rect;
    static growBy(dest: rect, left: number, top: number, right: number, bottom: number): void;
    static growByThickness(dest: rect, thickness): void;
    static shrinkBy(dest: rect, left: number, top: number, right: number, bottom: number): void;
    static shrinkByThickness(dest: rect, thickness): void;
    static extendTo(rect1: rect, x: number, y: number): void;
    static transform(dest: rect, xform: number[]): rect;
    static clipmask(clip);
    static transform4(dest: rect, projection: number[]): rect;
    static round(dest: rect): rect;
    static roundOut(dest: rect): rect;
    static roundIn(dest: rect): rect;
    static copyGrowTransform(dest: rect, src: rect, thickness, xform): void;
    static copyGrowTransform4(dest: rect, src: rect, thickness, projection): void;
    static containsPoint(rect1: rect, p: Point): bool;
    static containsPointXY(rect1: rect, x: number, y: number): bool;
    static rectIn(rect1: rect, rect2: rect): number;
    static isRectContainedIn(src: rect, test: rect): bool;
}
interface ISize {
    Width: number;
    Height: number;
}
class size implements ICloneable, ISize {
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
    static isEqual(size1: size, size2: size): bool;
    static growBy(dest: size, width: number, height: number): size;
    static growByThickness(dest: size, thickness: Thickness): size;
    static shrinkBy(dest: size, width: number, height: number): size;
    static shrinkByThickness(dest: size, thickness: Thickness): size;
    static min(dest: size, other: size): size;
    static max(dest: size, other: size): size;
}
class Thickness implements ICloneable {
    public Left: number;
    public Top: number;
    public Right: number;
    public Bottom: number;
    constructor(left?: number, top?: number, right?: number, bottom?: number);
    public Plus(thickness2: Thickness): Thickness;
    public IsEmpty(): bool;
    public IsBalanced(): bool;
    public toString(): string;
    public Clone(): Thickness;
    static Equals(thickness1: Thickness, thickness2: Thickness): bool;
}
class TimeSpan {
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
class Uri implements ICloneable {
    private _OriginalString;
    constructor(originalString: string);
    public GetFragment(): string;
    public toString(): string;
    public Clone(): Uri;
    static IsNullOrEmpty(uri: Uri): bool;
}
class BError {
    static Argument: number;
    static InvalidOperation: number;
    static XamlParse: number;
    static Attach: number;
    public Message: string;
    public Number: number;
    public Data: any;
    public ThrowException(): void;
}
class Enum {
    public Object: any;
    constructor(Object: any);
}
module Fayde {
    interface IEnumerable {
        GetEnumerator(reverse?: bool): IEnumerator;
    }
    var IEnumerable_: IInterfaceDeclaration;
    interface IEnumerator {
        Current: any;
        MoveNext(): bool;
    }
    var IEnumerator_: IInterfaceDeclaration;
    class ArrayEx {
        static EmptyEnumerator: {
            MoveNext: () => bool;
            Current: any;
        };
        static AsEnumerable(arr: any[]): IEnumerable;
        static GetEnumerator(arr: any[], isReverse?: bool): IEnumerator;
        static GetNodeEnumerator(arr: XamlObject[], isReverse?: bool): IEnumerator;
        static RemoveIfContains(arr: any[], item: any): bool;
        static Except(arr1: any[], arr2: any[]): any[];
        static Fill(arr: any[], index: number, count: number, fill: any): void;
    }
}
class EventArgs {
    static Empty: EventArgs;
}
interface IEventListener {
    Closure: any;
    Callback: (sender: any, e: EventArgs) => void;
}
class MulticastEvent {
    private _Listeners;
    public Subscribe(callback: (sender: any, e: EventArgs) => void, closure: any): void;
    public Unsubscribe(callback: (sender: any, e: EventArgs) => void, closure: any): void;
    public Raise(sender: any, args: EventArgs): void;
    public RaiseAsync(sender: any, args: EventArgs): void;
}
module Fayde.Collections {
    enum NotifyCollectionChangedAction {
        Add,
        Remove,
        Replace,
        Reset,
    }
    class NotifyCollectionChangedEventArgs extends EventArgs {
        public Action: NotifyCollectionChangedAction;
        public OldStartingIndex: number;
        public NewStartingIndex: number;
        public OldItems: any[];
        public NewItems: any[];
        static Reset(): NotifyCollectionChangedEventArgs;
        static Replace(newValue: any, oldValue: any, index: number): NotifyCollectionChangedEventArgs;
        static Add(newValue: any, index: number): NotifyCollectionChangedEventArgs;
        static AddRange(newValues: any[], index: number): NotifyCollectionChangedEventArgs;
        static Remove(oldValue: any, index: number): NotifyCollectionChangedEventArgs;
    }
}
module Fayde.Collections {
    class ObservableCollection implements IEnumerable, INotifyCollectionChanged, INotifyPropertyChanged {
        private _ht;
        public GetEnumerator(): IEnumerator;
        public CollectionChanged: MulticastEvent;
        public PropertyChanged: MulticastEvent;
        public Count : number;
        public GetValueAt(index: number): any;
        public SetValueAt(index: number, value: any): void;
        public Add(value: any): void;
        public AddRange(values: any[]): void;
        public Insert(value: any, index: number): void;
        public IndexOf(value: any): number;
        public Contains(value: any): bool;
        public Remove(value: any): void;
        public RemoveAt(index: number): void;
        public Clear(): void;
        private _RaisePropertyChanged(propertyName);
    }
}
module Fayde.Controls {
    class ControlTemplate extends FrameworkTemplate {
        private _TempJson;
        public TargetType: Function;
        constructor(targetType: Function, json: any);
        public GetVisualTree(templateBindingSource: DependencyObject): UIElement;
    }
}
module Fayde.Controls {
    class ItemsPanelTemplate extends FrameworkTemplate {
        private _TempJson;
        constructor(json: any);
        public GetVisualTree(templateBindingSource: DependencyObject): Panel;
    }
}
module Fayde.Controls.Primitives {
    class ItemsChangedEventArgs extends EventArgs {
        public Action: Collections.NotifyCollectionChangedAction;
        public ItemCount: number;
        public ItemUICount: number;
        public OldPosition: IGeneratorPosition;
        public Position: IGeneratorPosition;
        constructor(action: Collections.NotifyCollectionChangedAction, itemCount: number, itemUICount: number, oldPosition: IGeneratorPosition, position: IGeneratorPosition);
    }
}
module Fayde.Controls.Primitives {
    class SelectionChangedEventArgs extends EventArgs {
        public OldValues: any[];
        public NewValues: any[];
        constructor(oldValues: any[], newValues: any[]);
    }
}
module Fayde {
    class DataTemplate extends FrameworkTemplate {
        private _TempJson;
        constructor(json: any);
        public GetVisualTree(templateBindingSource?: DependencyObject): UIElement;
    }
}
module Fayde {
    class DeferredValueExpression extends Expression {
        public GetValue(propd: DependencyProperty): any;
    }
}
module Fayde {
    class DONode extends XamlNode {
        public XObject: DependencyObject;
        constructor(xobj: DependencyObject);
        public OnParentChanged(oldParentNode: XamlNode, newParentNode: XamlNode): void;
        public DataContext : any;
        public _DataContextPropertyChanged(args: IDependencyPropertyChangedEventArgs): void;
    }
    class DependencyObject extends XamlObject implements ICloneable, Providers.IPropertyStorageOwner {
        private _Expressions;
        private _PropertyStorage;
        static DataContextProperty: DependencyProperty;
        public DataContext: any;
        constructor();
        public XamlNode: DONode;
        public CreateNode(): DONode;
        public GetValue(propd: DependencyProperty): any;
        public SetValue(propd: DependencyProperty, value: any): void;
        public SetValueInternal(propd: DependencyProperty, value: any): void;
        public SetStoreValue(propd: DependencyProperty, value: any): void;
        public ClearValue(propd: DependencyProperty): void;
        public ReadLocalValue(propd: DependencyProperty): any;
        private _AddExpression(propd, expr);
        private _RemoveExpression(propd);
        public _HasDeferredValueExpression(propd: DependencyProperty): bool;
        public GetBindingExpression(propd: DependencyProperty): Data.BindingExpressionBase;
        public SetBinding(propd: DependencyProperty, binding: Data.Binding): Data.BindingExpressionBase;
        private CloneCore(source);
    }
}
module Fayde {
    interface IFontChangeable {
        FontChanged(args: IDependencyPropertyChangedEventArgs);
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
module Fayde {
    class PropertyChangedEventArgs extends EventArgs {
        public PropertyName: string;
        constructor(propertyName: string);
    }
    interface INotifyPropertyChanged {
        PropertyChanged: MulticastEvent;
    }
    var INotifyPropertyChanged_: IInterfaceDeclaration;
}
module Fayde {
    class ResourceTarget extends XamlObject {
        private _Json;
        private _Namescope;
        private _TemplateBindingSource;
        private _ResChain;
        constructor(json: any, namescope: NameScope, templateBindingSource: DependencyObject, resChain: ResourceDictionary[]);
        public CreateResource(): XamlObject;
    }
}
module Fayde {
    class RoutedEvent extends MulticastEvent {
    }
}
module Fayde {
    class RoutedEventArgs extends EventArgs {
        public Handled: bool;
        public Source: any;
        public OriginalSource: any;
    }
}
module Fayde {
    class RoutedPropertyChangedEventArgs extends RoutedEventArgs {
        public OldValue: any;
        public NewValue: any;
        constructor(oldValue: any, newValue: any);
    }
}
module Fayde {
    class SizeChangedEventArgs extends RoutedEventArgs {
        public PreviousSize: size;
        public NewSize: size;
        constructor(previousSize: size, newSize: size);
    }
}
module Fayde {
    class Style extends DependencyObject {
        private _IsSealed;
        static BasedOnProperty: DependencyProperty;
        static TargetTypeProperty: DependencyProperty;
        public Setters: SetterCollection;
        public BasedOn: Style;
        public TargetType: Function;
        static Annotations: {
            ContentProperty: string;
        };
        constructor();
        public Seal(): void;
        public Validate(instance: DependencyObject, error: BError): bool;
    }
}
module Fayde {
    class XamlObjectCollection extends XamlObject implements IEnumerable {
        private _ht;
        public AttachTo(xobj: XamlObject): void;
        public Count : number;
        public GetRange(startIndex: number, endIndex: number): XamlObject[];
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
        public AddingToCollection(value: XamlObject, error: BError): bool;
        public RemovedFromCollection(value: XamlObject, isValueSafe: bool): void;
        public GetEnumerator(reverse?: bool): IEnumerator;
        public GetNodeEnumerator(reverse?: bool): IEnumerator;
        public _RaiseItemAdded(value: XamlObject, index: number): void;
        public _RaiseItemRemoved(value: XamlObject, index: number): void;
        public _RaiseItemReplaced(removed: XamlObject, added: XamlObject, index: number): void;
        public _RaiseCleared(): void;
        public CloneCore(source: XamlObjectCollection): void;
    }
}
module Fayde.Data {
    interface IValueConverter {
        Convert(value: any, targetType: Function, parameter: any, culture: any): any;
        ConvertBack(value: any, targetType: Function, parameter: any, culture: any): any;
    }
    class Binding extends BindingBase {
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
        constructor(path: string);
        public BindsDirectlyToSource : bool;
        public Converter : IValueConverter;
        public ConverterParameter : any;
        public ConverterCulture : any;
        public ElementName : string;
        public Mode : BindingMode;
        public NotifyOnValidationError : bool;
        public RelativeSource : RelativeSource;
        public Path : PropertyPath;
        public Source : any;
        public UpdateSourceTrigger : UpdateSourceTrigger;
        public ValidatesOnExceptions : bool;
        public ValidatesOnDataErrors : bool;
        public ValidatesOnNotifyDataErrors : bool;
    }
}
module Fayde.Data {
    class BindingExpression extends BindingExpressionBase {
        constructor(binding: Binding, target: DependencyObject, propd: DependencyProperty);
        public ParentBinding : Binding;
        public DataItem : any;
        public UpdateSource(): void;
    }
}
module Fayde.Data {
    class CollectionViewSource extends DependencyObject {
        static SourceProperty: DependencyProperty;
        static ViewProperty: DependencyProperty;
        public Source: any;
        public View: ICollectionView;
    }
}
module Fayde.Documents {
    class TextElementNode extends DONode {
        public XObject: TextElement;
        constructor(xobj: TextElement, inheritedWalkProperty: string);
        public InheritedWalkProperty: string;
        public GetInheritedEnumerator(): IEnumerator;
    }
    class TextElement extends DependencyObject implements Text.ITextAttributesSource, IFontChangeable {
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
        private IsInheritable(propd);
        private _Font;
        constructor();
        public _SerializeText(): string;
        private _UpdateFont(force?);
        public Background : Media.Brush;
        public SelectionBackground : Media.Brush;
        public SelectionForeground : Media.Brush;
        public Font : Font;
        public Direction : FlowDirection;
        public IsUnderlined : bool;
        public Start: number;
        public Equals(te: TextElement): bool;
        private FontChanged(args);
    }
}
module Fayde.Input {
    class KeyboardNavigation {
        static AcceptsReturnProperty: DependencyProperty;
        static GetAcceptsReturn(d: DependencyObject): bool;
        static SetAcceptsReturn(d: DependencyObject, value: bool): void;
        static ControlTabNavigationProperty: DependencyProperty;
        static GetControlTabNavigation(d: DependencyObject): KeyboardNavigationMode;
        static SetControlTabNavigation(d: DependencyObject, value: KeyboardNavigationMode): void;
        static DirectionalNavigationProperty: DependencyProperty;
        static GetDirectionalNavigation(d: DependencyObject): KeyboardNavigationMode;
        static SetDirectionalNavigation(d: DependencyObject, value: KeyboardNavigationMode): void;
        static IsTabStopProperty: DependencyProperty;
        static GetIsTabStop(d: DependencyObject): bool;
        static SetIsTabStop(d: DependencyObject, value: bool): void;
        static TabIndexProperty: DependencyProperty;
        static GetTabIndex(d: DependencyObject): number;
        static SetTabIndex(d: DependencyObject, value: number): void;
        static TabNavigationProperty: DependencyProperty;
        static GetTabNavigation(d: DependencyObject): KeyboardNavigationMode;
        static SetTabNavigation(d: DependencyObject, value: KeyboardNavigationMode): void;
    }
}
module Fayde.Input {
    enum Key {
        None,
        Back,
        Tab,
        Enter,
        Shift,
        Ctrl,
        Alt,
        CapsLock,
        Escape,
        Space,
        PageUp,
        PageDown,
        End,
        Home,
        Left,
        Up,
        Right,
        Down,
        Insert,
        Delete,
        D0,
        D1,
        D2,
        D3,
        D4,
        D5,
        D6,
        D7,
        D8,
        D9,
        A,
        B,
        C,
        D,
        E,
        F,
        G,
        H,
        I,
        J,
        K,
        L,
        M,
        N,
        O,
        P,
        Q,
        R,
        S,
        T,
        U,
        V,
        W,
        X,
        Y,
        Z,
        F1,
        F2,
        F3,
        F4,
        F5,
        F6,
        F7,
        F8,
        F9,
        F10,
        F11,
        F12,
        NumPad0,
        NumPad1,
        NumPad2,
        NumPad3,
        NumPad4,
        NumPad5,
        NumPad6,
        NumPad7,
        NumPad8,
        NumPad9,
        Multiply,
        Add,
        Subtract,
        Decimal,
        Divide,
        Unknown,
    }
    class KeyboardEventArgs extends RoutedEventArgs {
    }
    class KeyEventArgs extends KeyboardEventArgs {
        public Modifiers: IModifiersOn;
        public PlatformKeyCode: number;
        public Key: Key;
        public Char: string;
        constructor(modifiers: IModifiersOn, keyCode: number, key: Key, char?: string);
    }
}
module Fayde.Input {
    class KeyInterop {
        public Surface: Surface;
        constructor(Surface: Surface);
        public RegisterEvents(): void;
        public CreateArgsPress(e): KeyEventArgs;
        public CreateArgsDown(e): KeyEventArgs;
        static CreateInterop(surface: Surface): KeyInterop;
    }
    class IEKeyInterop extends KeyInterop {
        constructor(surface: Surface);
        public CreateArgsPress(e): KeyEventArgs;
        public CreateArgsDown(e): KeyEventArgs;
    }
    class NetscapeKeyInterop extends KeyInterop {
        constructor(surface: Surface);
        public CreateArgsPress(e): KeyEventArgs;
        public CreateArgsDown(e): KeyEventArgs;
    }
}
module Fayde.Input {
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
module Fayde {
    interface IBindingData {
        Path: string;
        FallbackValue: any;
        Mode: Data.BindingMode;
        StringFormat: string;
        ElementName: string;
    }
    class BindingMarkup extends Markup {
        private _Data;
        constructor(data: any);
        public Transmute(target: XamlObject, propd: DependencyProperty, propName: string, templateBindingSource: DependencyObject, resChain: ResourceDictionary[]): Data.BindingExpression;
        private _BuildBinding();
    }
}
module Fayde.Media {
    class GeneralTransform extends DependencyObject {
        public Inverse: GeneralTransform;
        public Transform(p: Point): Point;
        public TransformBounds(r: rect): rect;
        public TryTransform(inPoint: Point, outPoint: Point): bool;
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
module Fayde.Media {
    interface IGeometryListener {
        GeometryChanged(newGeometry: Geometry);
    }
    class Geometry extends DependencyObject {
        private _Path;
        private _LocalBounds;
        private _Listener;
        static TransformProperty: DependencyProperty;
        public Transform: Transform;
        constructor();
        public GetBounds(thickness?: number): rect;
        public Draw(ctx: RenderContext): void;
        public ComputePathBounds(thickness: number): rect;
        public _InvalidateGeometry(): void;
        public _Build(): Shapes.RawPath;
        public Listen(listener: IGeometryListener): void;
        public Unlisten(listener: IGeometryListener): void;
        private _TransformListener;
        private _TransformChanged(args);
        public Serialize(): string;
    }
    class GeometryCollection extends XamlObjectCollection implements IGeometryListener {
        private _Listener;
        public Listen(listener: IGeometryListener): void;
        public Unlisten(listener: IGeometryListener): void;
        public AddingToCollection(value: Geometry, error: BError): bool;
        public RemovedFromCollection(value: Geometry, isValueSafe: bool): void;
        private GeometryChanged(newGeometry);
    }
}
module Fayde.Media {
    class GeometryGroup extends Geometry implements IGeometryListener {
        static FillRulleProperty: DependencyProperty;
        public FillRule: Shapes.FillRule;
        public Children: GeometryCollection;
        constructor();
        public ComputePathBounds(thickness: number): rect;
        public Draw(ctx: RenderContext): void;
        private GeometryChanged(newGeometry);
    }
}
module Fayde.Media {
    interface IGradientStopListener {
        GradientStopChanged(newGradientStop: GradientStop);
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
        GradientStopsChanged(newGradientStops: GradientStopCollection);
    }
    class GradientStopCollection extends XamlObjectCollection implements IGradientStopListener {
        private _Listener;
        public Listen(listener: IGradientStopsListener): void;
        public Unlisten(listener: IGradientStopsListener): void;
        private AddingToCollection(value, error);
        private RemovedFromCollection(value, isValueSafe);
        private GradientStopChanged(newGradientStop);
    }
}
module Fayde.Media {
    class LineGeometry extends Geometry {
        static StartPointProperty: DependencyProperty;
        static EndPointProperty: DependencyProperty;
        public StartPoint: Point;
        public EndPoint: Point;
        private _Build();
    }
}
module Fayde.Media {
    interface IPathFigureListener {
        PathFigureChanged(newPathFigure: PathFigure);
    }
    class PathFigure extends DependencyObject implements IPathSegmentListener {
        static Annotations: {
            ContentProperty: string;
        };
        static IsClosedProperty: DependencyProperty;
        static StartPointProperty: DependencyProperty;
        static IsFilledProperty: DependencyProperty;
        public IsClosed: bool;
        public Segments: PathSegmentCollection;
        public StartPoint: Point;
        public IsFilled: bool;
        private _Path;
        private _Listener;
        constructor();
        private _Build();
        private PathSegmentChanged(newPathSegment);
        private InvalidatePathFigure();
        public Listen(listener: IPathFigureListener): void;
        public Unlisten(listener: IPathFigureListener): void;
        public MergeInto(rp: Shapes.RawPath): void;
    }
    class PathFigureCollection extends XamlObjectCollection implements IPathFigureListener {
        private _Listener;
        public AddingToCollection(value: PathFigure, error: BError): bool;
        public RemovedFromCollection(value: PathFigure, isValueSafe: bool): void;
        public Listen(listener: IPathFigureListener): void;
        public Unlisten(listener: IPathFigureListener): void;
        private PathFigureChanged(newPathFigure);
    }
}
module Fayde.Media {
    class PathGeometry extends Geometry implements IPathFigureListener {
        private _OverridePath;
        static Annotations: {
            ContentProperty: string;
        };
        static FillRuleProperty: DependencyProperty;
        public FillRule: Shapes.FillRule;
        public Figures: PathFigureCollection;
        constructor();
        public OverridePath(path: Shapes.RawPath): void;
        private _Build();
        private PathFigureChanged(newPathFigure);
    }
}
module Fayde.Media {
    interface IPathSegmentListener {
        PathSegmentChanged(newPathSegment: PathSegment);
    }
    class PathSegment extends DependencyObject {
        private _Listener;
        public _Append(path: Shapes.RawPath): void;
        public Listen(listener: IPathSegmentListener): void;
        public Unlisten(listener: IPathSegmentListener): void;
    }
    class PathSegmentCollection extends XamlObjectCollection implements IPathSegmentListener {
        private _Listener;
        public AddingToCollection(value: PathSegment, error: BError): bool;
        public RemovedFromCollection(value: PathSegment, isValueSafe: bool): void;
        public Listen(listener: IPathSegmentListener): void;
        public Unlisten(listener: IPathSegmentListener): void;
        private PathSegmentChanged(newPathSegment);
    }
}
module Fayde.Media {
    class ArcSegment extends PathSegment {
        static IsLargeArcProperty: DependencyProperty;
        static PointProperty: DependencyProperty;
        static RotationAngleProperty: DependencyProperty;
        static SizeProperty: DependencyProperty;
        static SweepDirectionProperty: DependencyProperty;
        public IsLargeArc: bool;
        public Point: Point;
        public RotationAngle: number;
        public Size: size;
        public SweepDirection: Shapes.SweepDirection;
        private _Append(path);
    }
    class BezierSegment extends PathSegment {
        static Point1Property: DependencyProperty;
        static Point2Property: DependencyProperty;
        static Point3Property: DependencyProperty;
        public Point1: Point;
        public Point2: Point;
        public Point3: Point;
        private _Append(path);
    }
    class LineSegment extends PathSegment {
        static PointProperty: DependencyProperty;
        public Point: Point;
        private _Append(path);
    }
    class PolyBezierSegment extends PathSegment {
        static Annotations: {
            ContentProperty: string;
        };
        public Points: Shapes.PointCollection;
        private _Append(path);
    }
    class PolyLineSegment extends PathSegment {
        static Annotations: {
            ContentProperty: string;
        };
        public Points: Shapes.PointCollection;
        public _Append(path: Shapes.RawPath): void;
    }
    class PolyQuadraticBezierSegment extends PathSegment {
        static Annotations: {
            ContentProperty: string;
        };
        public Points: Shapes.PointCollection;
        private _Append(path);
    }
    class QuadraticBezierSegment extends PathSegment {
        static Point1Property: DependencyProperty;
        static Point2Property: DependencyProperty;
        public Point1: Point;
        public Point2: Point;
        private _Append(path);
    }
}
module Fayde.Media {
    interface IProjectionChangedListener {
        Callback: (source: Projection) => void;
        Detach();
    }
    class Projection extends DependencyObject {
        private _ProjectionMatrix;
        private _ObjectWidth;
        private _ObjectHeight;
        public SetObjectSize(size: ISize): void;
        public GetDistanceFromXYPlane(): number;
        public GetTransform(): number[];
        public CreateProjectionMatrix(): Matrix3D;
        private _Listeners;
        public Listen(func: (source: Transform) => void): IProjectionChangedListener;
        public _InvalidateProjection(): void;
    }
}
module Fayde.Media {
    class RectangleGeometry extends Geometry {
        static RectProperty: DependencyProperty;
        static RadiusXProperty: DependencyProperty;
        static RadiusYProperty: DependencyProperty;
        public Rect: rect;
        public RadiusX: number;
        public RadiusY: number;
        private _Build();
    }
}
module Fayde.Media {
    class TextOptions {
        static TextHintingModeProperty: DependencyProperty;
        static GetTextHintingMode(d: DependencyObject): TextHintingMode;
        static SetTextHintingMode(d: DependencyObject, value: TextHintingMode): void;
    }
}
module Fayde.Media {
    interface ITransformChangedListener {
        Callback: (source: Transform) => void;
        Detach();
    }
    class Transform extends GeneralTransform {
        private _Value;
        constructor();
        public Value : Matrix;
        public Inverse : Transform;
        public Transform(p: Point): Point;
        public TransformBounds(r: rect): rect;
        public TryTransform(inPoint: Point, outPoint: Point): bool;
        private _Listeners;
        public Listen(func: (source: Transform) => void): ITransformChangedListener;
        public _InvalidateValue(): void;
        public _BuildValue(): number[];
    }
    class MatrixTransform extends Transform {
        static MatrixProperty: DependencyProperty;
        public Matrix: Matrix;
        public _BuildValue(): number[];
        private _MatrixListener;
        public _MatrixChanged(args: IDependencyPropertyChangedEventArgs): void;
    }
}
module Fayde.Media {
    class RotateTransform extends Transform {
        static AngleProperty: DependencyProperty;
        static CenterXProperty: DependencyProperty;
        static CenterYProperty: DependencyProperty;
        public Angle: number;
        public CenterX: number;
        public CenterY: number;
        private _BuildValue();
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
        private _BuildValue();
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
        private _BuildValue();
    }
    class TranslateTransform extends Transform {
        static XProperty: DependencyProperty;
        static YProperty: DependencyProperty;
        public X: number;
        public Y: number;
        private _BuildValue();
    }
    interface ITransformChangedChildListener extends ITransformChangedListener {
        Child: Transform;
    }
    class TransformCollection extends XamlObjectCollection {
        private _Relayer;
        private _ChildTransformListeners;
        public AddingToCollection(value: Transform, error: BError): bool;
        public RemovedFromCollection(value: Transform, isValueSafe: bool): bool;
        public RelayChanges(func: () => void): void;
    }
    class TransformGroup extends Transform {
        public Children: TransformCollection;
        private _TransformListener;
        constructor();
        private _BuildValue();
    }
}
module Fayde.Media.Animation {
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
module Fayde.Media.Animation {
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
module Fayde.Media.Animation {
    interface IKeyFrameListener {
        KeyFrameChanged(source: KeyFrame);
    }
    interface IKeyFrame {
        _ResolvedKeyTime: TimeSpan;
        _Resolved: bool;
        Value: any;
        InterpolateValue(baseValue: any, keyFrameProgress: number): any;
    }
    class KeyFrame extends DependencyObject implements IKeyFrame {
        private _ResolvedKeyTime;
        private _Resolved;
        private _Listener;
        static KeyTimeProperty: DependencyProperty;
        public KeyTime: KeyTime;
        public Value: any;
        public CoerceKeyTime(dobj: DependencyObject, propd: DependencyProperty, value: any, coerced: IOutValue, error: BError): bool;
        public InterpolateValue(baseValue: any, keyFrameProgress: number): any;
        public CompareToTimeSpan(otherTs: TimeSpan): number;
        public Listen(listener: IKeyFrameListener): void;
        public Unlisten(listener: IKeyFrameListener): void;
        public InvalidateKeyFrame(): void;
        static Comparer(kf1: KeyFrame, kf2: KeyFrame): number;
        static ResolveKeyFrames(animation: AnimationBase, arr: KeyFrame[]): KeyFrame[];
    }
    class KeyFrameCollection extends XamlObjectCollection {
        private _Resolved;
        private _ht;
        private _SortedList;
        public GetKeyFrameForTime(t: TimeSpan, prevFrameRef: IOutValue): KeyFrame;
        public Clear(): bool;
        private AddingToCollection(value, error);
        private RemovedFromCollection(value, isValueSafe);
        private KeyFrameChanged(source);
        static ResolveKeyFrames(animation: AnimationBase, coll: KeyFrameCollection): KeyFrame[];
    }
}
module Fayde.Media.Animation {
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
module Fayde.Media.Animation {
    class ObjectKeyFrame extends KeyFrame {
        static ValueProperty: DependencyProperty;
        public Value: any;
        public ConvertedValue: any;
    }
    class DiscreteObjectKeyFrame extends ObjectKeyFrame {
        public InterpolateValue(baseValue: any, keyFrameProgress: number): any;
    }
}
module Fayde.Media.Animation {
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
module Fayde.Media.Animation {
    interface IClockData {
        CurrentTime: TimeSpan;
        Progress: number;
        Completed: bool;
    }
    class Timeline extends DependencyObject implements ITimeline {
        static DEFAULT_REPEAT_BEHAVIOR: RepeatBehavior;
        static AutoReverseProperty: DependencyProperty;
        static BeginTimeProperty: DependencyProperty;
        static DurationProperty: DependencyProperty;
        static RepeatBehaviorProperty: DependencyProperty;
        static SpeedRatioProperty: DependencyProperty;
        static FillBehaviorProperty: DependencyProperty;
        public AutoReverse: bool;
        public BeginTime: TimeSpan;
        public Duration: Duration;
        public RepeatBehavior: RepeatBehavior;
        public SpeedRatio: number;
        public FillBehavior: FillBehavior;
        public Completed: MulticastEvent;
        private _IsPaused;
        private _BeginPauseTime;
        private _TicksPaused;
        private _IsFirstUpdate;
        private _HasBegun;
        private _BeginTicks;
        private _InitialStep;
        private _ManualTarget;
        private _HasCompleted;
        public HasManualTarget : bool;
        public ManualTarget : DependencyObject;
        public Reset(): void;
        public Pause(): void;
        public Resume(): void;
        public Stop(): void;
        public OnCompleted(): void;
        public Update(nowTime: number): void;
        public UpdateInternal(clockData: IClockData): void;
        public Disable(): void;
        public CreateClockData(nowTime: number): IClockData;
        public IsAfterBeginTime(nowTime: number): bool;
        public GetNaturalDuration(): Duration;
        public GetNaturalDurationCore(): Duration;
    }
    class TimelineCollection extends XamlObjectCollection {
    }
}
module Fayde.Media.Effects {
    interface IEffectListener {
        EffectChanged(effect: Effect);
    }
    class Effect extends DependencyObject {
        private _Listener;
        static EffectMappingProperty: DependencyProperty;
        public EffectMapping: GeneralTransform;
        public Padding(): Thickness;
        public GetPadding(thickness: Thickness): bool;
        public PreRender(ctx: RenderContext): void;
        public Listen(listener: IEffectListener): void;
        public Unlisten(listener: IEffectListener): void;
        public _EffectChanged(args: IDependencyPropertyChangedEventArgs): void;
    }
}
module Fayde.Media.Imaging {
    class ImageSource extends DependencyObject {
        public PixelWidth: number;
        public PixelHeight: number;
        public Lock(): void;
        public Unlock(): void;
        public Image : HTMLImageElement;
    }
}
module Fayde.Media.VSM {
    class VisualState extends DependencyObject {
        static StoryboardProperty: DependencyProperty;
        public Storyboard: Animation.Storyboard;
        static Annotations: {
            ContentProperty: DependencyProperty;
        };
    }
    class VisualStateCollection extends XamlObjectCollection {
    }
}
module Fayde.Media.VSM {
    class VisualStateChangedEventArgs extends EventArgs {
        public OldState: VisualState;
        public NewState: VisualState;
        public Control: Controls.Control;
        constructor(oldState: VisualState, newState: VisualState, control: Controls.Control);
    }
    class VisualStateGroup extends DependencyObject {
        static Annotations: {
            ContentProperty: string;
        };
        private _CurrentStoryboards;
        private _Transitions;
        public Transitions: VisualTransition[];
        public States: VisualStateCollection;
        public CurrentStateChanging: MulticastEvent;
        public CurrentStateChanged: MulticastEvent;
        public CurrentState: VisualState;
        constructor();
        public GetState(stateName: string): VisualState;
        public StartNewThenStopOld(element: FrameworkElement, newStoryboards: Animation.Storyboard[]): void;
        public StopCurrentStoryboards(element: FrameworkElement): void;
        public RaiseCurrentStateChanging(element: FrameworkElement, oldState: VisualState, newState: VisualState, control: Controls.Control): void;
        public RaiseCurrentStateChanged(element: FrameworkElement, oldState: VisualState, newState: VisualState, control: Controls.Control): void;
    }
    class VisualStateGroupCollection extends XamlObjectCollection {
    }
}
module Fayde.Media.VSM {
    interface IStateData {
        state: VisualState;
        group: VisualStateGroup;
    }
    class VisualStateManager extends DependencyObject {
        static VisualStateGroupsProperty: DependencyProperty;
        static GetVisualStateGroups(d: DependencyObject): VisualStateGroupCollection;
        static SetVisualStateGroups(d: DependencyObject, value: VisualStateGroupCollection): void;
        static _GetVisualStateGroupsInternal(d);
        static CustomVisualStateManagerProperty: DependencyProperty;
        static GetCustomVisualStateManager(d: DependencyObject): VisualStateManager;
        static SetCustomVisualStateManager(d: DependencyObject, value: VisualStateManager): void;
        static GoToState(control: Controls.Control, stateName: string, useTransitions: bool): bool;
        public GoToStateCore(control: Controls.Control, element: FrameworkElement, stateName: string, group: VisualStateGroup, state: VisualState, useTransitions: bool): bool;
        static GoToStateInternal(control, element, group, state, useTransitions);
        static DestroyStoryboards(control, root);
        static _GetTemplateRoot(control);
        static _TryGetState(groups, stateName, data);
        static _GetTransition(element, group, from, to);
        static _GenerateDynamicTransitionAnimations(root, group, state, transition);
    }
}
module Fayde.Media.VSM {
    class VisualTransition {
        public From;
        public To;
        public Storyboard;
        public GeneratedDuration;
        public DynamicStoryboardCompleted;
        public ExplicitStoryboardCompleted;
        public GeneratedEasingFunction;
        public IsDefault: bool;
    }
}
module Fayde.Shapes {
    class DoubleCollection extends XamlObjectCollection {
    }
}
module Fayde.Shapes {
    class PointCollection implements IEnumerable {
        private _ht;
        public Owner: Shape;
        public Count : number;
        static FromData(data: string): PointCollection;
        static FromArray(data: Point[]): PointCollection;
        public GetValueAt(index: number): Point;
        public SetValueAt(index: number, value: Point): bool;
        public Add(value: Point): void;
        public AddRange(points: Point[]): void;
        public Insert(index: number, value: Point): void;
        public Remove(value: Point): void;
        public RemoveAt(index: number): void;
        public Clear(): void;
        public IndexOf(value: Point): number;
        public Contains(value: Point): bool;
        public GetEnumerator(reverse?: bool): IEnumerator;
    }
}
module Fayde.Controls {
    interface IColumnDefinitionListener {
        ColumnDefinitionChanged(colDefinition: ColumnDefinition);
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
        ColumnDefinitionsChanged(colDefinitions: ColumnDefinitionCollection);
    }
    class ColumnDefinitionCollection extends XamlObjectCollection implements IColumnDefinitionListener {
        private _Listener;
        public Listen(listener: IColumnDefinitionsListener): void;
        public Unlisten(listener: IColumnDefinitionsListener): void;
        public ColumnDefinitionChanged(colDefinition: ColumnDefinition): void;
        public AddingToCollection(value: ColumnDefinition, error: BError): bool;
        public RemovedFromCollection(value: ColumnDefinition, isValueSafe: bool): void;
    }
}
module Fayde.Controls {
    interface IItemCollection {
        ItemsChanged: MulticastEvent;
        ToArray(): any[];
        GetValueAt(index: number): any;
        GetRange(startIndex: number, endIndex: number): any[];
        SetValueAt(index: number, value: any);
        Contains(value: any): bool;
        IndexOf(value: any): number;
        Add(value: any);
        AddRange(values: any[]);
        Insert(index: number, value: any);
        Remove(value: any);
        RemoveAt(index: number);
        Clear();
    }
    interface IItemCollectionHidden extends IItemCollection {
        IsReadOnly: bool;
        SetValueAtImpl(index: number, value: any);
        AddImpl(value: any);
        AddRangeImpl(values: any[]);
        InsertImpl(index: number, value: any);
        RemoveImpl(value: any);
        RemoveAtImpl(index: number);
        ClearImpl();
    }
    class ItemCollection extends XamlObjectCollection implements IEnumerable, IItemCollection, IItemCollectionHidden {
        private _ht;
        public GetEnumerator(): IEnumerator;
        public ItemsChanged: MulticastEvent;
        public PropertyChanged: MulticastEvent;
        public ToArray(): any[];
        public Count : number;
        private IsReadOnly;
        public GetValueAt(index: number): XamlObject;
        public GetRange(startIndex: number, endIndex: number): XamlObject[];
        public SetValueAt(index: number, value: XamlObject): bool;
        private SetValueAtImpl(index, value);
        public Add(value: XamlObject): number;
        private AddImpl(value);
        public AddRange(values: any[]): void;
        private AddRangeImpl(values);
        public Insert(index: number, value: XamlObject): bool;
        private InsertImpl(index, value);
        public IndexOf(value: XamlObject): number;
        public Contains(value: XamlObject): bool;
        public Remove(value: XamlObject): bool;
        private RemoveImpl(value);
        public RemoveAt(index: number): bool;
        private RemoveAtImpl(index);
        public Clear(): bool;
        private ClearImpl();
        private _ValidateReadOnly();
    }
}
module Fayde.Controls {
    interface IRowDefinitionListener {
        RowDefinitionChanged(rowDefinition: RowDefinition);
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
        RowDefinitionsChanged(rowDefinitions: RowDefinitionCollection);
    }
    class RowDefinitionCollection extends XamlObjectCollection implements IRowDefinitionListener {
        private _Listener;
        public Listen(listener: IRowDefinitionsListener): void;
        public Unlisten(listener: IRowDefinitionsListener): void;
        public RowDefinitionChanged(rowDefinition: RowDefinition): void;
        public AddingToCollection(value: RowDefinition, error: BError): bool;
        public RemovedFromCollection(value: RowDefinition, isValueSafe: bool): void;
    }
}
module Fayde.Controls {
    class ToolTipService {
        static ToolTipProperty: DependencyProperty;
        static PlacementTargetProperty: DependencyProperty;
    }
}
module Fayde.Controls.Primitives {
    class DragCompletedEventArgs extends RoutedEventArgs {
        public HorizontalChange: number;
        public VerticalChange: number;
        public Canceled: bool;
        constructor(horizontal: number, vertical: number, canceled: bool);
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
module Fayde.Controls.Primitives {
    enum ScrollEventType {
        SmallDecrement,
        SmallIncrement,
        LargeDecrement,
        LargeIncrement,
        ThumbPosition,
        ThumbTrack,
        First,
        Last,
        EndScroll,
    }
    class ScrollEventArgs extends RoutedEventArgs {
        public ScrollEventType: ScrollEventType;
        public Value: number;
        constructor(scrollEventType: ScrollEventType, value: number);
    }
}
module Fayde {
    interface IResourcable {
        Resources: ResourceDictionary;
    }
    class ResourceDictionaryCollection extends XamlObjectCollection {
        public AddingToCollection(value: ResourceDictionary, error: BError): bool;
        private _AssertNoCycles(subtreeRoot, firstAncestorNode, error);
    }
    class ResourceDictionary extends XamlObjectCollection {
        private _ht;
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
    class SetterCollection extends XamlObjectCollection {
        private _IsSealed;
        public _Seal(targetType: Function): void;
        public AddingToCollection(value: XamlObject, error: BError): bool;
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
    }
}
module Fayde {
    class TriggerAction extends DependencyObject {
        public Fire(): void;
    }
    class TriggerActionCollection extends XamlObjectCollection {
    }
    class TriggerBase extends DependencyObject {
        public Attach(target: XamlObject): void;
        public Detach(target: XamlObject): void;
    }
    class EventTrigger extends TriggerBase {
        static ActionsProperty: DependencyProperty;
        static RoutedEventProperty: DependencyProperty;
        public Actions: TriggerActionCollection;
        public RoutedEvent: string;
        private _IsAttached;
        static Annotations: {
            ContentProperty: DependencyProperty;
        };
        public Attach(target: XamlObject): void;
        public Detach(target: XamlObject): void;
        private _FireActions(sender, e);
        private _ParseEventName(target);
    }
    class TriggerCollection extends XamlObjectCollection {
        private ParentXamlObject;
        public AddingToCollection(value: TriggerBase, error: BError): bool;
        public RemovedFromCollection(value: TriggerBase, isValueSafe: bool): void;
        public AttachTarget(target: XamlObject): void;
        public DetachTarget(target: XamlObject): void;
    }
}
module Fayde {
    class UINode extends DONode {
        public XObject: UIElement;
        public LayoutUpdater: LayoutUpdater;
        public IsTopLevel: bool;
        private _Surface;
        public IsMouseOver: bool;
        public SetSurfaceFromVisualParent(): UINode;
        public SetSurface(surface: Surface): void;
        constructor(xobj: UIElement);
        public VisualParentNode: UINode;
        public GetVisualRoot(): UINode;
        public GetInheritedEnumerator(): IEnumerator;
        public OnIsAttachedChanged(newIsAttached: bool): void;
        public IsLoaded: bool;
        public SetIsLoaded(value: bool): void;
        public OnVisualChildAttached(uie: UIElement): void;
        public OnVisualChildDetached(uie: UIElement): void;
        private SetVisualParentNode(visualParentNode);
        public Focus(recurse?: bool): bool;
        public _EmitFocusChange(type: string): void;
        private _EmitLostFocus();
        private _EmitGotFocus();
        public _EmitKeyDown(args: Input.KeyEventArgs): void;
        public _EmitKeyUp(args: Input.KeyEventArgs): void;
        public _EmitLostMouseCapture(pos: Point): void;
        public _EmitMouseEvent(type: InputType, isLeftButton: bool, isRightButton: bool, args: Input.MouseEventArgs): bool;
        public CanCaptureMouse(): bool;
        public CaptureMouse(): bool;
        public ReleaseMouseCapture(): void;
        public _ResortChildrenByZIndex(): void;
        public InvalidateParent(r: rect): void;
        public InvalidateClip(oldClip: Media.Geometry, newClip: Media.Geometry): void;
        public InvalidateEffect(oldEffect: Media.Effects.Effect, newEffect: Media.Effects.Effect): void;
        public InvalidateOpacity(): void;
        public InvalidateVisibility(newVisibility: Visibility): void;
        public IsAncestorOf(uin: UINode): bool;
        public TransformToVisual(uin: UINode): Media.GeneralTransform;
    }
    class UIElement extends DependencyObject implements Providers.IIsPropertyInheritable {
        public XamlNode: UINode;
        private _ClipListener;
        private _EffectListener;
        public CreateNode(): UINode;
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
        private IsInheritable(propd);
        public IsMouseOver : bool;
        public DesiredSize : size;
        public RenderSize : size;
        public Clip: Media.Geometry;
        public Effect: Media.Effects.Effect;
        public IsHitTestVisible: bool;
        public Cursor: string;
        public OpacityMask: Media.Brush;
        public Opacity: number;
        public Projection: Media.Projection;
        public RenderTransform: Media.Transform;
        public RenderTransformOrigin: Point;
        public Tag: any;
        public Triggers: TriggerCollection;
        public UseLayoutRounding: bool;
        public Visibility: Visibility;
        public Focus(): bool;
        public CaptureMouse(): bool;
        public ReleaseMouseCapture(): void;
        public IsAncestorOf(uie: UIElement): bool;
        public TransformToVisual(uie: UIElement): Media.GeneralTransform;
        public InvalidateMeasure(): void;
        public Measure(availableSize: size): void;
        public InvalidateArrange(): void;
        public Arrange(finalRect: rect): void;
        public LostFocus: RoutedEvent;
        public GotFocus: RoutedEvent;
        public LostMouseCapture: RoutedEvent;
        public KeyDown: MulticastEvent;
        public KeyUp: MulticastEvent;
        public MouseLeftButtonUp: RoutedEvent;
        public MouseRightButtonUp: RoutedEvent;
        public MouseLeftButtonDown: RoutedEvent;
        public MouseRightButtonDown: RoutedEvent;
        public MouseLeave: RoutedEvent;
        public MouseEnter: RoutedEvent;
        public MouseMove: RoutedEvent;
        public MouseWheel: RoutedEvent;
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
        private _ClipChanged(args);
        private _EffectChanged(args);
        private _UseLayoutRoundingChanged(args);
        private _IsHitTestVisibleChanged(args);
        private _TriggersChanged(args);
    }
}
module Fayde.Documents {
    interface IBlocksChangedListener {
        BlocksChanged(newBlock: Block, isAdd: bool);
    }
    class Block extends TextElement {
    }
    class BlockCollection extends XamlObjectCollection {
        private _Listener;
        public Listen(listener: IBlocksChangedListener): void;
        public Unlisten(listener: IBlocksChangedListener): void;
        public AddingToCollection(value: Block, error: BError): bool;
        public RemovedFromCollection(value: Block, isValueSafe: bool): void;
    }
}
module Fayde.Documents {
    interface IInlinesChangedListener {
        InlinesChanged(newInline: Inline, isAdd: bool);
    }
    class Inline extends TextElement {
        public Autogen: bool;
    }
    class InlineCollection extends XamlObjectCollection {
        private _Listener;
        public Listen(listener: IInlinesChangedListener): void;
        public Unlisten(listener: IInlinesChangedListener): void;
        public AddingToCollection(value: Inline, error: BError): bool;
        public RemovedFromCollection(value: Inline, isValueSafe: bool): void;
    }
}
module Fayde.Documents {
    class LineBreak extends Inline {
    }
}
module Fayde.Documents {
    class Paragraph extends Block {
        public CreateNode(): TextElementNode;
        static Annotations: {
            ContentProperty: string;
        };
        public Inlines: InlineCollection;
        constructor();
        private InlinesChanged(newInline, isAdd);
    }
}
module Fayde.Documents {
    class Run extends Inline implements Providers.IIsPropertyInheritable {
        static FlowDirectionProperty: DependencyProperty;
        static TextProperty: DependencyProperty;
        public FlowDirection: FlowDirection;
        public Text: string;
        private _SerializeText();
        private IsInheritable(propd);
    }
}
module Fayde.Documents {
    class Section extends TextElement implements IBlocksChangedListener {
        public CreateNode(): TextElementNode;
        static Annotations: {
            ContentProperty: string;
        };
        public Blocks: BlockCollection;
        constructor();
        private BlocksChanged(newBlock, isAdd);
    }
}
module Fayde.Documents {
    class Span extends Inline implements IInlinesChangedListener {
        public CreateNode(): TextElementNode;
        static Annotations: {
            ContentProperty: string;
        };
        public Inlines: InlineCollection;
        constructor();
        private InlinesChanged(newInline, isAdd);
        private _SerializeText();
    }
}
module Fayde.Documents {
    class Underline extends Span {
    }
}
module Fayde.Media {
    interface IBrushChangedListener {
        Callback: (newBrush: Brush) => void;
        Detach();
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
module Fayde.Media {
    class EllipseGeometry extends Geometry {
        static CenterProperty: DependencyProperty;
        static RadiusXProperty: DependencyProperty;
        static RadiusYProperty: DependencyProperty;
        public Center: Point;
        public RadiusX: number;
        public RadiusY: number;
        private _Build();
    }
}
module Fayde.Media {
    class GradientBrush extends Brush implements IGradientStopsListener {
        static MappingModeProperty: DependencyProperty;
        static SpreadMethodProperty: DependencyProperty;
        public GradientStops: GradientStopCollection;
        public MappingMode: BrushMappingMode;
        public SpreadMethod: GradientSpreadMethod;
        static Annotations: {
            ContentProperty: string;
        };
        constructor();
        private CreateBrush(ctx, bounds);
        public _CreatePad(ctx: CanvasRenderingContext2D, bounds: rect): void;
        public _CreateRepeat(ctx: CanvasRenderingContext2D, bounds: rect): void;
        public _CreateReflect(ctx: CanvasRenderingContext2D, bounds: rect): void;
        public _GetMappingModeTransform(bounds: rect): number[];
        private GradientStopsChanged(newGradientStops);
    }
}
module Fayde.Media {
    class LinearGradientBrush extends GradientBrush {
        static StartPointProperty: DependencyProperty;
        static EndPointProperty: DependencyProperty;
        public StartPoint: Point;
        public EndPoint: Point;
        private _CreatePad(ctx, bounds);
        private _CreateRepeat(ctx, bounds);
        private _CreateReflect(ctx, bounds);
        private _GetPointData(bounds);
        public toString(): string;
    }
}
module Fayde.Media {
    class Matrix3DProjection extends Projection {
        static ProjectionMatrixProperty: DependencyProperty;
        public ProjectionMatrix: Matrix3D;
        public CreateProjectionMatrix(): Matrix3D;
    }
}
module Fayde.Media {
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
        private _ObjectWidth;
        private _ObjectHeight;
        public GetDistanceFromXYPlane(): number;
        public CreateProjectionMatrix3D(): Matrix3D;
    }
}
module Fayde.Media {
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
module Fayde.Media {
    class SolidColorBrush extends Brush {
        static ColorProperty: DependencyProperty;
        public Color: Color;
        constructor();
        static FromColor(color: Color): SolidColorBrush;
        private CreateBrush(ctx, bounds);
    }
}
module Fayde.Media {
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
module Fayde.Media.Animation {
    class AnimationBase extends Timeline implements IAnimStorageHidden {
        private _Storage;
        public Resolve(target: DependencyObject, propd: DependencyProperty): bool;
        public Disable(): void;
        public Stop(): void;
        public UpdateInternal(clockData: IClockData): void;
        public GetNaturalDurationCore(): Duration;
        public GetCurrentValue(defaultOriginalValue: any, defaultDestinationValue: any, clockData: IClockData): any;
    }
}
module Fayde.Media.Animation {
    class AnimationUsingKeyFrames extends AnimationBase {
        public KeyFrames: KeyFrameCollection;
        constructor();
        public Resolve(target: DependencyObject, propd: DependencyProperty): bool;
        public GetCurrentValue(defaultOriginValue: any, defaultDestinationValue: any, clockData: IClockData): any;
        public GetNaturalDurationCore(): Duration;
        public AddKeyFrame(kf: KeyFrame): void;
        public RemoveKeyFrame(kf: KeyFrame): void;
    }
}
module Fayde.Media.Animation {
    class BeginStoryboard extends TriggerAction {
        static StoryboardProperty: DependencyProperty;
        public Storyboard: Storyboard;
        static Annotations: {
            ContentProperty: DependencyProperty;
        };
        public Fire(): void;
    }
}
module Fayde.Media.Animation {
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
        public GetCurrentValue(defaultOriginalValue: any, defaultDestinationValue: any, clockData: IClockData): Color;
        private _FromChanged(args);
        private _ToChanged(args);
        private _ByChanged(args);
        private _EasingChanged(args);
    }
}
module Fayde.Media.Animation {
    class ColorAnimationUsingKeyFrames extends AnimationUsingKeyFrames {
        static Annotations: {
            ContentProperty: string;
        };
    }
}
module Fayde.Media.Animation {
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
module Fayde.Media.Animation {
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
        public GetCurrentValue(defaultOriginalValue: any, defaultDestinationValue: any, clockData: IClockData): number;
        private _FromChanged(args);
        private _ToChanged(args);
        private _ByChanged(args);
        private _EasingChanged(args);
    }
}
module Fayde.Media.Animation {
    class DoubleAnimationUsingKeyFrames extends AnimationUsingKeyFrames {
        static Annotations: {
            ContentProperty: string;
        };
    }
}
module Fayde.Media.Animation {
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
module Fayde.Media.Animation {
    class ObjectAnimationUsingKeyFrames extends AnimationUsingKeyFrames {
        static Annotations: {
            ContentProperty: string;
        };
        public Resolve(target: DependencyObject, propd: DependencyProperty): bool;
    }
}
module Fayde.Media.Animation {
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
        public GetCurrentValue(defaultOriginalValue: any, defaultDestinationValue: any, clockData: IClockData): Point;
        private _FromChanged(args);
        private _ToChanged(args);
        private _ByChanged(args);
        private _EasingChanged(args);
    }
}
module Fayde.Media.Animation {
    class PointAnimationUsingKeyFrames extends AnimationUsingKeyFrames {
        static Annotations: {
            ContentProperty: string;
        };
    }
}
module Fayde.Media.Animation {
    class Storyboard extends Timeline {
        static TargetNameProperty: DependencyProperty;
        static GetTargetName(d: DependencyObject): string;
        static SetTargetName(d: DependencyObject, value: string): void;
        static TargetPropertyProperty: DependencyProperty;
        static GetTargetProperty(d: DependencyObject): Data.PropertyPath;
        static SetTargetProperty(d: DependencyObject, value: Data.PropertyPath): void;
        public TargetName: string;
        public TargetProperty: Data.PropertyPath;
        public Children: TimelineCollection;
        static Annotations: {
            ContentProperty: string;
        };
        constructor();
        public Begin(): void;
        public Pause(): void;
        public Resume(): void;
        public Stop(): void;
        private _HookupAnimations(promotedValues, error);
        private _HookupAnimation(animation, targetObject, targetPropertyPath, promotedValues, error);
        public UpdateInternal(clockData: IClockData): void;
        public GetNaturalDurationCore(): Duration;
    }
}
module Fayde.Media.Effects {
    class BlurEffect extends Effect {
        static RadiusProperty: DependencyProperty;
        public Radius: number;
    }
}
module Fayde.Media.Effects {
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
        public GetPadding(thickness: Thickness): bool;
        public PreRender(ctx: RenderContext): void;
    }
}
module Fayde.Media.Imaging {
    interface IImageChangedListener {
        OnImageErrored(source: BitmapSource, e: Event);
        OnImageLoaded(source: BitmapSource, e: Event);
        ImageChanged(source: BitmapSource);
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
module Fayde.Media.Imaging {
    class ImageBrush extends TileBrush implements IImageChangedListener {
        static _SourceCoercer(d, propd, value);
        static ImageSourceProperty: DependencyProperty;
        public ImageSource: ImageSource;
        public ImageFailed: MulticastEvent;
        public ImageOpened: MulticastEvent;
        public SetupBrush(ctx: CanvasRenderingContext2D, bounds: rect): void;
        private GetTileExtents();
        private DrawTile(canvasCtx, bounds);
        private _ImageSourceChanged(args);
        private OnImageErrored(source, e);
        private OnImageLoaded(source, e);
        private ImageChanged(source);
    }
}
module Fayde {
    class FENode extends UINode implements Providers.IStyleHolder, Providers.IImplicitStyleHolder {
        private _LocalStyle;
        private _ImplicitStyles;
        private _StyleMask;
        private _Surface;
        public XObject: FrameworkElement;
        constructor(xobj: FrameworkElement);
        public SubtreeNode: XamlNode;
        public SetSubtreeNode(subtreeNode: XamlNode, error: BError): bool;
        public SetIsLoaded(value: bool): void;
        public OnIsLoadedChanged(newIsLoaded: bool): void;
        public InvokeLoaded(): void;
        public AttachVisualChild(uie: UIElement, error: BError): bool;
        public DetachVisualChild(uie: UIElement, error: BError): bool;
        public ApplyTemplateWithError(error: BError): bool;
        public DoApplyTemplateWithError(error: BError): bool;
        public FinishApplyTemplateWithError(uie: UIElement, error: BError): bool;
        public _HasFocus(): bool;
        public GetFocusedElement(): UIElement;
        public UpdateLayout(): void;
        public GetVisualTreeEnumerator(direction?: VisualTreeDirection): IEnumerator;
        public _SizeChanged(args: IDependencyPropertyChangedEventArgs): void;
        public _FlowDirectionChanged(args: IDependencyPropertyChangedEventArgs): void;
    }
    class FrameworkElement extends UIElement implements IResourcable, IMeasurableHidden, IArrangeableHidden, Providers.IIsPropertyInheritable {
        public DefaultStyleKey: any;
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
        private IsInheritable(propd);
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
        public SizeChanged: RoutedEvent;
        public Loaded: RoutedEvent;
        public Unloaded: RoutedEvent;
        public LayoutUpdated: MulticastEvent;
        public OnApplyTemplate(): void;
        public FindName(name: string): XamlObject;
        public UpdateLayout(): void;
        private _MeasureOverride(availableSize, error);
        private _ArrangeOverride(finalSize, error);
        private _StyleChanged(args);
        private _AlignmentChanged(args);
        public _WidthChanged(args: IDependencyPropertyChangedEventArgs): void;
        public _HeightChanged(args: IDependencyPropertyChangedEventArgs): void;
    }
}
module Fayde {
    class TypeConverter {
        static _Converters;
        static Register(type: any, converter: (str: string) => any): void;
        static ConvertObject(propd: DependencyProperty, val: any, objectType: Function, doStringConversion: bool);
    }
}
module Fayde.Media.Imaging {
    class BitmapImage extends BitmapSource {
        static UriSourceProperty: DependencyProperty;
        public UriSource: Uri;
        public ImageFailed: MulticastEvent;
        public ImageOpened: MulticastEvent;
        constructor(uri?: Uri);
        private _UriSourceChanged(args);
        private _OnErrored(e);
        private _OnLoad(e);
    }
}
module Fayde.Shapes {
    class ShapeNode extends FENode implements IBoundsComputable, IPostInsideObject {
        public XObject: Shape;
        constructor(xobj: Shape);
        public PostInsideObject(ctx: RenderContext, lu: LayoutUpdater, x: number, y: number): bool;
        public ComputeBounds(baseComputer: () => void, lu: LayoutUpdater): void;
        private IntersectBaseBoundsWithClipPath(lu, dest, baseBounds, xform);
        public UpdateStretch(): void;
        public GetStretchExtents(shape: Shape, lu: LayoutUpdater): rect;
    }
    class Shape extends FrameworkElement implements IMeasurableHidden, IArrangeableHidden, IRenderable, IActualSizeComputable {
        public XamlNode: ShapeNode;
        public CreateNode(): ShapeNode;
        private _ShapeFlags;
        private _StretchXform;
        private _NaturalBounds;
        private _Path;
        private _Fill;
        private _Stroke;
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
        public _InsideShape(ctx: RenderContext, lu: LayoutUpdater, x: number, y: number): bool;
        private _MeasureOverride(availableSize, error);
        private _ArrangeOverride(finalSize, error);
        private Render(ctx, lu, region);
        public _GetFillRule(): FillRule;
        public _BuildPath(): RawPath;
        public _DrawPath(ctx: RenderContext): void;
        private ComputeActualSize(baseComputer, lu);
        public _ComputeStretchBounds(): rect;
        private _GetNaturalBounds();
        public _ComputeShapeBounds(logical: bool): rect;
        public _ComputeShapeBoundsImpl(logical: bool, matrix?): rect;
        private _InvalidateStretch();
        public _InvalidatePathCache(free?: bool): void;
        public _InvalidateNaturalBounds(): void;
        private _FillListener;
        private _FillChanged(args);
        private _StrokeListener;
        private _StrokeChanged(args);
        private _StretchChanged(args);
        private _WidthChanged(args);
        private _HeightChanged(args);
    }
}
module Fayde.Controls {
    class BorderNode extends FENode {
        public XObject: Border;
        constructor(xobj: Border);
    }
    class Border extends FrameworkElement {
        public XamlNode: BorderNode;
        public CreateNode(): BorderNode;
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
        static Annotations: {
            ContentProperty: DependencyProperty;
        };
        private _MeasureOverride(availableSize, error);
        private _ArrangeOverride(finalSize, error);
        private _ChildChanged(args);
        private _BackgroundChanged(args);
        private _BorderBrushChanged(args);
        private _BorderThicknessChanged(args);
        private _PaddingChanged(args);
        private Render(ctx, lu, region);
        private _RenderFillOnly(ctx, extents, backgroundBrush, thickness, cornerRadius);
        private _RenderBalanced(ctx, extents, backgroundBrush, borderBrush, thickness, cornerRadius);
        private _RenderUnbalanced(ctx, extents, backgroundBrush, borderBrush, thickness, cornerRadius);
    }
}
module Fayde.Controls {
    class ContentPresenterNode extends FENode {
        private _ContentRoot;
        public ContentRoot : UIElement;
        public XObject: ContentPresenter;
        constructor(xobj: ContentPresenter);
        public DoApplyTemplateWithError(error: BError): bool;
        public ClearRoot(): void;
        public FallbackTemplate : DataTemplate;
        public _ContentChanged(args: IDependencyPropertyChangedEventArgs): void;
        public _ContentTemplateChanged(): void;
    }
    class ContentPresenter extends FrameworkElement {
        public XamlNode: ContentPresenterNode;
        public CreateNode(): ContentPresenterNode;
        static ContentProperty: DependencyProperty;
        static ContentTemplateProperty: DependencyProperty;
        public Content: any;
        public ContentTemplate: DataTemplate;
        static Annotations: {
            ContentProperty: DependencyProperty;
        };
    }
}
module Fayde.Controls {
    interface IIsEnabledListener {
        Callback: (newIsEnabled: bool) => void;
        Detach();
    }
    class ControlNode extends FENode {
        private _Surface;
        public XObject: Control;
        public TemplateRoot: FrameworkElement;
        public IsFocused: bool;
        constructor(xobj: Control);
        public TabTo(): bool;
        public DoApplyTemplateWithError(error: BError): bool;
        public GetDefaultVisualTree(): UIElement;
        public OnIsAttachedChanged(newIsAttached: bool): void;
        public OnParentChanged(oldParentNode: XamlNode, newParentNode: XamlNode): void;
        public IsEnabled : bool;
        public OnIsEnabledChanged(oldValue: bool, newValue: bool): void;
        public Focus(recurse?: bool): bool;
        public CanCaptureMouse(): bool;
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
        static DefaultStyleKeyProperty: DependencyProperty;
        private IsInheritable(propd);
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
        public IsEnabled: bool;
        public IsTabStop: bool;
        public Padding: Thickness;
        public TabIndex: number;
        public TabNavigation: Input.KeyboardNavigationMode;
        public Template: ControlTemplate;
        public VerticalContentAlignment: VerticalAlignment;
        public DefaultStyleKey: Function;
        private _IsMouseOver;
        public IsFocused : bool;
        public GetTemplateChild(childName: string): DependencyObject;
        public ApplyTemplate(): bool;
        public GetDefaultStyle(): Style;
        public IsEnabledChanged: MulticastEvent;
        public _IsEnabledChanged(args: IDependencyPropertyChangedEventArgs): void;
        public OnIsEnabledChanged(e: IDependencyPropertyChangedEventArgs): void;
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
        public UpdateVisualState(useTransitions?: bool): void;
        public GetVisualStateNamesToActivate(): string[];
        public GetVisualStateCommon(): string;
        public GetVisualStateFocus(): string;
        private _TemplateChanged(args);
        private _PaddingChanged(args);
        private _BorderThicknessChanged(args);
        private _ContentAlignmentChanged(args);
    }
}
module Fayde.Controls {
    interface IImageRenderMetrics {
        Matrix: number[];
        Overlap: number;
    }
    class ImageNode extends FENode implements IPostInsideObject {
        public XObject: Image;
        constructor(xobj: Image);
        public PostInsideObject(ctx: RenderContext, lu: LayoutUpdater, x: number, y: number): bool;
    }
    class Image extends FrameworkElement implements IActualSizeComputable, IMeasurableHidden, IArrangeableHidden, IRenderable, Media.Imaging.IImageChangedListener {
        public XamlNode: ImageNode;
        public CreateNode(): ImageNode;
        static _SourceCoercer(d, propd, value);
        static SourceProperty: DependencyProperty;
        static StretchProperty: DependencyProperty;
        public Source: Media.Imaging.ImageSource;
        public Stretch: Media.Stretch;
        public ImageOpened: MulticastEvent;
        public ImageFailed: MulticastEvent;
        private _MeasureOverride(availableSize, error);
        private _ArrangeOverride(finalSize, error);
        private Render(ctx, lu, region);
        private ComputeActualSize(baseComputer, lu);
        private _SourceChanged(args);
        private OnImageErrored(source, e);
        private OnImageLoaded(source, e);
        private ImageChanged(source);
    }
}
module Fayde.Controls {
    class ItemsControlNode extends ControlNode {
        private _Presenter;
        static _DefaultPosition;
        public XObject: ItemsControl;
        constructor(xobj: ItemsControl);
        public GetDefaultVisualTree(): UIElement;
        public ItemsPresenter : ItemsPresenter;
        public _SetItemsPresenter(presenter: ItemsPresenter): void;
    }
    class ItemsControl extends Control {
        private _ItemsIsDataBound;
        private _Items;
        private _DisplayMemberTemplate;
        public XamlNode: ItemsControlNode;
        public CreateNode(): ItemsControlNode;
        static DisplayMemberPathProperty: DependencyProperty;
        static ItemsPanelProperty: DependencyProperty;
        static ItemsSourceProperty: DependencyProperty;
        static ItemTemplateProperty: DependencyProperty;
        public DisplayMemberPath: string;
        public ItemsPanel: ItemsPanelTemplate;
        public ItemTemplate: DataTemplate;
        public Items : ItemCollection;
        private $Items;
        public ItemsSource : IEnumerable;
        public $DisplayMemberTemplate : DataTemplate;
        static Annotations: {
            ContentProperty: string;
        };
        public ItemContainerGenerator: ItemContainerGenerator;
        constructor();
        public Panel : Panel;
        static GetItemsOwner(uie: UIElement): ItemsControl;
        static ItemsControlFromItemContainer(container: DependencyObject): ItemsControl;
        public OnItemsSourceChanged(e: IDependencyPropertyChangedEventArgs): void;
        private _CollectionChanged(sender, e);
        public OnDisplayMemberPathChanged(e: IDependencyPropertyChangedEventArgs): void;
        public PrepareContainerForItem(container: DependencyObject, item: any): void;
        public ClearContainerForItem(container: DependencyObject, item: any): void;
        public GetContainerForItem(): DependencyObject;
        public IsItemItsOwnContainer(item: any): bool;
        public OnItemsChanged(e: Collections.NotifyCollectionChangedEventArgs): void;
        public InvokeItemsChanged(sender, e: Collections.NotifyCollectionChangedEventArgs): void;
        public OnItemContainerGeneratorChanged(sender, e: Primitives.ItemsChangedEventArgs): void;
        public OnItemTemplateChanged(e: IDependencyPropertyChangedEventArgs): void;
        public AddItemsToPresenter(position: IGeneratorPosition, count: number): void;
        public RemoveItemsFromPresenter(position: IGeneratorPosition, count: number): void;
        public UpdateContentTemplateOnContainer(element: DependencyObject, item): void;
    }
}
module Fayde.Controls {
    class ItemsPresenterNode extends FENode {
        public XObject: ItemsPresenter;
        private _ElementRoot;
        private _SPFT;
        private _VSPFT;
        constructor(xobj: ItemsPresenter);
        public ElementRoot : Panel;
        public StackPanelFallbackTemplate : ItemsPanelTemplate;
        public VirtualizingStackPanelFallbackTemplate : ItemsPanelTemplate;
        public DoApplyTemplateWithError(error: BError): bool;
    }
    class ItemsPresenter extends FrameworkElement {
        public TemplateOwner: ItemsControl;
        public XamlNode: ItemsPresenterNode;
        public CreateNode(): ItemsPresenterNode;
        public ElementRoot : Panel;
    }
}
module Fayde.Controls {
    class MENode extends FENode implements IPostInsideObject {
        public XObject: MediaElement;
        constructor(xobj: MediaElement);
        public PostInsideObject(ctx: RenderContext, lu: LayoutUpdater, x: number, y: number): bool;
    }
    class MediaElement extends FrameworkElement implements IMeasurableHidden, IArrangeableHidden {
        public XamlNode: MENode;
        public CreateNode(): MENode;
        private _MeasureOverride(availableSize, error);
        private _ArrangeOverride(finalSize, error);
    }
}
module Fayde.Controls {
    class PanelNode extends FENode implements IBoundsComputable, IPostInsideObject {
        public XObject: Panel;
        constructor(xobj: Panel);
        public AttachVisualChild(uie: UIElement, error: BError): bool;
        public DetachVisualChild(uie: UIElement, error: BError): bool;
        public _InvalidateChildrenZIndices(): void;
        public _ResortChildrenByZIndex(): void;
        public OnIsAttachedChanged(newIsAttached: bool): void;
        public PostInsideObject(ctx: RenderContext, lu: LayoutUpdater, x: number, y: number): bool;
        public ComputeBounds(baseComputer: () => void, lu: LayoutUpdater): void;
        public GetVisualTreeEnumerator(direction?: VisualTreeDirection): IEnumerator;
    }
    class Panel extends FrameworkElement implements IMeasurableHidden {
        public XamlNode: PanelNode;
        public CreateNode(): PanelNode;
        static ZIndexProperty: DependencyProperty;
        static ZProperty: DependencyProperty;
        static BackgroundProperty: DependencyProperty;
        static IsItemsHostProperty: DependencyProperty;
        public Background: Media.Brush;
        public IsItemsHost: bool;
        public Children: XamlObjectCollection;
        private _BackgroundListener;
        static Annotations: {
            ContentProperty: string;
        };
        static GetZIndex(uie: UIElement): number;
        static SetZIndex(uie: UIElement, value: number): void;
        static GetZ(uie: UIElement): number;
        static SetZ(uie: UIElement, value: number): void;
        private _BackgroundChanged(args);
        private _MeasureOverride(availableSize, error);
        private Render(ctx, lu, region);
    }
}
module Fayde.Controls {
    class _RichTextBoxView {
    }
    class RichTextBox extends Control {
        public HorizontalScrollBarVisibility: ScrollBarVisibility;
        public TextWrapping: TextWrapping;
    }
}
module Fayde.Controls {
    class ScrollContentPresenter extends ContentPresenter implements Primitives.IScrollInfo, IMeasurableHidden, IArrangeableHidden {
        private _ScrollData;
        private _IsClipPropertySet;
        private _ClippingRectangle;
        public ScrollOwner : ScrollViewer;
        public CanHorizontallyScroll : bool;
        public CanVerticallyScroll : bool;
        public ExtentWidth : number;
        public ExtentHeight : number;
        public ViewportWidth : number;
        public ViewportHeight : number;
        public HorizontalOffset : number;
        public VerticalOffset : number;
        public LineUp(): void;
        public LineDown(): void;
        public LineLeft(): void;
        public LineRight(): void;
        public MouseWheelUp(): void;
        public MouseWheelDown(): void;
        public MouseWheelLeft(): void;
        public MouseWheelRight(): void;
        public PageUp(): void;
        public PageDown(): void;
        public PageLeft(): void;
        public PageRight(): void;
        public MakeVisible(uie: UIElement, rectangle: rect): rect;
        public SetHorizontalOffset(offset: number): void;
        public SetVerticalOffset(offset: number): void;
        public OnApplyTemplate(): void;
        private _MeasureOverride(availableSize, error);
        private _ArrangeOverride(finalSize, error);
        private _UpdateExtents(viewport, extentWidth, extentHeight);
        private _ClampOffsets();
        private _UpdateClip(arrangeSize);
        private _CalculateTextBoxClipRect(arrangeSize);
    }
}
module Fayde.Controls {
    class StackPanel extends Panel implements IMeasurableHidden, IArrangeableHidden {
        static OrientationProperty: DependencyProperty;
        public Orientation: Orientation;
        private _OrientationChanged(args);
        private _MeasureOverride(availableSize, error);
        private _ArrangeOverride(finalSize, error);
    }
}
module Fayde.Controls {
    class TextBlockNode extends FENode implements IBoundsComputable, Documents.IInlinesChangedListener {
        public XObject: TextBlock;
        private _ActualWidth;
        private _ActualHeight;
        public _Layout: Text.TextLayout;
        private _WasSet;
        private _Dirty;
        private _Font;
        private _SetsValue;
        constructor(xobj: TextBlock);
        public GetInheritedEnumerator(): IEnumerator;
        public ComputeBounds(baseComputer: () => void, lu: LayoutUpdater): void;
        public Measure(constraint: size): size;
        public Arrange(constraint: size, padding: Thickness): void;
        public Layout(constraint: size): void;
        public ComputeActualSize(lu: LayoutUpdater, padding: Thickness): size;
        public _FontChanged(args: IDependencyPropertyChangedEventArgs): void;
        public _TextChanged(args: IDependencyPropertyChangedEventArgs): void;
        public _LineStackingStrategyChanged(args: IDependencyPropertyChangedEventArgs): void;
        public _LineHeightChanged(args: IDependencyPropertyChangedEventArgs): void;
        public _TextAlignmentChanged(args: IDependencyPropertyChangedEventArgs): void;
        public _TextTrimmingChanged(args: IDependencyPropertyChangedEventArgs): void;
        public _TextWrappingChanged(args: IDependencyPropertyChangedEventArgs): void;
        public _InvalidateDirty(setDirty?: bool): void;
        private _UpdateFont(force?);
        private _UpdateFonts(force?);
        private _UpdateLayoutAttributes();
        private _UpdateLayoutAttributesForInline(item, length, runs);
        private _GetTextInternal(inlines);
        private _SetTextInternal(text);
        private InlinesChanged(newInline, isAdd);
    }
    class TextBlock extends FrameworkElement implements IMeasurableHidden, IArrangeableHidden, IRenderable, IActualSizeComputable, IFontChangeable {
        public XamlNode: TextBlockNode;
        public CreateNode(): TextBlockNode;
        static PaddingProperty: DependencyProperty;
        static FontFamilyProperty: DependencyProperty;
        static FontSizeProperty: DependencyProperty;
        static FontStretchProperty: DependencyProperty;
        static FontStyleProperty: DependencyProperty;
        static FontWeightProperty: DependencyProperty;
        static ForegroundProperty: DependencyProperty;
        static TextDecorationsProperty: DependencyProperty;
        static TextProperty: DependencyProperty;
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
        static Annotations: {
            ContentProperty: string;
        };
        constructor();
        private _MeasureOverride(availableSize, error);
        private _ArrangeOverride(finalSize, error);
        private Render(ctx, lu, region);
        private ComputeActualSize(baseComputer, lu);
        private _ForegroundListener;
        private FontChanged(args);
    }
}
module Fayde.Controls {
    enum TextBoxModelChangedType {
        Nothing,
        TextAlignment,
        TextWrapping,
        Selection,
        Brush,
        Font,
        Text,
    }
    enum TextBoxEmitChangedType {
        NOTHING,
        SELECTION,
        TEXT,
    }
    interface ITextModelArgs {
        Changed: TextBoxModelChangedType;
        NewValue: any;
    }
    interface ITextModelListener {
        OnTextModelChanged(args: ITextModelArgs);
    }
    class TextBoxBase extends Control implements Text.ITextAttributesSource, Text.IBufferOwner {
        private _Undo;
        private _Redo;
        private _Buffer;
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
        public $IsReadOnly: bool;
        public $IsFocused: bool;
        public $AcceptsReturn: bool;
        public $MaxLength: number;
        public $HasOffset: bool;
        constructor(eventsMask: TextBoxEmitChangedType, textPropd: DependencyProperty);
        public Cursor : string;
        public SelectionCursor : number;
        public HasSelectedText : bool;
        public CaretBrush : Media.Brush;
        public TextAlignment : TextAlignment;
        public TextWrapping : TextWrapping;
        public SelectionStart : number;
        public SelectionLength : number;
        public DisplayText : string;
        public SelectionBackground : Media.Brush;
        public Background : Media.Brush;
        public SelectionForeground : Media.Brush;
        public Foreground : Media.Brush;
        public Font : Font;
        public Direction : FlowDirection;
        public TextDecorations : TextDecorations;
        public OnApplyTemplate(): void;
        private _ModelListener;
        public Listen(listener: ITextModelListener): void;
        public Unlisten(listener: ITextModelListener): void;
        public _ModelChanged(type: TextBoxModelChangedType, newValue: any): void;
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
        public Select(start: number, length: number): bool;
        private _SyncSelectedText();
        private _EmitSelectionChanged();
        public _ResetIMContext(): void;
        public CanUndo(): bool;
        public Undo(): void;
        public CanRedo(): bool;
        public Redo(): void;
        public OnLostFocus(e: RoutedEventArgs): void;
        public OnGotFocus(e: RoutedEventArgs): void;
        public OnMouseLeftButtonDown(e: Input.MouseButtonEventArgs): void;
        public OnMouseLeftButtonUp(e: Input.MouseButtonEventArgs): void;
        public OnMouseMove(e: Input.MouseEventArgs): void;
        public CursorDown(cursor: number, isPage: bool): number;
        public CursorUp(cursor: number, isPage: bool): number;
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
module Fayde.Controls.Internal {
    class TextBoxViewNode extends FENode {
        public XObject: TextBoxView;
        constructor(xobj: TextBoxView);
    }
    class TextBoxView extends FrameworkElement implements IMeasurableHidden, IArrangeableHidden, IRenderable, IActualSizeComputable, ITextModelListener {
        public XamlNode: TextBoxViewNode;
        public CreateNode(): TextBoxViewNode;
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
        public SetEnableCursor(value: bool): void;
        public _Blink(): bool;
        public _ConnectBlinkTimeout(multiplier): void;
        public _DisconnectBlinkTimeout(): void;
        public _GetCursorBlinkTimeout(): number;
        public _ResetCursorBlink(delay: bool): void;
        private _DelayCursorBlink();
        private _BeginCursorBlink();
        private _EndCursorBlink();
        private _InvalidateCursor();
        private _ShowCursor();
        private _HideCursor();
        private _UpdateCursor(invalidate);
        private _UpdateText();
        public ComputeActualSize(baseComputer: () => size, lu: LayoutUpdater);
        private _MeasureOverride(availableSize, error);
        private _ArrangeOverride(finalSize, error);
        public Layout(constraint: size): void;
        public GetBaselineOffset(): number;
        public GetLineFromY(y: number): Text.TextLayoutLine;
        public GetLineFromIndex(index: number): Text.TextLayoutLine;
        public GetCursorFromXY(x: number, y: number): number;
        public Render(ctx: RenderContext, lu: LayoutUpdater, region: rect): void;
        private _RenderImpl(ctx, region);
        public OnLostFocus(e): void;
        public OnGotFocus(e): void;
        public OnMouseLeftButtonDown(e): void;
        public OnMouseLeftButtonUp(e): void;
        public OnTextModelChanged(args: ITextModelArgs): void;
    }
}
module Fayde.Controls {
    class UCNode extends ControlNode {
        public _IsParsing: bool;
        public XObject: UserControl;
        constructor(xobj: UserControl);
        public GetDefaultTemplate(): UIElement;
    }
    class UserControl extends Control implements IMeasurableHidden, IArrangeableHidden {
        public XamlNode: UCNode;
        static ContentProperty: DependencyProperty;
        public Content: any;
        static Annotations: {
            ContentProperty: DependencyProperty;
        };
        public CreateNode(): UCNode;
        public InitializeComponent(): void;
        private _InvalidateContent(args);
        private _MeasureOverride(availableSize, error);
        private _ArrangeOverride(finalSize, error);
    }
}
module Fayde.Controls {
    class VirtualizingPanel extends Panel {
        private _ICG;
        public ItemContainerGenerator : ItemContainerGenerator;
        public AddInternalChild(child): void;
        public InsertInternalChild(index: number, child): void;
        public RemoveInternalChildRange(index: number, range: number): void;
        public BringIndexIntoView(index): void;
        public OnClearChildren(): void;
        public OnItemContainerGeneratorChanged(sender, e: Primitives.ItemsChangedEventArgs): void;
    }
}
module Fayde.Controls {
    enum VirtualizationMode {
        Standard,
        Recycling,
    }
    interface ICancelable {
        Cancel: bool;
    }
    class CleanUpVirtualizedItemEventArgs extends RoutedEventArgs implements ICancelable {
        public Cancel: bool;
        public UIElement: UIElement;
        public Value: any;
        constructor(uiElement: UIElement, value: any);
    }
    class VirtualizingStackPanel extends VirtualizingPanel implements Primitives.IScrollInfo, IMeasurableHidden, IArrangeableHidden {
        private _CanHorizontallyScroll;
        private _CanVerticallyScroll;
        private _HorizontalOffset;
        private _VerticalOffset;
        private _ExtentWidth;
        private _ExtentHeight;
        private _ViewportWidth;
        private _ViewportHeight;
        public ScrollOwner: ScrollViewer;
        public CanHorizontallyScroll : bool;
        public CanVerticallyScroll : bool;
        public ExtentWidth : number;
        public ExtentHeight : number;
        public ViewportWidth : number;
        public ViewportHeight : number;
        public HorizontalOffset : number;
        public VerticalOffset : number;
        public LineUp(): void;
        public LineDown(): void;
        public LineLeft(): void;
        public LineRight(): void;
        public MouseWheelUp(): void;
        public MouseWheelDown(): void;
        public MouseWheelLeft(): void;
        public MouseWheelRight(): void;
        public PageUp(): void;
        public PageDown(): void;
        public PageLeft(): void;
        public PageRight(): void;
        public MakeVisible(uie: UIElement, rectangle: rect): rect;
        public SetHorizontalOffset(offset: number): void;
        public SetVerticalOffset(offset: number): void;
        public CleanUpVirtualizedItemEvent: RoutedEvent;
        static OrientationProperty: DependencyProperty;
        public Orientation: Orientation;
        static IsVirtualizingProperty: DependencyProperty;
        static GetIsVirtualizing(d: DependencyObject): bool;
        static SetIsVirtualizing(d: DependencyObject, value: bool): void;
        static VirtualizationModeProperty: DependencyProperty;
        static GetVirtualizationMode(d: DependencyObject): VirtualizationMode;
        static SetVirtualizationMode(d: DependencyObject, value: VirtualizationMode): void;
        private _MeasureOverride(availableSize, error);
        private _ArrangeOverride(finalSize, error);
        public RemoveUnusedContainers(first: number, count: number): void;
        public OnCleanUpVirtualizedItem(uie: UIElement, value): ICancelable;
        public OnClearChildren(): void;
        public OnItemContainerGeneratorChanged(sender, e: Primitives.ItemsChangedEventArgs): void;
    }
}
module Fayde.Controls.Primitives {
    class PopupNode extends FENode implements IBoundsComputable, IPostComputeTransformable {
        private _Surface;
        public XObject: Popup;
        public GetInheritedEnumerator(): IEnumerator;
        public ComputeBounds(baseComputer: () => void, lu: LayoutUpdater): void;
        public OnIsAttachedChanged(newIsAttached: bool): void;
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
        public PostCompute(lu: LayoutUpdater, hasLocalProjection: bool): void;
        public OnHorizontalOffsetChanged(args: IDependencyPropertyChangedEventArgs): void;
        public OnVerticalOffsetChanged(args: IDependencyPropertyChangedEventArgs): void;
        public _Hide(): void;
        public _Show(): void;
    }
    class Popup extends FrameworkElement {
        public XamlNode: PopupNode;
        public CreateNode(): PopupNode;
        static ChildProperty: DependencyProperty;
        static HorizontalOffsetProperty: DependencyProperty;
        static VerticalOffsetProperty: DependencyProperty;
        static IsOpenProperty: DependencyProperty;
        public Child: UIElement;
        public HorizontalOffset: number;
        public VerticalOffset: number;
        public IsOpen: bool;
        static Annotations: {
            ContentProperty: DependencyProperty;
        };
        public Opened: MulticastEvent;
        public Closed: MulticastEvent;
        public ClickedOutside: MulticastEvent;
        private _OnChildChanged(args);
        private _OnIsOpenChanged(args);
    }
}
module Fayde.Controls.Primitives {
    class RangeBase extends Control {
        private _LevelsFromRootCall;
        private _InitialMax;
        private _InitialVal;
        private _RequestedMax;
        private _RequestedVal;
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
        public ValueChanged: RoutedEvent;
        private _OnMinimumChanged(args);
        private _OnMaximumChanged(args);
        private _OnLargeChangeChanged(args);
        private _OnSmallChangeChanged(args);
        private _OnValueChanged(args);
        private _CoerceMaximum();
        private _CoerceValue();
        public OnMinimumChanged(oldMin: number, newMin: number): void;
        public OnMaximumChanged(oldMax: number, newMax: number): void;
        private RaiseValueChanged(oldVal, newVal);
        public OnValueChanged(oldVal: number, newVal: number): void;
    }
}
module Fayde.Controls.Primitives {
    class ScrollBar extends RangeBase {
        private _DragValue;
        public Scroll: RoutedEvent;
        static OrientationProperty: DependencyProperty;
        static ViewportSizeProperty: DependencyProperty;
        public Orientation: Orientation;
        public ViewportSize: number;
        public IsDragging : bool;
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
        private _GetChildOfType(name, type);
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
        private _UpdateTrackLayout(trackLength);
        private _UpdateThumbSize(trackLength);
        private _GetTrackLength();
        private _ConvertViewportSizeToDisplayUnits(trackLength);
        private _RaiseScroll(type);
    }
}
module Fayde.Controls.Primitives {
    class Selector extends ItemsControl {
        static IsSynchronizedWithCurrentItemProperty: DependencyProperty;
        static SelectedIndexProperty: DependencyProperty;
        static SelectedItemProperty: DependencyProperty;
        static SelectedValueProperty: DependencyProperty;
        static SelectedValuePathProperty: DependencyProperty;
        static IsSelectionActiveProperty: DependencyProperty;
        public IsSynchronizedWithCurrentItem: bool;
        public SelectedIndex: number;
        public SelectedItem: any;
        public SelectedValue: any;
        public SelectedValuePath: string;
        public IsSelectionActive: bool;
        public SelectionChanged: MulticastEvent;
        public _Selection: SelectorSelection;
        private _SelectedItems;
        private _Initializing;
        public _SelectedItemsIsInvalid: bool;
        public $TemplateScrollViewer: ScrollViewer;
        private _SelectedValueWalker;
        private SynchronizeWithCurrentItem;
        constructor();
        public SelectedItems : Collections.ObservableCollection;
        private _OnIsSynchronizedWithCurrentItemChanged(args);
        private _OnSelectedIndexChanged(args);
        private _OnSelectedItemChanged(args);
        private _OnSelectedValueChanged(args);
        private _OnSelectedValuePathChanged(args);
        public OnApplyTemplate(): void;
        public OnItemsChanged(e: Collections.NotifyCollectionChangedEventArgs): void;
        public OnItemsSourceChanged(args: IDependencyPropertyChangedEventArgs): void;
        public OnItemContainerStyleChanged(oldStyle, newStyle): void;
        public ClearContainerForItem(element: DependencyObject, item: any): void;
        public PrepareContainerForItem(element: DependencyObject, item: any): void;
        public _GetValueFromItem(item: any);
        private _SelectItemFromValue(selectedValue, ignoreSelectedValue?);
        private _OnCurrentItemChanged(sender, e);
        public _RaiseSelectionChanged(oldVals: any[], newVals: any[]): void;
        public OnSelectionChanged(args: SelectionChangedEventArgs): void;
        public NotifyListItemClicked(lbi: ListBoxItem): void;
        public NotifyListItemLoaded(lbi: ListBoxItem): void;
        public NotifyListItemGotFocus(lbi: ListBoxItem): void;
        public NotifyListItemLostFocus(lbi: ListBoxItem): void;
    }
}
module Fayde.Controls.Primitives {
    class Thumb extends Control {
        private _PreviousPosition;
        private _Origin;
        public DragCompleted: RoutedEvent;
        public DragDelta: RoutedEvent;
        public DragStarted: RoutedEvent;
        static IsDraggingProperty: DependencyProperty;
        static IsFocusedProperty: DependencyProperty;
        public IsDragging: bool;
        public IsFocused: bool;
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
        public GetVisualStateCommon(): string;
    }
}
module Fayde.Data {
    class PropertyPath implements ICloneable {
        private _Path;
        private _ExpandedPath;
        private _Propd;
        private _ObjRes;
        constructor(path?: string, expandedPath?: string);
        static CreateFromParameter(parameter): PropertyPath;
        public TryResolveDependencyProperty(refobj: IOutValue, promotedValues: any[]): DependencyProperty;
        public Path : string;
        public ExpandedPath : string;
        public ParsePath : string;
        public HasDependencyProperty : bool;
        public DependencyProperty : DependencyProperty;
        static ResolvePropertyPath(refobj: IOutValue, propertyPath: PropertyPath, promotedValues: any[]): DependencyProperty;
        public Clone(): PropertyPath;
    }
}
module Fayde.Shapes {
    class Ellipse extends Shape {
        private _Path;
        private _ShapeFlags;
        private _Stroke;
        constructor();
        private _BuildPath();
        private _ComputeStretchBounds();
        private _ComputeShapeBounds(logical);
        private _ComputeShapeBoundsImpl(logical, matrix);
    }
}
module Fayde.Shapes {
    class Line extends Shape {
        private _Path;
        private _ShapeFlags;
        static X1Property: DependencyProperty;
        static Y1Property: DependencyProperty;
        static X2Property: DependencyProperty;
        static Y2Property: DependencyProperty;
        public X1: number;
        public Y1: number;
        public X2: number;
        public Y2: number;
        private _BuildPath();
        private _ComputeShapeBounds(logical);
    }
}
module Fayde.Shapes {
    class Path extends Shape {
        private _ShapeFlags;
        private _Stroke;
        static _DataCoercer(d, propd, value);
        static DataProperty: DependencyProperty;
        public Data: Media.Geometry;
        private _GetFillRule();
        private _DrawPath(ctx);
        private _ComputeShapeBoundsImpl(logical, matrix);
    }
}
module Fayde.Shapes {
    class Polygon extends Shape {
        private _ShapeFlags;
        private _Stroke;
        static _PointsCoercer(d, propd, value);
        static FillRuleProperty: DependencyProperty;
        static PointsProperty: DependencyProperty;
        public FillRule: FillRule;
        public Points: PointCollection;
        private _PointsChanged(args);
        private _BuildPath();
        private _FillRuleChanged(args);
    }
}
module Fayde.Shapes {
    class Polyline extends Shape {
        private _Path;
        private _ShapeFlags;
        private _Stroke;
        static _PointsCoercer(d, propd, value);
        static FillRuleProperty: DependencyProperty;
        static PointsProperty: DependencyProperty;
        public FillRule: FillRule;
        public Points: PointCollection;
        private _PointsChanged(args);
        private _BuildPath();
        private _FillRuleChanged(args);
    }
}
module Fayde.Shapes {
    class Rectangle extends Shape {
        private _Path;
        private _ShapeFlags;
        private _Stroke;
        static RadiusXProperty: DependencyProperty;
        static RadiusYProperty: DependencyProperty;
        public RadiusX: number;
        public RadiusY: number;
        constructor();
        private _BuildPath();
        private _ComputeShapeBounds(logical);
        private _ComputeShapeBoundsImpl(logical, matrix?);
        private _ComputeStretchBounds();
        private _RadiusChanged(args);
    }
}
module Fayde.Controls {
    class CanvasNode extends PanelNode {
        private _Surface;
        public XObject: Canvas;
        constructor(xobj: Canvas);
        public AttachVisualChild(uie: UIElement, error: BError): bool;
        public DetachVisualChild(uie: UIElement, error: BError): bool;
        private _UpdateIsLayoutContainerOnAdd(uie);
        private _UpdateIsLayoutContainerOnRemove(uie);
        public ComputeBounds(baseComputer: () => void, lu: LayoutUpdater): void;
    }
    class Canvas extends Panel implements IMeasurableHidden, IArrangeableHidden {
        static TopProperty: DependencyProperty;
        static GetTop(d: DependencyObject): number;
        static SetTop(d: DependencyObject, value: number): void;
        static LeftProperty: DependencyProperty;
        static GetLeft(d: DependencyObject): number;
        static SetLeft(d: DependencyObject, value: number): void;
        private _MeasureOverride(availableSize, error);
        private _ArrangeOverride(finalSize, error);
    }
}
module Fayde.Controls {
    class ComboBox extends Primitives.Selector {
        public DropDownOpened: MulticastEvent;
        public DropDownClosed: MulticastEvent;
        static IsDropDownOpenProperty: DependencyProperty;
        static ItemContainerStyleProperty: DependencyProperty;
        static MaxDropDownHeightProperty: DependencyProperty;
        static IsSelectionActiveProperty: DependencyProperty;
        public IsDropDownOpen: bool;
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
        public IsItemItsOwnContainer(item: any): bool;
        public GetContainerForItem(): DependencyObject;
        public PrepareContainerForItem(container: DependencyObject, item: any): void;
        public GetVisualStateFocus(): string;
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
module Fayde.Controls {
    class ContentControlNode extends ControlNode {
        public XObject: ContentControl;
        constructor(xobj: ContentControl);
        public GetDefaultVisualTree(): UIElement;
    }
    class ContentControl extends Control {
        public XamlNode: ContentControlNode;
        public CreateNode(): ContentControlNode;
        public _ContentSetsParent: bool;
        static ContentProperty: DependencyProperty;
        static ContentTemplateProperty: DependencyProperty;
        public Content: any;
        public ContentTemplate: DataTemplate;
        static Annotations: {
            ContentProperty: DependencyProperty;
        };
        public OnContentChanged(oldContent: any, newContent: any): void;
        public OnContentTemplateChanged(oldContentTemplate: DataTemplate, newContentTemplate: DataTemplate): void;
    }
}
module Fayde.Controls {
    class Frame extends ContentControl {
        static IsDeepLinkedProperty: DependencyProperty;
        static CurrentSourceProperty: DependencyProperty;
        static SourceProperty: DependencyProperty;
        public IsDeepLinked: bool;
        public CurrentSource: Uri;
        public Source: Uri;
        private _Request;
        private _Resolver;
        private _NavService;
        constructor();
        public Navigate(uri: Uri): void;
        public GoForward(): void;
        public GoBackward(): void;
        public StopLoading(): void;
        private _FrameLoaded(sender, e);
        private _HandleDeepLink();
        private _LoadContent(href, hash);
        private _HandleSuccessfulResponse(ajaxJsonResult);
        private _HandleSuccessfulSubResponse(ajaxJsonResult);
        private _HandleErrorResponse(error);
        private SourcePropertyChanged(args);
    }
}
module Fayde.Controls {
    class GridNode extends PanelNode {
        public XObject: Grid;
        constructor(xobj: Grid);
        public ComputeBounds(baseComputer: () => void, lu: LayoutUpdater): void;
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
    class Grid extends Panel implements IMeasurableHidden, IArrangeableHidden, IRowDefinitionsListener, IColumnDefinitionsListener {
        public CreateNode(): GridNode;
        static _AttachedPropChanged(d, args);
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
        static ShowGridLinesProperty: DependencyProperty;
        public ShowGridLines: bool;
        public ColumnDefinitions: ColumnDefinitionCollection;
        public RowDefinitions: RowDefinitionCollection;
        constructor();
        private _MeasureOverride(availableSize, error);
        private _ArrangeOverride(finalSize, error);
        private Render(ctx, lu, region);
        private _ExpandStarRows(availableSize);
        private _ExpandStarCols(availableSize);
        private _AllocateDesiredSize(rowCount, colCount);
        private _AssignSize(matrix, start, end, size, unitType, desiredSize);
        private _RowMatrix;
        private _ColMatrix;
        private _CreateMatrices(rowCount, colCount);
        private _SaveMeasureResults();
        private _RestoreMeasureResults();
        private _ShowGridLinesChanged(args);
        private RowDefinitionsChanged(rowDefinitions);
        private ColumnDefinitionsChanged(colDefinitions);
    }
}
module Fayde.Controls {
    class ListBox extends Primitives.Selector {
        private _FocusedIndex;
        static ItemContainerStyleProperty: DependencyProperty;
        static SelectionModeProperty: DependencyProperty;
        static IsSelectionActiveProperty: DependencyProperty;
        public ItemContainerStyle: Style;
        public SelectAll(): void;
        public ScrollIntoView(item: any): void;
        private _NavigateByPage(forward);
        private _ScrollInDirection(key);
        private _IsOnCurrentPage(item, itemsHostRectOut?, listBoxItemsRectOut?);
        private _GetFirstItemOnCurrentPage(startingIndex, forward);
        public OnItemContainerStyleChanged(args: IDependencyPropertyChangedEventArgs): void;
        public OnKeyDown(args: Input.KeyEventArgs): void;
        private _GetIsVerticalOrientation();
        public IsItemItsOwnContainer(item: any): bool;
        public GetContainerForItem(): DependencyObject;
        public PrepareContainerForItem(element: DependencyObject, item: any): void;
        public OnGotFocus(e: RoutedEventArgs): void;
        public OnLostFocus(e: RoutedEventArgs): void;
        public NotifyListItemGotFocus(lbi: ListBoxItem): void;
        public NotifyListItemLostFocus(lbi: ListBoxItem): void;
    }
}
module Fayde.Controls {
    class ListBoxItem extends ContentControl {
        private _ParentSelector;
        public ParentSelector : Primitives.Selector;
        public ParentSelectorChanged: MulticastEvent;
        static IsSelectedProperty: DependencyProperty;
        public IsSelected: bool;
        constructor();
        public OnApplyTemplate(): void;
        public OnMouseLeftButtonDown(e: Input.MouseButtonEventArgs): void;
        public OnMouseEnter(e: Input.MouseEventArgs): void;
        public OnMouseLeave(e: Input.MouseEventArgs): void;
        public OnGotFocus(e: RoutedEventArgs): void;
        public OnLostFocus(e: RoutedEventArgs): void;
        public GetVisualStateNamesToActivate(): string[];
        public GetVisualStateCommon(): string;
        public GetVisualStateSelection(): string;
        private OnIsSelectedChanged(args);
    }
}
module Fayde.Controls {
    class Page extends UserControl {
        static TitleProperty: DependencyProperty;
        public Title: string;
    }
}
module Fayde.Controls {
    class PasswordBox extends TextBoxBase {
        static BaselineOffsetProperty: DependencyProperty;
        static CaretBrushProperty: DependencyProperty;
        static MaxLengthProperty: DependencyProperty;
        static PasswordCharProperty: DependencyProperty;
        static PasswordProperty: DependencyProperty;
        static SelectionForegroundProperty: DependencyProperty;
        static SelectionBackgroundProperty: DependencyProperty;
        public BaselineOffset: number;
        public CaretBrush: Media.Brush;
        public MaxLength;
        public number;
        public PasswordChar: string;
        public Password: string;
        public SelectionForeground: Media.Brush;
        public SelectionBackground: Media.Brush;
        static DEFAULT_SELECTION_FOREGROUND;
        public SelectionForeground : Media.Brush;
        static DEFAULT_SELECTION_BACKGROUND;
        public SelectionBackground : Media.Brush;
        public PasswordChangedEvent: RoutedEvent;
        private _Buffer;
        constructor();
        public DisplayText : string;
        private CursorDown(cursor, isPage);
        private CursorUp(cursor, isPage);
        private CursorNextWord(cursor);
        private CursorPrevWord(cursor);
        private CursorLineBegin(cursor);
        private CursorLineEnd(cursor);
        private _EmitTextChanged();
        private _SelectionBackgroundListener;
        private _SelectionBackgroundChanged(args);
        private _SelectionForegroundListener;
        private _SelectionForegroundChanged(args);
    }
}
module Fayde.Controls {
    class ProgressBar extends Primitives.RangeBase {
        private _Track;
        private _Indicator;
        static IsIndeterminateProperty: DependencyProperty;
        public IsIndeterminate: bool;
        constructor();
        public OnApplyTemplate(): void;
        public OnValueChanged(oldValue: number, newValue: number): void;
        private _OnTrackSizeChanged(sender, e);
        private _IsIndeterminateChanged(args);
        private _UpdateIndicator();
        public GetVisualStateNamesToActivate(): string[];
    }
}
module Fayde.Controls {
    class ScrollViewer extends ContentControl {
        static _ScrollBarVisibilityChanged(d, args);
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
        public $TemplatedParentHandlesScrolling: bool;
        public $ScrollContentPresenter: ScrollContentPresenter;
        private $HorizontalScrollBar;
        private $VerticalScrollBar;
        constructor();
        private _ScrollInfo;
        public ScrollInfo : Primitives.IScrollInfo;
        public InvalidateScrollInfo(): void;
        private _UpdateScrollBarVisibility();
        private _UpdateScrollBar(orientation, value);
        private _GetChildOfType(name, type);
        public OnApplyTemplate(): void;
        public OnMouseLeftButtonDown(e: Input.MouseButtonEventArgs): void;
        public OnMouseWheel(e: Input.MouseWheelEventArgs): void;
        public OnKeyDown(e: Input.KeyEventArgs): void;
        private _HandleKeyDown(e);
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
module Fayde.Controls {
    class Slider extends Primitives.RangeBase {
        private _DragValue;
        static IsDirectionReversedProperty: DependencyProperty;
        static IsFocusedProperty: DependencyProperty;
        static OrientationProperty: DependencyProperty;
        public IsDirectionReversed: bool;
        public IsFocused: bool;
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
        private _GetChildOfType(name, type);
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
module Fayde.Controls {
    class TextBox extends TextBoxBase {
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
        public AcceptsReturn: bool;
        public CaretBrush: Media.Brush;
        public MaxLength: number;
        public IsReadOnly: bool;
        public BaselineOffset: number;
        public SelectionLength: number;
        public SelectionStart: number;
        public Text: string;
        public TextAlignment: TextAlignment;
        public TextWrapping: TextWrapping;
        public HorizontalScrollBarVisibility: ScrollBarVisibility;
        public VerticalScrollBarVisibility: ScrollBarVisibility;
        public SelectionChanged: MulticastEvent;
        public TextChanged: MulticastEvent;
        static DEFAULT_SELECTION_FOREGROUND;
        public SelectionForeground : Media.Brush;
        static DEFAULT_SELECTION_BACKGROUND;
        public SelectionBackground : Media.Brush;
        private _Buffer;
        constructor();
        public OnApplyTemplate(): void;
        public DisplayText : string;
        private CursorDown(cursor, isPage);
        private CursorUp(cursor, isPage);
        private CursorNextWord(cursor);
        private CursorPrevWord(cursor);
        private CursorLineBegin(cursor);
        private CursorLineEnd(cursor);
        private _EmitTextChanged();
        private _EmitSelectionChanged();
        private _IsReadOnlyChanged(args);
        private _FontChanged(args);
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
        public GetVisualStateCommon(): string;
    }
}
module Fayde.Controls {
    class ToolTip extends ContentControl {
        static HorizontalOffsetProperty: DependencyProperty;
        static VerticalOffsetProperty: DependencyProperty;
        static IsOpenProperty: DependencyProperty;
        static PlacementProperty: DependencyProperty;
        static PlacementTargetProperty: DependencyProperty;
        public HorizontalOffset: Number;
        public VerticalOffset: Number;
        public IsOpen: bool;
        public Placement: PlacementMode;
        public PlacementTarget: UIElement;
    }
}
module Fayde.Controls.Primitives {
    class ButtonBase extends ContentControl {
        static ClickModeProperty: DependencyProperty;
        static IsPressedProperty: DependencyProperty;
        static IsFocusedProperty: DependencyProperty;
        static CommandProperty: DependencyProperty;
        static CommandParameterProperty: DependencyProperty;
        public ClickMode: ClickMode;
        public IsPressed: bool;
        public IsFocused: bool;
        public Command: Input.ICommand;
        public CommandParameter: any;
        public Click: RoutedEvent;
        private _IsMouseCaptured;
        private _IsMouseLeftButtonDown;
        private _IsSpaceKeyDown;
        private _MousePosition;
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
        public UpdateVisualState(useTransitions?: bool): void;
        public GetVisualStateCommon(): string;
        private _CaptureMouseInternal();
        private _ReleaseMouseCaptureInternal();
        private _IsValidMousePosition();
        private OnCommandChanged(args);
        private OnCommandCanExecuteChanged(sender, e);
        private OnCommandParameterChanged(args);
    }
}
module Fayde.Controls.Primitives {
    class RepeatButton extends ButtonBase {
        static DelayProperty: DependencyProperty;
        static IntervalProperty: DependencyProperty;
        public Delay: number;
        public Interval: number;
        private _KeyboardCausingRepeat;
        private _MouseCausingRepeat;
        private _MousePosition;
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
module Fayde.Controls.Primitives {
    class ToggleButton extends ButtonBase {
        public Checked: RoutedEvent;
        public Indeterminate: RoutedEvent;
        public Unchecked: RoutedEvent;
        static IsCheckedProperty: DependencyProperty;
        static IsThreeStateProperty: DependencyProperty;
        public IsChecked: bool;
        public IsThreeState: bool;
        constructor();
        public OnApplyTemplate(): void;
        public OnContentChanged(oldContent: any, newContent: any): void;
        public OnClick(): void;
        public UpdateVisualState(useTransitions?: bool): void;
        public OnIsCheckedChanged(args: IDependencyPropertyChangedEventArgs): void;
        public OnToggle(): void;
    }
}
module Fayde.Controls {
    class Button extends Primitives.ButtonBase {
        constructor();
        public OnApplyTemplate(): void;
        public OnIsEnabledChanged(e: IDependencyPropertyChangedEventArgs): void;
    }
}
module Fayde.Controls {
    class CheckBox extends Primitives.ToggleButton {
        constructor();
    }
}
module Fayde.Controls {
    class ComboBoxItem extends ListBoxItem {
        constructor();
        public OnMouseLeftButtonUp(e: Input.MouseButtonEventArgs): void;
    }
}
module Fayde.Controls {
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
module Fayde.Controls {
    class RadioButton extends Primitives.ToggleButton {
        static GroupNameProperty: DependencyProperty;
        public GroupName: string;
        constructor();
        static _GroupNameToElements;
        static Register(groupName: string, radioButton: RadioButton): void;
        static Unregister(groupName: string, radioButton: RadioButton): void;
        public OnGroupNameChanged(e: IDependencyPropertyChangedEventArgs): void;
        public OnIsCheckedChanged(e: IDependencyPropertyChangedEventArgs): void;
        public OnToggle(): void;
        public UpdateRadioButtonGroup(): void;
    }
}
