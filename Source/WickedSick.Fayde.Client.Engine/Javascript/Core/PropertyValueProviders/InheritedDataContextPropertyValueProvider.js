/// <reference path="../../Runtime/Nullstone.js" />
/// <reference path="PropertyValueProvider.js"/>
/// <reference path="Enums.js"/>
/// CODE
/// <reference path="../Data/PropertyChangedListener.js"/>

//#region _InheritedDataContextPropertyValueProvider
var _InheritedDataContextPropertyValueProvider = Nullstone.Create("_InheritedDataContextPropertyValueProvider", _PropertyValueProvider, 2);

_InheritedDataContextPropertyValueProvider.Instance.Init = function (obj, propPrecedence) {
    this.Init$_PropertyValueProvider(obj, propPrecedence);
    this._Source = null;
};

_InheritedDataContextPropertyValueProvider.Instance.GetPropertyValue = function (propd) {
    if (!this._Source || propd._ID !== FrameworkElement.DataContextProperty._ID)
        return undefined;
    return this._Source._GetValue(propd);
};
_InheritedDataContextPropertyValueProvider.Instance.SetDataSource = function (source) {
    if (Nullstone.RefEquals(this._Source, source))
        return;

    var oldValue = this._Source ? this._Source._GetValue(FrameworkElement.DataContextProperty) : undefined;
    var newValue = source ? source._GetValue(FrameworkElement.DataContextProperty) : undefined;

    this._DetachListener(this._Source);
    this._Source = source;
    this._AttachListener(this._Source);

    if (!Nullstone.Equals(oldValue, newValue)) {
        var error = new BError();
        this._Object._ProviderValueChanged(this._PropertyPrecedence, FrameworkElement.DataContextProperty, oldValue, newValue, false, false, false, error);
    }
};
_InheritedDataContextPropertyValueProvider.Instance._AttachListener = function (source) {
    if (source) {
        this._DataContextListener = new PropertyChangedListener(source, FrameworkElement.DataContextProperty, this, this._SourceDataContextChanged);
        //TODO: Add Handler - Destroyed Event
    }
};
_InheritedDataContextPropertyValueProvider.Instance._DetachListener = function (source) {
    if (this._DataContextListener) {
        this._DataContextListener.Detach();
        delete this._DataContextListener;
    }
    if (source) {
        //TODO: Remove Handler - Destroyed Event
    }
};
_InheritedDataContextPropertyValueProvider.Instance._SourceDataContextChanged = function (sender, args) {
    var error = new BError();
    this._Object._ProviderValueChanged(this._PropertyPrecedence, args.Property, args.OldValue, args.NewValue, true, false, false, error);
};
_InheritedDataContextPropertyValueProvider.Instance.EmitChanged = function () {
    if (this._Source) {
        var error = new BError();
        this._Object._ProviderValueChanged(this._PropertyPrecedence, FrameworkElement.DataContextProperty, undefined, this._Source._GetValue(FrameworkElement.DataContextProperty), true, false, false, error);
    }
};

Nullstone.FinishCreate(_InheritedDataContextPropertyValueProvider);
//#endregion