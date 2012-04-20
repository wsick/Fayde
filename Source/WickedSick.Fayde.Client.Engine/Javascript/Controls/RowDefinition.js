/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/DependencyObject.js"/>
/// <reference path="GridLength.js"/>
/// CODE

//#region RowDefinition
var RowDefinition = Nullstone.Create("RowDefinition", DependencyObject);

//#region DEPENDENCY PROPERTIES

RowDefinition.HeightProperty = DependencyProperty.Register("Height", function () { return GridLength; }, RowDefinition, new GridLength(1.0, GridUnitType.Star));
RowDefinition.Instance.GetHeight = function () {
    /// <returns type="GridLength" />
    return this.$GetValue(RowDefinition.HeightProperty);
};
RowDefinition.Instance.SetHeight = function (value) {
    /// <param name="value" type="GridLength"></param>
    this.SetValue(RowDefinition.HeightProperty, value);
};

RowDefinition.MaxHeightProperty = DependencyProperty.Register("MaxHeight", function () { return Number; }, RowDefinition, Number.POSITIVE_INFINITY);
RowDefinition.Instance.GetMaxHeight = function () {
    return this.$GetValue(RowDefinition.MaxHeightProperty);
};
RowDefinition.Instance.SetMaxHeight = function (value) {
    this.SetValue(RowDefinition.MaxHeightProperty, value);
};

RowDefinition.MinHeightProperty = DependencyProperty.Register("MinHeight", function () { return Number; }, RowDefinition, 0.0);
RowDefinition.Instance.GetMinHeight = function () {
    return this.$GetValue(RowDefinition.MinHeightProperty);
};
RowDefinition.Instance.SetMinHeight = function (value) {
    this.SetValue(RowDefinition.MinHeightProperty, value);
};

RowDefinition.ActualHeightProperty = DependencyProperty.Register("ActualHeight", function () { return Number; }, RowDefinition, 0.0);
RowDefinition.Instance.GetActualHeight = function () {
    return this.$GetValue(RowDefinition.ActualHeightProperty);
};
RowDefinition.Instance.SetActualHeight = function (value) {
    this.SetValue(RowDefinition.ActualHeightProperty, value);
};

//#endregion

Nullstone.FinishCreate(RowDefinition);
//#endregion