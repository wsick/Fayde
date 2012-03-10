/// <reference path="Nullstone.js"/>
/// CODE

//#region Dictionary
var Dictionary = Nullstone.Create("Dictionary");

Dictionary.Instance.Init = function () {
    this._ht = new Array();
};

Dictionary.Instance.TryGetValue = function (key, data) {
    data.Value = this._ht[key];
    return data.Value != null;
};
Dictionary.Instance.Add = function (key, value) {
    this._ht[key] = value;
};
Dictionary.Instance.Remove = function (key) {
    delete this._ht[key];
};

Nullstone.FinishCreate(Dictionary);
//#endregion