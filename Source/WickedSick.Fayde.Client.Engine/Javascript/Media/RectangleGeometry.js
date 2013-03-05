/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Geometry.js"/>
/// CODE
/// <reference path="../Shapes/RawPath.js"/>
/// <reference path="../Primitives.js"/>

(function (namespace) {
    var RectangleGeometry = Nullstone.Create("RectangleGeometry", namespace.Geometry);

    //#region Properties

    RectangleGeometry.RectProperty = DependencyProperty.RegisterCore("Rect", function () { return rect; }, RectangleGeometry, new rect());
    RectangleGeometry.RadiusXProperty = DependencyProperty.RegisterCore("RadiusX", function () { return Number; }, RectangleGeometry, 0);
    RectangleGeometry.RadiusYProperty = DependencyProperty.RegisterCore("RadiusY", function () { return Number; }, RectangleGeometry, 0);

    Nullstone.AutoProperties(RectangleGeometry, [
        RectangleGeometry.RectProperty,
        RectangleGeometry.RadiusXProperty,
        RectangleGeometry.RadiusYProperty
    ]);

    //#endregion

    RectangleGeometry.Instance.ComputePathBounds = function () {
        var irect = this.Rect;
        if (irect)
            return irect;
        return new rect();
    };

    RectangleGeometry.Instance._Build = function () {
        var irect = this.Rect;
        if (!irect)
            return;

        var radiusX = this.RadiusX;
        var radiusY = this.RadiusY;

        this.$Path = new Fayde.Shapes.RawPath();
        this.$Path.RoundedRect(irect.X, irect.Y, irect.Width, irect.Height, radiusX, radiusY);
    };

    namespace.RectangleGeometry = Nullstone.FinishCreate(RectangleGeometry);
})(Nullstone.Namespace("Fayde.Media"));