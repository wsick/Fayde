/// <reference path="qunit-1.10.0.d.ts" />

QUnit.module("Type Converter Tests");

test("Primitives", () => {
    strictEqual(Fayde.ConvertAnyToType("1", Number), 1, "Integer conversion");
    strictEqual(Fayde.ConvertAnyToType("1.2", Number), 1.2, "Decimal conversion");
});

test("Enums", () => {
    strictEqual(Fayde.ConvertAnyToType("Top", <any>(new Enum(Fayde.VerticalAlignment))), Fayde.VerticalAlignment.Top, "String to Enum");
});

test("Color", () => {
    strictEqual(<Color>Fayde.ConvertAnyToType(undefined, Color), undefined, "undefined");
    strictEqual(<Color>Fayde.ConvertAnyToType(null, Color), undefined, "null");

    var c = <Color>Fayde.ConvertAnyToType("White", Color);
    strictEqual(c, Color.KnownColors.White, "Known Color");

    c = <Color>Fayde.ConvertAnyToType("#0066CC", Color);
    strictEqual(c.A, 1.0, "RGB (a)");
    strictEqual(c.R, 0, "RGB (R)");
    strictEqual(c.G, 102, "RGB (G)");
    strictEqual(c.B, 204, "RGB (B)");

    c = <Color>Fayde.ConvertAnyToType("#CCBB9977", Color);
    strictEqual(c.A, 0.8, "aRGB (a)");
    strictEqual(c.R, 187, "aRGB (R)");
    strictEqual(c.G, 153, "aRGB (G)");
    strictEqual(c.B, 119, "aRGB (B)");
});

test("TimeSpan", () => {
    var ts = <TimeSpan>Fayde.ConvertAnyToType("01.02:03:04.10", TimeSpan);
    strictEqual(ts.CompareTo(TimeSpan.FromArgs(1, 2, 3, 4, 100)), 0, "Full TimeSpan");

    ts = <TimeSpan>Fayde.ConvertAnyToType("02:03:04", TimeSpan);
    strictEqual(ts.CompareTo(TimeSpan.FromArgs(0, 2, 3, 4, 0)), 0, "Short TimeSpan");

    ts = <TimeSpan>Fayde.ConvertAnyToType("01.02:03:04", TimeSpan);
    strictEqual(ts.CompareTo(TimeSpan.FromArgs(1, 2, 3, 4, 0)), 0, "Short+Days TimeSpan");

    ts = <TimeSpan>Fayde.ConvertAnyToType("02:03:04.10", TimeSpan);
    strictEqual(ts.CompareTo(TimeSpan.FromArgs(0, 2, 3, 4, 100)), 0, "Short+Milliseconds TimeSpan");

    ts = <TimeSpan>Fayde.ConvertAnyToType(1000, TimeSpan);
    strictEqual(ts.Ticks, 1000, "Ticks (Number)");

    ts = <TimeSpan>Fayde.ConvertAnyToType("1000", TimeSpan);
    strictEqual(ts.Ticks, 1000, "Ticks (String)");
});

test("Thickness", () => {
    var t = <Thickness>Fayde.ConvertAnyToType(1, Thickness);
    strictEqual(t.Left, 1, "Number (Left)");
    strictEqual(t.Top, 1, "Number (Top)");
    strictEqual(t.Right, 1, "Number (Right)");
    strictEqual(t.Bottom, 1, "Number (Bottom)");

    t = <Thickness>Fayde.ConvertAnyToType("2", Thickness);
    strictEqual(t.Left, 2, "Uniform (Left)");
    strictEqual(t.Top, 2, "Uniform (Top)");
    strictEqual(t.Right, 2, "Uniform (Right)");
    strictEqual(t.Bottom, 2, "Uniform (Bottom)");

    t = <Thickness>Fayde.ConvertAnyToType("4,6", Thickness);
    strictEqual(t.Left, 4, "Mid (Left)");
    strictEqual(t.Top, 6, "Mid (Top)");
    strictEqual(t.Right, 4, "Mid (Right)");
    strictEqual(t.Bottom, 6, "Mid (Bottom)");

    t = <Thickness>Fayde.ConvertAnyToType("0, 2, 4, 6", Thickness);
    strictEqual(t.Left, 0, "Full (Left)");
    strictEqual(t.Top, 2, "Full (Top)");
    strictEqual(t.Right, 4, "Full (Right)");
    strictEqual(t.Bottom, 6, "Full (Bottom)");
});

test("CornerRadius", () => {
    var cr = <CornerRadius>Fayde.ConvertAnyToType(1, CornerRadius);
    strictEqual(cr.TopLeft, 1, "Number (TopLeft)");
    strictEqual(cr.TopRight, 1, "Number (Top)");
    strictEqual(cr.BottomRight, 1, "Number (BottomRight)");
    strictEqual(cr.BottomLeft, 1, "Number (BottomLeft)");

    cr = <CornerRadius>Fayde.ConvertAnyToType("2", CornerRadius);
    strictEqual(cr.TopLeft, 2, "Uniform (TopLeft)");
    strictEqual(cr.TopRight, 2, "Uniform (TopRight)");
    strictEqual(cr.BottomRight, 2, "Uniform (BottomRight)");
    strictEqual(cr.BottomLeft, 2, "Uniform (BottomLeft)");

    cr = <CornerRadius>Fayde.ConvertAnyToType("0, 2, 4, 6", CornerRadius);
    strictEqual(cr.TopLeft, 0, "Full (TopLeft)");
    strictEqual(cr.TopRight, 2, "Full (TopRight)");
    strictEqual(cr.BottomRight, 4, "Full (BottomRight)");
    strictEqual(cr.BottomLeft, 6, "Full (BottomLeft)");
});

test("Point", () => {
    var p = <Point>Fayde.ConvertAnyToType("1, 3", Point);
    strictEqual(p.X, 1, "Point.X");
    strictEqual(p.Y, 3, "Point.Y");
});

test("Length", () => {
    var l = <number>Fayde.ConvertAnyToType("Auto", Length);
    ok(isNaN(l), "Auto");

    l = <number>Fayde.ConvertAnyToType("234", Length);
    strictEqual(l, 234, "Number");
});

test("RepeatBehavior", () => {
    var RepeatBehavior = Fayde.Media.Animation.RepeatBehavior;

    var rb = <Fayde.Media.Animation.RepeatBehavior>Fayde.ConvertAnyToType("Forever", RepeatBehavior);
    ok(rb.IsForever, "Forever");

    rb = <Fayde.Media.Animation.RepeatBehavior>Fayde.ConvertAnyToType("2x", RepeatBehavior);
    ok(rb.HasCount, "HasCount");
    strictEqual(rb.Count, 2, "Count");

    rb = <Fayde.Media.Animation.RepeatBehavior>Fayde.ConvertAnyToType("00:10:15.02", RepeatBehavior);
    ok(rb.HasDuration, "HasDuration");
    ok(rb.Duration.HasTimeSpan, "HasTimeSpan");
    var ts = rb.Duration.TimeSpan;
    strictEqual(ts.CompareTo(TimeSpan.FromArgs(0, 0, 10, 15, 20)), 0, "TimeSpan");
 
});

test("GridLength", () => {
    var GridLength = Fayde.Controls.GridLength;
    var GridUnitType = Fayde.Controls.GridUnitType;

    var gl = <Fayde.Controls.GridLength>Fayde.ConvertAnyToType("Auto", GridLength);
    strictEqual(gl.Type, GridUnitType.Auto, "Auto GridLength");
    gl = <Fayde.Controls.GridLength>Fayde.ConvertAnyToType("3*", GridLength);
    strictEqual(gl.Type, GridUnitType.Star, "Star GridLength Type");
    strictEqual(gl.Value, 3, "Star GridLength Value");
    gl = <Fayde.Controls.GridLength>Fayde.ConvertAnyToType("25", GridLength);
    strictEqual(gl.Type, GridUnitType.Pixel, "Pixel GridLength Type");
    strictEqual(gl.Value, 25, "Pixel GridLength Value");
});

test("KeyTime", () => {
    var kt = <KeyTime>Fayde.ConvertAnyToType("Uniform", KeyTime);
    ok(kt.IsUniform, "Uniform");

    kt = <KeyTime>Fayde.ConvertAnyToType("02:03:04", KeyTime);
    strictEqual(kt.TimeSpan.CompareTo(TimeSpan.FromArgs(0, 2, 3, 4, 0)), 0, "TimeSpan");
});

test("Duration", () => {
    var d = <Duration>Fayde.ConvertAnyToType("Automatic", Duration);
    strictEqual(d, Duration.Automatic, "Automatic");

    var d = <Duration>Fayde.ConvertAnyToType("Forever", Duration);
    strictEqual(d, Duration.Forever, "Forever");

    d = <Duration>Fayde.ConvertAnyToType("02:03:04", Duration);
    strictEqual(d.TimeSpan.CompareTo(TimeSpan.FromArgs(0, 2, 3, 4, 0)), 0, "TimeSpan");
});

test("Brush", () => {
    strictEqual(<Fayde.Media.SolidColorBrush>Fayde.ConvertAnyToType(undefined, Fayde.Media.SolidColorBrush), undefined, "undefined");
    strictEqual(<Fayde.Media.SolidColorBrush>Fayde.ConvertAnyToType(null, Fayde.Media.SolidColorBrush), undefined, "null");

    var scb = <Fayde.Media.SolidColorBrush>Fayde.ConvertAnyToType("White", Fayde.Media.Brush);
    ok(scb.Color.Equals(Color.KnownColors.White), "Known Color");

    scb = <Fayde.Media.SolidColorBrush>Fayde.ConvertAnyToType("#808080", Fayde.Media.Brush);
    ok(scb.Color.Equals(Color.FromRgba(128, 128, 128, 1.0)), "Hex");
});

test("FontFamily", () => {
    var ff = <FontFamily>Fayde.ConvertAnyToType("Segoe UI", FontFamily);
    equal(ff.FamilyNames, "Segoe UI", "Normal");
});

test("ImageSource", () => {
    var bi = <Fayde.Media.Imaging.BitmapImage>Fayde.ConvertAnyToType("http://domain/rawr.jpg", Fayde.Media.Imaging.ImageSource);
    var us = bi.UriSource;
    ok(us != null, "UriSource exists");
    strictEqual(us.toString(), "http://domain/rawr.jpg", "Uri");
});

test("PointCollection", () => {
    var str = "1,1 2,2 3,3 4,4 5,5";
    var coll = <Fayde.Shapes.PointCollection>Fayde.ConvertAnyToType(str, Fayde.Shapes.PointCollection);

    strictEqual(coll.Count, 5, "Count");
    ok(Point.Equals(new Point(1, 1), coll.GetValueAt(0)), "P1");
    ok(Point.Equals(new Point(2, 2), coll.GetValueAt(1)), "P2");
    ok(Point.Equals(new Point(3, 3), coll.GetValueAt(2)), "P3");
    ok(Point.Equals(new Point(4, 4), coll.GetValueAt(3)), "P4");
    ok(Point.Equals(new Point(5, 5), coll.GetValueAt(4)), "P5");
});

test("Geometry", () => {
    var str = "M1,1 L2,2 Z";
    var geom = <Fayde.Media.PathGeometry>Fayde.ConvertAnyToType(str, Fayde.Media.Geometry);

    ok(geom instanceof Fayde.Media.PathGeometry, "PathGeometry");
    var rawpath = geom._Build();
    strictEqual(rawpath.Serialize(), str, "Serialize");
});