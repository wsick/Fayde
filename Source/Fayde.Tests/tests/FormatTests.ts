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
    function testCustomTimeSpan(msg: string, ts: TimeSpan, format: string, expected: string) {
        strictEqual(Format(format, ts), expected, msg);
    }

    var dt = new DateTime(1397133466779);
    test("DateTime: Short date", () => {
        fdt("{0:d}", dt, "4/10/2014");
    });
    test("DateTime: Long date", () => {
        fdt("{0:D}", dt, "Thursday, April 10, 2014");
    });
    test("DateTime: Full date/time (short time)", () => {
        fdt("{0:f}", dt, "Thursday, April 10, 2014 8:37 AM");
    });
    test("DateTime: Full date/time (long time)", () => {
        fdt("{0:F}", dt, "Thursday, April 10, 2014 8:37:46 AM");
    });
    test("DateTime: General date/time (short time)", () => {
        fdt("{0:g}", dt, "4/10/2014 8:37 AM");
    });
    test("DateTime: General date/time (long time)", () => {
        fdt("{0:G}", dt, "4/10/2014 8:37:46 AM");
    });
    test("DateTime: Month/day", () => {
        fdt("{0:m}", dt, "April 10");
        fdt("{0:M}", dt, "April 10");
    });
    test("DateTime: RFC123", () => {
        fdt("{0:r}", dt, "Thu, 10 Apr 2014 12:37:46 GMT");
        fdt("{0:R}", dt, "Thu, 10 Apr 2014 12:37:46 GMT");
    });
    test("DateTime: Sortable date/time", () => {
        fdt("{0:s}", dt, "2014-04-10T08:37:46");
    });
    test("DateTime: Short time", () => {
        fdt("{0:t}", dt, "8:37 AM");
    });
    test("DateTime: Long time", () => {
        fdt("{0:T}", dt, "8:37:46 AM");
    });
    test("DateTime: Universal sortable date/time", () => {
        fdt("{0:u}", dt, "2014-04-10 08:37:46Z");
    });
    test("DateTime: Universal full date/time", () => {
        fdt("{0:U}", dt, "Thursday, April 10, 2014 8:37:46 AM");
    });
    test("DateTime: Year month", () => {
        fdt("{0:y}", dt, "April, 2014");
        fdt("{0:Y}", dt, "April, 2014");
    });
    test("DateTime: Custom", () => {
        ok(true, "Not implemented");
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
    test("TimeSpan: Custom", () => {
        var ts1 = new TimeSpan(6, 14, 32, 17, 685);
        var ts2 = new TimeSpan(6, 8, 32, 17, 685);
        var ts3 = new TimeSpan(6, 14, 8, 17, 685);
        var ts4 = new TimeSpan(6, 8, 5, 17, 685);

        testCustomTimeSpan("d,%d", ts1, "{0:%d}", "6");
        testCustomTimeSpan("d,%d", ts1, "{0:d\\.hh\\:mm}", "6.14:32");
        testCustomTimeSpan("dd-dddddddd", ts1, "{0:ddd}", "006");
        testCustomTimeSpan("dd-dddddddd", ts1, "{0:dd\\.hh\\:mm}", "06.14:32");

        testCustomTimeSpan("h,%h", ts1, "{0:%h}", "14");
        testCustomTimeSpan("h,%h", ts1, "{0:hh\\:mm}", "14:32");

        testCustomTimeSpan("hh", ts1, "{0:hh}", "14");
        testCustomTimeSpan("hh", ts2, "{0:hh}", "08");

        testCustomTimeSpan("m,%m", ts3, "{0:%m}", "8");
        testCustomTimeSpan("m,%m", ts3, "{0:h\\:m}", "14:8");

        testCustomTimeSpan("mm", ts3, "{0:mm}", "08");
        testCustomTimeSpan("mm", ts4, "{0:d\\.hh\\:mm\\:ss}", "6.08:05:17");

        var ts5 = new TimeSpan(0, 0, 0, 12, 965);
        testCustomTimeSpan("s,%s", ts5, "{0:%s}", "12");
        testCustomTimeSpan("s,%s", ts5, "{0:s\\.fff}", "12.965");

        var ts6 = new TimeSpan(0, 0, 0, 6, 965);
        testCustomTimeSpan("ss", ts6, "{0:ss}", "06");
        testCustomTimeSpan("ss", ts6, "{0:ss\\.fff}", "06.965");

        var ts7 = new TimeSpan(0, 0, 0, 6, 895);
        testCustomTimeSpan("f,%f", ts7, "{0:f}", "8");
        testCustomTimeSpan("f,%f", ts7, "{0:ss\\.f}", "06.8");

        testCustomTimeSpan("ff", ts7, "{0:ff}", "89");
        testCustomTimeSpan("ff", ts7, "{0:ss\\.ff}", "06.89");

        testCustomTimeSpan("fff", ts7, "{0:fff}", "895");
        testCustomTimeSpan("fff", ts7, "{0:ss\\.fff}", "06.895");
        
        testCustomTimeSpan("ffff", ts7, "{0:ffff}", "8950");
        testCustomTimeSpan("ffff", ts7, "{0:ss\\.ffff}", "06.8950");
        
        testCustomTimeSpan("F,%F", ts7, "{0:%F}", "8");
        testCustomTimeSpan("F,%F", ts7, "{0:ss\\.F}", "06.8");

        testCustomTimeSpan("FF", ts7, "{0:FF}", "89");
        testCustomTimeSpan("FF", ts7, "{0:ss\\.FF}", "06.89");

        testCustomTimeSpan("FFF", ts7, "{0:FFF}", "895");
        testCustomTimeSpan("FFF", ts7, "{0:ss\\.FFF}", "06.895");
        
        testCustomTimeSpan("FFFF", ts7, "{0:FFFF}", "895");
        testCustomTimeSpan("FFFF", ts7, "{0:ss\\.FFFF}", "06.895");
    });

    test("Number: Currency", () => {
        ft("{0:c}", 123.456, "$123.46");
        ft("{0:C}", 123.456, "$123.46");

        ft("{0:c3}", 123.456, "$123.456");
        ft("{0:C3}", 123.456, "$123.456");

        ft("{0:c3}", -123.456, "($123.456)");
        ft("{0:C3}", -123.456, "($123.456)");
    });
    test("Number: Decimal", () => {
        ft("{0:d}", 1234, "1234");
        ft("{0:D}", 1234, "1234");

        ft("{0:d}", -1234, "-1234");
        ft("{0:D}", -1234, "-1234");

        ft("{0:d6}", -1234, "-001234");
        ft("{0:D6}", -1234, "-001234");
    });
    test("Number: Exponential", () => {
        ft("{0:e}", 1052.0329112756, "1.052033e+003");
        ft("{0:E}", 1052.0329112756, "1.052033E+003");
        
        ft("{0:e}", -1052.0329112756, "-1.052033e+003");
        ft("{0:E}", -1052.0329112756, "-1.052033E+003");

        ft("{0:e2}", -1052.0329112756, "-1.05e+003");
        ft("{0:E2}", -1052.0329112756, "-1.05E+003");
    });
    test("Number: Fixed-point", () => {
        ft("{0:f}", 1234.567, "1234.57");
        ft("{0:F}", 1234.567, "1234.57");
        
        ft("{0:f1}", 1234, "1234.0");
        ft("{0:F1}", 1234, "1234.0");

        ft("{0:f4}", -1234.56, "-1234.5600");
        ft("{0:F4}", -1234.56, "-1234.5600");
    });
    test("Number: General", () => {
        ft("{0:g}", -123.456, "-123.456");
        ft("{0:G}", -123.456, "-123.456");

        ft("{0:g4}", 123.4546, "123.5");
        ft("{0:G4}", 123.4546, "123.5");
    });
    test("Number: Number", () => {
        ft("{0:n}", 1234.567, "1,234.57");
        ft("{0:N}", 1234.567, "1,234.57");

        ft("{0:n1}", 1234, "1,234.0");
        ft("{0:N1}", 1234, "1,234.0");
        
        ft("{0:n3}", -1234.56, "-1,234.560");
        ft("{0:N3}", -1234.56, "-1,234.560");
    });
    test("Number: Percent", () => {
        ft("{0:p}", 1, "100.00 %");
        ft("{0:P}", 1, "100.00 %");
        
        ft("{0:p0}", 0.39678, "40 %");
        ft("{0:P0}", 0.39678, "40 %");
        
        ft("{0:p1}", -0.39678, "-39.7 %");
        ft("{0:P1}", -0.39678, "-39.7 %");
    });
    test("Number: Hexadecimal", () => {
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