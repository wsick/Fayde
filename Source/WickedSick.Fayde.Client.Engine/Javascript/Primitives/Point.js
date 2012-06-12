/// <reference path="../Runtime/Nullstone.js" />
/// CODE

//#region Point
var Point = Nullstone.Create("Point", null, 2);

Point.Instance.Init = function (x, y) {
    this.X = x == null ? 0 : x;
    this.Y = y == null ? 0 : y;
};

Point.Instance.toString = function () {
    return "X=" + this.X.toString() + ";Y=" + this.Y.toString();
};

Point.Equals = function (p1, p2) {
    /// <param name="p1" type="Point"></param>
    /// <param name="p2" type="Point"></param>
    if (p1 == null && p2 == null)
        return true;
    if (p1 == null || p2 == null)
        return false;
    return p1.X === p2.X && p1.Y === p2.Y;
};

Nullstone.FinishCreate(Point);
//#endregion