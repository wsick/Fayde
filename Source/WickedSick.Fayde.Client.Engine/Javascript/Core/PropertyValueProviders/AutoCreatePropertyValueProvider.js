/// <reference path="../../Runtime/Nullstone.js" />
/// <reference path="PropertyValueProvider.js"/>
/// <reference path="Enums.js"/>
/// CODE

//#region _AutoCreatePropertyValueProvider
var _AutoCreatePropertyValueProvider = Nullstone.Create("_AutoCreatePropertyValueProvider", _PropertyValueProvider, 2);

_AutoCreatePropertyValueProvider.Instance.Init = function (obj, propPrecedence) {
    this.Init$super(obj, propPrecedence, _ProviderFlags.ProvidesLocalValue);
    this._ht = new Array();
}

_AutoCreatePropertyValueProvider.Instance.GetPropertyValue = function (propd) {
    var value = this.ReadLocalValue(propd);
    if (value !== undefined)
        return value;

    value = propd._IsAutoCreated() ? propd._GetAutoCreatedValue(this._Object) : null;
    if (value == null)
        return null;

    this._ht[propd] = value;
    var error = new BError();
    this._Object._ProviderValueChanged(this._PropertyPrecedence, propd, null, value, false, true, false, error);
    return value;
};
_AutoCreatePropertyValueProvider.Instance.RecomputePropertyValue = function (propd, providerFlags, error) {
    if ((providerFlags & _ProviderFlags.RecomputesOnClear) == 0)
        return;
    this.ClearValue(propd);
};
_AutoCreatePropertyValueProvider.Instance.ReadLocalValue = function (propd) {
    return this._ht[propd];
};
_AutoCreatePropertyValueProvider.Instance.ClearValue = function (propd) {
    delete this._ht[propd];
};

Nullstone.FinishCreate(_AutoCreatePropertyValueProvider);
//#endregio