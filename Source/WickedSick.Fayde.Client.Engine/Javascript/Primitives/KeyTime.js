/// <reference path="../Runtime/RefObject.js"/>
/// CODE

//#region KeyTime

function KeyTime() {
    RefObject.call(this);
}
KeyTime.InheritFrom(RefObject);

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