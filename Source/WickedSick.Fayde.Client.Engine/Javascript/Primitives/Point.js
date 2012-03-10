/// <reference path="../Runtime/Nullstone.js" />
/// CODE

//#region Point
var Point = Nullstone.Create("Point", null, 2);

Point.Instance.Init = function (x, y) {
    this.X = x == null ? 0 : x;
    this.Y = y == null ? 0 : y;
};

Point.Instance.Apply = function (matrix) {
    /// <param name="matrix" type="Matrix"></param>
    /// <returns type="Point" />
    return matrix.MultiplyPoint(this);
};
Point.Instance.toString = function () {
    return "X=" + this.X.toString() + ";Y=" + this.Y.toString();
};

Nullstone.FinishCreate(Point);
//#endregion