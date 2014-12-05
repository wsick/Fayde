export function load() {
    QUnit.module("Primitives Tests");

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

        var d1 = DateTime.MinValue;
        var d2 = d1.Date;
        strictEqual(d1.Kind, d2.Kind);
        ok(!isNaN(d2.Ticks));

        d = new DateTime(2014, 2, 3);
        d = d.AddMonths(5);
        strictEqual(DateTime.Compare(d, new DateTime(2014, 7, 3)), 0);
    });

    test("DateTime: DaysInMonth", () => {
        strictEqual(DateTime.DaysInMonth(2014, 1), 31);

        strictEqual(DateTime.DaysInMonth(2012, 2), 29);
        strictEqual(DateTime.DaysInMonth(2013, 2), 28);
        strictEqual(DateTime.DaysInMonth(2014, 2), 28);
        strictEqual(DateTime.DaysInMonth(2015, 2), 28);
        strictEqual(DateTime.DaysInMonth(2016, 2), 29);

        strictEqual(DateTime.DaysInMonth(2014, 3), 31);
        strictEqual(DateTime.DaysInMonth(2014, 4), 30);
        strictEqual(DateTime.DaysInMonth(2014, 5), 31);
        strictEqual(DateTime.DaysInMonth(2014, 6), 30);
        strictEqual(DateTime.DaysInMonth(2014, 7), 31);
        strictEqual(DateTime.DaysInMonth(2014, 8), 31);
        strictEqual(DateTime.DaysInMonth(2014, 9), 30);
        strictEqual(DateTime.DaysInMonth(2014, 10), 31);
        strictEqual(DateTime.DaysInMonth(2014, 11), 30);
        strictEqual(DateTime.DaysInMonth(2014, 12), 31);
    });

}