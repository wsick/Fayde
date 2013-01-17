/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/DependencyObject.js"/>
/// <reference path="GridLength.js"/>
/// CODE

(function (namespace) {
    var RowDefinition = Nullstone.Create("RowDefinition", DependencyObject);

    //#region Properties

    RowDefinition.HeightProperty = DependencyProperty.RegisterCore("Height", function () { return GridLength; }, RowDefinition, new GridLength(1.0, GridUnitType.Star));
    RowDefinition.MaxHeightProperty = DependencyProperty.RegisterCore("MaxHeight", function () { return Number; }, RowDefinition, Number.POSITIVE_INFINITY);
    RowDefinition.MinHeightProperty = DependencyProperty.RegisterCore("MinHeight", function () { return Number; }, RowDefinition, 0.0);
    RowDefinition.ActualHeightProperty = DependencyProperty.RegisterReadOnlyCore("ActualHeight", function () { return Number; }, RowDefinition, 0.0);

    Nullstone.AutoProperties(RowDefinition, [
        RowDefinition.HeightProperty,
        RowDefinition.MaxHeightProperty,
        RowDefinition.MinHeightProperty,
        RowDefinition.ActualHeightProperty
    ]);

    //#endregion

    namespace.RowDefinition = Nullstone.FinishCreate(RowDefinition);
})(window);