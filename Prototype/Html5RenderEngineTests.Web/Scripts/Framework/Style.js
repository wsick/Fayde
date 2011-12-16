/// <reference path="DependencyObject.js" />

//////////////////////////////////////////
// SETTER BASE
//////////////////////////////////////////
_SetterBase.IsSealedProperty = DependencyProperty.Register("IsSealed", _SetterBase, false);

_SetterBase.prototype = new DependencyObject();
_SetterBase.prototype.constructor = _SetterBase;
function _SetterBase() {
    DependencyObject.call(this);
    this._IsAttached = false;
}
_SetterBase.prototype.Seal = function () {
    if (this.GetIsSealed())
        return;
    this.SetIsSealed(true);
};
_SetterBase.prototype.SetIsSealed = function (value) {
    this.SetValue(_SetterBase.IsSealedProperty, value);
};
_SetterBase.prototype.GetIsSealed = function () {
    return this.GetValue(_SetterBase.IsSealedProperty);
};

//////////////////////////////////////////
// SETTER
//////////////////////////////////////////
Setter.PropertyProperty = DependencyProperty.Register("Property", Setter);
Setter.ValueProperty = DependencyProperty.Register("Value", Setter);
Setter.ConvertedValueProperty = DependencyProperty.Register("ConvertedValue", Setter);

Setter.prototype = new _SetterBase();
Setter.prototype.constructor = Setter;
function Setter() {
    _SetterBase.call(this);
}
Setter.prototype.GetProperty = function () {
    return this.GetValue(Setter.PropertyProperty);
};
Setter.prototype.SetProperty = function (value) {
    this.SetValue(Setter.PropertyProperty, value);
};
Setter.prototype.GetValue_Prop = function () {
    return this.GetValue(Setter.ValueProperty);
};
Setter.prototype.SetValue_Prop = function (value) {
    this.SetValue(Setter.ValueProperty, value);
};

//////////////////////////////////////////
// DEEP STYLE WALKER
//////////////////////////////////////////
_DeepStyleWalker.prototype = new Object();
_DeepStyleWalker.prototype.constructor = _DeepStyleWalker;
function _DeepStyleWalker(style) {
    this._Setters = new Array();
    this._Setters.sort(function (a, b) {
        var as = a.toString();
        var bs = a.toString();
        return (as == bs) ? 0 : ((as > bs) ? 1 : -1);
    });
    this._Offset = 0;


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
}
_DeepStyleWalker.prototype.Step = function () {
    if (this._Offset < this._Setters.length) {
        var s = this._Setters[this._Offset];
        this._Offset++;
        return s;
    }
    return null;
};

//////////////////////////////////////////
// STYLE
//////////////////////////////////////////
Style.BasedOnProperty = DependencyProperty.Register("BasedOn", Style);
Style.IsSealedProperty = DependencyProperty.Register("IsSealed", Style);
Style.SettersProperty = DependencyProperty.Register("Setters", Style);
Style.TargetTypeProperty = DependencyProperty.Register("TargetType", Style);

Style.prototype = new DependencyObject();
Style.prototype.constructor = Style;
function Style() {
    DependencyObject.call(this);   
}
Style.prototype.Seal = function () {
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
Style.prototype.SetSetters = function (value) {
    this.SetValue(Style.SettersProperty, value);
};
Style.prototype.GetSetters = function () {
    this.GetValue(Style.SettersProperty);
};
Style.prototype.SetIsSealed = function (value) {
    this.SetValue(Style.IsSealedProperty, value);
};
Style.prototype.GetIsSealed = function () {
    return this.GetValue(Style.IsSealedProperty);
};