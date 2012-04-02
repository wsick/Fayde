/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Geometry.js"/>
/// CODE
/// <reference path="../Primitives/Rect.js"/>

//#region RectangleGeometry
var RectangleGeometry = Nullstone.Create("RectangleGeometry", Geometry);

//#region Dependency Properties

RectangleGeometry.RectProperty = DependencyProperty.Register("Rect", function () { return Rect; }, RectangleGeometry);
RectangleGeometry.Instance.GetRect = function () {
    /// <returns type="Rect" />
    return this.GetValue(RectangleGeometry.RectProperty);
};
RectangleGeometry.Instance.SetRect = function (value) {
    /// <param name="value" type="Rect"></param>
    this.SetValue(RectangleGeometry.RectProperty, value);
};

//#endregion

RectangleGeometry.Instance.ComputePathBounds = function () {
    var rect = this.GetRect();
    if (rect)
        return rect;
    return new Rect(0.0, 0.0, 0.0, 0.0);
};

RectangleGeometry.Instance.Draw = function (canvasCtx) {
    var rect = this.GetRect();
    canvasCtx.beginPath();
    canvasCtx.rect(rect.X, rect.Y, rect.Width, rect.Height);
    canvasCtx.closePath();
};

Nullstone.FinishCreate(RectangleGeometry);
//#endregion