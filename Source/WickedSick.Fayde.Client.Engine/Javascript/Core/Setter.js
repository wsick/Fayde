/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="SetterBase.js"/>
/// CODE

(function (namespace) {
    var Setter = Nullstone.Create("Setter", namespace.SetterBase);

    //#region Properties

    Setter.PropertyProperty = DependencyProperty.RegisterCore("Property", function () { return DependencyProperty; }, Setter);
    Setter.ValueProperty = DependencyProperty.RegisterCore("Value", function () { return Object; }, Setter);
    Setter.ConvertedValueProperty = DependencyProperty.RegisterCore("ConvertedValue", function () { return Object; }, Setter);

    //#endregion

    namespace.Setter = Nullstone.FinishCreate(Setter);
})(Nullstone.Namespace("Fayde"));