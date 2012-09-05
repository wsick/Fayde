/// <reference path="../../Runtime/Nullstone.js"/>
/// CODE

//#region RepeatBehavior
var RepeatBehavior = Nullstone.Create("RepeatBehavior");

RepeatBehavior.Instance.Init = function () {
    this.IsForever = false;
};

RepeatBehavior.FromRepeatDuration = function (duration) {
    var rb = new RepeatBehavior();
    rb._Duration = duration;
    return rb;
};
RepeatBehavior.FromIterationCount = function (count) {
    var rb = new RepeatBehavior();
    rb._Count = count;
    return rb;
};
RepeatBehavior.FromForever = function () {
    var rb = new RepeatBehavior();
    rb.IsForever = true;
    return rb;
};

Nullstone.Property(RepeatBehavior, "HasCount", {
    get: function () {
        return this._Count != null;
    }
});
Nullstone.Property(RepeatBehavior, "Count", {
    get: function () {
        return this._Count;
    }
});
Nullstone.Property(RepeatBehavior, "HasDuration", {
    get: function () { return this._Duration != null; }
});
Nullstone.Property(RepeatBehavior, "Duration", {
    get: function () { return this._Duration; }
});

Nullstone.FinishCreate(RepeatBehavior);
//#endregion