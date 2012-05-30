/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="SetterBase.js"/>
/// CODE

//#region Setter
var Setter = Nullstone.Create("Setter", SetterBase);

//#region Dependency Properties

Setter.PropertyProperty = DependencyProperty.RegisterCore("Property", function () { return DependencyProperty; }, Setter);
Setter.ValueProperty = DependencyProperty.RegisterCore("Value", function () { return Object; }, Setter);
Setter.ConvertedValueProperty = DependencyProperty.RegisterCore("ConvertedValue", function () { return Object; }, Setter);

//#endregion

Nullstone.FinishCreate(Setter);
//#endregion