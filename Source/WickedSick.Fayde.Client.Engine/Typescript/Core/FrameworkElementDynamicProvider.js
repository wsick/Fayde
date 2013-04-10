var Fayde;
(function (Fayde) {
    /// <reference path="ProviderStore.ts" />
    /// CODE
    /// <reference path="FrameworkElement.ts" />
    (function (Provider) {
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
    })(Fayde.Provider || (Fayde.Provider = {}));
    var Provider = Fayde.Provider;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=FrameworkElementDynamicProvider.js.map
