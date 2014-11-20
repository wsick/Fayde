import GridLength = Fayde.Controls.GridLength;
import GridUnitType = minerva.controls.grid.GridUnitType;

export function load() {
    QUnit.module("Type Converter Tests");

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
        strictEqual(ts.CompareTo(new TimeSpan(1, 2, 3, 4, 100)), 0, "Full TimeSpan");

        ts = <TimeSpan>Fayde.ConvertAnyToType("02:03:04", TimeSpan);
        strictEqual(ts.CompareTo(new TimeSpan(0, 2, 3, 4, 0)), 0, "Short TimeSpan");

        ts = <TimeSpan>Fayde.ConvertAnyToType("01.02:03:04", TimeSpan);
        strictEqual(ts.CompareTo(new TimeSpan(1, 2, 3, 4, 0)), 0, "Short+Days TimeSpan");

        ts = <TimeSpan>Fayde.ConvertAnyToType("02:03:04.10", TimeSpan);
        strictEqual(ts.CompareTo(new TimeSpan(0, 2, 3, 4, 100)), 0, "Short+Milliseconds TimeSpan");

        ts = <TimeSpan>Fayde.ConvertAnyToType("00:00:00.001", TimeSpan);
        strictEqual(ts.Ticks, 1, "Ticks (decimal seconds)");

        ts = <TimeSpan>Fayde.ConvertAnyToType(1000, TimeSpan);
        strictEqual(ts.Ticks, 1000, "Ticks (Number)");

        ts = <TimeSpan>Fayde.ConvertAnyToType("1000", TimeSpan);
        strictEqual(ts.Ticks, 1000, "Ticks (String)");
    });

    test("Thickness", () => {
        var t = <Thickness>Fayde.ConvertAnyToType(1, Thickness);
        strictEqual(t.left, 1, "Number (Left)");
        strictEqual(t.top, 1, "Number (Top)");
        strictEqual(t.right, 1, "Number (Right)");
        strictEqual(t.bottom, 1, "Number (Bottom)");

        t = <Thickness>Fayde.ConvertAnyToType("2", Thickness);
        strictEqual(t.left, 2, "Uniform (Left)");
        strictEqual(t.top, 2, "Uniform (Top)");
        strictEqual(t.right, 2, "Uniform (Right)");
        strictEqual(t.bottom, 2, "Uniform (Bottom)");

        t = <Thickness>Fayde.ConvertAnyToType("4,6", Thickness);
        strictEqual(t.left, 4, "Mid (Left)");
        strictEqual(t.top, 6, "Mid (Top)");
        strictEqual(t.right, 4, "Mid (Right)");
        strictEqual(t.bottom, 6, "Mid (Bottom)");

        t = <Thickness>Fayde.ConvertAnyToType("0, 2, 4, 6", Thickness);
        strictEqual(t.left, 0, "Full (Left)");
        strictEqual(t.top, 2, "Full (Top)");
        strictEqual(t.right, 4, "Full (Right)");
        strictEqual(t.bottom, 6, "Full (Bottom)");
    });

    test("CornerRadius", () => {
        var cr = <CornerRadius>Fayde.ConvertAnyToType(1, CornerRadius);
        strictEqual(cr.topLeft, 1, "Number (TopLeft)");
        strictEqual(cr.topRight, 1, "Number (Top)");
        strictEqual(cr.bottomRight, 1, "Number (BottomRight)");
        strictEqual(cr.bottomLeft, 1, "Number (BottomLeft)");

        cr = <CornerRadius>Fayde.ConvertAnyToType("2", CornerRadius);
        strictEqual(cr.topLeft, 2, "Uniform (TopLeft)");
        strictEqual(cr.topRight, 2, "Uniform (TopRight)");
        strictEqual(cr.bottomRight, 2, "Uniform (BottomRight)");
        strictEqual(cr.bottomLeft, 2, "Uniform (BottomLeft)");

        cr = <CornerRadius>Fayde.ConvertAnyToType("0, 2, 4, 6", CornerRadius);
        strictEqual(cr.topLeft, 0, "Full (TopLeft)");
        strictEqual(cr.topRight, 2, "Full (TopRight)");
        strictEqual(cr.bottomRight, 4, "Full (BottomRight)");
        strictEqual(cr.bottomLeft, 6, "Full (BottomLeft)");
    });

    test("Point", () => {
        var p = <Point>Fayde.ConvertAnyToType("1, 3", Point);
        strictEqual(p.x, 1, "Point.X");
        strictEqual(p.y, 3, "Point.Y");
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
        strictEqual(ts.CompareTo(new TimeSpan(0, 0, 10, 15, 20)), 0, "TimeSpan");

    });

    test("GridLength", () => {
        var gl = <GridLength>Fayde.ConvertAnyToType("Auto", GridLength);
        strictEqual(gl.Type, GridUnitType.Auto, "Auto GridLength");
        gl = <GridLength>Fayde.ConvertAnyToType("3*", GridLength);
        strictEqual(gl.Type, GridUnitType.Star, "Star GridLength Type");
        strictEqual(gl.Value, 3, "Star GridLength Value");
        gl = <GridLength>Fayde.ConvertAnyToType("25", GridLength);
        strictEqual(gl.Type, GridUnitType.Pixel, "Pixel GridLength Type");
        strictEqual(gl.Value, 25, "Pixel GridLength Value");
    });

    test("KeyTime", () => {
        var kt = <KeyTime>Fayde.ConvertAnyToType("Uniform", KeyTime);
        ok(kt.IsUniform, "Uniform");

        kt = <KeyTime>Fayde.ConvertAnyToType("02:03:04", KeyTime);
        strictEqual(kt.TimeSpan.CompareTo(new TimeSpan(0, 2, 3, 4, 0)), 0, "TimeSpan");
    });

    test("Duration", () => {
        var d = <Duration>Fayde.ConvertAnyToType("Automatic", Duration);
        strictEqual(d, Duration.Automatic, "Automatic");

        var d = <Duration>Fayde.ConvertAnyToType("Forever", Duration);
        strictEqual(d, Duration.Forever, "Forever");

        d = <Duration>Fayde.ConvertAnyToType("02:03:04", Duration);
        strictEqual(d.Type, DurationType.TimeSpan, "TimeSpan #1");
        strictEqual(d.TimeSpan.CompareTo(new TimeSpan(0, 2, 3, 4, 0)), 0, "TimeSpan #2");
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
        ok(Point.isEqual(new Point(1, 1), coll.GetValueAt(0)), "P1");
        ok(Point.isEqual(new Point(2, 2), coll.GetValueAt(1)), "P2");
        ok(Point.isEqual(new Point(3, 3), coll.GetValueAt(2)), "P3");
        ok(Point.isEqual(new Point(4, 4), coll.GetValueAt(3)), "P4");
        ok(Point.isEqual(new Point(5, 5), coll.GetValueAt(4)), "P5");
    });

    test("Geometry", () => {
        var str = "M1,1 L2,2 Z";
        var geom = <Fayde.Media.PathGeometry>Fayde.ConvertAnyToType(str, Fayde.Media.Geometry);

        ok(geom instanceof Fayde.Media.PathGeometry, "PathGeometry");
        var rawpath = geom._Build();
        strictEqual(rawpath.Serialize(), str, "Serialize");
    });

    test("ColumnDefinition", () => {
        var str = "auto * 200";
        var cdc = <Fayde.Controls.ColumnDefinitionCollection>Fayde.ConvertAnyToType(str, Fayde.Controls.ColumnDefinitionCollection);
        strictEqual(cdc.Count, 3, "1.1");

        var cdw = cdc.GetValueAt(0).Width;
        strictEqual(cdw.Type, GridUnitType.Auto, "1.2");

        cdw = cdc.GetValueAt(1).Width;
        strictEqual(cdw.Type, GridUnitType.Star, "1.3");
        strictEqual(cdw.Value, 1, "1.4");

        cdw = cdc.GetValueAt(2).Width;
        strictEqual(cdw.Type, GridUnitType.Pixel, "1.5");
        strictEqual(cdw.Value, 200, "1.6");


        str = "3* 100 auto";
        cdc = <Fayde.Controls.ColumnDefinitionCollection>Fayde.ConvertAnyToType(str, Fayde.Controls.ColumnDefinitionCollection);
        strictEqual(cdc.Count, 3, "2.1");

        cdw = cdc.GetValueAt(0).Width;
        strictEqual(cdw.Type, GridUnitType.Star, "2.2");
        strictEqual(cdw.Value, 3, "2.3");

        cdw = cdc.GetValueAt(1).Width;
        strictEqual(cdw.Type, GridUnitType.Pixel, "2.4");
        strictEqual(cdw.Value, 100, "2.5");

        cdw = cdc.GetValueAt(2).Width;
        strictEqual(cdw.Type, GridUnitType.Auto, "2.6");


        str = "*";
        cdc = <Fayde.Controls.ColumnDefinitionCollection>Fayde.ConvertAnyToType(str, Fayde.Controls.ColumnDefinitionCollection);
        strictEqual(cdc.Count, 1, "3.1");

        cdw = cdc.GetValueAt(0).Width;
        strictEqual(cdw.Type, GridUnitType.Star, "3.2");
        strictEqual(cdw.Value, 1, "3.3");


        str = "auto";
        cdc = <Fayde.Controls.ColumnDefinitionCollection>Fayde.ConvertAnyToType(str, Fayde.Controls.ColumnDefinitionCollection);
        strictEqual(cdc.Count, 1, "4.1");

        cdw = cdc.GetValueAt(0).Width;
        strictEqual(cdw.Type, GridUnitType.Auto, "4.2");


        str = "150";
        cdc = <Fayde.Controls.ColumnDefinitionCollection>Fayde.ConvertAnyToType(str, Fayde.Controls.ColumnDefinitionCollection);
        strictEqual(cdc.Count, 1, "5.1");

        cdw = cdc.GetValueAt(0).Width;
        strictEqual(cdw.Type, GridUnitType.Pixel, "5.2");
        strictEqual(cdw.Value, 150, "5.3");
    });

    test("RowDefinition", () => {
        var str = "auto * 200";
        var rdc = <Fayde.Controls.RowDefinitionCollection>Fayde.ConvertAnyToType(str, Fayde.Controls.RowDefinitionCollection);
        strictEqual(rdc.Count, 3, "1.1");

        var rdh = rdc.GetValueAt(0).Height;
        strictEqual(rdh.Type, GridUnitType.Auto, "1.2");

        rdh = rdc.GetValueAt(1).Height;
        strictEqual(rdh.Type, GridUnitType.Star, "1.3");
        strictEqual(rdh.Value, 1, "1.4");

        rdh = rdc.GetValueAt(2).Height;
        strictEqual(rdh.Type, GridUnitType.Pixel, "1.5");
        strictEqual(rdh.Value, 200, "1.6");


        str = "3* 100 auto";
        rdc = <Fayde.Controls.RowDefinitionCollection>Fayde.ConvertAnyToType(str, Fayde.Controls.RowDefinitionCollection);
        strictEqual(rdc.Count, 3, "2.1");

        rdh = rdc.GetValueAt(0).Height;
        strictEqual(rdh.Type, GridUnitType.Star, "2.2");
        strictEqual(rdh.Value, 3, "2.3");

        rdh = rdc.GetValueAt(1).Height;
        strictEqual(rdh.Type, GridUnitType.Pixel, "2.4");
        strictEqual(rdh.Value, 100, "2.5");

        rdh = rdc.GetValueAt(2).Height;
        strictEqual(rdh.Type, GridUnitType.Auto, "2.6");


        str = "*";
        rdc = <Fayde.Controls.RowDefinitionCollection>Fayde.ConvertAnyToType(str, Fayde.Controls.RowDefinitionCollection);
        strictEqual(rdc.Count, 1, "3.1");

        rdh = rdc.GetValueAt(0).Height;
        strictEqual(rdh.Type, GridUnitType.Star, "3.2");
        strictEqual(rdh.Value, 1, "3.3");


        str = "auto";
        rdc = <Fayde.Controls.RowDefinitionCollection>Fayde.ConvertAnyToType(str, Fayde.Controls.RowDefinitionCollection);
        strictEqual(rdc.Count, 1, "4.1");

        rdh = rdc.GetValueAt(0).Height;
        strictEqual(rdh.Type, GridUnitType.Auto, "4.2");


        str = "150";
        rdc = <Fayde.Controls.RowDefinitionCollection>Fayde.ConvertAnyToType(str, Fayde.Controls.RowDefinitionCollection);
        strictEqual(rdc.Count, 1, "5.1");

        rdh = rdc.GetValueAt(0).Height;
        strictEqual(rdh.Type, GridUnitType.Pixel, "5.2");
        strictEqual(rdh.Value, 150, "5.3");
    });
}