var _PropertyPrecedence = {
    IsEnabled: 0,
    LocalValue: 1,
    DynamicValue: 2,

    LocalStyle: 3,
    ImplicitStyle: 4,

    Inherited: 5,
    InheritedDataContext: 6,
    DefaultValue: 7,
    AutoCreate: 8
};
_PropertyPrecedence.Highest = _PropertyPrecedence.IsEnabled;
_PropertyPrecedence.Lowest = _PropertyPrecedence.AutoCreate;
_PropertyPrecedence.Count = 9;

var _ProviderFlags = {
    RecomputesOnLowerPriorityChange: 1,
    RecomputesOnHigherPriorityChange: 2,
    RecomputesOnClear: 4,
    ProvidesLocalValue: 8
};

function _PropertyValueProvider(obj, propPrecedence, flags) {
    this._Object = obj;
    this._PropertyPrecedence = propPrecedence;
    this._Flags = flags;
    this._HasFlag = function (flag) {
        return (this._Flags & flag) != 0;
    };
    this.GetPropertyValue = function (propd) {
        alert("Abstract Method");
    };
    this.ForeachValue = function (func, data) {
        if (!func)
            return;
        for (var value in this._ht)
            func(value, data);
    };
    this.RecomputePropertyValue = function (propd, providerFlags, error) {
    };
}
_PropertyValueProvider.prototype = new Object();