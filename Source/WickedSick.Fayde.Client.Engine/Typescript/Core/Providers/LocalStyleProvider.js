var Fayde;
(function (Fayde) {
    /// <reference path="IProviderStore.ts" />
    /// <reference path="../../Runtime/Nullstone.ts" />
    /// CODE
    /// <reference path="../Setter.ts" />
    /// <reference path="../Style.ts" />
    /// <reference path="../Walkers.ts" />
    (function (Providers) {
        var LocalStyleProvider = (function () {
            function LocalStyleProvider(store) {
                this._ht = [];
                this._Store = store;
            }
            LocalStyleProvider.prototype.GetPropertyValue = function (store, propd) {
                return this._ht[propd._ID];
            };
            LocalStyleProvider.prototype.RecomputePropertyValueOnClear = function (propd, error) {
                var oldValue;
                var newValue;
                var walkPropd;
                var walker = Fayde.SingleStyleWalker(this._Style);
                var setter;
                while(setter = walker.Step()) {
                    walkPropd = setter.Property;
                    if(walkPropd._ID !== propd._ID) {
                        continue;
                    }
                    newValue = setter.ConvertedValue;
                    oldValue = this._ht[propd._ID];
                    this._ht[propd._ID] = newValue;
                    this._Store._ProviderValueChanged(Providers._PropertyPrecedence.LocalStyle, propd, oldValue, newValue, true, error);
                    if(error.Message) {
                        return;
                    }
                }
            };
            LocalStyleProvider.prototype.UpdateStyle = function (style, error) {
                var store = this._Store;
                var oldValue = undefined;
                var newValue = undefined;
                var oldWalker = Fayde.SingleStyleWalker(this._Style);
                var newWalker = Fayde.SingleStyleWalker(style);
                style.Seal();
                var oldSetter = oldWalker.Step();
                var newSetter = newWalker.Step();
                var oldProp;
                var newProp;
                while(oldSetter || newSetter) {
                    if(oldSetter) {
                        oldProp = oldSetter.Property;
                    }
                    if(newSetter) {
                        newProp = newSetter.Property;
                    }
                    if(oldProp && (oldProp < newProp || !newProp)) {
                        //WTF: Less than?
                        //Property in old style, not in new style
                        oldValue = oldSetter.ConvertedValue;
                        newValue = undefined;
                        this._ht[oldProp._ID] = undefined;
                        store._ProviderValueChanged(Providers._PropertyPrecedence.LocalStyle, oldProp, oldValue, newValue, true, error);
                        oldSetter = oldWalker.Step();
                    } else if(oldProp === newProp) {
                        //Property in both styles
                        oldValue = oldSetter.ConvertedValue;
                        newValue = newSetter.ConvertedValue;
                        this._ht[oldProp._ID] = newValue;
                        store._ProviderValueChanged(Providers._PropertyPrecedence.LocalStyle, oldProp, oldValue, newValue, true, error);
                        oldSetter = oldWalker.Step();
                        newSetter = newWalker.Step();
                    } else {
                        //Property in new style, not in old style
                        oldValue = undefined;
                        newValue = newSetter.ConvertedValue;
                        this._ht[newProp._ID] = newValue;
                        store._ProviderValueChanged(Providers._PropertyPrecedence.LocalStyle, newProp, oldValue, newValue, true, error);
                        newSetter = newWalker.Step();
                    }
                }
                this._Style = style;
            };
            return LocalStyleProvider;
        })();
        Providers.LocalStyleProvider = LocalStyleProvider;        
        Nullstone.RegisterType(LocalStyleProvider, "LocalStyleProvider");
    })(Fayde.Providers || (Fayde.Providers = {}));
    var Providers = Fayde.Providers;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=LocalStyleProvider.js.map
