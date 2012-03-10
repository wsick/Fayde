/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/DependencyObject.js"/>
/// <reference path="GridLength.js"/>
/// CODE

//#region RowDefinition

function RowDefinition() {
    if (!Nullstone.IsReady)
        return;
    this.$super();
}
Nullstone.Extend(RowDefinition, "RowDefinition", DependencyObject);

//#region DEPENDENCY PROPERTIES

RowDefinition.HeightProperty = DependencyProperty.Register("Height", function () { return GridLength; }, RowDefinition, new GridLength(1.0, GridUnitType.Star));
RowDefinition.prototype.GetHeight = function () {
    /// <returns type="GridLength" />
    return this.GetValue(RowDefinition.HeightProperty);
};
RowDefinition.prototype.SetHeight = function (value) {
    /// <param name="value" type="GridLength"></param>
    this.SetValue(RowDefinition.HeightProperty, value);
};

RowDefinition.MaxHeightProperty = DependencyProperty.Register("MaxHeight", function () { return Number; }, RowDefinition, Number.POSITIVE_INFINITY);
RowDefinition.prototype.GetMaxHeight = function () {
    return this.GetValue(RowDefinition.MaxHeightProperty);
};
RowDefinition.prototype.SetMaxHeight = function (value) {
    this.SetValue(RowDefinition.MaxHeightProperty, value);
};

RowDefinition.MinHeightProperty = DependencyProperty.Register("MinHeight", function () { return Number; }, RowDefinition, 0.0);
RowDefinition.prototype.GetMinHeight = function () {
    return this.GetValue(RowDefinition.MinHeightProperty);
};
RowDefinition.prototype.SetMinHeight = function (value) {
    this.SetValue(RowDefinition.MinHeightProperty, value);
};

RowDefinition.ActualHeightProperty = DependencyProperty.Register("ActualHeight", function () { return Number; }, RowDefinition, 0.0);
RowDefinition.prototype.GetActualHeight = function () {
    return this.GetValue(RowDefinition.ActualHeightProperty);
};
RowDefinition.prototype.SetActualHeight = function (value) {
    this.SetValue(RowDefinition.ActualHeightProperty, value);
};

//#endregion

//#endregion
