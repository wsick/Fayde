/// <reference path="../../Runtime/Nullstone.js" />
/// <reference path="PropertyValueProvider.js"/>
/// <reference path="Enums.js"/>
/// CODE
/// <reference path="InheritedContext.js"/>

(function (Fayde) {
    function getInheritable(obj, propd) {
        var inh = propd._Inheritable || 0;
        if (inh && propd.Name === "FlowDirection" && (obj instanceof Fayde.Controls.Image || obj instanceof Fayde.Controls.MediaElement))
            inh = 0;
        return inh;
    }
    function getProperty(inheritable, ancestor) {
        var list = DependencyProperty._Inherited[inheritable];
        if (!list)
            return;

        var len = list.length;
        if (len > 0 && list[0].Name === "FlowDirection") {
            if (ancestor instanceof Fayde.Controls.Image || ancestor instanceof Fayde.Controls.MediaElement)
                return;
        }
        for (var i = 0; i < len; i++) {
            var propd = list[i];
            if (ancestor instanceof propd.OwnerType)
                return propd;
        }
    }

    /// "this" needs to be scoped to a DependencyObject
    function propagateInheritedValue(inheritable, source, newValue) {
        var propPrecInherited = _PropertyPrecedence.Inherited;
        var provider = this._Providers[propPrecInherited];
        if (!provider)
            return true;

        provider._SetPropertySource(inheritable, source);
        var propd = getProperty(inheritable, this);
        if (!propd)
            return false;

        var error = new BError();
        this._ProviderValueChanged(propPrecInherited, propd, undefined, newValue, true, false, false, error);
    }
    /// "this" needs to be scoped to a DependencyObject
    function getInheritedValueSource (inheritable) {
        var provider = this._Providers[_PropertyPrecedence.Inherited];
        if (!provider)
            return undefined;
        return provider._GetPropertySource(inheritable);
    };

    //#region _InheritedContext

    var _InheritedContext = Nullstone.Create("_InheritedContext");

    _InheritedContext.FromSources = function (foregroundSource, fontFamilySource, fontStretchSource, fontStyleSource,
        fontWeightSource, fontSizeSource, languageSource, flowDirectionSource, useLayoutRoundingSource, textDecorationsSource) {
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
    _InheritedContext.FromObject = function (obj, parentContext) {
        var ic = new _InheritedContext();

        var inhEnum = _Inheritable;
        ic.ForegroundSource = ic.GetLocalSource(obj, inhEnum.Foreground);
        if (!ic.ForegroundSource && parentContext) ic.ForegroundSource = parentContext.ForegroundSource;

        ic.FontFamilySource = ic.GetLocalSource(obj, inhEnum.FontFamily);
        if (!ic.FontFamilySource && parentContext) ic.FontFamilySource = parentContext.FontFamilySource;

        ic.FontStretchSource = ic.GetLocalSource(obj, inhEnum.FontStretch);
        if (!ic.FontStretchSource && parentContext) ic.FontStretchSource = parentContext.FontStretchSource;

        ic.FontStyleSource = ic.GetLocalSource(obj, inhEnum.FontStyle);
        if (!ic.FontStretchSource && parentContext) ic.FontStretchSource = parentContext.FontStretchSource;

        ic.FontWeightSource = ic.GetLocalSource(obj, inhEnum.FontWeight);
        if (!ic.FontWeightSource && parentContext) ic.FontWeightSource = parentContext.FontWeightSource;

        ic.FontSizeSource = ic.GetLocalSource(obj, inhEnum.FontSize);
        if (!ic.FontSizeSource && parentContext) ic.FontSizeSource = parentContext.FontSizeSource;

        ic.LanguageSource = ic.GetLocalSource(obj, inhEnum.Language);
        if (!ic.LanguageSource && parentContext) ic.LanguageSource = parentContext.LanguageSource;

        ic.FlowDirectionSource = ic.GetLocalSource(obj, inhEnum.FlowDirection);
        if (!ic.FlowDirectionSource && parentContext) ic.FlowDirectionSource = parentContext.FlowDirectionSource;

        ic.UseLayoutRoundingSource = ic.GetLocalSource(obj, inhEnum.UseLayoutRounding);
        if (!ic.UseLayoutRoundingSource && parentContext) ic.UseLayoutRoundingSource = parentContext.UseLayoutRoundingSource;

        ic.TextDecorationsSource = ic.GetLocalSource(obj, inhEnum.TextDecorations);
        if (!ic.TextDecorationsSource && parentContext) ic.TextDecorationsSource = parentContext.TextDecorationsSource;

        return ic;
    };

    _InheritedContext.Instance.Compare = function (withContext, props) {
        var inhEnum = _Inheritable;
        var rv = inhEnum.None;

        if (props & inhEnum.Foreground && Nullstone.RefEquals(withContext.ForegroundSource, this.ForegroundSource))
            rv |= inhEnum.Foreground;
        if (props & inhEnum.FontFamily && Nullstone.RefEquals(withContext.FontFamilySource, this.FontFamilySource))
            rv |= inhEnum.FontFamily;
        if (props & inhEnum.FontStretch && Nullstone.RefEquals(withContext.FontStretchSource, this.FontStretchSource))
            rv |= inhEnum.FontStretch;
        if (props & inhEnum.FontStyle && Nullstone.RefEquals(withContext.FontStyleSource, this.FontStyleSource))
            rv |= inhEnum.FontStyle;
        if (props & inhEnum.FontWeight && Nullstone.RefEquals(withContext.FontWeightSource, this.FontWeightSource))
            rv |= inhEnum.FontWeight;
        if (props & inhEnum.FontSize && Nullstone.RefEquals(withContext.FontSizeSource, this.FontSizeSource))
            rv |= inhEnum.FontSize;
        if (props & inhEnum.Language && Nullstone.RefEquals(withContext.LanguageSource, this.LanguageSource))
            rv |= inhEnum.Language;
        if (props & inhEnum.FlowDirection && Nullstone.RefEquals(withContext.FlowDirectionSource, this.FlowDirectionSource))
            rv |= inhEnum.FlowDirection;
        if (props & inhEnum.UseLayoutRounding && Nullstone.RefEquals(withContext.UseLayoutRoundingSource, this.UseLayoutRoundingSource))
            rv |= inhEnum.UseLayoutRounding;
        if (props & inhEnum.TextDecorations && Nullstone.RefEquals(withContext.TextDecorationsSource, this.TextDecorationsSource))
            rv |= inhEnum.TextDecorations;

        return rv;
    };
    _InheritedContext.Instance.GetLocalSource = function (obj, prop) {
        var propd = getProperty(prop, obj);
        if (!propd)
            return;
        if ((obj._ProviderBitmasks[propd._ID] & ((1 << _PropertyPrecedence.Inherited) - 1)) !== 0)
            return obj;
    };

    Nullstone.FinishCreate(_InheritedContext);

    //#endregion

    //#region _InheritedPropertyValueProvider

    var _InheritedPropertyValueProvider = Nullstone.Create("_InheritedPropertyValueProvider", Fayde._PropertyValueProvider, 1);

    _InheritedPropertyValueProvider.Instance.Init = function (obj) {
        this.Init$_PropertyValueProvider(obj, _PropertyPrecedence.Inherited);
        this._ht = [];
    };

    _InheritedPropertyValueProvider.Instance.GetPropertyValue = function (propd) {
        if (!getInheritable(this._Object, propd))
            return undefined;

        var inheritable = getInheritable(this._Object, propd);
        var ancestor = this._GetPropertySource(inheritable);
        if (!ancestor)
            return undefined;

        var ancestorPropd = getProperty(inheritable, ancestor);
        if (!ancestorPropd)
            return undefined;
        var v = ancestor.$GetValue(ancestorPropd);
        if (v)
            return v;
        return undefined;
    };
    _InheritedPropertyValueProvider.Instance.WalkSubtree = function (rootParent, element, context, props, adding) {
        if (element instanceof Fayde.Documents.TextElement || element instanceof Fayde.Controls.TextBlock) {
            var childProp;
            if (element instanceof Fayde.Controls.TextBlock)
                childProp = Fayde.Controls.TextBlock.InlinesProperty;
            else if (element instanceof Fayde.Documents.Paragraph)
                childProp = Fayde.Documents.Paragraph.InlinesProperty;
            else if (element instanceof Fayde.Documents.Span)
                childProp = Fayde.Documents.Span.InlinesProperty;
            else if (element instanceof Fayde.Documents.Section)
                childProp = Fayde.Documents.Section.BlocksProperty;

            if (childProp) {
                var col = element._GetValueNoAutoCreate(childProp);
                if (col) {
                    var count = col.GetCount();
                    for (var i = 0; i < count; i++) {
                        this.WalkTree(rootParent, col.GetValueAt(i), context, props, adding);
                    }
                }
            }
        }
        if (element instanceof Fayde.Controls.Primitives.Popup) {
            var child = element.Child;
            if (child)
                this.WalkTree(rootParent, child, context, props, adding);
        }
        if (element instanceof Fayde.UIElement) {
            var walker = Fayde._VisualTreeWalker.Logical(element);
            var child2;
            while (child2 = walker.Step()) {
                this.WalkTree(rootParent, child2, context, props, adding);
            }
        }
    };
    _InheritedPropertyValueProvider.Instance.WalkTree = function (rootParent, element, context, props, adding) {
        var inhEnum = _Inheritable;
        if (props === inhEnum.None)
            return;

        if (adding) {
            this.MaybePropagateInheritedValue(context.ForegroundSource, inhEnum.Foreground, props, element);
            this.MaybePropagateInheritedValue(context.FontFamilySource, inhEnum.FontFamily, props, element);
            this.MaybePropagateInheritedValue(context.FontStretchSource, inhEnum.FontStretch, props, element);
            this.MaybePropagateInheritedValue(context.FontStyleSource, inhEnum.FontStyle, props, element);
            this.MaybePropagateInheritedValue(context.FontWeightSource, inhEnum.FontWeight, props, element);
            this.MaybePropagateInheritedValue(context.FontSizeSource, inhEnum.FontSize, props, element);
            this.MaybePropagateInheritedValue(context.LanguageSource, inhEnum.Language, props, element);
            this.MaybePropagateInheritedValue(context.FlowDirectionSource, inhEnum.FlowDirection, props, element);
            this.MaybePropagateInheritedValue(context.UseLayoutRoundingSource, inhEnum.UseLayoutRounding, props, element);
            this.MaybePropagateInheritedValue(context.TextDecorationsSource, inhEnum.TextDecorations, props, element);

            var eleContext = _InheritedContext.FromObject(element, context);

            props = eleContext.Compare(context, props);
            if (props === inhEnum.None)
                return;

            this.WalkSubtree(rootParent, element, eleContext, props, adding);
        } else {
            var eleContext2 = _InheritedContext.FromObject(element, context);

            this.MaybeRemoveInheritedValue(context.ForegroundSource, inhEnum.Foreground, props, element);
            this.MaybeRemoveInheritedValue(context.FontFamilySource, inhEnum.FontFamily, props, element);
            this.MaybeRemoveInheritedValue(context.FontStretchSource, inhEnum.FontStretch, props, element);
            this.MaybeRemoveInheritedValue(context.FontStyleSource, inhEnum.FontStyle, props, element);
            this.MaybeRemoveInheritedValue(context.FontWeightSource, inhEnum.FontWeight, props, element);
            this.MaybeRemoveInheritedValue(context.FontSizeSource, inhEnum.FontSize, props, element);
            this.MaybeRemoveInheritedValue(context.LanguageSource, inhEnum.Language, props, element);
            this.MaybeRemoveInheritedValue(context.FlowDirectionSource, inhEnum.FlowDirection, props, element);
            this.MaybeRemoveInheritedValue(context.UseLayoutRoundingSource, inhEnum.UseLayoutRounding, props, element);
            this.MaybeRemoveInheritedValue(context.TextDecorationsSource, inhEnum.TextDecorations, props, element);

            props = eleContext2.Compare(context, props);
            if (props === inhEnum.None)
                return;

            this.WalkSubtree(rootParent, element, context, props, adding);
        }
    };
    _InheritedPropertyValueProvider.Instance.MaybePropagateInheritedValue = function (source, prop, props, element) {
        if (!source) return;
        if ((props & prop) == 0) return;

        var sourceProperty = getProperty(prop, source);
        var value = source.$GetValue(sourceProperty);
        if (value)
            propagateInheritedValue.call(element, prop, source, value);
    };
    _InheritedPropertyValueProvider.Instance.MaybeRemoveInheritedValue = function (source, prop, props, element) {
        /// <param name="source" type="DependencyObject"></param>
        /// <param name="element" type="DependencyObject"></param>
        if (!source) return;
        if ((props & prop) == 0) return;

        if (Nullstone.RefEquals(source, getInheritedValueSource.call(element, prop)))
            propagateInheritedValue.call(element, prop, undefined, undefined);
    };
    _InheritedPropertyValueProvider.Instance.PropagateInheritedPropertiesOnAddingToTree = function (subtree) {
        var inhEnum = _Inheritable;
        var baseContext = _InheritedContext.FromSources(
                this._GetPropertySource(inhEnum.Foreground),
                this._GetPropertySource(inhEnum.FontFamily),
                this._GetPropertySource(inhEnum.FontStretch),
                this._GetPropertySource(inhEnum.FontStyle),
                this._GetPropertySource(inhEnum.FontWeight),
                this._GetPropertySource(inhEnum.FontSize),
                this._GetPropertySource(inhEnum.Language),
                this._GetPropertySource(inhEnum.FlowDirection),
                this._GetPropertySource(inhEnum.UseLayoutRounding),
                this._GetPropertySource(inhEnum.TextDecorations));
        var objContext = _InheritedContext.FromObject(this._Object, baseContext);
        this.WalkTree(this._Object, subtree, objContext, inhEnum.All, true);
    };
    _InheritedPropertyValueProvider.Instance.PropagateInheritedProperty = function (propd, source, subtree) {
        var inheritable = getInheritable(source, propd);
        if (inheritable === 0)
            return;
        var objContext = _InheritedContext.FromObject(this._Object, null);
        this.WalkSubtree(source, subtree, objContext, inheritable, true);
    };
    _InheritedPropertyValueProvider.Instance.ClearInheritedPropertiesOnRemovingFromTree = function (subtree) {
        var inhEnum = _Inheritable;
        var baseContext = _InheritedContext.FromSources(
                this._GetPropertySource(inhEnum.Foreground),
                this._GetPropertySource(inhEnum.FontFamily),
                this._GetPropertySource(inhEnum.FontStretch),
                this._GetPropertySource(inhEnum.FontStyle),
                this._GetPropertySource(inhEnum.FontWeight),
                this._GetPropertySource(inhEnum.FontSize),
                this._GetPropertySource(inhEnum.Language),
                this._GetPropertySource(inhEnum.FlowDirection),
                this._GetPropertySource(inhEnum.UseLayoutRounding),
                this._GetPropertySource(inhEnum.TextDecorations));
        var objContext = _InheritedContext.FromObject(this._Object, baseContext);
        this.WalkTree(this._Object, subtree, objContext, inhEnum.All, false);
    };

    _InheritedPropertyValueProvider.Instance._GetPropertySource = function (inheritable) {
        return this._ht[inheritable];
    };
    _InheritedPropertyValueProvider.Instance._SetPropertySource = function (inheritable, source) {
        if (source)
            this._ht[inheritable] = source;
        else
            delete this._ht[inheritable];
    };

    Fayde._InheritedPropertyValueProvider = Nullstone.FinishCreate(_InheritedPropertyValueProvider);

    //#endregion

})(Nullstone.Namespace("Fayde"));