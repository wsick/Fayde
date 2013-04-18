/// <reference path="../Runtime/Nullstone.ts" />
/// CODE
var Fayde;
(function (Fayde) {
    var requestAnimFrame = (function () {
        return window.requestAnimationFrame || (window).webkitRequestAnimationFrame || (window).mozRequestAnimationFrame || (window).oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
            window.setTimeout(callback, 1000 / 200);
        };
    })();
    var ClockTimer = (function () {
        function ClockTimer() {
            this._Listeners = [];
            this._LastTime = 0;
        }
        ClockTimer.prototype.RegisterTimer = function (listener) {
            var ls = this._Listeners;
            var index = ls.indexOf(listener);
            if(index > -1) {
                return;
            }
            ls.push(listener);
            if(ls.length === 1) {
                this._RequestAnimationTick();
            }
        };
        ClockTimer.prototype.UnregisterTimer = function (listener) {
            var ls = this._Listeners;
            var index = ls.indexOf(listener);
            if(index > -1) {
                ls.splice(index, 1);
            }
        };
        ClockTimer.prototype._DoTick = function () {
            var nowTime = new Date().getTime();
            var lastTime = this._LastTime;
            this._LastTime = nowTime;
            var ls = this._Listeners;
            var len = ls.length;
            if(len === 0) {
                return;
            }
            for(var i = 0; i < len; i++) {
                ls[i].Tick(lastTime, nowTime);
            }
            this._RequestAnimationTick();
        };
        ClockTimer.prototype._RequestAnimationTick = function () {
            var _this = this;
            requestAnimFrame(function () {
                return _this._DoTick();
            });
        };
        return ClockTimer;
    })();
    Fayde.ClockTimer = ClockTimer;    
    Nullstone.RegisterType(ClockTimer, "ClockTimer");
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=ClockTimer.js.map
