/// <reference path="../Runtime/Nullstone.js" />
/// CODE
/// <reference path="Enums.js"/>
/// <reference path="TimeSpan.js"/>

//#region Duration
var Duration = Nullstone.Create("Duration", null, 1);

Duration.Instance.Init = function (value) {
    if (typeof value == "number") {
        this._Type = DurationType.TimeSpan;
        this._TimeSpan = new TimeSpan(value);
    } else if (value instanceof TimeSpan) {
        this._Type = DurationType.TimeSpan;
        this._TimeSpan = value;
    } else if (typeof value == "string") {
        if (value === "Automatic")
            this._Type = DurationType.Automatic;
        if (value === "Forever")
            this._Type = DurationType.Forever;
    }
};

Duration.CreateAutomatic = function () {
    /// <returns type="Duration" />
    var d = new Duration();
    d._Type = DurationType.Automatic;
    return d;
};
Duration.CreateForever = function () {
    /// <returns type="Duration" />
    var d = new Duration();
    d._Type = DurationType.Forever;
    return d;
};
Duration.CreateTimeSpan = function (timespan) {
    /// <param name="timespan" type="TimeSpan"></param>
    /// <returns type="Duration" />
    var d = new Duration();
    d._Type = DurationType.TimeSpan;
    d._TimeSpan = timespan;
    return d;
};

//#region PROPERTIES

Duration.Instance.GetType = function () {
    ///<returns type="RefObject"></returns>
    return this._Type;
};
Duration.Instance.GetTimeSpan = function () {
    ///<returns type="TimeSpan"></returns>
    if (this.HasTimeSpan())
        return this._TimeSpan;
    throw new InvalidOperationException();
};
Duration.Instance.HasTimeSpan = function () {
    /// <returns type="Boolean" />
    return this.GetType() === DurationType.TimeSpan;
};

//#endregion

Nullstone.FinishCreate(Duration);
//#endregion