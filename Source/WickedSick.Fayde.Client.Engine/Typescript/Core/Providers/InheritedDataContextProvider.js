var Fayde;
(function (Fayde) {
    /// <reference path="IProviderStore.ts" />
    /// <reference path="../../Runtime/Nullstone.ts" />
    /// CODE
    /// <reference path="../FrameworkElement.ts" />
    /// <reference path="../PropertyChangedListener.ts" />
    (function (Providers) {
        var InheritedDataContextProvider = (function () {
            function InheritedDataContextProvider(store) {
                this._Store = store;
            }
            InheritedDataContextProvider.prototype.GetPropertyValue = function (store, propd) {
                var sourceNode = this._SourceNode;
                if(!sourceNode) {
                    return;
                }
                if(propd !== Fayde.DependencyObject.DataContextProperty) {
                    return;
                }
                return sourceNode.DataContext;
            };
            InheritedDataContextProvider.prototype.SetDataSourceNode = function (sourceNode) {
                var oldSourceNode = this._SourceNode;
                if(oldSourceNode === sourceNode) {
                    return;
                }
                var oldValue = undefined;
                var newValue = undefined;
                if(oldSourceNode) {
                    oldValue = oldSourceNode.DataContext;
                }
                this._SourceNode = sourceNode;
                if(sourceNode) {
                    newValue = sourceNode.DataContext;
                }
                if(!Nullstone.Equals(oldValue, newValue)) {
                    var error = new BError();
                    this._Store._ProviderValueChanged(Providers._PropertyPrecedence.InheritedDataContext, Fayde.DependencyObject.DataContextProperty, oldValue, newValue, false, error);
                }
            };
            InheritedDataContextProvider.prototype.EmitChanged = function () {
                var sourceNode = this._SourceNode;
                if(!sourceNode) {
                    return;
                }
                var error = new BError();
                this._Store._ProviderValueChanged(Providers._PropertyPrecedence.InheritedDataContext, Fayde.DependencyObject.DataContextProperty, undefined, sourceNode.DataContext, true, error);
            };
            return InheritedDataContextProvider;
        })();
        Providers.InheritedDataContextProvider = InheritedDataContextProvider;        
        Nullstone.RegisterType(InheritedDataContextProvider, "InheritedDataContextProvider");
    })(Fayde.Providers || (Fayde.Providers = {}));
    var Providers = Fayde.Providers;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=InheritedDataContextProvider.js.map
