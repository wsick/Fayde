/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/DependencyObject.js"/>
/// <reference path="GridLength.js"/>
/// CODE

//#region RowDefinition
var RowDefinition = Nullstone.Create("RowDefinition", DependencyObject);

//#region Dependency Properties

RowDefinition.HeightProperty = DependencyProperty.Register("Height", function () { return GridLength; }, RowDefinition, new GridLength(1.0, GridUnitType.Star));
RowDefinition.MaxHeightProperty = DependencyProperty.Register("MaxHeight", function () { return Number; }, RowDefinition, Number.POSITIVE_INFINITY);
RowDefinition.MinHeightProperty = DependencyProperty.Register("MinHeight", function () { return Number; }, RowDefinition, 0.0);

Nullstone.AutoProperties(RowDefinition, [
    RowDefinition.HeightProperty,
    RowDefinition.MaxHeightProperty,
    RowDefinition.MinHeightProperty,
    "ActualHeight"
]);

//#endregion

Nullstone.FinishCreate(RowDefinition);
//#endregion