/// <reference path="/Scripts/kinetic-v2.3.2.js"/>
/// <reference path="Primitives.js"/>
/// <reference path="Brush.js"/>

Surface.prototype = new Object();
Surface.prototype.constructor = Surface;
Surface.prototype._BackgroundColor = new Color();
/*
function Surface(containerId, width, height) {
    this._Stage = new Kinetic.Stage(containerId, width, height);
}
*/
function Surface() {
}
Surface.prototype.Init = function (jCanvas) {
    this._jCanvas = jCanvas;
    this._Canvas = jCanvas[0];
    this._Ctx = this._Canvas.getContext("2d");
};
Surface.prototype.GetExtents = function () {
    return new Size(this._jCanvas.height(), this._jCanvas.width());
};
Surface.prototype._Attach = function (/* UIElement */element) {
};
Surface.prototype._AttachLayer = function (/* UIElement */layer) {
};
Surface.prototype.Render = function (region) {
    var ctx = new _RenderContext(this);

    var renderList = new Array();
    var layerCount = 0;
    if (this._Layers)
        layerCount = this._Layers.GetCount();

    this._Ctx.fillStyle = this._BackgroundColor.toString();
    this._Ctx.fillRect(region.X, region.Y, region.Width, region.Height);
    for (var i = 0; i < layerCount; i++) {
        var layer = this._Layers.GetValueAt(i);
        layer._DoRender(ctx, region);
    }
};


_RenderContext.prototype = new Object();
_RenderContext.prototype.constructor = _RenderContext;
_RenderContext.prototype._Surface = new Surface();
function _RenderContext(surface) {
    this._Surface = surface;
}
_RenderContext.prototype.GetSurface = function () {
    return this._Surface;
};
_RenderContext.prototype.Clip = function (clip) {
    if (clip instanceof Rect) {
        this._Surface._Ctx.rect(rect.X, rect.Y, rect.Width, rect.Height);
        this._Surface._Ctx.clip();
    } else if (clip instanceof Geometry) {
        clip.Draw(this._Surface._Ctx);
        this._Surface._Ctx.clip();
    }
};
_RenderContext.prototype.Transform = function (matrix) {
    matrix.Apply(this._Surface._Ctx);
};
_RenderContext.prototype.Save = function () {
    this._Surface._Ctx.save();
}
_RenderContext.prototype.Restore = function () {
    this._Surface._Ctx.restore();
};
_RenderContext.prototype.Fill = function (region, brush) {
    if (region instanceof Rect) {
        this._Surface._Ctx.fillStyle = brush._Translate();
        this._Surface._Ctx.fillRect(region.X, region.Y, region.Width, region.Height);
    }
};
_RenderContext.prototype.CustomRender = function (painterFunc) {
    var args = new Array();
    args.push(this._Surface._Ctx);
    var skip = true; //ignore 1st argument (painterFunc)
    for (var i in arguments) {
        if (skip)
            skip = false;
        else
            args.push(arguments[i]);
    }
    painterFunc.apply(this, args);
};