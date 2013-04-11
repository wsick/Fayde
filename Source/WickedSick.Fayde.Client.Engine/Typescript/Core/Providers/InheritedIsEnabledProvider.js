var Fayde;
(function (Fayde) {
    /// <reference path="IProviderStore.ts" />
    /// CODE
    /// <reference path="../../Controls/Control.ts" />
    (function (Providers) {
        var InheritedIsEnabledProvider = (function () {
            function InheritedIsEnabledProvider(store) {
                this._CurrentValue = true;
                this._Store = store;
            }
            InheritedIsEnabledProvider.prototype.GetPropertyValue = function (store, propd) {
                if(propd._ID === Fayde.Controls.Control.IsEnabledProperty._ID) {
                    return this._CurrentValue;
                }
                return undefined;
            };
            InheritedIsEnabledProvider.prototype.SetDataSource = function (source) {
                if(source) {
                    var curNode = source.XamlNode;
                    while(curNode) {
                        if(curNode.XObject instanceof Fayde.Controls.Control) {
                            break;
                        } else if(curNode.XObject instanceof Fayde.FrameworkElement) {
                            curNode = curNode.ParentNode;
                        } else {
                            curNode = null;
                        }
                    }
                    source = (curNode) ? (curNode.XObject) : null;
                }
                if(this._Source !== source) {
                    this._DetachListener(this._Source);
                    this._Source = source;
                    this._AttachListener(source);
                }
                if(!source && (this._Store._Object.XamlNode.IsAttached)) {
                    this.LocalValueChanged();
                }
            };
            InheritedIsEnabledProvider.prototype._AttachListener = function (source) {
                if(!source) {
                    return;
                }
                var matchFunc = function (sender, args) {
                    return this === args.Property;//Closure - Control.IsEnabledProperty
                    
                };
                (source).PropertyChanged.SubscribeSpecific(this._IsEnabledChanged, this, matchFunc, Fayde.Controls.Control.IsEnabledProperty);
                //TODO: Add Handler - Destroyed Event
                            };
            InheritedIsEnabledProvider.prototype._DetachListener = function (source) {
                if(!source) {
                    return;
                }
                (source).PropertyChanged.Unsubscribe(this._IsEnabledChanged, this, Fayde.Controls.Control.IsEnabledProperty);
                //TODO: Remove Handler - Destroyed Event
                            };
            InheritedIsEnabledProvider.prototype._IsEnabledChanged = function (sender, args) {
                this.LocalValueChanged();
            };
            InheritedIsEnabledProvider.prototype.LocalValueChanged = function (propd) {
                if(propd && propd._ID !== Fayde.Controls.Control.IsEnabledProperty._ID) {
                    return false;
                }
                var store = this._Store;
                var localEnabled = store.GetValueSpec(Fayde.Controls.Control.IsEnabledProperty, Providers._PropertyPrecedence.LocalValue);
                var parentEnabled = false;
                var source = this._Source;
                if(source && (store._Object.XamlNode).VisualParentNode) {
                    parentEnabled = source.GetValue(Fayde.Controls.Control.IsEnabledProperty) === true;
                }
                var newValue = localEnabled === true && parentEnabled;
                if(newValue !== this._CurrentValue) {
                    var oldValue = this._CurrentValue;
                    this._CurrentValue = newValue;
                    var error = new BError();
                    store._ProviderValueChanged(Providers._PropertyPrecedence.IsEnabled, Fayde.Controls.Control.IsEnabledProperty, oldValue, newValue, true, false, false, error);
                    return true;
                }
                return false;
            };
            InheritedIsEnabledProvider.prototype.RecomputePropertyValueOnClear = function (propd, error) {
            };
            InheritedIsEnabledProvider.prototype.RecomputePropertyValueOnLower = function (propd, error) {
            };
            return InheritedIsEnabledProvider;
        })();
        Providers.InheritedIsEnabledProvider = InheritedIsEnabledProvider;        
    })(Fayde.Providers || (Fayde.Providers = {}));
    var Providers = Fayde.Providers;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=InheritedIsEnabledProvider.js.map
