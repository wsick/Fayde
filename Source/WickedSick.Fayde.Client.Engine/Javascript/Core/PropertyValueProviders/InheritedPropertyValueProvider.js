/// <reference path="../../Runtime/Nullstone.js" />
/// <reference path="PropertyValueProvider.js"/>
/// <reference path="Enums.js"/>
/// CODE
/// <reference path="InheritedContext.js"/>

//#region _InheritedPropertyValueProvider
var _InheritedPropertyValueProvider = Nullstone.Create("_InheritedPropertyValueProvider", _PropertyValueProvider, 2);

_InheritedPropertyValueProvider.Instance.Init = function (obj, propPrecedence) {
    this.Init$_PropertyValueProvider(obj, propPrecedence, 0);
    this._ht = new Array();
};

_InheritedPropertyValueProvider.Instance.GetPropertyValue = function (propd) {
    if (!_InheritedPropertyValueProvider.IsInherited(this._Object, propd))
        return undefined;

    var inheritable = _InheritedPropertyValueProvider.GetInheritable(this._Object, propd);
    var ancestor = this._GetPropertySource(inheritable);
    if (!ancestor)
        return undefined;

    var ancestorPropd = _InheritedPropertyValueProvider.GetProperty(inheritable, ancestor);
    if (!ancestorPropd)
        return undefined;
    var v = ancestor.GetValue(ancestorPropd);
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
        var child = element.GetChild();
        if (child)
            this.WalkTree(rootParent, element, conte, props, adding);
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
    if (props == _Inheritable.None)
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
        this.MaybePropagateInheritedValue(context.FontResourceSource, _Inheritable.FontResource, props, element);

        var eleContext = new _InheritedContext(element, context);

        props = eleContext.Compare(context, props);
        if (props == _Inheritable.None)
            return;

        this.WalkSubtree(rootParent, element, eleContext, props, adding);
    } else {
        var eleContext2 = new _InheritedContext(element, context);

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
        this.MaybeRemoveInheritedValue(context.FontResourceSource, _Inheritable.FontResource, props, element);

        props = eleContext2.Compare(context, props);
        if (props == _Inheritable.None)
            return;

        this.WalkSubtree(rootParent, element, context, props, adding);
    }
};
_InheritedPropertyValueProvider.Instance.MaybePropagateInheritedValue = function (source, prop, props, element) {
    if (!source) return;
    if ((props & prop) == 0) return;

    var sourceProperty = _InheritedPropertyValueProvider.GetProperty(prop, source);
    var value = source.GetValue(sourceProperty);
    if (value)
        element._PropagateInheritedValue(prop, source, value);
};
_InheritedPropertyValueProvider.Instance.MaybeRemoveInheritedValue = function (source, prop, props, element) {
    if (!source) return;
    if ((props & prop) == 0) return;

    if (source == element._GetInheritedValueSource(prop))
        element._PropagateInheritedValue(prop, null, null);
};
_InheritedPropertyValueProvider.Instance.PropagateInheritedPropertiesOnAddingToTree = function (subtree) {
    var baseContext = new _InheritedContext(
            this._GetPropertySource(_Inheritable.Foreground),
            this._GetPropertySource(_Inheritable.FontFamily),
            this._GetPropertySource(_Inheritable.FontStretch),
            this._GetPropertySource(_Inheritable.FontStyle),
            this._GetPropertySource(_Inheritable.FontWeight),
            this._GetPropertySource(_Inheritable.FontSize),
            this._GetPropertySource(_Inheritable.Language),
            this._GetPropertySource(_Inheritable.FlowDirection),
            this._GetPropertySource(_Inheritable.UseLayoutRounding),
            this._GetPropertySource(_Inheritable.TextDecorations),
            this._GetPropertySource(_Inheritable.FontResource));
    var objContext = new _InheritedContext(this._Object, baseContext);
    this.WalkTree(this._Object, subtree, objContext, _Inheritable.All, true);
};
_InheritedPropertyValueProvider.Instance.PropagateInheritedProperty = function (propd, source, subtree) {
    var inheritable = _InheritedPropertyValueProvider.GetInheritable(source, propd);
    var objContext = new _InheritedContext(this._Object, null);
    this.WalkSubtree(source, subtree, objContext, inheritable, true);
};
_InheritedPropertyValueProvider.Instance.ClearInheritedPropertiesOnRemovingFromTree = function (subtree) {
    var baseContext = new _InheritedContext(
            this._GetPropertySource(_Inheritable.Foreground),
            this._GetPropertySource(_Inheritable.FontFamily),
            this._GetPropertySource(_Inheritable.FontStretch),
            this._GetPropertySource(_Inheritable.FontStyle),
            this._GetPropertySource(_Inheritable.FontWeight),
            this._GetPropertySource(_Inheritable.FontSize),
            this._GetPropertySource(_Inheritable.Language),
            this._GetPropertySource(_Inheritable.FlowDirection),
            this._GetPropertySource(_Inheritable.UseLayoutRounding),
            this._GetPropertySource(_Inheritable.TextDecorations),
            this._GetPropertySource(_Inheritable.FontResource));
    var objContext = new _InheritedContext(this._Object, baseContext);
    this.WalkTree(this._Object, subtree, objContext, _Inheritable.All, false);
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

//#region STATIC

_InheritedPropertyValueProvider.IsInherited = function (obj, propd) {
    var inheritable = _InheritedPropertyValueProvider.GetInheritable(obj, propd);
    return inheritable != _Inheritable.None;
};
_InheritedPropertyValueProvider.GetInheritable = function (obj, propd) {
    var inh = propd._CachedInheritable;
    if (inh == null) {
        inh = _InheritedPropertyValueProvider._DeriveInheritable(obj, propd);
        //don't cache this property, object type dependent
        if (propd._ID !== FrameworkElement.FlowDirectionProperty._ID)
            propd._CachedInheritable = inh;
    }
    return inh;
};
_InheritedPropertyValueProvider._DeriveInheritable = function (obj, propd) {
    if (propd.OwnerType._TypeID === Control._TypeID) {
        switch (propd._ID) {
            case Control.ForegroundProperty._ID:
                return _Inheritable.Foreground;
            case Control.FontFamilyProperty._ID:
                return _Inheritable.FontFamily;
            case Control.FontStretchProperty._ID:
                return _Inheritable.FontStretch;
            case Control.FontStyleProperty._ID:
                return _Inheritable.FontStyle;
            case Control.FontWeightProperty._ID:
                return _Inheritable.FontWeight;
            case Control.FontSizeProperty._ID:
                return _Inheritable.FontSize;
            default:
                return _Inheritable.None;
        }
    }
    if (propd.OwnerType._TypeID === TextBlock._TypeID) {
        switch (propd._ID) {
            case TextBlock.ForegroundProperty._ID:
                return _Inheritable.Foreground;
            case TextBlock.FontFamilyProperty._ID:
                return _Inheritable.FontFamily;
            case TextBlock.FontStretchProperty._ID:
                return _Inheritable.FontStretch;
            case TextBlock.FontStyleProperty._ID:
                return _Inheritable.FontStyle;
            case TextBlock.FontWeightProperty._ID:
                return _Inheritable.FontWeight;
            case TextBlock.FontSizeProperty._ID:
                return _Inheritable.FontSize;
            case TextBlock.TextDecorationsProperty._ID:
                return _Inheritable.TextDecorations;
            case TextBlock.FontResourceProperty._ID:
                return _Inheritable.FontResource;
            default:
                return _Inheritable.None;
        }
    }
    if (propd.OwnerType._TypeID === TextElement._TypeID) {
        switch (propd._ID) {
            case TextElement.ForegroundProperty._ID:
                return _Inheritable.Foreground;
            case TextElement.FontFamilyProperty._ID:
                return _Inheritable.FontFamily;
            case TextElement.FontStretchProperty._ID:
                return _Inheritable.FontStretch;
            case TextElement.FontStyleProperty._ID:
                return _Inheritable.FontStyle;
            case TextElement.FontWeightProperty._ID:
                return _Inheritable.FontWeight;
            case TextElement.FontSizeProperty._ID:
                return _Inheritable.FontSize;
            case TextElement.LanguageProperty._ID:
                return _Inheritable.Language;
            case TextElement.TextDecorationsProperty._ID:
                return _Inheritable.TextDecorations;
            case TextElement.FontResourceProperty._ID:
                return _Inheritable.FontResource;
            default:
                return _Inheritable.None;
        }
    }
    switch (propd._ID) {

        case FrameworkElement.LanguageProperty._ID:
            return _Inheritable.Language;
        case FrameworkElement.FlowDirectionProperty._ID:
            if (!(obj instanceof Image) && !(obj instanceof MediaElement))
                return _Inheritable.FlowDirection;
        case Run.FlowDirectionProperty._ID:
            return _Inheritable.FlowDirection;
        case UIElement.UseLayoutRoundingProperty._ID:
            return _Inheritable.UseLayoutRounding;
    }
    return _Inheritable.None;
};
_InheritedPropertyValueProvider.GetProperty = function (inheritable, ancestor) {
    switch (inheritable) {
        case _Inheritable.Foreground:
            if (ancestor instanceof Control)
                return Control.ForegroundProperty;
            else if (ancestor instanceof TextBlock)
                return TextBlock.ForegroundProperty;
            else if (ancestor instanceof TextElement)
                return TextElement.ForegroundProperty;
            break;
        case _Inheritable.FontFamily:
            if (ancestor instanceof Control)
                return Control.FontFamilyProperty;
            else if (ancestor instanceof TextBlock)
                return TextBlock.FontFamilyProperty;
            else if (ancestor instanceof TextElement)
                return TextElement.FontFamilyProperty;
            break;
        case _Inheritable.FontStretch:
            if (ancestor instanceof Control)
                return Control.FontStretchProperty;
            else if (ancestor instanceof TextBlock)
                return TextBlock.FontStretchProperty;
            else if (ancestor instanceof TextElement)
                return TextElement.FontStretchProperty;
            break;
        case _Inheritable.FontStyle:
            if (ancestor instanceof Control)
                return Control.FontStyleProperty;
            else if (ancestor instanceof TextBlock)
                return TextBlock.FontStyleProperty;
            else if (ancestor instanceof TextElement)
                return TextElement.FontStyleProperty;
            break;
        case _Inheritable.FontWeight:
            if (ancestor instanceof Control)
                return Control.FontWeightProperty;
            else if (ancestor instanceof TextBlock)
                return TextBlock.FontWeightProperty;
            else if (ancestor instanceof TextElement)
                return TextElement.FontWeightProperty;
            break;
        case _Inheritable.FontSize:
            if (ancestor instanceof Control)
                return Control.FontSizeProperty;
            else if (ancestor instanceof TextBlock)
                return TextBlock.FontSizeProperty;
            else if (ancestor instanceof TextElement)
                return TextElement.FontSizeProperty;
            break;
        case _Inheritable.Language:
            if (ancestor instanceof FrameworkElement)
                return FrameworkElement.LanguageProperty;
            else if (ancestor instanceof TextElement)
                return TextElement.LanguageProperty;
            break;
        case _Inheritable.FlowDirection:
            if (ancestor instanceof FrameworkElement) {
                if (ancestor instanceof Image || ancestor instanceof MediaElement)
                    return null;
                return FrameworkElement.FlowDirectionProperty;
            } else if (ancestor instanceof Run)
                return Run.FlowDirectionProperty;
            break;
        case _Inheritable.UseLayoutRounding:
            if (ancestor instanceof UIElement)
                return UIElement.UseLayoutRoundingProperty;
            break;
        case _Inheritable.TextDecorations:
            if (ancestor instanceof TextElement)
                return TextElement.TextDecorationsProperty;
            else if (ancestor instanceof TextBlock)
                return TextBlock.TextDecorationsProperty;
            break;
        case _Inheritable.FontResource:
            if (ancestor instanceof TextElement)
                return TextElement.FontResourceProperty;
            else if (ancestor instanceof TextBlock)
                return TextBlock.FontResourceProperty;
            break;
    }
    return null;
};

//#endregion

Nullstone.FinishCreate(_InheritedPropertyValueProvider);
//#endregion