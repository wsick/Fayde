/// CODE

//#region _PropertyValueProvider

function _PropertyValueProvider(obj, propPrecedence, flags) {
    RefObject.call(this);
    this._Object = obj;
    this._PropertyPrecedence = propPrecedence;
    this._Flags = flags;
}
_PropertyValueProvider.InheritFrom(RefObject);

_PropertyValueProvider.prototype._HasFlag = function (flag) {
    return (this._Flags & flag) != 0;
};
_PropertyValueProvider.prototype.GetPropertyValue = function (propd) {
    AbstractMethod("_PropertyValueProvider.GetPropertyValue(propd)");
};
_PropertyValueProvider.prototype.ForeachValue = function (func, data) {
    if (!func)
        return;
    for (var value in this._ht)
        func(value, this._ht[value], data);
};
_PropertyValueProvider.prototype.RecomputePropertyValue = function (propd, providerFlags, error) {
};

//#endregion