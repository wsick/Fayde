var Fayde;
(function (Fayde) {
    /// <reference path="IProviderStore.ts" />
    /// CODE
    /// <reference path="../Setter.ts" />
    /// <reference path="../Style.ts" />
    /// <reference path="../Walkers.ts" />
    (function (Providers) {
        (function (_StyleIndex) {
            _StyleIndex._map = [];
            _StyleIndex.VisualTree = 0;
            _StyleIndex.ApplicationResources = 1;
            _StyleIndex.GenericXaml = 2;
            _StyleIndex.Count = 3;
        })(Providers._StyleIndex || (Providers._StyleIndex = {}));
        var _StyleIndex = Providers._StyleIndex;
        (function (_StyleMask) {
            _StyleMask._map = [];
            _StyleMask.None = 0;
            _StyleMask.VisualTree = 1 << _StyleIndex.VisualTree;
            _StyleMask.ApplicationResources = 1 << _StyleIndex.ApplicationResources;
            _StyleMask.GenericXaml = 1 << _StyleIndex.GenericXaml;
            _StyleMask.All = _StyleMask.VisualTree | _StyleMask.ApplicationResources | _StyleMask.GenericXaml;
        })(Providers._StyleMask || (Providers._StyleMask = {}));
        var _StyleMask = Providers._StyleMask;
        var ImplicitStyleProvider = (function () {
            function ImplicitStyleProvider(store) {
                this._ht = [];
                this._Styles = [
                    null, 
                    null, 
                    null
                ];
                this._StyleMask = _StyleMask.None;
                this._Store = store;
            }
            ImplicitStyleProvider.prototype.GetPropertyValue = function (store, propd) {
                return this._ht[propd._ID];
            };
            ImplicitStyleProvider.prototype.RecomputePropertyValueOnClear = function (propd, error) {
                if(!this._Styles) {
                    return;
                }
                var oldValue;
                var newValue;
                var prop;
                var walker = Fayde.MultipleStylesWalker(this._Styles);
                var setter;
                while(setter = walker.Step()) {
                    prop = setter.Property;
                    if(prop._ID !== propd._ID) {
                        continue;
                    }
                    newValue = setter.ConvertedValue;
                    oldValue = this._ht[propd._ID];
                    this._ht[propd._ID] = newValue;
                    this._Store._ProviderValueChanged(Providers._PropertyPrecedence.ImplicitStyle, propd, oldValue, newValue, true, error);
                    if(error.Message) {
                        return;
                    }
                }
            };
            ImplicitStyleProvider.prototype.SetStyles = function (styleMask, styles, error) {
                if(!styles) {
                    return;
                }
                var newStyles = [
                    null, 
                    null, 
                    null
                ];
                if(this._Styles) {
                    newStyles[_StyleIndex.GenericXaml] = this._Styles[_StyleIndex.GenericXaml];
                    newStyles[_StyleIndex.ApplicationResources] = this._Styles[_StyleIndex.ApplicationResources];
                    newStyles[_StyleIndex.VisualTree] = this._Styles[_StyleIndex.VisualTree];
                }
                if(styleMask & _StyleMask.GenericXaml) {
                    newStyles[_StyleIndex.GenericXaml] = styles[_StyleIndex.GenericXaml];
                }
                if(styleMask & _StyleMask.ApplicationResources) {
                    newStyles[_StyleIndex.ApplicationResources] = styles[_StyleIndex.ApplicationResources];
                }
                if(styleMask & _StyleMask.VisualTree) {
                    newStyles[_StyleIndex.VisualTree] = styles[_StyleIndex.VisualTree];
                }
                this._ApplyStyles(this._StyleMask | styleMask, newStyles, error);
            };
            ImplicitStyleProvider.prototype.ClearStyles = function (styleMask, error) {
                if(!this._Styles) {
                    return;
                }
                var newStyles = this._Styles.slice(0);
                //TODO: Do we need a deep copy?
                if(styleMask & _StyleMask.GenericXaml) {
                    newStyles[_StyleIndex.GenericXaml] = null;
                }
                if(styleMask & _StyleMask.ApplicationResources) {
                    newStyles[_StyleIndex.ApplicationResources] = null;
                }
                if(styleMask & _StyleMask.VisualTree) {
                    newStyles[_StyleIndex.VisualTree] = null;
                }
                this._ApplyStyles(this._StyleMask & ~styleMask, newStyles, error);
            };
            ImplicitStyleProvider.prototype._ApplyStyles = function (styleMask, styles, error) {
                var isChanged = !this._Styles || styleMask !== this._StyleMask;
                if(!isChanged) {
                    for(var i = 0; i < _StyleIndex.Count; i++) {
                        if(styles[i] !== this._Styles[i]) {
                            isChanged = true;
                            break;
                        }
                    }
                }
                if(!isChanged) {
                    return;
                }
                var oldValue;
                var newValue;
                var oldWalker = Fayde.MultipleStylesWalker(this._Styles);
                var newWalker = Fayde.MultipleStylesWalker(styles);
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
                        this._Store._ProviderValueChanged(Providers._PropertyPrecedence.ImplicitStyle, oldProp, oldValue, newValue, true, error);
                        oldSetter = oldWalker.Step();
                    } else if(oldProp === newProp) {
                        //Property in both styles
                        oldValue = oldSetter.ConvertedValue;
                        newValue = newSetter.ConvertedValue;
                        this._ht[oldProp._ID] = newValue;
                        this._Store._ProviderValueChanged(Providers._PropertyPrecedence.ImplicitStyle, oldProp, oldValue, newValue, true, error);
                        oldSetter = oldWalker.Step();
                        newSetter = newWalker.Step();
                    } else {
                        //Property in new style, not in old style
                        oldValue = undefined;
                        newValue = newSetter.ConvertedValue;
                        this._ht[newProp._ID] = newValue;
                        this._Store._ProviderValueChanged(Providers._PropertyPrecedence.ImplicitStyle, newProp, oldValue, newValue, true, error);
                        newSetter = newWalker.Step();
                    }
                }
                this._Styles = styles;
                this._StyleMask = styleMask;
            };
            return ImplicitStyleProvider;
        })();
        Providers.ImplicitStyleProvider = ImplicitStyleProvider;        
    })(Fayde.Providers || (Fayde.Providers = {}));
    var Providers = Fayde.Providers;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=ImplicitStyleProvider.js.map
