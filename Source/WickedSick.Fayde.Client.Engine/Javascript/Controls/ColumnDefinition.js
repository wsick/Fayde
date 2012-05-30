/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/DependencyObject.js"/>
/// <reference path="GridLength.js"/>
/// CODE

//#region ColumnDefinition
var ColumnDefinition = Nullstone.Create("ColumnDefinition", DependencyObject);

//#region Dependency Properties

ColumnDefinition.WidthProperty = DependencyProperty.Register("Width", function () { return GridLength; }, ColumnDefinition, new GridLength(1.0, GridUnitType.Star));
ColumnDefinition.MaxWidthProperty = DependencyProperty.Register("MaxWidth", function () { return Number; }, ColumnDefinition, Number.POSITIVE_INFINITY);
ColumnDefinition.MinWidthProperty = DependencyProperty.Register("MinWidth", function () { return Number; }, ColumnDefinition, 0.0);

Nullstone.AutoProperties(ColumnDefinition, [
    ColumnDefinition.WidthProperty,
    ColumnDefinition.MaxWidthProperty,
    ColumnDefinition.MinWidthProperty,
    "ActualWidth"
]);

//#endregion

Nullstone.FinishCreate(ColumnDefinition);
//#endregion