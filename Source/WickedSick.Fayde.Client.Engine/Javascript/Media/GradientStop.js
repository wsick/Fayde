/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/DependencyObject.js"/>
/// CODE
/// <reference path="../Primitives/Color.js"/>

//#region GradientStop

function GradientStop() {
    if (!Nullstone.IsReady)
        return;
    this.$super();
}
Nullstone.Extend(GradientStop, "GradientStop", DependencyObject);

//#region DEPENDENCY PROPERTIES

GradientStop.ColorProperty = DependencyProperty.Register("Color", function () { return Color; }, GradientStop, new Color());
GradientStop.prototype.GetColor = function () {
    /// <returns type="Color" />
    return this.GetValue(GradientStop.ColorProperty);
};
GradientStop.prototype.SetColor = function (value) {
    /// <param name="value" type="Color"></param>
    this.SetValue(GradientStop.ColorProperty, value);
};

GradientStop.OffsetProperty = DependencyProperty.Register("Offset", function () { return Number; }, GradientStop, 0.0);
GradientStop.prototype.GetOffset = function () {
    return this.GetValue(GradientStop.OffsetProperty);
};
GradientStop.prototype.SetOffset = function (value) {
    this.SetValue(GradientStop.OffsetProperty, value);
};

//#endregion

//#endregion
