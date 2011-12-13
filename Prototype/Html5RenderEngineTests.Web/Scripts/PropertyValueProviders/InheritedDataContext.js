/// <reference path="PropertyValueProvider.js" />
/// <reference path="/Scripts/Error.js" />
/// <reference path="/Scripts/FrameworkElement.js" />

function _InheritedDataContextPropertyValueProvider(obj, propPrecedence) {
    _PropertyValueProvider.apply(this, obj, propPrecedence);
    this._Source = null;
    this._SourceDataContextChanged = function (sender, args, error) {
        this._Object.ProviderValueChanged(this._PropertyPrecedence, args.Property, args.OldValue, args.NewValue, true, false, false, error);
    };
    this.GetPropertyValue = function (propd) {
        if (!this._Source || propd != FrameworkElement.DataContextProperty)
            return null;
        return this._Source.GetValue(propd);
    };
    this.SetDataSource = function (source) {
        if (this._Source == source)
            return;

        var oldValue = this._Source ? this._Source.GetValue(FrameworkElement.DataContextProperty) : null;
        var newValue = source ? source.GetValue(FrameworkElement.DataContextProperty) : null;

        this._Source.RemovePropertyChangeListener(FrameworkElement.DataContextProperty);
        this._Source = source;
        this._Source.AddPropertyChangeListener(FrameworkElement.DataContextProperty, this._SourceDataContextChanged);

        if (oldValue != newValue) {
            var error = new BError();
            this._Object.ProviderValueChanged(this._PropertyPrecedence, FrameworkElement.DataContextProperty, oldValue, newValue, false, false, false, error);
        }
    };
    this.EmitChanged = function () {
        if (this._Source) {
            var error = new BError();
            this._Object.ProviderValueChanged(this._PropertyPrecedence, FrameworkElement.DataContextProperty, null, this._Source.GetValue(FrameworkElement.DataContextProperty), true, false, false, error);
        }
    };
}
_InheritedDataContextPropertyValueProvider.prototype = new _PropertyValueProvider();