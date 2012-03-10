/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/DependencyObject.js"/>
/// <reference path="GridLength.js"/>
/// CODE

//#region ColumnDefinition

function ColumnDefinition() {
    if (!Nullstone.IsReady)
        return;
    this.$super();
}
Nullstone.Extend(ColumnDefinition, "ColumnDefinition", DependencyObject);

//#region DEPENDENCY PROPERTIES

ColumnDefinition.WidthProperty = DependencyProperty.Register("Width", function () { return GridLength; }, ColumnDefinition, new GridLength(1.0, GridUnitType.Star));
ColumnDefinition.prototype.GetWidth = function () {
    /// <returns type="GridLength" />
    return this.GetValue(ColumnDefinition.WidthProperty);
};
ColumnDefinition.prototype.SetWidth = function (value) {
    /// <param name="value" type="GridLength"></param>
    this.SetValue(ColumnDefinition.WidthProperty, value);
};

ColumnDefinition.MaxWidthProperty = DependencyProperty.Register("MaxWidth", function () { return Number; }, ColumnDefinition, Number.POSITIVE_INFINITY);
ColumnDefinition.prototype.GetMaxWidth = function () {
    return this.GetValue(ColumnDefinition.MaxWidthProperty);
};
ColumnDefinition.prototype.SetMaxWidth = function (value) {
    this.SetValue(ColumnDefinition.MaxWidthProperty, value);
};

ColumnDefinition.MinWidthProperty = DependencyProperty.Register("MinWidth", function () { return Number; }, ColumnDefinition, 0.0);
ColumnDefinition.prototype.GetMinWidth = function () {
    return this.GetValue(ColumnDefinition.MinWidthProperty);
};
ColumnDefinition.prototype.SetMinWidth = function (value) {
    this.SetValue(ColumnDefinition.MinWidthProperty, value);
};

ColumnDefinition.ActualWidthProperty = DependencyProperty.Register("ActualWidth", function () { return Number; }, ColumnDefinition, 0.0);
ColumnDefinition.prototype.GetActualWidth = function () {
    return this.GetValue(ColumnDefinition.ActualWidthProperty);
};
ColumnDefinition.prototype.SetActualWidth = function (value) {
    this.SetValue(ColumnDefinition.ActualWidthProperty, value);
};

//#endregion

//#endregion
