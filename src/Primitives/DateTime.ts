/// <reference path="TimeSpan.ts" />

enum DayOfWeek {
    Sunday,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday
}
Fayde.CoreLibrary.addEnum(DayOfWeek, "DayOfWeek");

enum DateTimeKind {
    Unspecified = 0,
    Local = 1,
    Utc = 2
}
Fayde.CoreLibrary.addEnum(DateTimeKind, "DateTimeKind");

class DateTime {
    private static _MinDateTicks: number = -8640000000000000;
    private static _MaxDateTicks: number = 8640000000000000;

    static get MinValue() { return new DateTime(-8640000000000000); }
    static get MaxValue() { return new DateTime(8640000000000000); }
    static get Now(): DateTime { return new DateTime(new Date().getTime(), DateTimeKind.Local); }
    static get Today(): DateTime { return DateTime.Now.Date; }
    static Compare(dt1: DateTime, dt2: DateTime): number {
        var t1 = dt1._InternalDate.getTime();
        var t2 = dt2._InternalDate.getTime();
        if (t1 < t2)
            return -1;
        if (t1 > t2)
            return 1;
        return 0;
    }

    static DaysInMonth(year: number, month: number): number {
        var ticks = new Date(year, (month - 1) + 1, 1).getTime() - TimeSpan._TicksPerDay;
        var dt = new DateTime(ticks);
        return dt.Day;
    }

    private _InternalDate: Date = null;
    private _Kind: DateTimeKind;

    constructor();
    constructor(dt: Date);
    constructor(ticks: number);
    constructor(ticks: number, kind: DateTimeKind);
    constructor(year: number, month: number, day: number);
    constructor(year: number, month: number, day: number, hour: number, minute: number, second: number);
    constructor(year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number);
    constructor(year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number, kind: DateTimeKind);
    constructor(...args: any[]) {
        var ticks: number = null;
        var kind = DateTimeKind.Unspecified;
        var year = 0;
        var month = 0;
        var day = 0;
        var hour = 0;
        var minute = 0;
        var second = 0;
        var millisecond = 0;

        if (args.length === 1) { //Ticks
            var arg0 = args[0];
            if (arg0 instanceof Date) {
                ticks = arg0.getTime();
            } else {
                ticks = args[0];
            }
        } else if (args.length === 2) { //Ticks,Kind
            ticks = args[0];
            kind = args[1];
        } else if (args.length === 3) { //Year,Month,Day
            year = args[0];
            month = args[1];
            day = args[2];
        } else if (args.length === 6) { //Year,Month,Day,Hour,Minute,Second
            year = args[0];
            month = args[1];
            day = args[2];
            hour = args[3];
            minute = args[4];
            second = args[5];
        } else if (args.length === 7) { //Year,Month,Day,Hour,Minute,Second,Millisecond
            year = args[0];
            month = args[1];
            day = args[2];
            hour = args[3];
            minute = args[4];
            second = args[5];
            millisecond = args[6];
        } else if (args.length === 8) { //Year,Month,Day,Hour,Minute,Second,Millisecond,DateTimeKind
            year = args[0];
            month = args[1];
            day = args[2];
            hour = args[3];
            minute = args[4];
            second = args[5];
            millisecond = args[6];
            kind = args[7];
        } else {
            ticks = 0;
        }

        this._Kind = kind || DateTimeKind.Unspecified;
        if (ticks != null) {
            this._InternalDate = new Date(ticks);
            return;
        }
        var id = this._InternalDate = new Date();
        if (this._Kind === DateTimeKind.Utc) {
            id.setUTCFullYear(year, month - 1, day);
            id.setUTCHours(hour);
            id.setUTCMinutes(minute);
            id.setUTCSeconds(second);
            id.setMilliseconds(millisecond);
        } else {
            id.setFullYear(year, month - 1, day);
            id.setHours(hour);
            id.setMinutes(minute);
            id.setSeconds(second);
            id.setMilliseconds(millisecond);
        }
    }

    get Ticks(): number { return this._InternalDate.getTime(); }
    get Kind(): DateTimeKind { return this._Kind; }
    get Date(): DateTime {
        var t = this._InternalDate.getTime();
        if (t <= DateTime._MinDateTicks)
            return new DateTime(DateTime._MinDateTicks);
        var d = new Date(t);
        if (this._Kind === DateTimeKind.Utc) {
            d.setUTCHours(0);
            d.setUTCMinutes(0);
            d.setUTCSeconds(0);
            d.setUTCMilliseconds(0);
        } else {
            d.setHours(0);
            d.setMinutes(0);
            d.setSeconds(0);
            d.setMilliseconds(0);
        }
        return new DateTime(d.getTime(), this._Kind);
    }
    get Day(): number {
        if (this._Kind === DateTimeKind.Utc)
            return this._InternalDate.getUTCDate();
        return this._InternalDate.getDate();
    }
    get DayOfWeek(): DayOfWeek {
        if (this._Kind === DateTimeKind.Utc)
            return <DayOfWeek>this._InternalDate.getUTCDay();
        return <DayOfWeek>this._InternalDate.getDay();
    }
    get DayOfYear(): number {
        var dt = this.Date;
        var base = new DateTime(dt.Year, 1, 1, 0, 0, 0, 0, this.Kind);
        var diff = new TimeSpan(dt.Ticks - base.Ticks);
        return Math.floor(diff.TotalDays);
    }
    get Hour(): number {
        if (this._Kind === DateTimeKind.Utc)
            return this._InternalDate.getUTCHours();
        return this._InternalDate.getHours();
    }
    get Millisecond(): number {
        if (this._Kind === DateTimeKind.Utc)
            return this._InternalDate.getUTCMilliseconds();
        return this._InternalDate.getMilliseconds();
    }
    get Minute(): number {
        if (this._Kind === DateTimeKind.Utc)
            return this._InternalDate.getUTCMinutes();
        return this._InternalDate.getMinutes();
    }
    get Month(): number {
        if (this._Kind === DateTimeKind.Utc)
            return this._InternalDate.getUTCMonth() + 1;
        return this._InternalDate.getMonth() + 1;
    }
    get Second(): number {
        if (this._Kind === DateTimeKind.Utc)
            return this._InternalDate.getUTCSeconds();
        return this._InternalDate.getSeconds();
    }
    get TimeOfDay(): TimeSpan {
        var id = this._InternalDate;
        if (this._Kind === DateTimeKind.Utc)
            return new TimeSpan(0, id.getUTCHours(), id.getUTCMinutes(), id.getUTCSeconds(), id.getUTCMilliseconds());
        return new TimeSpan(0, id.getHours(), id.getMinutes(), id.getSeconds(), id.getMilliseconds());
    }
    get Year(): number {
        if (this._Kind === DateTimeKind.Utc)
            return this._InternalDate.getUTCFullYear();
        return this._InternalDate.getFullYear();
    }

    Add(value: TimeSpan): DateTime {
        return new DateTime(this.Ticks + value.Ticks, this.Kind);
    }

    AddYears(value: number): DateTime {
        if (value < -10000 || value > 10000)
            throw new ArgumentOutOfRangeException("Invalid number of years.");
        return this.AddMonths(value * 12);
    }
    AddMonths(value: number): DateTime {
        var dte = new Date(this.Ticks);
        var ticks = dte.setMonth(dte.getMonth() + value);
        if (isNaN(ticks))
            throw new ArgumentOutOfRangeException("Date out of range.");
        return new DateTime(ticks, this.Kind);
    }
    AddDays(value: number): DateTime {
        return this.AddTicks(value * TimeSpan._TicksPerDay);
    }
    AddHours(value: number): DateTime {
        return this.AddTicks(value * TimeSpan._TicksPerHour);
    }
    AddMinutes(value: number): DateTime {
        return this.AddTicks(value * TimeSpan._TicksPerMinute);
    }
    AddSeconds(value: number): DateTime {
        return this.AddTicks(value * TimeSpan._TicksPerSecond);
    }
    AddMilliseconds(value: number): DateTime {
        return this.AddTicks(value * TimeSpan._TicksPerMillisecond);
    }
    AddTicks(value: number): DateTime {
        var ticks = this.Ticks + value;
        if (DateTime._MinDateTicks > ticks || DateTime._MaxDateTicks < ticks)
            throw new ArgumentOutOfRangeException("Date out of range.");
        return new DateTime(ticks, this.Kind);
    }

    Subtract(value: DateTime): TimeSpan;
    Subtract(value: TimeSpan): DateTime;
    Subtract(value: any): any {
        if (value instanceof DateTime) {
            return new TimeSpan(this.Ticks - value.Ticks);
        } else if (value instanceof TimeSpan) {
            return new DateTime(this.Ticks - value.Ticks, this.Kind);
        }
        return new DateTime(this.Ticks, this.Kind);
    }

    ToUniversalTime(): DateTime {
        if (this.Kind === DateTimeKind.Utc)
            return new DateTime(this.Ticks, DateTimeKind.Utc);
        var id = this._InternalDate;
        return new DateTime(id.getUTCFullYear(), id.getUTCMonth() + 1, id.getUTCDate(), id.getUTCHours(), id.getUTCMinutes(), id.getUTCSeconds(), id.getUTCMilliseconds(), DateTimeKind.Utc);
    }

    toString(format?: string): string {
        if (!format)
            return Fayde.Localization.FormatSingle(this, "s");
        return Fayde.Localization.FormatSingle(this, format);
    }
    valueOf(): Object {
        return this.Ticks;
    }
}
Fayde.CoreLibrary.addPrimitive(DateTime);
nullstone.registerTypeConverter(DateTime, (value: any): any => {
    if (value instanceof DateTime)
        return value;
    if (value instanceof Date)
        return new DateTime(value);
    if (typeof value === "string")
        return new DateTime(Date.parse(value));
    if (typeof value === "number")
        return new DateTime(value);
    throw new Exception("Cannot parse DateTime value '" + value + "'");
});