/// <reference path="../Runtime/Nullstone.ts" />
/// CODE
/// <reference path="TimeSpan.ts" />
var KeyTime = (function () {
    function KeyTime() {
        this._IsPaced = false;
        this._IsUniform = false;
        this._TimeSpan = null;
        this._Percent = 0;
        this.IsValid = true;
    }
    KeyTime.CreateUniform = function CreateUniform() {
        var kt = new KeyTime();
        kt._IsUniform = true;
        return kt;
    };
    KeyTime.CreateTimeSpan = function CreateTimeSpan(ts) {
        var kt = new KeyTime();
        kt._TimeSpan = ts;
        return kt;
    };
    KeyTime.prototype.Clone = function () {
        var kt = new KeyTime();
        kt._TimeSpan = this._TimeSpan;
        kt._IsPaced = this._IsPaced;
        kt._IsUniform = this._IsUniform;
        kt._Percent = this._Percent;
        return kt;
    };
    Object.defineProperty(KeyTime.prototype, "IsPaced", {
        get: function () {
            return this._IsPaced;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KeyTime.prototype, "IsUniform", {
        get: function () {
            return this._IsUniform;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KeyTime.prototype, "HasTimeSpan", {
        get: function () {
            return this._TimeSpan != null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KeyTime.prototype, "TimeSpan", {
        get: function () {
            return this._TimeSpan;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KeyTime.prototype, "HasPercent", {
        get: function () {
            return this._Percent != null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KeyTime.prototype, "Percent", {
        get: function () {
            return this._Percent;
        },
        enumerable: true,
        configurable: true
    });
    return KeyTime;
})();
Nullstone.RegisterType(KeyTime, "KeyTime");
//@ sourceMappingURL=KeyTime.js.map
