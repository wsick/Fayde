var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="InheritedProviderStore.ts" />
    /// CODE
    /// <reference path="../FrameworkElement.ts" />
    (function (Providers) {
        var FrameworkProviderStore = (function (_super) {
            __extends(FrameworkProviderStore, _super);
            function FrameworkProviderStore() {
                _super.apply(this, arguments);

            }
            FrameworkProviderStore.prototype.SetProviders = function (providerArr) {
                this._LocalValueProvider = this._Providers[1] = providerArr[1];
                this._DynamicValueProvider = this._Providers[2] = providerArr[2];
                this._LocalStyleProvider = this._Providers[3] = providerArr[3];
                this._ImplicitStyleProvider = this._Providers[4] = providerArr[4];
                this._InheritedProvider = this._Providers[5] = providerArr[5];
                this._InheritedDataContextProvider = this._Providers[6] = providerArr[6];
                this._DefaultValueProvider = this._Providers[7] = providerArr[7];
                this._AutoCreateProvider = this._Providers[8] = providerArr[8];
            };
            FrameworkProviderStore.prototype.SetImplicitStyles = function (styleMask, styles, error) {
                this._ImplicitStyleProvider.SetStyles(styleMask, styles, error);
            };
            FrameworkProviderStore.prototype.ClearImplicitStyles = function (styleMask, error) {
                this._ImplicitStyleProvider.ClearStyles(styleMask, error);
            };
            FrameworkProviderStore.prototype.SetLocalStyle = function (style, error) {
                this._LocalStyleProvider.UpdateStyle(style, error);
            };
            FrameworkProviderStore.prototype.EmitDataContextChanged = function () {
                this._InheritedDataContextProvider.EmitChanged();
            };
            FrameworkProviderStore.prototype.SetDataContextSource = function (source) {
                this._InheritedDataContextProvider.SetDataSource(source);
            };
            return FrameworkProviderStore;
        })(Providers.InheritedProviderStore);
        Providers.FrameworkProviderStore = FrameworkProviderStore;        
    })(Fayde.Providers || (Fayde.Providers = {}));
    var Providers = Fayde.Providers;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=FrameworkProviderStore.js.map
