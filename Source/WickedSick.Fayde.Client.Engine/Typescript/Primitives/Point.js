/// <reference path="../Runtime/Nullstone.ts" />
/// CODE
var Point = (function () {
    function Point(x, y) {
        this.X = x == null ? 0 : x;
        this.Y = y == null ? 0 : y;
    }
    Point.prototype.toString = function () {
        return "X=" + this.X.toString() + ";Y=" + this.Y.toString();
    };
    Point.prototype.Equals = function (other) {
        return this.X === other.X && this.Y === other.Y;
    };
    Point.prototype.Clone = function () {
        return new Point(this.X, this.Y);
    };
    Point.Equals = function Equals(p1, p2) {
        if(p1 == null) {
            return p2 == null;
        }
        if(p2 == null) {
            return false;
        }
        return p1.X === p2.X && p1.Y === p2.Y;
    };
    Point.LERP = function LERP(start, end, p) {
        var x = start.X + (end.X - start.X) * p;
        var y = start.Y + (end.Y - start.Y) * p;
        return new Point(x, y);
    };
    return Point;
})();
Nullstone.RegisterType(Point, "Point");
//@ sourceMappingURL=Point.js.map
