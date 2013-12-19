/// <reference path="../Core/FrameworkElement.ts" />

module Fayde.Shapes {
    export class Shape extends FrameworkElement {
        CreateLayoutUpdater() { return new ShapeLayoutUpdater(this); }

        private static _StrokePropertyChanged(dobj: DependencyObject, args: IDependencyPropertyChangedEventArgs) {
            var shape = <Shape>dobj;
            var lu = <ShapeLayoutUpdater>shape.XamlNode.LayoutUpdater;
            lu[args.Property.Name] = args.NewValue;
        }

        static FillProperty: DependencyProperty = DependencyProperty.Register("Fill", () => Media.Brush, Shape, undefined, (d, args) => (<Shape>d)._FillChanged(args));
        //http://msdn.microsoft.com/en-us/library/system.windows.shapes.shape.stretch(v=vs.95).aspx
        static StretchProperty: DependencyProperty = DependencyProperty.Register("Stretch", () => new Enum(Media.Stretch), Shape, Media.Stretch.None, (d, args) => (<Shape>d)._StretchChanged(args));
        static StrokeProperty: DependencyProperty = DependencyProperty.Register("Stroke", () => Media.Brush, Shape, undefined, (d, args) => (<Shape>d)._StrokeChanged(args));
        static StrokeThicknessProperty: DependencyProperty = DependencyProperty.Register("StrokeThickness", () => Number, Shape, 1.0, Shape._StrokePropertyChanged);
        static StrokeDashArrayProperty: DependencyProperty = DependencyProperty.Register("StrokeDashArray", () => DoubleCollection, Shape, undefined, Shape._StrokePropertyChanged);
        static StrokeDashCapProperty: DependencyProperty = DependencyProperty.Register("StrokeDashCap", () => new Enum(PenLineCap), Shape, PenLineCap.Flat, Shape._StrokePropertyChanged);
        static StrokeDashOffsetProperty: DependencyProperty = DependencyProperty.Register("StrokeDashOffset", () => Number, Shape, 0.0, (d, args) => Shape._StrokePropertyChanged);
        static StrokeEndLineCapProperty: DependencyProperty = DependencyProperty.Register("StrokeEndLineCap", () => new Enum(PenLineCap), Shape, PenLineCap.Flat, Shape._StrokePropertyChanged);
        static StrokeLineJoinProperty: DependencyProperty = DependencyProperty.Register("StrokeLineJoin", () => new Enum(PenLineJoin), Shape, PenLineJoin.Miter, Shape._StrokePropertyChanged);
        static StrokeMiterLimitProperty: DependencyProperty = DependencyProperty.Register("StrokeMiterLimit", () => Number, Shape, 10.0, Shape._StrokePropertyChanged);
        static StrokeStartLineCapProperty: DependencyProperty = DependencyProperty.Register("StrokeStartLineCap", () => new Enum(PenLineCap), Shape, PenLineCap.Flat, Shape._StrokePropertyChanged);
        Fill: Media.Brush;
        Stretch: Media.Stretch;
        Stroke: Media.Brush;
        StrokeThickness: number;
        StrokeDashArray: DoubleCollection;
        StrokeDashCap: PenLineCap;
        StrokeDashOffset: number;
        StrokeEndLineCap: PenLineCap;
        StrokeLineJoin: PenLineJoin;
        StrokeMiterLimit: number;
        StrokeStartLineCap: PenLineCap;
        //NOTE: HTML5 Canvas does not support start and end cap. Will use start if it's not "Flat"; otherwise, use end
        
        private _FillListener: Media.IBrushChangedListener;
        private _FillChanged(args: IDependencyPropertyChangedEventArgs) {
            var newBrush = <Media.Brush>args.NewValue;
            if (this._FillListener)
                this._FillListener.Detach();
                this._FillListener = null;
            if (newBrush)
                this._FillListener = newBrush.Listen((brush) => lu.Invalidate());
            
            var lu = <ShapeLayoutUpdater>this.XamlNode.LayoutUpdater;
            if (lu.Fill || newBrush)
                lu.InvalidateNaturalBounds();
            lu.Fill = newBrush;
            lu.CanHitElement = !!lu.Stroke || !!lu.Fill;
        }
        private _StrokeListener: Media.IBrushChangedListener;
        private _StrokeChanged(args: IDependencyPropertyChangedEventArgs) {
            var newBrush = <Media.Brush>args.NewValue;
            if (this._StrokeListener)
                this._StrokeListener.Detach();
                this._StrokeListener = null;
            if (newBrush)
                this._StrokeListener = newBrush.Listen((brush) => lu.Invalidate());
            
            var lu = <ShapeLayoutUpdater>this.XamlNode.LayoutUpdater;
            if (lu.Stroke || newBrush)
                lu.InvalidateNaturalBounds();
            lu.Stroke = newBrush;
            lu.CanHitElement = !!lu.Stroke || !!lu.Fill;
        }
        private _StretchChanged(args: IDependencyPropertyChangedEventArgs) {
            var lu = <ShapeLayoutUpdater>this.XamlNode.LayoutUpdater;
            lu.InvalidateMeasure();
            lu.InvalidateStretch();
        }

        _WidthChanged(args: IDependencyPropertyChangedEventArgs) {
            super._WidthChanged(args);
            var lu = <ShapeLayoutUpdater>this.XamlNode.LayoutUpdater;
            lu.InvalidateStretch();
        }
        _HeightChanged(args: IDependencyPropertyChangedEventArgs) {
            super._HeightChanged(args);
            var lu = <ShapeLayoutUpdater>this.XamlNode.LayoutUpdater;
            lu.InvalidateStretch();
        }

    }
    Fayde.RegisterType(Shape, {
    	Name: "Shape",
    	Namespace: "Fayde.Shapes",
    	XmlNamespace: Fayde.XMLNS
    });

    export class ShapeLayoutUpdater extends LayoutUpdater {
        NaturalBounds = new rect();
        StretchXform = mat3.identity();
        Path: Fayde.Path.RawPath = null;
        SFlags = ShapeFlags.None;

        Stroke: Media.Brush = null;
        Fill: Media.Brush = null;
        Stretch: Media.Stretch = Media.Stretch.None;
        FillRule: FillRule = FillRule.NonZero;
        StrokeThickness: number = 0;
        StrokeStartLineCap = PenLineCap.Flat;
        StrokeEndLineCap = PenLineCap.Flat;
        StrokeLineJoin = PenLineJoin.Miter;
        StrokeMiterLimit = 10;
        StrokeDashArray: DoubleCollection = null;
        StrokeDashCap = PenLineCap.Flat;
        StrokeDashOffset: number = 0;
        

        GetFillRule(): string {
            return this.FillRule === FillRule.EvenOdd ? "evenodd" : "nonzero";
        }
        GetBrushSize(): ISize {
            return size.fromRect(this.GetStretchExtents());
        }
        

        MeasureOverride(availableSize: size, error: BError): size {
            var shapeBounds = this.GetNaturalBounds();
            if (!shapeBounds)
                return new size();
            var sx = 0.0;
            var sy = 0.0;

            var desired = size.copyTo(availableSize);
            var stretch = this.Stretch;
            if (stretch === Media.Stretch.None) {
                return size.fromRaw(shapeBounds.X + shapeBounds.Width, shapeBounds.Y + shapeBounds.Height);
            }

            if (!isFinite(availableSize.Width))
                desired.Width = shapeBounds.Width;
            if (!isFinite(availableSize.Height))
                desired.Height = shapeBounds.Height;

            if (shapeBounds.Width > 0)
                sx = desired.Width / shapeBounds.Width;
            if (shapeBounds.Height > 0)
                sy = desired.Height / shapeBounds.Height;

            if (!isFinite(availableSize.Width))
                sx = sy;
            if (!isFinite(availableSize.Height))
                sy = sx;

            switch (stretch) {
                case Media.Stretch.Uniform:
                    sx = sy = Math.min(sx, sy);
                    break;
                case Media.Stretch.UniformToFill:
                    sx = sy = Math.max(sx, sy);
                    break;
                case Media.Stretch.Fill:
                    if (!isFinite(availableSize.Width))
                        sx = 1.0;
                    if (!isFinite(availableSize.Height))
                        sy = 1.0;
                    break;
                default:
                    break;
            }

            desired.Width = shapeBounds.Width * sx;
            desired.Height = shapeBounds.Height * sy;
            return desired;
        }
        ArrangeOverride(finalSize: size, error: BError): size {
            var sx = 1.0;
            var sy = 1.0;

            var shapeBounds = this.GetNaturalBounds();
            if (!shapeBounds)
                return new size();

            this.InvalidateStretch();

            var arranged;
            var stretch = this.Stretch;
            if (stretch === Fayde.Media.Stretch.None) {
                arranged = size.fromRaw(Math.max(finalSize.Width, shapeBounds.X + shapeBounds.Width), Math.max(finalSize.Height, shapeBounds.Y + shapeBounds.Height));
            } else {
                arranged = size.copyTo(finalSize);
            }

            if (shapeBounds.Width === 0)
                shapeBounds.Width = arranged.Width;
            if (shapeBounds.Height === 0)
                shapeBounds.Height = arranged.Height;

            if (shapeBounds.Width !== arranged.Width)
                sx = arranged.Width / shapeBounds.Width;
            if (shapeBounds.Height !== arranged.Height)
                sy = arranged.Height / shapeBounds.Height;

            switch (stretch) {
                case Fayde.Media.Stretch.Uniform:
                    sx = sy = Math.min(sx, sy);
                    break;
                case Fayde.Media.Stretch.UniformToFill:
                    sx = sy = Math.max(sx, sy);
                    break;
                default:
                    break;
            }

            arranged.Width = shapeBounds.Width * sx;
            arranged.Height = shapeBounds.Height * sy;
            return arranged;
        }


        InvalidateNaturalBounds() {
            rect.clear(this.NaturalBounds);
            this.InvalidateStretch();
            this.Invalidate();
        }
        InvalidateStretch() {
            rect.clear(this.Extents);
            rect.clear(this.ExtentsWithChildren);
            this.StretchXform = mat3.identity();
            this.InvalidatePathCache();
        }
        InvalidatePathCache(free?: boolean) {
            this.Path = null;
            if (!free)
                this.UpdateBounds(true);
        }

        ComputeBounds() {
            intersectBaseBoundsWithClipPath(this, this.Bounds, this.GetStretchExtents(), this.AbsoluteXform);
            rect.copyTo(this.Bounds, this.BoundsWithChildren);
            this.ComputeGlobalBounds();
            this.ComputeSurfaceBounds();
        }
        GetStretchExtents() {
            if (rect.isEmpty(this.Extents)) {
                rect.copyTo(this.ComputeStretchBounds(), this.Extents);
                rect.copyTo(this.Extents, this.ExtentsWithChildren);
            }
            return this.Extents;
        }
        GetNaturalBounds(): rect {
            if (rect.isEmpty(this.NaturalBounds))
                this.NaturalBounds = this.ComputeShapeBoundsImpl(false);
            return this.NaturalBounds;
        }

        ComputeStretchBounds(): rect {
            var shapeBounds = this.GetNaturalBounds();
            if (!shapeBounds || shapeBounds.Width <= 0.0 || shapeBounds.Height <= 0.0) {
                this.SFlags = ShapeFlags.Empty;
                return new rect();
            }

            var node = this.Node;
            var shape = <Shape>node.XObject;

            var specified = size.fromRaw(shape.Width, shape.Height);

            if (specified.Width <= 0.0 || specified.Height <= 0.0) {
                this.SFlags = ShapeFlags.Empty;
                return new rect();
            }

            var framework = size.fromRaw(this.ActualWidth, this.ActualHeight);
            if (node.VisualParentNode instanceof Controls.CanvasNode) {
                framework.Width = framework.Width === 0.0 ? shapeBounds.Width : framework.Width;
                framework.Height = framework.Height === 0.0 ? shapeBounds.Height : framework.Height;
                if (!isNaN(specified.Width))
                    framework.Width = specified.Width;
                if (!isNaN(specified.Height))
                    framework.Height = specified.Height;
            } else if (!this.PreviousConstraint) {
                framework.Width = framework.Width === 0.0 ? shapeBounds.Width : framework.Width;
                framework.Height = framework.Height === 0.0 ? shapeBounds.Height : framework.Height;
            }

            var stretch = this.Stretch;
            if (stretch === Fayde.Media.Stretch.None) {
                rect.transform(shapeBounds, this.StretchXform);
                return shapeBounds;
            }

            if (framework.Width === 0.0 || framework.Height === 0.0) {
                this.SFlags = ShapeFlags.Empty;
                return new rect();
            }

            var logicalBounds = this.ComputeShapeBoundsImpl(true);

            var adjX = logicalBounds.Width !== 0.0;
            var adjY = logicalBounds.Height !== 0.0;

            var diffX = shapeBounds.Width - logicalBounds.Width;
            var diffY = shapeBounds.Height - logicalBounds.Height;
            var sw = adjX ? (framework.Width - diffX) / logicalBounds.Width : 1.0;
            var sh = adjY ? (framework.Height - diffY) / logicalBounds.Height : 1.0;

            var center = false;
            switch (stretch) {
                case Media.Stretch.Fill:
                    center = true;
                    break;
                case Media.Stretch.Uniform:
                    sw = sh = (sw < sh) ? sw : sh;
                    center = true;
                    break;
                case Media.Stretch.UniformToFill:
                    sw = sh = (sw > sh) ? sw : sh;
                    break;
            }

            if ((adjX && isSignificant(sw - 1, shapeBounds.Width)) || (adjY && isSignificant(sh - 1, shapeBounds.Height))) {
                var temp = mat3.createScale(adjX ? sw : 1.0, adjY ? sh : 1.0);
                var stretchBounds = this.ComputeShapeBoundsImpl(false, temp);
                if (stretchBounds.Width !== shapeBounds.Width && stretchBounds.Height !== shapeBounds.Height) {
                    sw *= adjX ? (framework.Width - stretchBounds.Width + logicalBounds.Width * sw) / (logicalBounds.Width * sw) : 1.0;
                    sh *= adjY ? (framework.Height - stretchBounds.Height + logicalBounds.Height * sh) / (logicalBounds.Height * sh) : 1.0;
                    switch (stretch) {
                        case Media.Stretch.Uniform:
                            sw = sh = (sw < sh) ? sw : sh;
                            break;
                        case Media.Stretch.UniformToFill:
                            sw = sh = (sw > sh) ? sw : sh;
                            break;
                    }
                }
            }

            var autoDim = isNaN(specified.Width);
            var x = (!autoDim || adjX) ? shapeBounds.X : 0;
            var y = (!autoDim || adjY) ? shapeBounds.Y : 0;

            var st = this.StretchXform;
            if (!(this instanceof Line) || !autoDim)
                mat3.translate(st, -x, -y);
            mat3.translate(st,
                adjX ? -shapeBounds.Width * 0.5 : 0.0,
                adjY ? -shapeBounds.Height * 0.5 : 0.0);
            mat3.scale(st,
                adjX ? sw : 1.0,
                adjY ? sh : 1.0);
            if (center) {
                mat3.translate(st,
                    adjX ? framework.Width * 0.5 : 0,
                    adjY ? framework.Height * 0.5 : 0);
            } else {
                mat3.translate(st,
                    adjX ? (logicalBounds.Width * sw + diffX) * 0.5 : 0,
                    adjY ? (logicalBounds.Height * sh + diffY) * 0.5 : 0);
            }

            rect.transform(shapeBounds, this.StretchXform = st);
            return shapeBounds;
        }
        ComputeShapeBounds(logical: boolean): rect { return this.ComputeShapeBoundsImpl(logical); }
        ComputeShapeBoundsImpl(logical: boolean, matrix?: number[]): rect {
            this.Path = this.Path || this.BuildPath();
            if (!this.Path || (this.SFlags & ShapeFlags.Empty))
                return new rect();
            return this.Path.CalculateBounds(this.CreateStrokeParameters(logical));
        }

        ComputeActualSize() {
            var desired = super.ComputeActualSize();

            var shapeBounds = this.GetNaturalBounds();
            var sx = 1.0;
            var sy = 1.0;

            var node = this.Node;
            var visualParentNode = node.VisualParentNode;
            if (visualParentNode != null && !(visualParentNode instanceof Controls.CanvasNode)) {
                if (this.PreviousConstraint !== undefined || this.LayoutSlot !== undefined) {
                    return desired;
                }
            }

            if (!node.IsAttached)
                return desired;

            if (shapeBounds.Width <= 0 && shapeBounds.Height <= 0)
                return desired;

            var stretch = this.Stretch;
            if (stretch === Media.Stretch.None && shapeBounds.Width > 0 && shapeBounds.Height > 0)
                return size.fromRect(shapeBounds);

            if (!isFinite(desired.Width))
                desired.Width = shapeBounds.Width;
            if (!isFinite(desired.Height))
                desired.Height = shapeBounds.Height;

            if (shapeBounds.Width > 0)
                sx = desired.Width / shapeBounds.Width;
            if (shapeBounds.Height > 0)
                sy = desired.Height / shapeBounds.Height;

            switch (stretch) {
                case Media.Stretch.Uniform:
                    sx = sy = Math.min(sx, sy);
                    break;
                case Media.Stretch.UniformToFill:
                    sx = sy = Math.max(sx, sy);
                    break;
                default:
                    break;
            }

            desired.Width = Math.min(desired.Width, shapeBounds.Width * sx);
            desired.Height = Math.min(desired.Height, shapeBounds.Height * sy);
            return desired;
        }

        InsideObject(ctx: RenderContextEx, x: number, y: number): boolean {
            if (super.InsideObject(ctx, x, y))
                return true;
            var extents = rect.copyTo(this.GetStretchExtents());
            rect.transform(extents, ctx.currentTransform);
            if (!rect.containsPointXY(extents, x, y))
                return false;
            return this.InsideShape(ctx, x, y);
        }
        InsideShape(ctx: RenderContextEx, x: number, y: number): boolean {
            if (this.SFlags & ShapeFlags.Empty)
                return false;
            if (!this.Fill && !this.Stroke)
                return false;
            ctx.save();
            ctx.pretransformMatrix(this.StretchXform);
            this.Draw(ctx);
            var ret = false;
            if (this.Fill) {
                ret = ctx.isPointInPath(x, y);
            } else if (!ret) {
                ret = ctx.isPointInStrokeEx(this.CreateStrokeParameters(), x, y);
            }
            ctx.restore();
            return ret;
        }

        Render(ctx: RenderContextEx, region: rect) {
            if (this.SFlags & ShapeFlags.Empty)
                return;
            if (!this.Fill && !this.Stroke)
                return false;
            var area = this.GetStretchExtents();
            ctx.save();
            ctx.pretransformMatrix(this.StretchXform);
            this.Draw(ctx);
            if (!!this.Fill)
                ctx.fillEx(this.Fill, area, this.GetFillRule());
            ctx.strokeEx(this.Stroke, this.CreateStrokeParameters(), area);
            ctx.restore();
        }

        Draw(ctx: RenderContextEx) {
            this.Path = this.Path || this.BuildPath();
            this.Path.Draw(ctx);
        }
        BuildPath(): Fayde.Path.RawPath { return undefined; }

        CreateStrokeParameters(logical?: boolean): Fayde.Path.IStrokeParameters {
            var thickness = (logical || !!this.Stroke) ? 0.0 : this.StrokeThickness;
            if (!(thickness > 0))
                return;
            return {
                thickness: thickness,
                startCap: this.StrokeStartLineCap,
                endCap: this.StrokeEndLineCap,
                join: this.StrokeLineJoin,
                miterLimit: this.StrokeMiterLimit
            };
        }
    }

    function isSignificant(dx: number, x: number): boolean {
        return Math.abs(x) < 0.000019 && (Math.abs(dx) * x - x) > 1.0;
    }
    function intersectBaseBoundsWithClipPath(lu: LayoutUpdater, dest: rect, baseBounds: rect, xform: number[]) {
        var isClipEmpty = rect.isEmpty(lu.ClipBounds);
        var isLayoutClipEmpty = lu.LayoutClip ? rect.isEmpty(lu.LayoutClip) : true;

        if ((!isClipEmpty || !isLayoutClipEmpty) && !lu.TotalIsRenderVisible) {
            rect.clear(dest);
            return;
        }

        rect.copyGrowTransform(dest, baseBounds, lu.EffectPadding, xform);

        if (!isClipEmpty)
            rect.intersection(dest, lu.ClipBounds);
        if (!isLayoutClipEmpty)
            rect.intersection(dest, lu.LayoutClip);
    }
}