/// <reference path="../Runtime/Nullstone.js" />
/// CODE
/// <reference path="Enums.js"/>
/// <reference path="Surface.js"/>

//#region _RenderContext
var _RenderContext = Nullstone.Create("_RenderContext", null, 1);

_RenderContext.Instance.Init = function (surface) {
    this._Surface = surface;
    this._Transforms = [];
};

_RenderContext.Instance.GetSurface = function () {
    return this._Surface;
};
_RenderContext.Instance.GetCanvasContext = function () {
    return this._Surface._Ctx;
};
_RenderContext.Instance.Clip = function (clip) {
    this._DrawClip(clip);
    this._Surface._Ctx.clip();
};
_RenderContext.Instance.IsPointInPath = function (p) {
    return this._Surface._Ctx.isPointInPath(p.X, p.Y);
};
_RenderContext.Instance.IsPointInClipPath = function (clip, p) {
    this._DrawClip(clip);
    return this._Surface._Ctx.isPointInPath(p.X, p.Y);
};
_RenderContext.Instance._DrawClip = function (clip) {
    if (clip instanceof Rect) {
        this._Surface._Ctx.rect(rect.X, rect.Y, rect.Width, rect.Height);
        DrawDebug("DrawClip (Rect): " + clip.toString());
    } else if (clip instanceof Geometry) {
        clip.Draw(this);
        DrawDebug("DrawClip (Geometry): " + clip.toString());
    }
};

_RenderContext.Instance.Transform = function (matrix) {
    if (matrix instanceof Transform) {
        matrix = matrix.Matrix;
    }
    var ct = this._CurrentXform;
    Matrix.Multiply(ct, matrix, ct);
    var els = ct._Elements;
    this._Surface._Ctx.setTransform(els[0], els[1], els[3], els[4], els[2], els[5]);
};
_RenderContext.Instance.PreTransform = function (matrix) {
    if (matrix instanceof Transform) {
        matrix = matrix.Matrix;
    }
    var ct = this._CurrentXform;
    Matrix.Multiply(ct, ct, matrix);
    var els = ct._Elements;
    this._Surface._Ctx.setTransform(els[0], els[1], els[3], els[4], els[2], els[5]);
};
_RenderContext.Instance.GetCurrentTransform = function () {
    return this._CurrentXform;
};
_RenderContext.Instance.GetInverseTransform = function () {
    return this._CurrentXform.Inverse;
};
_RenderContext.Instance.Save = function () {
    this._Surface._Ctx.save();
    var ct = this._CurrentXform;
    this._Transforms.push(ct);
    this._CurrentXform = ct == null ? new Matrix() : ct.Copy();
};
_RenderContext.Instance.Restore = function () {
    var curXform = this._Transforms.pop();
    this._CurrentXform = curXform;
    this._Surface._Ctx.restore();
};

_RenderContext.Instance.Fill = function (brush, region) {
    /// <param name="brush" type="Brush"></param>
    brush.SetupBrush(this._Surface._Ctx, region);
    this._Surface._Ctx.fillStyle = brush.ToHtml5Object();
    this._Surface._Ctx.fill();
    DrawDebug("Fill: [" + this._Surface._Ctx.fillStyle.toString() + "]");
};
_RenderContext.Instance.FillRect = function (brush, rect) {
    /// <param name="brush" type="Brush"></param>
    /// <param name="rect" type="Rect"></param>
    brush.SetupBrush(this._Surface._Ctx, rect);
    this._Surface._Ctx.fillStyle = brush.ToHtml5Object();
    this._Surface._Ctx.fillRect(rect.X, rect.Y, rect.Width, rect.Height);
    DrawDebug("FillRect: [" + this._Surface._Ctx.fillStyle.toString() + "] " + rect.toString());
};
_RenderContext.Instance.Stroke = function (stroke, thickness, region) {
    /// <param name="stroke" type="Brush"></param>
    stroke.SetupBrush(this._Surface._Ctx, region);
    this._Surface._Ctx.strokeStyle = stroke.ToHtml5Object();
    this._Surface._Ctx.lineWidth = thickness;
    this._Surface._Ctx.stroke();
    DrawDebug("Stroke: [" + this._Surface._Ctx.strokeStyle.toString() + "] -> " + this._Surface._Ctx.lineWidth.toString());
};

_RenderContext.Instance.Clear = function (rect) {
    this._Surface._Ctx.clearRect(rect.X, rect.Y, rect.Width, rect.Height);
    DrawDebug("Clear: " + rect.toString());
};
_RenderContext.Instance.SetGlobalAlpha = function (alpha) {
    this._Surface._Ctx.globalAlpha = alpha;
};

_RenderContext.ToArray = function (args) {
    var arr = [];
    for (var i in args)
        arr.push(args[i]);
    return arr;
};

Nullstone.FinishCreate(_RenderContext);
//#endregion