var Fayde;
(function (Fayde) {
    /// <reference path="IProviderStore.ts" />
    /// CODE
    /// <reference path="../FrameworkElement.ts" />
    (function (Providers) {
        var InheritedDataContextProvider = (function () {
            function InheritedDataContextProvider(store) {
                this._Store = store;
            }
            InheritedDataContextProvider.prototype.GetPropertyValue = function (store, propd) {
                var source = this._Source;
                if(!source) {
                    return;
                }
                if(propd._ID !== Fayde.FrameworkElement.DataContextProperty._ID) {
                    return;
                }
                return source._Store.GetValue(Fayde.FrameworkElement.DataContextProperty);
            };
            InheritedDataContextProvider.prototype.SetDataSource = function (source) {
                var oldSource = this._Source;
                if(oldSource === source) {
                    return;
                }
                var oldValue = oldSource ? oldSource._Store.GetValue(Fayde.FrameworkElement.DataContextProperty) : undefined;
                var newValue = source ? source._Store.GetValue(Fayde.FrameworkElement.DataContextProperty) : undefined;
                this._DetachListener(oldSource);
                this._Source = source;
                this._AttachListener(source);
                if(!Nullstone.Equals(oldValue, newValue)) {
                    var error = new BError();
                    this._Store._ProviderValueChanged(Providers._PropertyPrecedence.InheritedDataContext, Fayde.FrameworkElement.DataContextProperty, oldValue, newValue, false, false, false, error);
                }
            };
            InheritedDataContextProvider.prototype._AttachListener = function (source) {
                if(!source) {
                    return;
                }
                var matchFunc = function (sender, args) {
                    return this === args.Property;//Closure - FrameworkElement.DataContextProperty
                    
                };
                (source).PropertyChanged.SubscribeSpecific(this._SourceDataContextChanged, this, matchFunc, Fayde.FrameworkElement.DataContextProperty);
                //TODO: Add Handler - Destroyed Event
                            };
            InheritedDataContextProvider.prototype._DetachListener = function (source) {
                if(!source) {
                    return;
                }
                (source).PropertyChanged.Unsubscribe(this._SourceDataContextChanged, this, Fayde.FrameworkElement.DataContextProperty);
                //TODO: Remove Handler - Destroyed Event
                            };
            InheritedDataContextProvider.prototype._SourceDataContextChanged = function (sender, args) {
                var error = new BError();
                this._Store._ProviderValueChanged(Providers._PropertyPrecedence.InheritedDataContext, Fayde.FrameworkElement.DataContextProperty, args.OldValue, args.NewValue, true, false, false, error);
            };
            InheritedDataContextProvider.prototype.EmitChanged = function () {
                if(this._Source) {
                    var error = new BError();
                    this._Store._ProviderValueChanged(Providers._PropertyPrecedence.InheritedDataContext, Fayde.FrameworkElement.DataContextProperty, undefined, this._Source._Store.GetValue(Fayde.FrameworkElement.DataContextProperty), true, false, false, error);
                }
            };
            InheritedDataContextProvider.prototype.RecomputePropertyValueOnClear = function (propd, error) {
            };
            InheritedDataContextProvider.prototype.RecomputePropertyValueOnLower = function (propd, error) {
            };
            return InheritedDataContextProvider;
        })();
        Providers.InheritedDataContextProvider = InheritedDataContextProvider;        
    })(Fayde.Providers || (Fayde.Providers = {}));
    var Providers = Fayde.Providers;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=InheritedDataContextProvider.js.map
