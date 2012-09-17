/// <reference path="../../Runtime/Nullstone.js" />
/// <reference path="PropertyValueProvider.js"/>
/// <reference path="Enums.js"/>
/// CODE

//#region _DefaultValuePropertyValueProvider
var _DefaultValuePropertyValueProvider = Nullstone.Create("_DefaultValuePropertyValueProvider", _PropertyValueProvider, 2);

_DefaultValuePropertyValueProvider.Instance.Init = function (obj, propPrecedence) {
    this.Init$_PropertyValueProvider(obj, propPrecedence);
}

_DefaultValuePropertyValueProvider.Instance.GetPropertyValue = function (propd) {
    return propd.DefaultValue;
};

Nullstone.FinishCreate(_DefaultValuePropertyValueProvider);
//#endregion