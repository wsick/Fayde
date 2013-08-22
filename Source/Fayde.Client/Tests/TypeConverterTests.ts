/// <reference path="qunit-1.10.0.d.ts" />

QUnit.module("Type Converter Tests");

test("Primitives", () => {
    strictEqual(Fayde.ConvertAnyToType("1", Number), 1, "Integer conversion");
    strictEqual(Fayde.ConvertAnyToType("1.2", Number), 1.2, "Decimal conversion");
});

test("Color", () => {
    var c = <Color>Fayde.ConvertAnyToType("White", Color);
    strictEqual(c, Color.KnownColors.White, "Known Color");

    c = <Color>Fayde.ConvertAnyToType("#0066CC", Color);
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