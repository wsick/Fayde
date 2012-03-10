/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="GradientBrush.js"/>
/// CODE
/// <reference path="Enums.js"/>

//#region RadialGradientBrush
var RadialGradientBrush = Nullstone.Create("RadialGradientBrush", GradientBrush);

//#region DEPENDENCY PROPERTIES

RadialGradientBrush.CenterProperty = DependencyProperty.RegisterFull("Center", function () { return Point; }, RadialGradientBrush, new Point(0.5, 0.5));
RadialGradientBrush.Instance.GetCenter = function () {
    return this.GetValue(RadialGradientBrush.CenterProperty);
};
RadialGradientBrush.Instance.SetCenter = function (value) {
    this.SetValue(RadialGradientBrush.CenterProperty, value);
};

RadialGradientBrush.GradientOriginProperty = DependencyProperty.RegisterFull("GradientOrigin", function () { return Point; }, RadialGradientBrush, new Point(0.5, 0.5));
RadialGradientBrush.Instance.GetGradientOrigin = function () {
    return this.GetValue(RadialGradientBrush.GradientOriginProperty);
};
RadialGradientBrush.Instance.SetGradientoOrigin = function (value) {
    this.SetValue(RadialGradientBrush.GradientOriginProperty, value);
};

RadialGradientBrush.RadiusXProperty = DependencyProperty.RegisterFull("RadiusX", function () { return Number; }, RadialGradientBrush, 0.5);
RadialGradientBrush.Instance.GetRadiusX = function () {
    return this.GetValue(RadialGradientBrush.RadiusXProperty);
};
RadialGradientBrush.Instance.SetRadiusX = function (value) {
    this.SetValue(RadialGradientBrush.RadiusXProperty, value);
};

RadialGradientBrush.RadiusYProperty = DependencyProperty.RegisterFull("RadiusY", function () { return Number; }, RadialGradientBrush, 0.5);
RadialGradientBrush.Instance.GetRadiusY = function () {
    return this.GetValue(RadialGradientBrush.RadiusYProperty);
};
RadialGradientBrush.Instance.SetRadiusY = function (value) {
    this.SetValue(RadialGradientBrush.RadiusYProperty, value);
};

//#endregion

RadialGradientBrush.Instance._Translate = function (ctx, bounds) {
    NotImplemented("RadialGradientBrush._Translate");
};

Nullstone.FinishCreate(RadialGradientBrush);
//#endregion