/// <reference path="../Runtime/TypeManagement.ts" />

class TimeSpan {
    static _TicksPerMillisecond = 1;
    static _TicksPerSecond = 1000;
    static _TicksPerMinute = TimeSpan._TicksPerSecond * 60;
    static _TicksPerHour = TimeSpan._TicksPerMinute * 60;
    static _TicksPerDay = TimeSpan._TicksPerHour * 24;

    private _Ticks: number = 0;

    static get Zero(): TimeSpan { return new TimeSpan(); }

    constructor();
    constructor(ticks: number);
    constructor(days: number, hours: number, minutes: number, seconds: number, milliseconds?: number);
    constructor(...args: any[]) {
        if (args.length === 0)
            return;
        if (args.length === 1) {
            this._Ticks = args[0] || 0;
            return;
        }

        var days = args[0] || 0;
        var hours = args[1] || 0;
        var minutes = args[2] || 0;
        var seconds = args[3] || 0;
        var milliseconds = args[4] || 0;
        
        this._Ticks = (days * TimeSpan._TicksPerDay) + (hours * TimeSpan._TicksPerHour) + (minutes * TimeSpan._TicksPerMinute)
            + (seconds * TimeSpan._TicksPerSecond) + (milliseconds * TimeSpan._TicksPerMillisecond);
    }

    get Days(): number { return Math.floor(this._Ticks / TimeSpan._TicksPerDay); }
    get Hours(): number {
        var remTicks = this._Ticks % TimeSpan._TicksPerDay;
        return Math.floor(remTicks / TimeSpan._TicksPerHour);
    }
    get Minutes(): number {
        var remTicks = this._Ticks % TimeSpan._TicksPerDay;
        remTicks = remTicks % TimeSpan._TicksPerHour;
        return Math.floor(remTicks / TimeSpan._TicksPerMinute);
    }
    get Seconds(): number {
        var remTicks = this._Ticks % TimeSpan._TicksPerDay;
        remTicks = remTicks % TimeSpan._TicksPerHour;
        remTicks = remTicks % TimeSpan._TicksPerMinute;
        return Math.floor(remTicks / TimeSpan._TicksPerSecond);
    }
    get Milliseconds(): number {
        var remTicks = this._Ticks % TimeSpan._TicksPerDay;
        remTicks = remTicks % TimeSpan._TicksPerHour;
        remTicks = remTicks % TimeSpan._TicksPerMinute;
        remTicks = remTicks % TimeSpan._TicksPerSecond;
        return Math.floor(remTicks / TimeSpan._TicksPerMillisecond);
    }
    get Ticks(): number { return this._Ticks; }

    get TotalDays(): number { return this._Ticks / TimeSpan._TicksPerDay; }
    get TotalHours(): number { return this._Ticks / TimeSpan._TicksPerHour; }
    get TotalMinutes(): number { return this._Ticks / TimeSpan._TicksPerMinute; }
    get TotalSeconds(): number { return this._Ticks / TimeSpan._TicksPerSecond; }
    get TotalMilliseconds(): number { return this._Ticks / TimeSpan._TicksPerMillisecond; }

    AddTicks(ticks: number) {
        if (ticks == null)
            return;
        if (isNaN(ticks))
            return;
        this._Ticks += ticks;
    }
    AddMilliseconds(milliseconds: number) {
        this.AddTicks(milliseconds * TimeSpan._TicksPerMillisecond);
    }

    Add(ts2: TimeSpan): TimeSpan {
        var ts = new TimeSpan();
        ts._Ticks = this._Ticks + ts2._Ticks;
        return ts;
    }
    Subtract(ts2: TimeSpan): TimeSpan {
        var ts = new TimeSpan();
        ts._Ticks = this._Ticks - ts2._Ticks;
        return ts;
    }
    Multiply(v: number): TimeSpan {
        var ts = new TimeSpan();
        ts._Ticks = Math.round(this._Ticks * v);
        return ts;
    }
    Divide(ts2: TimeSpan): TimeSpan {
        var ts = new TimeSpan();
        ts._Ticks = this._Ticks / ts2._Ticks;
        return ts;
    }
    CompareTo(ts2: TimeSpan): number {
        if (this._Ticks === ts2._Ticks)
            return 0;
        return (this._Ticks > ts2._Ticks) ? 1 : -1;
    }
    IsZero(): boolean {
        return this._Ticks === 0;
    }

    GetJsDelay(): number {
        return this._Ticks * TimeSpan._TicksPerMillisecond;
    }
}
Fayde.RegisterType(TimeSpan, "window", Fayde.XMLNSX);

Fayde.RegisterTypeConverter(TimeSpan, (val: any): TimeSpan => {
    if (val instanceof TimeSpan)
        return <TimeSpan>val;
    if (typeof val === "number")
        return new TimeSpan(<number>val);
    val = val.toString();

    var tokens = val.split(":");
    if (tokens.length === 1) {
        var ticks = parseFloat(val);
        if (!isNaN(ticks))
            return new TimeSpan(<number>ticks);
        throw new Exception("Invalid TimeSpan format '" + val + "'.");
    }

    if (tokens.length !== 3)
        throw new Exception("Invalid TimeSpan format '" + val + "'.");

    /// [days.]hours:minutes:seconds[.fractionalSeconds]
    var days = 0;
    var hours: number;
    var minutes: number;
    var seconds: number;
    var milliseconds = 0;

    var daysplit = tokens[0].split(".");
    if (daysplit.length === 2) {
        days = parseInt(daysplit[0]);
        hours = parseInt(daysplit[1]);
    } else if (daysplit.length === 1) {
        hours = parseInt(daysplit[0]);
    }

    minutes = parseInt(tokens[1]);

    seconds = parseFloat(tokens[2]);
    milliseconds = seconds % 1;
    seconds = seconds - milliseconds;
    milliseconds *= 1000.0;

    return new TimeSpan(days, hours, minutes, seconds, milliseconds);
});