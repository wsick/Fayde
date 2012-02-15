/// <reference path="Enums.js"/>
/// <reference path="PropertyValueProvider.js"/>
/// CODE

//#region _LocalPropertyValueProvider

function _LocalPropertyValueProvider(obj, propPrecedence) {
    _PropertyValueProvider.call(this, obj, propPrecedence, _ProviderFlags.ProvidesLocalValue);
    this._ht = new Array();
}
_LocalPropertyValueProvider.InheritFrom(_PropertyValueProvider);

_LocalPropertyValueProvider.prototype.GetPropertyValue = function (propd) {
    return this._ht[propd];
};
_LocalPropertyValueProvider.prototype.SetValue = function (propd, value) {
    this._ht[propd] = value;
};
_LocalPropertyValueProvider.prototype.ClearValue = function (propd) {
    delete this._ht[propd];
};

//#endregion