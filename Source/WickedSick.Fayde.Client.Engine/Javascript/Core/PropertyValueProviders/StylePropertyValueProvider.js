/// <reference path="../../Runtime/RefObject.js" />
/// <reference path="PropertyValueProvider.js"/>
/// <reference path="Enums.js"/>
/// CODE
/// <reference path="../Style.js"/>
/// <reference path="../Setter.js"/>
/// <reference path="../DeepStyleWalker.js"/>

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
    var walkPropd = null;

    var walker = new _DeepStyleWalker(this._Style);
    var setter;
    while (setter = walker.Step()) {
        walkPropd = setter.GetValue(Setter.PropertyProperty);
        if (walkPropd != propd)
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
            oldProp = oldSetter.GetProperty();
        if (newSetter)
            newProp = newSetter.GetProperty();
        if (oldProp && (oldProp < newProp || !newProp)) { //WTF: Less than?
            //Property in old style, not in new style
            oldValue = oldSetter.GetValue(Setter.ConvertedValueProperty);
            newValue = null;
            delete this._ht[oldProp];
            this._Object._ProviderValueChanged(this._PropertyPrecedence, oldProp, oldValue, newValue, true, true, false, error);
            oldSetter = oldWalker.Step();
        } else if (oldProp === newProp) {
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
