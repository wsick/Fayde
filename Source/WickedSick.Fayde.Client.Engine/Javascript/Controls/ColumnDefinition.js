/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/DependencyObject.js"/>
/// <reference path="GridLength.js"/>
/// CODE

(function (namespace) {
    var ColumnDefinition = Nullstone.Create("ColumnDefinition", DependencyObject);

    //#region Properties

    ColumnDefinition.WidthProperty = DependencyProperty.RegisterCore("Width", function () { return GridLength; }, ColumnDefinition, new GridLength(1.0, GridUnitType.Star));
    ColumnDefinition.MaxWidthProperty = DependencyProperty.RegisterCore("MaxWidth", function () { return Number; }, ColumnDefinition, Number.POSITIVE_INFINITY);
    ColumnDefinition.MinWidthProperty = DependencyProperty.RegisterCore("MinWidth", function () { return Number; }, ColumnDefinition, 0.0);
    ColumnDefinition.ActualWidthProperty = DependencyProperty.RegisterReadOnlyCore("ActualWidth", function () { return Number; }, ColumnDefinition, 0.0);

    Nullstone.AutoProperties(ColumnDefinition, [
        ColumnDefinition.WidthProperty,
        ColumnDefinition.MaxWidthProperty,
        ColumnDefinition.MinWidthProperty,
        ColumnDefinition.ActualWidthProperty
    ]);

    //#endregion

    namespace.ColumnDefinition = Nullstone.FinishCreate(ColumnDefinition);
})(window);