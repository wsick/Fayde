/// <reference path="../Runtime/Nullstone.ts" />
/// CODE
/// <reference path="TimeSpan.ts" />
/// <reference path="../Engine/Exceptions.ts" />
var DurationType;
(function (DurationType) {
    DurationType._map = [];
    DurationType.Automatic = 0;
    DurationType.Forever = 1;
    DurationType.TimeSpan = 2;
})(DurationType || (DurationType = {}));
var Duration = (function () {
    function Duration() { }
    Duration.CreateAutomatic = function CreateAutomatic() {
        var d = new Duration();
        d._Type = DurationType.Automatic;
        return d;
    };
    Duration.CreateForever = function CreateForever() {
        var d = new Duration();
        d._Type = DurationType.Forever;
        return d;
    };
    Duration.CreateTimeSpan = function CreateTimeSpan(ts) {
        var d = new Duration();
        d._Type = DurationType.TimeSpan;
        d._TimeSpan = ts;
        return d;
    };
    Object.defineProperty(Duration.prototype, "Type", {
        get: function () {
            return this._Type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Duration.prototype, "TimeSpan", {
        get: function () {
            if(this._Type === DurationType.TimeSpan) {
                return this._TimeSpan;
            }
            throw new InvalidOperationException("");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Duration.prototype, "HasTimeSpan", {
        get: function () {
            return this._Type === DurationType.TimeSpan;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Duration.prototype, "IsForever", {
        get: function () {
            return this._Type === DurationType.Forever;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Duration.prototype, "IsAutomatic", {
        get: function () {
            return this._Type === DurationType.Automatic;
        },
        enumerable: true,
        configurable: true
    });
    return Duration;
})();
Nullstone.RegisterType(Duration, "Duration");
//@ sourceMappingURL=Duration.js.map
