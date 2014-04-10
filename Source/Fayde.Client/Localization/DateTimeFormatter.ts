/// <reference path="../Primitives/DateTime.ts" />
/// <reference path="Format.ts" />

module Fayde.Localization {
    RegisterFormattable(DateTime, (obj: any, format: string, provider?: any): string => {
        if (obj == null)
            return null;
        if (obj.constructor !== DateTime)
            return null;
        var res = tryStandardFormat(<DateTime>obj, format);
        if (res != undefined)
            return res;
        return format;
    });

    // Standard Formats
    // d        Short date
    // D        Long date
    // f        Full date/time (short time)
    // F        Full date/time (long time)
    // g        General date/time (short time)
    // G        General date/time (long time)
    // M, m     Month/day
    // R, r     RFC1123
    // s        Sortable date/time
    // t        Short time
    // T        Long time
    // u        Universal sortable date/time
    // U        Universal full date/time
    // Y, y     Year month

    function tryStandardFormat(obj: DateTime, format: string): string {
        if (format.length !== 1)
            return undefined;
        var ch = format[0];
        if (!ch)
            return undefined;
        var f = standardFormatters[ch];
        if (!f)
            return undefined;
        return f(obj);
    }
    interface IStandardFormatter {
        (obj: DateTime): string;
    }
    var standardFormatters: IStandardFormatter[] = [];
    standardFormatters["d"] = function (obj: DateTime): string {
        return [
            obj.Month.toString(),
            obj.Day.toString(),
            obj.Year.toString()
        ].join("/");
    };
    standardFormatters["D"] = function (obj: DateTime): string {
        var info = DateTimeFormatInfo.Instance;
        return [
            info.DayNames[obj.DayOfWeek],
            ", ",
            info.MonthNames[obj.Month - 1],
            " ",
            obj.Day.toString(),
            ", ",
            obj.Year.toString()
        ].join("");
    };
    standardFormatters["f"] = function (obj: DateTime): string {
        return [
            standardFormatters["D"](obj),
            standardFormatters["t"](obj)
        ].join(" ");
    };
    standardFormatters["F"] = function (obj: DateTime): string {
        return [
            standardFormatters["D"](obj),
            standardFormatters["T"](obj)
        ].join(" ");
    };
    standardFormatters["g"] = function (obj: DateTime): string {
        return [
            standardFormatters["d"](obj),
            standardFormatters["t"](obj)
        ].join(" ");
    };
    standardFormatters["G"] = function (obj: DateTime): string {
        return [
            standardFormatters["d"](obj),
            standardFormatters["T"](obj)
        ].join(" ");
    };
    standardFormatters["m"] = standardFormatters["M"] = function (obj: DateTime): string {
        var info = DateTimeFormatInfo.Instance;
        return [
            info.MonthNames[obj.Month - 1],
            obj.Day
        ].join(" ");
    };
    standardFormatters["r"] = standardFormatters["R"] = function (obj: DateTime): string {
        var utc = obj.ToUniversalTime();
        var info = DateTimeFormatInfo.Instance;
        return [
            info.AbbreviatedDayNames[utc.DayOfWeek],
            ", ",
            utc.Day,
            " ",
            info.AbbreviatedMonthNames[utc.Month-1],
            " ",
            utc.Year,
            " ",
            utc.Hour,
            ":",
            utc.Minute,
            ":",
            utc.Second,
            " GMT"
        ].join("");
    };
    standardFormatters["s"] = function (obj: DateTime): string {
        return [
            obj.Year,
            "-",
            padded(obj.Month),
            "-",
            padded(obj.Day),
            "T",
            padded(obj.Hour),
            ":",
            padded(obj.Minute),
            ":",
            padded(obj.Second)

        ].join("");
    };
    standardFormatters["t"] = function (obj: DateTime): string {
        var info = DateTimeFormatInfo.Instance;
        var hour = obj.Hour;
        var desig = info.AMDesignator;
        if (hour > 12) {
            hour -= 12;
            desig = info.PMDesignator;
        }
        return [
            hour.toString(),
            ":",
            obj.Minute.toString(),
            " ",
            desig
        ].join("");
    };
    standardFormatters["T"] = function (obj: DateTime): string {
        var info = DateTimeFormatInfo.Instance;
        var hour = obj.Hour;
        var desig = info.AMDesignator;
        if (hour > 12) {
            hour -= 12;
            desig = info.PMDesignator;
        }
        return [
            hour.toString(),
            ":",
            obj.Minute.toString(),
            ":",
            obj.Second.toString(),
            " ",
            desig
        ].join("");
    };
    standardFormatters["u"] = function (obj: DateTime): string {
        return [
            obj.Year.toString(),
            "-",
            padded(obj.Month),
            "-",
            padded(obj.Day),
            " ",
            padded(obj.Hour),
            ":",
            padded(obj.Minute),
            ":",
            padded(obj.Second),
            "Z"
        ].join("");
    };
    standardFormatters["U"] = function (obj: DateTime): string {
        var info = DateTimeFormatInfo.Instance;
        var hour = obj.Hour;
        var desig = info.AMDesignator;
        if (hour > 12) {
            hour -= 12;
            desig = info.PMDesignator;
        }
        return [
            info.DayNames[obj.DayOfWeek],
            ", ",
            info.MonthNames[obj.Month-1],
            " ",
            obj.Day.toString(),
            ", ",
            obj.Year.toString(),
            " ",
            hour.toString(),
            ":",
            obj.Minute.toString(),
            ":",
            obj.Second.toString(),
            " ",
            desig
        ].join("");
    };
    standardFormatters["y"] = standardFormatters["Y"] = function (obj: DateTime): string {
        var info = DateTimeFormatInfo.Instance;
        return [
            info.MonthNames[obj.Month - 1],
            obj.Year
        ].join(", ");
    };

    function padded(num: number): string {
        return num < 10 ? "0" + num.toString() : num.toString();
    }
}