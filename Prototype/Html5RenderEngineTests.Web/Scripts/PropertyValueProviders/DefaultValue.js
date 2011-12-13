/// <reference path="PropertyValueProvider.js" />

function _DefaultValuePropertyProvider(obj, propPrecedence) {
    _PropertyValueProvider.apply(this, obj, propPrecedence, 0);
    this.GetPropertyValue = function (propd) {
        return propd.DefaultValue;
    };
}
_DefaultValuePropertyProvider.prototype = new _PropertyValueProvider();