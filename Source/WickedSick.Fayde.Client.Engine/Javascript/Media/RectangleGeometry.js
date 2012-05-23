/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Geometry.js"/>
/// CODE
/// <reference path="../Primitives/Rect.js"/>
/// <reference path="../Shapes/RawPath.js"/>

//#region RectangleGeometry
var RectangleGeometry = Nullstone.Create("RectangleGeometry", Geometry);

//#region Dependency Properties

RectangleGeometry.RectProperty = DependencyProperty.RegisterCore("Rect", function () { return Rect; }, RectangleGeometry, new Rect());
RectangleGeometry.Instance.GetRect = function () {
    /// <returns type="Rect" />
    return this.$GetValue(RectangleGeometry.RectProperty);
};
RectangleGeometry.Instance.SetRect = function (value) {
    /// <param name="value" type="Rect"></param>
    this.$SetValue(RectangleGeometry.RectProperty, value);
};

RectangleGeometry.RadiusXProperty = DependencyProperty.RegisterCore("RadiusX", function () { return Number; }, RectangleGeometry, 0);
RectangleGeometry.Instance.GetRadiusX = function () {
    ///<returns type="Number"></returns>
    return this.$GetValue(RectangleGeometry.RadiusXProperty);
};
RectangleGeometry.Instance.SetRadiusX = function (value) {
    ///<param name="value" type="Number"></param>
    this.$SetValue(RectangleGeometry.RadiusXProperty, value);
};

RectangleGeometry.RadiusYProperty = DependencyProperty.RegisterCore("RadiusY", function () { return Number; }, RectangleGeometry, 0);
RectangleGeometry.Instance.GetRadiusY = function () {
    ///<returns type="Number"></returns>
    return this.$GetValue(RectangleGeometry.RadiusYProperty);
};
RectangleGeometry.Instance.SetRadiusY = function (value) {
    ///<param name="value" type="Number"></param>
    this.$SetValue(RectangleGeometry.RadiusYProperty, value);
};

//#endregion

RectangleGeometry.Instance.ComputePathBounds = function () {
    var rect = this.GetRect();
    if (rect)
        return rect;
    return new Rect(0.0, 0.0, 0.0, 0.0);
};

RectangleGeometry.Instance._Build = function () {
    var rect = this.GetRect();
    if (rect == null)
        return;

    var radiusX = this.GetRadiusX();
    var radiusY = this.GetRadiusY();

    this.$Path = new RawPath();
    this.$Path.RoundedRect(rect.X, rect.Y, rect.Width, rect.Height, radiusX, radiusY);
};

Nullstone.FinishCreate(RectangleGeometry);
//#endregion