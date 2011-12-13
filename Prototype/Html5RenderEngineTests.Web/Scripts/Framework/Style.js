/// <reference path="DependencyObject.js" />

function _SetterBase() {
    this._IsAttached = false;
    this.Seal = function () {
        if (this.GetIsSealed())
            return;
        this.SetIsSealed(true);
    };
    this.SetIsSealed = function (value) {
        this.SetValue(_SetterBase.IsSealedProperty, value);
    };
    this.GetIsSealed = function () {
        return this.GetValue(_SetterBase.IsSealedProperty);
    };
}
_SetterBase.IsSealedProperty = DependencyProperty.Register("IsSealed", _SetterBase, false);
_SetterBase.prototype = new DependencyObject();

function Setter() {
    this.GetProperty = function () {
        return this.GetValue(Setter.PropertyProperty);
    };
    this.SetProperty = function (value) {
        this.SetValue(Setter.PropertyProperty, value);
    };
    this.GetValue_Prop = function () {
        return this.GetValue(Setter.ValueProperty);
    };
    this.SetValue_Prop = function (value) {
        this.SetValue(Setter.ValueProperty, value);
    };
}
Setter.PropertyProperty = DependencyProperty.Register("Property", Setter);
Setter.ValueProperty = DependencyProperty.Register("Value", Setter);
Setter.ConvertedValueProperty = DependencyProperty.Register("ConvertedValue", Setter);
Setter.prototype = new _SetterBase();

function _DeepStyleWalker(style) {
    this._Setters = new Array();
    this._Offset = 0;
    this.Step = function () {
        if (this._Offset < this._Setters.length) {
            var s = this._Setters[this._Offset];
            this._Offset++;
            return s;
        }
        return null;
    };

    var dps = new Array();
    var cur = style;
    while (cur) {
        var setters = cur.GetSetters();
        for (var i = setters.length; i >= 0; i--) {
            var setter = setters[i];
            var propd = setter.GetProperty();
            if (!dps[propd]) {
                dps[propd] = true;
                this._Setters.push(setter);
            }
        }
        cur = cur.GetBasedOn();
    }
    this._Setters.sort(function (a, b) {
        var as = a.toString();
        var bs = a.toString();
        return (as == bs) ? 0 : ((as > bs) ? 1 : -1);
    });
}
_DeepStyleWalker.prototype = new Object();

function Style() {
    this.Seal = function () {
        if (this.GetIsSealed())
            return;

        var application = Application.GetCurrent();
        if (!application)
            return;
        
        application.ConvertSetterValues(this);
        this.SetIsSealed(true);
        var setters = this.GetSetters();
        for (var i = 0; i < setters.length; i++) {
            setters[i].Seal();
        }

        var base = this.GetBasedOn();
        if (base)
            base.Seal();
    };
    this.SetSetters = function (value) {
        this.SetValue(Style.SettersProperty, value);
    };
    this.GetSetters = function () {
        this.GetValue(Style.SettersProperty);
    };
    this.SetIsSealed = function (value) {
        this.SetValue(Style.IsSealedProperty, value);
    };
    this.GetIsSealed = function () {
        return this.GetValue(Style.IsSealedProperty);
    };
}
Style.BasedOnProperty = DependencyProperty.Register("BasedOn", Style);
Style.IsSealedProperty = DependencyProperty.Register("IsSealed", Style);
Style.SettersProperty = DependencyProperty.Register("Setters", Style);
Style.TargetTypeProperty = DependencyProperty.Register("TargetType", Style);
Style.prototype = new DependencyObject();
