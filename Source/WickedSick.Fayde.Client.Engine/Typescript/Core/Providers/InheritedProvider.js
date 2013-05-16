var Fayde;
(function (Fayde) {
    /// <reference path="IProviderStore.ts" />
    /// <reference path="../../Runtime/Nullstone.ts" />
    /// CODE
    /// <reference path="Enums.ts" />
    /// <reference path="../../Controls/Image.ts" />
    /// <reference path="../../Controls/MediaElement.ts" />
    (function (Providers) {
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
                ic.ForegroundSource = ic.GetLocalSource(dobj, Providers._Inheritable.Foreground);
                if(!ic.ForegroundSource && parentContext) {
                    ic.ForegroundSource = parentContext.ForegroundSource;
                }
                ic.FontFamilySource = ic.GetLocalSource(dobj, Providers._Inheritable.FontFamily);
                if(!ic.FontFamilySource && parentContext) {
                    ic.FontFamilySource = parentContext.FontFamilySource;
                }
                ic.FontStretchSource = ic.GetLocalSource(dobj, Providers._Inheritable.FontStretch);
                if(!ic.FontStretchSource && parentContext) {
                    ic.FontStretchSource = parentContext.FontStretchSource;
                }
                ic.FontStyleSource = ic.GetLocalSource(dobj, Providers._Inheritable.FontStyle);
                if(!ic.FontStretchSource && parentContext) {
                    ic.FontStretchSource = parentContext.FontStretchSource;
                }
                ic.FontWeightSource = ic.GetLocalSource(dobj, Providers._Inheritable.FontWeight);
                if(!ic.FontWeightSource && parentContext) {
                    ic.FontWeightSource = parentContext.FontWeightSource;
                }
                ic.FontSizeSource = ic.GetLocalSource(dobj, Providers._Inheritable.FontSize);
                if(!ic.FontSizeSource && parentContext) {
                    ic.FontSizeSource = parentContext.FontSizeSource;
                }
                ic.LanguageSource = ic.GetLocalSource(dobj, Providers._Inheritable.Language);
                if(!ic.LanguageSource && parentContext) {
                    ic.LanguageSource = parentContext.LanguageSource;
                }
                ic.FlowDirectionSource = ic.GetLocalSource(dobj, Providers._Inheritable.FlowDirection);
                if(!ic.FlowDirectionSource && parentContext) {
                    ic.FlowDirectionSource = parentContext.FlowDirectionSource;
                }
                ic.UseLayoutRoundingSource = ic.GetLocalSource(dobj, Providers._Inheritable.UseLayoutRounding);
                if(!ic.UseLayoutRoundingSource && parentContext) {
                    ic.UseLayoutRoundingSource = parentContext.UseLayoutRoundingSource;
                }
                ic.TextDecorationsSource = ic.GetLocalSource(dobj, Providers._Inheritable.TextDecorations);
                if(!ic.TextDecorationsSource && parentContext) {
                    ic.TextDecorationsSource = parentContext.TextDecorationsSource;
                }
                return ic;
            };
            _InheritedContext.prototype.Compare = function (withContext, props) {
                var rv = Providers._Inheritable.None;
                if(props & Providers._Inheritable.Foreground && withContext.ForegroundSource === this.ForegroundSource) {
                    rv |= Providers._Inheritable.Foreground;
                }
                if(props & Providers._Inheritable.FontFamily && withContext.FontFamilySource === this.FontFamilySource) {
                    rv |= Providers._Inheritable.FontFamily;
                }
                if(props & Providers._Inheritable.FontStretch && withContext.FontStretchSource === this.FontStretchSource) {
                    rv |= Providers._Inheritable.FontStretch;
                }
                if(props & Providers._Inheritable.FontStyle && withContext.FontStyleSource === this.FontStyleSource) {
                    rv |= Providers._Inheritable.FontStyle;
                }
                if(props & Providers._Inheritable.FontWeight && withContext.FontWeightSource === this.FontWeightSource) {
                    rv |= Providers._Inheritable.FontWeight;
                }
                if(props & Providers._Inheritable.FontSize && withContext.FontSizeSource === this.FontSizeSource) {
                    rv |= Providers._Inheritable.FontSize;
                }
                if(props & Providers._Inheritable.Language && withContext.LanguageSource === this.LanguageSource) {
                    rv |= Providers._Inheritable.Language;
                }
                if(props & Providers._Inheritable.FlowDirection && withContext.FlowDirectionSource === this.FlowDirectionSource) {
                    rv |= Providers._Inheritable.FlowDirection;
                }
                if(props & Providers._Inheritable.UseLayoutRounding && withContext.UseLayoutRoundingSource === this.UseLayoutRoundingSource) {
                    rv |= Providers._Inheritable.UseLayoutRounding;
                }
                if(props & Providers._Inheritable.TextDecorations && withContext.TextDecorationsSource === this.TextDecorationsSource) {
                    rv |= Providers._Inheritable.TextDecorations;
                }
                return rv;
            };
            _InheritedContext.prototype.GetLocalSource = function (dobj, prop) {
                var propd = getProperty(prop, dobj);
                if(!propd) {
                    return;
                }
                if((dobj._Store._ProviderBitmasks[propd._ID] & ((1 << Providers._PropertyPrecedence.Inherited) - 1)) !== 0) {
                    return dobj;
                }
            };
            return _InheritedContext;
        })();
        Providers._InheritedContext = _InheritedContext;        
        function getInheritable(dobj, propd) {
            var inh = propd.Inheritable || 0;
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
        /// "this" needs to be scoped to a InheritedProviderStore
        function propagateInheritedValue(inheritable, source, newValue) {
            var provider = this._InheritedProvider;
            if(!provider) {
                return true;
            }
            provider._SetPropertySource(inheritable, source);
            var propd = getProperty(inheritable, this._Object);
            if(!propd) {
                return false;
            }
            var error = new BError();
            this._ProviderValueChanged(Providers._PropertyPrecedence.Inherited, propd, undefined, newValue, true, error);
        }
        /// "this" needs to be scoped to a InheritedProviderStore
        function getInheritedValueSource(inheritable) {
            var provider = this._InheritedProvider;
            if(provider) {
                return provider._GetPropertySource(inheritable);
            }
        }
        var InheritedProvider = (function () {
            function InheritedProvider() {
                this._ht = [];
            }
            InheritedProvider.prototype.GetPropertyValue = function (store, propd) {
                var inheritable = getInheritable(store._Object, propd);
                if(!inheritable) {
                    return undefined;
                }
                var ancestor = this._GetPropertySource(inheritable);
                if(!ancestor) {
                    return undefined;
                }
                var ancestorPropd = getProperty(inheritable, ancestor);
                if(!ancestorPropd) {
                    return undefined;
                }
                return ancestor.GetValue(ancestorPropd);
            };
            InheritedProvider.prototype.WalkSubtree = function (rootParent, elNode, context, props, adding) {
                var enumerator = elNode.GetInheritedEnumerator();
                if(!enumerator) {
                    return;
                }
                while(enumerator.MoveNext()) {
                    this.WalkTree(rootParent, enumerator.Current, context, props, adding);
                }
            };
            InheritedProvider.prototype.WalkTree = function (rootParent, elNode, context, props, adding) {
                if(props === Providers._Inheritable.None) {
                    return;
                }
                var element = elNode.XObject;
                if(adding) {
                    this.MaybePropagateInheritedValue(context.ForegroundSource, Providers._Inheritable.Foreground, props, element);
                    this.MaybePropagateInheritedValue(context.FontFamilySource, Providers._Inheritable.FontFamily, props, element);
                    this.MaybePropagateInheritedValue(context.FontStretchSource, Providers._Inheritable.FontStretch, props, element);
                    this.MaybePropagateInheritedValue(context.FontStyleSource, Providers._Inheritable.FontStyle, props, element);
                    this.MaybePropagateInheritedValue(context.FontWeightSource, Providers._Inheritable.FontWeight, props, element);
                    this.MaybePropagateInheritedValue(context.FontSizeSource, Providers._Inheritable.FontSize, props, element);
                    this.MaybePropagateInheritedValue(context.LanguageSource, Providers._Inheritable.Language, props, element);
                    this.MaybePropagateInheritedValue(context.FlowDirectionSource, Providers._Inheritable.FlowDirection, props, element);
                    this.MaybePropagateInheritedValue(context.UseLayoutRoundingSource, Providers._Inheritable.UseLayoutRounding, props, element);
                    this.MaybePropagateInheritedValue(context.TextDecorationsSource, Providers._Inheritable.TextDecorations, props, element);
                    var eleContext = _InheritedContext.FromObject(element, context);
                    props = eleContext.Compare(context, props);
                    if(props === Providers._Inheritable.None) {
                        return;
                    }
                    this.WalkSubtree(rootParent, elNode, eleContext, props, adding);
                } else {
                    var eleContext2 = _InheritedContext.FromObject(element, context);
                    this.MaybeRemoveInheritedValue(context.ForegroundSource, Providers._Inheritable.Foreground, props, element);
                    this.MaybeRemoveInheritedValue(context.FontFamilySource, Providers._Inheritable.FontFamily, props, element);
                    this.MaybeRemoveInheritedValue(context.FontStretchSource, Providers._Inheritable.FontStretch, props, element);
                    this.MaybeRemoveInheritedValue(context.FontStyleSource, Providers._Inheritable.FontStyle, props, element);
                    this.MaybeRemoveInheritedValue(context.FontWeightSource, Providers._Inheritable.FontWeight, props, element);
                    this.MaybeRemoveInheritedValue(context.FontSizeSource, Providers._Inheritable.FontSize, props, element);
                    this.MaybeRemoveInheritedValue(context.LanguageSource, Providers._Inheritable.Language, props, element);
                    this.MaybeRemoveInheritedValue(context.FlowDirectionSource, Providers._Inheritable.FlowDirection, props, element);
                    this.MaybeRemoveInheritedValue(context.UseLayoutRoundingSource, Providers._Inheritable.UseLayoutRounding, props, element);
                    this.MaybeRemoveInheritedValue(context.TextDecorationsSource, Providers._Inheritable.TextDecorations, props, element);
                    props = eleContext2.Compare(context, props);
                    if(props === Providers._Inheritable.None) {
                        return;
                    }
                    this.WalkSubtree(rootParent, elNode, context, props, adding);
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
                if(value !== undefined) {
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
            InheritedProvider.prototype.PropagateInheritedPropertiesOnAddingToTree = function (store, subtreeNode) {
                var inhEnum = Providers._Inheritable;
                var baseContext = _InheritedContext.FromSources(this._GetPropertySource(inhEnum.Foreground), this._GetPropertySource(inhEnum.FontFamily), this._GetPropertySource(inhEnum.FontStretch), this._GetPropertySource(inhEnum.FontStyle), this._GetPropertySource(inhEnum.FontWeight), this._GetPropertySource(inhEnum.FontSize), this._GetPropertySource(inhEnum.Language), this._GetPropertySource(inhEnum.FlowDirection), this._GetPropertySource(inhEnum.UseLayoutRounding), this._GetPropertySource(inhEnum.TextDecorations));
                var objContext = _InheritedContext.FromObject(store._Object, baseContext);
                this.WalkTree(store._Object, subtreeNode, objContext, inhEnum.All, true);
            };
            InheritedProvider.prototype.PropagateInheritedProperty = function (store, propd, source) {
                var inheritable = getInheritable(source, propd);
                if(inheritable === 0) {
                    return;
                }
                var objContext = _InheritedContext.FromObject(store._Object, null);
                this.WalkSubtree(source, source.XamlNode, objContext, inheritable, true);
            };
            InheritedProvider.prototype.ClearInheritedPropertiesOnRemovingFromTree = function (store, subtreeNode) {
                var baseContext = _InheritedContext.FromSources(this._GetPropertySource(Providers._Inheritable.Foreground), this._GetPropertySource(Providers._Inheritable.FontFamily), this._GetPropertySource(Providers._Inheritable.FontStretch), this._GetPropertySource(Providers._Inheritable.FontStyle), this._GetPropertySource(Providers._Inheritable.FontWeight), this._GetPropertySource(Providers._Inheritable.FontSize), this._GetPropertySource(Providers._Inheritable.Language), this._GetPropertySource(Providers._Inheritable.FlowDirection), this._GetPropertySource(Providers._Inheritable.UseLayoutRounding), this._GetPropertySource(Providers._Inheritable.TextDecorations));
                var objContext = _InheritedContext.FromObject(store._Object, baseContext);
                this.WalkTree(store._Object, subtreeNode, objContext, Providers._Inheritable.All, false);
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
        })();
        Providers.InheritedProvider = InheritedProvider;        
        Nullstone.RegisterType(InheritedProvider, "InheritedProvider");
    })(Fayde.Providers || (Fayde.Providers = {}));
    var Providers = Fayde.Providers;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=InheritedProvider.js.map
