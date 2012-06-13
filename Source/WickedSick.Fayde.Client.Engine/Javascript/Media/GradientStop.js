/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/DependencyObject.js"/>
/// CODE
/// <reference path="../Primitives/Color.js"/>

//#region GradientStop
var GradientStop = Nullstone.Create("GradientStop", DependencyObject);

//#region Dependency Properties

GradientStop.ColorProperty = DependencyProperty.Register("Color", function () { return Color; }, GradientStop, new Color());
GradientStop.OffsetProperty = DependencyProperty.Register("Offset", function () { return Number; }, GradientStop, 0.0);

Nullstone.AutoProperties(GradientStop, [
    GradientStop.ColorProperty,
    GradientStop.OffsetProperty
]);

//#endregion

GradientStop.Instance.toString = function () {
    return this.Color.toString() + " @ " + this.Offset.toString();
};

Nullstone.FinishCreate(GradientStop);
//#endregion