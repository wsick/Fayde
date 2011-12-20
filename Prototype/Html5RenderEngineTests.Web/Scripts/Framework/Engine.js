/// <reference path="Surface.js"/>

var __Engine = new Engine();

Engine.prototype = new Object();
Engine.prototype.constructor = Engine;
function Engine() {
}
Engine.prototype.MainSurface = new Surface();
Engine.prototype.Load = function (/* UIElement */element) {
    if (!(element instanceof UIElement))
        return;
    this.MainSurface._SetTopElement(element);
};
Engine.prototype.Start = function () {
    var fps = 50.0;
    var engine = this;
    setTimeout(function () { engine._Tick(); }, (1.0 / fps) * 1000.0);
};
Engine.prototype._Tick = function () {
    var ctx = new _RenderContext(this.MainSurface);
    surface.Paint(ctx);
};

_RenderContext.prototype = new Object();
_RenderContext.prototype.constructor = _RenderContext;
function _RenderContext(surface) {
    this._Surface = surface;
}
_RenderContext.prototype.GetSurface = function () {
    return this._Surface;
};