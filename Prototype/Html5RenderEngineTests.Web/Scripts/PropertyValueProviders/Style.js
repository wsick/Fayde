/// <reference path="PropertyValueProvider.js" />
/// <reference path="/Scripts/Style.js" />

function _StylePropertyValueProvider(obj, propPrecedence) {
    _PropertyValueProvider.apply(this, obj, propPrecedence, _ProviderFlags.RecomputesOnClear);
    this._ht = new Array();
    this.GetPropertyValue = function (propd) {
        return this._ht[propd];
    };
    this.RecomputePropertyValue = function (propd, reason, error) {
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
            this._Object.ProviderValueChanged(this._PropertyPrecedence, propd, oldValue, newValue, true, true, true, error);
            if (error.IsErrored())
                return;
        }
    };
    this._UpdateStyle = function (style, error) {
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
                this._Object.ProviderValueChanged(this._PropertyPrecedence, oldProp, oldValue, newValue, true, true, false, error);
                oldSetter = oldWalker.Step();
            } else if (oldProp == newProp) {
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

        this._Style = style;
    };
}
_StylePropertyValueProvider.prototype = new _PropertyValueProvider();