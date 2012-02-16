/// <reference path="../Runtime/RefObject.js" />
/// <reference path="Geometry.js"/>
/// CODE
/// <reference path="../Primitives/Rect.js"/>

//#region RectangleGeometry

function RectangleGeometry() {
    Geometry.call(this);
}
RectangleGeometry.InheritFrom(Geometry);

//#region DEPENDENCY PROPERTIES

RectangleGeometry.RectProperty = DependencyProperty.Register("Rect", function () { return Rect; }, RectangleGeometry);
RectangleGeometry.prototype.GetRect = function () {
    return this.GetValue(RectangleGeometry.RectProperty);
};
RectangleGeometry.prototype.SetRect = function (value) {
    this.SetValue(RectangleGeometry.RectProperty, value);
};

//#endregion

RectangleGeometry.prototype.ComputePathBounds = function () {
    var rect = this.GetRect();
    if (rect)
        return rect;
    return new Rect(0.0, 0.0, 0.0, 0.0);
};

RectangleGeometry.prototype.Draw = function (canvasCtx) {
    var rect = this.GetRect();
    canvasCtx.beginPath();
    canvasCtx.rect(rect.X, rect.Y, rect.Width, rect.Height);
};

//#endregion
