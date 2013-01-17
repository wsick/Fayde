/// <reference path="../Runtime/Nullstone.js"/>
/// CODE
/// <reference path="../Runtime/JsEx.js"/>

(function (namespace) {
    var ClockTimer = Nullstone.Create("ClockTimer");

    ClockTimer.Instance.Init = function () {
        this._Timers = [];
    };

    ClockTimer.Instance.RegisterTimer = function (timer) {
        if (!Array.addDistinctNullstone(this._Timers, timer))
            return;
        if (this._Timers.length === 1)
            this.RequestAnimationTick();
    };
    ClockTimer.Instance.UnregisterTimer = function (timer) {
        Array.removeNullstone(this._Timers, timer);
    };
    ClockTimer.Instance.DoTick = function () {
        var nowTime = new Date().getTime();
        if (!this._RunTimers(this._LastTime, nowTime)) {
            return;
        }
        this._LastTime = nowTime;
        this.RequestAnimationTick();
    };
    ClockTimer.Instance._RunTimers = function (lastTime, nowTime) {
        if (this._Timers.length === 0)
            return false;
        for (var i = 0; i < this._Timers.length; i++) {
            var timer = this._Timers[i];
            timer._Tick(this._LastTime, nowTime);
        }
        return true;
    };

    ClockTimer.Instance.RequestAnimationTick = function () {
        var clockTimer = this;
        window.requestAnimFrame(function () { clockTimer.DoTick(); });
    };

    namespace.ClockTimer = Nullstone.FinishCreate(ClockTimer);
})(window);