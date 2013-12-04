/// <reference path="../Core/FrameworkElement.ts" />

module Fayde.Controls {
    export class BorderNode extends FENode {
        XObject: Border;
        constructor(xobj: Border) {
            super(xobj);
            this.LayoutUpdater.SetContainerMode(true);
        }
    }
    Fayde.RegisterType(BorderNode, {
        Name: "BorderNode",
        Namespace: "Fayde.Controls"
    });

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

        private Render(ctx: RenderContext, lu: LayoutUpdater, region: rect) {
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
            render(ctx, extents, backgroundBrush, borderBrush, thickness, this.CornerRadius);
            ctx.Restore();
        }
    }
    Fayde.RegisterType(Border, {
        Name: "Border",
        Namespace: "Fayde.Controls",
        XmlNamespace: Fayde.XMLNS
    });

    function render(rctx: RenderContext, extents: rect, backgroundBrush: Media.Brush, borderBrush: Media.Brush, thickness: Thickness, cornerRadius?: CornerRadius) {
        thickness = thickness || new Thickness();
        var ia = cornerRadius ? cornerRadius.Clone() : new CornerRadius();
        ia.TopLeft = Math.max(ia.TopLeft - Math.max(thickness.Left, thickness.Top) * 0.5, 0);
        ia.TopRight = Math.max(ia.TopRight - Math.max(thickness.Right, thickness.Top) * 0.5, 0);
        ia.BottomRight = Math.max(ia.BottomRight - Math.max(thickness.Right, thickness.Bottom) * 0.5, 0);
        ia.BottomLeft = Math.max(ia.BottomLeft - Math.max(thickness.Left, thickness.Bottom) * 0.5, 0);

        var oa = cornerRadius ? cornerRadius.Clone() : new CornerRadius();
        oa.TopLeft = oa.TopLeft ? Math.max(oa.TopLeft + Math.max(thickness.Left, thickness.Top) * 0.5, 0) : 0;
        oa.TopRight = oa.TopRight ? Math.max(oa.TopRight + Math.max(thickness.Right, thickness.Top) * 0.5, 0) : 0;
        oa.BottomRight = oa.BottomRight ? Math.max(oa.BottomRight + Math.max(thickness.Right, thickness.Bottom) * 0.5, 0) : 0;
        oa.BottomLeft = oa.BottomLeft ? Math.max(oa.BottomLeft + Math.max(thickness.Left, thickness.Bottom) * 0.5, 0) : 0;

        var fillExtents = rect.shrinkByThickness(extents.Clone(), thickness);

        var ctx = rctx.CanvasContext;
        ctx.beginPath();
        if (borderBrush && !rect.isEmpty(extents)) {
            borderBrush.SetupBrush(ctx, extents);
            ctx.fillStyle = borderBrush.ToHtml5Object();
            drawRect(ctx, extents, oa);
            drawRect(ctx, fillExtents, ia);
            ctx.fill("evenodd");
        }
        ctx.beginPath();
        if (backgroundBrush && !rect.isEmpty(fillExtents)) {
            backgroundBrush.SetupBrush(ctx, fillExtents);
            ctx.fillStyle = backgroundBrush.ToHtml5Object();
            drawRect(ctx, fillExtents, ia);
            ctx.fill("evenodd");
        }
    }
    var ARC_TO_BEZIER = 0.55228475;
    function drawRect(ctx: CanvasRenderingContext2D, extents: rect, cr?: CornerRadius) {
        if (!cr || cr.IsZero()) {
            ctx.rect(extents.X, extents.Y, extents.Width, extents.Height);
            return;
        }

        var top_adj = Math.max(cr.TopLeft + cr.TopRight - extents.Width, 0) / 2;
        var bottom_adj = Math.max(cr.BottomLeft + cr.BottomRight - extents.Width, 0) / 2;
        var left_adj = Math.max(cr.TopLeft + cr.BottomLeft - extents.Height, 0) / 2;
        var right_adj = Math.max(cr.TopRight + cr.BottomRight - extents.Height, 0) / 2;

        var tlt = cr.TopLeft - top_adj;
        ctx.moveTo(extents.X + tlt, extents.Y);

        var trt = cr.TopRight - top_adj;
        var trr = cr.TopRight - right_adj;
        ctx.lineTo(extents.X + extents.Width - trt, extents.Y);
        ctx.bezierCurveTo(
            extents.X + extents.Width - trt + trt * ARC_TO_BEZIER, extents.Y,
            extents.X + extents.Width, extents.Y + trr - trr * ARC_TO_BEZIER,
            extents.X + extents.Width, extents.Y + trr);

        var brr = cr.BottomRight - right_adj;
        var brb = cr.BottomRight - bottom_adj;
        ctx.lineTo(extents.X + extents.Width, extents.Y + extents.Height - brr);
        ctx.bezierCurveTo(
            extents.X + extents.Width, extents.Y + extents.Height - brr + brr * ARC_TO_BEZIER,
            extents.X + extents.Width + brb * ARC_TO_BEZIER - brb, extents.Y + extents.Height,
            extents.X + extents.Width - brb, extents.Y + extents.Height);

        var blb = cr.BottomLeft - bottom_adj;
        var bll = cr.BottomLeft - left_adj;
        ctx.lineTo(extents.X + blb, extents.Y + extents.Height);
        ctx.bezierCurveTo(
            extents.X + blb - blb * ARC_TO_BEZIER, extents.Y + extents.Height,
            extents.X, extents.Y + extents.Height - bll + bll * ARC_TO_BEZIER,
            extents.X, extents.Y + extents.Height - bll);

        var tll = cr.TopLeft - left_adj;
        ctx.lineTo(extents.X, extents.Y + tll);
        ctx.bezierCurveTo(
            extents.X, extents.Y + tll - tll * ARC_TO_BEZIER,
            extents.X + tlt - tlt * ARC_TO_BEZIER, extents.Y,
            extents.X + tlt, extents.Y);
    }
}