/// <reference path="../Runtime/TypeManagement.ts" />

interface IPoint {
    X: number;
    Y: number;
}

class Point implements ICloneable, IPoint {
    X: number;
    Y: number;
    constructor(x?: number, y?: number) {
        this.X = x == null ? 0 : x;
        this.Y = y == null ? 0 : y;
    }
    toString(): string {
        return "X=" + this.X.toString() + ";Y=" + this.Y.toString();
    }
    Equals(other: Point): boolean {
        return this.X === other.X && this.Y === other.Y;
    }

    Clone(): Point {
        return new Point(this.X, this.Y);
    }

    static Equals(p1: Point, p2: Point) {
        if (p1 == null)
            return p2 == null;
        if (p2 == null)
            return false;
        return p1.X === p2.X && p1.Y === p2.Y;
    }
    static LERP(start: Point, end: Point, p: number) {
        var x = start.X + (end.X - start.X) * p;
        var y = start.Y + (end.Y - start.Y) * p;
        return new Point(x, y);
    }
}
Fayde.RegisterType(Point, {
	Name: "Point",
	Namespace: "window",
	XmlNamespace: Fayde.XMLNSX
});

Fayde.RegisterTypeConverter(Point, (val: any): Point => {
    if (!val)
        return new Point();
    if (val instanceof Point)
        return <Point>val;
    var tokens = val.toString().split(",");
    if (tokens.length === 2) {
        var x = parseFloat(tokens[0]);
        var y = parseFloat(tokens[1]);
        return new Point(x, y);
    }
    throw new Exception("Cannot parse Point value '" + val + "'");
});