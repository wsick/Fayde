/// <reference path="Surface.js"/>

App.prototype = new Object;
App.prototype.constructor = App;
function App() {
    this.MainSurface = new Surface();
}
App.prototype.Load = function (/* UIElement */element) {
    if (!(element instanceof UIElement))
        return;
    this.MainSurface._Attach(element);
    this.Start();
};
App.prototype.Start = function () {
    var fps = 30.0;
    var app = this;
    this._TickID = setInterval(function () { app._Tick(); }, (1.0 / fps) * 1000.0);
};
App.prototype._Tick = function () {
    if (this._IsRunning)
        return;
    this._IsRunning = true;
    var extents = this.MainSurface.GetExtents();
    var region = new Rect(0, 0, extents.Width, extents.Height);
    this.MainSurface.ProcessDirtyElements(region);
    this._IsRunning = false;
};
App.prototype._Stop = function () {
    clearInterval(this._TickID);
};
App.Instance = new App();