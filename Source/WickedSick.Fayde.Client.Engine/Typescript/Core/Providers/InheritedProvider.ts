/// <reference path="IProviderStore.ts" />
/// CODE
/// <reference path="../../Controls/Image.ts" />
/// <reference path="../../Controls/MediaElement.ts" />

module Fayde.Providers {
    export class _InheritedContext {
        ForegroundSource: DependencyObject;
        FontFamilySource: DependencyObject;
        FontStretchSource: DependencyObject;
        FontStyleSource: DependencyObject;
        FontWeightSource: DependencyObject;
        FontSizeSource: DependencyObject;
        LanguageSource: DependencyObject;
        FlowDirectionSource: DependencyObject;
        UseLayoutRoundingSource: DependencyObject;
        TextDecorationsSource: DependencyObject;
        static FromSources(foregroundSource: DependencyObject, fontFamilySource: DependencyObject, fontStretchSource: DependencyObject, fontStyleSource: DependencyObject, fontWeightSource: DependencyObject, fontSizeSource: DependencyObject, languageSource: DependencyObject, flowDirectionSource: DependencyObject, useLayoutRoundingSource: DependencyObject, textDecorationsSource: DependencyObject) {
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
        }
        static FromObject(dobj: DependencyObject, parentContext: _InheritedContext) {
            var ic = new _InheritedContext();

            ic.ForegroundSource = ic.GetLocalSource(dobj, _Inheritable.Foreground);
            if (!ic.ForegroundSource && parentContext) ic.ForegroundSource = parentContext.ForegroundSource;

            ic.FontFamilySource = ic.GetLocalSource(dobj, _Inheritable.FontFamily);
            if (!ic.FontFamilySource && parentContext) ic.FontFamilySource = parentContext.FontFamilySource;

            ic.FontStretchSource = ic.GetLocalSource(dobj, _Inheritable.FontStretch);
            if (!ic.FontStretchSource && parentContext) ic.FontStretchSource = parentContext.FontStretchSource;

            ic.FontStyleSource = ic.GetLocalSource(dobj, _Inheritable.FontStyle);
            if (!ic.FontStretchSource && parentContext) ic.FontStretchSource = parentContext.FontStretchSource;

            ic.FontWeightSource = ic.GetLocalSource(dobj, _Inheritable.FontWeight);
            if (!ic.FontWeightSource && parentContext) ic.FontWeightSource = parentContext.FontWeightSource;

            ic.FontSizeSource = ic.GetLocalSource(dobj, _Inheritable.FontSize);
            if (!ic.FontSizeSource && parentContext) ic.FontSizeSource = parentContext.FontSizeSource;

            ic.LanguageSource = ic.GetLocalSource(dobj, _Inheritable.Language);
            if (!ic.LanguageSource && parentContext) ic.LanguageSource = parentContext.LanguageSource;

            ic.FlowDirectionSource = ic.GetLocalSource(dobj, _Inheritable.FlowDirection);
            if (!ic.FlowDirectionSource && parentContext) ic.FlowDirectionSource = parentContext.FlowDirectionSource;

            ic.UseLayoutRoundingSource = ic.GetLocalSource(dobj, _Inheritable.UseLayoutRounding);
            if (!ic.UseLayoutRoundingSource && parentContext) ic.UseLayoutRoundingSource = parentContext.UseLayoutRoundingSource;

            ic.TextDecorationsSource = ic.GetLocalSource(dobj, _Inheritable.TextDecorations);
            if (!ic.TextDecorationsSource && parentContext) ic.TextDecorationsSource = parentContext.TextDecorationsSource;

            return ic;
        }
        Compare(withContext: _InheritedContext, props) {
            var rv = _Inheritable.None;
            if (props & _Inheritable.Foreground && withContext.ForegroundSource === this.ForegroundSource)
                rv |= _Inheritable.Foreground;
            if (props & _Inheritable.FontFamily && withContext.FontFamilySource === this.FontFamilySource)
                rv |= _Inheritable.FontFamily;
            if (props & _Inheritable.FontStretch && withContext.FontStretchSource === this.FontStretchSource)
                rv |= _Inheritable.FontStretch;
            if (props & _Inheritable.FontStyle && withContext.FontStyleSource === this.FontStyleSource)
                rv |= _Inheritable.FontStyle;
            if (props & _Inheritable.FontWeight && withContext.FontWeightSource === this.FontWeightSource)
                rv |= _Inheritable.FontWeight;
            if (props & _Inheritable.FontSize && withContext.FontSizeSource === this.FontSizeSource)
                rv |= _Inheritable.FontSize;
            if (props & _Inheritable.Language && withContext.LanguageSource === this.LanguageSource)
                rv |= _Inheritable.Language;
            if (props & _Inheritable.FlowDirection && withContext.FlowDirectionSource === this.FlowDirectionSource)
                rv |= _Inheritable.FlowDirection;
            if (props & _Inheritable.UseLayoutRounding && withContext.UseLayoutRoundingSource === this.UseLayoutRoundingSource)
                rv |= _Inheritable.UseLayoutRounding;
            if (props & _Inheritable.TextDecorations && withContext.TextDecorationsSource === this.TextDecorationsSource)
                rv |= _Inheritable.TextDecorations;
            return rv;
        }
        GetLocalSource(dobj: DependencyObject, prop) {
            var propd = getProperty(prop, dobj);
            if (!propd)
                return;
            if ((dobj._Store._ProviderBitmasks[propd._ID] & ((1 << _PropertyPrecedence.Inherited) - 1)) !== 0)
                return dobj;
        }
    }

    function getInheritable(dobj: DependencyObject, propd: DependencyProperty) {
        var inh = propd._Inheritable || 0;
        if (inh && propd.Name === "FlowDirection" && (dobj instanceof Fayde.Controls.Image || dobj instanceof Fayde.Controls.MediaElement))
            inh = 0;
        return inh;
    }
    function getProperty(inheritable, ancestor: DependencyObject) {
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
    /// "this" needs to be scoped to a InheritedProviderStore
    function propagateInheritedValue(inheritable, source, newValue) {
        var provider: InheritedProvider = this._InheritedProvider;
        if (!provider)
            return true;

        provider._SetPropertySource(inheritable, source);
        var propd = getProperty(inheritable, this);
        if (!propd)
            return false;

        var error = new BError();
        this._ProviderValueChanged(_PropertyPrecedence.Inherited, propd, undefined, newValue, true, error);
    }
    /// "this" needs to be scoped to a InheritedProviderStore
    function getInheritedValueSource(inheritable: _Inheritable): DependencyObject {
        var provider: InheritedProvider = this._InheritedProvider;
        if (provider)
            return provider._GetPropertySource(inheritable);
    }
    export enum _Inheritable {
        Foreground = 1 << 0,
        FontFamily = 1 << 1,
        FontStretch = 1 << 2,
        FontStyle = 1 << 3,
        FontWeight = 1 << 4,
        FontSize = 1 << 5,
        Language = 1 << 6,
        FlowDirection = 1 << 7,
        UseLayoutRounding = 1 << 8,
        TextDecorations = 1 << 9,
        All = 0x7ff,
        None = 0,
    }
    export class InheritedProvider implements IPropertyProvider {
        private _ht: DependencyObject[] = [];
        GetPropertyValue(store: IProviderStore, propd: DependencyProperty): any {
            if (!getInheritable(store._Object, propd))
                return undefined;

            var inheritable = getInheritable(store._Object, propd);
            var ancestor = this._GetPropertySource(inheritable);
            if (!ancestor)
                return undefined;

            var ancestorPropd = getProperty(inheritable, ancestor);
            if (!ancestorPropd)
                return undefined;
            var v = ancestor.GetValue(ancestorPropd);
            if (v)
                return v;
            return undefined;
        }
        WalkSubtree(rootParent: DependencyObject, element: DependencyObject, context: _InheritedContext, props, adding) {
            var enumerator = element.XamlNode.GetInheritedEnumerator();
            if (!enumerator)
                return;
            while (enumerator.MoveNext()) {
                this.WalkTree(rootParent, enumerator.Current, context, props, adding);
            }
        }
        WalkTree(rootParent: DependencyObject, element: DependencyObject, context: _InheritedContext, props: _Inheritable, adding: bool) {
            if (props === _Inheritable.None)
                return;

            if (adding) {
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
                if (props === _Inheritable.None)
                    return;

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
                if (props === _Inheritable.None)
                    return;

                this.WalkSubtree(rootParent, element, context, props, adding);
            }
        }
        MaybePropagateInheritedValue(source: DependencyObject, prop, props, element: DependencyObject) {
            if (!source) return;
            if ((props & prop) == 0) return;

            var sourceProperty = getProperty(prop, source);
            var value = source.GetValue(sourceProperty);
            if (value)
                propagateInheritedValue.call(element._Store, prop, source, value);
        }
        MaybeRemoveInheritedValue(source: DependencyObject, prop, props, element: DependencyObject) {
            if (!source) return;
            if ((props & prop) == 0) return;

            if (source === getInheritedValueSource.call(element, prop))
                propagateInheritedValue.call(element._Store, prop, undefined, undefined);
        }
        PropagateInheritedPropertiesOnAddingToTree(store: IProviderStore, subtree: DependencyObject) {
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
            var objContext = _InheritedContext.FromObject(store._Object, baseContext);
            this.WalkTree(store._Object, subtree, objContext, inhEnum.All, true);
        }
        PropagateInheritedProperty(store: IProviderStore, propd: DependencyProperty, source: DependencyObject, subtree: DependencyObject) {
            var inheritable = getInheritable(source, propd);
            if (inheritable === 0)
                return;
            var objContext = _InheritedContext.FromObject(store._Object, null);
            this.WalkSubtree(source, subtree, objContext, inheritable, true);
        }
        ClearInheritedPropertiesOnRemovingFromTree(store: IProviderStore, subtree: DependencyObject) {
            var baseContext = _InheritedContext.FromSources(
                    this._GetPropertySource(_Inheritable.Foreground),
                    this._GetPropertySource(_Inheritable.FontFamily),
                    this._GetPropertySource(_Inheritable.FontStretch),
                    this._GetPropertySource(_Inheritable.FontStyle),
                    this._GetPropertySource(_Inheritable.FontWeight),
                    this._GetPropertySource(_Inheritable.FontSize),
                    this._GetPropertySource(_Inheritable.Language),
                    this._GetPropertySource(_Inheritable.FlowDirection),
                    this._GetPropertySource(_Inheritable.UseLayoutRounding),
                    this._GetPropertySource(_Inheritable.TextDecorations));
            var objContext = _InheritedContext.FromObject(store._Object, baseContext);
            this.WalkTree(store._Object, subtree, objContext, _Inheritable.All, false);
        }
        _GetPropertySource(inheritable: _Inheritable): DependencyObject {
            return this._ht[inheritable];
        }
        _SetPropertySource(inheritable: _Inheritable, source: DependencyObject) {
            if (source)
                this._ht[inheritable] = source;
            else
                this._ht[inheritable] = undefined;
        }
    }
}