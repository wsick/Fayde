/// <reference path="../../Runtime/Nullstone.js" />
/// <reference path="Enums.js"/>
/// <reference path="PropertyValueProvider.js"/>
/// CODE

//#region _LocalValuePropertyValueProvider
var _LocalValuePropertyValueProvider = Nullstone.Create("_LocalValuePropertyValueProvider", _PropertyValueProvider, 2);

_LocalValuePropertyValueProvider.Instance.Init = function (obj, propPrecedence) {
    this.Init$_PropertyValueProvider(obj, propPrecedence, _ProviderFlags.ProvidesLocalValue);
    this._ht = [];
};

_LocalValuePropertyValueProvider.Instance.GetPropertyValue = function (propd) {
    return this._ht[propd];
};
_LocalValuePropertyValueProvider.Instance.SetValue = function (propd, value) {
    this._ht[propd] = value;
};
_LocalValuePropertyValueProvider.Instance.ClearValue = function (propd) {
    delete this._ht[propd];
};

Nullstone.FinishCreate(_LocalValuePropertyValueProvider);
//#endregion