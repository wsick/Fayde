/// <reference path="../Core/FrameworkElement.ts" />
/// CODE
/// <reference path="../Core/DependencyObjectCollection.ts" />

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
        private _Nodes: UINode[] = [];
        private _ZSorted: UINode[] = [];

        ResortByZIndex() {
            var zs = this._Nodes.slice(0);
            this._ZSorted = zs;
            if (zs.length > 1)
                zs.sort(zIndexComparer);
        }
        GetVisualTreeEnumerator(direction?: VisualTreeDirection): IEnumerator {
            switch (direction) {
                case VisualTreeDirection.Logical:
                    return ArrayEx.GetEnumerator(this._Nodes);
                case VisualTreeDirection.LogicalReverse:
                    return ArrayEx.GetEnumerator(this._Nodes, true);
                case VisualTreeDirection.ZFoward:
                    if (this._ZSorted.length !== this._Nodes.length)
                        this.ResortByZIndex();
                    return ArrayEx.GetEnumerator(this._ZSorted);
                case VisualTreeDirection.ZReverse:
                    if (this._ZSorted.length !== this._Nodes.length)
                        this.ResortByZIndex();
                    return ArrayEx.GetEnumerator(this._ZSorted, true);
            }
        }
    }
    Nullstone.RegisterType(PanelChildrenNode, "PanelChildrenNode");
    class PanelChildrenCollection extends DependencyObjectCollection {
        XamlNode: PanelChildrenNode;
        constructor() {
            super(false);
        }
        CreateNode(): XamlNode {
            return new PanelChildrenNode(this);
        }
        _RaiseItemAdded(value: UIElement, index: number) {
            this.XamlNode.ParentNode._ElementAdded(value);
        }
        _RaiseItemRemoved(value: UIElement, index: number) {
            this.XamlNode.ParentNode._ElementRemoved(value);
        }
        _RaiseItemReplaced(removed: UIElement, added: UIElement, index: number) {
            var panelNode = this.XamlNode.ParentNode;
            panelNode._ElementRemoved(removed);
            panelNode._ElementAdded(added);
        }
    }
    Nullstone.RegisterType(PanelChildrenCollection, "PanelChildrenCollection");

    export class PanelNode extends FENode {
        XObject: Panel;
        constructor(xobj: Panel) {
            super(xobj);
            
            var coll = new PanelChildrenCollection();
            Object.defineProperty(xobj, "Children", {
                value: coll,
                writable: false
            });
            this.SetSubtreeNode(coll.XamlNode);
        }
        _ElementAdded(uie: UIElement) {
            super._ElementAdded(uie);
            this._InvalidateChildrenZIndices();
        }
        _ElementRemoved(uie: UIElement) {
            super._ElementRemoved(uie);
            this._InvalidateChildrenZIndices();
        }
        _InvalidateChildrenZIndices() {
            if (this.IsAttached) {
                //TODO: Invalidate ChildrenZIndices
            }
        }
        _ResortChildrenByZIndex() {
            (<PanelChildrenCollection>this.XObject.Children).XamlNode.ResortByZIndex();
        }
        
        _MeasureOverride(availableSize: size, error: BError): size {
            //Abstract Method
            return new size();
        }
    }
    Nullstone.RegisterType(PanelNode, "PanelNode");
    function zIndexPropertyChanged(dobj: DependencyObject, args) {
        //if (dobj instanceof UIElement) {
        //  (<UIElement>dobj)._Invalidate();
        //}
        (<PanelNode>dobj.XamlNode.ParentNode)._InvalidateChildrenZIndices();
    }
    export class Panel extends FrameworkElement {
        XamlNode: PanelNode;
        static BackgroundProperty: DependencyProperty = DependencyProperty.Register("Background", () => { return Media.Brush; }, Panel, undefined, (d, args) => (<Panel>d)._BackgroundChanged(args));
        static IsItemsHostProperty: DependencyProperty = DependencyProperty.Register("IsItemHost", () => { return Boolean; }, Panel, false);

        static ZIndexProperty: DependencyProperty = DependencyProperty.RegisterAttached("ZIndex", () => { return Number; }, Panel, 0, zIndexPropertyChanged);
        static ZProperty: DependencyProperty = DependencyProperty.RegisterAttached("Z", () => { return Number; }, Panel, NaN);

        Background: Media.Brush;
        IsItemsHost: bool;
        Children: DependencyObjectCollection;

        static Annotations = { ContentProperty: "Children" }

        static GetZIndex(uie: UIElement): number { return uie.GetValue(ZIndexProperty); }
        static SetZIndex(uie: UIElement, value: number) { uie.SetValue(ZIndexProperty, value); }
        
        static GetZ(uie: UIElement): number { return uie.GetValue(ZProperty); }
        static SetZ(uie: UIElement, value: number) { uie.SetValue(ZProperty, value); }

        CreateNode(): PanelNode {
            var n = new PanelNode(this);
            n.LayoutUpdater.SetContainerMode(true, true);
            return n;
        }

        private _BackgroundChanged(args: IDependencyPropertyChangedEventArgs) {
            var oldBrush = <Media.Brush>args.OldValue;
            var newBrush = <Media.Brush>args.NewValue;
            if (oldBrush)
                oldBrush.Unlisten(this);
            if (newBrush)
                newBrush.Listen(this);

            var lu = this.XamlNode.LayoutUpdater;
            lu.UpdateBounds();
            lu.Invalidate();
        }
        private BrushChanged(newBrush: Media.Brush) { this.XamlNode.LayoutUpdater.Invalidate(); }

        private Render(ctx: RenderContext, lu: LayoutUpdater, region: rect) {
            var background = this.Background;
            if (!background)
                return;
            
            var framework = lu.CoerceSize(size.fromRaw(this.ActualWidth, this.ActualHeight));
            if (framework.Width <= 0 || framework.Height <= 0)
                return;

            var area = rect.fromSize(framework);
            ctx.Save();
            lu._RenderLayoutClip(ctx);
            ctx.FillRect(background, area);
            ctx.Restore();
        }
    }
    Nullstone.RegisterType(Panel, "Panel");
}