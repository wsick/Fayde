/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Geometry.js"/>
/// CODE
/// <reference path="../Primitives/Rect.js"/>
/// <reference path="../Shapes/RawPath.js"/>

(function (namespace) {
    var RectangleGeometry = Nullstone.Create("RectangleGeometry", Geometry);

    //#region Properties

    RectangleGeometry.RectProperty = DependencyProperty.RegisterCore("Rect", function () { return Rect; }, RectangleGeometry, new Rect());
    RectangleGeometry.RadiusXProperty = DependencyProperty.RegisterCore("RadiusX", function () { return Number; }, RectangleGeometry, 0);
    RectangleGeometry.RadiusYProperty = DependencyProperty.RegisterCore("RadiusY", function () { return Number; }, RectangleGeometry, 0);

    Nullstone.AutoProperties(RectangleGeometry, [
        RectangleGeometry.RectProperty,
        RectangleGeometry.RadiusXProperty,
        RectangleGeometry.RadiusYProperty
    ]);

    //#endregion

    RectangleGeometry.Instance.ComputePathBounds = function () {
        var rect = this.Rect;
        if (rect)
            return rect;
        return new Rect(0.0, 0.0, 0.0, 0.0);
    };

    RectangleGeometry.Instance._Build = function () {
        var rect = this.Rect;
        if (!rect)
            return;

        var radiusX = this.RadiusX;
        var radiusY = this.RadiusY;

        this.$Path = new RawPath();
        this.$Path.RoundedRect(rect.X, rect.Y, rect.Width, rect.Height, radiusX, radiusY);
    };

    namespace.RectangleGeometry = Nullstone.FinishCreate(RectangleGeometry);
})(window);