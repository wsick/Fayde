/// <reference path="../Runtime/Nullstone.js" />
/// CODE

//#region TimeSpan

function TimeSpan() {
    if (!Nullstone.IsReady)
        return;
    this._Initialize(arguments);
}
Nullstone.Create(TimeSpan, "TimeSpan");

TimeSpan.prototype._Initialize = function (args) {
    if (args.length === 0) {
        this._Ticks = 0;
        return;
    }
    if (args.length === 1) { //ticks
        this._Ticks = args[0];
        return;
    }

    var days = 0;
    var hours = 0;
    var minutes = 0;
    var seconds = 0;
    var milliseconds = 0;
    if (args.length === 3) { //hours, minutes, seconds
        hours = args[0];
        minutes = args[1];
        seconds = args[2];
    } else if (args.length === 4) { //days, hours, minutes, seconds
        days = args[0];
        hours = args[1];
        minutes = args[2];
        seconds = args[3];
    } else if (args.length === 5) { //days, hours, minutes, seconds, milliseconds
        days = args[0];
        hours = args[1];
        minutes = args[2];
        seconds = args[3];
        milliseconds = args[4];
    }
    this._Ticks = (days * TimeSpan._TicksPerDay) + (hours * TimeSpan._TicksPerHour) + (minutes * TimeSpan._TicksPerMinute)
        + (seconds * TimeSpan._TicksPerSecond) + (milliseconds * TimeSpan._TicksPerMillisecond);
};

//#region PROPERTIES

TimeSpan.prototype.GetDays = function () {
    ///<returns type="Number"></returns>
    return Math.floor(this._Ticks / TimeSpan._TicksPerDay);
};
TimeSpan.prototype.GetHours = function () {
    ///<returns type="Number"></returns>
    var remTicks = this._Ticks % TimeSpan._TicksPerDay;
    return Math.floor(remTicks / TimeSpan._TicksPerHour);
};
TimeSpan.prototype.GetMinutes = function () {
    ///<returns type="Number"></returns>
    var remTicks = this._Ticks % TimeSpan._TicksPerDay;
    remTicks = remTicks % TimeSpan._TicksPerHour;
    return Math.floor(remTicks / TimeSpan._TicksPerMinute);
};
TimeSpan.prototype.GetSeconds = function () {
    ///<returns type="Number"></returns>
    var remTicks = this._Ticks % TimeSpan._TicksPerDay;
    remTicks = remTicks % TimeSpan._TicksPerHour;
    remTicks = remTicks % TimeSpan._TicksPerMinute;
    return Math.floor(remTicks / TimeSpan._TicksPerSecond);
};
TimeSpan.prototype.GetMilliseconds = function () {
    ///<returns type="Number"></returns>
    var remTicks = this._Ticks % TimeSpan._TicksPerDay;
    remTicks = remTicks % TimeSpan._TicksPerHour;
    remTicks = remTicks % TimeSpan._TicksPerMinute;
    remTicks = remTicks % TimeSpan._TicksPerSecond;
    return Math.floor(remTicks / TimeSpan._TicksPerMillisecond);
};
TimeSpan.prototype.GetTicks = function () {
    return this._Ticks;
};

TimeSpan.prototype.GetTotalDays = function () {
    ///<returns type="Number"></returns>
    return this._Ticks / TimeSpan._TicksPerDay;
};
TimeSpan.prototype.GetTotalHours = function () {
    ///<returns type="Number"></returns>
    return this._Ticks / TimeSpan._TicksPerHour;
};
TimeSpan.prototype.GetTotalMinutes = function () {
    ///<returns type="Number"></returns>
    return this._Ticks / TimeSpan._TicksPerMinute;
};
TimeSpan.prototype.GetTotalSeconds = function () {
    ///<returns type="Number"></returns>
    return this._Ticks / TimeSpan._TicksPerSecond;
};
TimeSpan.prototype.GetTotalMilliseconds = function () {
    ///<returns type="Number"></returns>
    return this._Ticks / TimeSpan._TicksPerMillisecond;
};

//#endregion

TimeSpan.prototype.AddTicks = function (ticks) {
    if (ticks == null)
        return;
    if (isNaN(ticks))
        return;
    this._Ticks += ticks;
};
TimeSpan.prototype.AddMilliseconds = function (milliseconds) {
    this.AddTicks(milliseconds * TimeSpan._TicksPerMillisecond);
};

TimeSpan.prototype.Add = function (ts2) {
    /// <param name="ts2" type="TimeSpan"></param>
    /// <returns type="TimeSpan" />
    return new TimeSpan(this._Ticks + ts2._Ticks);
};
TimeSpan.prototype.Subtract = function (ts2) {
    /// <param name="ts2" type="TimeSpan"></param>
    /// <returns type="TimeSpan" />
    return new TimeSpan(this._Ticks - ts2._Ticks);
};
TimeSpan.prototype.Multiply = function (v) {
    if (v instanceof TimeSpan) {
    } else if (typeof v == "number") {
        return new TimeSpan(Math.round(this._Ticks * v));
    }
}
TimeSpan.prototype.Divide = function (ts2) {
    return new TimeSpan(this._Ticks / ts2._Ticks);
};
TimeSpan.prototype.CompareTo = function (ts2) {
    /// <param name="ts2" type="TimeSpan"></param>
    /// <returns type="Number" />
    if (this._Ticks === ts2)
        return 0;
    return (this._Ticks > ts2) ? 1 : -1;
};
TimeSpan.prototype.IsZero = function () {
    /// <returns type="Boolean" />
    return this._Ticks === 0;
};

TimeSpan._TicksPerMillisecond = 1;
TimeSpan._TicksPerSecond = 1000;
TimeSpan._TicksPerMinute = TimeSpan._TicksPerSecond * 60;
TimeSpan._TicksPerHour = TimeSpan._TicksPerMinute * 60;
TimeSpan._TicksPerDay = TimeSpan._TicksPerHour * 24;

//#endregion