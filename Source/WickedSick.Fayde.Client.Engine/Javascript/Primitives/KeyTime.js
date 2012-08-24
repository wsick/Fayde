/// <reference path="../Runtime/Nullstone.js"/>
/// CODE
/// <reference path="TimeSpan.js"/>

//#region KeyTime
var KeyTime = Nullstone.Create("KeyTime");

KeyTime.Instance.Init = function () {
    this.IsValid = true;
    //TODO: IsValid is false for coercing from null
};

KeyTime.CreateUniform = function () {
    this._IsUniform = true;
};
KeyTime.CreateTimeSpan = function (ts) {
    var kt = new KeyTime();
    kt._TimeSpan = ts;
    return kt;
};

KeyTime.Instance.IsPaced = function () {
    return this._IsPaced === true;
};
KeyTime.Instance.IsUniform = function () {
    return this._IsUniform === true;
};
KeyTime.Instance.HasTimeSpan = function () {
    return this._TimeSpan != null;
};
KeyTime.Instance.GetTimeSpan = function () {
    return this._TimeSpan;
};
KeyTime.Instance.HasPercent = function () {
    return this._Percent != null;
};

Nullstone.FinishCreate(KeyTime);
//#endregion