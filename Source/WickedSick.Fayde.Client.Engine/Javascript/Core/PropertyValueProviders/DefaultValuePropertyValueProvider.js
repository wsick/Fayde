/// <reference path="../../Runtime/Nullstone.js" />
/// <reference path="PropertyValueProvider.js"/>
/// <reference path="Enums.js"/>
/// CODE

(function (Fayde) {
    var _DefaultValuePropertyValueProvider = Nullstone.Create("_DefaultValuePropertyValueProvider", Fayde._PropertyValueProvider, 1);

    _DefaultValuePropertyValueProvider.Instance.Init = function (obj) {
        this.Init$_PropertyValueProvider(obj, _PropertyPrecedence.DefaultValue);
    }

    _DefaultValuePropertyValueProvider.Instance.GetPropertyValue = function (propd) {
        return propd.DefaultValue;
    };

    Fayde._DefaultValuePropertyValueProvider = Nullstone.FinishCreate(_DefaultValuePropertyValueProvider);
})(Nullstone.Namespace("Fayde"));