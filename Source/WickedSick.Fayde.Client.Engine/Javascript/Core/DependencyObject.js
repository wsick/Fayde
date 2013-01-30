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

(function (Fayde) {

    //#region SubPropertyListener

    function SubPropertyListener(dobj, propd) {
        this._Dobj = dobj;
        this._Propd = propd;
    }
    SubPropertyListener.prototype.OnSubPropertyChanged = function (sender, args) {
        this._Dobj._OnSubPropertyChanged(this._Propd, sender, args);
    };
    //SubPropertyListener.prototype.Unsubscribe = function () {
    //this._Dobj.PropertyChanged.Unsubscribe(this.OnSubPropertyChanged, this);
    //};

    //#endregion

    //#region DependencyObject

    var DependencyObject = Nullstone.Create("DependencyObject");

    DependencyObject.Instance.Init = function () {
        this._IsAttached = false;
        this._Providers = [];
        var propPrecEnum = _PropertyPrecedence;
        this.AddProvider(new _LocalValuePropertyValueProvider(this, propPrecEnum.LocalValue));
        this.AddProvider(new _DefaultValuePropertyValueProvider(this, propPrecEnum.DefaultValue));
        this.AddProvider(new _AutoCreatePropertyValueProvider(this, propPrecEnum.AutoCreate));
        this._ProviderBitmasks = [];
        this._SecondaryParents = [];
        this.PropertyChanged = new MulticastEvent();
        this._SubPropertyListeners = [];
        this._CachedValues = {};
    };

    //#region Properties

    DependencyObject.NameProperty = DependencyProperty.RegisterFull("Name", function () { return String; }, DependencyObject, "", undefined, undefined, undefined, false, DependencyObject._NameValidator);

    //#endregion

    //#region Properties

    Nullstone.AutoProperties(DependencyObject, [
        DependencyObject.NameProperty,
        "TemplateOwner"
    ]);

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
        if (!(this instanceof Fayde.FrameworkElement)) {
            var propPrecEnum = _PropertyPrecedence;
            this._Providers[propPrecEnum.AutoCreate].ForeachValue(DependencyObject._PropagateMentor, newValue);
            this._Providers[propPrecEnum.LocalValue].ForeachValue(DependencyObject._PropagateMentor, newValue);
            if (this._Providers[propPrecEnum.LocalStyle])
                this._Providers[propPrecEnum.LocalStyle].ForeachValue(DependencyObject._PropagateMentor, newValue);
            if (this._Providers[propPrecEnum.ImplicitStyle])
                this._Providers[propPrecEnum.ImplicitStyle].ForeachValue(DependencyObject._PropagateMentor, newValue);
        }
        if (this._MentorChangedCallback) {
            this._MentorChangedCallback(this, newValue);
        }
    };
    DependencyObject._PropagateMentor = function (propd, value, newMentor) {
        if (value instanceof DependencyObject) {
            value.SetMentor(newMentor);
        }
    };

    DependencyObject.Instance._SetIsAttached = function (value) {
        if (this._IsAttached === value)
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

    //#region Clone

    DependencyObject.Instance.Clone = function () {
        var newDO = new this.constructor();
        newDO.CloneCore(this);
        return newDO;
    };
    DependencyObject.Instance.CloneCore = function (source) {
        var data = {
            Old: source,
            New: this
        };
        source._Providers[_PropertyPrecedence.AutoCreate].ForeachValue(DependencyObject.CloneAutoCreatedValue, data);
        source._Providers[_PropertyPrecedence.LocalValue].ForeachValue(DependencyObject.CloneLocalValue, data);
        this._CloneAnimationStorage(source);
    };
    DependencyObject.CloneAutoCreatedValue = function (propd, value, data) {
        var oldValue = data.Old._GetValue(propd, _PropertyPrecedence.AutoCreate);
        var newValue = data.New._GetValue(propd, _PropertyPrecedence.AutoCreate);

        if ((oldValue instanceof DependencyObject) && (newValue instanceof DependencyObject))
            newValue.CloneCore(oldValue);
    };
    DependencyObject.CloneLocalValue = function (propd, value, data) {
        if (propd._ID === DependencyObject.NameProperty._ID)
            return;

        data.New._SetValue(propd, Fayde.Clone(value));
    };

    //#endregion

    DependencyObject.Instance.GetDependencyProperty = function (propName) {
        return DependencyProperty.GetDependencyProperty(this.constructor, propName);
    };

    DependencyObject.Instance.AddProvider = function (provider) {
        this._Providers[provider._PropertyPrecedence] = provider;
    };

    //#region Set Value

    DependencyObject.Instance.$SetValue = function (propd, value) {
        if (!propd)
            throw new ArgumentException("No property specified.");
        if (propd.IsReadOnly) {
            if (propd._IsCustom)
                throw new InvalidOperationException();
            else
                throw new ArgumentException();
        }
        this.$SetValueInternal(propd, value);
    };
    DependencyObject.Instance.$SetValueInternal = function (propd, value) {
        if (value instanceof Fayde.UnsetValue) {
            this.$ClearValue(propd);
            return;
        }

        var expression = Nullstone.As(value, Fayde.Expression);
        if (expression instanceof Fayde.Data.BindingExpressionBase) {
            var binding = expression.Binding;
            var path = binding.Path.Path;
            if ((!path || path === ".") && binding.Mode === Fayde.Data.BindingMode.TwoWay)
                throw new ArgumentException("TwoWay bindings require a non-empty Path.");
            binding.Seal();
        }

        var existing;
        var data = {};
        if (this._Expressions && this._Expressions.TryGetValue(propd, data))
            existing = data.Value;

        var updateTwoWay = false;
        var addingExpression = false;
        if (expression) {
            if (!Nullstone.RefEquals(expression, existing)) {
                if (expression.Attached)
                    throw new ArgumentException("Cannot attach the same Expression to multiple FrameworkElements");

                if (existing)
                    this.$RemoveExpression(propd);
                if (!this._Expressions)
                    this._Expressions = new Dictionary(DependencyProperty, Fayde.Expression);
                this._Expressions.Add(propd, expression);
                expression._OnAttached(this);
            }
            addingExpression = true;
            value = expression.GetValue(propd);
        } else if (existing) {
            if (existing instanceof Fayde.Data.BindingExpressionBase) {
                var binding = existing.Binding;
                if (binding.Mode === Fayde.Data.BindingMode.TwoWay) {
                    updateTwoWay = !existing.Updating && !propd._IsCustom;
                } else if (!existing.Updating || binding.Mode === Fayde.Data.BindingMode.OneTime) {
                    this.$RemoveExpression(propd);
                }
            } else if (!existing.Updating) {
                this.$RemoveExpression(propd);
            }
        }

        try {
            this._SetValue(propd, value);
            if (updateTwoWay)
                existing._TryUpdateSourceObject(value);
        } catch (err) {
            if (!addingExpression)
                throw err;
            this._SetValue(propd, propd.DefaultValue);
            if (updateTwoWay)
                existing._TryUpdateSourceObject(value);
        }
    };
    DependencyObject.Instance._SetValue = function (propd, value) {
        if (!propd)
            throw new ArgumentException("Null dependency property.");

        var error = new BError();
        if (value === null) {
            this._SetValueWithError(propd, null, error);
            if (error.IsErrored())
                throw error.CreateException();
            return;
        }

        if (value instanceof Fayde.UnsetValue) {
            this._ClearValue(propd, true);
            return;
        }

        if (propd.GetTargetType() === String) {
            if (value != null && typeof value !== "string")
                value = value.toString();
            //TODO: More type checks
        }

        this._SetValueWithError(propd, value, error);
        if (error.IsErrored())
            throw error.CreateException();
    };
    DependencyObject.Instance._SetValueWithError = function (propd, value, error) {
        if (!error)
            error = new BError();
        var hasCoercer = propd._HasCoercer();
        var coerced = value;
        if ((hasCoercer && !(coerced = propd._Coerce(this, coerced, error)))
                || !this._IsValueValid(propd, coerced, error)
                || !propd._Validate(this, propd, coerced, error)) {
            if (error.IsErrored())
                throw error.CreateException();
            return false;
        }
        var retVal = this._SetValueWithErrorImpl(propd, coerced, error);
        if (error.IsErrored())
            throw error.CreateException();
        return retVal;
    };
    DependencyObject.Instance._SetValueWithErrorImpl = function (propd, value, error) {
        if (this._IsFrozen) {
            error.SetErrored(BError.UnauthorizedAccess, "Cannot set value for property " + propd.Name + " on frozen DependencyObject.");
            return false;
        }
        var currentValue;
        var equal = false;

        if ((currentValue = this._ReadLocalValue(propd)) === undefined)
            if (propd._IsAutoCreated)
                currentValue = this._Providers[_PropertyPrecedence.AutoCreate].ReadLocalValue(propd);

        if (currentValue !== undefined && value !== undefined)
            equal = !propd._AlwaysChange && Nullstone.Equals(currentValue, value);
        else
            equal = currentValue === undefined && value === undefined;

        if (!equal) {
            var propPrecEnum = _PropertyPrecedence;
            var newValue;
            this._Providers[propPrecEnum.LocalValue].ClearValue(propd);
            if (propd._IsAutoCreated)
                this._Providers[propPrecEnum.AutoCreate].ClearValue(propd);

            if (value !== undefined && (!propd._IsAutoCreated || !(value instanceof DependencyObject) || Nullstone.Is(value, DependencyObject)))
                newValue = value;
            else
                newValue = undefined;

            if (newValue !== undefined) {
                this._Providers[propPrecEnum.LocalValue].SetValue(propd, newValue);
            }
            this._ProviderValueChanged(propPrecEnum.LocalValue, propd, currentValue, newValue, true, true, true, error);
        }

        return true;
    };

    DependencyObject.Instance._IsValueValid = function (propd, coerced, error) {
        //TODO: Handle type problems
        return true;
    };

    DependencyObject.Instance._HasDeferredValueExpression = function (propd) {
        var data = {};
        if (this._Expressions != null && this._Expressions.TryGetValue(propd, data)) {
            return data.Value instanceof Fayde.DeferredValueExpression;
        }
        return false;
    };

    //#endregion

    //#region Get Value

    DependencyObject.Instance.$GetValue = function (propd) {
        if (!propd)
            throw new ArgumentException("Null dependency property.");
        if (propd == null && !(propd._IsAttached || this instanceof propd.OwnerType))
            throw new InvalidOperationException("Cannot get the DependencyProperty " + propd.Name + " on an object of type " + propd.OwnerType._TypeName);
        return this._GetValue(propd);
    };
    DependencyObject.Instance._GetValue = function (propd, startingPrecedence, endingPrecedence) {
        var propPrecEnum = _PropertyPrecedence;
        if (startingPrecedence === undefined)
            startingPrecedence = propPrecEnum.Highest;
        if (endingPrecedence === undefined)
            endingPrecedence = propPrecEnum.Lowest;

        //Establish providers used
        var bitmask = this._ProviderBitmasks[propd._ID] | propd._BitmaskCache;

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
        var propPrecEnum = _PropertyPrecedence;
        var v = this._GetValue(propd, propPrecEnum.LocalValue, propPrecEnum.InheritedDataContext);
        if (v === undefined && propd._IsAutoCreated)
            v = this._Providers[propPrecEnum.AutoCreate].ReadLocalValue(propd);
        return v;
    };
    DependencyObject.Instance._GetValueNoDefault = function (propd) {
        var value;
        var propPrecDefaultValue = _PropertyPrecedence.DefaultValue;
        for (var i = 0; i < propPrecDefaultValue; i++) {
            var provider = this._Providers[i];
            if (!provider)
                continue;
            value = provider.GetPropertyValue(propd);
            if (value !== undefined)
                break;
        }
        return value;
    };

    //#endregion

    //#region Read Local Value

    DependencyObject.Instance.$ReadLocalValue = function (propd) {
        var data = {};
        if (this._Expressions != null && this._Expressions.TryGetValue(propd, data))
            return data.Value;
        return this.$ReadLocalValueInternal(propd);
    };
    DependencyObject.Instance.$ReadLocalValueInternal = function (propd) {
        if (propd == null)
            throw new ArgumentException("You must specify a dependency property.");

        var error = new BError();
        var value = this._ReadLocalValueWithError(propd, error);
        if (error.IsErrored())
            throw error.CreateException();
        if (value === undefined)
            return new Fayde.UnsetValue();
        return value;
    };
    DependencyObject.Instance._ReadLocalValueWithError = function (propd, error) {
        if (!this._HasProperty(propd)) {
            error.SetErrored(BError.Exception, "Cannot get the DependencyProperty " + propd.Name + " on an object of type " + propd.OwnerType);
            return undefined;
        }
        return this._ReadLocalValue(propd);
    };
    DependencyObject.Instance._ReadLocalValue = function (propd) {
        return this._Providers[_PropertyPrecedence.LocalValue].GetPropertyValue(propd);
    };

    //#endregion

    //#region Clear Value

    DependencyObject.Instance.$ClearValue = function (propd) {
        if (!propd)
            throw new ArgumentException("Null dependency property.");
        if (propd.IsReadOnly && !propd._IsCustom)
            throw new ArgumentException("This property is readonly.");
        this.$ClearValueInternal(propd);
    };
    DependencyObject.Instance.$ClearValueInternal = function (propd) {
        this.$RemoveExpression(propd);
        this._ClearValue(propd, true);
    };
    DependencyObject.Instance._ClearValue = function (propd, notifyListeners) {
        var error = new BError();
        this._ClearValueWithError(propd, true, error);
        if (error.IsErrored())
            throw error.CreateException();
    };
    DependencyObject.Instance._ClearValueWithError = function (propd, notifyListeners, error) {
        if (notifyListeners === undefined)
            notifyListeners = true;
        if (!error)
            error = new BError();

        if (this._GetAnimationStorageFor(propd) != null) {
            return;
        }

        var propPrecEnum = _PropertyPrecedence;
        var oldLocalValue;
        if ((oldLocalValue = this._ReadLocalValue(propd)) === undefined) {
            if (propd._IsAutoCreated)
                oldLocalValue = this._Providers[propPrecEnum.AutoCreate].ReadLocalValue(propd);
        }

        if (oldLocalValue !== undefined) {
            var dob;
            if (oldLocalValue && (dob = Nullstone.As(oldLocalValue, DependencyObject)) != null) {
                if (!propd._IsCustom) {
                    dob._RemoveParent(this, null);
                    dob.RemovePropertyChangedListener(this, propd);
                    dob._SetIsAttached(false);
                    if (Nullstone.Is(dob, Collection)) {
                        //TODO: Changed Event - Remove Handler
                        //TODO: Item Changed Event - Remove Handler
                    }
                }
            }
            this._Providers[propPrecEnum.LocalValue].ClearValue(propd);
            if (propd._IsAutoCreated)
                this._Providers[propPrecEnum.AutoCreate].ClearValue(propd);
        }

        var count = propPrecEnum.Count;
        for (var i = propPrecEnum.LocalValue + 1; i < count; i++) {
            var provider = this._Providers[i];
            if (provider && provider.RecomputePropertyValueOnClear)
                provider.RecomputePropertyValueOnClear(propd, error);
        }

        if (oldLocalValue !== undefined) {
            this._ProviderValueChanged(propPrecEnum.LocalValue, propd, oldLocalValue, undefined, notifyListeners, true, false, error);
        }
    };

    //#endregion

    DependencyObject.Instance.$RemoveExpression = function (propd) {
        var data = {};
        if (this._Expressions != null && this._Expressions.TryGetValue(propd, data)) {
            this._Expressions.Remove(propd);
            data.Value._OnDetached(this);
        }
    };
    DependencyObject.Instance._HasProperty = function (propd) {
        if (propd == null)
            return false;
        if (propd._IsAttached)
            return true;
        if (this instanceof propd.OwnerType)
            return true;
        return false;
    };

    DependencyObject.Instance._PropertyHasValueNoAutoCreate = function (propd, obj) {
        var v = this._GetValueNoAutoCreate(propd);
        return v === undefined ? obj === undefined : v == obj;
    };
    DependencyObject.Instance._ProviderValueChanged = function (providerPrecedence, propd, oldProviderValue, newProviderValue, notifyListeners, setParent, mergeNamesOnSetParent, error) {
        delete this._CachedValues[propd._ID];

        var propPrecEnum = _PropertyPrecedence;
        var bitmask = this._ProviderBitmasks[propd._ID] || 0;
        if (newProviderValue !== undefined)
            bitmask |= 1 << providerPrecedence;
        else
            bitmask &= ~(1 << providerPrecedence);
        this._ProviderBitmasks[propd._ID] = bitmask;

        var higher = (((1 << (providerPrecedence + 1)) - 2) & bitmask) | propd._BitmaskCache;

        var propPrecHighest = _PropertyPrecedence.Highest;
        for (var j = providerPrecedence - 1; j >= propPrecHighest; j--) {
            if (!(higher & (1 << j)))
                continue;
            var provider = this._Providers[j];
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
            var lowerPriorityValue = this._GetValue(propd, providerPrecedence + 1);
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

        var equal = (oldValue === null && newValue === null) || (oldValue === undefined && newValue === undefined); //INTENTIONAL
        if (oldValue != null && newValue != null) {
            equal = !propd._AlwaysChange && Nullstone.Equals(oldValue, newValue);
        }

        if (equal)
            return;

        var propPrecIsEnabled = propPrecEnum.IsEnabled;
        if (providerPrecedence !== propPrecIsEnabled && this._Providers[propPrecIsEnabled] && this._Providers[propPrecIsEnabled].LocalValueChanged(propd))
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
                while (cur && !(cur instanceof Fayde.FrameworkElement))
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

            if (propd._Inheritable > 0) {
                var propPrecInherited = _PropertyPrecedence.Inherited;
                if (providerPrecedence !== propPrecInherited) {
                    // NOTE: We only propagate if inherited exists and has the highest priority in the bitmask
                    var inheritedProvider = this._Providers[propPrecInherited];
                    // GetPropertyValueProvider(propd) < _PropertyPrecedence.Inherited
                    if (inheritedProvider && ((this._ProviderBitmasks[propd._ID] & ((1 << propPrecInherited) - 1)) !== 0))
                        inheritedProvider.PropagateInheritedProperty(propd, this, this);
                }
            }
        }

        //if ([this property has an active animation])
        //Needs clock tick..
    };
    DependencyObject.Instance._CallRecomputePropertyValueForProviders = function (propd, providerPrecedence, error) {
        for (var i = 0; i < providerPrecedence; i++) {
            var provider = this._Providers[i];
            if (provider && provider.RecomputePropertyValueOnLowerr)
                provider.RecomputePropertyValueOnLower(propd, error);
        }
    };
    DependencyObject.Instance._PropagateInheritedValue = function (inheritable, source, newValue) {
        var propPrecInherited = _PropertyPrecedence.Inherited;
        var inheritedProvider = this._Providers[propPrecInherited];
        if (!inheritedProvider)
            return true;

        inheritedProvider._SetPropertySource(inheritable, source);
        var propd = inheritedProvider._GetPropertyFunc(inheritable, this);
        if (!propd)
            return false;

        var error = new BError();
        this._ProviderValueChanged(propPrecInherited, propd, undefined, newValue, true, false, false, error);
    };
    DependencyObject.Instance._GetInheritedValueSource = function (inheritable) {
        var inheritedProvider = this._Providers[_PropertyPrecedence.Inherited];
        if (!inheritedProvider)
            return undefined;
        return inheritedProvider._GetPropertySource(inheritable);
    };
    DependencyObject.Instance._SetInheritedValueSource = function (inheritable, source) {
        var propPrecInherited = _PropertyPrecedence.Inherited;
        var inheritedProvider = this._Providers[propPrecInherited];
        if (!inheritedProvider)
            return;

        if (!source) {
            var propd = inheritedProvider._GetPropertyFunc(inheritable, this);
            if (propd)
                return;
            var bitmask = this._ProviderBitmasks[propd._ID];
            bitmask &= ~(1 << propPrecInherited);
            this._ProviderBitmasks[propd._ID] = bitmask;
        }
        inheritedProvider._SetPropertySource(inheritable, source);
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
        if (!(ldo instanceof Fayde.Setter)) {
            var listener = new SubPropertyListener(ldo, propd);
            this._SubPropertyListeners.push(listener);
            this.PropertyChanged.Subscribe(listener.OnSubPropertyChanged, listener);
        }
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
    DependencyObject.Instance._OnCollectionChanged = function (col, args) { };
    DependencyObject.Instance._OnCollectionItemChangedEH = function (sender, args) {
        this._OnCollectionItemChanged(sender, args.Item, args);
    };
    DependencyObject.Instance._OnCollectionItemChanged = function (col, obj, args) { };

    //#endregion

    //#region Name

    DependencyObject.Instance.FindName = function (name, isTemplateItem) {
        /// <param name="name" type="String"></param>
        /// <param name="isTemplateItem" type="Boolean"></param>
        /// <returns type="DependencyObject" />
        if (isTemplateItem === undefined)
            isTemplateItem = Fayde.Controls.Control.GetIsTemplateItem(this);

        var scope = Fayde.NameScope.GetNameScope(this);
        if (scope && (isTemplateItem === scope.GetIsLocked()))
            return scope.FindName(name);

        if (this._Parent)
            return this._Parent.FindName(name, isTemplateItem);

        return undefined;
    };
    DependencyObject.Instance.FindNameScope = function (templateNamescope) {
        if (templateNamescope === undefined)
            templateNamescope = Fayde.Controls.Control.GetIsTemplateItem(this);

        var scope = Fayde.NameScope.GetNameScope(this);
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

        this._SetValue(DependencyObject.NameProperty, name);
        scope.RegisterName(name, this);
        return true;
    };

    DependencyObject.Instance._RegisterAllNamesRootedAt = function (toNs, error) {
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

        var thisNs = Fayde.NameScope.GetNameScope(this);

        if (thisNs && thisNs._GetTemporary()) {
            mergeNamescope = true;
        } else if (!thisNs) {
            recurse = true;
            registerName = true;
        } else if (true /* TODO: IsHydratedFromXaml */) {
            registerName = true;
        }

        if (mergeNamescope) {
            toNs._MergeTemporaryScope(thisNs, error);
            this._ClearValue(Fayde.NameScope.NameScopeProperty, false);
        }

        if (registerName) {
            var n = this.Name;
            if (n) {
                var o = toNs.FindName(n);
                if (o) {
                    if (!Nullstone.RefEquals(o, this)) {
                        error.SetErrored(BError.Argument, "The name already exists in the tree: " + n);
                        return;
                    }
                } else {
                    toNs.RegisterName(n, this);
                }
            }
        }

        if (recurse) {
            var data = {
                toNs: toNs,
                error: error
            };
            this._Providers[_PropertyPrecedence.AutoCreate].ForeachValue(DependencyObject._RegisterDONames, data);
            this._Providers[_PropertyPrecedence.LocalValue].ForeachValue(DependencyObject._RegisterDONames, data);
        }

        this._RegisteringNames = false;
    };
    DependencyObject.Instance._UnregisterAllNamesRootedAt = function (fromNs) {
        if (this._RegisteringNames)
            return;
        if (this._PermitsMultipleParents() && this._HasSecondaryParents())
            return;
        this._RegisteringNames = true;

        var thisNs = Fayde.NameScope.GetNameScope(this);
        if (/* TODO: this._IsHydratedFromXaml() || */!thisNs || thisNs._GetTemporary()) {
            var name = this.Name;
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
    DependencyObject._RegisterDONames = function (propd, value, data) {
        if (data.error.IsErrored())
            return;
        if (value != null && value instanceof DependencyObject) {
            value._RegisterAllNamesRootedAt(data.toNs, data.error);
        }
    };
    DependencyObject._UnregisterDONames = function (propd, value, fromNs) {
        if (!propd._IsCustom && value && value instanceof DependencyObject) {
            value._UnregisterAllNamesRootedAt(fromNs);
        }
    };

    //#endregion

    //#region Parent Usage

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
            current = current._Parent;
        }

        if (this._Parent && !this._PermitsMultipleParents()) {
            if (parent instanceof Fayde.DependencyObjectCollection && (!parent._GetIsSecondaryParent() || this._HasSecondaryParents())) {
                error.SetErrored(BError.InvalidOperation, "Element is already a child of another element.");
                return;
            }
        }

        if (this._Parent || this._HasSecondaryParents()) {
            this._AddSecondaryParent(parent);
            if (this._Parent && !(this._Parent instanceof Fayde.ResourceDictionary))
                this.SetMentor(null);
            if (this._SecondaryParents.length > 1 || !(parent instanceof Fayde.DependencyObjectCollection) || !parent._GetIsSecondaryParent())
                return;
        }

        var thisScope = Fayde.NameScope.GetNameScope(this);
        var parentScope = parent.FindNameScope();
        if (thisScope) {
            if (thisScope._GetTemporary()) {
                if (parentScope) {
                    parentScope._MergeTemporaryScope(thisScope, error);
                    this._ClearValue(Fayde.NameScope.NameScopeProperty, false);
                }
            } else {
                if (true /* TODO: this._IsHydratedFromXaml()*/) {
                    var name = this.Name;
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
                var tempScope = new Fayde.NameScope();
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
            while (d && !(d instanceof Fayde.FrameworkElement)) {
                d = d.GetMentor();
            }
            this.SetMentor(d);
        }
    };
    DependencyObject.Instance._RemoveParent = function (parent, error) {
        if (this._RemoveSecondaryParent(parent)) {
            if (this._HasSecondaryParents() || !(parent instanceof Fayde.DependencyObjectCollection) || !(parent._GetIsSecondaryParent()))
                return;
        } else {
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

    DependencyObject.Instance._CloneAnimationStorage = function (source) {
        var srcStorageRepo = source._StorageRepo;
        if (!srcStorageRepo)
            return;
        var storageRepo = this._StorageRepo = [];

        for (var key in srcStorageRepo) {
            var newList = new LinkedList();

            var list = srcStorageRepo[key];
            var node = list.Head;
            while (node) {
                node.Storage.SwitchTarget(this);
                var newNode = new LinkedListNode();
                newNode.Storage = node.Storage;
                newList.Append(newNode);
                node = node.Next;
            }
            storageRepo[key] = newList;
        }
    };
    DependencyObject.Instance._GetAnimationStorageFor = function (propd) {
        if (!this._StorageRepo)
            return null;

        var list = this._StorageRepo[propd];
        if (!list || list.IsEmpty())
            return null;

        return list.Tail.Storage;
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
            attachedStorage = list.Tail.Storage;
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

        var last = list.Tail;
        if (Nullstone.RefEquals(last.Storage, storage)) {
            list.Remove(last);
            if (!list.IsEmpty())
                list.Tail.Storage.Enable();
        } else {
            var node = list.Head;
            while (node) {
                if (Nullstone.RefEquals(node.Storage, storage)) {
                    var remove = node;
                    node = node.Next;
                    node.Storage.StopValue = storage.StopValue;
                    list.Remove(remove);
                    break;
                }
                node = node.Next;
            }
        }
    };

    //#endregion

    //#if !ENABLE_CANVAS
    if (!Fayde.IsCanvasEnabled) {
        DependencyObject.ProcessHtmlChanges = function () {
            var elsChanged = DependencyObject._ElsChanged;
            if (!elsChanged)
                return;
            delete DependencyObject._ElsChanged;
            var len = elsChanged.length;
            for (var i = 0; i < len; i++) {
                elsChanged[i].ProcessHtmlChanges();
            }
        };
        DependencyObject.Instance.ProcessHtmlChanges = function () {
            var invalidations = this._HtmlInvalidations;
            if (!invalidations)
                return;
            delete this._HtmlInvalidations;
            this.ApplyHtmlChanges(invalidations);
        };
        DependencyObject.Instance.ApplyHtmlChanges = function (invalidations) {
            for (var i in invalidations) {
                this.ApplyHtmlChange(invalidations[i]);
            }
        };
        DependencyObject.Instance.ApplyHtmlChange = function (change) {
        };
        DependencyObject.Instance.InvalidateProperty = function (propd, oldValue, newValue) {
            if (!this._HtmlInvalid) {
                this._HtmlInvalid = true;
                if (!DependencyObject._ElsChanged)
                    DependencyObject._ElsChanged = [];
                DependencyObject._ElsChanged.push(this);
            }
            if (!this._HtmlInvalidations)
                this._HtmlInvalidations = [];
            this._HtmlInvalidations[propd._ID] = { Property: propd, OldValue: oldValue, NewValue: newValue };
        };
    }
    //#endif

    Fayde.DependencyObject = Nullstone.FinishCreate(DependencyObject);

    //#endregion
})(Nullstone.Namespace("Fayde"));