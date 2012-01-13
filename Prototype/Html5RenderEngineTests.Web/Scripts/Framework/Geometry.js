/// <reference path="DependencyObject.js"/>

//#region Geometry

Geometry.prototype = new DependencyObject;
Geometry.prototype.constructor = Geometry;
function Geometry() {
    this._LocalBounds = new Rect(0, 0, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
}
Geometry.GetBaseClass = function () { return DependencyObject; };

Geometry.prototype.GetBounds = function () {
    var compute = this._LocalBounds.IsEmpty();

    //TODO: Path build

    if (compute)
        this._LocalBounds = this.ComputePathBounds();
    var bounds = this._LocalBounds;

    //TODO: Transform

    return bounds;
};
Geometry.prototype.ComputePathBounds = function () {
};

//#endregion

//#region RectangleGeometry

RectangleGeometry.prototype = new Geometry;
RectangleGeometry.prototype.constructor = RectangleGeometry;
function RectangleGeometry() {
}
RectangleGeometry.GetBaseClass = function () { return Geometry; };

RectangleGeometry.RectProperty = DependencyProperty.Register("Rect", RectangleGeometry);
RectangleGeometry.prototype.GetRect = function () {
    return this.GetValue(RectangleGeometry.RectProperty);
};
RectangleGeometry.prototype.SetRect = function (value) {
    this.SetValue(RectangleGeometry.RectProperty, value);
};

RectangleGeometry.prototype.ComputePathBounds = function () {
    var rect = this.GetRect();
    if (rect)
        return rect;
    return new Rect(0.0, 0.0, 0.0, 0.0);
};

RectangleGeometry.prototype.Draw = function (canvasCtx) {
    var rect = this.GetRect();
    canvasCtx.rect(rect.X, rect.Y, rect.Width, rect.Height);
};

//#endregion