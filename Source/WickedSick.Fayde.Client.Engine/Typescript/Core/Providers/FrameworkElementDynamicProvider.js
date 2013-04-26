var Fayde;
(function (Fayde) {
    /// <reference path="IProviderStore.ts" />
    /// <reference path="../../Runtime/Nullstone.ts" />
    /// CODE
    /// <reference path="../FrameworkElement.ts" />
    (function (Providers) {
        var FrameworkElementDynamicProvider = (function () {
            function FrameworkElementDynamicProvider() { }
            FrameworkElementDynamicProvider.prototype.GetPropertyValue = function (store, propd) {
                var isWidth = propd._ID === Fayde.FrameworkElement.ActualWidthProperty._ID;
                var isHeight = propd._ID === Fayde.FrameworkElement.ActualHeightProperty._ID;
                if(isWidth) {
                    var feNode = (store._Object).XamlNode;
                    return feNode.LayoutUpdater.ActualWidth;
                } else if(isHeight) {
                    var feNode = (store._Object).XamlNode;
                    return feNode.LayoutUpdater.ActualHeight;
                }
            };
            return FrameworkElementDynamicProvider;
        })();
        Providers.FrameworkElementDynamicProvider = FrameworkElementDynamicProvider;        
        Nullstone.RegisterType(FrameworkElementDynamicProvider, "FrameworkElementDynamicProvider");
    })(Fayde.Providers || (Fayde.Providers = {}));
    var Providers = Fayde.Providers;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=FrameworkElementDynamicProvider.js.map
