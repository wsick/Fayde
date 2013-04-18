/// <reference path="../Runtime/Nullstone.ts" />
/// CODE
var TimeSpan = (function () {
    function TimeSpan() {
        this._Ticks = 0;
    }
    TimeSpan._TicksPerMillisecond = 1;
    TimeSpan._TicksPerSecond = 1000;
    TimeSpan._TicksPerMinute = TimeSpan._TicksPerSecond * 60;
    TimeSpan._TicksPerHour = TimeSpan._TicksPerMinute * 60;
    TimeSpan._TicksPerDay = TimeSpan._TicksPerHour * 24;
    TimeSpan.FromTicks = function FromTicks(ticks) {
        var ts = new TimeSpan();
        ts._Ticks = ticks;
        return ts;
    };
    TimeSpan.FromArgs = function FromArgs(days, hours, minutes, seconds, milliseconds) {
        var ts = new TimeSpan();
        ts._Ticks = (days * TimeSpan._TicksPerDay) + (hours * TimeSpan._TicksPerHour) + (minutes * TimeSpan._TicksPerMinute) + (seconds * TimeSpan._TicksPerSecond) + (milliseconds * TimeSpan._TicksPerMillisecond);
        return ts;
    };
    Object.defineProperty(TimeSpan.prototype, "Days", {
        get: function () {
            return Math.floor(this._Ticks / TimeSpan._TicksPerDay);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSpan.prototype, "Hours", {
        get: function () {
            var remTicks = this._Ticks % TimeSpan._TicksPerDay;
            return Math.floor(remTicks / TimeSpan._TicksPerHour);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSpan.prototype, "Minutes", {
        get: function () {
            var remTicks = this._Ticks % TimeSpan._TicksPerDay;
            remTicks = remTicks % TimeSpan._TicksPerHour;
            return Math.floor(remTicks / TimeSpan._TicksPerMinute);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSpan.prototype, "Seconds", {
        get: function () {
            var remTicks = this._Ticks % TimeSpan._TicksPerDay;
            remTicks = remTicks % TimeSpan._TicksPerHour;
            remTicks = remTicks % TimeSpan._TicksPerMinute;
            return Math.floor(remTicks / TimeSpan._TicksPerSecond);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSpan.prototype, "Milliseconds", {
        get: function () {
            var remTicks = this._Ticks % TimeSpan._TicksPerDay;
            remTicks = remTicks % TimeSpan._TicksPerHour;
            remTicks = remTicks % TimeSpan._TicksPerMinute;
            remTicks = remTicks % TimeSpan._TicksPerSecond;
            return Math.floor(remTicks / TimeSpan._TicksPerMillisecond);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSpan.prototype, "Ticks", {
        get: function () {
            return this._Ticks;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSpan.prototype, "TotalDays", {
        get: function () {
            return this._Ticks / TimeSpan._TicksPerDay;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSpan.prototype, "TotalHours", {
        get: function () {
            return this._Ticks / TimeSpan._TicksPerHour;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSpan.prototype, "TotalMinutes", {
        get: function () {
            return this._Ticks / TimeSpan._TicksPerMinute;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSpan.prototype, "TotalSeconds", {
        get: function () {
            return this._Ticks / TimeSpan._TicksPerSecond;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSpan.prototype, "TotalMilliseconds", {
        get: function () {
            return this._Ticks / TimeSpan._TicksPerMillisecond;
        },
        enumerable: true,
        configurable: true
    });
    TimeSpan.prototype.AddTicks = function (ticks) {
        if(ticks == null) {
            return;
        }
        if(isNaN(ticks)) {
            return;
        }
        this._Ticks += ticks;
    };
    TimeSpan.prototype.AddMilliseconds = function (milliseconds) {
        this.AddTicks(milliseconds * TimeSpan._TicksPerMillisecond);
    };
    TimeSpan.prototype.Add = function (ts2) {
        var ts = new TimeSpan();
        ts._Ticks = this._Ticks + ts2._Ticks;
        return ts;
    };
    TimeSpan.prototype.Subtract = function (ts2) {
        var ts = new TimeSpan();
        ts._Ticks = this._Ticks - ts2._Ticks;
        return ts;
    };
    TimeSpan.prototype.Multiply = function (v) {
        var ts = new TimeSpan();
        ts._Ticks = Math.round(this._Ticks * v);
        return ts;
    };
    TimeSpan.prototype.Divide = function (ts2) {
        var ts = new TimeSpan();
        ts._Ticks = this._Ticks / ts2._Ticks;
        return ts;
    };
    TimeSpan.prototype.CompareTo = function (ts2) {
        if(this._Ticks === ts2._Ticks) {
            return 0;
        }
        return (this._Ticks > ts2._Ticks) ? 1 : -1;
    };
    TimeSpan.prototype.IsZero = function () {
        return this._Ticks === 0;
    };
    TimeSpan.prototype.GetJsDelay = function () {
        return this._Ticks * TimeSpan._TicksPerMillisecond;
    };
    return TimeSpan;
})();
Nullstone.RegisterType(TimeSpan, "TimeSpan");
//@ sourceMappingURL=TimeSpan.js.map
