/// <reference path="../Runtime/RefObject.js" />
/// <reference path="SetterBase.js"/>
/// CODE

//#region Setter

function Setter() {
    SetterBase.call(this);
}
Setter.InheritFrom(SetterBase);

//#region DEPENDENCY PROPERTIES

Setter.PropertyProperty = DependencyProperty.Register("Property", function () { return DependencyProperty; }, Setter);
Setter.prototype.GetProperty = function () {
    return this.GetValue(Setter.PropertyProperty);
};
Setter.prototype.SetProperty = function (value) {
    this.SetValue(Setter.PropertyProperty, value);
};

Setter.ValueProperty = DependencyProperty.Register("Value", function () { return Object; }, Setter);
Setter.prototype.GetValue_Prop = function () {
    return this.GetValue(Setter.ValueProperty);
};
Setter.prototype.SetValue_Prop = function (value) {
    this.SetValue(Setter.ValueProperty, value);
};

Setter.ConvertedValueProperty = DependencyProperty.Register("ConvertedValue", function () { return Object; }, Setter);

//#endregion

//#endregion