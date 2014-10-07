/// <reference path="../Core/FrameworkElement.ts" />
/// <reference path="../Core/XamlObjectCollection.ts" />

module Fayde.Controls {
    class PanelChildrenCollection extends XamlObjectCollection<UIElement> {
        AddingToCollection(value: UIElement, error: BError): boolean {
            var panelNode = <PanelNode>this.XamlNode.ParentNode;
            if (!panelNode.AttachVisualChild(value, error))
                return false;
            return super.AddingToCollection(value, error);
        }
        RemovedFromCollection(value: UIElement, isValueSafe: boolean) {
            var panelNode = <PanelNode>this.XamlNode.ParentNode;
            panelNode.DetachVisualChild(value, null);
            super.RemovedFromCollection(value, isValueSafe);
        }
    }
    Fayde.RegisterType(PanelChildrenCollection, "Fayde.Controls");

    export class PanelNode extends FENode {
        private _ZSorted: UIElement[] = null;

        XObject: Panel;
        constructor(xobj: Panel) {
            super(xobj);
        }
        AttachVisualChild(uie: UIElement, error: BError): boolean {
            this.OnVisualChildAttached(uie);
            uie.XamlNode.SetIsLoaded(this.IsLoaded);
            this.InvalidateZIndices();
            return true;
        }
        DetachVisualChild(uie: UIElement, error: BError): boolean {
            this.OnVisualChildDetached(uie);
            uie.XamlNode.SetIsLoaded(false);
            this.InvalidateZIndices();
            return true;
        }

        GetVisualTreeEnumerator(direction?: VisualTreeDirection): IEnumerator<FENode> {
            //TODO: Carry to Updater
            var coll = this.XObject.Children;
            switch (direction) {
                default:
                case VisualTreeDirection.Logical:
                    return ArrayEx.GetEnumerator(coll._ht);
                case VisualTreeDirection.LogicalReverse:
                    return ArrayEx.GetEnumerator(coll._ht, true);
                case VisualTreeDirection.ZFoward:
                    this.ZSort();
                    return ArrayEx.GetEnumerator(this._ZSorted);
                case VisualTreeDirection.ZReverse:
                    this.ZSort();
                    return ArrayEx.GetEnumerator(this._ZSorted, true);
            }
        }

        InvalidateZIndices() {
            this._ZSorted = null;
        }
        ZSort() {
            if (this._ZSorted)
                return;
            this._ZSorted = this.XObject.Children._ht.slice(0);
            this._ZSorted.sort(zIndexComparer);
        }
    }
    Fayde.RegisterType(PanelNode, "Fayde.Controls");

    export class Panel extends FrameworkElement {
        XamlNode: PanelNode;
        CreateNode(): PanelNode { return new PanelNode(this); }
        CreateLayoutUpdater() { return new minerva.controls.panel.PanelUpdater(); }

        static ZIndexProperty = DependencyProperty.RegisterAttached("ZIndex", () => Number, Panel, 0, (d: Panel, args) => d.XamlNode.InvalidateZIndices());

        static BackgroundProperty = DependencyProperty.Register("Background", () => Media.Brush, Panel);
        static ChildrenProperty = DependencyProperty.RegisterImmutable<XamlObjectCollection<UIElement>>("Children", () => PanelChildrenCollection, Panel);
        Background: Media.Brush;
        Children: XamlObjectCollection<UIElement>;

        constructor() {
            super();
            var coll = Panel.ChildrenProperty.Initialize(this);
            var error = new BError();
            this.XamlNode.SetSubtreeNode(coll.XamlNode, error);
        }

        static GetZIndex(uie: UIElement): number { return uie.GetValue(Panel.ZIndexProperty); }
        static SetZIndex(uie: UIElement, value: number) { uie.SetValue(Panel.ZIndexProperty, value); }
    }
    Fayde.RegisterType(Panel, "Fayde.Controls", Fayde.XMLNS);
    Xaml.Content(Panel, Panel.ChildrenProperty);

    module reactions {
        UIReaction<minerva.IBrush>(Panel.BackgroundProperty, (upd, ov, nv) => {
            if (nv !== ov) //nv === ov when child properties update
                upd.updateBounds();
            upd.invalidate();
            //TODO: Use for hit testing
            //lu.CanHitElement = newBrush != null;
        });
    }

    function zIndexComparer(uie1: UIElement, uie2: UIElement): number {
        var zi1 = uie1.GetValue(Panel.ZIndexProperty);
        var zi2 = uie2.GetValue(Panel.ZIndexProperty);
        return zi1 === zi2 ? 0 : ((zi1 < zi2) ? -1 : 1);
    }
}