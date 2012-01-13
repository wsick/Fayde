/// <reference path="../jquery-1.7.js" />
/// <reference path="PropertyValueProviders.js" />
/// <reference path="BError.js" />
/// <reference path="DependencyProperty.js" />
/// <reference path="FrameworkElement.js" />
/// <reference path="MulticastEvent.js"/>
/// <reference path="Collections.js"/>

//#region DependencyObject

DependencyObject.prototype = new Object;
DependencyObject.prototype.constructor = DependencyObject;
function DependencyObject() {
    this._TypeName = this._GetTypeName();
    this._Initialize();
}
DependencyObject.GetBaseClass = function () { return Object; };

//#region DEPENDENCY PROPERTIES

DependencyObject.NameProperty = DependencyProperty.Register("Name", DependencyObject, "", null, null, false, DependencyObject._NameValidator);
DependencyObject.prototype.GetName = function () {
    return this.GetValue(DependencyObject.NameProperty);
};
DependencyObject.prototype.SetName = function (value) {
    this.SetValue(DependencyObject.NameProperty, value);
};

//#endregion

//#region INSTANCE METHODS

DependencyObject.prototype.FindName = function (name, templateItem) {
    if (templateItem === undefined)
        templateItem = Control.GetIsTemplateItem(this);

    var scope = NameScope.GetNameScope(this);
    if (scope && (templateItem === scope.GetIsLocked()))
        return scope.FindName(name);

    if (this._Parent)
        return this._Parent.FindName(name, templateItem);

    return undefined;
};
DependencyObject.prototype.FindNameScope = function (templateNamescope) {
    if (templateNamescope === undefined)
        templateNamescope = Control.GetIsTemplateItem(this);

    var scope = NameScope.GetNameScope(this);
    if (scope && (templateNamescope === scope.GetIsLocked()))
        return scope;

    if (this._Parent) {
        return this._Parent.FindNameScope(templateNamescope);
    }
    return undefined;
};
DependencyObject.prototype.SetNameOnScope = function (name, scope) {
    if (scope.FindName(name))
        return false;

    this.SetValue(DependencyObject.NameProperty, name);
    scope.RegisterName(name, this);
    return true;
};

DependencyObject.prototype.GetDependencyProperty = function (propName) {
    return DependencyProperty.GetDependencyProperty(this.constructor, propName);
};

DependencyObject.prototype._Initialize = function () {
    this._IsAttached = false;
    this._Providers = new Array();
    this._Providers[_PropertyPrecedence.LocalValue] = new _LocalPropertyValueProvider(this, _PropertyPrecedence.LocalValue);
    this._Providers[_PropertyPrecedence.DefaultValue] = new _DefaultValuePropertyProvider(this, _PropertyPrecedence.DefaultValue);
    this._Providers[_PropertyPrecedence.AutoCreate] = new _AutoCreatePropertyValueProvider(this, _PropertyPrecedence.AutoCreate);
    this._ProviderBitmasks = new Array();
    this._SecondaryParents = new Array();
    this.PropertyChanged = new MulticastEvent();
};
DependencyObject.prototype._GetTypeName = function () {
    var funcNameRegex = /function (.{1,})\(/;
    var results = (funcNameRegex).exec(this.constructor.toString());
    return (results && results.length > 1) ? results[1] : "";
};

DependencyObject.prototype._GetTemplateOwner = function () {
    return this._TemplateOwner;
};
DependencyObject.prototype._SetTemplateOwner = function (value) {
    this._TemplateOwner = value;
};

DependencyObject.prototype._GetMentor = function () {
    return this._Mentor;
};
DependencyObject.prototype._SetMentor = function (value) {
    if (this._Mentor == value)
        return;
    var oldMentor = this._Mentor;
    this._Mentor = value;
    this._OnMentorChanged(oldMentor, value);
};
DependencyObject.prototype._OnMentorChanged = function (oldValue, newValue) {
    if (!(this instanceof FrameworkElement)) {
        this._Providers[_PropertyPrecedence.AutoCreate].ForeachValue(DependencyObject._PropagateMentor, newValue);
        this._Providers[_PropertyPrecedence.LocalValue].ForeachValue(DependencyObject._PropagateMentor, newValue);
        if (this._Providers[_PropertyPrecedence.LocalStyle])
            this._Providers[_PropertyPrecedence.LocalStyle].ForeachValue(DependencyObject._PropagateMentor, newValue);
        if (this._Providers[_PropertyPrecedence.ImplicitStyle])
            this._Providers[_PropertyPrecedence.ImplicitStyle].ForeachValue(DependencyObject._PropagateMentor, newValue);
    }
    if (this._MentorChangedCallback != null) {
        this._MentorChangedCallback(this, newValue);
    }
};

DependencyObject.prototype.GetValue = function (propd, startingPrecedence, endingPrecedence) {
    if (startingPrecedence === undefined)
        startingPrecedence = _PropertyPrecedence.Highest;
    if (endingPrecedence === undefined)
        endingPrecedence = _PropertyPrecedence.Lowest;

    //Establish providers used
    var bitmask = this._ProviderBitmasks[propd] || 0;
    bitmask |= (1 << _PropertyPrecedence.Inherited) | (1 << _PropertyPrecedence.DynamicValue);
    if (propd._IsAutoCreated())
        bitmask |= 1 << _PropertyPrecedence.AutoCreate;
    if (propd._HasDefaultValue())
        bitmask |= 1 << _PropertyPrecedence.DefaultValue;

    //Loop through providers and find the first provider that is on and contains the property value
    for (var i = startingPrecedence; i <= endingPrecedence; i++) {
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
DependencyObject.prototype.SetValue = function (propd, value, error) {
    if (error == null)
        error = new BError();
    var hasCoercer = propd._HasCoercer();
    var coerced = value;
    if ((hasCoercer && !(coerced = propd._Coerce(this, coerced, error)))
            || !this._IsValueValid(propd, coerced, error)
            || !propd._Validate(this, coerced, error)) {
        return false;
    }
    return this._SetValueImpl(propd, coerced, error);
};
DependencyObject.prototype.ClearValue = function (propd, notifyListeners, error) {
    if (notifyListeners == undefined)
        notifyListeners = true;
    if (error == undefined)
        error = new BError();

    //WTF: GetAnimationStorageFor

    var oldLocalValue;
    if ((oldLocalValue = this._ReadLocalValue(propd)) == null) {
        if (propd._IsAutoCreated())
            oldLocalValue = this._Providers[_PropertyPrecedence.AutoCreate].ReadLocalValue(propd);
    }

    if (oldLocalValue != null) {
        if (oldLocalValue instanceof DependencyObject) {
            if (oldLocalValue != null && !propd._IsCustom) {
                oldLocalValue._RemoveParent(this, null);

                //TODO: RemovePropertyChangeListener
                oldLocalValue._SetIsAttached(false);
                if (oldLocalValue instanceof Collection) {
                    //TODO: Changed Event - Remove Handler
                    //TODO: Item Changed Event - Remove Handler
                }
            }
        }
        this._Providers[_PropertyPrecedence.LocalValue].ClearValue(propd);
        if (propd._IsAutoCreated())
            this._Providers[_PropertyPrecedence.AutoCreate].ClearValue(propd);
    }

    for (var i = _PropertyPrecedence.LocalValue + 1; i < _PropertyPrecedence.Count; i++) {
        var provider = this._Providers[i];
        if (provider != null && provider._HasFlag(_ProviderFlags.RecomputesOnClear))
            provider.RecomputePropertyValue(propd, _ProviderFlags.RecomputesOnClear, error);
    }

    if (oldLocalValue != null) {
        this._ProviderValueChanged(_PropertyPrecedence.LocalValue, propd, oldLocalValue, null, notifyListeners, true, false, error);
    }
};
DependencyObject.prototype._SetValueImpl = function (propd, value, error) {
    if (this._IsFrozen) {
        error.SetErrored(BError.UnauthorizedAccess, "Cannot set value for property " + propd.Name + " on frozen DependencyObject.");
        return false;
    }
    var currentValue;
    var equal = false;

    if ((currentValue = this._ReadLocalValue(propd)) == null)
        if (propd._IsAutoCreated())
            currentValue = this._Providers[_PropertyPrecedence.AutoCreate].ReadLocalValue(propd);

    if (currentValue != null && value != null)
        equal = !propd._AlwaysChange && currentValue == value;
    else
        equal = currentValue == null && value == null;

    if (!equal) {
        var newValue;
        this._Providers[_PropertyPrecedence.LocalValue].ClearValue(propd);
        if (propd._IsAutoCreated())
            this._Providers[_PropertyPrecedence.AutoCreate].ClearValue(propd);

        if (value != null && (!propd._IsAutoCreated() || !(value instanceof DependencyObject)))
            newValue = value;
        else
            newValue = null;

        if (newValue != null) {
            this._Providers[_PropertyPrecedence.LocalValue].SetValue(propd, newValue);
        }
        this._ProviderValueChanged(_PropertyPrecedence.LocalValue, propd, currentValue, newValue, true, true, true, error);
    }

    return true;
};
DependencyObject.prototype._ReadLocalValue = function (propd) {
    return this._Providers[_PropertyPrecedence.LocalValue].GetPropertyValue(propd);
};
DependencyObject.prototype._GetValueNoAutoCreate = function (propd) {
    var v = this.GetValue(propd, _PropertyPrecedence.LocalValue, _PropertyPrecedence.InheritedDataContext);
    if (v == null && propd._IsAutoCreated())
        v = this._Providers[_PropertyPrecedence.AutoCreate].ReadLocalValue(propd);
    return v;
};
DependencyObject.prototype._GetValueNoDefault = function (propd) {
    var value = null;
    for (var i = 0; i < _PropertyPrecedence.DefaultValue; i++) {
        var provider = this._Providers[i];
        if (provider == null)
            continue;
        value = provider.GetPropertyValue(propd);
        if (value == undefined)
            continue;
        return value;
    }
    return null;
};
DependencyObject.prototype._PropertyHasValueNoAutoCreate = function (propd, obj) {
    var v = this._GetValueNoAutoCreate(propd);
    return v == null ? obj == null : v == obj;
};
DependencyObject.prototype._ProviderValueChanged = function (providerPrecedence, propd, oldProviderValue, newProviderValue, notifyListeners, setParent, mergeNamesOnSetParent, error) {
    var bitmask = this._ProviderBitmasks[propd] || 0;
    if (newProviderValue != null)
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
    if (propd._IsAutoCreated())
        higher |= 1 << _PropertyPrecedence.AutoCreate;
    if (propd._HasDefaultValue())
        higher |= 1 << _PropertyPrecedence.DefaultValue;

    for (var j = providerPrecedence; j >= _PropertyPrecedence.Highest; j--) {
        if (!(higher & (1 << j)))
            continue;
        var provider = this._Providers[i];
        if (provider == null)
            continue;
        if (provider.GetPropertyValue(propd) != null) {
            this._CallRecomputePropertyValueForProviders(propd, providerPrecedence, error);
            return;
        }
    }

    var oldValue = undefined;
    var newValue = undefined;

    if (oldProviderValue == null || newProviderValue == null) {
        var lowerPriorityValue = this.GetValue(propd, providerPrecedence + 1);
        if (newProviderValue == null) {
            oldValue = oldProviderValue;
            newValue = lowerPriorityValue;
        } else if (oldProviderValue == null) {
            oldValue = lowerPriorityValue;
            newValue = newProviderValue;
        }
    } else {
        oldValue = oldProviderValue;
        newValue = newProviderValue;
    }

    var equal = oldValue == null && newValue == null;
    if (oldValue != null && newValue != null) {
        equal = !propd._AlwaysChange && oldValue == newValue;
    }

    if (equal)
        return;

    if (providerPrecedence != _PropertyPrecedence.IsEnabled && this._Providers[_PropertyPrecedence.IsEnabled] && this._Providers[_PropertyPrecedence.IsEnabled].LocalValueChanged(propd))
        return;

    this._CallRecomputePropertyValueForProviders(propd, providerPrecedence, error);

    var oldDO = undefined;
    var newDO = undefined;

    var setsParent = setParent && !propd._IsCustom;

    if (oldValue != null && (oldValue instanceof DependencyObject))
        oldDO = oldValue;
    if (newValue != null && (newValue instanceof DependencyObject))
        newDO = newValue;

    if (oldDO != null) {
        if (setsParent) {
            oldDO._SetIsAttached(false);
            oldDO._RemoveParent(this, null);
            oldDO._RemoveTarget(this);
            oldDO.PropertyChanged.Unsubscribe(this._OnSubPropertyChanged, this);
            if (oldDO instanceof Collection) {
                oldDO.Changed.Unsubscribe(this._OnCollectionChanged, this);
                oldDO.ItemChanged.Unsubscribe(this._OnCollectionItemChanged, this);
            }
        } else {
            oldDO._SetMentor(null);
        }
    }

    if (newDO != null) {
        if (setsParent) {
            newDO._SetIsAttached(this._IsAttached);
            newDO._AddParent(this, mergeNamesOnSetParent, error);
            if (error.IsErrored())
                return;

            newDO._SetResourceBase(this._GetResourceBase());

            if (newDO instanceof Collection) {
                newDO.Changed.Subscribe(this._OnCollectionChanged, this);
                newDO.ItemChanged.Subscribe(this._OnCollectionItemChanged, this);
            }

            newDO.PropertyChanged.Subscribe(this._OnSubPropertyChanged, this);
            newDO._AddTarget(this);
        } else {
            var cur = this;
            while (cur && !(cur instanceof FrameworkElement))
                cur = cur._GetMentor();
            newDO._SetMentor(cur);
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

        if (propd != null && propd._ChangedCallback != null)
            propd._ChangedCallback(this, args, error);

        var inheritedProvider = this._Providers[_PropertyPrecedence.Inherited];
        if (inheritedProvider != null) {
            if (providerPrecedence == _PropertyPrecedence.Inherited) {
            } else {
                if (_InheritedPropertyValueProvider.IsInherited(this, propd)
                         && this._GetPropertyValueProvider(propd) < _PropertyPrecedence.Inherited) {
                    inheritedProvider.PropagateInheritedProperty(propd, this, this);
                }
            }
        }
    }

    //if ([this property has an active animation])
    //Needs clock tick..
};
DependencyObject.prototype._CallRecomputePropertyValueForProviders = function (propd, providerPrecedence, error) {
    for (var i = 0; i < _PropertyPrecedence.Count; i++) {
        var provider = this._Providers[i];
        if (provider == null)
            continue;
        if (i == providerPrecedence)
            continue;

        if (i < providerPrecedence && provider._HasFlag(_ProviderFlags.RecomputesOnLowerPriorityChange))
            provider.RecomputePropertyValue(propd, _ProviderFlags.RecomputesOnLowerPriorityChange, error);
        else if (i > providerPrecedence && provider._HasFlag(_ProviderFlags.RecomputesOnHigherPriorityChange))
            provider.RecomputePropertyValue(propd, _ProviderFlags.RecomputesOnHigherPriorityChange, error);
    }
};
DependencyObject.prototype._PropagateInheritedValue = function (inheritable, source, newValue) {
    var inheritedProvider = this._Providers[_PropertyPrecedence.Inherited];
    if (inheritedProvider == null)
        return true;

    inheritedProvider._SetPropertySource(inheritable, source);
    var propd = _InheritedPropertyValueProvider.GetProperty(inheritable, this);
    if (!propd)
        return false;

    var error = new BError();
    this._ProviderValueChanged(_PropertyPrecedence.Inherited, propd, null, newValue, true, false, false, error);
    return this._GetPropertyValueProvider(propd) == _PropertyPrecedence.Inherited;
};
DependencyObject.prototype._GetInheritedValueSource = function (inheritable) {
    var inheritedProvider = this._Providers[_PropertyPrecedence.Inherited];
    if (inheritedProvider == null)
        return null;
    return inheritedProvider._GetPropertySource(inheritable);
};
DependencyObject.prototype._SetInheritedValueSource = function (inheritable, source) {
    var inheritedProvider = this._Providers[_PropertyPrecedence.Inherited];
    if (inheritedProvider == null)
        return;

    if (!source) {
        var propd = _InheritedPropertyValueProvider.GetProperty(inheritable, this);
        if (propd)
            return;
        var bitmask = this._ProviderBitmasks[propd];
        bitmask &= ~(1 << _PropertyPrecedence.Inherited);
        this._ProviderBitmasks[propd] = bitmask;
    }
    inheritedProvider._SetPropertySource(inheritable, source);
};
DependencyObject.prototype._GetPropertyValueProvider = function (propd) {
    var bitmask = this._ProviderBitmasks[propd];
    for (var i = 0; i < _PropertyPrecedence.Lowest; i++) {
        var p = 1 << i;
        if ((bitmask & p) == p)
            return i;
        if (i == _PropertyPrecedence.DefaultValue && propd._HasDefaultValue())
            return i;
        if (i == _PropertyPrecedence.AutoCreate && propd._IsAutoCreated())
            return i;
    }
    return -1;
};
DependencyObject.prototype._IsValueValid = function (propd, coerced, error) {
    //TODO: Handle type problems
    return true;
};

DependencyObject.prototype._AddTarget = function (obj) {
};
DependencyObject.prototype._RemoveTarget = function (obj) {
};

DependencyObject.prototype._GetParent = function () {
    return this._Parent;
};
DependencyObject.prototype._PermitsMultipleParents = function () {
    return true;
};
DependencyObject.prototype._AddParent = function (parent, mergeNamesFromSubtree, error) {
    if (false/* TODO: IsShuttingDown */) {
        this._Parent = null;
        return;
    }

    var current = parent;
    while (current) {
        if (current == this) {
            //Warn: cycle found
            return;
        }
        current = current._GetParent();
    }

    if (this._Parent != null && !this._PermitsMultipleParents()) {
        if (parent instanceof DependencyObjectCollection && (!parent._GetIsSecondaryParent() || this._HasSecondaryParents())) {
            error.SetErrored(BError.InvalidOperation, "Element is already a child of another element.");
            return;
        }
    }

    if (this._Parent != null || this._HasSecondaryParents()) {
        this._AddSecondaryParent(parent);
        if (this._Parent != null && !(this._Parent instanceof ResourceDictionary))
            this._SetMentor(null);
        if (this._SecondaryParents.length > 1 || !(parent instanceof DependencyObjectCollection) || !parent._GetIsSecondaryParent())
            return;
    }

    var thisScope = NameScope.GetNameScope(this);
    var parentScope = parent.FindNameScope();
    if (thisScope) {
        if (thisScope._GetTemporary()) {
            if (parentScope) {
                parentScope._MergeTemporaryScope(thisScope, error);
                this.ClearValue(NameScope.NameScopeProperty, false);
            }
        } else {
            if (true /* TODO: this._IsHydratedFromXaml()*/) {
                var name = this.GetName();
                if (parentScope && name && name.length > 0) {
                    var existingObj = parentScope.FindName(name);
                    if (existingObj !== this) {
                        if (existingObj) {
                            error.SetErrored(BError.Argument, "Name is already registered in new parent namescope.");
                            return;
                        }
                        parentScope.RegisterName(name, this);
                    }
                }
            }
        }
    } else {
        if (parentScope && mergeNamesFromSubtree) {
            var tempScope = new NameScope();
            tempScope._SetTemporary(true);

            this._RegisterAllNamesRootedAt(tempScope, error);

            if (error.IsErrored())
                return;

            parentScope._MergeTemporaryScope(tempScope, error);
        }
    }

    if (error == null || !error.IsErrored()) {
        this._Parent = parent;
        var d = parent;
        while (d != null && !(d instanceof FrameworkElement)) {
            d = d._GetMentor();
        }
        this._SetMentor(d);
    }
};
DependencyObject.prototype._RemoveParent = function (parent, error) {
    if (this._RemoveSecondaryParent(parent)) {
        if (this._HasSecondaryParents() || !(parent instanceof DependencyObjectCollection) || !(parent._GetIsSecondaryParent()))
            return;
    } else {
        //WTF: Hack?
        if (this._Parent != parent)
            return;
    }

    if (false/* TODO:IsShuttingDown */) {
        this._Parent = null;
        return;
    }

    if (!this._HasSecondaryParents()) {
        var parentScope = parent.FindNameScope();
        if (parentScope)
            this._UnregisterAllNamesRootedAt(parentScope);
        this._SetMentor(null);
    }

    if (error == null || !error.IsErrored()) {
        if (this._Parent == parent)
            this._Parent = null;
    }
};
DependencyObject.prototype._AddSecondaryParent = function (obj) {
    //TODO: Subscribe to obj.Destroyed --> When destroyed, RemoveSecondaryParent(obj)
    this._SecondaryParents.push(obj);
};
DependencyObject.prototype._RemoveSecondaryParent = function (obj) {
    var index = -1;
    for (var i = 0; i < this._SecondaryParents.length; i++) {
        if (this._SecondaryParents[i] == obj) {
            index = i;
            break;
        }
    }
    if (index < 0)
        return false;
    this._SecondaryParents.splice(index, 1);
    //TODO: Unsubscribe to obj.Destroyed
    return true;
};
DependencyObject.prototype._GetSecondaryParents = function () {
    return this._SecondaryParents;
};
DependencyObject.prototype._HasSecondaryParents = function () {
    return this._SecondaryParents.length > 0;
};

DependencyObject.prototype._GetResourceBase = function () {
    var rb = this._ResourceBase;
    if (rb)
        rb = rb.replace(/^\s+/, ''); //trim if not null
    if (rb != null && rb.length > 0)
        return this._ResourceBase;
    if (this._Parent != null)
        return this._Parent._GetResourceBase();
    return this._ResourceBase;
};
DependencyObject.prototype._SetResourceBase = function (value) {
    this._ResourceBase = value;
};

DependencyObject.prototype._SetIsAttached = function (value) {
    if (this._IsAttached == value)
        return;
    this._IsAttached = value;
    this._OnIsAttachedChanged(value);
};
DependencyObject.prototype._OnIsAttachedChanged = function (value) {
    this._Providers[_PropertyPrecedence.LocalValue].ForeachValue(DependencyObject._PropagateIsAttached, value);
    this._Providers[_PropertyPrecedence.AutoCreate].ForeachValue(DependencyObject._PropagateIsAttached, value);
};

DependencyObject.prototype._OnPropertyChanged = function (args, error) {
    if (args.Property === DependencyObject.NameProperty) {
        var scope = this.FindNameScope();
        if (scope && args.NewValue) {
            if (args.OldValue)
                scope.UnregisterName(args.OldValue);
            scope.RegisterName(args.NewValue, this);
            if (/* TODO: this.IsHydratedFromXaml() && */this._Parent) {
                scope = this._Parent.FindNameScope();
                if (scope) {
                    if (args.OldValue)
                        scope.UnregisterName(args.OldValue);
                    scope.RegisterName(args.NewValue, this);
                }
            }
        }
    }
    this.PropertyChanged.Raise(this, args);
};
DependencyObject.prototype._OnSubPropertyChanged = function (sender, args) { };

DependencyObject.prototype._OnCollectionChanged = function (sender, args) {
};
DependencyObject.prototype._OnCollectionItemChanged = function (sender, args) {
};

DependencyObject.prototype._RegisterAllNamesRootedAt = function (namescope, error) {
    if (error.IsErrored())
        return;
    if (this._RegisteringNames)
        return;
    if (this._PermitsMultipleParents() && this._HasSecondaryParents())
        return;

    this._RegisteringNames = true;

    var mergeNamescope = false;
    var registerName = false;
    var recurse = false;

    var thisNs = NameScope.GetNameScope(this);

    this._RegisteringNames = false;
};
DependencyObject.prototype._UnregisterAllNamesRootedAt = function (fromNs) {
    if (this._RegisteringNames)
        return;
    if (this._PermitsMultipleParents() && this._HasSecondaryParents())
        return;
    this._RegisteringNames = true;

    var thisNs = NameScope.GetNameScope(this);
    if (/* TODO: this._IsHydratedFromXaml() || */ thisNs == null || thisNs._GetTemporary()) {
        var name = this.GetName();
        if (name && name.length > 0)
            fromNs.UnregisterName(name);
    }

    if (thisNs && !thisNs._GetTemporary()) {
        this._RegisteringNames = false;
        return;
    }

    this._Providers[_PropertyPrecedence.AutoCreate].ForeachValue(DependencyObject._UnregisterDONames, fromNs);
    this._Providers[_PropertyPrecedence.LocalValue].ForeachValue(DependencyObject._UnregisterDONames, fromNs);

    this._RegisteringNames = false;
}

DependencyObject._UnregisterDONames = function (propd, value, fromNs) {
    if (!propd._IsCustom && value != null && value instanceof DependencyObject) {
        value._UnregisterAllNamesRootedAt(fromNs);
    }
};
DependencyObject._PropagateIsAttached = function (propd, value, newIsAttached) {
    if (propd._IsCustom)
        return;

    if (value != null && value instanceof DependencyObject) {
        value._SetIsAttached(newIsAttached);
    }
};
DependencyObject._PropagateMentor = function (propd, value, newMentor) {
    if (value != null && value instanceof DependencyObject) {
        value._SetMentor(newMentor);
    }
};

//#endregion

//#endregion

//#region NameScope

NameScope.prototype = new DependencyObject;
NameScope.prototype.constructor = NameScope;
function NameScope() {
    DependencyObject.call(this);
    this._IsLocked = false;
    this._Names = null;
    this._Temporary = false;
}
NameScope.GetBaseClass = function () { return DependencyObject; };

NameScope.NameScopeProperty = DependencyProperty.RegisterAttached("NameScope", NameScope);
NameScope.GetNameScope = function (d) {
    return d.GetValue(NameScope.NameScopeProperty);
};
NameScope.SetNameScope = function (d, value) {
    d.SetValue(NameScope.NameScopeProperty, value);
};

NameScope.prototype.GetIsLocked = function () {
    return this._IsLocked;
};
NameScope.prototype.Lock = function () {
    this._IsLocked = true;
};

NameScope.prototype.RegisterName = function (name, obj) {
    if (this.GetIsLocked())
        return;
    if (!this._Names)
        this._Names = new Array();

    var existingObj = this._Names[name];
    if (existingObj == obj)
        return;

    if (existingObj) {
        //TODO: Remove Handler - Destroyed Event (existingObj)
    }

    //TODO: Add Handler - Destroyed Event (obj)
    this._Names[name] = obj;
};
NameScope.prototype.UnregisterName = function (name) {
    if (this.GetIsLocked())
        return;
    if (!this._Names)
        return;

    var objd = this._Names[name];
    if (objd instanceof DependencyObject) {
        //TODO: Remove handler - Destroyed Event
        delete this._Names[name];
    }
};
NameScope.prototype.FindName = function (name) {
    if (!this._Names)
        return undefined;
    if (name == null) {
        Warn("(null) name specified in NameScope.FindName.");
        return undefined;
    }
    return this._Names[name];
};

NameScope.prototype._MergeTemporaryScope = function (temp, error) {
    if (!temp || !temp._Names)
        return;

    for (var name in temp._Names) {
        var value = temp._Names[name];
        var o = this.FindName(name);
        if (o && o !== value) {
            error.SetErrored(BError.Argument, "The name already exists in the tree.");
            return;
        }
    }

    for (var name in temp._Names) {
        this.RegisterName(name, temp._Names[name]);
    }
};
NameScope.prototype._GetTemporary = function () {
    return this._Temporary;
};
NameScope.prototype._SetTemporary = function (value) {
    this._Temporary = value;
};

//#endregion