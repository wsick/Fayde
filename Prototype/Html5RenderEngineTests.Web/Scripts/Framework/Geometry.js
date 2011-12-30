/// <reference path="DependencyObject.js"/>

Geometry.prototype = new DependencyObject;
Geometry.prototype.constructor = Geometry;
function Geometry() {
}

RectangleGeometry.prototype = new Geometry;
RectangleGeometry.prototype.constructor = RectangleGeometry;
function RectangleGeometry() {
}
RectangleGeometry.SetRect = function (rect) {
    NotImplemented("RectangleGeometry.SetRect");
};