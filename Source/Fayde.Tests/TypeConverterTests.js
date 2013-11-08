/// <reference path="scripts/qunit-1.10.0.d.ts" />
/// <reference path="scripts/Fayde.d.ts" />
QUnit.module("Type Converter Tests");

test("Primitives", function () {
    strictEqual(Fayde.ConvertAnyToType("1", Number), 1, "Integer conversion");
    strictEqual(Fayde.ConvertAnyToType("1.2", Number), 1.2, "Decimal conversion");
});

test("Enums", function () {
    strictEqual(Fayde.ConvertAnyToType("Top", (new Enum(Fayde.VerticalAlignment))), Fayde.VerticalAlignment.Top, "String to Enum");
});

test("Color", function () {
    strictEqual(Fayde.ConvertAnyToType(undefined, Color), undefined, "undefined");
    strictEqual(Fayde.ConvertAnyToType(null, Color), undefined, "null");

    var c = Fayde.ConvertAnyToType("White", Color);
    strictEqual(c, Color.KnownColors.White, "Known Color");

    c = Fayde.ConvertAnyToType("#0066CC", Color);
    strictEqual(c.A, 1.0, "RGB (a)");
    strictEqual(c.R, 0, "RGB (R)");
    strictEqual(c.G, 102, "RGB (G)");
    strictEqual(c.B, 204, "RGB (B)");

    c = Fayde.ConvertAnyToType("#CCBB9977", Color);
    strictEqual(c.A, 0.8, "aRGB (a)");
    strictEqual(c.R, 187, "aRGB (R)");
    strictEqual(c.G, 153, "aRGB (G)");
    strictEqual(c.B, 119, "aRGB (B)");
});

test("TimeSpan", function () {
    var ts = Fayde.ConvertAnyToType("01.02:03:04.10", TimeSpan);
    strictEqual(ts.CompareTo(TimeSpan.FromArgs(1, 2, 3, 4, 100)), 0, "Full TimeSpan");

    ts = Fayde.ConvertAnyToType("02:03:04", TimeSpan);
    strictEqual(ts.CompareTo(TimeSpan.FromArgs(0, 2, 3, 4, 0)), 0, "Short TimeSpan");

    ts = Fayde.ConvertAnyToType("01.02:03:04", TimeSpan);
    strictEqual(ts.CompareTo(TimeSpan.FromArgs(1, 2, 3, 4, 0)), 0, "Short+Days TimeSpan");

    ts = Fayde.ConvertAnyToType("02:03:04.10", TimeSpan);
    strictEqual(ts.CompareTo(TimeSpan.FromArgs(0, 2, 3, 4, 100)), 0, "Short+Milliseconds TimeSpan");

    ts = Fayde.ConvertAnyToType(1000, TimeSpan);
    strictEqual(ts.Ticks, 1000, "Ticks (Number)");

    ts = Fayde.ConvertAnyToType("1000", TimeSpan);
    strictEqual(ts.Ticks, 1000, "Ticks (String)");
});

test("Thickness", function () {
    var t = Fayde.ConvertAnyToType(1, Thickness);
    strictEqual(t.Left, 1, "Number (Left)");
    strictEqual(t.Top, 1, "Number (Top)");
    strictEqual(t.Right, 1, "Number (Right)");
    strictEqual(t.Bottom, 1, "Number (Bottom)");

    t = Fayde.ConvertAnyToType("2", Thickness);
    strictEqual(t.Left, 2, "Uniform (Left)");
    strictEqual(t.Top, 2, "Uniform (Top)");
    strictEqual(t.Right, 2, "Uniform (Right)");
    strictEqual(t.Bottom, 2, "Uniform (Bottom)");

    t = Fayde.ConvertAnyToType("4,6", Thickness);
    strictEqual(t.Left, 4, "Mid (Left)");
    strictEqual(t.Top, 6, "Mid (Top)");
    strictEqual(t.Right, 4, "Mid (Right)");
    strictEqual(t.Bottom, 6, "Mid (Bottom)");

    t = Fayde.ConvertAnyToType("0, 2, 4, 6", Thickness);
    strictEqual(t.Left, 0, "Full (Left)");
    strictEqual(t.Top, 2, "Full (Top)");
    strictEqual(t.Right, 4, "Full (Right)");
    strictEqual(t.Bottom, 6, "Full (Bottom)");
});

test("CornerRadius", function () {
    var cr = Fayde.ConvertAnyToType(1, CornerRadius);
    strictEqual(cr.TopLeft, 1, "Number (TopLeft)");
    strictEqual(cr.TopRight, 1, "Number (Top)");
    strictEqual(cr.BottomRight, 1, "Number (BottomRight)");
    strictEqual(cr.BottomLeft, 1, "Number (BottomLeft)");

    cr = Fayde.ConvertAnyToType("2", CornerRadius);
    strictEqual(cr.TopLeft, 2, "Uniform (TopLeft)");
    strictEqual(cr.TopRight, 2, "Uniform (TopRight)");
    strictEqual(cr.BottomRight, 2, "Uniform (BottomRight)");
    strictEqual(cr.BottomLeft, 2, "Uniform (BottomLeft)");

    cr = Fayde.ConvertAnyToType("0, 2, 4, 6", CornerRadius);
    strictEqual(cr.TopLeft, 0, "Full (TopLeft)");
    strictEqual(cr.TopRight, 2, "Full (TopRight)");
    strictEqual(cr.BottomRight, 4, "Full (BottomRight)");
    strictEqual(cr.BottomLeft, 6, "Full (BottomLeft)");
});

test("Point", function () {
    var p = Fayde.ConvertAnyToType("1, 3", Point);
    strictEqual(p.X, 1, "Point.X");
    strictEqual(p.Y, 3, "Point.Y");
});

test("Length", function () {
    var l = Fayde.ConvertAnyToType("Auto", Length);
    ok(isNaN(l), "Auto");

    l = Fayde.ConvertAnyToType("234", Length);
    strictEqual(l, 234, "Number");
});

test("RepeatBehavior", function () {
    var RepeatBehavior = Fayde.Media.Animation.RepeatBehavior;

    var rb = Fayde.ConvertAnyToType("Forever", RepeatBehavior);
    ok(rb.IsForever, "Forever");

    rb = Fayde.ConvertAnyToType("2x", RepeatBehavior);
    ok(rb.HasCount, "HasCount");
    strictEqual(rb.Count, 2, "Count");

    rb = Fayde.ConvertAnyToType("00:10:15.02", RepeatBehavior);
    ok(rb.HasDuration, "HasDuration");
    ok(rb.Duration.HasTimeSpan, "HasTimeSpan");
    var ts = rb.Duration.TimeSpan;
    strictEqual(ts.CompareTo(TimeSpan.FromArgs(0, 0, 10, 15, 20)), 0, "TimeSpan");
});

test("GridLength", function () {
    var GridLength = Fayde.Controls.GridLength;
    var GridUnitType = Fayde.Controls.GridUnitType;

    var gl = Fayde.ConvertAnyToType("Auto", GridLength);
    strictEqual(gl.Type, GridUnitType.Auto, "Auto GridLength");
    gl = Fayde.ConvertAnyToType("3*", GridLength);
    strictEqual(gl.Type, GridUnitType.Star, "Star GridLength Type");
    strictEqual(gl.Value, 3, "Star GridLength Value");
    gl = Fayde.ConvertAnyToType("25", GridLength);
    strictEqual(gl.Type, GridUnitType.Pixel, "Pixel GridLength Type");
    strictEqual(gl.Value, 25, "Pixel GridLength Value");
});

test("KeyTime", function () {
    var kt = Fayde.ConvertAnyToType("Uniform", KeyTime);
    ok(kt.IsUniform, "Uniform");

    kt = Fayde.ConvertAnyToType("02:03:04", KeyTime);
    strictEqual(kt.TimeSpan.CompareTo(TimeSpan.FromArgs(0, 2, 3, 4, 0)), 0, "TimeSpan");
});

test("Duration", function () {
    var d = Fayde.ConvertAnyToType("Automatic", Duration);
    strictEqual(d, Duration.Automatic, "Automatic");

    var d = Fayde.ConvertAnyToType("Forever", Duration);
    strictEqual(d, Duration.Forever, "Forever");

    d = Fayde.ConvertAnyToType("02:03:04", Duration);
    strictEqual(d.TimeSpan.CompareTo(TimeSpan.FromArgs(0, 2, 3, 4, 0)), 0, "TimeSpan");
});

test("Brush", function () {
    strictEqual(Fayde.ConvertAnyToType(undefined, Fayde.Media.SolidColorBrush), undefined, "undefined");
    strictEqual(Fayde.ConvertAnyToType(null, Fayde.Media.SolidColorBrush), undefined, "null");

    var scb = Fayde.ConvertAnyToType("White", Fayde.Media.Brush);
    ok(scb.Color.Equals(Color.KnownColors.White), "Known Color");

    scb = Fayde.ConvertAnyToType("#808080", Fayde.Media.Brush);
    ok(scb.Color.Equals(Color.FromRgba(128, 128, 128, 1.0)), "Hex");
});

test("FontFamily", function () {
    var ff = Fayde.ConvertAnyToType("Segoe UI", FontFamily);
    equal(ff.FamilyNames, "Segoe UI", "Normal");
});

test("ImageSource", function () {
    var bi = Fayde.ConvertAnyToType("http://domain/rawr.jpg", Fayde.Media.Imaging.ImageSource);
    var us = bi.UriSource;
    ok(us != null, "UriSource exists");
    strictEqual(us.toString(), "http://domain/rawr.jpg", "Uri");
});

test("PointCollection", function () {
    var str = "1,1 2,2 3,3 4,4 5,5";
    var coll = Fayde.ConvertAnyToType(str, Fayde.Shapes.PointCollection);

    strictEqual(coll.Count, 5, "Count");
    ok(Point.Equals(new Point(1, 1), coll.GetValueAt(0)), "P1");
    ok(Point.Equals(new Point(2, 2), coll.GetValueAt(1)), "P2");
    ok(Point.Equals(new Point(3, 3), coll.GetValueAt(2)), "P3");
    ok(Point.Equals(new Point(4, 4), coll.GetValueAt(3)), "P4");
    ok(Point.Equals(new Point(5, 5), coll.GetValueAt(4)), "P5");
});

test("Geometry", function () {
    var str = "M1,1 L2,2 Z";
    var geom = Fayde.ConvertAnyToType(str, Fayde.Media.Geometry);

    ok(geom instanceof Fayde.Media.PathGeometry, "PathGeometry");
    var rawpath = geom._Build();
    strictEqual(rawpath.Serialize(), str, "Serialize");
});

test("ColumnDefinition", function () {
    var str = "auto * 200";
    var cdc = Fayde.ConvertAnyToType(str, Fayde.Controls.ColumnDefinitionCollection);
    strictEqual(cdc.Count, 3, "1.1");

    var cdw = cdc.GetValueAt(0).Width;
    strictEqual(cdw.Type, Fayde.Controls.GridUnitType.Auto, "1.2");

    cdw = cdc.GetValueAt(1).Width;
    strictEqual(cdw.Type, Fayde.Controls.GridUnitType.Star, "1.3");
    strictEqual(cdw.Value, 1, "1.4");

    cdw = cdc.GetValueAt(2).Width;
    strictEqual(cdw.Type, Fayde.Controls.GridUnitType.Pixel, "1.5");
    strictEqual(cdw.Value, 200, "1.6");

    str = "3* 100 auto";
    cdc = Fayde.ConvertAnyToType(str, Fayde.Controls.ColumnDefinitionCollection);
    strictEqual(cdc.Count, 3, "2.1");

    cdw = cdc.GetValueAt(0).Width;
    strictEqual(cdw.Type, Fayde.Controls.GridUnitType.Star, "2.2");
    strictEqual(cdw.Value, 3, "2.3");

    cdw = cdc.GetValueAt(1).Width;
    strictEqual(cdw.Type, Fayde.Controls.GridUnitType.Pixel, "2.4");
    strictEqual(cdw.Value, 100, "2.5");

    cdw = cdc.GetValueAt(2).Width;
    strictEqual(cdw.Type, Fayde.Controls.GridUnitType.Auto, "2.6");

    str = "*";
    cdc = Fayde.ConvertAnyToType(str, Fayde.Controls.ColumnDefinitionCollection);
    strictEqual(cdc.Count, 1, "3.1");

    cdw = cdc.GetValueAt(0).Width;
    strictEqual(cdw.Type, Fayde.Controls.GridUnitType.Star, "3.2");
    strictEqual(cdw.Value, 1, "3.3");

    str = "auto";
    cdc = Fayde.ConvertAnyToType(str, Fayde.Controls.ColumnDefinitionCollection);
    strictEqual(cdc.Count, 1, "4.1");

    cdw = cdc.GetValueAt(0).Width;
    strictEqual(cdw.Type, Fayde.Controls.GridUnitType.Auto, "4.2");

    str = "150";
    cdc = Fayde.ConvertAnyToType(str, Fayde.Controls.ColumnDefinitionCollection);
    strictEqual(cdc.Count, 1, "5.1");

    cdw = cdc.GetValueAt(0).Width;
    strictEqual(cdw.Type, Fayde.Controls.GridUnitType.Pixel, "5.2");
    strictEqual(cdw.Value, 150, "5.3");
});

test("RowDefinition", function () {
    var str = "auto * 200";
    var rdc = Fayde.ConvertAnyToType(str, Fayde.Controls.RowDefinitionCollection);
    strictEqual(rdc.Count, 3, "1.1");

    var rdh = rdc.GetValueAt(0).Height;
    strictEqual(rdh.Type, Fayde.Controls.GridUnitType.Auto, "1.2");

    rdh = rdc.GetValueAt(1).Height;
    strictEqual(rdh.Type, Fayde.Controls.GridUnitType.Star, "1.3");
    strictEqual(rdh.Value, 1, "1.4");

    rdh = rdc.GetValueAt(2).Height;
    strictEqual(rdh.Type, Fayde.Controls.GridUnitType.Pixel, "1.5");
    strictEqual(rdh.Value, 200, "1.6");

    str = "3* 100 auto";
    rdc = Fayde.ConvertAnyToType(str, Fayde.Controls.RowDefinitionCollection);
    strictEqual(rdc.Count, 3, "2.1");

    rdh = rdc.GetValueAt(0).Height;
    strictEqual(rdh.Type, Fayde.Controls.GridUnitType.Star, "2.2");
    strictEqual(rdh.Value, 3, "2.3");

    rdh = rdc.GetValueAt(1).Height;
    strictEqual(rdh.Type, Fayde.Controls.GridUnitType.Pixel, "2.4");
    strictEqual(rdh.Value, 100, "2.5");

    rdh = rdc.GetValueAt(2).Height;
    strictEqual(rdh.Type, Fayde.Controls.GridUnitType.Auto, "2.6");

    str = "*";
    rdc = Fayde.ConvertAnyToType(str, Fayde.Controls.RowDefinitionCollection);
    strictEqual(rdc.Count, 1, "3.1");

    rdh = rdc.GetValueAt(0).Height;
    strictEqual(rdh.Type, Fayde.Controls.GridUnitType.Star, "3.2");
    strictEqual(rdh.Value, 1, "3.3");

    str = "auto";
    rdc = Fayde.ConvertAnyToType(str, Fayde.Controls.RowDefinitionCollection);
    strictEqual(rdc.Count, 1, "4.1");

    rdh = rdc.GetValueAt(0).Height;
    strictEqual(rdh.Type, Fayde.Controls.GridUnitType.Auto, "4.2");

    str = "150";
    rdc = Fayde.ConvertAnyToType(str, Fayde.Controls.RowDefinitionCollection);
    strictEqual(rdc.Count, 1, "5.1");

    rdh = rdc.GetValueAt(0).Height;
    strictEqual(rdh.Type, Fayde.Controls.GridUnitType.Pixel, "5.2");
    strictEqual(rdh.Value, 150, "5.3");
});
//# sourceMappingURL=TypeConverterTests.js.map
