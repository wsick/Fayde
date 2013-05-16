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
        var DataContextStore = (function (_super) {
            __extends(DataContextStore, _super);
            function DataContextStore() {
                _super.apply(this, arguments);

            }
            DataContextStore.prototype.GetValue = function (storage) {
                var val = _super.prototype.GetValue.call(this, storage);
                if(val === undefined) {
                    val = storage.InheritedValue;
                }
                return val;
            };
            DataContextStore.prototype.GetValuePrecedence = function (storage) {
                var prec = _super.prototype.GetValuePrecedence.call(this, storage);
                if(prec < Providers.PropertyPrecedence.InheritedDataContext) {
                    return prec;
                }
                if(storage.InheritedValue !== undefined) {
                    return Providers.PropertyPrecedence.InheritedDataContext;
                }
                return Providers.PropertyPrecedence.DefaultValue;
            };
            DataContextStore.prototype.EmitInheritedChanged = function (storage, newInherited) {
                var oldInherited = storage.InheritedValue;
                storage.InheritedValue = newInherited;
                if(storage.Precedence >= Providers.PropertyPrecedence.InheritedDataContext && oldInherited !== newInherited) {
                    this.OnPropertyChanged(storage, Providers.PropertyPrecedence.InheritedDataContext, oldInherited, newInherited);
                }
            };
            DataContextStore.prototype.CreateStorage = function (dobj, propd) {
                return {
                    OwnerNode: dobj.XamlNode,
                    Property: propd,
                    Precedence: Providers.PropertyPrecedence.DefaultValue,
                    Animation: undefined,
                    Local: undefined,
                    LocalStyleValue: undefined,
                    ImplicitStyleValue: undefined,
                    InheritedValue: undefined,
                    PropListeners: undefined
                };
            };
            return DataContextStore;
        })(Providers.PropertyStore);
        Providers.DataContextStore = DataContextStore;        
        DataContextStore.Instance = new DataContextStore();
    })(Fayde.Providers || (Fayde.Providers = {}));
    var Providers = Fayde.Providers;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=DataContextStore.js.map
