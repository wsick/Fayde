/// <reference path="Shape.js"/>
/// CODE

//#region Ellipse
var Ellipse = Nullstone.Create("Ellipse", Shape);

Ellipse.Instance.Init = function () {
    this.Init$Shape();
    this.SetStretch(Stretch.Fill);
};

Ellipse.Instance._DrawPath = function (ctx) {
    if (this._Path == null)
        this._BuildPath();
    this._DrawPath$Shape(ctx);
};
Ellipse.Instance._BuildPath = function () {
    var stretch = this.GetStretch();
    var t = this._IsStroked() ? this.GetStrokeThickness() : 0.0;
    var rect = new Rect(0, 0, this.GetActualWidth(), this.GetActualHeight());

    switch (stretch) {
        case Stretch.None:
            rect.Width = rect.Height = 0;
            break;
        case Stretch.Uniform:
            rect.Width = rect.Height = Math.min(rect.Width, rect.Height);
            break;
        case Stretch.UniformToFill:
            rect.Width = rect.Height = Math.max(rect.Width, rect.Height);
            break;
        case Stretch.Fill:
            break;
    }

    if (t >= rect.Width || t >= rect.Height) {
        rect.Width = Math.max(rect.Width, t + t * 0.001);
        rect.Height = Math.max(rect.Height, t + t * 0.001);
        this._SetShapeFlags(ShapeFlags.Degenerate);
    } else {
        this._SetShapeFlags(ShapeFlags.Normal);
    }

    var ht = -t / 2;
    rect = rect.GrowBy(ht, ht, ht, ht);

    var kappa = .5522848; // 4 * ((sqrt(2) - 1) / 3)
    var ox = rect.Width / 2 * kappa;
    var oy = rect.Height / 2 * kappa;
    var right = rect.X + rect.Width;
    var bottom = rect.Y + rect.Height;
    var centerX = rect.X + rect.Width / 2;
    var centerY = rect.Y + rect.Height / 2;
    this._Path = [];
    //move to left edge, halfway down
    this._Path.push({ type: PathEntryType.Move, x: rect.X, y: centerY });
    //top left bezier curve
    this._Path.push({ type: PathEntryType.Bezier, cp1x: rect.X,         cp1y: centerY - oy, cp2x: centerX - ox, cp2y: rect.Y,       x: centerX, y: rect.Y });
    //top right bezier curve
    this._Path.push({ type: PathEntryType.Bezier, cp1x: centerX + ox,   cp1y: rect.Y,       cp2x: right,        cp2y: centerY - oy, x: right,   y: centerY });
    //bottom right bezier curve
    this._Path.push({ type: PathEntryType.Bezier, cp1x: right,          cp1y: centerY + oy, cp2x: centerX + ox, cp2y: bottom,       x: centerX, y: bottom });
    //bottom left bezier curve
    this._Path.push({ type: PathEntryType.Bezier, cp1x: centerX - ox,   cp1y: bottom,       cp2x: rect.X,       cp2y: centerY + oy, x: rect.X,  y: centerY });
};

Ellipse.Instance._ComputeStretchBounds = function () {
    /// <returns type="Rect" />
    return this._ComputeShapeBounds(false);
};
Ellipse.Instance._ComputeShapeBounds = function (logical) {
    var rect = new Rect(0, 0, this.GetActualWidth(), this.GetActualHeight());
    this._SetShapeFlags(ShapeFlags.Normal);

    var width = this.GetWidth();
    var height = this.GetHeight();
    if (rect.Width < 0.0 || rect.Height < 0.0 || width <= 0.0 || height <= 0.0) {
        this._SetShapeFlags(ShapeFlags.Empty);
        return new Rect();
    }

    var visualParent = this.GetVisualParent();
    if (visualParent != null && visualParent instanceof Canvas) {
        if (isNaN(width) !== isNaN(height)) {
            this._SetShapeFlags(ShapeFlags.Empty);
            return new Rect();
        }
    }

    var t = this._IsStroked() ? this.GetStrokeThickness() : 0.0;
    switch (this.GetStretch()) {
        case Stretch.None:
            rect.Width = rect.Height = 0.0;
            break;
        case Stretch.Uniform:
            rect.Width = rect.Height = Math.min(rect.Width, rect.Height);
            break;
        case Stretch.UniformToFill:
            rect.Width = rect.Height = Math.max(rect.Width, rect.Height);
            break;
        case Stretch.Fill:
            break;
    }

    if (t >= rect.Width || t >= rect.Height) {
        rect.Width = Math.max(rect.Width, t + t * 0.001);
        rect.Height = Math.max(rect.Height, t + t * 0.001);
        this._SetShapeFlags(ShapeFlags.Degenerate);
    } else {
        this._SetShapeFlags(ShapeFlags.Normal);
    }

    return rect;
};
Ellipse.Instance._ComputeShapeBoundsImpl = function (logical, matrix) {
    /// <returns type="Rect" />
    return logical ? new Rect(0, 0, 1.0, 1.0) : new Rect();
};

Nullstone.FinishCreate(Ellipse);
//#endregion