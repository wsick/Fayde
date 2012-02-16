/// <reference path="../../Runtime/RefObject.js" />
/// <reference path="PropertyValueProvider.js"/>
/// <reference path="Enums.js"/>
/// CODE

//#region _InheritedIsEnabledPropertyValueProvider

function _InheritedIsEnabledPropertyValueProvider(obj, propPrecedence) {
    _PropertyValueProvider.call(this, obj, propPrecedence, _ProviderFlags.RecomputesOnLowerPriorityChange);
    this._Source = null;
    this._CurrentValue = this._Object.GetValue(Control.IsEnabledProperty, _PropertyPrecedence.LocalValue);
}
_InheritedIsEnabledPropertyValueProvider.InheritFrom(_PropertyValueProvider);

_InheritedIsEnabledPropertyValueProvider.prototype.GetPropertyValue = function (propd) {
    if (propd === Control.IsEnabledProperty)
        return this._CurrentValue;
    return null;
};
_InheritedIsEnabledPropertyValueProvider.prototype.SetDataSource = function (source) {
    if (source) {
        while (source) {
            if (source instanceof Control)
                break;
            else if (source instanceof FrameworkElement)
                source = source._GetLogicalParent();
            else
                source = null;
        }
    }

    if (this._Source != source) {
        this._DetachListener(this._Source);
        this._Source = source;
        this._AttachListener(this._Source);
    }

    if (!source || this._Object.IsAttached())
        this.LocalValueChanged(null);
};
_InheritedIsEnabledPropertyValueProvider.prototype._AttachListener = function (obj) {
    if (source) {
        var matchFunc = function (sender, args) {
            return this === args.Property; //Closure - Control.IsEnabledProperty
        };
        source.PropertyChanged.SubscribeSpecific(this._IsEnabledChanged, this, matchFunc, Control.IsEnabledProperty);
        //TODO: Add Handler - Destroyed Event
    }
};
_InheritedIsEnabledPropertyValueProvider.prototype._DetachListener = function (source) {
    if (source) {
        source.PropertyChanged.Unsubscribe(this._IsEnabledChanged, this, Control.IsEnabledProperty);
        //TODO: Remove Handler - Destroyed Event
    }
};
_InheritedIsEnabledPropertyValueProvider.prototype._IsEnabledChanged = function (sender, args) {
    this.LocalValueChanged(args.Property);
};
_InheritedIsEnabledPropertyValueProvider.prototype.LocalValueChanged = function (propd) {
    if (propd && propd !== Control.IsEnabledProperty)
        return false;

    var localEnabled = this._Object.GetValue(Control.IsEnabledProperty, _PropertyPrecedence.LocalValue);
    var parentEnabled = this._Source && this._Object.GetVisualParent() ? this._Source.GetValue(Control.IsEnabledProperty) : null;
    var newValue = localEnabled == true && (parentEnabled == null || parentEnabled == true);
    if (newValue != this._CurrentValue) {
        var oldValue = this._CurrentValue;
        this._CurrentValue = newValue;

        var error = new BError();
        this._Object._ProviderValueChanged(this._PropertyPrecedence, Control.IsEnabledProperty, oldValue, newValue, true, false, false, error);
        return true;
    }
    return false;
};

//#endregion
