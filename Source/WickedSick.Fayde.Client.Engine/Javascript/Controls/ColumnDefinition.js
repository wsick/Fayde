/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/DependencyObject.js"/>
/// <reference path="GridLength.js"/>
/// CODE

//#region ColumnDefinition
var ColumnDefinition = Nullstone.Create("ColumnDefinition", DependencyObject);

//#region DEPENDENCY PROPERTIES

ColumnDefinition.WidthProperty = DependencyProperty.Register("Width", function () { return GridLength; }, ColumnDefinition, new GridLength(1.0, GridUnitType.Star));
ColumnDefinition.Instance.GetWidth = function () {
    /// <returns type="GridLength" />
    return this.$GetValue(ColumnDefinition.WidthProperty);
};
ColumnDefinition.Instance.SetWidth = function (value) {
    /// <param name="value" type="GridLength"></param>
    this.$SetValue(ColumnDefinition.WidthProperty, value);
};

ColumnDefinition.MaxWidthProperty = DependencyProperty.Register("MaxWidth", function () { return Number; }, ColumnDefinition, Number.POSITIVE_INFINITY);
ColumnDefinition.Instance.GetMaxWidth = function () {
    return this.$GetValue(ColumnDefinition.MaxWidthProperty);
};
ColumnDefinition.Instance.SetMaxWidth = function (value) {
    this.$SetValue(ColumnDefinition.MaxWidthProperty, value);
};

ColumnDefinition.MinWidthProperty = DependencyProperty.Register("MinWidth", function () { return Number; }, ColumnDefinition, 0.0);
ColumnDefinition.Instance.GetMinWidth = function () {
    return this.$GetValue(ColumnDefinition.MinWidthProperty);
};
ColumnDefinition.Instance.SetMinWidth = function (value) {
    this.$SetValue(ColumnDefinition.MinWidthProperty, value);
};

ColumnDefinition.ActualWidthProperty = DependencyProperty.Register("ActualWidth", function () { return Number; }, ColumnDefinition, 0.0);
ColumnDefinition.Instance.GetActualWidth = function () {
    return this.$GetValue(ColumnDefinition.ActualWidthProperty);
};
ColumnDefinition.Instance.SetActualWidth = function (value) {
    this.$SetValue(ColumnDefinition.ActualWidthProperty, value);
};

//#endregion

Nullstone.FinishCreate(ColumnDefinition);
//#endregion