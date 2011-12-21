/// <reference path="PropertyValueProvider.js" />

_LocalPropertyValueProvider.prototype = new _PropertyValueProvider;
_LocalPropertyValueProvider.prototype.con = _LocalPropertyValueProvider;
function _LocalPropertyValueProvider(obj, propPrecedence) {
    _PropertyValueProvider.call(this, obj, propPrecedence, _ProviderFlags.ProvidesLocalValue);
    this._ht = new Array();
}
_LocalPropertyValueProvider.prototype.GetPropertyValue = function (propd) {
    return this._ht[propd];
};
_LocalPropertyValueProvider.prototype.SetValue = function (propd, value) {
    this._ht[propd] = value;
};
_LocalPropertyValueProvider.prototype.ClearValue = function (propd) {
    delete this._ht[propd];
};