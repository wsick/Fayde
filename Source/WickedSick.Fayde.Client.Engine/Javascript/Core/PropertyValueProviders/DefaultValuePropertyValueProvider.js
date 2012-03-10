/// <reference path="../../Runtime/Nullstone.js" />
/// <reference path="PropertyValueProvider.js"/>
/// <reference path="Enums.js"/>
/// CODE

//#region _DefaultValuePropertyValueProvider

function _DefaultValuePropertyValueProvider(obj, propPrecedence) {
    if (!Nullstone.IsReady)
        return;
    this.$super(obj, propPrecedence, 0);
}
Nullstone.Extend(_DefaultValuePropertyValueProvider, "_DefaultValuePropertyValueProvider", _PropertyValueProvider);

_DefaultValuePropertyValueProvider.prototype.GetPropertyValue = function (propd) {
    return propd.DefaultValue;
};

//#endregion
