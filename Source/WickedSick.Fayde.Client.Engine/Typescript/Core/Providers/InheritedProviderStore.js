var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="BasicProviderStore.ts" />
    /// CODE
    (function (Providers) {
        var InheritedProviderStore = (function (_super) {
            __extends(InheritedProviderStore, _super);
            function InheritedProviderStore() {
                _super.apply(this, arguments);

            }
            InheritedProviderStore.prototype.SetProviders = function (providerArr) {
                this._LocalValueProvider = this._Providers[1] = providerArr[1];
                this._InheritedProvider = this._Providers[5] = providerArr[5];
                this._DefaultValueProvider = this._Providers[7] = providerArr[7];
                this._AutoCreateProvider = this._Providers[8] = providerArr[8];
            };
            InheritedProviderStore.prototype._PostProviderValueChanged = function (providerPrecedence, propd, oldValue, newValue, notifyListeners, error) {
                _super.prototype._PostProviderValueChanged.call(this, providerPrecedence, propd, oldValue, newValue, notifyListeners, error);
                if(!notifyListeners) {
                    return;
                }
                if(propd._Inheritable > 0 && providerPrecedence !== Providers._PropertyPrecedence.Inherited) {
                    // NOTE: We only propagate if inherited exists and has the highest priority in the bitmask
                    var inheritedProvider = this._InheritedProvider;
                    // GetPropertyValueProvider(propd) < _PropertyPrecedence.Inherited
                    if(inheritedProvider && ((this._ProviderBitmasks[propd._ID] & ((1 << Providers._PropertyPrecedence.Inherited) - 1)) !== 0)) {
                        inheritedProvider.PropagateInheritedProperty(this, propd, this._Object, this._Object);
                    }
                }
            };
            InheritedProviderStore.prototype.PropagateInheritedOnAdd = function (subtree) {
                this._InheritedProvider.PropagateInheritedPropertiesOnAddingToTree(this, subtree);
            };
            InheritedProviderStore.prototype.ClearInheritedOnRemove = function (subtree) {
                this._InheritedProvider.ClearInheritedPropertiesOnRemovingFromTree(this, subtree);
            };
            return InheritedProviderStore;
        })(Providers.BasicProviderStore);
        Providers.InheritedProviderStore = InheritedProviderStore;        
    })(Fayde.Providers || (Fayde.Providers = {}));
    var Providers = Fayde.Providers;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=InheritedProviderStore.js.map
