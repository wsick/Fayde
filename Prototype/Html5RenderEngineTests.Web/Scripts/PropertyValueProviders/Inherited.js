/// <reference path="PropertyValueProvider.js" />
/// <reference path="/Scripts/Framework/DependencyObject.js" />
/// <reference path="/Scripts/Framework/FrameworkElement.js" />
/// <reference path="/Scripts/Framework/Control.js" />

var _Inheritable = {
    Foreground: 1 << 0,
    FontFamily: 1 << 1,
    FontStretch: 1 << 2,
    FontStyle: 1 << 3,
    FontWeight: 1 << 4,
    FontSize: 1 << 5,
    Language: 1 << 6,
    FlowDirection: 1 << 7,
    UseLayoutRounding: 1 << 8,
    TextDecorations: 1 << 9,
    FontResource: 1 << 10
};
_Inheritable.All = 0x7ff;
_Inheritable.None = 0;

function _InheritedPropertyValueProvider(obj, propPrecedence) {
    _PropertyValueProvider.apply(this, obj, propPrecedence, 0);
    this._ht = new Array();
    this.GetPropertyValue = function (propd) {
        var inheritable = this.GetInheritable(this._Object, propd);
        if (inheritable == _Inheritable.None)
            return null;

        var ancestor = this.GetPropertySource(inheritable);
        if (!ancestor)
            return null;

        var ancestorPropd = this.GetProperty(inheritable, ancestor);
        if (!ancestorPropd)
            return null;
        var v = ancestor.GetValue(ancestorPropd);
        if (v)
            return v;
        return null;
    };
    this.WalkSubtree = function () {
        NotImplemented();
    };
    this.WalkTree = function () {
        NotImplemented();
    };
    this.MaybePropagateInheritedValue = function () {
        NotImplemented();
    };
    this.MaybeRemoveInheritedValue = function () {
        NotImplemented();
    };
    this.PropagateInheritedPropertiesOnAddingToTree = function () {
        NotImplemented();
    };
    this.PropagateInheritedProperty = function () {
        NotImplemented();
    };
    this.ClearInheritedPropertiesOnRemovingFromTree = function () {
        NotImplemented();
    };
    this.GetPropertySource = function (inheritableOrProp) {
        if (inheritableOrProp instanceof DependencyProperty)
            return this._ht[GetInheritableFromProperty(inheritableOrProp)];
        return this._ht[inheritable];
    };
    this.SetPropertySource = function (inheritable, source) {
        if (source)
            this._ht[inheritable] = source;
        else
            delete this._ht[inheritable];
    };
    this.GetInheritable = function (obj, propd) {
        if (propd == Control.ForegroundProperty || propd == TextBlock.ForegroundProperty || propd == TextElement.ForegroundProperty)
            return _Inheritable.Foreground;
        if (propd == Control.FontFamilyProperty || propd == TextBlock.FontFamilyProperty || propd == TextElement.FontFamilyProperty)
            return _Inheritable.FontFamily;
        if (propd == Control.FontStretchProperty || propd == TextBlock.FontStretchProperty || propd == TextElement.FontStretchProperty)
            return _Inheritable.FontStretch;
        if (propd == Control.FontStyleProperty || propd == TextBlock.FontStyleProperty || propd == TextElement.FontStyleProperty)
            return _Inheritable.FontStyle;
        if (propd == Control.FontWeightProperty || propd == TextBlock.FontWeightProperty || propd == TextElement.FontWeightProperty)
            return _Inheritable.FontWeight;
        if (propd == Control.FontSizeProperty || propd == TextBlock.FontSizeProperty || propd == TextElement.FontSizeProperty)
            return _Inheritable.FontSize;
        if (propd == FrameworkElement.LanguageProperty || propd == TextElement.LanguageProperty)
            return _Inheritable.Language;
        if (propd == FrameworkElement.FlowDirectionProperty && !(obj instanceof Image) && !(obj instanceof MediaElement))
            return _Inheritable.FlowDirection;
        if (propd == Run.FlowDirectionProperty)
            return _Inheritable.FlowDirection;
        if (propd == UIElement.UseLayoutRoundingProperty)
            return _Inheritable.UseLayoutRounding;
        if (propd == TextElement.TextDecorationsProperty || propd == TextBlock.TextDecorationsProperty)
            return _Inheritable.TextDecorations;
        if (propd == TextElement.FontResourceProperty || propd == TextBlock.FontResourceProperty)
            return _Inheritable.FontResource;
        return _Inheritable.None;
    };
    this.GetProperty = function (inheritable, ancestor) {
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
}
_InheritedPropertyValueProvider.prototype = new _PropertyValueProvider();

function _InheritedContext() {
}
_InheritedContext.prototype = new Object();