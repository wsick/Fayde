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
                if(storage.SourceNode) {
                    return storage.InheritedValue;
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
            IsEnabledStore.prototype.SetInheritedSource = function (storage, sourceNode) {
                var _this = this;
                while(sourceNode) {
                    if(sourceNode instanceof Fayde.Controls.ControlNode) {
                        break;
                    } else if(sourceNode instanceof Fayde.FENode) {
                        sourceNode = sourceNode.ParentNode;
                    } else {
                        sourceNode = null;
                    }
                }
                if(storage.SourceNode !== sourceNode) {
                    if(storage.Listener) {
                        storage.Listener.Detach();
                        storage.Listener = null;
                    }
                    storage.SourceNode = sourceNode;
                    if(sourceNode) {
                        storage.Listener = storage.SourceNode.MonitorIsEnabled(function (newIsEnabled) {
                            return _this.InheritedValueChanged(storage, newIsEnabled);
                        });
                    }
                }
                if(!sourceNode && (storage.OwnerNode.IsAttached)) {
                    this.InheritedValueChanged(storage);
                }
            };
            IsEnabledStore.prototype.CreateStorage = function (dobj, propd) {
                return {
                    OwnerNode: dobj.XamlNode,
                    Property: propd,
                    Precedence: Providers.PropertyPrecedence.DefaultValue,
                    Animation: undefined,
                    Local: undefined,
                    LocalStyleValue: undefined,
                    ImplicitStyleValue: undefined,
                    InheritedValue: undefined,
                    SourceNode: undefined,
                    Listener: undefined,
                    PropListeners: undefined
                };
            };
            IsEnabledStore.prototype.InheritedValueChanged = function (storage, newIsEnabled) {
                var localIsEnabled = _super.prototype.GetValue.call(this, storage);
                var parentEnabled = false;
                var sourceNode = storage.SourceNode;
                if(sourceNode && (storage.OwnerNode).VisualParentNode) {
                    parentEnabled = sourceNode.XObject.IsEnabled === true;
                }
                var newValue = localIsEnabled === true && parentEnabled;
                var oldValue = storage.InheritedValue;
                if(oldValue === newValue) {
                    return false;
                }
                storage.InheritedValue = newValue;
                this.OnPropertyChanged(storage, Providers.PropertyPrecedence.IsEnabled, oldValue, newValue);
                return true;
            };
            IsEnabledStore.InitIsEnabledSource = function InitIsEnabledSource(cn) {
                var propd = Fayde.Controls.Control.IsEnabledProperty;
                var storage = Providers.GetStorage(cn.XObject, propd);
                (propd.Store).SetInheritedSource(storage, cn.ParentNode);
            };
            return IsEnabledStore;
        })(Providers.PropertyStore);
        Providers.IsEnabledStore = IsEnabledStore;        
        IsEnabledStore.Instance = new IsEnabledStore();
    })(Fayde.Providers || (Fayde.Providers = {}));
    var Providers = Fayde.Providers;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=IsEnabledStore.js.map
