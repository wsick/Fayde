var Fayde;
(function (Fayde) {
    /// <reference path="IProviderStore.ts" />
    /// <reference path="../../Runtime/Nullstone.ts" />
    /// CODE
    /// <reference path="../DependencyObject.ts" />
    /// <reference path="../../Runtime/BError.ts" />
    /// <reference path="../../Runtime/Nullstone.ts" />
    /// <reference path="../../Media/Animation/AnimationStorage.ts" />
    (function (Providers) {
        var DefaultValueProvider = (function () {
            function DefaultValueProvider() { }
            DefaultValueProvider.prototype.GetPropertyValue = function (store, propd) {
                return propd.DefaultValue;
            };
            return DefaultValueProvider;
        })();
        Providers.DefaultValueProvider = DefaultValueProvider;        
        Nullstone.RegisterType(DefaultValueProvider, "DefaultValueProvider");
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
                store._ProviderValueChanged(Providers._PropertyPrecedence.AutoCreate, propd, undefined, value, false, error);
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
            return AutoCreateProvider;
        })();
        Providers.AutoCreateProvider = AutoCreateProvider;        
        Nullstone.RegisterType(AutoCreateProvider, "AutoCreateProvider");
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
            return LocalValueProvider;
        })();
        Providers.LocalValueProvider = LocalValueProvider;        
        Nullstone.RegisterType(LocalValueProvider, "LocalValueProvider");
        var BasicProviderStore = (function () {
            function BasicProviderStore(dobj) {
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
            BasicProviderStore.prototype.SetProviders = function (providerArr) {
                this._LocalValueProvider = this._Providers[1] = providerArr[1];
                this._InheritedDataContextProvider = this._Providers[6] = providerArr[6];
                this._DefaultValueProvider = this._Providers[7] = providerArr[7];
                this._AutoCreateProvider = this._Providers[8] = providerArr[8];
            };
            BasicProviderStore.prototype.GetValue = function (propd) {
                var startingPrecedence = Providers._PropertyPrecedence.Highest;
                var endingPrecedence = Providers._PropertyPrecedence.Lowest;
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
            BasicProviderStore.prototype.GetValueSpec = function (propd, startingPrecedence, endingPrecedence) {
                if(startingPrecedence === undefined) {
                    startingPrecedence = Providers._PropertyPrecedence.Highest;
                }
                if(endingPrecedence === undefined) {
                    endingPrecedence = Providers._PropertyPrecedence.Lowest;
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
            BasicProviderStore.prototype.SetValue = function (propd, value) {
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
                if(!isValidOut.IsValid) {
                    return;
                }
                var currentValue;
                var equal = false;
                if((currentValue = this._LocalValueProvider.GetPropertyValue(this, propd)) === undefined) {
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
                    this._ProviderValueChanged(Providers._PropertyPrecedence.LocalValue, propd, currentValue, newValue, true, error);
                    if(error.Message) {
                        throw new Exception(error.Message);
                    }
                }
            };
            BasicProviderStore.prototype.ClearValue = function (propd, notifyListeners) {
                if(notifyListeners === undefined) {
                    notifyListeners = true;
                }
                if(this._GetAnimationStorageFor(propd)) {
                    return;
                }
                var oldLocalValue;
                if((oldLocalValue = this._LocalValueProvider.GetPropertyValue(this, propd)) === undefined) {
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
                /*
                var count = _PropertyPrecedence.Count;
                for (var i = _PropertyPrecedence.LocalValue + 1; i < count; i++) {
                var provider = this._Providers[i];
                if (provider)
                provider.RecomputePropertyValueOnClear(propd, error);
                }
                */
                if(oldLocalValue !== undefined) {
                    this._ProviderValueChanged(Providers._PropertyPrecedence.LocalValue, propd, oldLocalValue, undefined, notifyListeners, error);
                    if(error.Message) {
                        throw new Exception(error.Message);
                    }
                }
            };
            BasicProviderStore.prototype.ReadLocalValue = function (propd) {
                var val = this._LocalValueProvider.GetPropertyValue(this, propd);
                if(val === undefined) {
                    return new Fayde.UnsetValue();
                }
                return val;
            };
            BasicProviderStore.prototype._ProviderValueChanged = function (providerPrecedence, propd, oldProviderValue, newProviderValue, notifyListeners, error) {
                /// Returns true if effective value was changed
                var bitmask = this._ProviderBitmasks[propd._ID] | 0;
                if(newProviderValue !== undefined) {
                    bitmask |= 1 << providerPrecedence;
                } else {
                    bitmask &= ~(1 << providerPrecedence);
                }
                this._ProviderBitmasks[propd._ID] = bitmask;
                var higher = (((1 << (providerPrecedence + 1)) - 2) & bitmask) | propd._BitmaskCache;
                var propPrecHighest = Providers._PropertyPrecedence.Highest;
                for(var j = providerPrecedence - 1; j >= propPrecHighest; j--) {
                    if(!(higher & (1 << j))) {
                        continue;
                    }
                    var provider = this._Providers[j];
                    if(!provider) {
                        continue;
                    }
                    if(provider.GetPropertyValue(this, propd) !== undefined) {
                        return false;
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
                    return false;
                }
                if(oldValue === undefined && newValue === undefined) {
                    return false;
                }
                if(!propd._AlwaysChange && Nullstone.Equals(oldValue, newValue)) {
                    return false;
                }
                this._PostProviderValueChanged(providerPrecedence, propd, oldValue, newValue, notifyListeners, error);
                return true;
            };
            BasicProviderStore.prototype._PostProviderValueChanged = function (providerPrecedence, propd, oldValue, newValue, notifyListeners, error) {
                if(!propd.IsCustom) {
                    this._DetachValue(oldValue);
                    this._AttachValue(newValue, error);
                }
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
                }
            };
            BasicProviderStore.prototype._GetAnimationStorageFor = function (propd) {
                var list = this._AnimStorage[propd._ID];
                if(list && list.length > 0) {
                    return list[list.length - 1];
                }
                return undefined;
            };
            BasicProviderStore.prototype._CloneAnimationStorage = function (sourceStore) {
                var srcRepo = sourceStore._AnimStorage;
                var thisRepo = this._AnimStorage;
                var list;
                for(var key in srcRepo) {
                    thisRepo[key] = srcRepo[0].slice(0);
                }
            };
            BasicProviderStore.prototype._AttachAnimationStorage = function (propd, storage) {
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
            BasicProviderStore.prototype._DetachAnimationStorage = function (propd, storage) {
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
            BasicProviderStore.prototype._SubscribePropertyChanged = function (listener) {
                var l = this._PropertyChangedListeners;
                if(l.indexOf(listener) < 0) {
                    l.push(listener);
                }
            };
            BasicProviderStore.prototype._UnsubscribePropertyChanged = function (listener) {
                var l = this._PropertyChangedListeners;
                var index = l.indexOf(listener);
                if(index > -1) {
                    l.splice(index, 1);
                }
            };
            BasicProviderStore.prototype._RaisePropertyChanged = function (args) {
                var l = this._PropertyChangedListeners;
                var len = l.length;
                for(var i = 0; i < len; i++) {
                    l[i].OnPropertyChanged(this._Object, args);
                }
            };
            BasicProviderStore.prototype._AttachValue = function (value, error) {
                if(!value) {
                    return true;
                }
                if(value instanceof Fayde.XamlObject) {
                    return (value).XamlNode.AttachTo(this._Object.XamlNode, error);
                }
            };
            BasicProviderStore.prototype._DetachValue = function (value) {
                if(!value) {
                    return;
                }
                if(value instanceof Fayde.XamlObject) {
                    (value).XamlNode.Detach();
                }
            };
            BasicProviderStore.prototype.CloneCore = function (sourceStore) {
                var dpIds = DependencyProperty._IDs;
                var localStorage = (this._LocalValueProvider)._ht;
                for(var id in localStorage) {
                    this.SetValue(dpIds[id], Fayde.Clone(localStorage[id]));
                }
                this._CloneAnimationStorage(sourceStore);
            };
            BasicProviderStore.prototype.EmitDataContextChanged = function () {
                this._InheritedDataContextProvider.EmitChanged();
            };
            BasicProviderStore.prototype.SetDataContextSourceNode = function (sourceNode) {
                this._InheritedDataContextProvider.SetDataSourceNode(sourceNode);
            };
            BasicProviderStore.prototype.OnDataContextSourceValueChanged = function (oldDataContext, newDataContext) {
                var error = new BError();
                return this._ProviderValueChanged(Providers._PropertyPrecedence.InheritedDataContext, Fayde.DependencyObject.DataContextProperty, oldDataContext, newDataContext, true, error);
            };
            return BasicProviderStore;
        })();
        Providers.BasicProviderStore = BasicProviderStore;        
        Nullstone.RegisterType(BasicProviderStore, "BasicProviderStore");
    })(Fayde.Providers || (Fayde.Providers = {}));
    var Providers = Fayde.Providers;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=BasicProviderStore.js.map
