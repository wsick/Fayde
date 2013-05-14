/// <reference path="../Core/FrameworkElement.ts" />
/// CODE
/// <reference path="../Media/Brush.ts" />
/// <reference path="../Media/Enums.ts" />
/// <reference path="Enums.ts" />
/// <reference path="DoubleCollection.ts" />
/// <reference path="Rectangle.ts" />
/// <reference path="Ellipse.ts" />
/// <reference path="Line.ts" />

module Fayde.Shapes {
    declare var NotImplemented;

    export class ShapeNode extends FENode implements IBoundsComputable {
        XObject: Shape;
        constructor(xobj: Shape) {
            super(xobj);
        }

        _CanFindElement(): bool {
            var shape = this.XObject;
            return (<any>shape)._Fill != null || (<any>shape)._Stroke != null;
        }
        _InsideObject(ctx: RenderContext, lu: LayoutUpdater, x: number, y: number): bool {
            if (!this._InsideLayoutClip(lu, x, y))
                return false;
            if (!this._InsideClip(ctx, lu, x, y))
                return false;
            var p = new Point(x, y);
            lu.TransformPoint(p);
            x = p.X;
            y = p.Y;
            var shape = this.XObject;
            if (!rect.containsPointXY(this.GetStretchExtents(shape, lu), x, y))
                return false;
            return shape._InsideShape(ctx, lu, x, y);
        }

        ComputeBounds(baseComputer: () => void , lu: LayoutUpdater) {
            this.IntersectBaseBoundsWithClipPath(lu, lu.Bounds, this.GetStretchExtents(this.XObject, lu), lu.AbsoluteXform);
            rect.copyTo(lu.Bounds, lu.BoundsWithChildren);
            lu.ComputeGlobalBounds();
            lu.ComputeSurfaceBounds();
        }
        private IntersectBaseBoundsWithClipPath(lu: LayoutUpdater, dest: rect, baseBounds: rect, xform: number[]) {
            var isClipEmpty = rect.isEmpty(lu.ClipBounds);
            var isLayoutClipEmpty = rect.isEmpty(lu.LayoutClipBounds);

            if ((!isClipEmpty || !isLayoutClipEmpty) && !lu.TotalIsRenderVisible) {
                rect.clear(dest);
                return;
            }

            rect.copyGrowTransform(dest, baseBounds, lu.EffectPadding, xform);

            if (!isClipEmpty)
                rect.intersection(dest, lu.ClipBounds);
            if (!isLayoutClipEmpty)
                rect.intersection(dest, lu.LayoutClipBounds);
        }

        UpdateStretch() {
            var lu = this.LayoutUpdater;
            rect.clear(lu.Extents);
            rect.clear(lu.ExtentsWithChildren);
        }
        GetStretchExtents(shape: Shapes.Shape, lu: LayoutUpdater) {
            if (rect.isEmpty(lu.Extents)) {
                rect.copyTo(shape._ComputeStretchBounds(), lu.Extents);
                rect.copyTo(lu.Extents, lu.ExtentsWithChildren);
            }
            return lu.Extents;
        }
    }

    function isSignificant(dx: number, x: number): bool {
        return Math.abs(x) < 0.000019 && (Math.abs(dx) * x - x) > 1.0;
    }

    export class Shape extends FrameworkElement implements IMeasurableHidden, IArrangeableHidden, IRenderable, IActualSizeComputable {
        XamlNode: ShapeNode;
        CreateNode(): ShapeNode { return new ShapeNode(this); }

        private _ShapeFlags: ShapeFlags = ShapeFlags.None;
        private _StretchXform: number[] = mat3.identity();
        private _NaturalBounds: rect = new rect();
        private _Path: RawPath = null;
        private _Fill: Media.Brush = null;
        private _Stroke: Media.Brush = null;

        static FillProperty: DependencyProperty = DependencyProperty.Register("Fill", () => Media.Brush, Shape, undefined, (d, args) => (<Shape>d)._FillChanged(args));
        //http://msdn.microsoft.com/en-us/library/system.windows.shapes.shape.stretch(v=vs.95).aspx
        static StretchProperty: DependencyProperty = DependencyProperty.Register("Stretch", () => new Enum(Media.Stretch), Shape, Media.Stretch.None, (d, args) => (<Shape>d)._StretchChanged(args));
        static StrokeProperty: DependencyProperty = DependencyProperty.Register("Stroke", () => Media.Brush, Shape, undefined, (d, args) => (<Shape>d)._StrokeChanged(args));
        static StrokeThicknessProperty: DependencyProperty = DependencyProperty.Register("StrokeThickness", () => Number, Shape, 1.0, (d, args) => (<Shape>d)._InvalidateNaturalBounds());
        static StrokeDashArrayProperty: DependencyProperty = DependencyProperty.Register("StrokeDashArray", () => DoubleCollection, Shape, undefined, (d, args) => (<Shape>d)._InvalidateNaturalBounds());
        static StrokeDashCapProperty: DependencyProperty = DependencyProperty.Register("StrokeDashCap", () => new Enum(PenLineCap), Shape, PenLineCap.Flat, (d, args) => (<Shape>d)._InvalidateNaturalBounds());
        static StrokeDashOffsetProperty: DependencyProperty = DependencyProperty.Register("StrokeDashOffset", () => Number, Shape, 0.0, (d, args) => (<Shape>d)._InvalidateNaturalBounds());
        static StrokeEndLineCapProperty: DependencyProperty = DependencyProperty.Register("StrokeEndLineCap", () => new Enum(PenLineCap), Shape, PenLineCap.Flat, (d, args) => (<Shape>d)._InvalidateNaturalBounds());
        static StrokeLineJoinProperty: DependencyProperty = DependencyProperty.Register("StrokeLineJoin", () => new Enum(PenLineJoin), Shape, PenLineJoin.Miter, (d, args) => (<Shape>d)._InvalidateNaturalBounds());
        static StrokeMiterLimitProperty: DependencyProperty = DependencyProperty.Register("StrokeMiterLimit", () => Number, Shape, 10.0, (d, args) => (<Shape>d)._InvalidateNaturalBounds());
        static StrokeStartLineCapProperty: DependencyProperty = DependencyProperty.Register("StrokeStartLineCap", () => new Enum(PenLineCap), Shape, PenLineCap.Flat, (d, args) => (<Shape>d)._InvalidateNaturalBounds());
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

        _InsideShape(ctx: RenderContext, lu: LayoutUpdater, x: number, y: number): bool {
            if (this._ShapeFlags & ShapeFlags.Empty)
                return false;
            var ret = false;
            var area = this.XamlNode.GetStretchExtents(this, lu);
            ctx.Save();
            ctx.PreTransformMatrix(this._StretchXform);
            if (this._Fill != null) {
                this._DrawPath(ctx);
                if (ctx.IsPointInPath(new Point(x, y)))
                    ret = true;
            }
            if (!ret && this._Stroke != null) {
                if (window.console && console.warn)
                    console.warn("Shape._InsideShape-Stroke");
            }
            ctx.Restore();
            return ret;
        }
        private _MeasureOverride(availableSize: size, error: BError): size {
            var shapeBounds = this._GetNaturalBounds();
            if (!shapeBounds)
                return new size();
            var sx = 0.0;
            var sy = 0.0;

            var desired;
            if (this instanceof Rectangle || this instanceof Ellipse)
                desired = new size();
            else
                desired = size.copyTo(availableSize);

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
        private _ArrangeOverride(finalSize: size, error: BError): size {
            var sx = 1.0;
            var sy = 1.0;

            var shapeBounds = this._GetNaturalBounds();
            if (!shapeBounds)
                return new size();

            this._InvalidateStretch();

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
        private Render(ctx: RenderContext, lu: LayoutUpdater, region: rect) {
            if (this._ShapeFlags & ShapeFlags.Empty)
                return;
            var area = this.XamlNode.GetStretchExtents(this, lu);
            ctx.Save();
            ctx.PreTransformMatrix(this._StretchXform);
            this._DrawPath(ctx);
            if (this._Fill != null)
                ctx.Fill(this._Fill, area);
            if (this._Stroke != null)
                ctx.Stroke(this._Stroke, this.StrokeThickness, area);
            ctx.Restore();
        }

        _GetFillRule(): FillRule { return FillRule.NonZero; }
        _BuildPath(): Shapes.RawPath { return undefined; }
        _DrawPath(ctx: RenderContext) {
            this._Path = this._Path || this._BuildPath();
            this._Path.DrawRenderCtx(ctx);
        }
        
        private ComputeActualSize(baseComputer: () => size, lu: LayoutUpdater) {
            var desired = baseComputer.call(lu);

            var node = this.XamlNode;
            var lu = node.LayoutUpdater;

            var shapeBounds = this._GetNaturalBounds();
            var sx = 1.0;
            var sy = 1.0;

            var visualParentNode = node.VisualParentNode;
            if (visualParentNode != null && !(visualParentNode instanceof Controls.CanvasNode)) {
                if (lu.PreviousConstraint !== undefined || lu.LayoutSlot !== undefined) {
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
        _ComputeStretchBounds(): rect {
            var shapeBounds = this._GetNaturalBounds();
            if (!shapeBounds || shapeBounds.Width <= 0.0 || shapeBounds.Height <= 0.0) {
                this._ShapeFlags = ShapeFlags.Empty;
                return new rect();
            }

            var specified = size.fromRaw(this.Width, this.Height);
            var autoDim = isNaN(specified.Width);
            var framework = size.fromRaw(this.ActualWidth, this.ActualHeight);

            if (specified.Width <= 0.0 || specified.Height <= 0.0) {
                this._ShapeFlags = ShapeFlags.Empty;
                return new rect();
            }

            var node = this.XamlNode;
            var lu = node.LayoutUpdater;
            var vpNode = node.VisualParentNode;
            if (vpNode instanceof Controls.CanvasNode) {
                framework.Width = framework.Width === 0.0 ? shapeBounds.Width : framework.Width;
                framework.Height = framework.Height === 0.0 ? shapeBounds.Height : framework.Height;
                if (!isNaN(specified.Width))
                    framework.Width = specified.Width;
                if (!isNaN(specified.Height))
                    framework.Height = specified.Height;

            } else if (!lu.PreviousConstraint) {
                framework.Width = framework.Width === 0.0 ? shapeBounds.Width : framework.Width;
                framework.Height = framework.Height === 0.0 ? shapeBounds.Height : framework.Height;
            }

            var stretch = this.Stretch;
            if (stretch === Fayde.Media.Stretch.None) {
                rect.transform(shapeBounds, this._StretchXform);
                return shapeBounds;
            }

            if (framework.Width === 0.0 || framework.Height === 0.0) {
                this._ShapeFlags = ShapeFlags.Empty;
                return new rect();
            }

            var logicalBounds = this._ComputeShapeBoundsImpl(true, null);

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
                var stretchBounds = this._ComputeShapeBoundsImpl(false, temp);
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

            var x = (!autoDim || adjX) ? shapeBounds.X : 0;
            var y = (!autoDim || adjY) ? shapeBounds.Y : 0;

            var st = this._StretchXform;
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
            this._StretchXform = st;

            rect.transform(shapeBounds, this._StretchXform);
            return shapeBounds;
        }
        private _GetNaturalBounds(): rect {
            if (rect.isEmpty(this._NaturalBounds))
                this._NaturalBounds = this._ComputeShapeBoundsImpl(false);
            return this._NaturalBounds;
        }
        _ComputeShapeBounds(logical: bool): rect {
            return this._ComputeShapeBoundsImpl(logical, null);
        }
        _ComputeShapeBoundsImpl(logical: bool, matrix?): rect {
            var thickness = (logical || !this._Stroke) ? 0.0 : this.StrokeThickness;
            
            this._Path = this._Path || this._BuildPath();

            if (!this._Path || (this._ShapeFlags & ShapeFlags.Empty))
                return new rect();

            if (logical) {
                return this._Path.CalculateBounds(0);
            } else if (thickness > 0) {
                return this._Path.CalculateBounds(thickness);
            } else {
                //TODO: measure fill extents
            }
            NotImplemented("Shape._ComputeShapeBoundsImpl");
            return new rect();
        }

        private _InvalidateStretch() {
            this.XamlNode.UpdateStretch();
            this._StretchXform = mat3.identity();
            this._InvalidatePathCache();
        }
        _InvalidatePathCache(free?: bool) {
            this._Path = null;
            if (!free)
                this.XamlNode.LayoutUpdater.UpdateBounds(true);
        }
        _InvalidateNaturalBounds() {
            rect.clear(this._NaturalBounds);
            this._InvalidateStretch();
            this.XamlNode.LayoutUpdater.Invalidate();
        }
        
        private _FillListener: Media.IBrushChangedListener;
        private _FillChanged(args: IDependencyPropertyChangedEventArgs) {
            var newBrush = <Media.Brush>args.NewValue;
            if (this._FillListener)
                this._FillListener.Detach();
                this._FillListener = null;
            if (newBrush)
                this._FillListener = newBrush.Listen((brush) => this.BrushChanged(brush));

            if (this._Fill || newBrush)
                this._InvalidateNaturalBounds();
            this._Fill = newBrush;
        }
        private _StrokeListener: Media.IBrushChangedListener;
        private _StrokeChanged(args: IDependencyPropertyChangedEventArgs) {
            var newBrush = <Media.Brush>args.NewValue;
            if (this._StrokeListener)
                this._StrokeListener.Detach();
                this._StrokeListener = null;
            if (newBrush)
                this._StrokeListener = newBrush.Listen((brush) => this.BrushChanged(brush));

            if (this._Stroke || newBrush)
                this._InvalidateNaturalBounds();
            this._Stroke = newBrush;
        }
        private BrushChanged(newBrush: Media.Brush) {
            this.XamlNode.LayoutUpdater.Invalidate();
            //this._InvalidateSurfaceCache();
        }
        private _StretchChanged(args: IDependencyPropertyChangedEventArgs) {
            this.XamlNode.LayoutUpdater.InvalidateMeasure();
            this._InvalidateStretch();
        }

        private _WidthChanged(args: IDependencyPropertyChangedEventArgs) {
            super._WidthChanged(args);
            this._InvalidateStretch();
        }
        private _HeightChanged(args: IDependencyPropertyChangedEventArgs) {
            super._HeightChanged(args);
            this._InvalidateStretch();
        }
    }
    Nullstone.RegisterType(Shape, "Shape");
}