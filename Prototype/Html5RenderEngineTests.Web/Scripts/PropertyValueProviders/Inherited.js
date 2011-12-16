/// <reference path="PropertyValueProvider.js" />
/// <reference path="/Scripts/Framework/DependencyObject.js" />
/// <reference path="/Scripts/Framework/FrameworkElement.js" />
/// <reference path="/Scripts/Framework/Control.js" />
/// <reference path="/Scripts/Framework/VisualTreeWalker.js" />

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
        var inheritable = _InheritedPropertyValueProvider.GetInheritable(this._Object, propd);
        if (inheritable == _Inheritable.None)
            return null;

        var ancestor = this._GetPropertySource(inheritable);
        if (!ancestor)
            return null;

        var ancestorPropd = _InheritedPropertyValueProvider.GetProperty(inheritable, ancestor);
        if (!ancestorPropd)
            return null;
        var v = ancestor.GetValue(ancestorPropd);
        if (v)
            return v;
        return null;
    };
    this.WalkSubtree = function (rootParent, element, context, props, adding) {
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
                var col = element.GetValueNoAutoCreate(childProp);
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
            var child;
            while (child = walker.Step()) {
                this.WalkTree(rootParent, child, context, props, adding);
            }
        }
    };
    this.WalkTree = function (rootParent, element, context, props, adding) {
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

            this.WalkSubtree(root, element, eleContext, props, adding);
        } else {
            var eleContext = new _InheritedContext(element, context);

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

            props = eleContext.Compare(context, props);
            if (props == _Inheritable.None)
                return;

            this.WalkSubtree(root, element, context, props, adding);
        }
    };
    this.MaybePropagateInheritedValue = function (source, prop, props, element) {
        if (!source) return;
        if ((props & prop) == 0) return;

        var sourceProperty = _InheritedPropertyValueProvider.GetProperty(prop, source);
        var value = source.GetValue(sourceProperty);
        if (value)
            element._PropagateInheritedValue(prop, source, value);
    };
    this.MaybeRemoveInheritedValue = function (source, prop, props, element) {
        if (!source) return;
        if ((props & prop) == 0) return;

        if (source == element.GetInheritedValueSource(prop))
            element._PropagateInheritedValue(prop, null, null);
    };
    this.PropagateInheritedPropertiesOnAddingToTree = function (subtree) {
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
    this.PropagateInheritedProperty = function (propd, source, subtree) {
        var inheritable = _InheritedPropertyValueProvider.GetInheritable(source, propd);
        var objContext = new _InheritedContext(this._Object, null);
        this.WalkSubtree(source, subtree, objContext, inheritable, true);
    };
    this.ClearInheritedPropertiesOnRemovingFromTree = function (subtree) {
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
    this._GetPropertySource = function (inheritableOrProp) {
        if (inheritableOrProp instanceof DependencyProperty)
            return this._ht[GetInheritableFromProperty(inheritableOrProp)];
        return this._ht[inheritable];
    };
    this._SetPropertySource = function (inheritable, source) {
        if (source)
            this._ht[inheritable] = source;
        else
            delete this._ht[inheritable];
    };
}
_InheritedPropertyValueProvider.GetInheritable = function (obj, propd) {
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
_InheritedPropertyValueProvider.prototype = new _PropertyValueProvider();

function _InheritedContext() {
    if (arguments.length != 2) {
        this.ForegroundSource = arguments[0];
        this.FontFamilySource = arguments[1];
        this.FontStretchSource = arguments[2];
        this.FontStyleSource = arguments[3];
        this.FontWeightSource = arguments[4];
        this.FontSizeSource = arguments[5];
        this.LanguageSource = arguments[6];
        this.FlowDirectionSource = arguments[7];
        this.UseLayoutRoundingSource = arguments[8];
        this.TextDecorationsSource = arguments[9];
        this.FontResourceSource = arguments[10];
    } else {
        var obj = arguments[0];
        var parentContext = arguments[1];

        this.ForegroundSource = this.GetLocalSource(obj, _Inheritable.Foreground);
        if (!this.ForegroundSource && parentContext) this.ForegroundSource = parentContext.ForegroundSource;

        this.FontFamilySource = this.GetLocalSource(obj, _Inheritable.FontFamily);
        if (!this.FontFamilySource && parentContext) this.FontFamilySource = parentContext.FontFamilySource;

        this.FontStretchSource = this.GetLocalSource(obj, _Inheritable.FontStretch);
        if (!this.FontStretchSource && parentContext) this.FontStretchSource = parentContext.FontStretchSource;

        this.FontStyleSource = this.GetLocalSource(obj, _Inheritable.FontStyle);
        if (!this.FontStretchSource && parentContext) this.FontStretchSource = parentContext.FontStretchSource;

        this.FontWeightSource = this.GetLocalSource(obj, _Inheritable.FontWeight);
        if (!this.FontWeightSource && parentContext) this.FontWeightSource = parentContext.FontWeightSource;

        this.FontSizeSource = this.GetLocalSource(obj, _Inheritable.FontSize);
        if (!this.FontSizeSource && parentContext) this.FontSizeSource = parentContext.FontSizeSource;

        this.LanguageSource = this.GetLocalSource(obj, _Inheritable.Language);
        if (!this.LanguageSource && parentContext) this.LanguageSource = parentContext.LanguageSource;

        this.FlowDirectionSource = this.GetLocalSource(obj, _Inheritable.FlowDirection);
        if (!this.FlowDirectionSource && parentContext) this.FlowDirectionSource = parentContext.FlowDirectionSource;

        this.UseLayoutRoundingSource = this.GetLocalSource(obj, _Inheritable.UseLayoutRounding);
        if (!this.UseLayoutRoundingSource && parentContext) this.UseLayoutRoundingSource = parentContext.UseLayoutRoundingSource;

        this.TextDecorationsSource = this.GetLocalSource(obj, _Inheritable.TextDecorations);
        if (!this.TextDecorationsSource && parentContext) this.TextDecorationsSource = parentContext.TextDecorationsSource;

        this.FontResourceSource = this.GetLocalSource(obj, _Inheritable.FontResource);
        if (!this.FontResourceSource && parentContext) this.FontResourceSource = parentContext.FontResourceSource;
    }

    this.Compare = function (withContext, props) {
        var rv = _Inheritable.None;

        if (props & _Inheritable.Foreground && withContext.ForegroundSource == this.ForegroundSource)
            rv |= _Inheritable.Foreground;
        if (props & _Inheritable.FontFamily && withContext.FontFamilySource == this.FontFamilySource)
            rv |= _Inheritable.FontFamily;
        if (props & _Inheritable.FontStretch && withContext.FontStretchSource == this.FontStretchSource)
            rv |= _Inheritable.FontStretch;
        if (props & _Inheritable.FontStyle && withContext.FontStyleSource == this.FontStyleSource)
            rv |= _Inheritable.FontStyle;
        if (props & _Inheritable.FontWeight && withContext.FontWeightSource == this.FontWeightSource)
            rv |= _Inheritable.FontWeight;
        if (props & _Inheritable.FontSize && withContext.FontSizeSource == this.FontSizeSource)
            rv |= _Inheritable.FontSize;
        if (props & _Inheritable.Language && withContext.LanguageSource == this.LanguageSource)
            rv |= _Inheritable.Language;
        if (props & _Inheritable.FlowDirection && withContext.FlowDirectionSource == this.FlowDirectionSource)
            rv |= _Inheritable.FlowDirection;
        if (props & _Inheritable.UseLayoutRounding && withContext.UseLayoutRoundingSource == this.UseLayoutRoundingSource)
            rv |= _Inheritable.UseLayoutRounding;
        if (props & _Inheritable.TextDecorations && withContext.TextDecorationsSource == this.TextDecorationsSource)
            rv |= _Inheritable.TextDecorations;
        if (props & _Inheritable.FontResource && withContext.FontResourceSource == this.FontResourceSource)
            rv |= _Inheritable.FontResource;

        return rv;
    };
    this.GetLocalSource = function (obj, prop) {
        var source = null;
        var propd = _InheritedPropertyValueProvider.GetProperty(prop, obj);
        if (propd && obj.GetPropertyValueProvider(propd) < _PropertyPrecedence.Inherited)
            source = obj;
        return source;
    };
}
_InheritedContext.prototype = new Object();