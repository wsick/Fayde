module Fayde.Localization{
    RegisterFormattable(DateTime, (obj: any, format: string, provider?: any): string => {
        if (obj == null)
            return null;
        if (obj.constructor !== DateTime)
            return null;
        var res = tryStandardFormat(<number>obj, format);
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
    
    function tryStandardFormat(obj: number, format: string): string {
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
        (obj: number): string;
    }
    var standardFormatters: IStandardFormatter[] = [];
} 