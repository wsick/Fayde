/// <reference path="../Core/FrameworkElement.ts" />
/// CODE
/// <reference path="../Core/XamlObjectCollection.ts" />
/// <reference path="../Text/TextLayout.ts" />

module Fayde.Controls {
    declare var NotImplemented;

    export class TextBlockNode extends FENode implements IBoundsComputable {
        XObject: TextBlock;
        private _ActualWidth: number;
        private _ActualHeight: number;
        private _Layout: any;
        constructor(xobj: TextBlock) {
            super(xobj);
        }

        GetInheritedWalker(): IEnumerator {
            var coll = (<DependencyObject>this.XObject).GetValue(TextBlock.InlinesProperty);
            if (coll)
                return (<XamlObjectCollection>coll).GetEnumerator();
        }

        ComputeBounds(baseComputer: () => void , lu: LayoutUpdater) {
            rect.copyTo(this._Layout.GetRenderExtents(), lu.Extents);
            var padding = this.XObject.Padding;
            lu.Extents.X += padding.Left;
            lu.Extents.Y += padding.Top;
            rect.copyTo(lu.Extents, lu.ExtentsWithChildren);

            lu.IntersectBoundsWithClipPath(lu.Bounds, lu.AbsoluteXform);
            rect.copyTo(lu.Bounds, lu.BoundsWithChildren);

            lu.ComputeGlobalBounds();
            lu.ComputeSurfaceBounds();
        }

        Measure(constraint: size):size {
            this.Layout(constraint);
            return size.fromRaw(this._ActualWidth, this._ActualHeight);
        }
        Arrange(constraint: size, padding: Thickness) {
            this.Layout(constraint);
            var arranged = size.fromRaw(this._ActualWidth, this._ActualHeight);
            size.max(arranged, constraint);
            this._Layout.SetAvailableWidth(constraint.Width);
            size.growByThickness(arranged, padding);
        }
        Layout(constraint: size) {
            //TODO: Implement
        }
    }
    Nullstone.RegisterType(TextBlockNode, "TextBlockNode");

    export class TextBlock extends FrameworkElement implements IMeasurableHidden, IArrangeableHidden, IRenderable {
        private _Layout: Text.TextLayout = new Text.TextLayout();
        XamlNode: TextBlockNode;
        CreateNode(): TextBlockNode { return new TextBlockNode(this); }

        static InlinesProperty: DependencyProperty;
        static PaddingPropert: DependencyProperty;
        Padding: Thickness;

        private _MeasureOverride(availableSize: size, error: BError): size {
            var padding = this.Padding;
            var constraint = size.clone(availableSize);
            size.shrinkByThickness(constraint, padding);
            var desired = this.XamlNode.Measure(constraint);
            size.growByThickness(desired, padding);
            return desired;
        }
        private _ArrangeOverride(finalSize: size, error: BError): size {
            var padding = this.Padding;
            var constraint = size.clone(finalSize);
            size.shrinkByThickness(constraint, padding);
            this.XamlNode.Arrange(constraint, padding);
            return finalSize;
        }

        Render(ctx: RenderContext, lu: LayoutUpdater, region: rect) {
            ctx.Save();
            lu._RenderLayoutClip(ctx);
            var padding = this.Padding;
            var offset = new Point(padding.Left, padding.Top);
            if (this.FlowDirection === Fayde.FlowDirection.RightToLeft) {
                NotImplemented("TextBlock._Render: Right to left");
            }
            this._Layout.Render(ctx, null, offset);
            ctx.Restore();
        }
    }
    Nullstone.RegisterType(TextBlock, "TextBlock");
}