/// <reference path="../Core/FrameworkElement.ts" />
/// <reference path="../Core/XamlObjectCollection.ts" />

module Fayde.Controls {
    class PanelChildrenCollection extends XamlObjectCollection<UIElement> {
        $$updaters: minerva.core.Updater[] = [];
        AddingToCollection(value: UIElement, error: BError): boolean {
            var panelNode = <PanelNode>this.XamlNode.ParentNode;
            if (!panelNode.AttachVisualChild(value, error))
                return false;
            this.$$updaters.push(value.XamlNode.LayoutUpdater);
            return super.AddingToCollection(value, error);
        }
        RemovedFromCollection(value: UIElement, isValueSafe: boolean) {
            var panelNode = <PanelNode>this.XamlNode.ParentNode;
            panelNode.DetachVisualChild(value, null);
            var index = this.$$updaters.indexOf(value.XamlNode.LayoutUpdater);
            if (index > -1)
                this.$$updaters.splice(index, 1);
            super.RemovedFromCollection(value, isValueSafe);
        }
    }
    Fayde.RegisterType(PanelChildrenCollection, "Fayde.Controls");

    export class PanelNode extends FENode {
        LayoutUpdater: minerva.controls.panel.PanelUpdater;
        XObject: Panel;
        constructor(xobj: Panel) {
            super(xobj);
        }
        AttachVisualChild(uie: UIElement, error: BError): boolean {
            this.OnVisualChildAttached(uie);
            uie.XamlNode.SetIsLoaded(this.IsLoaded);
            return true;
        }
        DetachVisualChild(uie: UIElement, error: BError): boolean {
            this.OnVisualChildDetached(uie);
            uie.XamlNode.SetIsLoaded(false);
            return true;
        }
    }
    Fayde.RegisterType(PanelNode, "Fayde.Controls");

    export class Panel extends FrameworkElement {
        XamlNode: PanelNode;
        CreateNode(): PanelNode { return new PanelNode(this); }
        CreateLayoutUpdater() { return new minerva.controls.panel.PanelUpdater(); }

        static ZIndexProperty = DependencyProperty.RegisterAttached("ZIndex", () => Number, Panel, 0);

        static BackgroundProperty = DependencyProperty.Register("Background", () => Media.Brush, Panel);
        static ChildrenProperty = DependencyProperty.RegisterImmutable<XamlObjectCollection<UIElement>>("Children", () => PanelChildrenCollection, Panel);
        Background: Media.Brush;
        Children: XamlObjectCollection<UIElement>;

        constructor() {
            super();
            var coll = <PanelChildrenCollection>Panel.ChildrenProperty.Initialize(this);
            this.XamlNode.LayoutUpdater.setChildren(coll.$$updaters);
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
        UIReactionAttached<number>(Panel.ZIndexProperty, minerva.core.reactTo.zIndex);
    }
}