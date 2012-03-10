/// <reference path="../../Runtime/Nullstone.js" />
/// <reference path="Enums.js"/>
/// <reference path="PropertyValueProvider.js"/>
/// CODE

//#region _LocalValuePropertyValueProvider

function _LocalValuePropertyValueProvider(obj, propPrecedence) {
    if (!Nullstone.IsReady)
        return;
    this.$super(obj, propPrecedence, _ProviderFlags.ProvidesLocalValue);
    this._ht = new Array();
}
Nullstone.Extend(_LocalValuePropertyValueProvider, "_LocalValuePropertyValueProvider", _PropertyValueProvider);

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