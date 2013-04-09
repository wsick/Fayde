var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    (function (Provider) {
        /// CODE
        /// <reference path="ProviderStore.ts" />
        /// <reference path="../Controls/Image.ts" />
        /// <reference path="../Controls/MediaElement.ts" />
        (function (Inherited) {
            var _InheritedContext = (function () {
                function _InheritedContext() { }
                _InheritedContext.FromSources = function FromSources(foregroundSource, fontFamilySource, fontStretchSource, fontStyleSource, fontWeightSource, fontSizeSource, languageSource, flowDirectionSource, useLayoutRoundingSource, textDecorationsSource) {
                    var ic = new _InheritedContext();
                    ic.ForegroundSource = foregroundSource;
                    ic.FontFamilySource = fontFamilySource;
                    ic.FontStretchSource = fontStretchSource;
                    ic.FontStyleSource = fontStyleSource;
                    ic.FontWeightSource = fontWeightSource;
                    ic.FontSizeSource = fontSizeSource;
                    ic.LanguageSource = languageSource;
                    ic.FlowDirectionSource = flowDirectionSource;
                    ic.UseLayoutRoundingSource = useLayoutRoundingSource;
                    ic.TextDecorationsSource = textDecorationsSource;
                    return ic;
                };
                _InheritedContext.FromObject = function FromObject(dobj, parentContext) {
                    var ic = new _InheritedContext();
                    ic.ForegroundSource = ic.GetLocalSource(dobj, _Inheritable.Foreground);
                    if(!ic.ForegroundSource && parentContext) {
                        ic.ForegroundSource = parentContext.ForegroundSource;
                    }
                    ic.FontFamilySource = ic.GetLocalSource(dobj, _Inheritable.FontFamily);
                    if(!ic.FontFamilySource && parentContext) {
                        ic.FontFamilySource = parentContext.FontFamilySource;
                    }
                    ic.FontStretchSource = ic.GetLocalSource(dobj, _Inheritable.FontStretch);
                    if(!ic.FontStretchSource && parentContext) {
                        ic.FontStretchSource = parentContext.FontStretchSource;
                    }
                    ic.FontStyleSource = ic.GetLocalSource(dobj, _Inheritable.FontStyle);
                    if(!ic.FontStretchSource && parentContext) {
                        ic.FontStretchSource = parentContext.FontStretchSource;
                    }
                    ic.FontWeightSource = ic.GetLocalSource(dobj, _Inheritable.FontWeight);
                    if(!ic.FontWeightSource && parentContext) {
                        ic.FontWeightSource = parentContext.FontWeightSource;
                    }
                    ic.FontSizeSource = ic.GetLocalSource(dobj, _Inheritable.FontSize);
                    if(!ic.FontSizeSource && parentContext) {
                        ic.FontSizeSource = parentContext.FontSizeSource;
                    }
                    ic.LanguageSource = ic.GetLocalSource(dobj, _Inheritable.Language);
                    if(!ic.LanguageSource && parentContext) {
                        ic.LanguageSource = parentContext.LanguageSource;
                    }
                    ic.FlowDirectionSource = ic.GetLocalSource(dobj, _Inheritable.FlowDirection);
                    if(!ic.FlowDirectionSource && parentContext) {
                        ic.FlowDirectionSource = parentContext.FlowDirectionSource;
                    }
                    ic.UseLayoutRoundingSource = ic.GetLocalSource(dobj, _Inheritable.UseLayoutRounding);
                    if(!ic.UseLayoutRoundingSource && parentContext) {
                        ic.UseLayoutRoundingSource = parentContext.UseLayoutRoundingSource;
                    }
                    ic.TextDecorationsSource = ic.GetLocalSource(dobj, _Inheritable.TextDecorations);
                    if(!ic.TextDecorationsSource && parentContext) {
                        ic.TextDecorationsSource = parentContext.TextDecorationsSource;
                    }
                    return ic;
                };
                _InheritedContext.prototype.Compare = function (withContext, props) {
                    var rv = _Inheritable.None;
                    if(props & _Inheritable.Foreground && withContext.ForegroundSource === this.ForegroundSource) {
                        rv |= _Inheritable.Foreground;
                    }
                    if(props & _Inheritable.FontFamily && withContext.FontFamilySource === this.FontFamilySource) {
                        rv |= _Inheritable.FontFamily;
                    }
                    if(props & _Inheritable.FontStretch && withContext.FontStretchSource === this.FontStretchSource) {
                        rv |= _Inheritable.FontStretch;
                    }
                    if(props & _Inheritable.FontStyle && withContext.FontStyleSource === this.FontStyleSource) {
                        rv |= _Inheritable.FontStyle;
                    }
                    if(props & _Inheritable.FontWeight && withContext.FontWeightSource === this.FontWeightSource) {
                        rv |= _Inheritable.FontWeight;
                    }
                    if(props & _Inheritable.FontSize && withContext.FontSizeSource === this.FontSizeSource) {
                        rv |= _Inheritable.FontSize;
                    }
                    if(props & _Inheritable.Language && withContext.LanguageSource === this.LanguageSource) {
                        rv |= _Inheritable.Language;
                    }
                    if(props & _Inheritable.FlowDirection && withContext.FlowDirectionSource === this.FlowDirectionSource) {
                        rv |= _Inheritable.FlowDirection;
                    }
                    if(props & _Inheritable.UseLayoutRounding && withContext.UseLayoutRoundingSource === this.UseLayoutRoundingSource) {
                        rv |= _Inheritable.UseLayoutRounding;
                    }
                    if(props & _Inheritable.TextDecorations && withContext.TextDecorationsSource === this.TextDecorationsSource) {
                        rv |= _Inheritable.TextDecorations;
                    }
                    return rv;
                };
                _InheritedContext.prototype.GetLocalSource = function (dobj, prop) {
                    var propd = getProperty(prop, dobj);
                    if(!propd) {
                        return;
                    }
                    if((dobj._Store._ProviderBitmasks[propd._ID] & ((1 << Provider._PropertyPrecedence.Inherited) - 1)) !== 0) {
                        return dobj;
                    }
                };
                return _InheritedContext;
            })();
            Inherited._InheritedContext = _InheritedContext;            
            function getInheritable(dobj, propd) {
                var inh = propd._Inheritable || 0;
                if(inh && propd.Name === "FlowDirection" && (dobj instanceof Fayde.Controls.Image || dobj instanceof Fayde.Controls.MediaElement)) {
                    inh = 0;
                }
                return inh;
            }
            function getProperty(inheritable, ancestor) {
                var list = DependencyProperty._Inherited[inheritable];
                if(!list) {
                    return;
                }
                var len = list.length;
                if(len > 0 && list[0].Name === "FlowDirection") {
                    if(ancestor instanceof Fayde.Controls.Image || ancestor instanceof Fayde.Controls.MediaElement) {
                        return;
                    }
                }
                for(var i = 0; i < len; i++) {
                    var propd = list[i];
                    if(ancestor instanceof propd.OwnerType) {
                        return propd;
                    }
                }
            }
            /// "this" needs to be scoped to a ProviderStore
            function propagateInheritedValue(inheritable, source, newValue) {
                var provider = this._InheritedProvider;
                if(!provider) {
                    return true;
                }
                provider._SetPropertySource(inheritable, source);
                var propd = getProperty(inheritable, this);
                if(!propd) {
                    return false;
                }
                var error = new BError();
                this._ProviderValueChanged(Provider._PropertyPrecedence.Inherited, propd, undefined, newValue, true, false, false, error);
            }
            /// "this" needs to be scoped to a ProviderStore
            function getInheritedValueSource(inheritable) {
                var provider = this._InheritedProvider;
                if(provider) {
                    return provider._GetPropertySource(inheritable);
                }
            }
            (function (_Inheritable) {
                _Inheritable._map = [];
                _Inheritable.Foreground = 1 << 0;
                _Inheritable.FontFamily = 1 << 1;
                _Inheritable.FontStretch = 1 << 2;
                _Inheritable.FontStyle = 1 << 3;
                _Inheritable.FontWeight = 1 << 4;
                _Inheritable.FontSize = 1 << 5;
                _Inheritable.Language = 1 << 6;
                _Inheritable.FlowDirection = 1 << 7;
                _Inheritable.UseLayoutRounding = 1 << 8;
                _Inheritable.TextDecorations = 1 << 9;
                _Inheritable.All = 2047;
                _Inheritable.None = 0;
            })(Inherited._Inheritable || (Inherited._Inheritable = {}));
            var _Inheritable = Inherited._Inheritable;
            var InheritedProvider = (function (_super) {
                __extends(InheritedProvider, _super);
                function InheritedProvider() {
                    _super.apply(this, arguments);

                    this._ht = [];
                }
                InheritedProvider.prototype.GetPropertyValue = function (store, propd) {
                    if(!getInheritable(store._Object, propd)) {
                        return undefined;
                    }
                    var inheritable = getInheritable(store._Object, propd);
                    var ancestor = this._GetPropertySource(inheritable);
                    if(!ancestor) {
                        return undefined;
                    }
                    var ancestorPropd = getProperty(inheritable, ancestor);
                    if(!ancestorPropd) {
                        return undefined;
                    }
                    var v = ancestor.GetValue(ancestorPropd);
                    if(v) {
                        return v;
                    }
                    return undefined;
                };
                InheritedProvider.prototype.WalkSubtree = function (rootParent, element, context, props, adding) {
                    var enumerator = element.XamlNode.GetInheritedEnumerator();
                    if(!enumerator) {
                        return;
                    }
                    while(enumerator.MoveNext()) {
                        this.WalkTree(rootParent, enumerator.Current, context, props, adding);
                    }
                };
                InheritedProvider.prototype.WalkTree = function (rootParent, element, context, props, adding) {
                    if(props === _Inheritable.None) {
                        return;
                    }
                    if(adding) {
                        this.MaybePropagateInheritedValue(context.ForegroundSource, _Inheritable.Foreground, props, element);
                        this.MaybePropagateInheritedValue(context.FontFamilySource, _Inheritable.FontFamily, props, element);
                        this.MaybePropagateInheritedValue(context.FontStretchSource, _Inheritable.FontStretch, props, element);
                        this.MaybePropagateInheritedValue(context.FontStyleSource, _Inheritable.FontStyle, props, element);
                        this.MaybePropagateInheritedValue(context.FontWeightSource, _Inheritable.FontWeight, props, element);
                        this.MaybePropagateInheritedValue(context.FontSizeSource, _Inheritable.FontSize, props, element);
                        this.MaybePropagateInheritedValue(context.LanguageSource, _Inheritable.Language, props, element);
                        this.MaybePropagateInheritedValue(context.FlowDirectionSource, _Inheritable.FlowDirection, props, element);
                        this.MaybePropagateInheritedValue(context.UseLayoutRoundingSource, _Inheritable.UseLayoutRounding, props, element);
                        this.MaybePropagateInheritedValue(context.TextDecorationsSource, _Inheritable.TextDecorations, props, element);
                        var eleContext = _InheritedContext.FromObject(element, context);
                        props = eleContext.Compare(context, props);
                        if(props === _Inheritable.None) {
                            return;
                        }
                        this.WalkSubtree(rootParent, element, eleContext, props, adding);
                    } else {
                        var eleContext2 = _InheritedContext.FromObject(element, context);
                        this.MaybeRemoveInheritedValue(context.ForegroundSource, _Inheritable.Foreground, props, element);
                        this.MaybeRemoveInheritedValue(context.FontFamilySource, _Inheritable.FontFamily, props, element);
                        this.MaybeRemoveInheritedValue(context.FontStretchSource, _Inheritable.FontStretch, props, element);
                        this.MaybeRemoveInheritedValue(context.FontStyleSource, _Inheritable.FontStyle, props, element);
                        this.MaybeRemoveInheritedValue(context.FontWeightSource, _Inheritable.FontWeight, props, element);
                        this.MaybeRemoveInheritedValue(context.FontSizeSource, _Inheritable.FontSize, props, element);
                        this.MaybeRemoveInheritedValue(context.LanguageSource, _Inheritable.Language, props, element);
                        this.MaybeRemoveInheritedValue(context.FlowDirectionSource, _Inheritable.FlowDirection, props, element);
                        this.MaybeRemoveInheritedValue(context.UseLayoutRoundingSource, _Inheritable.UseLayoutRounding, props, element);
                        this.MaybeRemoveInheritedValue(context.TextDecorationsSource, _Inheritable.TextDecorations, props, element);
                        props = eleContext2.Compare(context, props);
                        if(props === _Inheritable.None) {
                            return;
                        }
                        this.WalkSubtree(rootParent, element, context, props, adding);
                    }
                };
                InheritedProvider.prototype.MaybePropagateInheritedValue = function (source, prop, props, element) {
                    if(!source) {
                        return;
                    }
                    if((props & prop) == 0) {
                        return;
                    }
                    var sourceProperty = getProperty(prop, source);
                    var value = source.GetValue(sourceProperty);
                    if(value) {
                        propagateInheritedValue.call(element._Store, prop, source, value);
                    }
                };
                InheritedProvider.prototype.MaybeRemoveInheritedValue = function (source, prop, props, element) {
                    if(!source) {
                        return;
                    }
                    if((props & prop) == 0) {
                        return;
                    }
                    if(source === getInheritedValueSource.call(element, prop)) {
                        propagateInheritedValue.call(element._Store, prop, undefined, undefined);
                    }
                };
                InheritedProvider.prototype.PropagateInheritedPropertiesOnAddingToTree = function (store, subtree) {
                    var inhEnum = _Inheritable;
                    var baseContext = _InheritedContext.FromSources(this._GetPropertySource(inhEnum.Foreground), this._GetPropertySource(inhEnum.FontFamily), this._GetPropertySource(inhEnum.FontStretch), this._GetPropertySource(inhEnum.FontStyle), this._GetPropertySource(inhEnum.FontWeight), this._GetPropertySource(inhEnum.FontSize), this._GetPropertySource(inhEnum.Language), this._GetPropertySource(inhEnum.FlowDirection), this._GetPropertySource(inhEnum.UseLayoutRounding), this._GetPropertySource(inhEnum.TextDecorations));
                    var objContext = _InheritedContext.FromObject(store._Object, baseContext);
                    this.WalkTree(store._Object, subtree, objContext, inhEnum.All, true);
                };
                InheritedProvider.prototype.PropagateInheritedProperty = function (store, propd, source, subtree) {
                    var inheritable = getInheritable(source, propd);
                    if(inheritable === 0) {
                        return;
                    }
                    var objContext = _InheritedContext.FromObject(store._Object, null);
                    this.WalkSubtree(source, subtree, objContext, inheritable, true);
                };
                InheritedProvider.prototype.ClearInheritedPropertiesOnRemovingFromTree = function (store, subtree) {
                    var baseContext = _InheritedContext.FromSources(this._GetPropertySource(_Inheritable.Foreground), this._GetPropertySource(_Inheritable.FontFamily), this._GetPropertySource(_Inheritable.FontStretch), this._GetPropertySource(_Inheritable.FontStyle), this._GetPropertySource(_Inheritable.FontWeight), this._GetPropertySource(_Inheritable.FontSize), this._GetPropertySource(_Inheritable.Language), this._GetPropertySource(_Inheritable.FlowDirection), this._GetPropertySource(_Inheritable.UseLayoutRounding), this._GetPropertySource(_Inheritable.TextDecorations));
                    var objContext = _InheritedContext.FromObject(store._Object, baseContext);
                    this.WalkTree(store._Object, subtree, objContext, _Inheritable.All, false);
                };
                InheritedProvider.prototype._GetPropertySource = function (inheritable) {
                    return this._ht[inheritable];
                };
                InheritedProvider.prototype._SetPropertySource = function (inheritable, source) {
                    if(source) {
                        this._ht[inheritable] = source;
                    } else {
                        this._ht[inheritable] = undefined;
                    }
                };
                return InheritedProvider;
            })(Provider.PropertyProvider);
            Inherited.InheritedProvider = InheritedProvider;            
        })(Provider.Inherited || (Provider.Inherited = {}));
        var Inherited = Provider.Inherited;
    })(Fayde.Provider || (Fayde.Provider = {}));
    var Provider = Fayde.Provider;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=InheritedProvider.js.map
