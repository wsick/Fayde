/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Panel.js" />
/// CODE
/// <reference path="Primitives.js" />
/// <reference path="DependencyObject.js" />

//#region Canvas
var Canvas = Nullstone.Create("Canvas", Panel);

//#region DEPENDENCY PROPERTIES

Canvas.LeftProperty = DependencyProperty.RegisterAttached("Left", function () { return Number; }, Canvas, 0.0);
Canvas.GetLeft = function (d) {
    return d.GetValue(Canvas.LeftProperty);
};
Canvas.SetLeft = function (d, value) {
    d.SetValue(Canvas.LeftProperty, value);
};

Canvas.TopProperty = DependencyProperty.RegisterAttached("Top", function () { return Number; }, Canvas, 0.0);
Canvas.GetTop = function (d) {
    return d.GetValue(Canvas.TopProperty);
};
Canvas.SetTop = function (d, value) {
    d.SetValue(Canvas.TopProperty, value);
};

Canvas.ZIndexProperty = DependencyProperty.RegisterAttached("ZIndex", function () { return Number; }, Canvas, 0);
Canvas.GetZIndex = function (d) {
    return d.GetValue(Canvas.ZIndexProperty);
};
Canvas.SetZIndex = function (d, value) {
    d.SetValue(Canvas.ZIndexProperty, value);
};

Canvas.ZProperty = DependencyProperty.RegisterAttached("Z", function () { return Number; }, Canvas, NaN);
Canvas.GetZ = function (d) {
    return d.GetValue(Canvas.ZProperty);
};
Canvas.SetZ = function (d, value) {
    d.SetValue(Canvas.ZProperty, value);
};

//#endregion

Nullstone.FinishCreate(Canvas);
//#endregion