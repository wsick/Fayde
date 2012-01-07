/// <reference path="DependencyObject.js" />
/// <reference path="App.js"/>

//#region SetterBase

SetterBase.prototype = new DependencyObject;
SetterBase.prototype.constructor = SetterBase;
function SetterBase() {
    DependencyObject.call(this);
    this._IsAttached = false;
}

//#region DEPENDENCY PROPERTIES

SetterBase.IsSealedProperty = DependencyProperty.Register("IsSealed", SetterBase, false);
SetterBase.prototype.GetIsSealed = function () {
    return this.GetValue(SetterBase.IsSealedProperty);
};

//#endregion

SetterBase.prototype._Seal = function () {
    if (this.GetIsSealed())
        return;
    this.SetValue(SetterBase.IsSealedProperty, true);
};

//#endregion

//#region Setter

Setter.prototype = new SetterBase;
Setter.prototype.constructor = Setter;
function Setter() {
    SetterBase.call(this);
}

//#region DEPENDENCY PROPERTIES

Setter.PropertyProperty = DependencyProperty.Register("Property", Setter);
Setter.prototype.GetProperty = function () {
    return this.GetValue(Setter.PropertyProperty);
};
Setter.prototype.SetProperty = function (value) {
    this.SetValue(Setter.PropertyProperty, value);
};

Setter.ValueProperty = DependencyProperty.Register("Value", Setter);
Setter.prototype.GetValue_Prop = function () {
    return this.GetValue(Setter.ValueProperty);
};
Setter.prototype.SetValue_Prop = function (value) {
    this.SetValue(Setter.ValueProperty, value);
};

Setter.ConvertedValueProperty = DependencyProperty.Register("ConvertedValue", Setter);

//#endregion

//#endregion

//#region Style

Style.prototype = new DependencyObject;
Style.prototype.constructor = Style;
function Style() {
    DependencyObject.call(this);
}

//#region DEPENDENCY PROPERTIES

Style.SettersProperty = DependencyProperty.Register("Setters", Style);
Style.prototype.GetSetters = function () {
    this.GetValue(Style.SettersProperty);
};

Style.IsSealedProperty = DependencyProperty.Register("IsSealed", Style);
Style.prototype.GetIsSealed = function () {
    return this.GetValue(Style.IsSealedProperty);
};

Style.BasedOnProperty = DependencyProperty.Register("BasedOn", Style);
Style.prototype.GetBasedOn = function () {
    return this.GetValue(Style.BasedOnProperty);
};
Style.prototype.SetBasedOn = function (value) {
    this.SetValue(Style.BasedOnProperty, value);
};

Style.TargetTypeProperty = DependencyProperty.Register("TargetType", Style);
Style.prototype.GetTargetType = function () {
    return this.GetValue(Style.TargetTypeProperty);
};
Style.prototype.SetTargetType = function (value) {
    this.SetValue(Style.TargetTypeProperty, value);
};

//#endregion

Style.prototype._Seal = function () {
    if (this.GetIsSealed())
        return;

    var app = App.Instance;
    if (!app)
        return;

    app.ConvertSetterValues(this);
    this.SetValue(Style.IsSealedProperty, true);
    var setters = this.GetSetters();
    for (var i = 0; i < setters.length; i++) {
        setters[i]._Seal();
    }

    var base = this.GetBasedOn();
    if (base)
        base._Seal();
};

//#endregion

//#region _DeepStyleWalker

_DeepStyleWalker.prototype = new Object;
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
    return undefined;
};

//#endregion