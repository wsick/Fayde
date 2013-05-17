var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="PropertyStore.ts" />
    /// CODE
    (function (Providers) {
        var IsEnabledStore = (function (_super) {
            __extends(IsEnabledStore, _super);
            function IsEnabledStore() {
                _super.apply(this, arguments);

            }
            IsEnabledStore.prototype.GetValue = function (storage) {
                if(storage.InheritedValue === false) {
                    return false;
                }
                return _super.prototype.GetValue.call(this, storage);
            };
            IsEnabledStore.prototype.GetValuePrecedence = function (storage) {
                if(storage.InheritedValue === false) {
                    return Providers.PropertyPrecedence.IsEnabled;
                }
                return _super.prototype.GetValuePrecedence.call(this, storage);
            };
            IsEnabledStore.prototype.SetLocalValue = function (storage, newValue) {
                var oldValue = storage.Local;
                storage.Local = newValue;
                if(oldValue === newValue || storage.InheritedValue === false) {
                    return;
                }
                this.OnPropertyChanged(storage, Providers.PropertyPrecedence.LocalValue, oldValue, newValue);
            };
            IsEnabledStore.prototype.OnPropertyChanged = function (storage, effectivePrecedence, oldValue, newValue) {
                _super.prototype.OnPropertyChanged.call(this, storage, effectivePrecedence, oldValue, newValue);
                storage.OwnerNode.OnIsEnabledChanged(oldValue, newValue);
            };
            IsEnabledStore.prototype.CreateStorage = function (dobj, propd) {
                return {
                    OwnerNode: dobj.XamlNode,
                    Property: propd,
                    Precedence: Providers.PropertyPrecedence.DefaultValue,
                    InheritedValue: true,
                    Animation: undefined,
                    Local: undefined,
                    LocalStyleValue: undefined,
                    ImplicitStyleValue: undefined,
                    PropListeners: undefined
                };
            };
            IsEnabledStore.prototype.EmitInheritedChanged = function (storage, newInherited) {
                var oldInherited = storage.InheritedValue;
                if(newInherited !== false) {
                    storage.Precedence = _super.prototype.GetValuePrecedence.call(this, storage);
                    storage.InheritedValue = true;
                } else {
                    storage.InheritedValue = false;
                }
                if(oldInherited === newInherited) {
                    return;
                }
                this.OnPropertyChanged(storage, Providers.PropertyPrecedence.IsEnabled, oldInherited, newInherited);
            };
            IsEnabledStore.EmitInheritedChanged = function EmitInheritedChanged(cn, value) {
                var propd = Fayde.Controls.Control.IsEnabledProperty;
                var storage = Fayde.Providers.GetStorage(cn.XObject, propd);
                (propd.Store).EmitInheritedChanged(storage, value);
            };
            return IsEnabledStore;
        })(Providers.PropertyStore);
        Providers.IsEnabledStore = IsEnabledStore;        
        IsEnabledStore.Instance = new IsEnabledStore();
    })(Fayde.Providers || (Fayde.Providers = {}));
    var Providers = Fayde.Providers;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=IsEnabledStore.js.map
