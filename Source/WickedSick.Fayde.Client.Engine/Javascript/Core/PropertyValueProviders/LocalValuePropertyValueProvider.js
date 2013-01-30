/// <reference path="../../Runtime/Nullstone.js" />
/// <reference path="Enums.js"/>
/// <reference path="PropertyValueProvider.js"/>
/// CODE

(function (Fayde) {
    var _LocalValuePropertyValueProvider = Nullstone.Create("_LocalValuePropertyValueProvider", Fayde._PropertyValueProvider, 1);

    _LocalValuePropertyValueProvider.Instance.Init = function (obj) {
        this.Init$_PropertyValueProvider(obj, _PropertyPrecedence.LocalValue);
        this._ht = [];

        //this._ProvidesLocalValue = true;
    };

    _LocalValuePropertyValueProvider.Instance.GetPropertyValue = function (propd) {
        return this._ht[propd._ID];
    };
    _LocalValuePropertyValueProvider.Instance.SetValue = function (propd, value) {
        this._ht[propd._ID] = value;
    };
    _LocalValuePropertyValueProvider.Instance.ClearValue = function (propd) {
        delete this._ht[propd._ID];
    };

    Fayde._LocalValuePropertyValueProvider = Nullstone.FinishCreate(_LocalValuePropertyValueProvider);
})(Nullstone.Namespace("Fayde"));