/// <reference path="Panel.ts" />

module Fayde.Controls {
    export class CanvasNode extends PanelNode {
        _Surface: Surface;
        XObject: Canvas;
        constructor(xobj: Canvas) {
            super(xobj);
            this.LayoutUpdater.BreaksLayoutClipRender = true;
        }

        AttachVisualChild(uie: UIElement, error: BError): boolean {
            if (!super.AttachVisualChild(uie, error))
                return false;
            this._UpdateIsLayoutContainerOnAdd(uie);
        }
        DetachVisualChild(uie: UIElement, error: BError): boolean {
            if (!super.DetachVisualChild(uie, error))
                return false;
            this._UpdateIsLayoutContainerOnRemove(uie);
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
                    break;
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
                if (!(childNode instanceof CanvasNode) && childNode.LayoutUpdater.IsLayoutContainer) {
                    lu.IsLayoutContainer = true;
                    break;
                }
            }
            lu.IsLayoutContainer = false;
        }

        ComputeBounds(baseComputer: () => void , lu: LayoutUpdater) {
            var surface = this._Surface;
            if (surface && this.IsAttached && this.IsTopLevel) {
                // a toplevel (non-popup) canvas doesn't subscribe to the same bounds computation as others
                var surfaceSize = surface.Extents;
                rect.set(lu.Extents, 0, 0, surfaceSize.Width, surfaceSize.Height);
                rect.copyTo(lu.Extents, lu.ExtentsWithChildren);
                rect.copyTo(lu.Extents, lu.Bounds);
                rect.copyTo(lu.Bounds, lu.BoundsWithChildren);

                lu.ComputeGlobalBounds();
                lu.ComputeSurfaceBounds();
            } else {
                super.ComputeBounds(baseComputer, lu);
            }
        }
    }
    Fayde.RegisterType(CanvasNode, {
    	Name: "CanvasNode",
    	Namespace: "Fayde.Controls"
    });

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

    export class Canvas extends Panel implements IMeasurableHidden, IArrangeableHidden {
        static TopProperty: DependencyProperty = DependencyProperty.RegisterAttached("Top", () => Number, Canvas, 0.0, invalidateTopLeft);
        static GetTop(d: DependencyObject): number { return d.GetValue(Canvas.TopProperty); }
        static SetTop(d: DependencyObject, value: number) { d.SetValue(Canvas.TopProperty, value); }
        static LeftProperty: DependencyProperty = DependencyProperty.RegisterAttached("Left", () => Number, Canvas, 0.0, invalidateTopLeft);
        static GetLeft(d: DependencyObject): number { return d.GetValue(Canvas.LeftProperty); }
        static SetLeft(d: DependencyObject, value: number) { d.SetValue(Canvas.LeftProperty, value); }

        _MeasureOverride(availableSize: size, error: BError): size {
            var childSize = size.createInfinite();
            var enumerator = this.XamlNode.GetVisualTreeEnumerator();
            while (enumerator.MoveNext()) {
                var childNode = enumerator.Current;
                childNode.LayoutUpdater._Measure(childSize, error);
            }
            return new size();
        }
        _ArrangeOverride(finalSize: size, error: BError): size {
            var enumerator = this.XamlNode.GetVisualTreeEnumerator();
            while (enumerator.MoveNext()) {
                var childNode = enumerator.Current;
                var lu = childNode.LayoutUpdater;
                var childFinal = rect.fromSize(lu.DesiredSize);
                childFinal.X = Canvas.GetLeft(childNode.XObject);
                childFinal.Y = Canvas.GetTop(childNode.XObject);
                lu._Arrange(childFinal, error);
            }
            return finalSize;
        }
    }
    Fayde.RegisterType(Canvas, {
    	Name: "Canvas",
    	Namespace: "Fayde.Controls",
    	XmlNamespace: Fayde.XMLNS
    });
}