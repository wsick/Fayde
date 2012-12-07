/// <reference path="../Core/FrameworkElement.js"/>
/// CODE
/// <reference path="../Media/ImageSource.js"/>
/// <reference path="Enums.js"/>
/// <reference path="../Primitives/Rect.js"/>
/// <reference path="../Primitives/Enums.js"/>
/// <reference path="../Media/Enums.js"/>
/// <reference path="../Primitives/Uri.js"/>
/// <reference path="../Media/Imaging/BitmapImage.js"/>
/// <reference path="../Engine/RenderContext.js"/>

//#region Image
Fayde.Image = Nullstone.Create("Image", FrameworkElement);

Fayde.Image.Instance.Init = function () {
    this.Init$FrameworkElement();
    this.ImageFailed = new MulticastEvent();
    this.ImageOpened = new MulticastEvent();
};

//#region Properties

Fayde.Image.SourceProperty = DependencyProperty.RegisterFull("Source", function () { return ImageSource; }, Fayde.Image, undefined, undefined, { GetValue: function (propd, obj) { return new BitmapImage(); } });
// http: //msdn.microsoft.com/en-us/library/system.windows.media.stretch(v=vs.95).aspx
Fayde.Image.StretchProperty = DependencyProperty.RegisterCore("Stretch", function () { return new Enum(Stretch); }, Fayde.Image, Stretch.Uniform);

Nullstone.AutoProperties(Fayde.Image, [
    Fayde.Image.StretchProperty
]);

Nullstone.AutoProperty(Fayde.Image, Fayde.Image.SourceProperty, function (value) {
    if (value instanceof Uri)
        return new BitmapImage(value);
    return value;
});

//#endregion

//#region Measure

Fayde.Image.Instance._MeasureOverrideWithError = function (availableSize, error) {
    /// <param name="availableSize" type="Size"></param>
    var desired = availableSize;
    var shapeBounds = new Rect();
    var source = this.Source;
    var sx = sy = 0.0;

    if (source != null)
        shapeBounds = new Rect(0, 0, source.PixelWidth, source.PixelHeight);

    if (!isFinite(desired.Width))
        desired.Width = shapeBounds.Width;
    if (!isFinite(desired.Height))
        desired.Height = shapeBounds.Height;

    if (shapeBounds.Width > 0)
        sx = desired.Width / shapeBounds.Width;
    if (shapeBounds.Height > 0)
        sy = desired.Height / shapeBounds.Height;

    if (!isFinite(availableSize.Width))
        sx = sy;
    if (!isFinite(availableSize.Height))
        sy = sx;

    switch (this.Stretch) {
        case Stretch.Uniform:
            sx = sy = Math.min(sx, sy);
            break;
        case Stretch.UniformToFill:
            sx = sy = Math.max(sx, sy);
            break;
        case Stretch.Fill:
            if (!isFinite(availableSize.Width))
                sx = sy;
            if (!isFinite(availableSize.Height))
                sy = sx;
            break;
        case Stretch.None:
            sx = sy = 1.0;
            break;
    }

    desired = new Size(shapeBounds.Width * sx, shapeBounds.Height * sy);

    return desired;
};

//#endregion

//#region Arrange

Fayde.Image.Instance._ArrangeOverrideWithError = function (finalSize, error) {
    /// <param name="finalSize" type="Size"></param>
    var arranged = finalSize;
    var shapeBounds = new Rect();
    var source = this.Source;
    var sx = 1.0;
    var sy = 1.0;

    if (source != null)
        shapeBounds = new Rect(0, 0, source.PixelWidth, source.PixelHeight);

    if (shapeBounds.Width === 0)
        shapeBounds.Width = arranged.Width;
    if (shapeBounds.Height === 0)
        shapeBounds.Height = arguments.Height;

    if (shapeBounds.Width !== arranged.Width)
        sx = arranged.Width / shapeBounds.Width;
    if (shapeBounds.Height !== arranged.Height)
        sy = arranged.Height / shapeBounds.Height;

    switch (this.Stretch) {
        case Stretch.Uniform:
            sx = sy = Math.min(sx, sy);
            break;
        case Stretch.UniformToFill:
            sx = sy = Math.max(sx, sy);
            break;
        case Stretch.None:
            sx = sy = 1.0;
            break;
        default:
            break;
    }

    arranged = new Size(shapeBounds.Width * sx, shapeBounds.Height * sy);

    return arranged;
};

//#endregion

//#region Hit Testing

Fayde.Image.Instance._CanFindElement = function () { return true; };
Fayde.Image.Instance._InsideObject = function (ctx, x, y) {
    if (!this._InsideObject$FrameworkElement(ctx, x, y))
        return false;
    var source = this.Source;
    if (!source)
        return false;
    var stretch = this.Stretch;
    if (stretch === Stretch.Fill || stretch === Stretch.UniformToFill)
        return true;
    var metrics = this._CalculateRenderMetrics(source);
    if (!metrics)
        return null;

    var rect = new Rect(0, 0, source.PixelWidth, source.PixelHeight);
    rect = rect.Transform(metrics.Matrix);
    var np = new Point(x, y);
    this._TransformPoint(np);
    return rect.ContainsPoint(np);
};

//#endregion

Fayde.Image.Instance._ComputeActualSize = function () {
    var result = this._ComputeActualSize$FrameworkElement();

    var parent = this.GetVisualParent();
    var source = this.Source;

    if (parent && !Nullstone.Is(parent, Canvas))
        if (this._ReadLocalValue(LayoutInformation.LayoutSlotProperty) !== undefined)
            return result;

    if (source) {
        var available = new Size(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
        available = this._ApplySizeConstraints(available);
        var error = new BError();
        result = this._MeasureOverrideWithError(available, error);
        result = this._ApplySizeConstraints(result);
    }

    return result;
};

Fayde.Image.Instance._Render = function (ctx, region) {
    /// <param name="ctx" type="_RenderContext"></param>
    // Just to get something working, we do all the matrix transforms for stretching.
    // Eventually, we can let the html5 canvas do all the dirty work.

    var source = this.Source;
    if (!source)
        return;

    source.Lock();
    var metrics = this._CalculateRenderMetrics(source);
    if (!metrics) {
        source.Unlock();
        return;
    }

    ctx.Save();
    if (metrics.Overlap !== RectOverlap.In || this._HasLayoutClip())
        this._RenderLayoutClip(ctx);
    ctx.PreTransform(metrics.Matrix);
    ctx.CanvasContext.drawImage(source._Image, 0, 0);
    DrawDebug("Image: [" + source._Image.src + "]");
    ctx.Restore();

    source.Unlock();
};
Fayde.Image.Instance._CalculateRenderMetrics = function (source) {
    var stretch = this.Stretch;
    var specified = new Size(this.ActualWidth, this.ActualHeight);
    var stretched = this._ApplySizeConstraints(specified);
    var adjust = !Rect.Equals(specified, this._RenderSize);

    var pixelWidth = source.PixelWidth;
    var pixelHeight = source.PixelHeight;
    if (pixelWidth === 0 || pixelHeight === 0)
        return null;

    if (stretch !== Stretch.UniformToFill)
        specified = specified.Min(stretched);

    var paint = new Rect(0, 0, specified.Width, specified.Height);
    var image = new Rect(0, 0, pixelWidth, pixelHeight);

    if (stretch === Stretch.None)
        paint = paint.Union(image);

    var matrix = Fayde.Image.ComputeMatrix(paint.Width, paint.Height, image.Width, image.Height,
        stretch, AlignmentX.Center, AlignmentY.Center);

    if (adjust) {
        var error = new BError();
        this._MeasureOverrideWithError(specified, error);
        paint = new Rect((stretched.Width - specified.Width) * 0.5, (stretched.Height - specified.Height) * 0.5, specified.Width, specified.Height);
    }

    var overlap = RectOverlap.In;
    if (stretch === Stretch.UniformToFill || adjust) {
        var bounds = new Rect(paint.RoundOut());
        var box = image.Transform(matrix).RoundIn();
        overlap = bounds.RectIn(box);
    }

    return {
        Matrix: matrix,
        Overlap: overlap
    };
};

//#region Property Changed

Fayde.Image.Instance._OnSubPropertyChanged = function (propd, sender, args) {
    if (propd && (propd._ID === Fayde.Image.SourceProperty._ID)) {
        this._InvalidateMeasure();
        this._Invalidate();
        this.InvalidateProperty(propd, undefined, undefined);
        return;
    }
};
Fayde.Image.Instance._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== Fayde.Image) {
        this._OnPropertyChanged$FrameworkElement(args, error);
        return;
    }

    var ivprop = false;
    if (args.Property._ID === Fayde.Image.SourceProperty._ID) {
        var oldBmpSrc = Nullstone.As(args.OldValue, BitmapSource);
        if (oldBmpSrc) {
            oldBmpSrc._ErroredCallback = null;
            oldBmpSrc._LoadedCallback = null;
        }
        var newBmpSrc = Nullstone.As(args.NewValue, BitmapSource);
        if (newBmpSrc) {
            var i = this;
            newBmpSrc._ErroredCallback = function () { i.ImageFailed.Raise(this, new EventArgs()); };
            newBmpSrc._LoadedCallback = function () { i.ImageOpened.Raise(this, new EventArgs()); };
        } else {
            this._UpdateBounds();
            this._Invalidate();
        }
        this._InvalidateMeasure();
        ivprop = true;
    }
    if (ivprop)
        this.InvalidateProperty(args.Property, args.OldValue, args.NewValue);
    this.PropertyChanged.Raise(this, args);
};

//#endregion

Fayde.Image.Instance.CreateHtmlObjectImpl = function () {
    var rootEl = document.createElement("div");
    rootEl.appendChild(document.createElement("div"));
    this.InitializeHtml(rootEl);
    return rootEl;
};
Fayde.Image.Instance.ApplyHtmlChange = function (change) {
    var propd = change.Property;
    if (propd.OwnerType !== Fayde.Image) {
        this.ApplyHtmlChange$FrameworkElement(change);
        return;
    }

    var rootEl = this.GetRootHtmlElement();
    var imgEl = rootEl.firstChild;
    if (propd._ID === Fayde.Image.SourceProperty._ID) {
        var source = this.Source;
        //TODO: backgroundSize should be set according to the Stretch property
        imgEl.style.backgroundSize = "contain";
        imgEl.style.backgroundRepeat = "no-repeat";
        imgEl.style.backgroundImage = "url('" + source._Image.src + "')";
    }
};

Fayde.Image.ComputeMatrix = function (width, height, sw, sh, stretch, alignX, alignY) {
    /// <param name="width" type="Number"></param>
    /// <param name="height" type="Number"></param>
    /// <param name="sw" type="Number"></param>
    /// <param name="sh" type="Number"></param>
    /// <param name="stretch" type="Stretch"></param>
    /// <param name="alignX" type="Number"></param>
    /// <param name="alignY" type="Number"></param>

    var sx = width / sw;
    var sy = height / sh;
    if (width === 0)
        sx = 1.0;
    if (height === 0)
        sy = 1.0;

    if (stretch === Stretch.Fill) {
        return mat3.createScale(sx, sy);
    }

    var scale = 1.0;
    var dx = 0.0;
    var dy = 0.0;
    switch (stretch) {
        case Stretch.Uniform:
            scale = sx < sy ? sx : sy;
            break;
        case Stretch.UniformToFill:
            scale = sx < sy ? sy : sx;
            break;
        case Stretch.None:
            break;
    }

    switch (alignX) {
        case AlignmentX.Left:
            dx = 0.0;
            break;
        case AlignmentX.Center:
            dx = (width - (scale * sw)) / 2;
            break;
        case AlignmentX.Right:
        default:
            dx = width - (scale * sw);
            break;
    }

    switch (alignY) {
        case AlignmentY.Top:
            dy = 0.0;
            break;
        case AlignmentY.Center:
            dy = (height - (scale * sh)) / 2;
            break;
        case AlignmentY.Bottom:
        default:
            dy = height - (scale * sh);
            break;
    }
    var m = mat3.createScale(scale, scale);
    mat3.translate(m, dx, dy);
    return m;
};

Nullstone.FinishCreate(Fayde.Image);
//#endregion