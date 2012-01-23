/// <reference path="RefObject.js"/>
/// <reference path="DependencyObject.js" />
/// <reference path="Collections"/>
/// CODE
/// <reference path="App.js"/>

//#region SetterBase

SetterBase.prototype = new DependencyObject;
SetterBase.prototype.constructor = SetterBase;
function SetterBase() {
    DependencyObject.call(this);
    this._IsAttached = false;
}
SetterBase.GetBaseClass = function () { return DependencyObject; };

//#region DEPENDENCY PROPERTIES

SetterBase.IsSealedProperty = DependencyProperty.Register("IsSealed", SetterBase, false);
SetterBase.prototype.GetIsSealed = function () {
    return this.GetValue(SetterBase.IsSealedProperty);
};

//#endregion

SetterBase.prototype.GetAttached = function () {
    return this._Attached;
};
SetterBase.prototype.SetAttached = function (value) {
    this._Attached = value;
};
SetterBase.prototype._Seal = function () {
    if (this.GetIsSealed())
        return;
    this.SetValue(SetterBase.IsSealedProperty, true);
};

//#endregion

//#region SetterBaseCollection

SetterBaseCollection.prototype = new DependencyObjectCollection;
SetterBaseCollection.prototype.constructor = SetterBaseCollection;
function SetterBaseCollection() {
    DependencyObjectCollection.call(this);
}
SetterBaseCollection.GetBaseClass = function () { return DependencyObjectCollection; };

SetterBaseCollection.IsSealedProperty = DependencyProperty.Register("IsSealed", SetterBaseCollection);
SetterBaseCollection.prototype.GetIsSealed = function () {
    return this.GetValue(SetterBaseCollection.IsSealedProperty);
};
SetterBaseCollection.prototype.SetIsSealed = function (value) {
    this.SetValue(SetterBaseCollection.IsSealedProperty, value);
};

SetterBaseCollection.prototype._Seal = function () {
    this.SetIsSealed(true);

    var error = new BError();
    var iterator = this.GetIterator();
    var setter;
    while (iterator.Next(error) && (setter = iterator.GetCurrent(error))) {
        setter._Seal();
    }
};

SetterBaseCollection.prototype.AddedToCollection = function (value, error) {
    if (!value || !this._ValidateSetter(value, error))
        return false;
    if (value instanceof SetterBase) {
        value.SetAttached(true);
        value._Seal();
    }
    return DependencyObjectCollection.prototype.AddedToCollection.call(this, value, error);
};
SetterBaseCollection.prototype.RemovedFromCollection = function (value, isValueSafe) {
    if (isValueSafe) {
        if (value instanceof SetterBase)
            value.SetAttached(false);
    }
    DependencyObjectCollection.prototype.RemovedFromCollection.call(this, value, isValueSafe);
};

SetterBaseCollection.prototype.IsElementType = function (value) {
    return value instanceof SetterBase;
};

SetterBaseCollection.prototype._ValidateSetter = function (value, error) {
    NotImplemented("SetterBaseCollection._ValidateSetter");
    return true;
};

//#endregion

//#region Setter

Setter.prototype = new SetterBase;
Setter.prototype.constructor = Setter;
function Setter() {
    SetterBase.call(this);
}
Setter.GetBaseClass = function () { return SetterBase; };

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
Style.GetBaseClass = function () { return DependencyObject; };

//#region DEPENDENCY PROPERTIES

Style.SettersProperty = DependencyProperty.Register("Setters", Style, null, { GetValue: function () { return new SetterBaseCollection(); } });
Style.prototype.GetSetters = function () {
    return this.GetValue(Style.SettersProperty);
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

_DeepStyleWalker.prototype = new RefObject;
_DeepStyleWalker.prototype.constructor = _DeepStyleWalker;
function _DeepStyleWalker(styles) {
    RefObject.call(this);
    this._Setters = new Array();
    this._Offset = 0;

    if (styles instanceof Style)
        this._InitializeStyle(styles);
    else if (styles instanceof Array)
        this._InitializeStyles(styles);
}
_DeepStyleWalker.GetBaseClass = function () { return RefObject; };

_DeepStyleWalker.prototype.Step = function () {
    if (this._Offset < this._Setters.length) {
        var s = this._Setters[this._Offset];
        this._Offset++;
        return s;
    }
    return undefined;
};
_DeepStyleWalker.prototype._InitializeStyle = function (style) {
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
    this._Setters.sort(_DeepStyleWalker.SetterSort);
};
_DeepStyleWalker.prototype._InitializeStyles = function (styles) {
    if (!styles)
        return;

    var dps = new Array();
    var stylesSeen = new Array();
    for (var i = 0; i < _StyleIndex.Count; i++) {
        var style = styles[i];
        while (style != null) {
            if (stylesSeen[style]) //FIX: NOT GONNA WORK
                continue;

            var setters = style.GetSetters();
            var count = setters ? setters.GetCount() : 0;
            for (var j = count - 1; j >= 0; j--) {
                var setter = setters.GetValueAt(j);
                if (!setter || !(setter instanceof Setter))
                    continue;

                var dpVal = setter.GetValue(Setter.PropertyProperty);
                if (!dpVal)
                    continue;

                if (!dps[dpVal]) {
                    dps[dpVal] = setter;
                    this._Setters.push(setter);
                }
            }

            stylesSeen[style] = true;
            style = style.GetBasedOn();
        }
    }
    this._Setters.sort(_DeepStyleWalker.SetterSort);
};

_DeepStyleWalker.SetterSort = function (a, b) {
    var as = a.toString();
    var bs = a.toString();
    return (as == bs) ? 0 : ((as > bs) ? 1 : -1);
};

//#endregion