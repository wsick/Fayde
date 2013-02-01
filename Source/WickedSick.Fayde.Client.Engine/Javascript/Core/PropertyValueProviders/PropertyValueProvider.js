/// <reference path="../../Runtime/Nullstone.js" />
/// CODE

(function (Fayde) {
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

    Fayde._PropertyValueProvider = Nullstone.FinishCreate(_PropertyValueProvider);
})(Nullstone.Namespace("Fayde"));