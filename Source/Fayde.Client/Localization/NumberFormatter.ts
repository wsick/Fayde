module Fayde.Localization{
    RegisterFormattable(Number, (obj: any, format: string, provider?: any): string => {
        if (obj == null)
            return null;
        if (obj.constructor !== Number)
            return null;
        var res = tryStandardFormat(<number>obj, format);
        if (res != undefined)
            return res;
        return format;
    });

    // Standard Formats
    // C or c       Currency
    // D or d       Decimal
    // E or e       Exponential
    // F or f       Fixed-point
    // G or g       General
    // N or n       Number
    // P or p       Percent
    // X or x       Hexadecimal

    function tryStandardFormat(obj: number, format: string): string {
        var ch = format[0];
        if (!ch)
            return undefined;
        var lowerch = ch.toLowerCase();
        if (lowerch < "a" || lowerch > "z")
            return undefined;
        var num = parseInt(format.substr(1));
        if (isNaN(num))
            return undefined;

        var f = standardFormatters[ch] || standardFormatters[lowerch];
        if (!f)
            return undefined;
        return f(obj, num);
    }
    interface IStandardFormatter {
        (obj: number, size: number): string;
    }
    var standardFormatters: IStandardFormatter[] = [];
    standardFormatters["c"] = function (obj: number, size: number): string {
        return obj.toString();
    };
    standardFormatters["d"] = function (obj: number, size: number): string {
        return obj.toString();
    };
    standardFormatters["E"] = function (obj: number, size: number): string {
        return obj.toString();
    };
    standardFormatters["e"] = function (obj: number, size: number): string {
        return obj.toString();
    };
    standardFormatters["f"] = function (obj: number, size: number): string {
        return obj.toString();
    };
    standardFormatters["g"] = function (obj: number, size: number): string {
        return obj.toString();
    };
    standardFormatters["n"] = function (obj: number, size: number): string {
        return obj.toString();
    };
    standardFormatters["p"] = function (obj: number, size: number): string {
        return obj.toString();
    };
    standardFormatters["X"] = function (obj: number, size: number): string {
        return obj.toString(16);
    };
    standardFormatters["x"] = function (obj: number, size: number): string {
        return obj.toString(16);
    };
} 