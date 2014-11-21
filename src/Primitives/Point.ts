class Point extends minerva.Point {
    Clone (): Point {
        return new Point(this.x, this.y);
    }

    static LERP (start: Point, end: Point, p: number): Point {
        var x = start.x + (end.x - start.x) * p;
        var y = start.y + (end.y - start.y) * p;
        return new Point(x, y);
    }
}
Fayde.RegisterType(Point, "window", Fayde.XMLNSX);

nullstone.registerTypeConverter(Point, (val: any): Point => {
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