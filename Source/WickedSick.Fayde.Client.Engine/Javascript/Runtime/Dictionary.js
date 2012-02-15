/// <reference path="RefObject.js"/>
/// CODE

//#region Dictionary

function Dictionary() {
    RefObject.call(this);
    this._ht = new Array();
}
Dictionary.InheritFrom(RefObject);

Dictionary.prototype.TryGetValue = function (key, data) {
    data.Value = this._ht[key];
    return data.Value != null;
};
Dictionary.prototype.Add = function (key, value) {
    this._ht[key] = value;
};
Dictionary.prototype.Remove = function (key) {
    delete this._ht[key];
};

//#endregion