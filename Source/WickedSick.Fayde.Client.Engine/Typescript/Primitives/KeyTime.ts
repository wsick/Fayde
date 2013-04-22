/// <reference path="../Runtime/Nullstone.ts" />
/// CODE
/// <reference path="TimeSpan.ts" />

class KeyTime implements ICloneable {
    private _IsPaced: bool = false;
    private _IsUniform: bool = false;
    private _TimeSpan: TimeSpan = null;
    private _Percent: number = 0;
    IsValid: bool = true;

    static CreateUniform(): KeyTime {
        var kt = new KeyTime();
        kt._IsUniform = true;
        return kt;
    }
    static CreateTimeSpan(ts: TimeSpan): KeyTime {
        var kt = new KeyTime();
        kt._TimeSpan = ts;
        return kt;
    }

    Clone(): KeyTime {
        var kt = new KeyTime();
        kt._TimeSpan = this._TimeSpan;
        kt._IsPaced = this._IsPaced;
        kt._IsUniform = this._IsUniform;
        kt._Percent = this._Percent;
        return kt;
    }

    get IsPaced(): bool { return this._IsPaced; }
    get IsUniform(): bool { return this._IsUniform; }
    get HasTimeSpan(): bool { return this._TimeSpan != null; }
    get TimeSpan(): TimeSpan { return this._TimeSpan; }
    get HasPercent(): bool { return this._Percent != null; }
    get Percent(): number { return this._Percent; }
}
Nullstone.RegisterType(KeyTime, "KeyTime");