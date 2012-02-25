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

Setter.ValueProperty = DependencyProperty.Register("Value", function () { return Object; }, Setter);

Setter.ConvertedValueProperty = DependencyProperty.Register("ConvertedValue", function () { return Object; }, Setter);

//#endregion

//#endregion