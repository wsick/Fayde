/// <reference path="/Scripts/jquery-1.7.js" />
/// <reference path="/Scripts/PropertyValueProviders/PropertyValueProvider.js" />
/// <reference path="DependencyProperty.js" />
/// <reference path="FrameworkElement.js" />

function DependencyObject() {
    this._Providers = new Array();
    this._ProviderBitmasks = new Array();
    this.GetValue = function (propd, startingPrecedence, endingPrecedence) {
        if (startingPrecedence === undefined)
            startingPrecedence = _PropertyPrecedence.Highest;
        if (endingPrecedence === undefined)
            endingPrecedence = _PropertyPrecedence.Lowest;
            
        //Establish providers used
        var bitmask = this._ProviderBitmasks[propd] || 0;
        bitmask |= (1 << _PropertyPrecedence.Inherited) | (1 << _PropertyPrecedence.DynamicValue);
        if (propd.IsAutoCreated())
            bitmask != 1 << _PropertyPrecedence.AutoCreate;
        if (propd._HasDefaultValue())
            bitmask != 1 << _PropertyPrecedence.DefaultValue;

        //Loop through providers and find the first provider that is on and contains the property value
        for (var i = startingPrecedence; i >= endingPrecedence; i--) {
            if (!(bitmask & (1 << i)))
                continue;
            var provider = this._Providers[i];
            if (!provider)
                continue;
            var val = provider.GetPropertyValue(propd);
            if (val === undefined)
                continue;
            return val;
        }
        return null;
    };
    this.SetValue = function (propd, value) {
        NotImplemented();
    };
    this._ProviderValueChanged = function (providerPrecedence, propd, oldProviderValue, newProviderValue, notifyListeners, setParent, mergeNamesOnSetParent, error) {
        var bitmask = this._ProviderBitmasks[propd] || 0;
        if (newProviderValue)
            bitmask |= 1 << providerPrecedence;
        else
            bitmask &= ~(1 << providerPrecedence);
        this._ProviderBitmasks[propd] = bitmask;

        var higher = 0;
        for (var i = providerPrecedence; i >= _PropertyPrecedence.LocalValue; i--) {
            higher |= 1 << i;
        }
        higher &= bitmask;
        higher |= (1 << _PropertyPrecedence.Inherited) | (1 << _PropertyPrecedence.DynamicValue);
        if (propd.IsAutoCreated())
            higher |= 1 << _PropertyPrecedence.AutoCreate;
        if (propd._HasDefaultValue())
            higher |= 1 << _PropertyPrecedence.DefaultValue;

        for (var j = providerPrecedence; j >= _PropertyPrecedence.Highest; j--) {
            if (!(bitmask & (1 << i)))
                continue;
            var provider = this._Providers[i];
            if (!provider)
                continue;
            if (provider.GetPropertyValue(propd)) {
                return this._CallRecomputePropertyValueForProviders(propd, providerPrecedence);
            }
        }
        // TODO: Finish

        var oldValue = undefined;
        var newValue = undefined;

        if (!oldProviderValue || !newProviderValue) {
            var lowerPriorityValue = this.GetValue(propd, providerPrecedence + 1);
            if (!newProviderValue) {
                oldValue = oldProviderValue;
                newValue = lowerPriorityValue;
            } else if (!oldProviderValue) {
                oldValue = lowerPriorityValue;
                newValue = newProviderValue;
            }
        } else {
            oldValue = oldProviderValue;
            newValue = newProviderValue;
        }

        var equal = false;
        if (oldValue && newValue) {
            equal = !propd._AlwaysChange() && oldValue == newValue;
        }

        if (equal)
            return null;

        if (providerPrecedence != _PropertyPrecedence.IsEnabled && this._Providers[_PropertyPrecedence.IsEnabled] && this._Providers[_PropertyPrecedence.IsEnabled].LocalValueChanged(propd))
            return null;

        this._CallRecomputePropertyValueForProviders(propd, providerPrecedence, error);

        var oldDO = undefined;
        var newDO = undefined;

        var setsParent = setParent && !propd.IsCustom();

        if (oldValue && oldValue instanceof DependencyObject)
            oldDO = oldValue;
        if (newValue && newValue instanceof DependencyObject)
            newDO = newValue;

        if (oldDO) {
            if (setsParent) {
                oldDO._IsAttached = false;
                oldDO._RemoveParent(this, null);
                oldDO._RemoveTarget(this);
                oldDO._RemovePropertyChangeListener(this, propd);
                if (oldDO) { //TODO: Change to oldDO.Is(Type::COLLECTION)...
                    //TODO: Remove Changed event handler
                    //TODO: Remove ItemChanged event handler
                }
            } else {
                oldDO._Mentor = null;
            }
        }

        if (newDO) {
            if (setsParent) {
                newDO._IsAttached = this._IsAttached;
                newDO._AddParent(this, mergeNamesOnSetParent, error);
                if (error.IsErrored())
                    return;

                newDO._SetResourceBase(this._GetResourceBase());

                if (newDO) { //TODO: Change to oldDO.Is(Type::COLLECTION)...
                    //TODO: Add Changed event handler
                    //TODO: Add ItemChanged event handler
                }

                newDO._AddPropertyChangeListener(this, propd);
                newDO._AddTarget(this);
            } else {
                var cur = this;
                while (cur && !(cur instanceof FrameworkElement))
                    cur = cur._Mentor;
                newDO._Mentor = cur;
            }
        }

        //Construct property changed event args and raise
        if (notifyListeners) {
            var args = {
                Property: propd,
                OldValue: oldValue,
                NewValue: newValue
            };
            this._OnPropertyChanged(args, error);

            if (propd && propd._ChangedCallback)
                propd._ChangedCallback(this, args, error);

            if (this._Providers[_PropertyPrecedence.Inherited]) {
                if (providerPrecedence == _PropertyPrecedence.Inherited) {
                } else {
                    if (_InheritedPropertyValueProvider.IsPropertyInherited(this, propd)
                         && this._GetPropertyValueProvider(propd) < _PropertyPrecedence.Inherited) {
                        this._Providers[_PropertyPrecedence.Inherited].PropagateInheritedProperty(propd, this, this);
                    }
                }
            }
        }

        //Needs clock tick..
        return;
    };
    this._CallRecomputePropertyValueForProviders = function (propd, providerPrecedence, error) {
        for (var i = 0; i < _PropertyPrecedence.Count; i++) {
            var provider = this._Providers[i];
            if (!provider)
                continue;
            if (i == providerPrecedence)
                continue;

            if (i < providerPrecedence && provider._HasFlag(_ProviderFlags.RecomputesOnLowerPriorityChange))
                provider.RecomputePropertyValue(propd, _ProviderFlags.RecomputesOnLowerPriorityChange, error);
            else if (i > providerPrecedence && provider._HasFlag(_ProviderFlags.RecomputesOnHigherPriorityChange))
                provider.RecomputePropertyValue(propd, _ProviderFlags.RecomputesOnHigherPriorityChange, error);
        }
    };
    this._OnPropertyChanged = function (args, error) {
        if (args.Property == DependencyObject.NameProperty) {
        }
        this._NotifyPropertyChangeListeners(args, error);
    };
    this._NotifyPropertyChangeListeners = function (args, error) {
        NotImplemented();
    };
}
DependencyObject.NameProperty = DependencyProperty.Register("Name", DependencyObject);
DependencyObject.prototype = new Object();