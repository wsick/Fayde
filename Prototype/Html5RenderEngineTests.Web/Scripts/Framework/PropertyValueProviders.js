/// <reference path="RefObject.js"/>
/// CODE
/// <reference path="DependencyObject.js" />
/// <reference path="Collections.js" />
/// <reference path="FrameworkElement.js"/>
/// <reference path="Control.js"/>
/// <reference path="TextElement.js"/>
/// <reference path="TextBlock.js"/>
/// <reference path="BError.js"/>

var Control = {};
var TextBlock = {};
var TextElement = {};
var Run = {};
function Image() { };
function MediaElement() { };
function Popup() { };

var _PropertyPrecedence = {
    IsEnabled: 0,
    LocalValue: 1,
    DynamicValue: 2,

    LocalStyle: 3,
    ImplicitStyle: 4,

    Inherited: 5,
    InheritedDataContext: 6,
    DefaultValue: 7,
    AutoCreate: 8
};
_PropertyPrecedence.Highest = _PropertyPrecedence.IsEnabled;
_PropertyPrecedence.Lowest = _PropertyPrecedence.AutoCreate;
_PropertyPrecedence.Count = 9;

var _ProviderFlags = {
    RecomputesOnLowerPriorityChange: 1,
    RecomputesOnHigherPriorityChange: 2,
    RecomputesOnClear: 4,
    ProvidesLocalValue: 8
};

//#region _PropertyValueProvider

function _PropertyValueProvider(obj, propPrecedence, flags) {
    RefObject.call(this);
    this._Object = obj;
    this._PropertyPrecedence = propPrecedence;
    this._Flags = flags;
}
_PropertyValueProvider.InheritFrom(RefObject);

_PropertyValueProvider.prototype._HasFlag = function (flag) {
    return (this._Flags & flag) != 0;
};
_PropertyValueProvider.prototype.GetPropertyValue = function (propd) {
    AbstractMethod("_PropertyValueProvider.GetPropertyValue(propd)");
};
_PropertyValueProvider.prototype.ForeachValue = function (func, data) {
    if (!func)
        return;
    for (var value in this._ht)
        func(value, this._ht[value], data);
};
_PropertyValueProvider.prototype.RecomputePropertyValue = function (propd, providerFlags, error) {
};

//#endregion

//#region _InheritedIsEnabledPropertyValueProvider

function _InheritedIsEnabledPropertyValueProvider(obj, propPrecedence) {
    _PropertyValueProvider.call(this, obj, propPrecedence, _ProviderFlags.RecomputesOnLowerPriorityChange);
    this._Source = null;
    this._CurrentValue = this._Object.GetValue(Control.IsEnabledProperty, _PropertyPrecedence.LocalValue);
}
_InheritedIsEnabledPropertyValueProvider.InheritFrom(_PropertyValueProvider);

_InheritedIsEnabledPropertyValueProvider.prototype.GetPropertyValue = function (propd) {
    if (propd == Control.IsEnabledProperty)
        return this._CurrentValue;
    return null;
};
_InheritedIsEnabledPropertyValueProvider.prototype.SetDataSource = function (source) {
    if (source) {
        while (source) {
            if (source instanceof Control)
                break;
            else if (source instanceof FrameworkElement)
                source = source._GetLogicalParent();
            else
                source = null;
        }
    }

    if (this._Source != source) {
        this._DetachListener(this._Source);
        this._Source = source;
        this._AttachListener(this._Source);
    }

    if (!source || this._Object.IsAttached())
        this.LocalValueChanged(null);
};
_InheritedIsEnabledPropertyValueProvider.prototype._AttachListener = function (obj) {
    if (source) {
        var matchFunc = function (sender, args) {
            return this == args.Property; //Closure - Control.IsEnabledProperty
        };
        source.PropertyChanged.SubscribeSpecific(this._IsEnabledChanged, this, matchFunc, Control.IsEnabledProperty);
        //TODO: Add Handler - Destroyed Event
    }
};
_InheritedIsEnabledPropertyValueProvider.prototype._DetachListener = function (source) {
    if (source) {
        source.PropertyChanged.Unsubscribe(this._IsEnabledChanged, this, Control.IsEnabledProperty);
        //TODO: Remove Handler - Destroyed Event
    }
};
_InheritedIsEnabledPropertyValueProvider.prototype._IsEnabledChanged = function (sender, args) {
    this.LocalValueChanged(args.Property);
};
_InheritedIsEnabledPropertyValueProvider.prototype.LocalValueChanged = function (propd) {
    if (propd && propd != Control.IsEnabledProperty)
        return false;

    var localEnabled = this._Object.GetValue(Control.IsEnabledProperty, _PropertyPrecedence.LocalValue);
    var parentEnabled = this._Source && this._Object.GetVisualParent() ? this._Source.GetValue(Control.IsEnabledProperty) : null;
    var newValue = localEnabled == true && (parentEnabled == null || parentEnabled == true);
    if (newValue != this._CurrentValue) {
        var oldValue = this._CurrentValue;
        this._CurrentValue = newValue;

        var error = new BError();
        this._Object._ProviderValueChanged(this._PropertyPrecedence, Control.IsEnabledProperty, oldValue, newValue, true, false, false, error);
        return true;
    }
    return false;
};

//#endregion

//#region _LocalPropertyValueProvider

function _LocalPropertyValueProvider(obj, propPrecedence) {
    _PropertyValueProvider.call(this, obj, propPrecedence, _ProviderFlags.ProvidesLocalValue);
    this._ht = new Array();
}
_LocalPropertyValueProvider.InheritFrom(_PropertyValueProvider);

_LocalPropertyValueProvider.prototype.GetPropertyValue = function (propd) {
    return this._ht[propd];
};
_LocalPropertyValueProvider.prototype.SetValue = function (propd, value) {
    this._ht[propd] = value;
};
_LocalPropertyValueProvider.prototype.ClearValue = function (propd) {
    delete this._ht[propd];
};

//#endregion

//#region _StylePropertyValueProvider

function _StylePropertyValueProvider(obj, propPrecedence) {
    _PropertyValueProvider.call(this, obj, propPrecedence, _ProviderFlags.RecomputesOnClear);
    this._ht = new Array();
}
_StylePropertyValueProvider.InheritFrom(_PropertyValueProvider);

_StylePropertyValueProvider.prototype.GetPropertyValue = function (propd) {
    return this._ht[propd];
};
_StylePropertyValueProvider.prototype.RecomputePropertyValue = function (propd, reason, error) {
    if ((reason & _ProviderFlags.RecomputesOnClear) == 0)
        return;

    var oldValue = undefined;
    var newValue = undefined;
    var propd = null;

    var walker = new _DeepStyleWalker(this._Style);
    var setter;
    while (setter = walker.Step()) {
        propd = setter.GetValue(Setter.PropertyProperty);
        if (propd != prop)
            continue;

        newValue = setter.GetValue(Setter.ConvertedValueProperty);
        oldValue = this._ht[propd];
        this._ht[propd] = newValue;
        this._Object._ProviderValueChanged(this._PropertyPrecedence, propd, oldValue, newValue, true, true, true, error);
        if (error.IsErrored())
            return;
    }
};
_StylePropertyValueProvider.prototype._UpdateStyle = function (style, error) {
    var oldValue = undefined;
    var newValue = undefined;

    var oldWalker = new _DeepStyleWalker(this._Style);
    var newWalker = new _DeepStyleWalker(style);

    var oldSetter = oldWalker.Step();
    var newSetter = newWalker.Step();
    var oldProp;
    var newProp;

    while (oldSetter || newSetter) {
        if (oldSetter)
            oldProp = oldSetter.GetValue(Setter.PropertyProperty);
        if (newSetter)
            newProp = newSetter.GetValue(Setter.PropertyProperty);
        if (oldProp && (oldProp < newProp || !newProp)) { //WTF: Less than?
            //Property in old style, not in new style
            oldValue = oldSetter.GetValue(Setter.ConvertedValueProperty);
            newValue = null;
            delete this._ht[oldProp];
            this._Object._ProviderValueChanged(this._PropertyPrecedence, oldProp, oldValue, newValue, true, true, false, error);
            oldSetter = oldWalker.Step();
        } else if (oldProp == newProp) {
            //Property in both styles
            oldValue = oldSetter.GetValue(Setter.ConvertedValueProperty);
            newValue = newSetter.GetValue(Setter.ConvertedValueProperty);
            this._ht[oldProp] = newValue;
            this._Object._ProviderValueChanged(this._PropertyPrecedence, oldProp, oldValue, newValue, true, true, false, error);
            oldSetter = oldWalker.Step();
            newSetter = newWalker.Step();
        } else {
            //Property in new style, not in old style
            oldValue = null;
            newValue = newSetter.GetValue(Setter.ConvertedValueProperty);
            this._ht[newProp] = newValue;
            this._Object._ProviderValueChanged(this._PropertyPrecedence, newProp, oldValue, newValue, true, true, false, error);
            newSetter = newWalker.Step();
        }
    }

    this._Style = style;
};

//#endregion

//#region _ImplicitStylePropertyValueProvider

var _StyleIndex = {
    VisualTree: 0,
    ApplicationResources: 1,
    GenericXaml: 2,
    Count: 3
};
var _StyleMask = {
    VisualTree: 1 << _StyleIndex.VisualTree,
    ApplicationResources: 1 << _StyleIndex.ApplicationResources,
    GenericXaml: 1 << _StyleIndex.GenericXaml
};
_StyleMask.All = _StyleMask.VisualTree | _StyleMask.ApplicationResources | _StyleMask.GenericXaml;
_StyleMask.None = 0;

function _ImplicitStylePropertyValueProvider(obj, propPrecedence) {
    _PropertyValueProvider.call(this, obj, propPrecedence, _ProviderFlags.RecomputesOnClear);
    this._Styles = null;
    this._StyleMask = _StyleMask.None;
    this._ht = new Array();
}
_ImplicitStylePropertyValueProvider.InheritFrom(_PropertyValueProvider);

_ImplicitStylePropertyValueProvider.prototype.GetPropertyValue = function (propd) {
    return this._ht[propd];
};
_ImplicitStylePropertyValueProvider.prototype.RecomputePropertyValue = function (propd, providerFlags, error) {
    if ((providerFlags & _ProviderFlags.RecomputesOnClear) == 0)
        return;

    if (!this._Styles)
        return;

    var oldValue = undefined;
    var newValue = null;
    var propd = null;

    var walker = new _DeepStyleWalker(this._Styles);
    var setter;
    while (setter = walker.Step()) {
        propd = setter.GetValue(Setter.PropertyProperty);
        if (propd != propd)
            continue;

        newValue = setter.GetValue(Setter.ValueProperty); //DIV: ConvertedValueProperty
        oldValue = this._ht[propd];
        this._ht[propd] = newValue;
        this._Object._ProviderValueChanged(this._PropertyPrecedence, propd, oldValue, newValue, true, true, true, error);
        if (error.IsErrored())
            return;
    }
};
_ImplicitStylePropertyValueProvider.prototype._ApplyStyles = function (styleMask, styles, error) {
    var isChanged = !this._Styles || styleMask != this._StyleMask;
    if (!isChanged) {
        for (var i = 0; i < _StyleIndex.Count; i++) {
            if (styles[i] != this._Styles[i]) {
                isChanged = true;
                break;
            }
        }
    }
    if (!isChanged)
        return;

    var oldValue = undefined;
    var newValue = undefined;

    var oldWalker = new _DeepStyleWalker(this._Styles);
    var newWalker = new _DeepStyleWalker(styles);

    var oldSetter = oldWalker.Step();
    var newSetter = newWalker.Step();

    while (oldSetter || newSetter) {
        var oldProp;
        var newProp;
        if (oldSetter)
            oldProp = oldSetter.GetValue(Setter.PropertyProperty);
        if (newSetter)
            newProp = newSetter.GetValue(Setter.PropertyProperty);

        if (oldProp && (oldProp < newProp || !newProp)) { //WTF: Less than?
            //Property in old style, not in new style
            oldValue = oldSetter.GetValue(Setter.ValueProperty);
            newValue = null;
            delete this._ht[oldProp];
            this._Object._ProviderValueChanged(this._PropertyPrecedence, oldProp, oldValue, newValue, true, true, false, error);
            oldSetter = oldWalker.Step();
        }
        else if (oldProp == newProp) {
            //Property in both styles
            oldValue = oldSetter.GetValue(Setter.ValueProperty);
            newValue = newSetter.GetValue(Setter.ValueProperty);
            this._ht[oldProp] = newValue;
            this._Object._ProviderValueChanged(this._PropertyPrecedence, oldProp, oldValue, newValue, true, true, false, error);
            oldSetter = oldWalker.Step();
            newSetter = newWalker.Step();
        } else {
            //Property in new style, not in old style
            oldValue = null;
            newValue = newSetter.GetValue(Setter.ValueProperty);
            this._ht[newProp] = newValue;
            this._Object._ProviderValueChanged(this._PropertyPrecedence, newProp, oldValue, newValue, true, true, false, error);
            newSetter = newWalker.Step();
        }
    }

    this._Styles = styles;
    this._StyleMask = styleMask;
};
_ImplicitStylePropertyValueProvider.prototype.SetStyles = function (styleMask, styles, error) {
    if (!styles)
        return;

    var newStyles = new Array();
    if (this._Styles) {
        newStyles[_StyleIndex.GenericXaml] = this._Styles[_StyleIndex.GenericXaml];
        newStyles[_StyleIndex.ApplicationResources] = this._Styles[_StyleIndex.ApplicationResources];
        newStyles[_StyleIndex.VisualTree] = this._Styles[_StyleIndex.VisualTree];
    }
    if (styleMask & _StyleMask.GenericXaml)
        newStyles[_StyleIndex.GenericXaml] = styles[_StyleIndex.GenericXaml];
    if (styleMask & _StyleMask.ApplicationResources)
        newStyles[_StyleIndex.ApplicationResources] = styles[_StyleIndex.ApplicationResources];
    if (styleMask & _StyleMask.VisualTree)
        newStyles[_StyleIndex.VisualTree] = styles[_StyleIndex.VisualTree];

    this._ApplyStyles(this._StyleMask | styleMask, newStyles, error);
};
_ImplicitStylePropertyValueProvider.prototype.ClearStyles = function (styleMask, error) {
    if (!this._Styles)
        return;

    var newStyles = $.clone(this._Styles); //WTF: Does $.clone fully work for us?
    if (styleMask & _StyleMask.GenericXaml)
        newStyles[_StyleIndex.GenericXaml] = null;
    if (styleMask & _StyleMask.ApplicationResources)
        newStyles[_StyleIndex.ApplicationResources] = null;
    if (styleMask & _StyleMask.VisualTree)
        newStyles[_StyleIndex.VisualTree] = null;

    this._ApplyStyles(this._StyleMask & ~styleMask, newStyles, error);
};

//#endregion

//#region _InheritedPropertyValueProvider

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
    _PropertyValueProvider.call(this, obj, propPrecedence, 0);
    this._ht = new Array();
}
_InheritedPropertyValueProvider.InheritFrom(_PropertyValueProvider);

_InheritedPropertyValueProvider.prototype.GetPropertyValue = function (propd) {
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
_InheritedPropertyValueProvider.prototype.WalkSubtree = function (rootParent, element, context, props, adding) {
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
_InheritedPropertyValueProvider.prototype.WalkTree = function (rootParent, element, context, props, adding) {
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
_InheritedPropertyValueProvider.prototype.MaybePropagateInheritedValue = function (source, prop, props, element) {
    if (!source) return;
    if ((props & prop) == 0) return;

    var sourceProperty = _InheritedPropertyValueProvider.GetProperty(prop, source);
    var value = source.GetValue(sourceProperty);
    if (value)
        element._PropagateInheritedValue(prop, source, value);
};
_InheritedPropertyValueProvider.prototype.MaybeRemoveInheritedValue = function (source, prop, props, element) {
    if (!source) return;
    if ((props & prop) == 0) return;

    if (source == element._GetInheritedValueSource(prop))
        element._PropagateInheritedValue(prop, null, null);
};
_InheritedPropertyValueProvider.prototype.PropagateInheritedPropertiesOnAddingToTree = function (subtree) {
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
_InheritedPropertyValueProvider.prototype.PropagateInheritedProperty = function (propd, source, subtree) {
    var inheritable = _InheritedPropertyValueProvider.GetInheritable(source, propd);
    var objContext = new _InheritedContext(this._Object, null);
    this.WalkSubtree(source, subtree, objContext, inheritable, true);
};
_InheritedPropertyValueProvider.prototype.ClearInheritedPropertiesOnRemovingFromTree = function (subtree) {
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
_InheritedPropertyValueProvider.prototype._GetPropertySource = function (inheritableOrProp) {
    if (inheritableOrProp instanceof DependencyProperty)
        return this._ht[GetInheritableFromProperty(inheritableOrProp)];
    return this._ht[inheritableOrProp];
};
_InheritedPropertyValueProvider.prototype._SetPropertySource = function (inheritable, source) {
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

//#endregion

//#endregion

//#region _InheritedContext

function _InheritedContext() {
    RefObject.call(this);
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
}
_InheritedContext.InheritFrom(RefObject);

_InheritedContext.prototype.Compare = function (withContext, props) {
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
_InheritedContext.prototype.GetLocalSource = function (obj, prop) {
    var source = null;
    var propd = _InheritedPropertyValueProvider.GetProperty(prop, obj);
    if (propd && obj._GetPropertyValueProvider(propd) < _PropertyPrecedence.Inherited)
        source = obj;
    return source;
};

//#endregion

//#region _InheritedDataContextPropertyValueProvider

function _InheritedDataContextPropertyValueProvider(obj, propPrecedence) {
    _PropertyValueProvider.call(this, obj, propPrecedence);
    this._Source = null;
}
_InheritedDataContextPropertyValueProvider.InheritFrom(_PropertyValueProvider);

_InheritedDataContextPropertyValueProvider.prototype.GetPropertyValue = function (propd) {
    if (!this._Source || propd != FrameworkElement.DataContextProperty)
        return null;
    return this._Source.GetValue(propd);
};
_InheritedDataContextPropertyValueProvider.prototype.SetDataSource = function (source) {
    if (this._Source == source)
        return;

    var oldValue = this._Source ? this._Source.GetValue(FrameworkElement.DataContextProperty) : null;
    var newValue = source ? source.GetValue(FrameworkElement.DataContextProperty) : null;

    this._DetachListener(this._Source);
    this._Source = source;
    this._AttachListener(this._Source);

    if (oldValue != newValue) {
        var error = new BError();
        this._Object._ProviderValueChanged(this._PropertyPrecedence, FrameworkElement.DataContextProperty, oldValue, newValue, false, false, false, error);
    }
};
_InheritedDataContextPropertyValueProvider.prototype._AttachListener = function (source) {
    if (source) {
        var matchFunc = function (sender, args) {
            return this == args.Property; //Closure - FrameworkElement.DataContextProperty
        };
        source.PropertyChanged.SubscribeSpecific(this._SourceDataContextChanged, this, matchFunc, FrameworkElement.DataContextProperty);
        //TODO: Add Handler - Destroyed Event
    }
};
_InheritedDataContextPropertyValueProvider.prototype._DetachListener = function (source) {
    if (source) {
        source.PropertyChanged.Unsubscribe(this._SourceDataContextChanged, this, FrameworkElement.DataContextProperty);
        //TODO: Remove Handler - Destroyed Event
    }
};
_InheritedDataContextPropertyValueProvider.prototype._SourceDataContextChanged = function (sender, args) {
    var error = BError();
    this._Object._ProviderValueChanged(this._PropertyPrecedence, args.Property, args.OldValue, args.NewValue, true, false, false, error);
};
_InheritedDataContextPropertyValueProvider.prototype.EmitChanged = function () {
    if (this._Source) {
        var error = new BError();
        this._Object._ProviderValueChanged(this._PropertyPrecedence, FrameworkElement.DataContextProperty, null, this._Source.GetValue(FrameworkElement.DataContextProperty), true, false, false, error);
    }
};

//#endregion

//#region _DefaultValuePropertyProvider

function _DefaultValuePropertyProvider(obj, propPrecedence) {
    _PropertyValueProvider.call(this, obj, propPrecedence, 0);
}
_DefaultValuePropertyProvider.InheritFrom(_PropertyValueProvider);

_DefaultValuePropertyProvider.prototype.GetPropertyValue = function (propd) {
    return propd.DefaultValue;
};

//#endregion

//#region _AutoCreatePropertyValueProvider

var _AutoCreators = {
    DefaultFontSize: { GetValue: function (propd, obj) { return 11; } },
    DefaultBlackBrush: { GetValue: function (propd, obj) { return "#000000"; } }
};

function _AutoCreatePropertyValueProvider(obj, propPrecedence) {
    _PropertyValueProvider.call(this, obj, propPrecedence, _ProviderFlags.ProvidesLocalValue);
    this._ht = new Array();
}
_AutoCreatePropertyValueProvider.InheritFrom(_PropertyValueProvider);

_AutoCreatePropertyValueProvider.prototype.GetPropertyValue = function (propd) {
    var value = this.ReadLocalValue(propd);
    if (value)
        return value;

    value = propd._IsAutoCreated() ? propd._GetAutoCreatedValue(this._Object) : null;
    if (!value)
        return null;

    this._ht[propd] = value;
    var error = new BError();
    this._Object._ProviderValueChanged(this._PropertyPrecedence, propd, null, value, false, true, false, error);
    return value;
};
_AutoCreatePropertyValueProvider.prototype.RecomputePropertyValue = function (propd, providerFlags, error) {
    if ((providerFlags & _ProviderFlags.RecomputesOnClear) == 0)
        return;
    this.ClearValue(propd);
};
_AutoCreatePropertyValueProvider.prototype.ReadLocalValue = function (propd) {
    return this._ht[propd];
};
_AutoCreatePropertyValueProvider.prototype.ClearValue = function (propd) {
    delete this._ht[propd];
};

//#endregion