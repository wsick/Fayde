/// <reference path="../Runtime/RefObject.js" />
/// CODE

//#region TimeSpan

function TimeSpan() {
    RefObject.call(this);
    if (!IsDocumentReady())
        return;
    this._Initialize.apply(this, arguments);
}
TimeSpan.InheritFrom(RefObject);

TimeSpan.prototype._Initialize = function () {
    if (arguments.length === 0) {
        this._Ticks = 0;
        return;
    }
    if (arguments.length === 1) { //ticks
        this._Ticks = arguments[0];
        return;
    }

    var days = 0;
    var hours = 0;
    var minutes = 0;
    var seconds = 0;
    var milliseconds = 0;
    if (arguments.length === 3) { //hours, minutes, seconds
        hours = arguments[0];
        minutes = arguments[1];
        seconds = arguments[2];
    } else if (arguments.length === 4) { //days, hours, minutes, seconds
        days = arguments[0];
        hours = arguments[1];
        minutes = arguments[2];
        seconds = arguments[3];
    } else if (arguments.length === 5) { //days, hours, minutes, seconds, milliseconds
        days = arguments[0];
        hours = arguments[1];
        minutes = arguments[2];
        seconds = arguments[3];
        milliseconds = arguments[4];
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