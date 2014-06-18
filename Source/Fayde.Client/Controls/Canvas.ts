/// <reference path="Panel.ts" />

module Fayde.Controls {
    export class CanvasNode extends PanelNode {
        XObject: Canvas;
        constructor(xobj: Canvas) {
            super(xobj);
        }

        AttachVisualChild(uie: UIElement, error: BError): boolean {
            if (!super.AttachVisualChild(uie, error))
                return false;
            this._UpdateIsLayoutContainerOnAdd(uie);
            return true;
        }
        DetachVisualChild(uie: UIElement, error: BError): boolean {
            if (!super.DetachVisualChild(uie, error))
                return false;
            this._UpdateIsLayoutContainerOnRemove(uie);
            return true;
        }
        private _UpdateIsLayoutContainerOnAdd(uie: UIElement) {
            //If it's already a layout container, adding a child will not affect
            var lu = this.LayoutUpdater;
            if (lu.IsLayoutContainer)
                return;
            var walker = DeepTreeWalker(uie.XamlNode);
            var childNode: UINode;
            while (childNode = walker.Step()) {
                if (!(childNode instanceof CanvasNode) && childNode.LayoutUpdater.IsLayoutContainer) {
                    lu.IsLayoutContainer = true;
                    return;
                }
            }
        }
        private _UpdateIsLayoutContainerOnRemove(uie: UIElement) {
            //If it's not a layout container, removing a child will not affect
            var lu = this.LayoutUpdater;
            if (!lu.IsLayoutContainer)
                return;
            var walker = DeepTreeWalker(this);
            var childNode: UINode;
            while (childNode = walker.Step()) {
                if (!(childNode instanceof CanvasNode) && childNode.LayoutUpdater.IsLayoutContainer)
                    return;
            }
            lu.IsLayoutContainer = false;
        }
    }
    Fayde.RegisterType(CanvasNode, "Fayde.Controls");

    function invalidateTopLeft(d: DependencyObject, args: IDependencyPropertyChangedEventArgs) {
        if (!(d instanceof UIElement))
            return;

        var n: UINode;
        var lu: LayoutUpdater;

        var uie = <UIElement>d;
        if (uie instanceof Canvas) {
            n = uie.XamlNode;
            if (n.VisualParentNode == null) {
                lu = n.LayoutUpdater;
                lu.UpdateTransform();
                lu.InvalidateArrange();
            }
        }

        var vpNode = uie.XamlNode.VisualParentNode;
        if (!(vpNode instanceof CanvasNode))
            return;

        n = uie.XamlNode;
        lu = n.LayoutUpdater;
        var childFinal = rect.fromSize(lu.DesiredSize);
        childFinal.X = Canvas.GetLeft(uie);
        childFinal.Y = Canvas.GetTop(uie);
        if (uie.UseLayoutRounding) {
            childFinal.X = Math.round(childFinal.X);
            childFinal.Y = Math.round(childFinal.Y);
            childFinal.Width = Math.round(childFinal.Width);
            childFinal.Height = Math.round(childFinal.Height);
        }
        lu.LayoutSlot = childFinal;
        lu.InvalidateArrange();
    }

    export class Canvas extends Panel {
        CreateNode(): CanvasNode { return new CanvasNode(this); }
        CreateLayoutUpdater(node: PanelNode) { return new CanvasLayoutUpdater(node); }

        static TopProperty: DependencyProperty = DependencyProperty.RegisterAttached("Top", () => Number, Canvas, 0.0, invalidateTopLeft);
        static GetTop(d: DependencyObject): number { return d.GetValue(Canvas.TopProperty); }
        static SetTop(d: DependencyObject, value: number) { d.SetValue(Canvas.TopProperty, value); }
        static LeftProperty: DependencyProperty = DependencyProperty.RegisterAttached("Left", () => Number, Canvas, 0.0, invalidateTopLeft);
        static GetLeft(d: DependencyObject): number { return d.GetValue(Canvas.LeftProperty); }
        static SetLeft(d: DependencyObject, value: number) { d.SetValue(Canvas.LeftProperty, value); }
    }
    Fayde.RegisterType(Canvas, "Fayde.Controls", Fayde.XMLNS);

    export class CanvasLayoutUpdater extends PanelLayoutUpdater {
        constructor(node: PanelNode) {
            super(node);
            this.BreaksLayoutClipRender = true;
        }

        MeasureOverride(availableSize: size, error: BError): size {
            var childSize = size.createInfinite();
            var enumerator = this.Node.GetVisualTreeEnumerator();
            while (enumerator.moveNext()) {
                var childNode = enumerator.Current;
                childNode.LayoutUpdater._Measure(childSize, error);
            }
            return new size();
        }
        ArrangeOverride(finalSize: size, error: BError): size {
            var enumerator = this.Node.GetVisualTreeEnumerator();
            while (enumerator.moveNext()) {
                var childNode = enumerator.Current;
                var lu = childNode.LayoutUpdater;
                var childFinal = rect.fromSize(lu.DesiredSize);
                childFinal.X = Canvas.GetLeft(childNode.XObject);
                childFinal.Y = Canvas.GetTop(childNode.XObject);
                lu._Arrange(childFinal, error);
            }
            return finalSize;
        }

        ComputeBounds() {
            super.ComputeBounds();
            var surface = this.Surface;
            var node = this.Node;
            if (surface && node.IsAttached && node.IsTopLevel) {
                var full = surface.Extents;
                rect.set(this.SurfaceBoundsWithChildren, 0, 0, full.Width, full.Height);
            }
        }
    }
}