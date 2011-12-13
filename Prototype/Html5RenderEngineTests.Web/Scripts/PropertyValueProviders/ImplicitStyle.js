/// <reference path="PropertyValueProvider.js" />
/// <reference path="/Scripts/Style.js" />

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
    _PropertyValueProvider.apply(this, obj, propPrecedence, _ProviderFlags.RecomputesOnClear);
    this._Styles = null;
    this._StyleMask = _StyleMask.None;
    this._ht = new Array();
    this.GetPropertyValue = function (propd) {
        return this._ht[propd];
    };
    this.RecomputePropertyValue = function (propd, providerFlags, error) {
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

            newValue = setter.GetValue(Setter.ConvertedValueProperty);
            oldValue = this._ht[propd];
            this._ht[propd] = newValue;
            this._Object.ProviderValueChanged(this._PropertyPrecedence, propd, oldValue, newValue, true, true, true, error);
            if (error.IsErrored())
                return;
        }
    };
    this._ApplyStyles = function (styleMask, styles, error) {
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
                oldValue = oldSetter.GetValue(Setter.ConvertedValueProperty);
                newValue = null;
                delete this._ht[oldProp];
                this._Object.ProviderValueChanged(this._PropertyPrecedence, oldProp, oldValue, newValue, true, true, false, error);
                oldSetter = oldWalker.Step();
            }
            else if (oldProp == newProp) {
                //Property in both styles
                oldValue = oldSetter.GetValue(Setter.ConvertedValueProperty);
                newValue = newSetter.GetValue(Setter.ConvertedValueProperty);
                this._ht[oldProp] = newValue;
                this._Object.ProviderValueChanged(this._PropertyPrecedence, oldProp, oldValue, newValue, true, true, false, error);
                oldSetter = oldWalker.Step();
                newSetter = newWalker.Step();
            } else {
                //Property in new style, not in old style
                oldValue = null;
                newValue = newSetter.GetValue(Setter.ConvertedValueProperty);
                this._ht[newProp] = newValue;
                this._Object.ProviderValueChanged(this._PropertyPrecedence, newProp, oldValue, newValue, true, true, false, error);
                newSetter = newWalker.Step();
            }
        }

        this._Styles = styles;
        this._StyleMask = styleMask;
    };
    this.SetStyles = function (styleMask, styles, error) {
        if (!this._Styles)
            return;

        var newStyles = $.clone(this._Styles); //WTF: Does $.clone fully work for us?
        if (styleMask & _StyleMask.GenericXaml)
            newStyles[_StyleIndex.GenericXaml] = this._Styles[_StyleIndex.GenericXaml];
        if (styleMask & _StyleMask.ApplicationResources)
            newStyles[_StyleIndex.ApplicationResources] = this._Styles[_StyleIndex.ApplicationResources];
        if (styleMask & _StyleMask.VisualTree)
            newStyles[_StyleIndex.VisualTree] = this._Styles[_StyleIndex.VisualTree];

        this._ApplyStyles(this._StyleMask | styleMask, newStyles, error);
    };
    this.ClearStyles = function (styleMask, error) {
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
}
_ImplicitStylePropertyValueProvider.prototype = new _PropertyValueProvider();
