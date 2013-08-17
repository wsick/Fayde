/// <reference path="../Core/FrameworkElement.ts" />
/// CODE

module Fayde.Controls {
    export class BorderNode extends FENode {
        XObject: Border;
        constructor(xobj: Border) {
            super(xobj);
            this.LayoutUpdater.SetContainerMode(true);
        }
    }
    Nullstone.RegisterType(BorderNode, "BorderNode");

    export class Border extends FrameworkElement {
        XamlNode: BorderNode;
        CreateNode(): BorderNode { return new BorderNode(this); }

        static BackgroundProperty: DependencyProperty = DependencyProperty.RegisterCore("Background", () => Media.Brush, Border, undefined, (d, args) => (<Border>d)._BackgroundChanged(args));
        static BorderBrushProperty: DependencyProperty = DependencyProperty.RegisterCore("BorderBrush", () => Media.Brush, Border, undefined, (d, args) => (<Border>d)._BorderBrushChanged(args));
        static BorderThicknessProperty: DependencyProperty = DependencyProperty.RegisterFull("BorderThickness", () => Thickness, Border, undefined, (d, args) => (<Border>d)._BorderThicknessChanged(args)); //TODO: Validator
        static ChildProperty: DependencyProperty = DependencyProperty.Register("Child", () => UIElement, Border, undefined, (d, args) => (<Border>d)._ChildChanged(args));
        static CornerRadiusProperty: DependencyProperty = DependencyProperty.RegisterFull("CornerRadius", () => CornerRadius, Border); //TODO: Validator
        static PaddingProperty: DependencyProperty = DependencyProperty.RegisterFull("Padding", () => Thickness, Border, undefined, (d, args) => (<Border>d)._PaddingChanged(args)); //TODO: Validator
        Background: Media.Brush;
        BorderBrush: Media.Brush;
        BorderThickness: Thickness;
        Child: UIElement;
        CornerRadius: CornerRadius;
        Padding: Thickness;

        private _BackgroundListener: Media.IBrushChangedListener;
        private _BorderBrushListener: Media.IBrushChangedListener;

        static Annotations = { ContentProperty: Border.ChildProperty }
        
        _MeasureOverride(availableSize: size, error: BError): size {
            var padding = this.Padding;
            var borderThickness = this.BorderThickness;
            var border: Thickness = null;
            if (padding && borderThickness) {
                border = padding.Plus(borderThickness);
            } else if (padding) {
                border = padding.Clone();
            } else if (borderThickness) {
                border = borderThickness.Clone();
            }

            var desired = new size();
            if (border) availableSize = size.shrinkByThickness(size.copyTo(availableSize), border);

            var child = this.Child;
            if (child) {
                var lu = child.XamlNode.LayoutUpdater;
                lu._Measure(availableSize, error);
                desired = size.copyTo(lu.DesiredSize);
            }
            if (border) size.growByThickness(desired, border);
            size.min(desired, availableSize);
            return desired;
        }
        _ArrangeOverride(finalSize: size, error: BError): size {
            var child = this.Child;
            if (child) {
                var padding = this.Padding;
                var borderThickness = this.BorderThickness;
                var border: Thickness = null;
                if (padding && borderThickness) {
                    border = padding.Plus(borderThickness);
                } else if (padding) {
                    border = padding;
                } else if (borderThickness) {
                    border = borderThickness;
                }

                var childRect = rect.fromSize(finalSize);
                if (border) rect.shrinkByThickness(childRect, border);
                child.XamlNode.LayoutUpdater._Arrange(childRect, error);
                /*
                arranged = size.fromRect(childRect);
                if (border) size.growByThickness(arranged, border);
                size.max(arranged, finalSize);
                */
            }
            return finalSize;
        }

        private _ChildChanged(args: IDependencyPropertyChangedEventArgs) {
            var olduie = <UIElement>args.OldValue;
            var newuie = <UIElement>args.NewValue;
            var node = this.XamlNode;
            var error = new BError();
            if (olduie instanceof UIElement)
                node.DetachVisualChild(olduie, error);
            if (newuie instanceof UIElement)
                node.AttachVisualChild(newuie, error);
            if (error.Message)
                error.ThrowException();
            var lu = node.LayoutUpdater;
            lu.UpdateBounds();
            lu.InvalidateMeasure();
        }
        private _BackgroundChanged(args: IDependencyPropertyChangedEventArgs) {
            var lu = this.XamlNode.LayoutUpdater;

            var newBrush = <Media.Brush>args.NewValue;
            if (this._BackgroundListener)
                this._BackgroundListener.Detach();
                this._BackgroundListener = null;
            if (newBrush)
                this._BackgroundListener = newBrush.Listen((brush) => lu.Invalidate());
            
            lu.CanHitElement = newBrush != null || this.BorderBrush != null;
            lu.Invalidate();
        }
        private _BorderBrushChanged(args: IDependencyPropertyChangedEventArgs) {
            var lu = this.XamlNode.LayoutUpdater;

            var newBrush = <Media.Brush>args.NewValue;
            if (this._BorderBrushListener)
                this._BorderBrushListener.Detach();
                this._BorderBrushListener = null;
            if (newBrush)
                this._BorderBrushListener = newBrush.Listen((brush) => lu.Invalidate());

            lu.CanHitElement = newBrush != null || this.Background != null;
            lu.Invalidate();
        }
        private _BorderThicknessChanged(args: IDependencyPropertyChangedEventArgs) {
            this.XamlNode.LayoutUpdater.InvalidateMeasure();
        }
        private _PaddingChanged(args: IDependencyPropertyChangedEventArgs) {
            this.XamlNode.LayoutUpdater.InvalidateMeasure();
        }

        private Render(ctx: RenderContext, lu:LayoutUpdater, region: rect) {
            var borderBrush = this.BorderBrush;
            var extents = lu.Extents;
            var backgroundBrush = this.Background;

            if (!backgroundBrush && !borderBrush)
                return;
            if (rect.isEmpty(extents))
                return;

            var thickness = this.BorderThickness;

            var fillOnly = !borderBrush || !thickness || thickness.IsEmpty();
            if (fillOnly && !backgroundBrush)
                return;
            ctx.Save();
            lu.RenderLayoutClip(ctx);
            if (fillOnly)
                this._RenderFillOnly(ctx, extents, backgroundBrush, thickness, this.CornerRadius);
            else if (thickness && thickness.IsBalanced())
                this._RenderBalanced(ctx, extents, backgroundBrush, borderBrush, thickness, this.CornerRadius);
            else
                this._RenderUnbalanced(ctx, extents, backgroundBrush, borderBrush, thickness, this.CornerRadius);
            ctx.Restore();
        }
        private _RenderFillOnly(ctx: RenderContext, extents: rect, backgroundBrush: Media.Brush, thickness: Thickness, cornerRadius: CornerRadius) {
            var fillExtents = rect.copyTo(extents);
            if (thickness) rect.shrinkByThickness(fillExtents, thickness);

            if (!cornerRadius || cornerRadius.IsZero()) {
                ctx.FillRect(backgroundBrush, fillExtents);
                return;
            }

            var rawPath = new Shapes.RawPath();
            rawPath.RoundedRectFull(fillExtents.X, fillExtents.Y, fillExtents.Width, fillExtents.Height,
                cornerRadius.TopLeft, cornerRadius.TopRight, cornerRadius.BottomRight, cornerRadius.BottomLeft);
            rawPath.DrawRenderCtx(ctx);
            ctx.Fill(backgroundBrush, fillExtents);
        }
        private _RenderBalanced(ctx: RenderContext, extents: rect, backgroundBrush: Media.Brush, borderBrush: Media.Brush, thickness: Thickness, cornerRadius: CornerRadius) {
            //Stroke renders half-out/half-in the path, Border control needs to fit within the given extents so we need to shrink by half the border thickness
            var full = thickness.Left;
            var half = full * 0.5;
            var strokeExtents = rect.copyTo(extents);
            rect.shrinkBy(strokeExtents, half, half, half, half);
            var fillExtents = rect.copyTo(extents);
            rect.shrinkBy(fillExtents, full, full, full, full);

            if (!cornerRadius || cornerRadius.IsZero()) {
                //Technically this fills outside it's fill extents, we may need to do something different for a transparent border brush
                if (backgroundBrush) {
                    ctx.StrokeAndFillRect(borderBrush, thickness.Left, strokeExtents, backgroundBrush, fillExtents);
                } else {
                    ctx.Rect(fillExtents);
                    ctx.Stroke(borderBrush, thickness.Left, extents);
                }
            } else {
                var rawPath = new Shapes.RawPath();
                rawPath.RoundedRectFull(strokeExtents.X, strokeExtents.Y, strokeExtents.Width, strokeExtents.Height,
                    cornerRadius.TopLeft, cornerRadius.TopRight, cornerRadius.BottomRight, cornerRadius.BottomLeft);
                rawPath.DrawRenderCtx(ctx);
                if (backgroundBrush)
                    ctx.Fill(backgroundBrush, fillExtents);
                ctx.Stroke(borderBrush, thickness.Left, extents);
            }
        }
        private _RenderUnbalanced(ctx: RenderContext, extents: rect, backgroundBrush: Media.Brush, borderBrush: Media.Brush, thickness: Thickness, cornerRadius: CornerRadius) {
            var hasCornerRadius = cornerRadius && !cornerRadius.IsZero();
            var innerExtents = rect.copyTo(extents);
            if (thickness) rect.shrinkByThickness(innerExtents, thickness);

            var innerPath = new Fayde.Shapes.RawPath();
            var outerPath = new Fayde.Shapes.RawPath();
            if (hasCornerRadius) {
                outerPath.RoundedRectFull(0, 0, extents.Width, extents.Height,
                    cornerRadius.TopLeft, cornerRadius.TopRight, cornerRadius.BottomRight, cornerRadius.BottomLeft);
                innerPath.RoundedRectFull(innerExtents.X - extents.X, innerExtents.Y - extents.Y, innerExtents.Width, innerExtents.Height,
                    cornerRadius.TopLeft, cornerRadius.TopRight, cornerRadius.BottomRight, cornerRadius.BottomLeft);
            } else {
                outerPath.Rect(0, 0, extents.Width, extents.Height);
                innerPath.Rect(innerExtents.X - extents.X, innerExtents.Y - extents.Y, innerExtents.Width, innerExtents.Height);
            }

            var tmpCanvas = <HTMLCanvasElement>document.createElement("canvas");
            tmpCanvas.width = extents.Width;
            tmpCanvas.height = extents.Height;
            var tmpCtx = tmpCanvas.getContext("2d");

            outerPath.DrawCanvasCtx(tmpCtx);
            borderBrush.SetupBrush(tmpCtx, extents);
            tmpCtx.fillStyle = borderBrush.ToHtml5Object();
            tmpCtx.fill();

            tmpCtx.globalCompositeOperation = "xor";
            innerPath.DrawCanvasCtx(tmpCtx);
            tmpCtx.fill();

            ctx.CanvasContext.drawImage(tmpCanvas, extents.X, extents.Y);
            //DrawDebug("Draw Image (Border)");

            innerPath.DrawRenderCtx(ctx);
            if (backgroundBrush)
                ctx.Fill(backgroundBrush, innerExtents);
        }
    }
    Fayde.Declare(Border)
        .Namespace("Fayde.Controls", Fayde.XMLNS)
        .Name("Border")
        .Register();
}