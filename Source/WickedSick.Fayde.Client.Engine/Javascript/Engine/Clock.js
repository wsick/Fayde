/// <reference path="../Runtime/Nullstone.js"/>
/// CODE
/// <reference path="JsEx.js"/>

//#region Clock
var Clock = Nullstone.Create("Clock");

Clock.Instance.Init = function () {
    this._Timers = new Array();
};

Clock.Instance.RegisterTimer = function (timer) {
    if (!Array.addDistinctRefObject(this._Timers, timer))
        return;
    if (this._Timers.length === 1)
        this.RequestAnimationTick();
};
Clock.Instance.UnregisterTimer = function (timer) {
    Array.removeRefObject(this._Timers, timer);
};
Clock.Instance.DoTick = function () {
    var nowTime = new Date().getTime();
    if (!this._RunTimers(this._LastTime, nowTime)) {
        return;
    }
    this._LastTime = nowTime;
    this.RequestAnimationTick();
};
Clock.Instance._RunTimers = function (lastTime, nowTime) {
    if (this._Timers.length === 0)
        return false;
    for (var i = 0; i < this._Timers.length; i++) {
        var timer = this._Timers[i];
        timer._Tick(this._LastTime, nowTime);
    }
    return true;
};

Clock.Instance.RequestAnimationTick = function () {
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

Nullstone.FinishCreate(Clock);
//#endregion