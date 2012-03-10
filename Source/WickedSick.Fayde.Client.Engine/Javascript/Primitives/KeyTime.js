/// <reference path="../Runtime/Nullstone.js"/>
/// CODE

//#region KeyTime
var KeyTime = Nullstone.Create("KeyTime");

KeyTime.CreateUniform = function () {
    var kt = new KeyTime();
    kt._IsUniform = true;
    return kt;
};

KeyTime.Instance.IsPaced = function () {
    return this._IsPaced == true;
};
KeyTime.Instance.IsUniform = function () {
    return this._IsUniform == true;
};

Nullstone.FinishCreate(KeyTime);
//#endregion