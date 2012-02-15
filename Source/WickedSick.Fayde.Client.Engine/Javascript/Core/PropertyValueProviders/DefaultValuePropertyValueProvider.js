/// <reference path="PropertyValueProvider.js"/>
/// <reference path="Enums.js"/>
/// CODE

//#region _DefaultValuePropertyValueProvider

function _DefaultValuePropertyValueProvider(obj, propPrecedence) {
    _PropertyValueProvider.call(this, obj, propPrecedence, 0);
}
_DefaultValuePropertyValueProvider.InheritFrom(_PropertyValueProvider);

_DefaultValuePropertyValueProvider.prototype.GetPropertyValue = function (propd) {
    return propd.DefaultValue;
};

//#endregion