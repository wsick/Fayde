/// <reference path="../Runtime/RefObject.js" />
/// CODE

//#region Point

function Point(x, y) {
    RefObject.call(this);
    this.X = x == null ? 0 : x;
    this.Y = y == null ? 0 : y;
}
Point.InheritFrom(RefObject);

Point.prototype.Apply = function (matrix) {
    /// <param name="matrix" type="Matrix"></param>
    /// <returns type="Point" />
    return matrix.MultiplyPoint(this);
};
Point.prototype.toString = function () {
    return "X=" + this.X.toString() + ";Y=" + this.Y.toString();
};

//#endregion
