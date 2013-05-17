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
        var InheritedStore = (function (_super) {
            __extends(InheritedStore, _super);
            function InheritedStore() {
                _super.apply(this, arguments);

            }
            InheritedStore.prototype.GetValue = function (storage) {
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
                if((val = storage.InheritedValue) !== undefined) {
                    return val;
                }
                return storage.Property.DefaultValue;
            };
            InheritedStore.prototype.GetValuePrecedence = function (storage) {
                var prec = _super.prototype.GetValuePrecedence.call(this, storage);
                if(prec < Providers.PropertyPrecedence.Inherited) {
                    return prec;
                }
                if(storage.InheritedValue !== undefined) {
                    return Providers.PropertyPrecedence.Inherited;
                }
                return Providers.PropertyPrecedence.DefaultValue;
            };
            InheritedStore.prototype.OnPropertyChanged = function (storage, effectivePrecedence, oldValue, newValue) {
                _super.prototype.OnPropertyChanged.call(this, storage, effectivePrecedence, oldValue, newValue);
                if(effectivePrecedence <= Providers.PropertyPrecedence.Inherited) {
                    this.Propagate(storage.OwnerNode, storage.Property, newValue);
                }
            };
            InheritedStore.prototype.CreateStorage = function (dobj, propd) {
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
            InheritedStore.PropagateInheritedOnAdd = function PropagateInheritedOnAdd(dobj, subtreeNode) {
                var destination = subtreeNode.XObject;
                var store = InheritedStore.Instance;
                var arr = (destination)._PropertyStorage;
                var storage;
                var allProps = Fayde.InheritableOwner.AllInheritedProperties;
                var len = allProps.length;
                var propd;
                var newValue;
                var sourceNode;
                for(var i = 0; i < len; i++) {
                    propd = allProps[i];
                    sourceNode = dobj.XamlNode;
                    while(sourceNode && !((sourceNode.XObject).IsInheritable(propd))) {
                        sourceNode = sourceNode.ParentNode;
                    }
                    if(!sourceNode) {
                        continue;
                    }
                    newValue = (sourceNode.XObject).GetValue(propd);
                    if(newValue === propd.DefaultValue) {
                        continue;
                    }
                    storage = arr[propd._ID];
                    if(!storage) {
                        storage = arr[propd._ID] = store.CreateStorage(destination, propd);
                    }
                    if(!store.SetInheritedValue(subtreeNode, propd, newValue)) {
                        store.Propagate(subtreeNode, propd, newValue);
                    }
                }
            };
            InheritedStore.ClearInheritedOnRemove = function ClearInheritedOnRemove(dobj, subtreeNode) {
                var store = InheritedStore.Instance;
                var allProps = Fayde.InheritableOwner.AllInheritedProperties;
                var len = allProps.length;
                var propd;
                for(var i = 0; i < len; i++) {
                    propd = allProps[i];
                    if(!store.SetInheritedValue(subtreeNode, propd, undefined)) {
                        store.Propagate(subtreeNode, propd, undefined);
                    }
                }
            };
            InheritedStore.prototype.Propagate = function (ownerNode, propd, newValue) {
                var enumerator = ownerNode.GetInheritedEnumerator();
                var uin;
                while(enumerator.MoveNext()) {
                    uin = enumerator.Current;
                    if(!this.SetInheritedValue(uin, propd, newValue)) {
                        this.Propagate(uin, propd, newValue);
                    }
                }
            };
            InheritedStore.prototype.SetInheritedValue = function (don, propd, newValue) {
                /// Returns false if object doesn't understand this inheritable property
                var dobj = don.XObject;
                if(!(dobj).IsInheritable(propd)) {
                    return false;
                }
                var storage = Providers.GetStorage(dobj, propd);
                if(storage.Precedence < Providers.PropertyPrecedence.Inherited) {
                    //Overriden locally, don't propagate
                    storage.InheritedValue = newValue;
                    return true;
                }
                var oldValue = storage.InheritedValue;
                if(oldValue === undefined) {
                    oldValue = propd.DefaultValue;
                }
                storage.InheritedValue = newValue;
                storage.Precedence = Providers.PropertyPrecedence.Inherited;
                this.OnPropertyChanged(storage, Providers.PropertyPrecedence.Inherited, oldValue, newValue);
                return true;
            };
            return InheritedStore;
        })(Providers.PropertyStore);
        Providers.InheritedStore = InheritedStore;        
        InheritedStore.Instance = new InheritedStore();
    })(Fayde.Providers || (Fayde.Providers = {}));
    var Providers = Fayde.Providers;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=InheritedStore.js.map
