/// <reference path="../lib/qunit/qunit.d.ts" />
/// <reference path="../lib/Fayde/Fayde.d.ts" />

export function run() {
    QUnit.module("Primitives Tests");

    test("size", () => {
        var s = size.fromRaw(125, 250);
        strictEqual(s.Width, 125, "FromRaw should properly set width.");
        strictEqual(s.Height, 250, "FromRaw should properly set height.");

        ok(!size.isEqual(size.fromRaw(0, 0), size.fromRaw(0, 120)), "Sizes should not be equal.");
        ok(!size.isEqual(size.fromRaw(0, 0), size.fromRaw(120, 0)), "Sizes should not be equal.");
        ok(!size.isEqual(size.fromRaw(0, 0), size.fromRaw(120, 120)), "Sizes should not be equal.");
        ok(size.isEqual(size.fromRaw(120, 120), size.fromRaw(120, 120)), "Sizes should be equal.");

        var s2 = s.Clone();
        notStrictEqual(s2, s, "Cloned object should be the same reference.");
        strictEqual(s2.Width, s.Width, "Cloned width should match.");
        strictEqual(s2.Height, s.Height, "Cloned height should match.");
        ok(size.isEqual(s, s2), "Cloned object isEqual should be true.");

        s = size.createInfinite();
        ok(size.isEqual(s, size.fromRaw(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY)), "createInfinite size should be Infinity,Infinity.");

        s = size.createNegativeInfinite();
        ok(size.isEqual(s, size.fromRaw(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY)), "createNegativeInfinite size should be -Infinity,-Infinity.");

        size.clear(s);
        ok(size.isEqual(s, size.fromRaw(0, 0)), "Size should be 0,0 after clear.");

        s = size.growBy(s, 10, 20);
        ok(size.isEqual(s, size.fromRaw(10, 20)), "Size should be 10,20 after growBy.");

        s = size.growByThickness(s, new Thickness(5, 10, 5, 10));
        ok(size.isEqual(s, size.fromRaw(20, 40)), "Size should be 20,40 after growByThickness.");

        s = size.shrinkByThickness(s, new Thickness(5, 10, 5, 10));
        ok(size.isEqual(s, size.fromRaw(10, 20)), "Size should be 10,20 after shrinkByThickness.");

        s = size.shrinkBy(s, 10, 20);
        ok(size.isEqual(s, size.fromRaw(0, 0)), "Size should be 0,0 after shrinkBy.");

        var s3 = size.fromRaw(125, 250);
        var s4 = size.fromRaw(300, 100);
        size.min(s3, s4);
        ok(s3.Width === 125 && s3.Height === 100, "Min of 125,250 & 300,100 should be 125,100.");

        s3 = size.fromRaw(125, 250);
        s4 = size.fromRaw(300, 100);
        size.max(s3, s4);
        ok(s3.Width === 300 && s3.Height === 250, "Max of 125,250 & 300,100 should be 300,250.");
    });

    test("rect", () => {
        var r = rect.fromSize(size.fromRaw(50, 100));
        strictEqual(r.X, 0, "FromSize should properly set x.");
        strictEqual(r.Y, 0, "FromSize should properly set y.");
        strictEqual(r.Width, 50, "FromSize should properly set width.");
        strictEqual(r.Height, 100, "FromSize should properly set height.");

        var r1 = new rect();
        var r2 = new rect();
        rect.set(r1, 0, 0, 0, 0); rect.set(r2, 0, 0, 0, 1);
        ok(!rect.isEqual(r1, r2), "Rects should not be equal.");
        rect.set(r1, 0, 0, 0, 0); rect.set(r2, 0, 0, 1, 0);
        ok(!rect.isEqual(r1, r2), "Rects should not be equal.");
        rect.set(r1, 0, 0, 0, 0); rect.set(r2, 0, 1, 0, 0);
        ok(!rect.isEqual(r1, r2), "Rects should not be equal.");
        rect.set(r1, 0, 0, 0, 0); rect.set(r2, 1, 0, 0, 0);
        ok(!rect.isEqual(r1, r2), "Rects should not be equal.");
        rect.set(r1, 1, 1, 1, 1); rect.set(r2, 1, 1, 1, 1);
        ok(rect.isEqual(r1, r2), "Rects should be equal.");

        rect.clear(r1);
        strictEqual(r1.X, 0, "X should be 0 when cleared.");
        strictEqual(r1.Y, 0, "Y should be 0 when cleared.");
        strictEqual(r1.Width, 0, "Width should be 0 when cleared.");
        strictEqual(r1.Height, 0, "Height should be 0 when cleared.");

        r1.X = 5;
        r1.Y = 5;
        rect.growBy(r1, 5, 5, 5, 5);
        rect.set(r2, 0, 0, 10, 10);
        ok(rect.isEqual(r1, r2), "Rect should grow by 10,10.");

        rect.growByThickness(r1, new Thickness(5, 5, 5, 5));
        rect.set(r2, -5, -5, 20, 20);
        ok(rect.isEqual(r1, r2), "Rect should grow by 10,10.");

        rect.shrinkByThickness(r1, new Thickness(5, 5, 5, 5));
        rect.set(r2, 0, 0, 10, 10);
        ok(rect.isEqual(r1, r2), "Rect should shrink by 10,10.");

        rect.shrinkBy(r1, 5, 5, 5, 5);
        rect.set(r2, 5, 5, 0, 0);
        ok(rect.isEqual(r1, r2), "Rect should shrink by 10,10.");

        rect.set(r1, 75, 75, 25, 25);
        rect.set(r2, 50, 50, 50, 50);
        rect.extendTo(r1, 50, 50);
        ok(rect.isEqual(r1, r2), "Rect should now include 50,50 increasing total size to 50,50.");

        rect.set(r1, 50, 50, 25, 25);
        rect.set(r2, 50, 50, 50, 50);
        rect.extendTo(r1, 100, 100);
        ok(rect.isEqual(r1, r2), "Rect should now include 100,100 increasing total size to 50,50.");

        rect.set(r1, 50, 50, 50, 50);
        rect.set(r2, 50, 50, 50, 50);
        rect.extendTo(r1, 75, 75);
        ok(rect.isEqual(r1, r2), "Rect should now be unchanged including 75,75.");

        var r3 = new rect();

        rect.set(r3, 50, 50, 25, 25);
        rect.set(r1, 25, 25, 50, 50);
        rect.set(r2, 50, 50, 50, 50);
        rect.intersection(r1, r2);
        ok(rect.isEqual(r1, r3), "Intersection of 25,25,50,50 and 50,50,50,50 should be 50,50,25,25");

        rect.set(r3, 25, 25, 75, 75);
        rect.set(r1, 25, 25, 50, 50);
        rect.set(r2, 50, 50, 50, 50);
        rect.union(r1, r2);
        ok(rect.isEqual(r1, r3), "Union of 25,25,50,50 and 50,50,50,50 should be 25,25,75,75");
    });

    test("DateTime", () => {
        var d: DateTime;

        d = new DateTime();
        strictEqual(d.Ticks, 0, "ctor1");

        d = new DateTime(1000);
        strictEqual(d.Ticks, 1000, "ctor2 ticks");

        d = new DateTime(1000, DateTimeKind.Local);
        strictEqual(d.Ticks, 1000, "ctor3 ticks");
        strictEqual(d.Kind, DateTimeKind.Local, "ctor3 kind");

        d = new DateTime(2000, 1, 2);
        strictEqual(d.Year, 2000, "ctor4 year");
        strictEqual(d.Month, 1, "ctor4 month");
        strictEqual(d.Day, 2, "ctor4 day");

        d = new DateTime(2000, 1, 2, 5, 30, 45);
        strictEqual(d.Year, 2000, "ctor5 year");
        strictEqual(d.Month, 1, "ctor5 month");
        strictEqual(d.Day, 2, "ctor5 day");
        strictEqual(d.Hour, 5, "ctor5 hour");
        strictEqual(d.Minute, 30, "ctor5 minute");
        strictEqual(d.Second, 45, "ctor5 second");

        d = new DateTime(2000, 1, 2, 5, 30, 45, 500);
        strictEqual(d.Year, 2000, "ctor6 year");
        strictEqual(d.Month, 1, "ctor6 month");
        strictEqual(d.Day, 2, "ctor6 day");
        strictEqual(d.Hour, 5, "ctor6 hour");
        strictEqual(d.Minute, 30, "ctor6 minute");
        strictEqual(d.Second, 45, "ctor6 second");
        strictEqual(d.Millisecond, 500, "ctor6 millisecond");

        d = new DateTime(2000, 1, 2, 5, 30, 45, 500, DateTimeKind.Utc);
        strictEqual(d.Year, 2000, "ctor7 year");
        strictEqual(d.Month, 1, "ctor7 month");
        strictEqual(d.Day, 2, "ctor7 day");
        strictEqual(d.Hour, 5, "ctor7 hour");
        strictEqual(d.Minute, 30, "ctor7 minute");
        strictEqual(d.Second, 45, "ctor7 second");
        strictEqual(d.Millisecond, 500, "ctor7 millisecond");
        strictEqual(d.Kind, DateTimeKind.Utc, "ctor7 kind");

        d = new DateTime(1397133466779);
        var utc = d.ToUniversalTime();
        strictEqual(utc.Hour, 12, "ToUniversalTime Hour");
    });

    test("Vector", () => {
        var EPSILON = 1e-10;
        function close(a: number, b: number, message: string) {
            ok(Math.abs(a - b) < EPSILON, message + "(" + a + "," + b + ")");
        }
        function vecEqual(v1: number[], v2: number[], message: string) {
            close(v1[0], v2[0], message + ".1");
            close(v1[1], v2[1], message + ".2");
        }

        //normalize
        var n = Vector.normalize([2, 2]);
        vecEqual(n, [Math.SQRT2 / 2, Math.SQRT2 / 2], "#1");
        n = Vector.normalize([0, 5]);
        vecEqual(n, [0.0, 1.0], "#2");


        //reverse
        var r = Vector.reverse([-3, -5]);
        vecEqual(r, [3, 5], "#3");
        r = Vector.reverse([6, 2]);
        vecEqual(r, [-6, -2], "#4");


        //orthogonal
        var o = Vector.orthogonal([1, 1]);
        vecEqual(o, [-1, 1], "#5");
        o = Vector.orthogonal([-1, 1]);
        vecEqual(o, [-1, -1], "#6");
        o = Vector.orthogonal([-1, -1]);
        vecEqual(o, [1, -1], "#7");
        o = Vector.orthogonal([1, -1]);
        vecEqual(o, [1, 1], "#8");


        //rotate
        var rt2_2 = Math.SQRT2 / 2;
        var t = Vector.rotate([1, 0], Math.PI / 4);
        vecEqual(t, [rt2_2, rt2_2], "#9");
        t = Vector.rotate([rt2_2, rt2_2], Math.PI / 4);
        vecEqual(t, [0, 1], "#10");
        t = Vector.rotate([0, 1], Math.PI / 4);
        vecEqual(t, [-rt2_2, rt2_2], "#11");
        t = Vector.rotate([-rt2_2, rt2_2], Math.PI / 4);
        vecEqual(t, [-1, 0], "#12");
        t = Vector.rotate([-1, 0], Math.PI / 4);
        vecEqual(t, [-rt2_2, -rt2_2], "#13");


        //angle between
        var b = Vector.angleBetween([1, 0], [rt2_2, rt2_2]);
        close(b, Math.PI / 4, "#14");
        b = Vector.angleBetween([1, 0], [-rt2_2, rt2_2]);
        close(b, 3 * Math.PI / 4, "#15");
        b = Vector.angleBetween([1, 0], [-rt2_2, -rt2_2]);
        close(b, 3 * Math.PI / 4, "#16");
    });
}