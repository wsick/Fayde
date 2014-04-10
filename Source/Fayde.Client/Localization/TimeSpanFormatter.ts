/// <reference path="../Primitives/TimeSpan.ts" />
/// <reference path="Format.ts" />

module Fayde.Localization {
    RegisterFormattable(TimeSpan, (obj: any, format: string, provider?: any): string => {
        if (obj == null)
            return null;
        if (obj.constructor !== TimeSpan)
            return null;
        if (!format)
            return undefined;
        var res = tryStandardFormat(<TimeSpan>obj, format);
        if (res != undefined)
            return res;
        return tryCustomFormat(<TimeSpan>obj, format);
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
            s += "." + msf(ms, 7);
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
            s += "." + msF(ms, 7);
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
        s += "." + msf(ms, 7);
        if (obj.Ticks < 0)
            s = "-" + s;
        return s;
    };

    function tryCustomFormat(obj: TimeSpan, format: string): string {

        var days = Math.abs(obj.Days);
        var hours = Math.abs(obj.Hours);
        var minutes = Math.abs(obj.Minutes);
        var seconds = Math.abs(obj.Seconds);
        var ms = Math.abs(obj.Milliseconds);

        var len: number;
        var pos = 0;
        var stringBuilder: string[] = [];
        while (pos < format.length) {
            var patternChar = format[pos];
            switch (patternChar) {
                case 'm':
                    len = parseRepeatPattern(format, pos, patternChar);
                    if (len > 2)
                        throw formatError();
                    formatDigits(stringBuilder, minutes, len);
                    break;
                case 's':
                    len = parseRepeatPattern(format, pos, patternChar);
                    if (len > 2)
                        throw formatError();
                    formatDigits(stringBuilder, seconds, len);
                    break;
                case '\\':
                    var num7 = parseNextChar(format, pos);
                    if (num7 < 0)
                        throw formatError();
                    stringBuilder.push(String.fromCharCode(num7));
                    len = 2;
                    break;
                case 'd':
                    len = parseRepeatPattern(format, pos, patternChar);
                    if (len > 8)
                        throw formatError();
                    formatDigits(stringBuilder, days, len, true);
                    break;
                case 'f':
                    len = parseRepeatPattern(format, pos, patternChar);
                    if (len > 7)
                        throw formatError();
                    stringBuilder.push(msf(ms, len));
                    break;
                case 'h':
                    len = parseRepeatPattern(format, pos, patternChar);
                    if (len > 2)
                        throw formatError();
                    formatDigits(stringBuilder, hours, len);
                    break;
                case '"':
                case '\'':
                    len = parseQuoteString(format, pos, stringBuilder);
                    break;
                case '%':
                    var num9 = parseNextChar(format, pos);
                    if (num9 < 0 || num9 === 37)
                        throw formatError();
                    stringBuilder.push(tryCustomFormat(obj, String.fromCharCode(num9)));
                    len = 2;
                    break;
                case 'F':
                    len = parseRepeatPattern(format, pos, patternChar);
                    if (len > 7)
                        throw formatError();
                    stringBuilder.push(msF(ms, len));
                    break;
                default:
                    throw formatError();
            }
            pos += len;
        }
        return stringBuilder.join("");
    }

    function parseRepeatPattern(format: string, pos: number, patternChar: string): number {
        var length = format.length;
        var index = pos + 1;
        var code = patternChar.charCodeAt(0);
        while (index < length && format.charCodeAt(index) === code)
            ++index;
        return index - pos;
    }
    function parseNextChar(format: string, pos: number): number {
        if (pos >= format.length - 1)
            return -1;
        return format.charCodeAt(pos + 1);
    }
    function parseQuoteString(format: string, pos: number, result: string[]): number {
        var length = format.length;
        var num = pos;
        var ch1 = format[pos++];
        var flag = false;
        var special = String.fromCharCode(92);
        while (pos < length) {
            var ch2 = format[pos++];
            if (ch2 === ch1) {
                flag = true;
                break;
            } else if (ch2 === special) {
                if (pos >= length)
                    throw new FormatException("Invalid format string.");
                result.push(format[pos++]);
            } else
                result.push(ch2);
        }
        if (flag)
            return pos - num;
        throw new FormatException("Bad quote: " + ch1);
    }
    
    function padded(num: number): string {
        var s = Math.abs(num).toString();
        return (s.length === 1) ? "0" + s : s;
    }
    function msf(ms: number, len: number): string {
        var s = Math.abs(ms).toString();
        while (s.length < 3)
            s = "0" + s;
        s += "0000";
        return s.substr(0, len);
    }
    function msF(ms: number, len: number): string {
        var f = msf(ms, len);
        var end = f.length - 1;
        for (; end >= 0; end--) {
            if (f[end] !== "0")
                break;
        }
        return f.slice(0, end + 1);
    }
    function formatDigits(sb: string[], value: number, len: number, overrideLenLimit?: boolean) {
        if (!overrideLenLimit && len > 2)
            len = 2;

        var s = Math.floor(value).toString();
        while (s.length < len)
            s = "0" + s;
        sb.push(s);
    }

    function formatError(): FormatException {
        return new FormatException("Invalid format string.");
    }
}