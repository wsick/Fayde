var Fayde;
(function (Fayde) {
    /// CODE
    /// <reference path="DependencyObject.ts" />
    /// <reference path="../Runtime/BError.ts" />
    /// <reference path="../Runtime/Nullstone.ts" />
    (function (Provider) {
        (function (_PropertyPrecedence) {
            _PropertyPrecedence._map = [];
            _PropertyPrecedence.IsEnabled = 0;
            _PropertyPrecedence.LocalValue = 1;
            _PropertyPrecedence.DynamicValue = 2;
            _PropertyPrecedence.LocalStyle = 3;
            _PropertyPrecedence.ImplicitStyle = 4;
            _PropertyPrecedence.Inherited = 5;
            _PropertyPrecedence.InheritedDataContext = 6;
            _PropertyPrecedence.DefaultValue = 7;
            _PropertyPrecedence.AutoCreate = 8;
            _PropertyPrecedence.Lowest = 8;
            _PropertyPrecedence.Highest = 0;
            _PropertyPrecedence.Count = 9;
        })(Provider._PropertyPrecedence || (Provider._PropertyPrecedence = {}));
        var _PropertyPrecedence = Provider._PropertyPrecedence;
        (function (_StyleIndex) {
            _StyleIndex._map = [];
            _StyleIndex.VisualTree = 0;
            _StyleIndex.ApplicationResources = 1;
            _StyleIndex.GenericXaml = 2;
            _StyleIndex.Count = 3;
        })(Provider._StyleIndex || (Provider._StyleIndex = {}));
        var _StyleIndex = Provider._StyleIndex;
        (function (_StyleMask) {
            _StyleMask._map = [];
            _StyleMask.None = 0;
            _StyleMask.VisualTree = 1 << _StyleIndex.VisualTree;
            _StyleMask.ApplicationResources = 1 << _StyleIndex.ApplicationResources;
            _StyleMask.GenericXaml = 1 << _StyleIndex.GenericXaml;
            _StyleMask.All = _StyleMask.VisualTree | _StyleMask.ApplicationResources | _StyleMask.GenericXaml;
        })(Provider._StyleMask || (Provider._StyleMask = {}));
        var _StyleMask = Provider._StyleMask;
        var DefaultValueProvider = (function () {
            function DefaultValueProvider() { }
            DefaultValueProvider.prototype.GetPropertyValue = function (store, propd) {
                return propd.DefaultValue;
            };
            DefaultValueProvider.prototype.RecomputePropertyValueOnClear = function (propd, error) {
            };
            DefaultValueProvider.prototype.RecomputePropertyValueOnLower = function (propd, error) {
            };
            return DefaultValueProvider;
        })();
        Provider.DefaultValueProvider = DefaultValueProvider;        
        var AutoCreateProvider = (function () {
            function AutoCreateProvider() {
                this._ht = [];
            }
            AutoCreateProvider.prototype.GetPropertyValue = function (store, propd) {
                var value = this.ReadLocalValue(propd);
                if(value !== undefined) {
                    return value;
                }
                value = propd._IsAutoCreated ? propd._AutoCreator.GetValue(propd, store._Object) : undefined;
                if(value === undefined) {
                    return undefined;
                }
                this._ht[propd._ID] = value;
                var error = new BError();
                store._ProviderValueChanged(_PropertyPrecedence.AutoCreate, propd, undefined, value, false, true, false, error);
                return value;
            };
            AutoCreateProvider.prototype.ReadLocalValue = function (propd) {
                return this._ht[propd._ID];
            };
            AutoCreateProvider.prototype.RecomputePropertyValueOnClear = function (propd) {
                this._ht[propd._ID] = undefined;
            };
            AutoCreateProvider.prototype.ClearValue = function (propd) {
                this._ht[propd._ID] = undefined;
            };
            AutoCreateProvider.prototype.RecomputePropertyValueOnLower = function (propd, error) {
            };
            return AutoCreateProvider;
        })();
        Provider.AutoCreateProvider = AutoCreateProvider;        
        var LocalValueProvider = (function () {
            function LocalValueProvider() {
                this._ht = [];
            }
            LocalValueProvider.prototype.GetPropertyValue = function (store, propd) {
                return this._ht[propd._ID];
            };
            LocalValueProvider.prototype.SetValue = function (propd, value) {
                this._ht[propd._ID] = value;
            };
            LocalValueProvider.prototype.ClearValue = function (propd) {
                this._ht[propd._ID] = undefined;
            };
            LocalValueProvider.prototype.RecomputePropertyValueOnClear = function (propd, error) {
            };
            LocalValueProvider.prototype.RecomputePropertyValueOnLower = function (propd, error) {
            };
            return LocalValueProvider;
        })();
        Provider.LocalValueProvider = LocalValueProvider;        
        var LocalStyleProvider = (function () {
            function LocalStyleProvider(store) {
                this._ht = [];
                this._Store = store;
            }
            LocalStyleProvider.prototype.GetPropertyValue = function (store, propd) {
                return this._ht[propd._ID];
            };
            LocalStyleProvider.prototype.RecomputePropertyValueOnClear = function (propd, error) {
                var oldValue;
                var newValue;
                var walkPropd;
                var walker = Fayde.SingleStyleWalker(this._Style);
                var setter;
                while(setter = walker.Step()) {
                    walkPropd = setter.Property;
                    if(walkPropd._ID !== propd._ID) {
                        continue;
                    }
                    newValue = setter.ConvertedValue;
                    oldValue = this._ht[propd._ID];
                    this._ht[propd._ID] = newValue;
                    this._Store._ProviderValueChanged(_PropertyPrecedence.LocalStyle, propd, oldValue, newValue, true, true, true, error);
                    if(error.Message) {
                        return;
                    }
                }
            };
            LocalStyleProvider.prototype.UpdateStyle = function (style, error) {
                var store = this._Store;
                var oldValue = undefined;
                var newValue = undefined;
                var oldWalker = Fayde.SingleStyleWalker(this._Style);
                var newWalker = Fayde.SingleStyleWalker(style);
                style.Seal();
                var oldSetter = oldWalker.Step();
                var newSetter = newWalker.Step();
                var oldProp;
                var newProp;
                while(oldSetter || newSetter) {
                    if(oldSetter) {
                        oldProp = oldSetter.Property;
                    }
                    if(newSetter) {
                        newProp = newSetter.Property;
                    }
                    if(oldProp && (oldProp < newProp || !newProp)) {
                        //WTF: Less than?
                        //Property in old style, not in new style
                        oldValue = oldSetter.ConvertedValue;
                        newValue = undefined;
                        this._ht[oldProp._ID] = undefined;
                        store._ProviderValueChanged(_PropertyPrecedence.LocalStyle, oldProp, oldValue, newValue, true, true, false, error);
                        oldSetter = oldWalker.Step();
                    } else if(oldProp === newProp) {
                        //Property in both styles
                        oldValue = oldSetter.ConvertedValue;
                        newValue = newSetter.ConvertedValue;
                        this._ht[oldProp._ID] = newValue;
                        store._ProviderValueChanged(_PropertyPrecedence.LocalStyle, oldProp, oldValue, newValue, true, true, false, error);
                        oldSetter = oldWalker.Step();
                        newSetter = newWalker.Step();
                    } else {
                        //Property in new style, not in old style
                        oldValue = undefined;
                        newValue = newSetter.ConvertedValue;
                        this._ht[newProp._ID] = newValue;
                        store._ProviderValueChanged(_PropertyPrecedence.LocalStyle, newProp, oldValue, newValue, true, true, false, error);
                        newSetter = newWalker.Step();
                    }
                }
                this._Style = style;
            };
            LocalStyleProvider.prototype.RecomputePropertyValueOnLower = function (propd, error) {
            };
            return LocalStyleProvider;
        })();
        Provider.LocalStyleProvider = LocalStyleProvider;        
        var ImplicitStyleProvider = (function () {
            function ImplicitStyleProvider(store) {
                this._ht = [];
                this._Styles = [
                    null, 
                    null, 
                    null
                ];
                this._StyleMask = _StyleMask.None;
                this._Store = store;
            }
            ImplicitStyleProvider.prototype.GetPropertyValue = function (store, propd) {
                return this._ht[propd._ID];
            };
            ImplicitStyleProvider.prototype.RecomputePropertyValueOnClear = function (propd, error) {
                if(!this._Styles) {
                    return;
                }
                var oldValue;
                var newValue;
                var prop;
                var walker = Fayde.MultipleStylesWalker(this._Styles);
                var setter;
                while(setter = walker.Step()) {
                    prop = setter.Property;
                    if(prop._ID !== propd._ID) {
                        continue;
                    }
                    newValue = setter.ConvertedValue;
                    oldValue = this._ht[propd._ID];
                    this._ht[propd._ID] = newValue;
                    this._Store._ProviderValueChanged(_PropertyPrecedence.ImplicitStyle, propd, oldValue, newValue, true, true, true, error);
                    if(error.Message) {
                        return;
                    }
                }
            };
            ImplicitStyleProvider.prototype.SetStyles = function (styleMask, styles, error) {
                if(!styles) {
                    return;
                }
                var newStyles = [
                    null, 
                    null, 
                    null
                ];
                if(this._Styles) {
                    newStyles[_StyleIndex.GenericXaml] = this._Styles[_StyleIndex.GenericXaml];
                    newStyles[_StyleIndex.ApplicationResources] = this._Styles[_StyleIndex.ApplicationResources];
                    newStyles[_StyleIndex.VisualTree] = this._Styles[_StyleIndex.VisualTree];
                }
                if(styleMask & _StyleMask.GenericXaml) {
                    newStyles[_StyleIndex.GenericXaml] = styles[_StyleIndex.GenericXaml];
                }
                if(styleMask & _StyleMask.ApplicationResources) {
                    newStyles[_StyleIndex.ApplicationResources] = styles[_StyleIndex.ApplicationResources];
                }
                if(styleMask & _StyleMask.VisualTree) {
                    newStyles[_StyleIndex.VisualTree] = styles[_StyleIndex.VisualTree];
                }
                this._ApplyStyles(this._StyleMask | styleMask, newStyles, error);
            };
            ImplicitStyleProvider.prototype.ClearStyles = function (styleMask, error) {
                if(!this._Styles) {
                    return;
                }
                var newStyles = this._Styles.slice(0);
                //TODO: Do we need a deep copy?
                if(styleMask & _StyleMask.GenericXaml) {
                    newStyles[_StyleIndex.GenericXaml] = null;
                }
                if(styleMask & _StyleMask.ApplicationResources) {
                    newStyles[_StyleIndex.ApplicationResources] = null;
                }
                if(styleMask & _StyleMask.VisualTree) {
                    newStyles[_StyleIndex.VisualTree] = null;
                }
                this._ApplyStyles(this._StyleMask & ~styleMask, newStyles, error);
            };
            ImplicitStyleProvider.prototype._ApplyStyles = function (styleMask, styles, error) {
                var isChanged = !this._Styles || styleMask !== this._StyleMask;
                if(!isChanged) {
                    for(var i = 0; i < _StyleIndex.Count; i++) {
                        if(styles[i] !== this._Styles[i]) {
                            isChanged = true;
                            break;
                        }
                    }
                }
                if(!isChanged) {
                    return;
                }
                var oldValue;
                var newValue;
                var oldWalker = Fayde.MultipleStylesWalker(this._Styles);
                var newWalker = Fayde.MultipleStylesWalker(styles);
                var oldSetter = oldWalker.Step();
                var newSetter = newWalker.Step();
                var oldProp;
                var newProp;
                while(oldSetter || newSetter) {
                    if(oldSetter) {
                        oldProp = oldSetter.Property;
                    }
                    if(newSetter) {
                        newProp = newSetter.Property;
                    }
                    if(oldProp && (oldProp < newProp || !newProp)) {
                        //WTF: Less than?
                        //Property in old style, not in new style
                        oldValue = oldSetter.ConvertedValue;
                        newValue = undefined;
                        this._ht[oldProp._ID] = undefined;
                        this._Store._ProviderValueChanged(_PropertyPrecedence.ImplicitStyle, oldProp, oldValue, newValue, true, true, false, error);
                        oldSetter = oldWalker.Step();
                    } else if(oldProp === newProp) {
                        //Property in both styles
                        oldValue = oldSetter.ConvertedValue;
                        newValue = newSetter.ConvertedValue;
                        this._ht[oldProp._ID] = newValue;
                        this._Store._ProviderValueChanged(_PropertyPrecedence.ImplicitStyle, oldProp, oldValue, newValue, true, true, false, error);
                        oldSetter = oldWalker.Step();
                        newSetter = newWalker.Step();
                    } else {
                        //Property in new style, not in old style
                        oldValue = undefined;
                        newValue = newSetter.ConvertedValue;
                        this._ht[newProp._ID] = newValue;
                        this._Store._ProviderValueChanged(_PropertyPrecedence.ImplicitStyle, newProp, oldValue, newValue, true, true, false, error);
                        newSetter = newWalker.Step();
                    }
                }
                this._Styles = styles;
                this._StyleMask = styleMask;
            };
            ImplicitStyleProvider.prototype.RecomputePropertyValueOnLower = function (propd, error) {
            };
            return ImplicitStyleProvider;
        })();
        Provider.ImplicitStyleProvider = ImplicitStyleProvider;        
        var FrameworkElementDynamicProvider = (function () {
            function FrameworkElementDynamicProvider() { }
            FrameworkElementDynamicProvider.prototype.GetPropertyValue = function (store, propd) {
                var isWidth = propd._ID !== Fayde.FrameworkElement.ActualWidthProperty._ID;
                var isHeight = propd._ID !== Fayde.FrameworkElement.ActualHeightProperty._ID;
                if(!isWidth && !isHeight) {
                    return undefined;
                }
                var actual = (store._Object)._ComputeActualSize();
                this._ActualWidth = actual.Width;
                this._ActualHeight = actual.Height;
                if(isWidth) {
                    return this._ActualWidth;
                }
                return this._ActualHeight;
            };
            FrameworkElementDynamicProvider.prototype.RecomputePropertyValueOnClear = function (propd, error) {
            };
            FrameworkElementDynamicProvider.prototype.RecomputePropertyValueOnLower = function (propd, error) {
            };
            return FrameworkElementDynamicProvider;
        })();
        Provider.FrameworkElementDynamicProvider = FrameworkElementDynamicProvider;        
        var ProviderStore = (function () {
            function ProviderStore(dobj) {
                this._Providers = [
                    null, 
                    null, 
                    null, 
                    null, 
                    null, 
                    null, 
                    null, 
                    null, 
                    null
                ];
                this._PropertyChangedListeners = [];
                this._ProviderBitmasks = [];
                this._AnimStorage = [];
                this._Object = dobj;
            }
            ProviderStore.BuildBitmask = function BuildBitmask(propd) {
                var bitmask = (1 << _PropertyPrecedence.Inherited) | (1 << _PropertyPrecedence.DynamicValue);
                if(propd._IsAutoCreated) {
                    bitmask |= (1 << _PropertyPrecedence.AutoCreate);
                }
                if(propd._HasDefaultValue) {
                    bitmask |= (1 << _PropertyPrecedence.DefaultValue);
                }
                return bitmask;
            };
            ProviderStore.prototype.GetValue = function (propd) {
                var startingPrecedence = _PropertyPrecedence.Highest;
                var endingPrecedence = _PropertyPrecedence.Lowest;
                //Establish providers used
                var bitmask = this._ProviderBitmasks[propd._ID] | propd._BitmaskCache;
                //Loop through providers and find the first provider that is on and contains the property value
                for(var i = startingPrecedence; i <= endingPrecedence; i++) {
                    if(!(bitmask & (1 << i))) {
                        continue;
                    }
                    var provider = this._Providers[i];
                    if(!provider) {
                        continue;
                    }
                    var val = provider.GetPropertyValue(this, propd);
                    if(val === undefined) {
                        continue;
                    }
                    return val;
                }
                return undefined;
            };
            ProviderStore.prototype.GetValueSpec = function (propd, startingPrecedence, endingPrecedence) {
                if(startingPrecedence === undefined) {
                    startingPrecedence = _PropertyPrecedence.Highest;
                }
                if(endingPrecedence === undefined) {
                    endingPrecedence = _PropertyPrecedence.Lowest;
                }
                //Establish providers used
                var bitmask = this._ProviderBitmasks[propd._ID] | propd._BitmaskCache;
                //Loop through providers and find the first provider that is on and contains the property value
                for(var i = startingPrecedence; i <= endingPrecedence; i++) {
                    if(!(bitmask & (1 << i))) {
                        continue;
                    }
                    var provider = this._Providers[i];
                    if(!provider) {
                        continue;
                    }
                    var val = provider.GetPropertyValue(this, propd);
                    if(val === undefined) {
                        continue;
                    }
                    return val;
                }
                return undefined;
            };
            ProviderStore.prototype.SetValue = function (propd, value) {
                if(value instanceof Fayde.UnsetValue) {
                    this.ClearValue(propd, true);
                    return;
                }
                if(value && propd.GetTargetType() === String) {
                    if(typeof value !== "string") {
                        value = value.toString();
                    }
                    //TODO: More type checks
                                    }
                var isValidOut = {
                    IsValid: false
                };
                value = propd.ValidateSetValue(this._Object, value, isValidOut);
                if(!isValidOut) {
                    return;
                }
                var currentValue;
                var equal = false;
                if((currentValue = this.ReadLocalValue(propd)) === undefined) {
                    if(propd._IsAutoCreated) {
                        currentValue = this._AutoCreateProvider.ReadLocalValue(propd);
                    }
                }
                if(currentValue !== undefined && value !== undefined) {
                    equal = !propd._AlwaysChange && Nullstone.Equals(currentValue, value);
                } else {
                    equal = currentValue === undefined && value === undefined;
                }
                if(!equal) {
                    var newValue;
                    this._LocalValueProvider.ClearValue(propd);
                    if(propd._IsAutoCreated) {
                        this._AutoCreateProvider.ClearValue(propd);
                    }
                    newValue = value;
                    if(newValue !== undefined) {
                        this._LocalValueProvider.SetValue(propd, newValue);
                    }
                    var error = new BError();
                    this._ProviderValueChanged(_PropertyPrecedence.LocalValue, propd, currentValue, newValue, true, true, true, error);
                    if(error.Message) {
                        throw new Exception(error.Message);
                    }
                }
            };
            ProviderStore.prototype.ClearValue = function (propd, notifyListeners) {
                if(notifyListeners === undefined) {
                    notifyListeners = true;
                }
                if(this._GetAnimationStorageFor(propd)) {
                    return;
                }
                var oldLocalValue;
                if((oldLocalValue = this.ReadLocalValue(propd)) === undefined) {
                    if(propd._IsAutoCreated) {
                        oldLocalValue = this._AutoCreateProvider.ReadLocalValue(propd);
                    }
                }
                var error = new BError();
                if(oldLocalValue !== undefined) {
                    this._DetachValue(oldLocalValue);
                    this._LocalValueProvider.ClearValue(propd);
                    if(propd._IsAutoCreated) {
                        this._AutoCreateProvider.ClearValue(propd);
                    }
                }
                var count = _PropertyPrecedence.Count;
                for(var i = _PropertyPrecedence.LocalValue + 1; i < count; i++) {
                    var provider = this._Providers[i];
                    if(provider) {
                        provider.RecomputePropertyValueOnClear(propd, error);
                    }
                }
                if(oldLocalValue !== undefined) {
                    this._ProviderValueChanged(_PropertyPrecedence.LocalValue, propd, oldLocalValue, undefined, notifyListeners, true, false, error);
                    if(error.Message) {
                        throw new Exception(error.Message);
                    }
                }
            };
            ProviderStore.prototype.ReadLocalValue = function (propd) {
                var val = this._LocalValueProvider.GetPropertyValue(this, propd);
                if(val === undefined) {
                    return new Fayde.UnsetValue();
                }
                return val;
            };
            ProviderStore.prototype._ProviderValueChanged = function (providerPrecedence, propd, oldProviderValue, newProviderValue, notifyListeners, setParent, mergeNamesOnSetParent, error) {
                delete this._Object._CachedValues[propd._ID];
                var bitmask = this._ProviderBitmasks[propd._ID] | 0;
                if(newProviderValue !== undefined) {
                    bitmask |= 1 << providerPrecedence;
                } else {
                    bitmask &= ~(1 << providerPrecedence);
                }
                this._ProviderBitmasks[propd._ID] = bitmask;
                var higher = (((1 << (providerPrecedence + 1)) - 2) & bitmask) | propd._BitmaskCache;
                var propPrecHighest = _PropertyPrecedence.Highest;
                for(var j = providerPrecedence - 1; j >= propPrecHighest; j--) {
                    if(!(higher & (1 << j))) {
                        continue;
                    }
                    var provider = this._Providers[j];
                    if(!provider) {
                        continue;
                    }
                    if(provider.GetPropertyValue(this, propd) !== undefined) {
                        this._CallRecomputePropertyValueForProviders(propd, providerPrecedence);
                        return;
                    }
                }
                var oldValue;
                var newValue;
                if(oldProviderValue === undefined || newProviderValue === undefined) {
                    var lowerPriorityValue = this.GetValueSpec(propd, providerPrecedence + 1);
                    if(newProviderValue === undefined) {
                        oldValue = oldProviderValue;
                        newValue = lowerPriorityValue;
                    } else if(oldProviderValue === undefined) {
                        oldValue = lowerPriorityValue;
                        newValue = newProviderValue;
                    }
                } else {
                    oldValue = oldProviderValue;
                    newValue = newProviderValue;
                }
                //INTENTIONAL: Below checks are different
                if(oldValue === null && newValue === null) {
                    return;
                }
                if(oldValue === undefined && newValue === undefined) {
                    return;
                }
                if(!propd._AlwaysChange && Nullstone.Equals(oldValue, newValue)) {
                    return;
                }
                var iiep;
                if(providerPrecedence !== _PropertyPrecedence.IsEnabled && (iiep = this._InheritedIsEnabledProvider) && iiep.LocalValueChanged(propd)) {
                    return;
                }
                this._CallRecomputePropertyValueForProviders(propd, providerPrecedence);
                var setsParent = setParent && !propd.IsCustom;
                this._DetachValue(oldValue);
                this._AttachValue(newValue, error);
                //Construct property changed event args and raise
                if(notifyListeners) {
                    var args = {
                        Property: propd,
                        OldValue: oldValue,
                        NewValue: newValue
                    };
                    try  {
                        this._Object._OnPropertyChanged(args);
                    } catch (err) {
                        error.Message = err.Message;
                    }
                    this._RaisePropertyChanged(args);
                    if(propd && propd._ChangedCallback) {
                        propd._ChangedCallback(this._Object, args);
                    }
                    if(propd._Inheritable > 0 && providerPrecedence !== _PropertyPrecedence.Inherited) {
                        // NOTE: We only propagate if inherited exists and has the highest priority in the bitmask
                        var inheritedProvider = this._InheritedProvider;
                        // GetPropertyValueProvider(propd) < _PropertyPrecedence.Inherited
                        if(inheritedProvider && ((this._ProviderBitmasks[propd._ID] & ((1 << _PropertyPrecedence.Inherited) - 1)) !== 0)) {
                            inheritedProvider.PropagateInheritedProperty(this, propd, this._Object, this._Object);
                        }
                    }
                }
            };
            ProviderStore.prototype._GetAnimationStorageFor = function (propd) {
                var list = this._AnimStorage[propd._ID];
                if(list && list.length > 0) {
                    return list[list.length - 1];
                }
                return undefined;
            };
            ProviderStore.prototype._CloneAnimationStorage = function (sourceStore) {
                var srcRepo = sourceStore._AnimStorage;
                var thisRepo = this._AnimStorage;
                var list;
                for(var key in srcRepo) {
                    thisRepo[key] = srcRepo[0].slice(0);
                }
            };
            ProviderStore.prototype._AttachAnimationStorage = function (propd, storage) {
                var list = this._AnimStorage[propd._ID];
                if(!list) {
                    this._AnimStorage[propd._ID] = list = [
                        storage
                    ];
                    return undefined;
                }
                var attached = list[list.length - 1];
                if(attached) {
                    attached.Disable();
                }
                list.push(storage);
                return attached;
            };
            ProviderStore.prototype._DetachAnimationStorage = function (propd, storage) {
                var list = this._AnimStorage[propd._ID];
                if(!list) {
                    return;
                }
                var len = list.length;
                if(len < 1) {
                    return;
                }
                var i;
                var cur;
                for(i = len - 1; i >= 0; i++) {
                    cur = list[i];
                    if(cur === storage) {
                        break;
                    }
                }
                if(i === (len - 1)) {
                    list.pop();
                    if(len > 1) {
                        list[len - 2].Enable();
                    }
                } else {
                    list.splice(i, 1);
                    if(i > 0) {
                        list[i - 1].StopValue = storage.StopValue;
                    }
                }
            };
            ProviderStore.prototype._CallRecomputePropertyValueForProviders = function (propd, providerPrecedence) {
                var error = new BError();
                for(var i = 0; i < providerPrecedence; i++) {
                    var provider = this._Providers[i];
                    if(provider) {
                        provider.RecomputePropertyValueOnLower(propd, error);
                    }
                }
            };
            ProviderStore.prototype._SubscribePropertyChanged = function (listener) {
                var l = this._PropertyChangedListeners;
                if(l.indexOf(listener) < 0) {
                    l.push(listener);
                }
            };
            ProviderStore.prototype._UnsubscribePropertyChanged = function (listener) {
                var l = this._PropertyChangedListeners;
                var index = l.indexOf(listener);
                if(index > -1) {
                    l.splice(index, 1);
                }
            };
            ProviderStore.prototype._RaisePropertyChanged = function (args) {
                var l = this._PropertyChangedListeners;
                var len = l.length;
                for(var i = 0; i < len; i++) {
                    l[i].OnPropertyChanged(this._Object, args);
                }
            };
            ProviderStore.prototype._AttachValue = function (value, error) {
                if(!value) {
                    return true;
                }
                if(value instanceof Fayde.DependencyObject) {
                    return (value).XamlNode.AttachTo(this._Object.XamlNode, error);
                    //TODO:
                    //  AddPropertyChangedListener (SubPropertyChanged)
                    //if (value instanceof XamlObjectCollection) {
                    //(<XamlObjectCollection>value).ListenToChanged(this);
                    //      Subscribe ItemChanged
                    //}
                                    } else if(value instanceof Fayde.XamlObject) {
                    return (value).XamlNode.AttachTo(this._Object.XamlNode, error);
                }
            };
            ProviderStore.prototype._DetachValue = function (value) {
                if(!value) {
                    return;
                }
                if(value instanceof Fayde.DependencyObject) {
                    (value).XamlNode.Detach();
                    //TODO:
                    //  RemovePropertyChangedListener (SubPropertyChanged)
                    //if (value instanceof XamlObjectCollection) {
                    //(<XamlObjectCollection>value).StopListenToChanged(this);
                    //      Unsubscribe ItemChanged
                    //}
                                    } else if(value instanceof Fayde.XamlObject) {
                    (value).XamlNode.Detach();
                }
            };
            return ProviderStore;
        })();
        Provider.ProviderStore = ProviderStore;        
    })(Fayde.Provider || (Fayde.Provider = {}));
    var Provider = Fayde.Provider;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=ProviderStore.js.map
