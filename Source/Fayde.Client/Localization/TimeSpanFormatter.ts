/// <reference path="../Primitives/TimeSpan.ts" />
/// <reference path="Format.ts" />

module Fayde.Localization {
    RegisterFormattable(TimeSpan, (obj: any, format: string, provider?: any): string => {
        if (obj == null)
            return null;
        if (obj.constructor !== TimeSpan)
            return null;
        var res = tryStandardFormat(<TimeSpan>obj, format);
        if (res != undefined)
            return res;
        return format;
    });
    
    // Standard Formats
    // c        Constant (invariant)
    // g        General short
    // G        General long
    function tryStandardFormat(obj: TimeSpan, format: string): string {
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
        (obj: TimeSpan): string;
    }
    var standardFormatters: IStandardFormatter[] = [];
    standardFormatters["c"] = standardFormatters["t"] = standardFormatters["T"] = function (obj: TimeSpan): string {
        // [-][d’.’]hh’:’mm’:’ss[‘.’fffffff]
        var info = DateTimeFormatInfo.Instance;
        var s = [
            padded(obj.Hours),
            padded(obj.Minutes),
            padded(obj.Seconds)
        ].join(info.TimeSeparator);
        var days = obj.Days;
        if (days)
            s = Math.abs(days) + "." + s;
        var ms = obj.Milliseconds;
        if (ms)
            s += "." + paddedms(ms);
        if (obj.Ticks < 0)
            s = "-" + s;
        return s;
    };
    standardFormatters["g"] = function (obj: TimeSpan): string {
        // [-][d’:’]h’:’mm’:’ss[.FFFFFFF]
        var info = DateTimeFormatInfo.Instance;
        var s = [
            Math.abs(obj.Hours),
            padded(obj.Minutes),
            padded(obj.Seconds)
        ].join(info.TimeSeparator);
        var days = obj.Days;
        if (days)
            s = Math.abs(days) + ":" + s;
        var ms = obj.Milliseconds;
        if (ms)
            s += "." + slimms(ms);
        if (obj.Ticks < 0)
            s = "-" + s;
        return s;
    };
    standardFormatters["G"] = function (obj: TimeSpan): string {
        // [-]d’:’hh’:’mm’:’ss.fffffff
        var info = DateTimeFormatInfo.Instance;
        var s = [
            Math.abs(obj.Days),
            padded(obj.Hours),
            padded(obj.Minutes),
            padded(obj.Seconds)
        ].join(info.TimeSeparator);
        var ms = obj.Milliseconds;
        s += "." + paddedms(ms);
        if (obj.Ticks < 0)
            s = "-" + s;
        return s;
    };

    function padded(num: number): string {
        var s = Math.abs(num).toString();
        return (s.length === 1) ? "0" + s : s;
    }
    function paddedms(num: number): string {
        var s = Math.abs(num).toString();
        while (s.length < 3)
            s = "0" + s;
        s += "0000";
        return s;
    }
    function slimms(num: number): string {
        var s = paddedms(num);
        var end = s.length - 1;
        for (; end >= 0; end--) {
            if (s[end] !== "0")
                break;
        }
        return s.slice(0, end + 1);
    }
}