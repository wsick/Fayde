/// <reference path="../../Runtime/Nullstone.js"/>
/// CODE

//#region RepeatBehavior
var RepeatBehavior = Nullstone.Create("RepeatBehavior");

RepeatBehavior.Instance.Init = function () {
    this.IsForever = false;
};

RepeatBehavior.FromRepeatDuration = function (duration) {
    var rb = new RepeatBehavior();
    rb.RepeatDuration = duration;
    return rb;
};
RepeatBehavior.FromIterationCount = function (count) {
    var rb = new RepeatBehavior();
    rb.IterationCount = count;
    return rb;
};
RepeatBehavior.FromForever = function () {
    var rb = new RepeatBehavior();
    rb.IsForever = true;
    return rb;
};

Nullstone.FinishCreate(RepeatBehavior);
//#endregion