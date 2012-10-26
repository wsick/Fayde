/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="GradientBrush.js"/>
/// CODE
/// <reference path="Enums.js"/>

//#region RadialGradientBrush
var RadialGradientBrush = Nullstone.Create("RadialGradientBrush", GradientBrush);

//#region Dependency Properties

RadialGradientBrush.CenterProperty = DependencyProperty.RegisterCore("Center", function () { return Point; }, RadialGradientBrush, new Point(0.5, 0.5));
RadialGradientBrush.GradientOriginProperty = DependencyProperty.RegisterCore("GradientOrigin", function () { return Point; }, RadialGradientBrush, new Point(0.5, 0.5));
RadialGradientBrush.RadiusXProperty = DependencyProperty.RegisterCore("RadiusX", function () { return Number; }, RadialGradientBrush, 0.5);
RadialGradientBrush.RadiusYProperty = DependencyProperty.RegisterCore("RadiusY", function () { return Number; }, RadialGradientBrush, 0.5);

Nullstone.AutoProperties(RadialGradientBrush, [
    RadialGradientBrush.CenterProperty,
    RadialGradientBrush.GradientOriginProperty,
    RadialGradientBrush.RadiusXProperty,
    RadialGradientBrush.RadiusYProperty
]);

//#endregion

RadialGradientBrush.Instance.CreateBrush = function (ctx, bounds) {
    NotImplemented("RadialGradientBrush.CreateBrush");
};

Nullstone.FinishCreate(RadialGradientBrush);
//#endregion