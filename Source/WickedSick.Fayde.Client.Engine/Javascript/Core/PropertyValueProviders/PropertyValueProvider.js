/// <reference path="../../Runtime/Nullstone.js" />
/// CODE

//#region _PropertyValueProvider
var _PropertyValueProvider = Nullstone.Create("_PropertyValueProvider", undefined, 2);

_PropertyValueProvider.Instance.Init = function (obj, propPrecedence) {
    this._Object = obj;
    this._PropertyPrecedence = propPrecedence;
};

_PropertyValueProvider.Instance.GetPropertyValue = function (propd) {
    AbstractMethod("_PropertyValueProvider.GetPropertyValue(propd)");
};
_PropertyValueProvider.Instance.ForeachValue = function (func, data) {
    if (!func)
        return;
    for (var value in this._ht)
        func(DependencyProperty._IDs[value], this._ht[value], data);
};

Nullstone.FinishCreate(_PropertyValueProvider);
//#endregion