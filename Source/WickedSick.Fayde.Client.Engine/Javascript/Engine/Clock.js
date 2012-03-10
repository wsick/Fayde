/// <reference path="../Runtime/Nullstone.js"/>
/// CODE
/// <reference path="JsEx.js"/>

//#region Clock

function Clock() {
    if (!Nullstone.IsReady)
        return;
    this._Timers = new Array();
}
Nullstone.Create(Clock, "Clock");

Clock.prototype.RegisterTimer = function (timer) {
    if (!Array.addDistinctRefObject(this._Timers, timer))
        return;
    if (this._Timers.length === 1)
        this.RequestAnimationTick();
};
Clock.prototype.UnregisterTimer = function (timer) {
    Array.removeRefObject(this._Timers, timer);
};
Clock.prototype.DoTick = function () {
    var nowTime = new Date().getTime();
    if (!this._RunTimers(this._LastTime, nowTime)) {
        return;
    }
    this._LastTime = nowTime;
    this.RequestAnimationTick();
};
Clock.prototype._RunTimers = function (lastTime, nowTime) {
    if (this._Timers.length === 0)
        return false;
    for (var i = 0; i < this._Timers.length; i++) {
        var timer = this._Timers[i];
        timer._Tick(this._LastTime, nowTime);
    }
    return true;
};

Clock.prototype.RequestAnimationTick = function () {
    var clock = this;
    Clock._RequestAnimationFrame(function () { clock.DoTick(); });
};
Clock._RequestAnimationFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 200);
        };
})();

//#endregion