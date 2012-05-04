/// <reference path="../Runtime/Nullstone.js"/>
/// <reference path="DependencyProperty.js" />
/// <reference path="PropertyValueProviders/PropertyValueProvider.js" />
/// <reference path="PropertyValueProviders/AutoCreatePropertyValueProvider.js" />
/// <reference path="PropertyValueProviders/DefaultValuePropertyValueProvider.js" />
/// <reference path="PropertyValueProviders/LocalValuePropertyValueProvider.js" />
/// <reference path="../Runtime/MulticastEvent.js" />
/// CODE
/// <reference path="Expression.js"/>
/// <reference path="NameScope.js"/>
/// <reference path="../Data/Binding.js"/>
/// <reference path="../Runtime/BError.js" />
/// <reference path="SubPropertyListener.js"/>

//#region DependencyObject
var DependencyObject = Nullstone.Create("DependencyObject");

DependencyObject.Instance.Init = function () {
    this._IsAttached = false;
    this._Providers = [];
    this._Providers[_PropertyPrecedence.LocalValue] = new _LocalValuePropertyValueProvider(this, _PropertyPrecedence.LocalValue);
    this._Providers[_PropertyPrecedence.DefaultValue] = new _DefaultValuePropertyValueProvider(this, _PropertyPrecedence.DefaultValue);
    this._Providers[_PropertyPrecedence.AutoCreate] = new _AutoCreatePropertyValueProvider(this, _PropertyPrecedence.AutoCreate);
    this._ProviderBitmasks = [];
    this._SecondaryParents = [];
    this.PropertyChanged = new MulticastEvent();
    this._SubPropertyListeners = [];
};

//#region Dependency Properties

DependencyObject.NameProperty = DependencyProperty.RegisterFull("Name", function () { return String; }, DependencyObject, "", undefined, undefined, false, DependencyObject._NameValidator);
DependencyObject.Instance.GetName = function () {
    return this.$GetValue(DependencyObject.NameProperty);
};
DependencyObject.Instance.SetName = function (value) {
    this.$SetValue(DependencyObject.NameProperty, value);
};

//#endregion

//#region Properties

DependencyObject.Instance.GetTemplateOwner = function () {
    return this._TemplateOwner;
};
DependencyObject.Instance.SetTemplateOwner = function (value) {
    this._TemplateOwner = value;
};

DependencyObject.Instance.GetMentor = function () {
    ///<returns type="DependencyObject"></returns>
    return this._Mentor;
};
DependencyObject.Instance.SetMentor = function (value) {
    if (this._Mentor == value)
        return;
    var oldMentor = this._Mentor;
    this._Mentor = value;
    this._OnMentorChanged(oldMentor, value);
};
DependencyObject.Instance._OnMentorChanged = function (oldValue, newValue) {
    if (!(this instanceof FrameworkElement)) {
        this._Providers[_PropertyPrecedence.AutoCreate].ForeachValue(DependencyObject._PropagateMentor, newValue);
        this._Providers[_PropertyPrecedence.LocalValue].ForeachValue(DependencyObject._PropagateMentor, newValue);
        if (this._Providers[_PropertyPrecedence.LocalStyle])
            this._Providers[_PropertyPrecedence.LocalStyle].ForeachValue(DependencyObject._PropagateMentor, newValue);
        if (this._Providers[_PropertyPrecedence.ImplicitStyle])
            this._Providers[_PropertyPrecedence.ImplicitStyle].ForeachValue(DependencyObject._PropagateMentor, newValue);
    }
    if (this._MentorChangedCallback) {
        this._MentorChangedCallback(this, newValue);
    }
};
DependencyObject._PropagateMentor = function (propd, value, newMentor) {
    if (value && value instanceof DependencyObject) {
        value.SetMentor(newMentor);
    }
};

DependencyObject.Instance._SetIsAttached = function (value) {
    if (this._IsAttached == value)
        return;
    this._IsAttached = value;
    this._OnIsAttachedChanged(value);
};
DependencyObject.Instance._OnIsAttachedChanged = function (value) {
    this._Providers[_PropertyPrecedence.LocalValue].ForeachValue(DependencyObject._PropagateIsAttached, value);
    this._Providers[_PropertyPrecedence.AutoCreate].ForeachValue(DependencyObject._PropagateIsAttached, value);
};
DependencyObject._PropagateIsAttached = function (propd, value, newIsAttached) {
    if (propd._IsCustom)
        return;

    if (value && value instanceof DependencyObject) {
        value._SetIsAttached(newIsAttached);
    }
};

//#endregion

DependencyObject.Instance.GetDependencyProperty = function (propName) {
    return DependencyProperty.GetDependencyProperty(this.constructor, propName);
};

//#region Set Value

DependencyObject.Instance.$SetValue = function (propd, value) {
    if (!propd)
        throw new ArgumentException("No property specified.");
    if (propd.IsReadOnly) {
        throw new InvalidOperationException();
    }

    if (value instanceof UnsetValue) {
        this.ClearValue(propd);
        return;
    }

    var expression = Nullstone.As(value, Expression);
    var bindingExpression = Nullstone.As(value, BindingExpressionBase);
    if (bindingExpression) {
        var path = bindingExpression.GetBinding().GetPath().GetPath();
        if ((!path || path === ".") && bindingExpression.GetBinding().GetMode() === BindingMode.TwoWay)
            throw new ArgumentException("TwoWay bindings require a non-empty Path.");
        bindingExpression.GetBinding().Seal();
    }

    var existing;
    if (this._Expressions) {
        var data = {};
        if (this._Expressions.TryGetValue(propd, data))
            existing = data.Value
    }

    var addingExpression = false;
    var updateTwoWay = false;
    if (expression) {
        if (!Nullstone.RefEquals(expression, existing)) {
            if (expression.GetAttached())
                throw new ArgumentException("Cannot attach the same Expression to multiple FrameworkElements");

            if (existing)
                this._RemoveExpression(propd);
            if (!this._Expressions)
                this._Expressions = new Dictionary();
            this._Expressions.Add(propd, expression);
            expression._OnAttached(this);
        }
        addingExpression = true;
        value = expression.GetValue(propd);
    } else if (existing) {
        if (existing instanceof BindingExpressionBase) {
            if (existing.GetBinding().GetMode() === BindingMode.TwoWay) {
                updateTwoWay = !existing.GetUpdating() && !propd._IsCustom;
            } else if (!existing.GetUpdating() || existing.GetBinding().GetMode() === BindingMode.OneTime) {
                this._RemoveExpression(propd);
            }
        } else if (!existing.GetUpdating()) {
            this._RemoveExpression(propd);
        }
    }

    try {
        this._SetValueInternal(propd, value);
        if (updateTwoWay)
            existing._TryUpdateSourceObject(value);
    } catch (err) {
        if (!addingExpression)
            throw err;
        this._SetValueInternal(propd, propd.DefaultValue);
        if (updateTwoWay)
            existing._TryUpdateSourceObject(value);
    }
};
DependencyObject.Instance._SetValueInternal = function (propd, value, error) {
    if (!error)
        error = new BError();
    var hasCoercer = propd._HasCoercer();
    var coerced = value;
    if ((hasCoercer && !(coerced = propd._Coerce(this, coerced, error)))
            || !this._IsValueValid(propd, coerced, error)
            || !propd._Validate(this, propd, coerced, error)) {
        if (error.IsErrored())
            throw new error.CreateException();
        return false;
    }
    var retVal = this._SetValueImpl(propd, coerced, error);
    if (error.IsErrored())
        throw new error.CreateException();
    return retVal;
};
DependencyObject.Instance._SetValueImpl = function (propd, value, error) {
    if (this._IsFrozen) {
        error.SetErrored(BError.UnauthorizedAccess, "Cannot set value for property " + propd.Name + " on frozen DependencyObject.");
        return false;
    }
    var currentValue;
    var equal = false;

    if ((currentValue = this._ReadLocalValueImpl(propd)) === undefined)
        if (propd._IsAutoCreated)
            currentValue = this._Providers[_PropertyPrecedence.AutoCreate].ReadLocalValue(propd);

    if (currentValue !== undefined && value !== undefined)
        equal = !propd._AlwaysChange && Nullstone.Equals(currentValue, value);
    else
        equal = currentValue === undefined && value === undefined;

    if (!equal) {
        var newValue;
        this._Providers[_PropertyPrecedence.LocalValue].ClearValue(propd);
        if (propd._IsAutoCreated)
            this._Providers[_PropertyPrecedence.AutoCreate].ClearValue(propd);

        if (value !== undefined && (!propd._IsAutoCreated || !(value instanceof DependencyObject) || Nullstone.Is(value, DependencyObject)))
            newValue = value;
        else
            newValue = undefined;

        if (newValue !== undefined) {
            this._Providers[_PropertyPrecedence.LocalValue].SetValue(propd, newValue);
        }
        this._ProviderValueChanged(_PropertyPrecedence.LocalValue, propd, currentValue, newValue, true, true, true, error);
    }

    return true;
};

DependencyObject.Instance._IsValueValid = function (propd, coerced, error) {
    //TODO: Handle type problems
    return true;
};
DependencyObject.Instance._RemoveExpression = function (propd) {
    var data = {};
    if (this._Expressions && this._Expressions.TryGetValue(propd, data)) {
        this._Expressions.Remove(propd);
        data.Value._OnDetached(this);
    }
};

//#endregion

//#region Get Value

DependencyObject.Instance.$GetValue = function (propd, startingPrecedence, endingPrecedence) {
    if (startingPrecedence === undefined)
        startingPrecedence = _PropertyPrecedence.Highest;
    if (endingPrecedence === undefined)
        endingPrecedence = _PropertyPrecedence.Lowest;

    //Establish providers used
    var bitmask = this._ProviderBitmasks[propd._ID] || 0;
    bitmask |= (1 << _PropertyPrecedence.Inherited) | (1 << _PropertyPrecedence.DynamicValue);
    if (propd._IsAutoCreated)
        bitmask |= 1 << _PropertyPrecedence.AutoCreate;
    if (propd._HasDefaultValue)
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
    return undefined;
};
DependencyObject.Instance._GetValueNoAutoCreate = function (propd) {
    var v = this.$GetValue(propd, _PropertyPrecedence.LocalValue, _PropertyPrecedence.InheritedDataContext);
    if (v === undefined && propd._IsAutoCreated)
        v = this._Providers[_PropertyPrecedence.AutoCreate].ReadLocalValue(propd);
    return v;
};
DependencyObject.Instance._GetValueNoDefault = function (propd) {
    var value;
    for (var i = 0; i < _PropertyPrecedence.DefaultValue; i++) {
        var provider = this._Providers[i];
        if (!provider)
            continue;
        value = provider.GetPropertyValue(propd);
        if (value === undefined)
            continue;
        return value;
    }
    return undefined;
};

//#endregion

//#region Read Local Value

DependencyObject.Instance.ReadLocalValue = function (propd) {
    var val = this._ReadLocalValueImpl(propd);
    if (val === undefined)
        val = new UnsetValue();
    return val;
};
DependencyObject.Instance._ReadLocalValueImpl = function (propd) {
    return this._Providers[_PropertyPrecedence.LocalValue].GetPropertyValue(propd);
};

//#endregion

DependencyObject.Instance.ClearValue = function (propd, notifyListeners, error) {
    this._RemoveExpression(propd);
    this._ClearValueImpl(propd, notifyListeners, error);
};
DependencyObject.Instance._ClearValueImpl = function (propd, notifyListeners, error) {
    if (notifyListeners === undefined)
        notifyListeners = true;
    if (!error)
        error = new BError();

    if (this._GetAnimationStorageFor(propd) != null) {
        return;
    }

    var oldLocalValue;
    if ((oldLocalValue = this._ReadLocalValueImpl(propd)) === undefined) {
        if (propd._IsAutoCreated)
            oldLocalValue = this._Providers[_PropertyPrecedence.AutoCreate].ReadLocalValue(propd);
    }

    if (oldLocalValue !== undefined) {
        if (oldLocalValue && oldLocalValue instanceof DependencyObject) {
            if (!propd._IsCustom) {
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
        if (propd._IsAutoCreated)
            this._Providers[_PropertyPrecedence.AutoCreate].ClearValue(propd);
    }

    for (var i = _PropertyPrecedence.LocalValue + 1; i < _PropertyPrecedence.Count; i++) {
        var provider = this._Providers[i];
        if (provider && provider._HasFlag(_ProviderFlags.RecomputesOnClear))
            provider.RecomputePropertyValue(propd, _ProviderFlags.RecomputesOnClear, error);
    }

    if (oldLocalValue !== undefined) {
        this._ProviderValueChanged(_PropertyPrecedence.LocalValue, propd, oldLocalValue, undefined, notifyListeners, true, false, error);
    }
};

DependencyObject.Instance._PropertyHasValueNoAutoCreate = function (propd, obj) {
    var v = this._GetValueNoAutoCreate(propd);
    return v === undefined ? obj === undefined : v == obj;
};
DependencyObject.Instance._ProviderValueChanged = function (providerPrecedence, propd, oldProviderValue, newProviderValue, notifyListeners, setParent, mergeNamesOnSetParent, error) {
    var bitmask = this._ProviderBitmasks[propd._ID] || 0;
    if (newProviderValue !== undefined)
        bitmask |= 1 << providerPrecedence;
    else
        bitmask &= ~(1 << providerPrecedence);
    this._ProviderBitmasks[propd._ID] = bitmask;

    var higher = 0;
    for (var i = providerPrecedence; i >= _PropertyPrecedence.LocalValue; i--) {
        higher |= 1 << i;
    }
    higher &= bitmask;
    higher |= (1 << _PropertyPrecedence.Inherited) | (1 << _PropertyPrecedence.DynamicValue);
    if (propd._IsAutoCreated)
        higher |= 1 << _PropertyPrecedence.AutoCreate;
    if (propd._HasDefaultValue)
        higher |= 1 << _PropertyPrecedence.DefaultValue;

    for (var j = providerPrecedence; j >= _PropertyPrecedence.Highest; j--) {
        if (!(higher & (1 << j)))
            continue;
        var provider = this._Providers[i];
        if (!provider)
            continue;
        if (provider.GetPropertyValue(propd) !== undefined) {
            this._CallRecomputePropertyValueForProviders(propd, providerPrecedence, error);
            return;
        }
    }

    var oldValue;
    var newValue;

    if (oldProviderValue === undefined || newProviderValue === undefined) {
        var lowerPriorityValue = this.$GetValue(propd, providerPrecedence + 1);
        if (newProviderValue === undefined) {
            oldValue = oldProviderValue;
            newValue = lowerPriorityValue;
        } else if (oldProviderValue === undefined) {
            oldValue = lowerPriorityValue;
            newValue = newProviderValue;
        }
    } else {
        oldValue = oldProviderValue;
        newValue = newProviderValue;
    }

    var equal = (oldValue === null && newValue === null) || (oldValue === undefined && newValue === undefined);
    if (oldValue && newValue) {
        equal = !propd._AlwaysChange && Nullstone.Equals(oldValue, newValue);
    }

    if (equal)
        return;

    if (providerPrecedence !== _PropertyPrecedence.IsEnabled && this._Providers[_PropertyPrecedence.IsEnabled] && this._Providers[_PropertyPrecedence.IsEnabled].LocalValueChanged(propd))
        return;

    this._CallRecomputePropertyValueForProviders(propd, providerPrecedence, error);

    var oldDO;
    var newDO;

    var setsParent = setParent && !propd._IsCustom;

    if (oldValue && (oldValue instanceof DependencyObject))
        oldDO = oldValue;
    if (newValue && (newValue instanceof DependencyObject))
        newDO = newValue;

    if (oldDO) {
        if (setsParent) {
            oldDO._SetIsAttached(false);
            oldDO._RemoveParent(this, null);
            oldDO._RemoveTarget(this);

            oldDO.RemovePropertyChangedListener(this, propd);
            if (oldDO instanceof Collection) {
                oldDO.Changed.Unsubscribe(this._OnCollectionChangedEH, this);
                oldDO.ItemChanged.Unsubscribe(this._OnCollectionItemChangedEH, this);
            }
        } else {
            oldDO.SetMentor(null);
        }
    }

    if (newDO) {
        if (setsParent) {
            newDO._SetIsAttached(this._IsAttached);
            newDO._AddParent(this, mergeNamesOnSetParent, error);
            if (error.IsErrored())
                return;

            newDO._SetResourceBase(this._GetResourceBase());

            if (newDO instanceof Collection) {
                newDO.Changed.Subscribe(this._OnCollectionChangedEH, this);
                newDO.ItemChanged.Subscribe(this._OnCollectionItemChangedEH, this);
            }
            newDO.AddPropertyChangedListener(this, propd);
            newDO._AddTarget(this);
        } else {
            var cur = this;
            while (cur && !(cur instanceof FrameworkElement))
                cur = cur.GetMentor();
            newDO.SetMentor(cur);
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

        var inheritedProvider = this._Providers[_PropertyPrecedence.Inherited];
        if (inheritedProvider) {
            if (providerPrecedence === _PropertyPrecedence.Inherited) {
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
DependencyObject.Instance._CallRecomputePropertyValueForProviders = function (propd, providerPrecedence, error) {
    for (var i = 0; i < _PropertyPrecedence.Count; i++) {
        var provider = this._Providers[i];
        if (!provider)
            continue;
        if (i === providerPrecedence)
            continue;

        if (i < providerPrecedence && provider._HasFlag(_ProviderFlags.RecomputesOnLowerPriorityChange))
            provider.RecomputePropertyValue(propd, _ProviderFlags.RecomputesOnLowerPriorityChange, error);
        else if (i > providerPrecedence && provider._HasFlag(_ProviderFlags.RecomputesOnHigherPriorityChange))
            provider.RecomputePropertyValue(propd, _ProviderFlags.RecomputesOnHigherPriorityChange, error);
    }
};
DependencyObject.Instance._PropagateInheritedValue = function (inheritable, source, newValue) {
    var inheritedProvider = this._Providers[_PropertyPrecedence.Inherited];
    if (!inheritedProvider)
        return true;

    inheritedProvider._SetPropertySource(inheritable, source);
    var propd = _InheritedPropertyValueProvider.GetProperty(inheritable, this);
    if (!propd)
        return false;

    var error = new BError();
    this._ProviderValueChanged(_PropertyPrecedence.Inherited, propd, undefined, newValue, true, false, false, error);
    return this._GetPropertyValueProvider(propd) === _PropertyPrecedence.Inherited;
};
DependencyObject.Instance._GetInheritedValueSource = function (inheritable) {
    var inheritedProvider = this._Providers[_PropertyPrecedence.Inherited];
    if (!inheritedProvider)
        return undefined;
    return inheritedProvider._GetPropertySource(inheritable);
};
DependencyObject.Instance._SetInheritedValueSource = function (inheritable, source) {
    var inheritedProvider = this._Providers[_PropertyPrecedence.Inherited];
    if (!inheritedProvider)
        return;

    if (!source) {
        var propd = _InheritedPropertyValueProvider.GetProperty(inheritable, this);
        if (propd)
            return;
        var bitmask = this._ProviderBitmasks[propd._ID];
        bitmask &= ~(1 << _PropertyPrecedence.Inherited);
        this._ProviderBitmasks[propd._ID] = bitmask;
    }
    inheritedProvider._SetPropertySource(inheritable, source);
};
DependencyObject.Instance._GetPropertyValueProvider = function (propd) {
    var bitmask = this._ProviderBitmasks[propd._ID];
    for (var i = 0; i < _PropertyPrecedence.Lowest; i++) {
        var p = 1 << i;
        if ((bitmask & p) === p)
            return i;
        if (i === _PropertyPrecedence.DefaultValue && propd._HasDefaultValue)
            return i;
        if (i === _PropertyPrecedence.AutoCreate && propd._IsAutoCreated)
            return i;
    }
    return -1;
};

//#region Target

DependencyObject.Instance._AddTarget = function (obj) {
};
DependencyObject.Instance._RemoveTarget = function (obj) {
};

//#endregion

//#region Resource Base

DependencyObject.Instance._GetResourceBase = function () {
    var rb = this._ResourceBase;
    if (rb)
        rb = rb.replace(/^\s+/, ''); //trim if not null
    if (rb && rb.length > 0)
        return this._ResourceBase;
    if (this._Parent)
        return this._Parent._GetResourceBase();
    return this._ResourceBase;
};
DependencyObject.Instance._SetResourceBase = function (value) {
    this._ResourceBase = value;
};

//#endregion

//#region Property Change

DependencyObject.Instance._OnPropertyChanged = function (args, error) {
    if (args.Property._ID === DependencyObject.NameProperty._ID) {
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
DependencyObject.Instance.AddPropertyChangedListener = function (ldo, propd) {
    var listener = new SubPropertyListener(ldo, propd);
    this._SubPropertyListeners.push(listener);
    this.PropertyChanged.Subscribe(listener.OnSubPropertyChanged, listener);
};
DependencyObject.Instance.RemovePropertyChangedListener = function (ldo, propd) {
    for (var i = 0; i < this._SubPropertyListeners.length; i++) {
        var listener = this._SubPropertyListeners[i];
        if (!Nullstone.Equals(listener._Dobj, ldo))
            continue;
        if (propd && listener._Propd._ID !== propd._ID)
            continue;
        this.PropertyChanged.Unsubscribe(listener.OnSubPropertyChanged, listener);
        this._SubPropertyListeners.slice(i, 1);
        break;
    }
};
DependencyObject.Instance._OnSubPropertyChanged = function (propd, sender, args) { };

//#endregion

//#region Collection Change

DependencyObject.Instance._OnCollectionChangedEH = function (sender, args) {
    this._OnCollectionChanged(sender, args);
};
DependencyObject.Instance._OnCollectionChanged = function (sender, args) { };
DependencyObject.Instance._OnCollectionItemChangedEH = function (sender, args) {
    this._OnCollectionItemChanged(sender, args);
};
DependencyObject.Instance._OnCollectionItemChanged = function (sender, args) { };

//#endregion

//#region Name

DependencyObject.Instance.FindName = function (name, isTemplateItem) {
    /// <param name="name" type="String"></param>
    /// <param name="isTemplateItem" type="Boolean"></param>
    /// <returns type="DependencyObject" />
    if (isTemplateItem === undefined)
        isTemplateItem = Control.GetIsTemplateItem(this);

    var scope = NameScope.GetNameScope(this);
    if (scope && (isTemplateItem === scope.GetIsLocked()))
        return scope.FindName(name);

    if (this._Parent)
        return this._Parent.FindName(name, isTemplateItem);

    return undefined;
};
DependencyObject.Instance.FindNameScope = function (templateNamescope) {
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
DependencyObject.Instance.SetNameOnScope = function (name, scope) {
    if (scope.FindName(name))
        return false;

    this.$SetValue(DependencyObject.NameProperty, name);
    scope.RegisterName(name, this);
    return true;
};

DependencyObject.Instance._RegisterAllNamesRootedAt = function (namescope, error) {
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
DependencyObject.Instance._UnregisterAllNamesRootedAt = function (fromNs) {
    if (this._RegisteringNames)
        return;
    if (this._PermitsMultipleParents() && this._HasSecondaryParents())
        return;
    this._RegisteringNames = true;

    var thisNs = NameScope.GetNameScope(this);
    if (/* TODO: this._IsHydratedFromXaml() || */!thisNs || thisNs._GetTemporary()) {
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
    if (!propd._IsCustom && value && value instanceof DependencyObject) {
        value._UnregisterAllNamesRootedAt(fromNs);
    }
};

//#endregion

//#region Parent Usage

DependencyObject.Instance._GetParent = function () {
    return this._Parent;
};
DependencyObject.Instance._PermitsMultipleParents = function () {
    return true;
};
DependencyObject.Instance._AddParent = function (parent, mergeNamesFromSubtree, error) {
    if (false/* TODO: IsShuttingDown */) {
        this._Parent = null;
        return;
    }

    var current = parent;
    while (current) {
        if (Nullstone.RefEquals(current, this)) {
            Warn("DependencyObject._AddParent - Cycle found.");
            return;
        }
        current = current._GetParent();
    }

    if (this._Parent && !this._PermitsMultipleParents()) {
        if (parent instanceof DependencyObjectCollection && (!parent._GetIsSecondaryParent() || this._HasSecondaryParents())) {
            error.SetErrored(BError.InvalidOperation, "Element is already a child of another element.");
            return;
        }
    }

    if (this._Parent || this._HasSecondaryParents()) {
        this._AddSecondaryParent(parent);
        if (this._Parent && !(this._Parent instanceof ResourceDictionary))
            this.SetMentor(null);
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

    if (!error || !error.IsErrored()) {
        this._Parent = parent;
        var d = parent;
        while (d && !(d instanceof FrameworkElement)) {
            d = d.GetMentor();
        }
        this.SetMentor(d);
    }
};
DependencyObject.Instance._RemoveParent = function (parent, error) {
    if (this._RemoveSecondaryParent(parent)) {
        if (this._HasSecondaryParents() || !(parent instanceof DependencyObjectCollection) || !(parent._GetIsSecondaryParent()))
            return;
    } else {
        //WTF: Hack?
        if (!Nullstone.RefEquals(this._Parent, parent))
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
        this.SetMentor(null);
    }

    if (!error || !error.IsErrored()) {
        if (Nullstone.RefEquals(this._Parent, parent))
            this._Parent = null;
    }
};
DependencyObject.Instance._AddSecondaryParent = function (obj) {
    //TODO: Subscribe to obj.Destroyed --> When destroyed, RemoveSecondaryParent(obj)
    this._SecondaryParents.push(obj);
};
DependencyObject.Instance._RemoveSecondaryParent = function (obj) {
    var index = -1;
    for (var i = 0; i < this._SecondaryParents.length; i++) {
        if (Nullstone.RefEquals(this._SecondaryParents[i], obj)) {
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
DependencyObject.Instance._GetSecondaryParents = function () {
    return this._SecondaryParents;
};
DependencyObject.Instance._HasSecondaryParents = function () {
    return this._SecondaryParents.length > 0;
};

//#endregion

//#region Animation Storage

DependencyObject.Instance._GetAnimationStorageFor = function (propd) {
    if (!this._StorageRepo)
        return null;

    var list = this._StorageRepo[propd];
    if (!list || list.IsEmpty())
        return null;

    return list.Last().Storage;
};
DependencyObject.Instance._AttachAnimationStorage = function (propd, storage) {
    var attachedStorage;
    if (!this._StorageRepo)
        this._StorageRepo = [];

    var list = this._StorageRepo[propd];
    if (!list) {
        list = new LinkedList();

        this._StorageRepo[propd] = list;
    } else if (!list.IsEmpty()) {
        attachedStorage = list.Last().Storage;
        attachedStorage.Disable();
    }

    var node = new LinkedListNode();
    node.Storage = storage;
    list.Append(node);
    return attachedStorage;
};
DependencyObject.Instance._DetachAnimationStorage = function (propd, storage) {
    if (!this._StorageRepo)
        return;

    var list = this._StorageRepo[propd];
    if (!list || list.IsEmpty())
        return;

    var last = list.Last();
    if (Nullstone.RefEquals(last.Storage, storage)) {
        list.Remove(last);
        if (!list.IsEmpty())
            list.Last().Storage.Enable();
    } else {
        var node = list.First();
        while (node) {
            if (Nullstone.RefEquals(node.Storage, storage)) {
                var remove = node;
                node = node.Next;
                node.Storage.SetStopValue(storage.GetStopValue());
                list.Remove(remove);
                break;
            }
            node = node.Next;
        }
    }
};

//#endregion

//#endregion

Nullstone.FinishCreate(DependencyObject);
//#endregion