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
    class PanelChildrenCollection extends Core.DependencyObjectCollection {
        XamlNode: PanelChildrenNode;
        CreateNode(): XamlNode {
            return new PanelChildrenNode(this);
        }
        _RaiseItemAdded(value: any, index: number) {
            this.XamlNode.ParentNode._ElementAdded(value);
        }
        _RaiseItemRemoved(value: any, index: number) {
            this.XamlNode.ParentNode._ElementRemoved(value);
        }
        _RaiseItemReplaced(removed: any, added: any, index: number) {
            var panelNode = this.XamlNode.ParentNode;
            panelNode._ElementRemoved(removed);
            panelNode._ElementAdded(added);
        }
        _RaiseItemChanged(item: UIElement, propd: DependencyProperty, oldValue: any, newValue: any) {
            if (propd._ID !== Panel.ZIndexProperty._ID)
                return;
            //TODO: Invalidate item
            var panelNode = this.XamlNode.ParentNode;
            panelNode._InvalidateChildrenZIndices();
        }
    }

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
    }
    export class Panel extends FrameworkElement {
        XamlNode: PanelNode;
        static BackgroundProperty: DependencyProperty;
        static IsItemsHostProperty: DependencyProperty;
        static ZIndexProperty: DependencyProperty;
        static ZProperty: DependencyProperty;

        Children: Core.DependencyObjectCollection;

        static GetZIndex(uie: UIElement): number { return -1; }
        static SetZIndex(uie: UIElement, value: number) { }
        
        static GetZ(uie: UIElement): number { return -1; }
        static SetZ(uie: UIElement, value: number) { }

        CreateNode(): XamlNode {
            return new PanelNode(this);
        }
    }
}