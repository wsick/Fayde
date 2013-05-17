/// CODE
/// <reference path="../DependencyObject.ts" />
/// <reference path="../../Media/Animation/AnimationStorage.ts" />
var Fayde;
(function (Fayde) {
    Fayde.UnsetValue = {
    };
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Providers) {
        (function (PropertyPrecedence) {
            PropertyPrecedence._map = [];
            PropertyPrecedence.IsEnabled = 0;
            PropertyPrecedence.LocalValue = 1;
            PropertyPrecedence.LocalStyle = 2;
            PropertyPrecedence.ImplicitStyle = 3;
            PropertyPrecedence.Inherited = 4;
            PropertyPrecedence.InheritedDataContext = 5;
            PropertyPrecedence.DefaultValue = 6;
            PropertyPrecedence.Lowest = 6;
            PropertyPrecedence.Highest = 0;
            PropertyPrecedence.Count = 7;
        })(Providers.PropertyPrecedence || (Providers.PropertyPrecedence = {}));
        var PropertyPrecedence = Providers.PropertyPrecedence;
        function GetStorage(dobj, propd) {
            var arr = (dobj)._PropertyStorage;
            var storage = arr[propd._ID];
            if(!storage) {
                arr[propd._ID] = storage = propd.Store.CreateStorage(dobj, propd);
            }
            return storage;
        }
        Providers.GetStorage = GetStorage;
        var PropertyStore = (function () {
            function PropertyStore() { }
            PropertyStore.prototype.GetValue = function (storage) {
                var val;
                if((val = storage.Local) !== undefined) {
                    return val;
                }
                if((val = storage.LocalStyleValue) !== undefined) {
                    return val;
                }
                if((val = storage.ImplicitStyleValue) !== undefined) {
                    return val;
                }
                return storage.Property.DefaultValue;
            };
            PropertyStore.prototype.GetValuePrecedence = function (storage) {
                if(storage.Local !== undefined) {
                    return PropertyPrecedence.LocalValue;
                }
                if(storage.LocalStyleValue !== undefined) {
                    return PropertyPrecedence.LocalStyle;
                }
                if(storage.ImplicitStyleValue !== undefined) {
                    return PropertyPrecedence.ImplicitStyle;
                }
                return PropertyPrecedence.DefaultValue;
            };
            PropertyStore.prototype.SetLocalValue = function (storage, newValue) {
                if(newValue === undefined || newValue === Fayde.UnsetValue) {
                    this.ClearValue(storage);
                    return;
                }
                var propd = storage.Property;
                if(newValue && propd.GetTargetType() === String) {
                    if(typeof newValue !== "string") {
                        newValue = newValue.toString();
                    }
                    //TODO: More type checks
                                    }
                var isValidOut = {
                    IsValid: false
                };
                newValue = propd.ValidateSetValue(storage.OwnerNode.XObject, newValue, isValidOut);
                if(!isValidOut.IsValid) {
                    return;
                }
                var oldValue = storage.Local;
                storage.Local = newValue;
                if(!propd.AlwaysChange && oldValue === newValue) {
                    return;
                }
                this.OnPropertyChanged(storage, PropertyPrecedence.LocalValue, oldValue, newValue);
            };
            PropertyStore.prototype.SetLocalStyleValue = function (storage, newValue) {
                var oldValue = storage.LocalStyleValue;
                storage.LocalStyleValue = newValue;
                if(oldValue === newValue || storage.Precedence < PropertyPrecedence.LocalStyle) {
                    return;
                }
                this.OnPropertyChanged(storage, PropertyPrecedence.LocalStyle, oldValue, newValue);
            };
            PropertyStore.prototype.SetImplicitStyle = function (storage, newValue) {
                var oldValue = storage.ImplicitStyleValue;
                storage.ImplicitStyleValue = newValue;
                if(oldValue === newValue || storage.Precedence < PropertyPrecedence.ImplicitStyle) {
                    return;
                }
                this.OnPropertyChanged(storage, PropertyPrecedence.ImplicitStyle, oldValue, newValue);
            };
            PropertyStore.prototype.ClearValue = function (storage, notifyListeners) {
                notifyListeners = notifyListeners !== false;
                var oldLocal = storage.Local;
                if(oldLocal === undefined) {
                    return;
                }
                storage.Local = undefined;
                this.OnPropertyChanged(storage, PropertyPrecedence.LocalValue, oldLocal, undefined);
            };
            PropertyStore.prototype.OnPropertyChanged = function (storage, effectivePrecedence, oldValue, newValue) {
                if(!storage.Property.IsCustom) {
                    if(oldValue instanceof Fayde.XamlObject) {
                        (oldValue).XamlNode.Detach();
                    }
                    if(newValue instanceof Fayde.XamlObject) {
                        var error = new BError();
                        if(!(newValue).XamlNode.AttachTo(storage.OwnerNode, error)) {
                            error.ThrowException();
                        }
                    }
                }
                if(newValue === undefined) {
                    effectivePrecedence = this.GetValuePrecedence(storage);
                    //Set new effective value?
                                    }
                storage.Precedence = effectivePrecedence;
                var propd = storage.Property;
                var args = {
                    Property: propd,
                    OldValue: oldValue,
                    NewValue: newValue
                };
                var sender = storage.OwnerNode.XObject;
                if(propd.ChangedCallback) {
                    propd.ChangedCallback(sender, args);
                }
                var listeners = storage.PropListeners;
                if(listeners) {
                    var len = listeners.length;
                    for(var i = 0; i < len; i++) {
                        listeners[i].OnPropertyChanged(sender, args);
                    }
                }
            };
            PropertyStore.prototype.ListenToChanged = function (target, propd, func, closure) {
                var storage = GetStorage(target, propd);
                var listeners = storage.PropListeners;
                if(!listeners) {
                    listeners = storage.PropListeners = [];
                }
                var listener = {
                    Detach: function () {
                        var index = listeners.indexOf(listener);
                        if(index > -1) {
                            listeners.splice(index, 1);
                        }
                    },
                    Property: propd,
                    OnPropertyChanged: function (sender, args) {
                        func.call(closure, sender, args);
                    }
                };
                listeners.push(listener);
                return listener;
            };
            PropertyStore.prototype.CreateStorage = function (dobj, propd) {
                return {
                    OwnerNode: dobj.XamlNode,
                    Property: propd,
                    Precedence: PropertyPrecedence.DefaultValue,
                    Animation: undefined,
                    Local: undefined,
                    LocalStyleValue: undefined,
                    ImplicitStyleValue: undefined,
                    PropListeners: undefined
                };
            };
            PropertyStore.prototype.Clone = function (dobj, sourceStorage) {
                var newStorage = this.CreateStorage(dobj, sourceStorage.Property);
                newStorage.Precedence = sourceStorage.Precedence;
                //newStorage.ImplicitStyleValue = undefined;
                //newStorage.LocalStyleValue = undefined;
                newStorage.Local = Fayde.Clone(sourceStorage.Local);
                var srcRepo = sourceStorage.Animation;
                if(!srcRepo) {
                    return newStorage;
                }
                var thisRepo = newStorage.Animation;
                for(var key in srcRepo) {
                    thisRepo[key] = srcRepo[key].slice(0);
                    //TODO: Clone each AnimationStorage also?
                                    }
                return newStorage;
            };
            return PropertyStore;
        })();
        Providers.PropertyStore = PropertyStore;        
        PropertyStore.Instance = new PropertyStore();
    })(Fayde.Providers || (Fayde.Providers = {}));
    var Providers = Fayde.Providers;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=PropertyStore.js.map
