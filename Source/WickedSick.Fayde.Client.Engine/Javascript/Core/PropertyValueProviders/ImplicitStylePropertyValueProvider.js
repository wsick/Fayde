/// <reference path="../../Runtime/RefObject.js" />
/// <reference path="PropertyValueProvider.js"/>
/// <reference path="Enums.js"/>
/// CODE

//#region _ImplicitStylePropertyValueProvider

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
