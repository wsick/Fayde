/// <reference path="PropertyValueProvider.js" />
/// <reference path="/Scripts/Error.js" />
/// <reference path="/Scripts/FrameworkElement.js" />

_InheritedDataContextPropertyValueProvider.prototype = new _PropertyValueProvider;
_InheritedDataContextPropertyValueProvider.prototype.constructor = _InheritedDataContextPropertyValueProvider;
function _InheritedDataContextPropertyValueProvider(obj, propPrecedence) {
    _PropertyValueProvider.call(this, obj, propPrecedence);
    this._Source = null;
}
_InheritedDataContextPropertyValueProvider.prototype._SourceDataContextChanged = function (sender, args, error) {
    this._Object._ProviderValueChanged(this._PropertyPrecedence, args.Property, args.OldValue, args.NewValue, true, false, false, error);
};
_InheritedDataContextPropertyValueProvider.prototype.GetPropertyValue = function (propd) {
    if (!this._Source || propd != FrameworkElement.DataContextProperty)
        return null;
    return this._Source.GetValue(propd);
};
_InheritedDataContextPropertyValueProvider.prototype.SetDataSource = function (source) {
    if (this._Source == source)
        return;

    var oldValue = this._Source ? this._Source.GetValue(FrameworkElement.DataContextProperty) : null;
    var newValue = source ? source.GetValue(FrameworkElement.DataContextProperty) : null;

    if (this._Source) {
        this._Source._RemovePropertyChangeHandler(FrameworkElement.DataContextProperty, this._SourceDataContextChanged);
        //TODO: Remove Handler - Destroyed Event
    }
    this._Source = source;
    if (this._Source) {
        this._Source._AddPropertyChangeHandler(FrameworkElement.DataContextProperty, this._SourceDataContextChanged);
        //TODO: Add Handler - Destroyed Event
    }

    if (oldValue != newValue) {
        var error = new BError();
        this._Object._ProviderValueChanged(this._PropertyPrecedence, FrameworkElement.DataContextProperty, oldValue, newValue, false, false, false, error);
    }
};
_InheritedDataContextPropertyValueProvider.prototype.EmitChanged = function () {
    if (this._Source) {
        var error = new BError();
        this._Object._ProviderValueChanged(this._PropertyPrecedence, FrameworkElement.DataContextProperty, null, this._Source.GetValue(FrameworkElement.DataContextProperty), true, false, false, error);
    }
};