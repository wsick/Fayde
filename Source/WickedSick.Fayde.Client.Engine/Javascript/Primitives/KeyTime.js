/// <reference path="../Runtime/Nullstone.js"/>
/// CODE

//#region KeyTime

function KeyTime() {
    if (!Nullstone.IsReady)
        return;
}
Nullstone.Create(KeyTime, "KeyTime");

KeyTime.CreateUniform = function () {
    var kt = new KeyTime();
    kt._IsUniform = true;
    return kt;
};

KeyTime.prototype.IsPaced = function () {
    return this._IsPaced == true;
};
KeyTime.prototype.IsUniform = function () {
    return this._IsUniform == true;
};

//#endregion