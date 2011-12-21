/// <reference path="Surface.js"/>

Engine.prototype = new Object;
Engine.prototype.constructor = Engine;
function Engine() {
}
Engine.prototype.MainSurface = new Surface();
Engine.prototype.Load = function (/* UIElement */element) {
    if (!(element instanceof UIElement))
        return;
    this.MainSurface._AttachLayer(element);
};
Engine.prototype.Start = function () {
    var fps = 50.0;
    var engine = this;
    setTimeout(function () { engine._Tick(); }, (1.0 / fps) * 1000.0);
};
Engine.prototype._Tick = function () {
    var extents = this.MainSurface.GetExtents();
    var region = new Rect(0, 0, extents.Width, extents.Height);
    this.MainSurface.Render(region);
};

var __Engine = new Engine();