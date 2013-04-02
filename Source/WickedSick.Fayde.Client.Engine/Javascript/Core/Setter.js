/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="SetterBase.js"/>
/// CODE

(function (namespace) {
    var Setter = Nullstone.Create("Setter", namespace.SetterBase);

    Setter.Instance.Init = function () {
        this.Init$SetterBase();
        this.Property = undefined;
        this.Value = undefined;
        this.ConvertedValue = undefined;
    };

    //#region Properties

    Setter.PropertyProperty = DependencyProperty.RegisterCore("Property", function () { return DependencyProperty; }, Setter, undefined, function (d, args) { d.Property = args.NewValue; });
    Setter.ValueProperty = DependencyProperty.RegisterCore("Value", function () { return Object; }, Setter, undefined, function (d, args) { d.Value = args.NewValue; });
    Setter.ConvertedValueProperty = DependencyProperty.RegisterCore("ConvertedValue", function () { return Object; }, Setter, undefined, function (d, args) { d.ConvertedValue = args.NewValue; });

    //#endregion

    namespace.Setter = Nullstone.FinishCreate(Setter);
})(Nullstone.Namespace("Fayde"));