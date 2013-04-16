var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="FrameworkProviderStore.ts" />
    /// CODE
    (function (Providers) {
        var ControlProviderStore = (function (_super) {
            __extends(ControlProviderStore, _super);
            function ControlProviderStore(dobj) {
                        _super.call(this, dobj);
            }
            ControlProviderStore.prototype.SetProviders = function (providerArr) {
                this._InheritedIsEnabledProvider = this._Providers[0] = providerArr[0];
                this._LocalValueProvider = this._Providers[1] = providerArr[1];
                this._DynamicValueProvider = this._Providers[2] = providerArr[2];
                this._LocalStyleProvider = this._Providers[3] = providerArr[3];
                this._ImplicitStyleProvider = this._Providers[4] = providerArr[4];
                this._InheritedProvider = this._Providers[5] = providerArr[5];
                this._InheritedDataContextProvider = this._Providers[6] = providerArr[6];
                this._DefaultValueProvider = this._Providers[7] = providerArr[7];
                this._AutoCreateProvider = this._Providers[8] = providerArr[8];
            };
            ControlProviderStore.prototype._PostProviderValueChanged = function (providerPrecedence, propd, oldValue, newValue, notifyListeners, error) {
                var iiep;
                if(providerPrecedence !== Providers._PropertyPrecedence.IsEnabled && (iiep = this._InheritedIsEnabledProvider) && iiep.LocalValueChanged(propd)) {
                    return;
                }
                _super.prototype._PostProviderValueChanged.call(this, providerPrecedence, propd, oldValue, newValue, notifyListeners, error);
            };
            ControlProviderStore.prototype.SetIsEnabledSource = function (source) {
                this._InheritedIsEnabledProvider.SetDataSource(source);
            };
            return ControlProviderStore;
        })(Providers.FrameworkProviderStore);
        Providers.ControlProviderStore = ControlProviderStore;        
    })(Fayde.Providers || (Fayde.Providers = {}));
    var Providers = Fayde.Providers;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=ControlProviderStore.js.map
