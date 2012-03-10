/// <reference path="../Runtime/Nullstone.js" />
/// CODE
/// <reference path="Surface.js"/>

//#region _RenderContext

function _RenderContext(surface) {
    if (!Nullstone.IsReady)
        return;
    this._Surface = surface;
    this._Transforms = new Array();
}
Nullstone.Create(_RenderContext, "_RenderContext");

_RenderContext.prototype.GetSurface = function () {
    return this._Surface;
};
_RenderContext.prototype.Clip = function (clip) {
    this._DrawClip(clip);
    this._Surface._Ctx.clip();
};
_RenderContext.prototype.IsPointInClipPath = function (clip, p) {
    this._Surface._Ctx.clear();
    this._DrawClip(clip);
    return this._Surface._Ctx.isPointInPath(p.X, p.Y);
};
_RenderContext.prototype._DrawClip = function (clip) {
    if (clip instanceof Rect) {
        this._Surface._Ctx.rect(rect.X, rect.Y, rect.Width, rect.Height);
    } else if (clip instanceof Geometry) {
        clip.Draw(this._Surface._Ctx);
    }
};
_RenderContext.prototype.Transform = function (matrix) {
    matrix.Apply(this._Surface._Ctx);
    this._CurrentTransform = matrix.MultiplyMatrix(this._CurrentTransform);
    this._InverseTransform = this._InverseTransform.MultiplyMatrix(matrix.GetInverse());
};
_RenderContext.prototype.GetCurrentTransform = function () {
    return this._CurrentTransform;
};
_RenderContext.prototype.GetInverseTransform = function () {
    return this._InverseTransform;
};
_RenderContext.prototype.Save = function () {
    this._Surface._Ctx.save();
    this._Transforms.push({ Current: this._CurrentTransform, Inverse: this._InverseTransform });
    this._CurrentTransform = this._CurrentTransform == null ? new Matrix() : this._CurrentTransform.Copy();
    this._InverseTransform = this._InverseTransform == null ? new Matrix() : this._InverseTransform.Copy();
};
_RenderContext.prototype.Restore = function () {
    var temp = this._Transforms.pop();
    this._CurrentTransform = temp.Current;
    this._InverseTransform = temp.Inverse;
    this._Surface._Ctx.restore();
};
_RenderContext.prototype.Fill = function (region, brush) {
    if (region instanceof Rect) {
        this._Surface._Ctx.fillStyle = brush._Translate(this._Surface._Ctx, region);
        this._Surface._Ctx.fillRect(region.X, region.Y, region.Width, region.Height);
    }
};
_RenderContext.prototype.Clear = function (rect) {
    this._Surface._Ctx.clearRect(rect.X, rect.Y, rect.Width, rect.Height);
};
_RenderContext.prototype.CustomRender = function (painterFunc) {
    var args = _RenderContext.ToArray(arguments);
    args.shift(); //remove painterFunc
    args.unshift(this._Surface._Ctx); //prepend canvas context
    painterFunc.apply(this, args);
};
_RenderContext.prototype.SetGlobalAlpha = function (alpha) {
    this._Surface._Ctx.globalAlpha = alpha;
};

_RenderContext.ToArray = function(args) {
    var arr = new Array();
    for (var i in args)
        arr.push(args[i]);
    return arr;
};

//#endregion