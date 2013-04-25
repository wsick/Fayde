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
        XObject: FrameworkElement;
        constructor(xobj: FrameworkElement) {
            super(xobj);
        }
        SubtreeNode: XamlNode;
        SetSubtreeNode(subtreeNode: XamlNode) {
            var error = new BError();
            if (subtreeNode && !subtreeNode.AttachTo(this, error))
                error.ThrowException();
            this.SubtreeNode = subtreeNode;
        }

        OnParentChanged(oldParentNode: XamlNode, newParentNode: XamlNode) {
            var store = this.XObject._Store;
            var visualParentNode: FENode;
            if (newParentNode && newParentNode instanceof FENode)
                store.SetDataContextSource(<FrameworkElement>newParentNode.XObject);
            else if ((visualParentNode = <FENode>this.VisualParentNode) && visualParentNode instanceof FENode)
                store.SetDataContextSource(visualParentNode.XObject);
            else
                store.SetDataContextSource(null);

            if (this.IsLoaded)
                store.EmitDataContextChanged();
        }
        OnIsAttachedChanged(newIsAttached: bool) {
            if (this.SubtreeNode)
                this.SubtreeNode.SetIsAttached(newIsAttached);
            super.OnIsAttachedChanged(newIsAttached);
        }
        OnIsLoadedChanged(newIsLoaded: bool) {
            var res = this.XObject.Resources;
            var store = this.XObject._Store;
            if (!newIsLoaded) {
                store.ClearImplicitStyles(Providers._StyleMask.VisualTree);
                //Raise unloaded event
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
                //Raise loaded event
                this.XObject.InvokeLoaded();
                store.EmitDataContextChanged();
            }
        }

        AttachVisualChild(uie: UIElement) {
            super.AttachVisualChild(uie);
            this.SetSubtreeNode(uie.XamlNode);
        }
        DetachVisualChild(uie: UIElement) {
            this.SetSubtreeNode(null);
            super.DetachVisualChild(uie);
        }

        _ApplyTemplateWithError(error: BError): bool {
            if (this.SubtreeNode)
                return false;
            var result = this._DoApplyTemplateWithError(error);
            if (result)
                this.XObject.OnApplyTemplate();
            return result;
        }
        _DoApplyTemplateWithError(error: BError): bool {
            var uie = <UIElement>this._GetDefaultTemplate();
            if (uie) {
                if (error.Message)
                    return false;
                this.AttachVisualChild(uie);
            }
            return uie != null;
        }
        _GetDefaultTemplate(): UIElement { return undefined; }

        _HitTestPoint(ctx: RenderContext, p: Point, uielist: UINode[]) {
            var lu = this.LayoutUpdater;
            if (!lu.TotalIsRenderVisible)
                return;
            if (!lu.TotalIsHitTestVisible)
                return;
            if (!this._InsideClip(ctx, lu, p.X, p.Y))
                return;

            uielist.unshift(this);
            var hit = false;
            var enumerator = this.GetVisualTreeEnumerator(VisualTreeDirection.ZReverse);
            while (enumerator.MoveNext()) {
                var childNode = (<FENode>enumerator.Current);
                childNode._HitTestPoint(ctx, p, uielist);
                if (this !== uielist[0]) {
                    hit = true;
                    break;
                }
            }

            if (!hit && !(this._CanFindElement() && this._InsideObject(ctx, lu, p.X, p.Y))) {
                //We're really trying to remove "this", is there a chance "this" is not at the head?
                if (uielist.shift() !== this) {
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

        GetVisualTreeEnumerator(direction?: VisualTreeDirection): IEnumerator {
            if (this.SubtreeNode) {
                if (this.SubtreeNode instanceof XamlObjectCollection)
                    return this.SubtreeNode.GetVisualTreeEnumerator();
                return ArrayEx.GetEnumerator([this.SubtreeNode]);
            }
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

        static ActualWidthProperty: DependencyProperty = DependencyProperty.RegisterReadOnlyCore("ActualWidth", () => Number, FrameworkElement);
        static ActualHeightProperty: DependencyProperty = DependencyProperty.RegisterReadOnlyCore("ActualHeight", () => Number, FrameworkElement);
        static DataContextProperty: DependencyProperty = DependencyProperty.RegisterCore("DataContext", () => Object, FrameworkElement);
        static StyleProperty: DependencyProperty = DependencyProperty.RegisterCore("Style", () => Style, FrameworkElement);
        static WidthProperty: DependencyProperty = DependencyProperty.RegisterCore("Width", () => Number, FrameworkElement, NaN, (d, args) => (<FrameworkElement>d)._WidthChanged(args));
        static HeightProperty: DependencyProperty = DependencyProperty.RegisterCore("Height", () => Number, FrameworkElement, NaN, (d, args) => (<FrameworkElement>d)._HeightChanged(args));
        ActualWidth: number;
        ActualHeight: number;
        DataContext: any;
        Style: Style;
        HorizontalAlignment: HorizontalAlignment;
        VerticalAlignment: VerticalAlignment;
        Width: number;
        Height: number;
        MinWidth: number;
        MinHeight: number;
        MaxWidth: number;
        MaxHeight: number;
        Margin: Thickness;
        FlowDirection: FlowDirection;

        SizeChanged: RoutedEvent;

        _ComputeActualSize(): size {
            return new size();
        }

        InvokeLoaded() {
        }

        //MeasureOverride(availableSize: size): size { return undefined; }
        //ArrangeOverride(finalSize: size): size { return undefined; }
        OnApplyTemplate() { }
        FindName(name: string): any {
            var n = this.XamlNode.FindName(name);
            if (n)
                return n.XObject;
        }

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
        
        _WidthChanged(args: IDependencyPropertyChangedEventArgs) {
        }
        _HeightChanged(args: IDependencyPropertyChangedEventArgs) {
        }
    }
    Nullstone.RegisterType(FrameworkElement, "FrameworkElement");
}