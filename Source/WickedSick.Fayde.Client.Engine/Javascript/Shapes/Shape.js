/// <reference path="../Core/FrameworkElement.js"/>
/// CODE
/// <reference path="../Media/Enums.js"/>
/// <reference path="../Engine/RenderContext.js"/>
/// <reference path="Enums.js"/>
/// <reference path="DoubleCollection.js"/>

(function (namespace) {
    var Shape = Nullstone.Create("Shape", Fayde.FrameworkElement);

    Shape.Instance.Init = function () {
        this.Init$FrameworkElement();
        this._ShapeFlags = 0;
        this._StretchXform = mat3.identity();
        this._NaturalBounds = new Rect();
    };

    //#region Properties

    Shape.FillProperty = DependencyProperty.Register("Fill", function () { return Fayde.Media.Brush; }, Shape);
    Shape.StretchProperty = DependencyProperty.Register("Stretch", function () { return new Enum(Fayde.Media.Stretch); }, Shape, Fayde.Media.Stretch.None);
    Shape.StrokeProperty = DependencyProperty.Register("Stroke", function () { return Fayde.Media.Brush; }, Shape);
    Shape.StrokeThicknessProperty = DependencyProperty.Register("StrokeThickness", function () { return Number; }, Shape, 1.0);
    Shape.StrokeDashArrayProperty = DependencyProperty.Register("StrokeDashArray", function () { return namespace.DoubleCollection; }, Shape);
    Shape.StrokeDashCapProperty = DependencyProperty.Register("StrokeDashCap", function () { return new Enum(namespace.PenLineCap); }, Shape, namespace.PenLineCap.Flat);
    Shape.StrokeDashOffsetProperty = DependencyProperty.Register("StrokeDashOffset", function () { return Number; }, Shape, 0.0);
    Shape.StrokeEndLineCapProperty = DependencyProperty.Register("StrokeEndLineCap", function () { return new Enum(namespace.PenLineCap); }, Shape, namespace.PenLineCap.Flat);
    Shape.StrokeLineJoinProperty = DependencyProperty.Register("StrokeLineJoin", function () { return new Enum(namespace.PenLineJoin); }, Shape, namespace.PenLineJoin.Miter);
    Shape.StrokeMiterLimitProperty = DependencyProperty.Register("StrokeMiterLimit", function () { return Number; }, Shape, 10.0);
    Shape.StrokeStartLineCapProperty = DependencyProperty.Register("StrokeStartLineCap", function () { return new Enum(namespace.PenLineCap); }, Shape, namespace.PenLineCap.Flat);

    Nullstone.AutoProperties(Shape, [
        Shape.FillProperty,
        Shape.StretchProperty,
        Shape.StrokeProperty,
        Shape.StrokeThicknessProperty,
        Shape.StrokeDashArrayProperty,
        Shape.StrokeDashCapProperty,
        Shape.StrokeDashOffsetProperty,
        Shape.StrokeEndLineCapProperty,
        Shape.StrokeLineJoinProperty,
        Shape.StrokeMiterLimitProperty,
        Shape.StrokeStartLineCapProperty
    ]);

    //#endregion

    //#region Helpers

    Shape.Instance._IsEmpty = function () { return this._ShapeFlags & namespace.ShapeFlags.Empty; };
    Shape.Instance._IsNormal = function () { return this._ShapeFlags & namespace.ShapeFlags.Normal; };
    Shape.Instance._IsDegenerate = function () { return this._ShapeFlags & namespace.ShapeFlags.Degenerate; };
    Shape.Instance._HasRadii = function () { return this._ShapeFlags & namespace.ShapeFlags.Radii; };
    Shape.Instance._SetShapeFlags = function (sf) { this._ShapeFlags = sf; };
    Shape.Instance._AddShapeFlags = function (sf) { this._ShapeFlags |= sf; };

    Shape.Instance._IsStroked = function () { return this._Stroke != null; };
    Shape.Instance._IsFilled = function () { return this._Fill != null; };
    Shape.Instance._CanFill = function () { return false; };
    Shape.Instance._CanFindElement = function () { return this._IsFilled() || this._IsStroked(); };

    Shape.Instance._GetFillRule = function () {
        return namespace.FillRule.NonZero;
    };

    //#endregion

    Shape.Instance._ShiftPosition = function (point) {
        var dx = this._Bounds.X - point.X;
        var dy = this._Bounds.Y - point.Y;
        //WTF?
        this._ShiftPosition$FrameworkElement(point);
    };

    //#region Measure

    Shape.Instance._MeasureOverrideWithError = function (availableSize, error) {
        /// <param name="availableSize" type="Size"></param>
        var desired = availableSize;
        var shapeBounds = this._GetNaturalBounds();
        if (!shapeBounds)
            return new Size();
        var sx = 0.0;
        var sy = 0.0;
        if (this instanceof namespace.Rectangle || this instanceof namespace.Ellipse) {
            desired = new Size(0, 0);
        }

        var stretch = this.Stretch;
        if (stretch === Fayde.Media.Stretch.None)
            return new Size(shapeBounds.X + shapeBounds.Width, shapeBounds.Y + shapeBounds.Height);

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
            case Fayde.Media.Stretch.Uniform:
                sx = sy = Math.min(sx, sy);
                break;
            case Fayde.Media.Stretch.UniformToFill:
                sx = sy = Math.max(sx, sy);
                break;
            case Fayde.Media.Stretch.Fill:
                if (!isFinite(availableSize.Width))
                    sx = 1.0;
                if (!isFinite(availableSize.Height))
                    sy = 1.0;
                break;
            default:
                break;
        }

        desired = new Size(shapeBounds.Width * sx, shapeBounds.Height * sy);
        return desired;
    };

    //#endregion

    //#region Arrange

    Shape.Instance._ArrangeOverrideWithError = function (finalSize, error) {
        /// <param name="finalSize" type="Size"></param>
        var arranged = finalSize;
        var sx = 1.0;
        var sy = 1.0;

        var shapeBounds = this._GetNaturalBounds();
        if (!shapeBounds)
            return new Size();

        this._InvalidateStretch();

        var stretch = this.Stretch;
        if (stretch === Fayde.Media.Stretch.None)
            return arranged.Max(new Size(shapeBounds.X + shapeBounds.Width, shapeBounds.Y + shapeBounds.Height));

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

        arranged = new Size(shapeBounds.Width * sx, shapeBounds.Height * sy);
        return arranged;
    };

    //#endregion

    //#region Invalidation

    Shape.Instance._InvalidateNaturalBounds = function () {
        this._NaturalBounds = new Rect();
        this._InvalidateStretch();
    };
    Shape.Instance._InvalidateStretch = function () {
        this._ExtentsWithChildren = this._Extents = new Rect();
        this._StretchXform = mat3.identity();
        this._InvalidatePathCache();
    };
    Shape.Instance._InvalidatePathCache = function (free) {
        this._Path = null;
        if (!free) {
            this._UpdateBounds(true);
        }
        this._InvalidateSurfaceCache();
    };
    Shape.Instance._InvalidateSurfaceCache = function () {
        //WTF?
    };
    Shape.Instance._InvalidateStrokeBounds = function () {
        this._InvalidateFillBounds();
    };
    Shape.Instance._InvalidateFillBounds = function () {
        this._InvalidateNaturalBounds();
    };
    Shape.Instance._CacheInvalidateHint = function () {
        this._InvalidatePathCache();
    };

    //#endregion

    //#region Sizes

    Shape.Instance._GetStretchExtents = function () {
        if (this._Extents.IsEmpty()) {
            this._ExtentsWithChildren = this._Extents = this._ComputeStretchBounds();
        }
        return this._Extents;
    };
    Shape.Instance._ComputeActualSize = function () {
        var desired = this._ComputeActualSize$FrameworkElement();
        var shapeBounds = this._GetNaturalBounds();
        var sx = 1.0;
        var sy = 1.0;
        var parent = this.GetVisualParent();

        if (parent != null && !(parent instanceof Fayde.Controls.Canvas)) {
            if (Fayde.LayoutInformation.GetPreviousConstraint(this) !== undefined || this._ReadLocalValue(Fayde.LayoutInformation.LayoutSlotProperty) !== undefined) {
                return desired;
            }
        }

        if (!this._IsAttached)
            return desired;

        if (shapeBounds.Width <= 0 && shapeBounds.Height <= 0)
            return desired;

        var stretch = this.Stretch;
        if (stretch === Fayde.Media.Stretch.None && shapeBounds.Width > 0 && shapeBounds.Height > 0)
            return new Size(shapeBounds.Width, shapeBounds.Height);

        if (!isFinite(desired.Width))
            desired.Width = shapeBounds.Width;
        if (!isFinite(desired.Height))
            desired.Height = shapeBounds.Height;

        if (shapeBounds.Width > 0)
            sx = desired.Width / shapeBounds.Width;
        if (shapeBounds.Height > 0)
            sy = desired.Height / shapeBounds.Height;

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

        desired = desired.Min(shapeBounds.Width * sx, shapeBounds.Height * sy);
        return desired;
    };
    Shape.Instance._GetSizeForBrush = function (ctx) {
        var se = this._GetStretchExtents();
        return new Size(se.Width, se.Height);
    };

    //#endregion

    //#region Bounds

    Shape.Instance._GetNaturalBounds = function () {
        if (!this._NaturalBounds)
            return;
        if (this._NaturalBounds.IsEmpty())
            this._NaturalBounds = this._ComputeShapeBoundsImpl(false, null);
        return this._NaturalBounds;
    };
    Shape.Instance._TransformBounds = function () {
        //TODO:
    };
    Shape.Instance._ComputeBounds = function () {
        this._BoundsWithChildren = this._Bounds = this._IntersectBoundsWithClipPath(this._GetStretchExtents().GrowBy(this._EffectPadding), false).Transform(this._AbsoluteXform);
        this._ComputeGlobalBounds();
        this._ComputeSurfaceBounds();
    };
    Shape.Instance._ComputeStretchBounds = function () {
        var shapeBounds = this._GetNaturalBounds();
        if (!shapeBounds || shapeBounds.Width <= 0.0 || shapeBounds.Height <= 0.0) {
            this._SetShapeFlags(namespace.ShapeFlags.Empty);
            return new Rect();
        }

        var specified = new Size(this.Width, this.Height);
        var autoDim = isNaN(specified.Width);
        var framework = new Size(this.ActualWidth, this.ActualHeight);

        if (specified.Width <= 0.0 || specified.Height <= 0.0) {
            this._SetShapeFlags(namespace.ShapeFlags.Empty);
            return new Rect();
        }

        var visualParent = this.GetVisualParent();
        if (visualParent != null && visualParent instanceof Fayde.Controls.Canvas) {
            framework.Width = framework.Width === 0.0 ? shapeBounds.Width : framework.Width;
            framework.Height = framework.Height === 0.0 ? shapeBounds.Height : framework.Height;
            if (!isNaN(specified.Width))
                framework.Width = specified.Width;
            if (!isNaN(specified.Height))
                framework.Height = specified.Height;

        } else if (!Fayde.LayoutInformation.GetPreviousConstraint(this)) {
            framework.Width = framework.Width === 0.0 ? shapeBounds.Width : framework.Width;
            framework.Height = framework.Height === 0.0 ? shapeBounds.Height : framework.Height;
        }

        var stretch = this.Stretch;
        if (stretch === Fayde.Media.Stretch.None) {
            shapeBounds = shapeBounds.Transform(this._StretchXform);
            return shapeBounds;
        }

        if (framework.Width === 0.0 || framework.Height === 0.0) {
            this._SetShapeFlags(namespace.ShapeFlags.Empty);
            return new Rect();
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
            case Fayde.Media.Stretch.Fill:
                center = true;
                break;
            case Fayde.Media.Stretch.Uniform:
                sw = sh = (sw < sh) ? sw : sh;
                center = true;
                break;
            case Fayde.Media.Stretch.UniformToFill:
                sw = sh = (sw > sh) ? sw : sh;
                break;
        }

        if ((adjX && Shape.IsSignificant(sw - 1, shapeBounds.Width)) || (adjY && Shape.IsSignificant(sh - 1, shapeBounds.Height))) {
            var temp = mat3.createScale(adjX ? sw : 1.0, adjY ? sh : 1.0);
            var stretchBounds = this._ComputeShapeBoundsImpl(false, temp);
            if (stretchBounds.Width !== shapeBounds.Width && stretchBounds.Height !== shapeBounds.Height) {
                sw *= adjX ? (framework.Width - stretchBounds.Width + logicalBounds.Width * sw) / (logicalBounds.Width * sw) : 1.0;
                sh *= adjY ? (framework.Height - stretchBounds.Height + logicalBounds.Height * sh) / (logicalBounds.Height * sh) : 1.0;
                switch (stretch) {
                    case Fayde.Media.Stretch.Uniform:
                        sw = sh = (sw < sh) ? sw : sh;
                        break;
                    case Fayde.Media.Stretch.UniformToFill:
                        sw = sh = (sw > sh) ? sw : sh;
                        break;
                }
            }
        }

        var x = (!autoDim || adjX) ? shapeBounds.X : 0;
        var y = (!autoDim || adjY) ? shapeBounds.Y : 0;

        var st = this._StretchXform;
        if (!(this instanceof namespace.Line) || !autoDim)
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

        shapeBounds = shapeBounds.Transform(this._StretchXform);
        return shapeBounds;
    };
    Shape.IsSignificant = function (dx, x) {
        return Math.abs(x) < 0.000019 && (Math.abs(dx) * x - x) > 1.0;
    };
    Shape.Instance._ComputeShapeBounds = function (logical) {
        this._ComputeShapeBoundsImpl(logical, null);
    };
    Shape.Instance._ComputeShapeBoundsImpl = function (logical, matrix) {
        var thickness = (logical || !this._IsStroked()) ? 0.0 : this.StrokeThickness;

        if (this._Path == null)
            this._BuildPath();

        if (this._IsEmpty())
            return new Rect();

        if (logical) {
            //TODO: measure path extents
        } else if (thickness > 0) {
            //TODO: measure stroke extents
        } else {
            //TODO: measure fill extents
        }
        NotImplemented("Shape._ComputeShapeBoundsImpl");
    };

    //#endregion

    //#region Hit Testing

    Shape.Instance._InsideObject = function (ctx, x, y) {
        if (!this._InsideLayoutClip(x, y))
            return false;
        if (!this._InsideClip(ctx, x, y))
            return false;
        var p = new Point(x, y);
        this._TransformPoint(p);
        x = p.X;
        y = p.Y;
        if (!this._GetStretchExtents().ContainsPointXY(x, y))
            return false;
        return this._InsideShape(ctx, x, y);
    };

    Shape.Instance._InsideShape = function (ctx, x, y) {
        /// <param name="ctx" type="_RenderContext"></param>
        if (this._IsEmpty())
            return false;
        var ret = false;
        var area = this._GetStretchExtents();
        ctx.Save();
        ctx.PreTransform(this._StretchXform);
        if (this._Fill != null) {
            this._DrawPath(ctx);
            if (ctx.IsPointInPath(new Point(x, y)))
                ret = true;
        }
        if (!ret && this._Stroke != null) {
            NotImplemented("Shape._InsideShape-Stroke");
        }
        ctx.Restore();
        return ret;
    };

    //#endregion

    Shape.Instance._Render = function (ctx, region) {
        /// <param name="ctx" type="_RenderContext"></param>
        if (this._IsEmpty())
            return;
        var area = this._GetStretchExtents();
        ctx.Save();
        ctx.PreTransform(this._StretchXform);
        this._DrawPath(ctx);
        if (this._Fill != null)
            ctx.Fill(this._Fill, area);
        if (this._Stroke != null)
            ctx.Stroke(this._Stroke, this.StrokeThickness, area);
        ctx.Restore();
    };

    Shape.Instance._BuildPath = function () { };
    Shape.Instance._DrawPath = function (ctx) {
        /// <param name="ctx" type="_RenderContext"></param>
        this._Path.Draw(ctx);
    };

    //#region Property Changed

    //#if !ENABLE_CANVAS
    if (!Fayde.IsCanvasEnabled) {
        Shape.Instance._OnPropertyChanged = function (args, error) {
            if (args.Property.OwnerType !== Shape) {
                if (args.Property._ID === Fayde.FrameworkElement.HeightProperty || args.Property._ID === Fayde.FrameworkElement.WidthProperty) {
                    this.InvalidateProperty(Shape.StretchProperty);
                }
                this._OnPropertyChanged$FrameworkElement(args, error);
                return;
            }
            this.InvalidateProperty(args.Property, args.OldValue, args.NewValue);
            this.PropertyChanged.Raise(this, args);
        };
        Shape.Instance._OnSubPropertyChanged = function (propd, sender, args) {
            if (propd != null && (propd._ID === Shape.FillProperty._ID || propd._ID === Shape.StrokeProperty._ID)) {
                this.InvalidateProperty(propd);
            } else {
                this._OnSubPropertyChanged$FrameworkElement(propd, sender, args);
            }
        };
    }
    //#else
    if (Fayde.IsCanvasEnabled) {
        Shape.Instance._OnPropertyChanged = function (args, error) {
            if (args.Property.OwnerType !== Shape) {
                if (args.Property._ID === Fayde.FrameworkElement.HeightProperty || args.Property._ID === Fayde.FrameworkElement.WidthProperty) {
                    this._InvalidateStretch();
                }
                this._OnPropertyChanged$FrameworkElement(args, error);
                return;
            }

            if (args.Property._ID === Shape.StretchProperty._ID) {
                this._InvalidateMeasure();
                this._InvalidateStretch();
            } else if (args.Property._ID === Shape.StrokeProperty._ID) {
                var newStroke = Nullstone.As(args.NewValue, Fayde.Media.Brush);
                if (this._Stroke == null || newStroke == null) {
                    this._InvalidateStrokeBounds();
                } else {
                    this._InvalidateSurfaceCache();
                }
                this._Stroke = newStroke;
            } else if (args.Property._ID === Shape.FillProperty._ID) {
                var newFill = Nullstone.As(args.NewValue, Fayde.Media.Brush);
                if (this._Fill == null || newFill == null) {
                    this._InvalidateFillBounds();
                } else {
                    this._InvalidateSurfaceCache();
                }
                this._Fill = newFill;
            } else if (args.Property._ID === Shape.StrokeThicknessProperty._ID) {
                this._InvalidateStrokeBounds();
            } else if (args.Property._ID === Shape.StrokeDashCapProperty._ID
                || args.Property._ID === Shape.StrokeDashArrayProperty._ID
                || args.Property._ID === Shape.StrokeEndLineCapProperty._ID
                || args.Property._ID === Shape.StrokeLineJoinProperty._ID
                || args.Property._ID === Shape.StrokeMiterLimitProperty._ID
                || args.Property._ID === Shape.StrokeStartLineCapProperty._ID) {
                this._InvalidateStrokeBounds();
            }

            this._Invalidate();
            this.PropertyChanged.Raise(this, args);
        };
        Shape.Instance._OnSubPropertyChanged = function (propd, sender, args) {
            if (propd != null && (propd._ID === Shape.FillProperty._ID || propd._ID === Shape.StrokeProperty._ID)) {
                this._Invalidate();
                this._InvalidateSurfaceCache();
            } else {
                this._OnSubPropertyChanged$FrameworkElement(propd, sender, args);
            }
        };
    }
    //#endif

    //#endregion

    //#if !ENABLE_CANVAS
    if (!Fayde.IsCanvasEnabled) {
        Shape.Instance.CreateHtmlObjectImpl = function () {
            var rootEl = this.CreateHtmlObjectImpl$FrameworkElement();
            var contentEl = rootEl.firstChild;
            var svg = this.GetSvg();
            svg.appendChild(this.GetSvgShape());
            contentEl.appendChild(svg);
            return rootEl;
        };
        Shape.Instance.CreateSvg = function () {
            var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            return svg;
        };
        Shape.Instance.GetSvg = function () {
            if (!this._Svg)
                this._Svg = this.CreateSvg();
            return this._Svg;
        };
        Shape.Instance.CreateSvgShape = function () { };
        Shape.Instance.GetSvgShape = function () {
            if (!this._Shape) {
                this._Shape = this.CreateSvgShape();
                this._Shape.setAttribute("width", "100%");
                this._Shape.setAttribute("height", "100%");
            }
            return this._Shape;
        };

        var serializeDashArray = function (collection) {
            var s = "";
            var len = collection.GetCount();
            for (var i = 0; i < len; i++) {
                if (s)
                    s += ", ";
                s = collection.GetValueAt(i).toString();
            }
            return s;
        };
        Shape.Instance.ApplyHtmlChange = function (change) {
            var propd = change.Property;
            if (propd.OwnerType !== Shape) {
                this.ApplyHtmlChange$FrameworkElement(change);
                return;
            }

            var shape = this.GetSvgShape();
            if (propd._ID === Shape.StretchProperty._ID) {
                var stretch = change.NewValue;
                if (!stretch)
                    stretch = this.Stretch;
                //TODO: Stretch property
            } else if (propd._ID === Shape.FillProperty._ID) {
                var fill = change.NewValue;
                if (!fill)
                    fill = this.Fill;
                fill.SetupBrush(null, null);
                shape.setAttribute("fill", fill.ToHtml5Object());
            } else if (propd._ID === Shape.StrokeProperty._ID) {
                var stroke = change.NewValue;
                if (!stroke)
                    stroke = this.Stroke;
                stroke.SetupBrush(null, null);
                shape.setAttribute("stroke", stroke.ToHtml5Object());
            } else if (propd._ID === Shape.StrokeThicknessProperty._ID) {
                shape.setAttribute("stroke-width", change.NewValue);
            } else if (propd._ID === Shape.StrokeDashArrayProperty._ID) {
                shape.setAttribute("stroke-dasharray", serializeDashArray(change.NewValue));
            } else if (propd._ID === Shape.StrokeDashOffsetProperty._ID) {
                shape.setAttribute("stroke-dashoffset", change.NewValue);
            } else if (propd._ID === Shape.StrokeLineJoinProperty._ID) {
                switch (change.NewValue) {
                    case Miter:
                        shape.setAttribute("stroke-linejoin", "miter");
                        break;
                    case Bevel:
                        shape.setAttribute("stroke-linejoin", "bevel");
                        break;
                    case Round:
                        shape.setAttribute("stroke-linejoin", "round");
                        break;
                }
            } else if (propd._ID === Shape.StrokeMiterLimitProperty._ID) {
                shape.setAttribute("stroke-miterlimit", change.NewValue);
            }
        };
    }
    //#endif

    namespace.Shape = Nullstone.FinishCreate(Shape);
})(Nullstone.Namespace("Fayde.Shapes"));