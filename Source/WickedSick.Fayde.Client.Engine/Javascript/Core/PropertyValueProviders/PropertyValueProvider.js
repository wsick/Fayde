/// <reference path="../../Runtime/Nullstone.js" />
/// CODE

//#region _PropertyValueProvider
var _PropertyValueProvider = Nullstone.Create("_PropertyValueProvider", null, 3);

_PropertyValueProvider.Instance.Init = function (obj, propPrecedence, flags) {
    this._Object = obj;
    this._PropertyPrecedence = propPrecedence;
    this._Flags = flags;
};

_PropertyValueProvider.Instance._HasFlag = function (flag) {
    return (this._Flags & flag) != 0;
};
_PropertyValueProvider.Instance.GetPropertyValue = function (propd) {
    AbstractMethod("_PropertyValueProvider.GetPropertyValue(propd)");
};
_PropertyValueProvider.Instance.ForeachValue = function (func, data) {
    if (!func)
        return;
    for (var value in this._ht)
        func(value, this._ht[value], data);
};
_PropertyValueProvider.Instance.RecomputePropertyValue = function (propd, providerFlags, error) {
};

Nullstone.FinishCreate(_PropertyValueProvider);
//#endregion