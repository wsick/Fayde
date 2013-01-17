/// <reference path="../../Runtime/Nullstone.js" />
/// <reference path="PropertyValueProvider.js"/>
/// <reference path="Enums.js"/>
/// CODE

(function (namespace) {
    var _DefaultValuePropertyValueProvider = Nullstone.Create("_DefaultValuePropertyValueProvider", _PropertyValueProvider, 2);

    _DefaultValuePropertyValueProvider.Instance.Init = function (obj, propPrecedence) {
        this.Init$_PropertyValueProvider(obj, propPrecedence);
    }

    _DefaultValuePropertyValueProvider.Instance.GetPropertyValue = function (propd) {
        return propd.DefaultValue;
    };

    namespace._DefaultValuePropertyValueProvider = Nullstone.FinishCreate(_DefaultValuePropertyValueProvider);
})(window);