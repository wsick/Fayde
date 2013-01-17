/// <reference path="../Runtime/Nullstone.js"/>
/// CODE
/// <reference path="TimeSpan.js"/>

(function (namespace) {
    var KeyTime = Nullstone.Create("KeyTime");

    KeyTime.Instance.Init = function () {
        this.IsValid = true;
        //TODO: IsValid is false for coercing from null
    };

    KeyTime.CreateUniform = function () {
        this._IsUniform = true;
    };
    KeyTime.CreateTimeSpan = function (ts) {
        var kt = new KeyTime();
        kt._TimeSpan = ts;
        return kt;
    };

    Nullstone.Property(KeyTime, "IsPaced", {
        get: function () { return this._IsPaced === true; }
    });
    Nullstone.Property(KeyTime, "IsUniform", {
        get: function () { return this._IsUniform === true; }
    });
    Nullstone.Property(KeyTime, "HasTimeSpan", {
        get: function () { return this._TimeSpan != null; }
    });
    Nullstone.Property(KeyTime, "TimeSpan", {
        get: function () { return this._TimeSpan; }
    });
    Nullstone.Property(KeyTime, "HasPercent", {
        get: function () { return this._Percent != null; }
    });
    Nullstone.Property(KeyTime, "Percent", {
        get: function () { return this._Percent; }
    });

    namespace.KeyTime = Nullstone.FinishCreate(KeyTime);
})(window);