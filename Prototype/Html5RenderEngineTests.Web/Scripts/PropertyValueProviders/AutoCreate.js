/// <reference path="PropertyValueProvider.js" />

function _AutoCreatePropertyValueProvider(obj, propPrecedence) {
    _PropertyValueProvider.apply(this, obj, propPrecedence, _ProviderFlags.ProvidesLocalValue);
    this._ht = new Array();
    this.GetPropertyValue = function (propd) {
        var value = this.ReadLocalValue(propd);
        if (value)
            return value;

        value = propd.IsAutoCreated() ? propd.GetAutoCreatedValue(this._Object) : null;
        if (!value)
            return null;

        this._ht[propd] = value;
        var error = new BError();
        this._Object.ProviderValueChanged(this._PropertyPrecedence, propd, null, value, false, true, false, error);
        return value;
    };
    this.RecomputePropertyValue = function (propd, providerFlags, error) {
        if ((providerFlags & _ProviderFlags.RecomputesOnClear) == 0)
            return;
        this.ClearValue(propd);
    };
    this.ReadLocalValue = function (propd) {
        return this._ht[propd];
    };
    this.ClearValue = function (propd) {
        delete this._ht[propd];
    };
}
_AutoCreatePropertyValueProvider.prototype = new _PropertyValueProvider();

var _AutoCreators = {
    DefaultFontSize: 11,
    DefaultBlackBrush: "#000000"
};