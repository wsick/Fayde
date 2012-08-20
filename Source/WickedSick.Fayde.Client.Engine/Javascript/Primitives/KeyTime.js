/// <reference path="../Runtime/Nullstone.js"/>
/// CODE

//#region KeyTime
var KeyTime = Nullstone.Create("KeyTime");

KeyTime.Instance.Init = function () {
    this._IsUniform = true;
    this.IsValid = true;
    //TODO: IsValid is false for coercing from null
};

KeyTime.Instance.IsPaced = function () {
    return this._IsPaced === true;
};
KeyTime.Instance.IsUniform = function () {
    return this._IsUniform === true;
};
KeyTime.Instance.HasTimeSpan = function () {
    return this._Timespan != null;
};
KeyTime.Instance.HasPercent = function () {
    return this._Percent != null;
};

Nullstone.FinishCreate(KeyTime);
//#endregion