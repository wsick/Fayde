/// <reference path="PropertyValueProvider.js" />

_DefaultValuePropertyProvider.prototype = new _PropertyValueProvider;
_DefaultValuePropertyProvider.prototype.constructor = _DefaultValuePropertyProvider;
function _DefaultValuePropertyProvider(obj, propPrecedence) {
    _PropertyValueProvider.call(this, obj, propPrecedence, 0);  
}
_DefaultValuePropertyProvider.prototype.GetPropertyValue = function (propd) {
    return propd.DefaultValue;
};