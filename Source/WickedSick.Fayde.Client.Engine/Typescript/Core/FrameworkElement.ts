/// <reference path="UIElement.ts" />
/// CODE
/// <reference path="../Runtime/Enumerable.ts" />
/// <reference path="../Primitives/size.ts" />
/// <reference path="ResourceDictionary.ts" />
/// <reference path="Providers/FrameworkProviderStore.ts" />
/// <reference path="Providers/FrameworkElementDynamicProvider.ts" />
/// <reference path="Providers/InheritedDataContextProvider.ts" />
/// <reference path="Providers/LocalStyleProvider.ts" />
/// <reference path="Providers/ImplicitStyleProvider.ts" />

module Fayde {
    export class FENode extends UINode {
        private _Surface: Surface;
        XObject: FrameworkElement;
        constructor(xobj: FrameworkElement) {
            super(xobj);
        }
        SubtreeNode: XamlNode;
        SetSubtreeNode(subtreeNode: XamlNode, error: BError): bool {
            var error = new BError();
            if (subtreeNode && !subtreeNode.AttachTo(this, error))
                return false;
            this.SubtreeNode = subtreeNode;
            return true;
        }

        SetIsLoaded(value: bool) {
            if (this.IsLoaded === value)
                return;
            this.IsLoaded = value;
            this.OnIsLoadedChanged(value);
        }
        OnIsLoadedChanged(newIsLoaded: bool) {
            var xobj = this.XObject;
            var res = xobj.Resources;
            var store = xobj._Store;
            if (!newIsLoaded) {
                store.ClearImplicitStyles(Providers._StyleMask.VisualTree);
                xobj.Unloaded.Raise(xobj, EventArgs.Empty);
                //TODO: Should we set is loaded on resources that are FrameworkElements?
            } else {
                store.SetImplicitStyles(Providers._StyleMask.All);
            }
            var enumerator = this.GetVisualTreeEnumerator();
            while (enumerator.MoveNext()) {
                (<UINode>enumerator.Current).SetIsLoaded(newIsLoaded);
            }
            if (newIsLoaded) {
                //TODO: Should we set is loaded on resources that are FrameworkElements?
                xobj.Loaded.Raise(xobj, EventArgs.Empty);
                this.InvokeLoaded();
                store.EmitDataContextChanged();
            }
        }
        InvokeLoaded() { }

        AttachVisualChild(uie: UIElement, error: BError): bool {
            this.OnVisualChildAttached(uie);
            if (!this.SetSubtreeNode(uie.XamlNode, error))
                return false;
            uie.XamlNode.SetIsLoaded(this.IsLoaded);
            return true;
        }
        DetachVisualChild(uie: UIElement, error: BError) {
            if (!this.SetSubtreeNode(null, error))
                return false;
            this.OnVisualChildDetached(uie);
            uie.XamlNode.SetIsLoaded(false);
        }

        ApplyTemplateWithError(error: BError): bool {
            if (this.SubtreeNode)
                return false;
            var result = this.DoApplyTemplateWithError(error);
            if (result)
                this.XObject.OnApplyTemplate();
            return result;
        }
        DoApplyTemplateWithError(error: BError): bool { return false; }
        FinishApplyTemplateWithError(uie: UIElement, error: BError): bool {
            if (!uie || error.Message)
                return false;
            this.AttachVisualChild(uie, error);
            return error.Message == null;
        }
        
        _FindElementsInHostCoordinates(ctx: RenderContext, p: Point, uinlist: UINode[]) {
            var lu = this.LayoutUpdater;
            if (!lu.TotalIsRenderVisible)
                return;
            if (!lu.TotalIsHitTestVisible)
                return;
            if (lu.SurfaceBoundsWithChildren.Height <= 0)
                return;
            if (!this._InsideClip(ctx, lu, p.X, p.Y))
                return;
                
            ctx.Save();
            uinlist.unshift(this);
            var enumerator = this.GetVisualTreeEnumerator(VisualTreeDirection.ZFoward);
            while (enumerator.MoveNext()) {
                (<UINode>enumerator.Current)._FindElementsInHostCoordinates(ctx, p, uinlist);
            }

            if (this === uinlist[0]) {
                if (!this._CanFindElement() || !this._InsideObject(ctx, lu, p.X, p.Y))
                    uinlist.shift();
            }
            ctx.Restore();
        }
        _HitTestPoint(ctx: RenderContext, p: Point, uinlist: UINode[]) {
            var lu = this.LayoutUpdater;
            if (!lu.TotalIsRenderVisible)
                return;
            if (!lu.TotalIsHitTestVisible)
                return;
            if (!this._InsideClip(ctx, lu, p.X, p.Y))
                return;

            uinlist.unshift(this);
            var hit = false;
            var enumerator = this.GetVisualTreeEnumerator(VisualTreeDirection.ZReverse);
            while (enumerator.MoveNext()) {
                var childNode = (<FENode>enumerator.Current);
                childNode._HitTestPoint(ctx, p, uinlist);
                if (this !== uinlist[0]) {
                    hit = true;
                    break;
                }
            }

            if (!hit && !(this._CanFindElement() && this._InsideObject(ctx, lu, p.X, p.Y))) {
                //We're really trying to remove "this", is there a chance "this" is not at the head?
                if (uinlist.shift() !== this) {
                    throw new Exception("Look at my code! -> FENode._HitTestPoint");
                }
            }
        }
        _CanFindElement(): bool { return false; }
        _InsideObject(ctx: RenderContext, lu: LayoutUpdater, x: number, y: number): bool {
            var np = new Point(x, y);
            lu.TransformPoint(np);
            var fe = this.XObject;
            if (np.X < 0 || np.Y < 0 || np.X > fe.ActualWidth || np.Y > fe.ActualHeight)
                return false;

            if (!this._InsideLayoutClip(lu, x, y))
                return false;
                
            return this._InsideClip(ctx, lu, x, y);
        }
        _InsideLayoutClip(lu: LayoutUpdater, x: number, y: number): bool {
            //TODO: Implement
            /*
            Geometry * composite_clip = LayoutInformation:: GetCompositeClip(this);
            bool inside = true;

            if (!composite_clip)
                return inside;

            var np = new Point();
            lu.TransformPoint(np);

            inside = composite_clip - > GetBounds().PointInside(x, y);
            composite_clip - > unref();

            return inside;
            */
            return true;
        }

        _HasFocus(): bool {
            var curNode = this._Surface.FocusedNode
            while (curNode) {
                if (curNode === this)
                    return true;
                curNode = curNode.VisualParentNode;
            }
            return false;
        }
        GetFocusedElement(): UIElement {
            var node = this._Surface.FocusedNode;
            if (node)
                return node.XObject;
        }

        UpdateLayout() {
            var lu = this.LayoutUpdater;
            var error = new BError();
            if (this.IsAttached) {
                this._Surface._UpdateLayout(error);
            } else {
                var pass = {
                    MeasureList: [],
                    ArrangeList: [],
                    SizeList: [],
                    Count: 0,
                    Updated: true
                };
                lu.UpdateLayer(pass, error);
                if (pass.Updated)
                    this.XObject.LayoutUpdated.Raise(this, EventArgs.Empty);
            }
            if (error.Message)
                error.ThrowException();
        }

        GetVisualTreeEnumerator(direction?: VisualTreeDirection): IEnumerator {
            if (this.SubtreeNode)
                return ArrayEx.GetEnumerator([this.SubtreeNode]);
            return ArrayEx.EmptyEnumerator;
        }
    }
    Nullstone.RegisterType(FENode, "FENode");

    export class FrameworkElement extends UIElement implements IMeasurableHidden, IArrangeableHidden {
        DefaultStyleKey: any;
        XamlNode: FENode;
        Resources: ResourceDictionary;
        constructor() {
            super();
            Object.defineProperty(this, "Resources", {
                value: new ResourceDictionary(),
                writable: false
            });
        }
        _Store: Providers.FrameworkProviderStore;
        CreateStore(): Providers.FrameworkProviderStore {
            var s = new Providers.FrameworkProviderStore(this);
            s.SetProviders([null,
                new Providers.LocalValueProvider(),
                new Providers.FrameworkElementDynamicProvider(),
                new Providers.LocalStyleProvider(s),
                new Providers.ImplicitStyleProvider(s),
                new Providers.InheritedProvider(),
                new Providers.InheritedDataContextProvider(s),
                new Providers.DefaultValueProvider(),
                new Providers.AutoCreateProvider()]
            );
            return s;
        }
        CreateNode(): FENode { return new FENode(this); }
        
        static ActualHeightProperty: DependencyProperty = DependencyProperty.RegisterReadOnlyCore("ActualHeight", () => Number, FrameworkElement);
        static ActualWidthProperty: DependencyProperty = DependencyProperty.RegisterReadOnlyCore("ActualWidth", () => Number, FrameworkElement);
        static CursorProperty: DependencyProperty = DependencyProperty.RegisterFull("Cursor", () => new Enum(CursorType), FrameworkElement, CursorType.Default);
        static FlowDirectionProperty: DependencyProperty = DependencyProperty.RegisterInheritable("FlowDirection", () => new Enum(FlowDirection), FrameworkElement, FlowDirection.LeftToRight, (d, args) => (<FrameworkElement>d)._SizeChanged(args), undefined, Providers._Inheritable.FlowDirection);
        static HeightProperty: DependencyProperty = DependencyProperty.Register("Height", () => Number, FrameworkElement, NaN, (d, args) => (<FrameworkElement>d)._HeightChanged(args));
        static HorizontalAlignmentProperty: DependencyProperty = DependencyProperty.Register("HorizontalAlignment", () => new Enum(HorizontalAlignment), FrameworkElement, HorizontalAlignment.Stretch, (d, args) => (<FrameworkElement>d)._AlignmentChanged(args));
        //static LanguageProperty: DependencyProperty;
        static MarginProperty: DependencyProperty = DependencyProperty.RegisterCore("Margin", () => Thickness, FrameworkElement, undefined, (d, args) => (<FrameworkElement>d)._SizeChanged(args));
        static MaxHeightProperty: DependencyProperty = DependencyProperty.Register("MaxHeight", () => Number, FrameworkElement, Number.POSITIVE_INFINITY, (d, args) => (<FrameworkElement>d)._SizeChanged(args));
        static MaxWidthProperty: DependencyProperty = DependencyProperty.Register("MaxWidth", () => Number, FrameworkElement, Number.POSITIVE_INFINITY, (d, args) => (<FrameworkElement>d)._SizeChanged(args));
        static MinHeightProperty: DependencyProperty = DependencyProperty.Register("MinHeight", () => Number, FrameworkElement, 0.0, (d, args) => (<FrameworkElement>d)._SizeChanged(args));
        static MinWidthProperty: DependencyProperty = DependencyProperty.Register("MinWidth", () => Number, FrameworkElement, 0.0, (d, args) => (<FrameworkElement>d)._SizeChanged(args));
        static StyleProperty: DependencyProperty = DependencyProperty.Register("Style", () => Style, FrameworkElement, undefined, (d, args) => (<FrameworkElement>d)._StyleChanged(args));
        static VerticalAlignmentProperty: DependencyProperty = DependencyProperty.Register("VerticalAlignment", () => new Enum(VerticalAlignment), FrameworkElement, VerticalAlignment.Stretch, (d, args) => (<FrameworkElement>d)._AlignmentChanged(args));
        static WidthProperty: DependencyProperty = DependencyProperty.Register("Width", () => Number, FrameworkElement, NaN, (d, args) => (<FrameworkElement>d)._WidthChanged(args));
                
        ActualHeight: number;
        ActualWidth: number;
        FlowDirection: FlowDirection;
        Height: number;
        HorizontalAlignment: HorizontalAlignment;
        //Language;
        Margin: Thickness;
        MaxWidth: number;
        MaxHeight: number;
        MinWidth: number;
        MinHeight: number;
        Style: Style;
        VerticalAlignment: VerticalAlignment;
        Width: number;

        SizeChanged: RoutedEvent = new RoutedEvent();
        Loaded: RoutedEvent = new RoutedEvent();
        Unloaded: RoutedEvent = new RoutedEvent();
        LayoutUpdated: MulticastEvent = new MulticastEvent();

        OnApplyTemplate() { }
        FindName(name: string): XamlObject {
            var n = this.XamlNode.FindName(name);
            if (n)
                return n.XObject;
        }

        UpdateLayout() { this.XamlNode.UpdateLayout(); }

        private _MeasureOverride(availableSize: size, error: BError): size {
            var desired = new size();

            availableSize = size.clone(availableSize);
            size.max(availableSize, desired);

            var enumerator = this.XamlNode.GetVisualTreeEnumerator();
            while (enumerator.MoveNext()) {
                var childNode = <FENode>enumerator.Current;
                var childLu = childNode.LayoutUpdater;
                childLu._Measure(availableSize, error);
                desired = size.clone(childLu.DesiredSize);
            }

            size.min(desired, availableSize);
            return desired;
        }
        private _ArrangeOverride(finalSize: size, error: BError): size {
            var arranged = size.clone(finalSize);

            var enumerator = this.XamlNode.GetVisualTreeEnumerator();
            while (enumerator.MoveNext()) {
                var childNode = <FENode>enumerator.Current;
                var childRect = rect.fromSize(finalSize);
                childNode.LayoutUpdater._Arrange(childRect, error);
                size.max(arranged, finalSize);
            }

            return arranged;
        }
        
        private _StyleChanged(args: IDependencyPropertyChangedEventArgs) {
            var error = new BError();
            this._Store.SetLocalStyle(args.NewValue, error);
            if (error.Message)
                error.ThrowException();
        }
        private _SizeChanged(args: IDependencyPropertyChangedEventArgs) {
            var node = this.XamlNode;
            var lu = node.LayoutUpdater;
            //LOOKS USELESS: this._PurgeSizeCache();

            //TODO: var p = this._GetRenderTransformOrigin();
            //this._FullInvalidate(p.X != 0.0 || p.Y != 0.0);
            lu.FullInvalidate(false);

            var vpNode = node.VisualParentNode;
            if (vpNode)
                vpNode.LayoutUpdater.InvalidateMeasure();

            lu.InvalidateMeasure();
            lu.InvalidateArrange();
            lu.UpdateBounds();
        }
        private _AlignmentChanged(args: IDependencyPropertyChangedEventArgs) {
            var lu = this.XamlNode.LayoutUpdater;
            lu.InvalidateArrange();
            lu.FullInvalidate(true);
        }
        _WidthChanged(args: IDependencyPropertyChangedEventArgs) {
            this._SizeChanged(args);
        }
        _HeightChanged(args: IDependencyPropertyChangedEventArgs) {
            this._SizeChanged(args);
        }
    }
    Nullstone.RegisterType(FrameworkElement, "FrameworkElement");
}