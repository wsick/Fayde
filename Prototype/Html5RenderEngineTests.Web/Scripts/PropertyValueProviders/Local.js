/// <reference path="PropertyValueProvider.js" />

function _LocalPropertyValueProvider(obj, propPrecedence) {
    _PropertyValueProvider.apply(this, obj, propPrecedence, _ProviderFlags.ProvidesLocalValue);
    this._ht = new Array();
    this.GetPropertyValue = function (propd) {
        return this._ht[propd];
    };
    this.SetValue = function (propd, value) {
        this._ht[propd] = value;
    };
    this.ClearValue = function (propd) {
        delete this._ht[propd];
    };
}
_LocalPropertyValueProvider.prototype = new _PropertyValueProvider();