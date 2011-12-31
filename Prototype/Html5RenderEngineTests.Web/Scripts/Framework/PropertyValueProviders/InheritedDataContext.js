/// <reference path="PropertyValueProvider.js" />
/// <reference path="/Scripts/Framework/BError.js" />
/// <reference path="/Scripts/Framework/FrameworkElement.js" />

_InheritedDataContextPropertyValueProvider.prototype = new _PropertyValueProvider;
_InheritedDataContextPropertyValueProvider.prototype.constructor = _InheritedDataContextPropertyValueProvider;
function _InheritedDataContextPropertyValueProvider(obj, propPrecedence) {
    _PropertyValueProvider.call(this, obj, propPrecedence);
    this._Source = null;
}
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

    this._DetachListener(this._Source);
    this._Source = source;
    this._AttachListener(this._Source);

    if (oldValue != newValue) {
        var error = new BError();
        this._Object._ProviderValueChanged(this._PropertyPrecedence, FrameworkElement.DataContextProperty, oldValue, newValue, false, false, false, error);
    }
};
_InheritedDataContextPropertyValueProvider.prototype._AttachListener = function (source) {
    if (source) {
        var matchFunc = function (sender, args) {
            return this == args.Property; //Closure - FrameworkElement.DataContextProperty
        };
        source.PropertyChanged.SubscribeSpecific(this._SourceDataContextChanged, this, matchFunc, FrameworkElement.DataContextProperty);
        //TODO: Add Handler - Destroyed Event
    }
};
_InheritedDataContextPropertyValueProvider.prototype._DetachListener = function (source) {
    if (source) {
        source.PropertyChanged.Unsubscribe(this._SourceDataContextChanged, this, FrameworkElement.DataContextProperty);
        //TODO: Remove Handler - Destroyed Event
    }
};
_InheritedDataContextPropertyValueProvider.prototype._SourceDataContextChanged = function (sender, args) {
    var error = BError();
    this._Object._ProviderValueChanged(this._PropertyPrecedence, args.Property, args.OldValue, args.NewValue, true, false, false, error);
};
_InheritedDataContextPropertyValueProvider.prototype.EmitChanged = function () {
    if (this._Source) {
        var error = new BError();
        this._Object._ProviderValueChanged(this._PropertyPrecedence, FrameworkElement.DataContextProperty, null, this._Source.GetValue(FrameworkElement.DataContextProperty), true, false, false, error);
    }
};
