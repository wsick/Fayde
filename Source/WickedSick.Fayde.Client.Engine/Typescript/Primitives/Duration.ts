/// CODE
/// <reference path="TimeSpan.ts" />
/// <reference path="../Engine/Exceptions.ts" />

enum DurationType {
    Automatic = 0,
    Forever = 1,
    TimeSpan = 2,
}

class Duration {
    static _TypeName = "Duration";

    private _Type: DurationType;
    private _TimeSpan: TimeSpan;

    static CreateAutomatic(): Duration {
        var d = new Duration();
        d._Type = DurationType.Automatic;
        return d;
    }
    static CreateForever(): Duration {
        var d = new Duration();
        d._Type = DurationType.Forever;
        return d;
    }
    static CreateTimeSpan(ts: TimeSpan): Duration {
        var d = new Duration();
        d._Type = DurationType.TimeSpan;
        d._TimeSpan = ts;
        return d;
    }


    get Type(): DurationType { return this._Type; }
    get TimeSpan(): TimeSpan {
        if (this._Type === DurationType.TimeSpan)
            return this._TimeSpan;
        throw new InvalidOperationException("");
    }
    get HasTimeSpan(): bool { return this._Type === DurationType.TimeSpan }
    get IsForever(): bool { return this._Type === DurationType.Forever; }
    get IsAutomatic(): bool { return this._Type === DurationType.Automatic; }
}