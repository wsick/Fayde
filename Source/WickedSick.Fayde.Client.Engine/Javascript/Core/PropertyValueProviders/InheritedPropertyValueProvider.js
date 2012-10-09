/// <reference path="../../Runtime/Nullstone.js" />
/// <reference path="PropertyValueProvider.js"/>
/// <reference path="Enums.js"/>
/// CODE
/// <reference path="InheritedContext.js"/>

//#region _InheritedPropertyValueProvider
var _InheritedPropertyValueProvider = Nullstone.Create("_InheritedPropertyValueProvider", _PropertyValueProvider, 2);

_InheritedPropertyValueProvider.Instance.Init = function (obj, propPrecedence) {
    this.Init$_PropertyValueProvider(obj, propPrecedence);
    this._ht = [];

    this._GetInheritableFunc = _InheritedPropertyValueProvider.GetInheritable;
    this._GetPropertyFunc = _InheritedPropertyValueProvider.GetProperty;
};

_InheritedPropertyValueProvider.Instance.GetPropertyValue = function (propd) {
    if (!this._GetInheritableFunc(this._Object, propd))
        return undefined;

    var inheritable = _InheritedPropertyValueProvider.GetInheritable(this._Object, propd);
    var ancestor = this._GetPropertySource(inheritable);
    if (!ancestor)
        return undefined;

    var ancestorPropd = this._GetPropertyFunc(inheritable, ancestor);
    if (!ancestorPropd)
        return undefined;
    var v = ancestor.$GetValue(ancestorPropd);
    if (v)
        return v;
    return undefined;
};
_InheritedPropertyValueProvider.Instance.WalkSubtree = function (rootParent, element, context, props, adding) {
    if (element instanceof TextElement || element instanceof TextBlock) {
        var childProp;
        if (element instanceof TextBlock)
            childProp = TextBlock.InlinesProperty;
        else if (element instanceof Paragraph)
            childProp = Paragraph.InlinesProperty;
        else if (element instanceof Span)
            childProp = Span.InlinesProperty;
        else if (element instanceof Section)
            childProp = Section.BlocksProperty;

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
    if (element instanceof Popup) {
        var child = element.Child;
        if (child)
            this.WalkTree(rootParent, child, context, props, adding);
    }
    if (element instanceof UIElement) {
        var walker = new _VisualTreeWalker(element, _VisualTreeWalkerDirection.Logical, true);
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
        this.MaybePropagateInheritedValue(context.FontResourceSource, inhEnum.FontResource, props, element);

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
        this.MaybeRemoveInheritedValue(context.FontResourceSource, inhEnum.FontResource, props, element);

        props = eleContext2.Compare(context, props);
        if (props === inhEnum.None)
            return;

        this.WalkSubtree(rootParent, element, context, props, adding);
    }
};
_InheritedPropertyValueProvider.Instance.MaybePropagateInheritedValue = function (source, prop, props, element) {
    if (!source) return;
    if ((props & prop) == 0) return;

    var sourceProperty = this._GetPropertyFunc(prop, source);
    var value = source.$GetValue(sourceProperty);
    if (value)
        element._PropagateInheritedValue(prop, source, value);
};
_InheritedPropertyValueProvider.Instance.MaybeRemoveInheritedValue = function (source, prop, props, element) {
    /// <param name="source" type="DependencyObject"></param>
    /// <param name="element" type="DependencyObject"></param>
    if (!source) return;
    if ((props & prop) == 0) return;

    if (Nullstone.RefEquals(source, element._GetInheritedValueSource(prop)))
        element._PropagateInheritedValue(prop, undefined, undefined);
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
            this._GetPropertySource(inhEnum.TextDecorations),
            this._GetPropertySource(inhEnum.FontResource));
    var objContext = _InheritedContext.FromObject(this._Object, baseContext);
    this.WalkTree(this._Object, subtree, objContext, inhEnum.All, true);
};
_InheritedPropertyValueProvider.Instance.PropagateInheritedProperty = function (propd, source, subtree) {
    var inheritable = this._GetInheritableFunc(source, propd);
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
            this._GetPropertySource(inhEnum.TextDecorations),
            this._GetPropertySource(inhEnum.FontResource));
    var objContext = _InheritedContext.FromObject(this._Object, baseContext);
    this.WalkTree(this._Object, subtree, objContext, inhEnum.All, false);
};
_InheritedPropertyValueProvider.Instance._GetPropertySource = function (inheritableOrProp) {
    if (inheritableOrProp instanceof DependencyProperty)
        return this._ht[GetInheritableFromProperty(inheritableOrProp)];
    return this._ht[inheritableOrProp];
};
_InheritedPropertyValueProvider.Instance._SetPropertySource = function (inheritable, source) {
    if (source)
        this._ht[inheritable] = source;
    else
        delete this._ht[inheritable];
};

_InheritedPropertyValueProvider.GetInheritable = function (obj, propd) {
    var inh = propd._Inheritable || 0;
    if (inh && propd.Name === "FlowDirection" && (obj instanceof Image || obj instanceof MediaElement))
        inh = 0;
    return inh;
};

_InheritedPropertyValueProvider.GetProperty = function (inheritable, ancestor) {
    var list = DependencyProperty._Inherited[inheritable];
    if (!list)
        return;
    
    var len = list.length;
    if (len > 0 && list[0].Name === "FlowDirection") {
        if (ancestor instanceof Fayde.Image || ancestor instanceof MediaElement)
            return;
    }
    for (var i = 0; i < len; i++) {
        var propd = list[i];
        if (ancestor instanceof propd.OwnerType)
            return propd;
    }
};

Nullstone.FinishCreate(_InheritedPropertyValueProvider);
//#endregion