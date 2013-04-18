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
                this._Listener = null;
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
                    this._Store._ProviderValueChanged(Providers._PropertyPrecedence.InheritedDataContext, Fayde.FrameworkElement.DataContextProperty, oldValue, newValue, false, error);
                }
            };
            InheritedDataContextProvider.prototype._AttachListener = function (source) {
                if(!source) {
                    return;
                }
                var listener = Fayde.CreatePropertyChangedListener(this._SourceDataContextChanged, this);
                this._Listener = listener;
                source._Store._SubscribePropertyChanged(listener);
                //TODO: Add Handler - Destroyed Event
                            };
            InheritedDataContextProvider.prototype._DetachListener = function (source) {
                if(!source) {
                    return;
                }
                if(this._Listener) {
                    source._Store._UnsubscribePropertyChanged(this._Listener);
                    this._Listener = null;
                }
                //TODO: Remove Handler - Destroyed Event
                            };
            InheritedDataContextProvider.prototype._SourceDataContextChanged = function (sender, args) {
                var propd = args.Property;
                if(propd !== Fayde.FrameworkElement.DataContextProperty) {
                    return;
                }
                var error = new BError();
                this._Store._ProviderValueChanged(Providers._PropertyPrecedence.InheritedDataContext, propd, args.OldValue, args.NewValue, true, error);
            };
            InheritedDataContextProvider.prototype.EmitChanged = function () {
                if(this._Source) {
                    var error = new BError();
                    this._Store._ProviderValueChanged(Providers._PropertyPrecedence.InheritedDataContext, Fayde.FrameworkElement.DataContextProperty, undefined, this._Source._Store.GetValue(Fayde.FrameworkElement.DataContextProperty), true, error);
                }
            };
            return InheritedDataContextProvider;
        })();
        Providers.InheritedDataContextProvider = InheritedDataContextProvider;        
        Nullstone.RegisterType(InheritedDataContextProvider, "InheritedDataContextProvider");
    })(Fayde.Providers || (Fayde.Providers = {}));
    var Providers = Fayde.Providers;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=InheritedDataContextProvider.js.map
