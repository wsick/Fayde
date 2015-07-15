export function load() {
    QUnit.module("Primitives/DateTime");

    test("ctor", () => {
        var d: DateTime;

        d = new DateTime();
        strictEqual(d.Ticks, 0, "ctor1");
        strictEqual(d.Kind, DateTimeKind.Unspecified, "ctor1 kind");

        d = new DateTime(1000);
        strictEqual(d.Ticks, 1000, "ctor1 ticks");
        strictEqual(d.Kind, DateTimeKind.Unspecified, "ctor1 kind");

        d = new DateTime(new Date(500));
        strictEqual(d.Ticks, 500, "ctor1 ticks");
        strictEqual(d.Kind, DateTimeKind.Unspecified, "ctor1 kind");

        d = new DateTime(new Date(500), DateTimeKind.Local);
        strictEqual(d.Ticks, 500, "ctor2 ticks");
        strictEqual(d.Kind, DateTimeKind.Local, "ctor2 kind");

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

        d = new DateTime(2014, 7, 14, 6, 12, 0, 0, DateTimeKind.Local);
        var localHourDiff = new Date(2014, 6, 14, 12).getTimezoneOffset() / 60;
        var utc = d.ToUniversalTime();
        var expectedHour = 6 + localHourDiff;
        if (expectedHour < 0) expectedHour += 24;
        else if (expectedHour > 24) expectedHour -= 24;
        strictEqual(utc.Hour, expectedHour, "ToUniversalTime Hour");

        var d1 = DateTime.MinValue;
        throws(() => d1.Date, undefined, "Should throw when exceeding lower bounds of Date.");

        d = new DateTime(2014, 2, 3);
        d = d.AddMonths(5);
        strictEqual(DateTime.Compare(d, new DateTime(2014, 7, 3)), 0);
    });

    test("DaysInMonth", () => {
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

    test("~statics", () => {
        var now = DateTime.Now;
        strictEqual(now.Day, new Date().getDate(), "Now day should match local day");
        strictEqual(now.Kind, DateTimeKind.Local, "Now should be DateTimeKind.Local");

        var today = DateTime.Today;
        strictEqual(today.Day, new Date().getDate(), "Today day should match local day");
        strictEqual(today.Kind, DateTimeKind.Local, "Today should be DateTimeKind.Local");
    });

    test("~converter", () => {
        var now = DateTime.Now;
        var dt1 = nullstone.convertAnyToType(now, DateTime);
        strictEqual(dt1.Ticks, now.Ticks);

        var dt = new Date();
        dt1 = nullstone.convertAnyToType(dt, DateTime);
        strictEqual(dt1.Ticks, dt.getTime());

        dt1 = nullstone.convertAnyToType("Wed, 09 Aug 1995 00:00:00 GMT", DateTime);
        strictEqual(dt1.Ticks, 807926400000);

        dt1 = nullstone.convertAnyToType(1000, DateTime);
        strictEqual(dt1.Ticks, 1000);
    });

    test("AddYears", () => {
        var dt = new DateTime(2015, 11, 1, 1, 0, 0, 0, DateTimeKind.Local);
        var dt2 = dt.AddYears(8);
        strictEqual(dt2.Year, 2023);
        strictEqual(dt2.Month, 11);
        strictEqual(dt2.Day, 1);
    });
    test("AddMonths", () => {
        var dt = new DateTime(2015, 11, 1, 1, 0, 0, 0, DateTimeKind.Local);
        var dt2 = dt.AddMonths(1);
        strictEqual(dt2.Year, 2015);
        strictEqual(dt2.Month, 12);
        strictEqual(dt2.Day, 1);

        dt = new DateTime(2015, 7, 14, 1, 0, 0, 0, DateTimeKind.Local);
        dt2 = dt.AddMonths(48);
        strictEqual(dt2.Year, 2019);
        strictEqual(dt2.Month, 7);
        strictEqual(dt2.Day, 14);
    });
    test("AddDays", () => {
        var dt = new DateTime(2015, 11, 1);
        var dt2 = dt.AddDays(1);
        strictEqual(dt2.Day, 2);

        dt = new DateTime(2015, 7, 14);
        dt2 = dt.AddDays(1);
        strictEqual(dt2.Day, 15);
    });
    test("AddHours", () => {
        var dt = new DateTime(2015, 11, 1, 1, 0, 0, 0, DateTimeKind.Local);
        var dt2 = dt.AddHours(1);
        strictEqual(dt2.Month, 11);
        strictEqual(dt2.Day, 1);
        strictEqual(dt2.Hour, 2);

        dt = new DateTime(2015, 7, 14, 0, 0, 0, 0, DateTimeKind.Local);
        dt2 = dt.AddHours(1);
        strictEqual(dt2.Month, 7);
        strictEqual(dt2.Day, 14);
        strictEqual(dt2.Hour, 1);
    });
    test("AddMinutes", () => {
        var dt = new DateTime(2015, 11, 1, 1, 59, 0, 0, DateTimeKind.Local);
        var dt2 = dt.AddMinutes(1);
        strictEqual(dt2.Day, 1);
        strictEqual(dt2.Hour, 2);
        strictEqual(dt2.Minute, 0);

        dt = new DateTime(2015, 7, 14, 0, 0, 0, 0, DateTimeKind.Local);
        dt2 = dt.AddMinutes(1);
        strictEqual(dt2.Month, 7);
        strictEqual(dt2.Day, 14);
        strictEqual(dt2.Hour, 0);
        strictEqual(dt2.Minute, 1);
    });
    test("AddSeconds", () => {
        var dt = new DateTime(2015, 11, 1, 1, 59, 59, 0, DateTimeKind.Local);
        var dt2 = dt.AddSeconds(1);
        strictEqual(dt2.Day, 1);
        strictEqual(dt2.Hour, 2);
        strictEqual(dt2.Minute, 0);
        strictEqual(dt2.Second, 0);

        dt = new DateTime(2015, 7, 14, 0, 0, 0, 0, DateTimeKind.Local);
        dt2 = dt.AddSeconds(1);
        strictEqual(dt2.Month, 7);
        strictEqual(dt2.Day, 14);
        strictEqual(dt2.Hour, 0);
        strictEqual(dt2.Minute, 0);
        strictEqual(dt2.Second, 1);
    });
    test("AddMilliseconds", () => {
        var dt = new DateTime(2015, 11, 1, 1, 59, 59, 999, DateTimeKind.Local);
        var dt2 = dt.AddMilliseconds(1);
        strictEqual(dt2.Day, 1);
        strictEqual(dt2.Hour, 2);
        strictEqual(dt2.Minute, 0);
        strictEqual(dt2.Second, 0);
        strictEqual(dt2.Millisecond, 0);

        dt = new DateTime(2015, 7, 14, 0, 0, 0, 0, DateTimeKind.Local);
        dt2 = dt.AddMilliseconds(1);
        strictEqual(dt2.Month, 7);
        strictEqual(dt2.Day, 14);
        strictEqual(dt2.Hour, 0);
        strictEqual(dt2.Minute, 0);
        strictEqual(dt2.Second, 0);
        strictEqual(dt2.Millisecond, 1);
    });
}