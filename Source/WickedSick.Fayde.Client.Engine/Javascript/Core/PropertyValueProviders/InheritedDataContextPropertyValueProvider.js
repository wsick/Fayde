/// <reference path="../../Runtime/Nullstone.js" />
/// <reference path="PropertyValueProvider.js"/>
/// <reference path="Enums.js"/>
/// CODE
/// <reference path="../Data/PropertyChangedListener.js"/>

//#region _InheritedDataContextPropertyValueProvider
var _InheritedDataContextPropertyValueProvider = Nullstone.Create("_InheritedDataContextPropertyValueProvider", _PropertyValueProvider, 2);

_InheritedDataContextPropertyValueProvider.Instance.Init = function (obj, propPrecedence) {
    this.Init$super(obj, propPrecedence);
    this._Source = null;
};

_InheritedDataContextPropertyValueProvider.Instance.GetPropertyValue = function (propd) {
    if (!this._Source || propd != FrameworkElement.DataContextProperty)
        return null;
    return this._Source.GetValue(propd);
};
_InheritedDataContextPropertyValueProvider.Instance.SetDataSource = function (source) {
    if (RefObject.RefEquals(this._Source, source))
        return;

    var oldValue = this._Source != null ? this._Source.GetValue(FrameworkElement.DataContextProperty) : null;
    var newValue = source != null ? source.GetValue(FrameworkElement.DataContextProperty) : null;

    this._DetachListener(this._Source);
    this._Source = source;
    this._AttachListener(this._Source);

    if (!RefObject.Equals(oldValue, newValue)) {
        var error = new BError();
        this._Object._ProviderValueChanged(this._PropertyPrecedence, FrameworkElement.DataContextProperty, oldValue, newValue, false, false, false, error);
    }
};
_InheritedDataContextPropertyValueProvider.Instance._AttachListener = function (source) {
    if (source != null) {
        this._DataContextListener = new PropertyChangedListener(source, FrameworkElement.DataContextProperty, this, this._SourceDataContextChanged);
        //TODO: Add Handler - Destroyed Event
    }
};
_InheritedDataContextPropertyValueProvider.Instance._DetachListener = function (source) {
    if (this._DataContextListener != null) {
        this._DataContextListener.Detach();
        this._DataContextListener = null;
    }
    if (source != null) {
        //TODO: Remove Handler - Destroyed Event
    }
};
_InheritedDataContextPropertyValueProvider.Instance._SourceDataContextChanged = function (sender, args) {
    var error = new BError();
    this._Object._ProviderValueChanged(this._PropertyPrecedence, args.Property, args.OldValue, args.NewValue, true, false, false, error);
};
_InheritedDataContextPropertyValueProvider.Instance.EmitChanged = function () {
    if (this._Source != null) {
        var error = new BError();
        this._Object._ProviderValueChanged(this._PropertyPrecedence, FrameworkElement.DataContextProperty, null, this._Source.GetValue(FrameworkElement.DataContextProperty), true, false, false, error);
    }
};

Nullstone.FinishCreate(_InheritedDataContextPropertyValueProvider);
//#endregion