/// <reference path="Nullstone.js"/>
/// CODE

//#region Dictionary

function Dictionary() {
    if (!Nullstone.IsReady)
        return;
    this._ht = new Array();
}
Nullstone.Create(Dictionary, "Dictionary");

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