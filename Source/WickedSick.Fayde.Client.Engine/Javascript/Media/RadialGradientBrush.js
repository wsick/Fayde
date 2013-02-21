/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="GradientBrush.js"/>
/// CODE
/// <reference path="Enums.js"/>

(function (namespace) {
    var RadialGradientBrush = Nullstone.Create("RadialGradientBrush", namespace.GradientBrush);

    //#region Properties

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
    RadialGradientBrush.Instance.CreateForSvg = function () {
        var rgb = document.createElementNS("http://www.w3.org/2000/svg", "radialGradient");
        var center = this.Center;
        var radiusX = this.RadiusX;
        var radiusY = this.RadiusY;
        NotImplemented("RadialGradientBrush.CreateForSvg");
        this.Initialize(rgb);
        return rgb;
    };

    namespace.RadialGradientBrush = Nullstone.FinishCreate(RadialGradientBrush);
})(Nullstone.Namespace("Fayde.Media"));