/// <reference path="../Core/FrameworkElement.ts" />
/// <reference path="../Core/XamlObjectCollection.ts" />

module Fayde.Controls {
    function zIndexComparer(uin1: UINode, uin2: UINode) {
        var zi1 = Controls.Panel.GetZIndex(uin1.XObject);
        var zi2 = Controls.Panel.GetZIndex(uin2.XObject);
        if (zi1 === zi2) {
            var z1 = Controls.Panel.GetZ(uin1.XObject);
            var z2 = Controls.Panel.GetZ(uin2.XObject);
            if (isNaN(z1) || isNaN(z2))
                return 0;
            return z1 > z2 ? 1 : (z1 < z2 ? -1 : 0);
        }
        return zi1 - zi2;
    }
    class PanelChildrenNode extends XamlNode {
        ParentNode: PanelNode;
        
        private _Nodes: FENode[] = null;
        private get Nodes(): FENode[] {
            if (!this._Nodes) {
                var nodes = this._Nodes = [];
                for (var i = 0, uies = (<PanelChildrenCollection>this.XObject)._ht, len = uies.length; i < len; i++) {
                    nodes.push(<FENode>uies[i].XamlNode);
                }
            }
            return this._Nodes;
        }
        private _ZSorted: FENode[] = [];

        InvalidateNodeCache() {
            this._Nodes = null;
        }

        ResortByZIndex() {
            var zs = this.Nodes.slice(0);
            this._ZSorted = zs;
            if (zs.length > 1)
                zs.sort(zIndexComparer);
        }
        GetVisualTreeEnumerator(direction?: VisualTreeDirection): IEnumerator<FENode> {
            switch (direction) {
                default:
                case VisualTreeDirection.Logical:
                    return ArrayEx.GetEnumerator(this.Nodes);
                case VisualTreeDirection.LogicalReverse:
                    return ArrayEx.GetEnumerator(this.Nodes, true);
                case VisualTreeDirection.ZFoward:
                    if (this._ZSorted.length !== this.Nodes.length)
                        this.ResortByZIndex();
                    return ArrayEx.GetEnumerator(this._ZSorted);
                case VisualTreeDirection.ZReverse:
                    if (this._ZSorted.length !== this.Nodes.length)
                        this.ResortByZIndex();
                    return ArrayEx.GetEnumerator(this._ZSorted, true);
            }
        }
    }
    Fayde.RegisterType(PanelChildrenNode, "Fayde.Controls");

    class PanelChildrenCollection extends XamlObjectCollection<UIElement> {
        XamlNode: PanelChildrenNode;
        CreateNode(): PanelChildrenNode { return new PanelChildrenNode(this); }
        AddingToCollection(value: UIElement, error: BError): boolean {
            var node = this.XamlNode;
            if (!node.ParentNode.AttachVisualChild(value, error))
                return false;
            node.InvalidateNodeCache();
            return super.AddingToCollection(value, error);
        }
        RemovedFromCollection(value: UIElement, isValueSafe: boolean) {
            var node = this.XamlNode;
            node.ParentNode.DetachVisualChild(value, null);
            node.InvalidateNodeCache();
            super.RemovedFromCollection(value, isValueSafe);
        }
    }
    Fayde.RegisterType(PanelChildrenCollection, "Fayde.Controls");

    export class PanelNode extends FENode {
        XObject: Panel;
        constructor(xobj: Panel) {
            super(xobj);
        }
        AttachVisualChild(uie: UIElement, error: BError): boolean {
            this.OnVisualChildAttached(uie);
            uie.XamlNode.SetIsLoaded(this.IsLoaded);
            this._InvalidateChildrenZIndices();
            return true;
        }
        DetachVisualChild(uie: UIElement, error: BError): boolean {
            this.OnVisualChildDetached(uie);
            uie.XamlNode.SetIsLoaded(false);
            this._InvalidateChildrenZIndices();
            return true;
        }
        _InvalidateChildrenZIndices() {
            var lu = this.LayoutUpdater;
            lu.InvalidateChildrenZIndices();
        }
        ResortChildrenByZIndex() {
            (<PanelChildrenCollection>this.XObject.Children).XamlNode.ResortByZIndex();
        }

        OnIsAttachedChanged(newIsAttached: boolean) {
            this.SetSurfaceFromVisualParent();
            this.LayoutUpdater.OnIsAttachedChanged(newIsAttached, this.VisualParentNode);
            super.OnIsAttachedChanged(newIsAttached);
        }

        GetVisualTreeEnumerator(direction?: VisualTreeDirection): IEnumerator<FENode> {
            return this.XObject.Children.XamlNode.GetVisualTreeEnumerator(direction);
        }
    }
    Fayde.RegisterType(PanelNode, "Fayde.Controls");

    function zIndexPropertyChanged(dobj: DependencyObject, args) {
        var xn = dobj.XamlNode;
        if (xn instanceof UINode)
            (<UINode>xn).LayoutUpdater.Invalidate();
        if (xn.IsAttached) {
            var panelNode = <PanelNode>(<UINode>xn).VisualParentNode;
            if (panelNode instanceof PanelNode)
                panelNode._InvalidateChildrenZIndices();
        }
    }
    export class Panel extends FrameworkElement {
        XamlNode: PanelNode;
        CreateNode(): PanelNode { return new PanelNode(this); }
        CreateLayoutUpdater(node: PanelNode) { return new PanelLayoutUpdater(node); }

        static ZIndexProperty: DependencyProperty = DependencyProperty.RegisterAttached("ZIndex", () => { return Number; }, Panel, 0, zIndexPropertyChanged);
        static ZProperty: DependencyProperty = DependencyProperty.RegisterAttached("Z", () => { return Number; }, Panel, NaN);
        
        static BackgroundProperty: DependencyProperty = DependencyProperty.Register("Background", () => { return Media.Brush; }, Panel, undefined, (d, args) => (<Panel>d)._BackgroundChanged(args));
        static ChildrenProperty = DependencyProperty.RegisterImmutable<XamlObjectCollection<UIElement>>("Children", () => PanelChildrenCollection, Panel);
        Background: Media.Brush;
        Children: XamlObjectCollection<UIElement>;

        private _BackgroundListener: Media.IBrushChangedListener;

        constructor() {
            super();
            var coll = Panel.ChildrenProperty.Initialize(this);
            var error = new BError();
            this.XamlNode.SetSubtreeNode(coll.XamlNode, error);
        }

        static GetZIndex(uie: UIElement): number { return uie.GetValue(Panel.ZIndexProperty); }
        static SetZIndex(uie: UIElement, value: number) { uie.SetValue(Panel.ZIndexProperty, value); }

        static GetZ(uie: UIElement): number { return uie.GetValue(Panel.ZProperty); }
        static SetZ(uie: UIElement, value: number) { uie.SetValue(Panel.ZProperty, value); }

        private _BackgroundChanged(args: IDependencyPropertyChangedEventArgs) {
            var lu = this.XamlNode.LayoutUpdater;

            var newBrush = <Media.Brush>args.NewValue;
            if (this._BackgroundListener)
                this._BackgroundListener.Detach();
                this._BackgroundListener = null;
            if (newBrush)
                this._BackgroundListener = newBrush.Listen((brush) => lu.Invalidate());

            lu.CanHitElement = newBrush != null;

            lu.UpdateBounds();
            lu.Invalidate();
        }
    }
    Fayde.RegisterType(Panel, "Fayde.Controls", Fayde.XMLNS);
    Xaml.Content(Panel, Panel.ChildrenProperty);

    export class PanelLayoutUpdater extends LayoutUpdater {
        constructor(node: PanelNode) {
            super(node);
            this.SetContainerMode(true, true);
        }

        InsideObject(ctx: RenderContextEx, x: number, y: number): boolean {
            if (!super.InsideObject(ctx, x, y))
                return false;
            return (<Panel>this.Node.XObject).Background != null;
        }

        ComputeExtents(actualSize: size) {
            if (!(<Panel>this.Node.XObject).Background) {
                //initialize extents as empty if no background
                actualSize.Width = 0;
                actualSize.Height = 0;
            }
            return super.ComputeExtents(actualSize);
        }

        Render(ctx: RenderContextEx, region: rect) {
            var panel = <Panel>this.Node.XObject;
            var background = panel.Background;
            if (!background)
                return;

            var framework = this.CoerceSize(size.fromRaw(this.ActualWidth, this.ActualHeight));
            if (framework.Width <= 0 || framework.Height <= 0)
                return;

            var area = rect.fromSize(framework);
            ctx.save();
            this.RenderLayoutClip(ctx);
            ctx.fillRectEx(background, area);
            ctx.restore();
        }
    }
}