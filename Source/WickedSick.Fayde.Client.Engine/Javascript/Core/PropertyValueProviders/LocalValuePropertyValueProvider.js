/// <reference path="../../Runtime/Nullstone.js" />
/// <reference path="Enums.js"/>
/// <reference path="PropertyValueProvider.js"/>
/// CODE

//#region _LocalValuePropertyValueProvider
var _LocalValuePropertyValueProvider = Nullstone.Create("_LocalValuePropertyValueProvider", _PropertyValueProvider, 2);

_LocalValuePropertyValueProvider.Instance.Init = function (obj, propPrecedence) {
    this.Init$_PropertyValueProvider(obj, propPrecedence);
    this._ht = [];

    //this._ProvidesLocalValue = true;
};

_LocalValuePropertyValueProvider.Instance.GetPropertyValue = function (propd) {
    return this._ht[propd._ID];
};
_LocalValuePropertyValueProvider.Instance.SetValue = function (propd, value) {
    this._ht[propd._ID] = value;
};
_LocalValuePropertyValueProvider.Instance.ClearValue = function (propd) {
    delete this._ht[propd._ID];
};

Nullstone.FinishCreate(_LocalValuePropertyValueProvider);
//#endregion