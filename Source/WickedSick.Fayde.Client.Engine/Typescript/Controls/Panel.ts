/// <reference path="../Core/FrameworkElement.ts" />
/// CODE
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
        private _Nodes: UINode[] = [];
        private _ZSorted: UINode[] = [];

        AddNode(uin: UINode) { this._Nodes.push(uin); }
        RemoveNode(uin: UINode) {
            var nodes = this._Nodes;
            var index = nodes.indexOf(uin);
            if (index > -1)
                nodes.splice(index, 1);
        }

        ResortByZIndex() {
            var zs = this._Nodes.slice(0);
            this._ZSorted = zs;
            if (zs.length > 1)
                zs.sort(zIndexComparer);
        }
        GetVisualTreeEnumerator(direction?: VisualTreeDirection): IEnumerator {
            switch (direction) {
                default:
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

    class PanelChildrenCollection extends XamlObjectCollection {
        XamlNode: PanelChildrenNode;
        CreateNode(): PanelChildrenNode { return new PanelChildrenNode(this); }
        AddedToCollection(value: UIElement, error: BError): bool {
            var node = this.XamlNode;
            if (!node.ParentNode.AttachVisualChild(value, error))
                return false;
            node.AddNode(value.XamlNode);
            return super.AddedToCollection(value, error);
        }
        RemovedFromCollection(value: UIElement, isValueSafe: bool) {
            var node = this.XamlNode;
            node.ParentNode.DetachVisualChild(value, null);
            node.RemoveNode(value.XamlNode);
            super.RemovedFromCollection(value, isValueSafe);
        }
    }
    Nullstone.RegisterType(PanelChildrenCollection, "PanelChildrenCollection");

    export class PanelNode extends FENode implements IBoundsComputable {
        XObject: Panel;
        constructor(xobj: Panel) {
            super(xobj);
            this.LayoutUpdater.SetContainerMode(true, true);

            var coll = new PanelChildrenCollection();
            Object.defineProperty(xobj, "Children", {
                value: coll,
                writable: false
            });
            var error = new BError();
            this.SetSubtreeNode(coll.XamlNode, error);
        }
        AttachVisualChild(uie: UIElement, error: BError): bool {
            this.OnVisualChildAttached(uie);
            uie.XamlNode.SetIsLoaded(this.IsLoaded);
            this._InvalidateChildrenZIndices();
            return true;
        }
        DetachVisualChild(uie: UIElement, error: BError): bool {
            this.OnVisualChildDetached(uie);
            uie.XamlNode.SetIsLoaded(false);
            this._InvalidateChildrenZIndices();
            return true;
        }
        _InvalidateChildrenZIndices() {
            if (this.IsAttached) {
                //TODO: Invalidate ChildrenZIndices
            }
        }
        _ResortChildrenByZIndex() {
            (<PanelChildrenCollection>this.XObject.Children).XamlNode.ResortByZIndex();
        }

        OnIsAttachedChanged(newIsAttached: bool) {
            this.SetSurfaceFromVisualParent();
            this.LayoutUpdater.OnIsAttachedChanged(newIsAttached, this.VisualParentNode);
            super.OnIsAttachedChanged(newIsAttached);
        }

        _CanFindElement(): bool { return this.XObject.Background != null; }
        _InsideObject(ctx: RenderContext, lu: LayoutUpdater, x: number, y: number): bool {
            return (this.XObject.Background != null) && super._InsideObject(ctx, lu, x, y);
        }

        ComputeBounds(baseComputer: () => void , lu: LayoutUpdater) {
            rect.clear(lu.Extents);
            rect.clear(lu.ExtentsWithChildren);

            var enumerator = this.GetVisualTreeEnumerator(VisualTreeDirection.Logical);
            while (enumerator.MoveNext()) {
                var item = <UINode>enumerator.Current;
                var itemlu = item.LayoutUpdater;
                if (itemlu.TotalIsRenderVisible)
                    rect.union(lu.ExtentsWithChildren, itemlu.GlobalBoundsWithChildren);
            }

            if (this.XObject.Background) {
                rect.set(lu.Extents, 0, 0, lu.ActualWidth, lu.ActualHeight);
                rect.union(lu.ExtentsWithChildren, lu.Extents);
            }

            rect.copyGrowTransform(lu.Bounds, lu.Extents, lu.EffectPadding, lu.AbsoluteXform);
            rect.copyGrowTransform(lu.BoundsWithChildren, lu.ExtentsWithChildren, lu.EffectPadding, lu.AbsoluteXform);

            lu.ComputeGlobalBounds();
            lu.ComputeSurfaceBounds();
        }
        
        GetVisualTreeEnumerator(direction?: VisualTreeDirection): IEnumerator {
            return this.XObject.Children.XamlNode.GetVisualTreeEnumerator(direction);
        }
    }
    Nullstone.RegisterType(PanelNode, "PanelNode");

    function zIndexPropertyChanged(dobj: DependencyObject, args) {
        if (dobj instanceof UIElement)
          (<UIElement>dobj).XamlNode.LayoutUpdater.Invalidate();
        (<PanelNode>dobj.XamlNode.ParentNode)._InvalidateChildrenZIndices();
    }
    export class Panel extends FrameworkElement implements IMeasurableHidden {
        XamlNode: PanelNode;
        CreateNode(): PanelNode { return new PanelNode(this); }

        static BackgroundProperty: DependencyProperty = DependencyProperty.Register("Background", () => { return Media.Brush; }, Panel, undefined, (d, args) => (<Panel>d)._BackgroundChanged(args));
        static IsItemsHostProperty: DependencyProperty = DependencyProperty.Register("IsItemHost", () => { return Boolean; }, Panel, false);

        static ZIndexProperty: DependencyProperty = DependencyProperty.RegisterAttached("ZIndex", () => { return Number; }, Panel, 0, zIndexPropertyChanged);
        static ZProperty: DependencyProperty = DependencyProperty.RegisterAttached("Z", () => { return Number; }, Panel, NaN);

        Background: Media.Brush;
        IsItemsHost: bool;
        Children: XamlObjectCollection;

        static Annotations = { ContentProperty: "Children" }

        static GetZIndex(uie: UIElement): number { return uie.GetValue(ZIndexProperty); }
        static SetZIndex(uie: UIElement, value: number) { uie.SetValue(ZIndexProperty, value); }

        static GetZ(uie: UIElement): number { return uie.GetValue(ZProperty); }
        static SetZ(uie: UIElement, value: number) { uie.SetValue(ZProperty, value); }

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

        private _MeasureOverride(availableSize: size, error: BError): size {
            //Abstract Method
            return new size();
        }
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