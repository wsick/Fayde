/// <reference path="../../Runtime/RefObject.js" />
/// <reference path="Enums.js"/>
/// <reference path="PropertyValueProvider.js"/>
/// CODE

//#region _LocalValuePropertyValueProvider

function _LocalValuePropertyValueProvider(obj, propPrecedence) {
    _PropertyValueProvider.call(this, obj, propPrecedence, _ProviderFlags.ProvidesLocalValue);
    this._ht = new Array();
}
_LocalValuePropertyValueProvider.InheritFrom(_PropertyValueProvider);

_LocalValuePropertyValueProvider.prototype.GetPropertyValue = function (propd) {
    return this._ht[propd];
};
_LocalValuePropertyValueProvider.prototype.SetValue = function (propd, value) {
    this._ht[propd] = value;
};
_LocalValuePropertyValueProvider.prototype.ClearValue = function (propd) {
    delete this._ht[propd];
};

//#endregion
