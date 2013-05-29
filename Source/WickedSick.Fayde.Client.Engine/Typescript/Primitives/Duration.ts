/// <reference path="../Runtime/Nullstone.ts" />
/// CODE
/// <reference path="TimeSpan.ts" />
/// <reference path="../Engine/Exceptions.ts" />

enum DurationType {
    Automatic = 0,
    Forever = 1,
    TimeSpan = 2,
}

class Duration implements ICloneable {
    private _Type: DurationType = DurationType.TimeSpan;
    private _TimeSpan: TimeSpan;

    constructor(ts?: TimeSpan) {
        this._TimeSpan = ts;
    }

    Clone(): Duration {
        var dur = new Duration();
        dur._Type = this._Type;
        dur._TimeSpan = this._TimeSpan;
        return dur;
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

    static Automatic: Duration = (function () { var d = new Duration(); (<any>d)._Type = DurationType.Automatic; return d; })();
    static Forever: Duration = (function () { var d = new Duration(); (<any>d)._Type = DurationType.Forever; return d; })();
}
Nullstone.RegisterType(Duration, "Duration");