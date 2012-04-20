/// <reference path="../Core/FrameworkElement.js"/>
/// CODE
/// <reference path="../Media/Enums.js"/>
/// <reference path="../Engine/RenderContext.js"/>
/// <reference path="Enums.js"/>

//#region Shape
var Shape = Nullstone.Create("Shape", FrameworkElement);

Shape.Instance.Init = function () {
    this.Init$FrameworkElement();
    this._ShapeFlags = 0;
    this._StretchTransform = new Matrix();
};

//#region Dependency Properties

Shape.FillProperty = DependencyProperty.Register("Fill", function () { return Brush; }, Shape);
Shape.Instance.GetFill = function () {
    ///<returns type="Brush"></returns>
    return this.$GetValue(Shape.FillProperty);
};
Shape.Instance.SetFill = function (value) {
    ///<param name="value" type="Brush"></param>
    this.$SetValue(Shape.FillProperty, value);
};

Shape.StretchProperty = DependencyProperty.Register("Stretch", function () { return new Enum(Stretch); }, Shape, Stretch.None);
Shape.Instance.GetStretch = function () {
    ///<returns type="Number"></returns>
    return this.$GetValue(Shape.StretchProperty);
};
Shape.Instance.SetStretch = function (value) {
    ///<param name="value" type="Number"></param>
    this.$SetValue(Shape.StretchProperty, value);
};

Shape.StrokeProperty = DependencyProperty.Register("Stroke", function () { return Brush; }, Shape);
Shape.Instance.GetStroke = function () {
    ///<returns type="Brush"></returns>
    return this.$GetValue(Shape.StrokeProperty);
};
Shape.Instance.SetStroke = function (value) {
    ///<param name="value" type="Brush"></param>
    this.$SetValue(Shape.StrokeProperty, value);
};

Shape.StrokeThicknessProperty = DependencyProperty.Register("StrokeThickness", function () { return Number; }, Shape, 1.0);
Shape.Instance.GetStrokeThickness = function () {
    ///<returns type="Number"></returns>
    return this.$GetValue(Shape.StrokeThicknessProperty);
};
Shape.Instance.SetStrokeThickness = function (value) {
    ///<param name="value" type="Number"></param>
    this.$SetValue(Shape.StrokeThicknessProperty, value);
};

Shape.StrokeDashArrayProperty = DependencyProperty.Register("StrokeDashArray", function () { return DoubleCollection; }, Shape);
Shape.Instance.GetStrokeDashArray = function () {
    ///<returns type="DoubleCollection"></returns>
    return this.$GetValue(Shape.StrokeDashArrayProperty);
};
Shape.Instance.SetStrokeDashArray = function (value) {
    ///<param name="value" type="DoubleCollection"></param>
    this.$SetValue(Shape.StrokeDashArrayProperty, value);
};

Shape.StrokeDashCapProperty = DependencyProperty.Register("StrokeDashCap", function () { return new Enum(PenLineCap); }, Shape, PenLineCap.Flat);
Shape.Instance.GetStrokeDashCap = function () {
    ///<returns type="Number"></returns>
    return this.$GetValue(Shape.StrokeDashCapProperty);
};
Shape.Instance.SetStrokeDashCap = function (value) {
    ///<param name="value" type="Number"></param>
    this.$SetValue(Shape.StrokeDashCapProperty, value);
};

Shape.StrokeDashOffsetProperty = DependencyProperty.Register("StrokeDashOffset", function () { return Number; }, Shape, 0.0);
Shape.Instance.GetStrokeDashOffset = function () {
    ///<returns type="Number"></returns>
    return this.$GetValue(Shape.StrokeDashOffsetProperty);
};
Shape.Instance.SetStrokeDashOffset = function (value) {
    ///<param name="value" type="Number"></param>
    this.$SetValue(Shape.StrokeDashOffsetProperty, value);
};

Shape.StrokeEndLineCapProperty = DependencyProperty.Register("StrokeEndLineCap", function () { return new Enum(PenLineCap); }, Shape, PenLineCap.Flat);
Shape.Instance.GetStrokeEndLineCap = function () {
    ///<returns type="Number"></returns>
    return this.$GetValue(Shape.StrokeEndLineCapProperty);
};
Shape.Instance.SetStrokeEndLineCap = function (value) {
    ///<param name="value" type="Number"></param>
    this.$SetValue(Shape.StrokeEndLineCapProperty, value);
};

Shape.StrokeLineJoinProperty = DependencyProperty.Register("StrokeLineJoin", function () { return new Enum(PenLineJoin); }, Shape, PenLineJoin.Miter);
Shape.Instance.GetStrokeLineJoin = function () {
    ///<returns type="Number"></returns>
    return this.$GetValue(Shape.StrokeLineJoinProperty);
};
Shape.Instance.SetStrokeLineJoin = function (value) {
    ///<param name="value" type="Number"></param>
    this.$SetValue(Shape.StrokeLineJoinProperty, value);
};

Shape.StrokeMiterLimitProperty = DependencyProperty.Register("StrokeMiterLimit", function () { return Number; }, Shape, 10.0);
Shape.Instance.GetStrokeMiterLimit = function () {
    ///<returns type="Number"></returns>
    return this.$GetValue(Shape.StrokeMiterLimitProperty);
};
Shape.Instance.SetStrokeMiterLimit = function (value) {
    ///<param name="value" type="Number"></param>
    this.$SetValue(Shape.StrokeMiterLimitProperty, value);
};

Shape.StrokeStartLineCapProperty = DependencyProperty.Register("StrokeStartLineCap", function () { return new Enum(PenLineCap); }, Shape, PenLineCap.Flat);
Shape.Instance.GetStrokeStartLineCap = function () {
    ///<returns type="Number"></returns>
    return this.$GetValue(Shape.StrokeStartLineCapProperty);
};
Shape.Instance.SetStrokeStartLineCap = function (value) {
    ///<param name="value" type="Number"></param>
    this.$SetValue(Shape.StrokeStartLineCapProperty, value);
};

//#endregion

//#region Helpers

Shape.Instance._IsEmpty = function () { return this._ShapeFlags & ShapeFlags.Empty; };
Shape.Instance._IsNormal = function () { return this._ShapeFlags & ShapeFlags.Normal; };
Shape.Instance._IsDegenerate = function () { return this._ShapeFlags & ShapeFlags.Degenerate; };
Shape.Instance._HasRadii = function () { return this._ShapeFlags & ShapeFlags.Radii; };
Shape.Instance._SetShapeFlags = function (sf) { this._ShapeFlags = sf; };
Shape.Instance._AddShapeFlags = function (sf) { this._ShapeFlags |= sf; };

Shape.Instance._IsStroked = function () { return this._Stroke != null; };
Shape.Instance._IsFilled = function () { return this._Fill != null; };
Shape.Instance._CanFill = function () { return false; };
Shape.Instance._CanFindElement = function () { return this._IsFilled() || this._IsStroked(); };

Shape.Instance._GetFillRule = function () {
    return FillRule.Nonzero;
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
    var sx = 0.0;
    var sy = 0.0;
    if (this instanceof Rectangle || this instanceof Ellipse) {
        desired = new Size(0, 0);
    }

    var stretch = this.GetStretch();
    if (stretch === Stretch.None)
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
        case Stretch.Uniform:
            sx = sy = Math.min(sx, sy);
            break;
        case Stretch.UniformToFill:
            sx = sy = Math.max(sx, sy);
            break;
        case Stretch.Fill:
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

    this._InvalidateStretch();

    var stretch = this.GetStretch();
    if (stretch === Stretch.None)
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
        case Stretch.Uniform:
            sx = sy = Math.min(sx, sy);
            break;
        case Stretch.UniformToFill:
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
    this._StretchTransform = new Matrix();
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

    if (parent != null && !(parent instanceof Canvas)) {
        if (LayoutInformation.GetPreviousConstraint(this) != null || this.ReadLocalValue(LayoutInformation.LayoutSlotProperty)) {
            return desired;
        }
    }

    if (!this._IsAttached)
        return desired;

    if (shapeBounds.Width <= 0 && shapeBounds.Height <= 0)
        return desired;

    var stretch = this.GetStretch();
    if (stretch === Stretch.None && shapeBounds.Width > 0 && shapeBounds.Height > 0)
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
        case Stretch.Uniform:
            sx = sy = Math.min(sx, sy);
            break;
        case Stretch.UniformToFill:
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
    if (this._NaturalBounds.IsEmpty())
        this._NaturalBounds = this._ComputeShapeBoundsImpl(false, null);
    return this._NaturalBounds;
};
Shape.Instance._TransformBounds = function () {
    //TODO:
};
Shape.Instance._ComputeBounds = function () {
    this._BoundsWithChildren = this._Bounds = this._IntersectBoundsWithClipPath(this._GetStretchExtents()/*.GrowBy(this._EffectPadding)*/, false); //.Transform(this._AbsoluteXform);
    this._ComputeGlobalBounds();
    this._ComputeSurfaceBounds();
};
Shape.Instance._ComputeStretchBounds = function () {
    var autoDim = isNaN(this.GetWidth());

    var stretch = this.GetStretch();
    var shapeBounds = this._GetNaturalBounds();

    if (shapeBounds.Width <= 0.0 || shapeBounds.Height <= 0.0) {
        this._SetShapeFlags(ShapeFlags.Empty);
        return new Rect();
    }

    var framework = new Size(this.GetActualWidth(), this.GetActualHeight());
    var specified = new Size(this.GetWidth(), this.GetHeight());

    if (specified.Width <= 0.0 || specified.Height <= 0.0) {
        this._SetShapeFlags(ShapeFlags.Empty);
        return new Rect();
    }

    var visualParent = this.GetVisualParent();
    if (visualParent != null && visualParent instanceof Canvas) {
        framework.Width = framework.Width === 0.0 ? shapeBounds.Width : framework.Width;
        framework.Height = framework.Height === 0.0 ? shapeBounds.Height : framework.Height;
        if (!isNaN(specified.Width))
            framework.Width = specified.Width;
        if (!isNaN(specified.Height))
            framework.Height = specified.Height;

    } else if (!LayoutInformation.GetPreviousConstraint(this)) {
        framework.Width = framework.Width === 0.0 ? shapeBounds.Width : framework.Width;
        framework.Height = framework.Height === 0.0 ? shapeBounds.Height : framework.Height;
    }

    if (stretch === Stretch.None) {
        shapeBounds = shapeBounds.Transform(this._StretchTransform);
        return shapeBounds;
    }

    if (framework.Width === 0.0 || framework.Height === 0.0) {
        this._SetShapeFlags(ShapeFlags.Empty);
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
        case Stretch.Fill:
            center = true;
            break;
        case Stretch.Uniform:
            sw = sh = (sw < sh) ? sw : sh;
            center = true;
            break;
        case Stretch.UniformToFill:
            sw = sh = (sw > sh) ? sw : sh;
            break;
    }

    if ((adjX && Shape.IsSignificant(sw - 1, shapeBounds.Width)) || (adjY && Shape.IsSignificant(sh - 1, shapeBounds.Height))) {
        var temp = new Matrix();
        temp = Matrix.Scale(temp, adjX ? sw : 1.0, adjY ? sh : 1.0);
        var stretchBounds = this._ComputeShapeBoundsImpl(false, temp);
        if (stretchBounds.Width !== shapeBounds.Width && stretchBounds.Height !== shapeBounds.Height) {
            sw *= adjX ? (framework.Width - stretchBounds.Width + logicalBounds.Width * sw) / (logicalBounds.Width * sw) : 1.0;
            sh *= adjY ? (framework.Height - stretchBounds.Height + logicalBounds.Height * sh) / (logicalBounds.Height * sh) : 1.0;
            switch (stretch) {
                case Stretch.Uniform:
                    sw = sh = (sw < sh) ? sw : sh;
                    break;
                case Stretch.UniformToFill:
                    sw = sh = (sw > sh) ? sw : sh;
                    break;
            }
        }
    }

    var x = (!autoDim || adjX) ? shapeBounds.X : 0;
    var y = (!autoDim || adjY) ? shapeBounds.Y : 0;

    var st = this._StretchTransform;
    if (!(this instanceof Line) || !autoDim)
        st = Matrix.Translate(st, -x, -y);
    st = Matrix.Translate(st,
        adjX ? -shapeBounds.Width * 0.5 : 0.0,
        adjY ? -shapeBounds.Height * 0.5 : 0.0);
    st = Matrix.Scale(st,
        adjX ? sw : 1.0,
        adjY ? sh : 1.0);
    if (center) {
        st = Matrix.Translate(st,
            adjX ? framework.Width * 0.5 : 0,
            adjY ? framework.Height * 0.5 : 0);
    } else {
        st = Matrix.Translate(st,
            adjX ? (logicalBounds.Width * sw + diffX) * 0.5 : 0,
            adjY ? (logicalBounds.Height * sh + diffY) * 0.5 : 0);
    }
    this._StretchTransform = st;

    shapeBounds = shapeBounds.Transform(this._StretchTransform);
    return shapeBounds;
};
Shape.IsSignificant = function (dx, x) {
    return Math.abs(x) < 0.000019 && (Math.abs(dx) * x - x) > 1.0;
};
Shape.Instance._ComputeShapeBounds = function (logical) {
    this._ComputeShapeBoundsImpl(logical, null);
};
Shape.Instance._ComputeShapeBoundsImpl = function (logical, matrix) {
    var thickness = (logical || !this._IsStroked()) ? 0.0 : this.GetStrokeThickness();

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
    var ret = false;

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

    ctx.Save();
    //TODO: Set ctx transform to AbsoluteXform
    //Draw path
    //Fill if necessary
    //Stroke if necessary
    //ret = isPointInPath
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
    ctx.PreTransform(this._StretchTransform);
    this._DrawPath(ctx);
    if (this._Fill != null)
        ctx.Fill(this._Fill, area);
    if (this._Stroke != null)
        ctx.Stroke(this._Stroke, this.GetStrokeThickness(), area);
    ctx.Restore();
};

Shape.Instance._BuildPath = function () { };
Shape.Instance._DrawPath = function (ctx) {
    /// <param name="ctx" type="_RenderContext"></param>
    this._Path.Draw(ctx);
};

//#region Property Changed

Shape.Instance._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== Shape) {
        if (args.Property._ID === FrameworkElement.HeightProperty || args.Property._ID === FrameworkElement.WidthProperty)
            this._InvalidateStretch();
        this._OnPropertyChanged$FrameworkElement(args, error);
        return;
    }

    if (args.Property._ID === Shape.StretchProperty._ID) {
        this._InvalidateMeasure();
        this._InvalidateStretch();
    } else if (args.Property._ID === Shape.StrokeProperty._ID) {
        var newStroke = Nullstone.As(args.NewValue, Brush);
        if (this._Stroke == null || newStroke == null) {
            this._InvalidateStrokeBounds();
        } else {
            this._InvalidateSurfaceCache();
        }
        this._Stroke = newStroke;
    } else if (args.Property._ID === Shape.FillProperty._ID) {
        var newFill = Nullstone.As(args.NewValue, Brush);
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
        || args.Property._ID === Shape.StrokeEndLineProperty._ID
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

//#endregion

Nullstone.FinishCreate(Shape);
//#endregion