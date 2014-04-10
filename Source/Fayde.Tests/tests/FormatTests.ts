/// <reference path="../lib/qunit/qunit.d.ts" />
/// <reference path="../lib/Fayde/Fayde.d.ts" />

import Format = Fayde.Localization.Format;

export function run() {
    QUnit.module("Format Tests");

    function ft(format: string, num: number, expected: string) {
        strictEqual(Format(format, num), expected);
    }
    function fdt(format: string, dt: DateTime, expected: string) {
        strictEqual(Format(format, dt), expected);
    }
    function ftt(format: string, ts: TimeSpan, expected: string) {
        strictEqual(Format(format, ts), expected);
    }

    var dt = new DateTime(1397133466779);
    test("Short date", () => {
        fdt("{0:d}", dt, "4/10/2014");
    });
    test("Long date", () => {
        fdt("{0:D}", dt, "Thursday, April 10, 2014");
    });
    test("Full date/time (short time)", () => {
        fdt("{0:f}", dt, "Thursday, April 10, 2014 8:37 AM");
    });
    test("Full date/time (long time)", () => {
        fdt("{0:F}", dt, "Thursday, April 10, 2014 8:37:46 AM");
    });
    test("General date/time (short time)", () => {
        fdt("{0:g}", dt, "4/10/2014 8:37 AM");
    });
    test("General date/time (long time)", () => {
        fdt("{0:G}", dt, "4/10/2014 8:37:46 AM");
    });
    test("Month/day", () => {
        fdt("{0:m}", dt, "April 10");
        fdt("{0:M}", dt, "April 10");
    });
    test("RFC123", () => {
        fdt("{0:r}", dt, "Thu, 10 Apr 2014 12:37:46 GMT");
        fdt("{0:R}", dt, "Thu, 10 Apr 2014 12:37:46 GMT");
    });
    test("Sortable date/time", () => {
        fdt("{0:s}", dt, "2014-04-10T08:37:46");
    });
    test("Short time", () => {
        fdt("{0:t}", dt, "8:37 AM");
    });
    test("Long time", () => {
        fdt("{0:T}", dt, "8:37:46 AM");
    });
    test("Universal sortable date/time", () => {
        fdt("{0:u}", dt, "2014-04-10 08:37:46Z");
    });
    test("Universal full date/time", () => {
        fdt("{0:U}", dt, "Thursday, April 10, 2014 8:37:46 AM");
    });
    test("Year month", () => {
        fdt("{0:y}", dt, "April, 2014");
        fdt("{0:Y}", dt, "April, 2014");
    });

    test("TimeSpan: Constant", () => {
        ftt("{0:c}", TimeSpan.Zero, "00:00:00");
        ftt("{0:c}", new TimeSpan(0, 0, 30, 0), "00:30:00");
        ftt("{0:c}", new TimeSpan(0, 0, -30, 0), "-00:30:00");
        ftt("{0:c}", new TimeSpan(3, 17, 25, 30, 500), "3.17:25:30.5000000");
    });
    test("TimeSpan: General short", () => {
        ftt("{0:g}", new TimeSpan(1, 3, 16, 50, 500), "1:3:16:50.5");
        ftt("{0:g}", new TimeSpan(-1, -3, -16, -50, -500), "-1:3:16:50.5");
        ftt("{0:g}", new TimeSpan(1, 3, 16, 50, 599), "1:3:16:50.599");
    });
    test("TimeSpan: General long", () => {
        ftt("{0:G}", new TimeSpan(18, 30, 0), "0:18:30:00.0000000");
        ftt("{0:G}", new TimeSpan(-18, -30, 0), "-0:18:30:00.0000000");
    });

    test("Currency", () => {
        ft("{0:c}", 123.456, "$123.46");
        ft("{0:C}", 123.456, "$123.46");

        ft("{0:c3}", 123.456, "$123.456");
        ft("{0:C3}", 123.456, "$123.456");

        ft("{0:c3}", -123.456, "($123.456)");
        ft("{0:C3}", -123.456, "($123.456)");
    });
    test("Decimal", () => {
        ft("{0:d}", 1234, "1234");
        ft("{0:D}", 1234, "1234");

        ft("{0:d}", -1234, "-1234");
        ft("{0:D}", -1234, "-1234");

        ft("{0:d6}", -1234, "-001234");
        ft("{0:D6}", -1234, "-001234");
    });
    test("Exponential", () => {
        ft("{0:e}", 1052.0329112756, "1.052033e+003");
        ft("{0:E}", 1052.0329112756, "1.052033E+003");
        
        ft("{0:e}", -1052.0329112756, "-1.052033e+003");
        ft("{0:E}", -1052.0329112756, "-1.052033E+003");

        ft("{0:e2}", -1052.0329112756, "-1.05e+003");
        ft("{0:E2}", -1052.0329112756, "-1.05E+003");
    });
    test("Fixed-point", () => {
        ft("{0:f}", 1234.567, "1234.57");
        ft("{0:F}", 1234.567, "1234.57");
        
        ft("{0:f1}", 1234, "1234.0");
        ft("{0:F1}", 1234, "1234.0");

        ft("{0:f4}", -1234.56, "-1234.5600");
        ft("{0:F4}", -1234.56, "-1234.5600");
    });
    test("General", () => {
        ft("{0:g}", -123.456, "-123.456");
        ft("{0:G}", -123.456, "-123.456");

        ft("{0:g4}", 123.4546, "123.5");
        ft("{0:G4}", 123.4546, "123.5");
    });
    test("Number", () => {
        ft("{0:n}", 1234.567, "1,234.57");
        ft("{0:N}", 1234.567, "1,234.57");

        ft("{0:n1}", 1234, "1,234.0");
        ft("{0:N1}", 1234, "1,234.0");
        
        ft("{0:n3}", -1234.56, "-1,234.560");
        ft("{0:N3}", -1234.56, "-1,234.560");
    });
    test("Percent", () => {
        ft("{0:p}", 1, "100.00 %");
        ft("{0:P}", 1, "100.00 %");
        
        ft("{0:p0}", 0.39678, "40 %");
        ft("{0:P0}", 0.39678, "40 %");
        
        ft("{0:p1}", -0.39678, "-39.7 %");
        ft("{0:P1}", -0.39678, "-39.7 %");
    });
    test("Hexadecimal", () => {
        ft("{0:x}", -1, "ff");
        ft("{0:X}", -1, "FF");
        
        ft("{0:x}", 255, "ff");
        ft("{0:X}", 255, "FF");

        ft("{0:x4}", 255, "00ff");
        ft("{0:X4}", 255, "00FF");
        
        ft("{0:x4}", -1, "ffff");
        ft("{0:X4}", -1, "FFFF");
    });
} 