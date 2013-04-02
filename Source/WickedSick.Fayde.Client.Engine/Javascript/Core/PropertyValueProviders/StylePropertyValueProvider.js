/// <reference path="../../Runtime/Nullstone.js" />
/// <reference path="PropertyValueProvider.js"/>
/// <reference path="Enums.js"/>
/// CODE
/// <reference path="../Style.js"/>
/// <reference path="../Setter.js"/>
/// <reference path="../Walkers.js"/>

(function (Fayde) {
    var _StylePropertyValueProvider = Nullstone.Create("_StylePropertyValueProvider", Fayde._PropertyValueProvider, 1);

    _StylePropertyValueProvider.Instance.Init = function (obj) {
        this.Init$_PropertyValueProvider(obj, _PropertyPrecedence.LocalStyle);
        this._ht = [];

        this._RecomputesOnClear = true;
    };

    _StylePropertyValueProvider.Instance.GetPropertyValue = function (propd) {
        return this._ht[propd];
    };
    _StylePropertyValueProvider.Instance.RecomputePropertyValue = function (propd, lower, higher, clear, error) {
        if (!clear)
            return;

        var oldValue;
        var newValue;
        var walkPropd;

        var walker = new Fayde._DeepStyleWalker(this._Style);
        var setter;
        while (setter = walker.Step()) {
            walkPropd = setter.Property;
            if (walkPropd._ID !== propd._ID)
                continue;

            newValue = setter.ConvertedValue;
            oldValue = this._ht[propd];
            this._ht[propd] = newValue;
            this._Object._ProviderValueChanged(this._PropertyPrecedence, propd, oldValue, newValue, true, true, true, error);
            if (error.Message)
                return;
        }
    };
    _StylePropertyValueProvider.Instance._UpdateStyle = function (style, error) {
        var oldValue = undefined;
        var newValue = undefined;

        var oldWalker = new Fayde._DeepStyleWalker(this._Style);
        var newWalker = new Fayde._DeepStyleWalker(style);
        style._Seal();

        var oldSetter = oldWalker.Step();
        var newSetter = newWalker.Step();
        var oldProp;
        var newProp;

        while (oldSetter || newSetter) {
            if (oldSetter)
                oldProp = oldSetter.Property;
            if (newSetter)
                newProp = newSetter.Property;
            if (oldProp && (oldProp < newProp || !newProp)) { //WTF: Less than?
                //Property in old style, not in new style
                oldValue = oldSetter.ConvertedValue;
                newValue = undefined;
                delete this._ht[oldProp];
                this._Object._ProviderValueChanged(this._PropertyPrecedence, oldProp, oldValue, newValue, true, true, false, error);
                oldSetter = oldWalker.Step();
            } else if (oldProp === newProp) {
                //Property in both styles
                oldValue = oldSetter.ConvertedValue;
                newValue = newSetter.ConvertedValue;
                this._ht[oldProp] = newValue;
                this._Object._ProviderValueChanged(this._PropertyPrecedence, oldProp, oldValue, newValue, true, true, false, error);
                oldSetter = oldWalker.Step();
                newSetter = newWalker.Step();
            } else {
                //Property in new style, not in old style
                oldValue = undefined;
                newValue = newSetter.ConvertedValue;
                this._ht[newProp] = newValue;
                this._Object._ProviderValueChanged(this._PropertyPrecedence, newProp, oldValue, newValue, true, true, false, error);
                newSetter = newWalker.Step();
            }
        }

        this._Style = style;
    };

    Fayde._StylePropertyValueProvider = Nullstone.FinishCreate(_StylePropertyValueProvider);
})(Nullstone.Namespace("Fayde"));