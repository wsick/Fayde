/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/DependencyObject.js"/>
/// CODE
/// <reference path="../Primitives/Color.js"/>

//#region GradientStop
var GradientStop = Nullstone.Create("GradientStop", DependencyObject);

//#region DEPENDENCY PROPERTIES

GradientStop.ColorProperty = DependencyProperty.Register("Color", function () { return Color; }, GradientStop, new Color());
GradientStop.Instance.GetColor = function () {
    /// <returns type="Color" />
    return this.$GetValue(GradientStop.ColorProperty);
};
GradientStop.Instance.SetColor = function (value) {
    /// <param name="value" type="Color"></param>
    this.SetValue(GradientStop.ColorProperty, value);
};

GradientStop.OffsetProperty = DependencyProperty.Register("Offset", function () { return Number; }, GradientStop, 0.0);
GradientStop.Instance.GetOffset = function () {
    return this.$GetValue(GradientStop.OffsetProperty);
};
GradientStop.Instance.SetOffset = function (value) {
    this.SetValue(GradientStop.OffsetProperty, value);
};

//#endregion

Nullstone.FinishCreate(GradientStop);
//#endregion