/// <reference path="../Core/FrameworkElement.ts" />
/// <reference path="../Xaml/ContentAnnotation.ts" />

module Fayde.Controls {
    export class Border extends FrameworkElement {
        CreateLayoutUpdater(node: UINode) { return new BorderLayoutUpdater(node); }

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
    }
    Fayde.RegisterType(Border, "Fayde.Controls", Fayde.XMLNS);
    Xaml.Content(Border, Border.ChildProperty);

    export class BorderLayoutUpdater extends LayoutUpdater {
        private _Renderer: IBorderRenderer;

        constructor(node: UINode) {
            super(node);
            this.SetContainerMode(true);
        }

        MeasureOverride(availableSize: size, error: BError): size {
            var b = <Border>this.Node.XObject;
            var padding = b.Padding;
            var borderThickness = b.BorderThickness;
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

            var child = b.Child;
            if (child) {
                var lu = child.XamlNode.LayoutUpdater;
                lu._Measure(availableSize, error);
                desired = size.copyTo(lu.DesiredSize);
            }
            if (border) size.growByThickness(desired, border);
            size.min(desired, availableSize);
            return desired;
        }
        ArrangeOverride(finalSize: size, error: BError): size {
            var b = <Border>this.Node.XObject;
            var child = b.Child;
            if (child) {
                var padding = b.Padding;
                var borderThickness = b.BorderThickness;
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

        Render(ctx: RenderContextEx, region: rect) {
            var border = <Border>this.Node.XObject;
            var borderBrush = border.BorderBrush;
            var extents = this.Extents;
            var backgroundBrush = border.Background;

            if (!backgroundBrush && !borderBrush)
                return;
            if (rect.isEmpty(extents))
                return;

            var thickness = border.BorderThickness;

            var fillOnly = !borderBrush || !thickness || thickness.IsEmpty();
            if (fillOnly && !backgroundBrush)
                return;
            ctx.save();
            this.RenderLayoutClip(ctx);
            if (!this._Renderer)
                this._Renderer = getRenderer(ctx);
            this._Renderer.Initialize(extents, backgroundBrush, borderBrush, thickness, border.CornerRadius);
            this._Renderer.Render(ctx);
            ctx.restore();
        }
    }

    function getRenderer(ctx: RenderContextEx): IBorderRenderer {
        if (ctx.hasFillRule)
            return new BorderRenderer();
        return new BorderRendererShim();
    }
    interface IBorderRenderer {
        Initialize(extents: rect, backgroundBrush: Media.Brush, borderBrush: Media.Brush, thickness: Thickness, cr: CornerRadius)
        Render(ctx: RenderContextEx);
    }
    class BorderRenderer implements IBorderRenderer {
        Extents: rect;
        FillExtents: rect;
        BackgroundBrush: Media.Brush;
        BorderBrush: Media.Brush;
        Thickness: Thickness;
        InnerCornerRadius: CornerRadius;
        OuterCornerRadius: CornerRadius;

        Initialize(extents: rect, backgroundBrush: Media.Brush, borderBrush: Media.Brush, thickness: Thickness, cr: CornerRadius) {
            this.Thickness = thickness = thickness || new Thickness();
            this.Extents = extents;
            this.FillExtents = rect.shrinkByThickness(extents.Clone(), thickness);
            this.BackgroundBrush = backgroundBrush;
            this.BorderBrush = borderBrush;

            var ia = this.InnerCornerRadius = cr ? cr.Clone() : new CornerRadius();
            ia.TopLeft = Math.max(ia.TopLeft - Math.max(thickness.Left, thickness.Top) * 0.5, 0);
            ia.TopRight = Math.max(ia.TopRight - Math.max(thickness.Right, thickness.Top) * 0.5, 0);
            ia.BottomRight = Math.max(ia.BottomRight - Math.max(thickness.Right, thickness.Bottom) * 0.5, 0);
            ia.BottomLeft = Math.max(ia.BottomLeft - Math.max(thickness.Left, thickness.Bottom) * 0.5, 0);

            var oa = this.OuterCornerRadius = cr ? cr.Clone() : new CornerRadius();
            oa.TopLeft = oa.TopLeft ? Math.max(oa.TopLeft + Math.max(thickness.Left, thickness.Top) * 0.5, 0) : 0;
            oa.TopRight = oa.TopRight ? Math.max(oa.TopRight + Math.max(thickness.Right, thickness.Top) * 0.5, 0) : 0;
            oa.BottomRight = oa.BottomRight ? Math.max(oa.BottomRight + Math.max(thickness.Right, thickness.Bottom) * 0.5, 0) : 0;
            oa.BottomLeft = oa.BottomLeft ? Math.max(oa.BottomLeft + Math.max(thickness.Left, thickness.Bottom) * 0.5, 0) : 0;
        }
        Render(ctx: RenderContextEx) {
            var borderBrush = this.BorderBrush;
            var extents = this.Extents;
            var fillExtents = this.FillExtents;
            if (borderBrush && !rect.isEmpty(extents)) {
                ctx.beginPath();
                drawRect(ctx, extents, this.OuterCornerRadius);
                drawRect(ctx, fillExtents, this.InnerCornerRadius);
                ctx.fillEx(borderBrush, extents, "evenodd");
            }
            var backgroundBrush = this.BackgroundBrush;
            if (backgroundBrush && !rect.isEmpty(fillExtents)) {
                ctx.beginPath();
                drawRect(ctx, fillExtents, this.InnerCornerRadius);
                ctx.fillEx(backgroundBrush, fillExtents);
            }
        }
    }
    class BorderRendererShim extends BorderRenderer {
        Pattern: CanvasPattern;
        StrokeExtents: rect;
        MiddleCornerRadius: CornerRadius;

        Initialize(extents: rect, backgroundBrush: Media.Brush, borderBrush: Media.Brush, thickness: Thickness, cr: CornerRadius) {
            if (!thickness) {
                super.Initialize(extents, backgroundBrush, borderBrush, undefined, cr);
                return this.Pattern = null;
            }

            var ot = this.Thickness;
            var oextents = this.Extents;
            var ofillExtents = this.FillExtents;
            var oocr = this.OuterCornerRadius;
            var oicr = this.InnerCornerRadius;
            var obb = this.BorderBrush;

            super.Initialize(extents, backgroundBrush, borderBrush, thickness, cr);

            if (this.Thickness.IsBalanced()) {
                var icr = this.InnerCornerRadius;
                var ocr = this.OuterCornerRadius;
                this.MiddleCornerRadius = new CornerRadius(
                    (icr.TopLeft + ocr.TopLeft) / 2.0,
                    (icr.TopRight + ocr.TopRight) / 2.0,
                    (icr.BottomRight + ocr.BottomRight) / 2.0,
                    (icr.BottomLeft + ocr.BottomLeft) / 2.0);
                this.StrokeExtents = rect.shrinkBy(extents.Clone(), thickness.Left / 2.0, thickness.Top / 2.0, thickness.Right / 2.0, thickness.Bottom / 2.0);
            }

            if (!Thickness.Equals(ot, this.Thickness)
                || !rect.isEqual(oextents, this.Extents)
                || !rect.isEqual(ofillExtents, this.FillExtents)
                || !CornerRadius.Equals(oocr, this.OuterCornerRadius)
                || !CornerRadius.Equals(oicr, this.InnerCornerRadius)
                || obb !== this.BorderBrush)
                return this.Pattern = null;
        }
        Render(ctx: RenderContextEx) {
            var backgroundBrush = this.BackgroundBrush;
            if (!isBrushTransparent(backgroundBrush))
                return super.Render(ctx);
            var fillExtents = this.FillExtents;
            var icr = this.InnerCornerRadius;

            this.RenderBorder(ctx);
            if (backgroundBrush && !rect.isEmpty(fillExtents)) {
                ctx.beginPath();
                drawRect(ctx, fillExtents, icr);
                ctx.fillEx(backgroundBrush, fillExtents);
            }
        }
        private RenderBorder(ctx: RenderContextEx) {
            var borderBrush = this.BorderBrush;
            if (!borderBrush)
                return;
            var extents = this.Extents;
            if (rect.isEmpty(extents))
                return;

            var thickness = this.Thickness;
            if (thickness.IsBalanced()) {
                ctx.beginPath();
                drawRect(ctx, this.StrokeExtents, this.MiddleCornerRadius);
                ctx.strokeEx(borderBrush, { thickness: thickness.Left, endCap: 0, startCap: 0, miterLimit: 0, join: 0 }, this.StrokeExtents);
                return;
            }

            var ocr = this.OuterCornerRadius;
            var pattern = this.Pattern;
            if (!pattern) pattern = this.Pattern = createBorderPattern(ctx, borderBrush, extents, this.FillExtents, ocr, this.InnerCornerRadius);

            ctx.beginPath();
            ctx.fillStyle = pattern;
            drawRect(ctx, extents, ocr);
            ctx.fill();
        }
    }

    var ARC_TO_BEZIER = 0.55228475;
    function drawRect(ctx: RenderContextEx, extents: rect, cr?: CornerRadius) {
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
    function createBorderPattern(ctx: RenderContextEx, borderBrush: Media.Brush, extents: rect, fillExtents: rect, oa: CornerRadius, ia: CornerRadius): CanvasPattern {
        var tempCtx = ctx.createTemporaryContext(extents.Width, extents.Height);
        tempCtx.beginPath();
        drawRect(tempCtx, extents, oa);
        tempCtx.fillEx(borderBrush, extents);
        tempCtx.globalCompositeOperation = "xor";
        tempCtx.beginPath();
        drawRect(tempCtx, fillExtents, ia);
        tempCtx.fill();
        return tempCtx.createPattern(tempCtx.canvas, "no-repeat");
    }
    function isBrushTransparent(brush: Media.Brush) {
        if (!brush)
            return true;
        if (brush instanceof Media.SolidColorBrush)
            return (<Media.SolidColorBrush>brush).Color.A < 1.0;
        if (brush instanceof Media.LinearGradientBrush) {
            var enumerator = (<Media.LinearGradientBrush>brush).GradientStops.GetEnumerator();
            while (enumerator.moveNext()) {
                if (enumerator.Current.Color.A < 1.0)
                    return true;
            }
            return false;
        }
        return true;
    }
}