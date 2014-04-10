/// <reference path="../Runtime/TypeManagement.ts" />

enum DayOfWeek {
    Sunday,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday
}
Fayde.RegisterEnum(DayOfWeek, "DayOfWeek", Fayde.XMLNS);

enum DateTimeKind {
    Local,
    Unspecified,
    Utc
}
Fayde.RegisterEnum(DateTimeKind, "DateTimeKind", Fayde.XMLNS);

class DateTime {
    static get MinValue() { return new DateTime(-8640000000000000); }
    static get MaxValue() { return new DateTime(8640000000000000); }
    static get Now(): DateTime { return new DateTime(new Date().getTime()); }
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

    private _InternalDate: Date = null;
    private _Kind: DateTimeKind;

    constructor();
    constructor(ticks: number);
    constructor(ticks: number, kind: DateTimeKind);
    constructor(year: number, month: number, day: number);
    constructor(year: number, month: number, day: number, hour: number, minute: number, second: number);
    constructor(year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number);
    constructor(year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number, kind: DateTimeKind);
    constructor(...args: any[]) {
        var ticks = null;
        var kind = DateTimeKind.Unspecified;
        var year = 0;
        var month = 0;
        var day = 0;
        var hour = 0;
        var minute = 0;
        var second = 0;
        var millisecond = 0;

        if (args.length === 1) { //Ticks
            ticks = args[0];
        } else if (args.length === 2) { //Ticks,DateTimeKind
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

        if (ticks != null) {
            this._InternalDate = new Date(ticks);
        } else {
            var id = this._InternalDate = new Date();
            id.setFullYear(year, month, day);
            id.setHours(hour);
            id.setMinutes(minute);
            id.setSeconds(second);
            id.setMilliseconds(millisecond);
        }
        switch (kind) {
            case 0:
                this._Kind = DateTimeKind.Local;
                break;
            default:
            case 1:
                this._Kind = DateTimeKind.Unspecified;
                break;
            case 2:
                this._Kind = DateTimeKind.Utc;
                break;
        }
    }

    get Ticks(): number { return this._InternalDate.getTime(); }
    get Kind(): DateTimeKind { return this._Kind; }
    get Date(): DateTime {
        var d = new Date(this._InternalDate.getTime());
        d.setHours(0);
        d.setMinutes(0);
        d.setSeconds(0);
        d.setMilliseconds(0);
        return new DateTime(d.getTime());
    }
    get Day(): number { return this._InternalDate.getDate(); }
    get DayOfWeek(): DayOfWeek { return <DayOfWeek>this._InternalDate.getDay(); }
    get DayOfYear(): number {
        var dt = this.Date;
        var base = new DateTime(dt.Year, 1, 1);
        var diff = new TimeSpan(dt.Ticks - base.Ticks);
        return Math.floor(diff.TotalDays);
    }
    get Hour(): number { return this._InternalDate.getHours(); }
    get Millisecond(): number { return this._InternalDate.getMilliseconds(); }
    get Minute(): number { return this._InternalDate.getMinutes(); }
    get Month(): number { return this._InternalDate.getMonth(); }
    get Second(): number { return this._InternalDate.getSeconds(); }
    get TimeOfDay(): TimeSpan {
        var id = this._InternalDate;
        return new TimeSpan(0, id.getHours(), id.getMinutes(), id.getSeconds(), id.getMilliseconds());
    }
    get Year(): number { return this._InternalDate.getFullYear(); }

    Add(value: TimeSpan): DateTime {
        return new DateTime(this.Ticks + value.Ticks);
    }

    Subtract(value: DateTime): TimeSpan;
    Subtract(value: TimeSpan): DateTime;
    Subtract(value: any): any {
        if (value instanceof DateTime) {
            return new TimeSpan(this.Ticks - (<DateTime>value).Ticks);
        } else if (value instanceof TimeSpan) {
            return new DateTime(this.Ticks - (<TimeSpan>value).Ticks);
        }
        return new DateTime(this.Ticks);
    }
}
Fayde.RegisterType(DateTime, "Fayde", Fayde.XMLNS);