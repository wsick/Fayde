/// <reference path="../../Runtime/Nullstone.js" />
/// <reference path="../../Core/DependencyObject.js"/>
/// CODE
/// <reference path="../../Primitives/Duration.js"/>
/// <reference path="RepeatBehavior.js"/>

//#region Timeline
var Timeline = Nullstone.Create("Timeline", DependencyObject);

Timeline.Instance.Init = function () {
    this.Init$DependencyObject();
    this.Completed = new MulticastEvent();
    this.Reset();
};

//#region Properties

Timeline.AutoReverseProperty = DependencyProperty.Register("AutoReverse", function () { return Boolean; }, Timeline, false);
Timeline.BeginTimeProperty = DependencyProperty.Register("BeginTime", function () { return TimeSpan; }, Timeline, new TimeSpan());
Timeline.DurationProperty = DependencyProperty.Register("Duration", function () { return Duration; }, Timeline, Duration.CreateAutomatic());
Timeline.RepeatBehaviorProperty = DependencyProperty.Register("RepeatBehavior", function () { return RepeatBehavior; }, Timeline, RepeatBehavior.FromIterationCount(1));

Nullstone.AutoProperties(Timeline, [
    Timeline.AutoReverseProperty,
    Timeline.BeginTimeProperty,
    Timeline.DurationProperty,
    Timeline.RepeatBehaviorProperty
]);

//#endregion

Timeline.Instance.HasManualTarget = function () {
    return this._ManualTarget != null;
};
Timeline.Instance.GetManualTarget = function () {
    return this._ManualTarget;
};

Timeline.Instance.Reset = function () {
    this._IsFirstUpdate = true;
    this._BeginStep = null;
    this._HasReachedBeg = false;
};
Timeline.Instance.IsAfterBeginTime = function (nowTime) {
    var beginTime = this._GetValue(Timeline.BeginTimeProperty);
    if (beginTime == null || beginTime.IsZero())
        return true;
    var ts = new TimeSpan();
    ts.AddMilliseconds(nowTime - this._InitialStep);
    if (ts.CompareTo(beginTime) < 0)
        return false;
    return true;
};
Timeline.Instance.CreateClockData = function (nowTime) {
    var clockData = {
        BeginTicks: this._BeginStep,
        RealTicks: nowTime,
        CurrentTime: new TimeSpan(nowTime - this._BeginStep),
        Progress: 1.0,
        Completed: true
    };

    var duration = this._GetValue(Timeline.DurationProperty);
    if (duration != null && (duration.HasTimeSpan || duration.IsForever)) {
        this.CalculateProgressInTimeline(clockData, nowTime - this._BeginStep, duration.TimeSpan.GetMilliseconds());
    }

    return clockData;
};
Timeline.Instance.OnCompleted = function () {
    this.Completed.Raise(this, new EventArgs());
};

Timeline.Instance.CalculateProgressInTimeline = function (clockData, elapsed, duration) {
    clockData.Completed = false;
    if (this.AutoReverse === true) {
        clockData.Progress = 1 - (Math.abs(elapsed - duration) / duration);
    } else {
        clockData.Progress = (elapsed / duration) - Math.floor(elapsed / duration);
    }

    //check to see if Elapsed Time exceeds RepeatBehavior
    var repeatBehavior = this.RepeatBehavior;
    if (repeatBehavior.IsForever) {
        //never exceeds
    } else if (repeatBehavior.IterationCount) {
        if (Math.floor(elapsed / duration) > repeatBehavior.IterationCount) {
            clockData.Progress = 1.0;
            clockData.Completed = true;
        }
    } else if (repeatBehavior.RepeatDuration) {
        if (elapsed > repeatBehavior.RepeatDuration) {
            clockData.Progress = 1.0;
            clockData.Completed = true;
        }
    }
};

Timeline.Instance.Update = function (nowTime) {
    try {
        if (this._IsFirstUpdate) {
            this._InitialStep = nowTime;
            this._HasReachedBeg = false;
            this._IsFirstUpdate = false;
        }
        if (!this._HasReachedBeg) {
            if (!this.IsAfterBeginTime(nowTime))
                return;
            this._BeginStep = nowTime;
            this._HasReachedBeg = true;
        }
        var clockData = this.CreateClockData(nowTime);
        this.UpdateInternal(clockData);
        if (clockData.Completed)
            this.OnCompleted();
    } finally {
        this._LastStep = nowTime;
    }
};
Timeline.Instance.UpdateInternal = function (clockData) { };

Nullstone.FinishCreate(Timeline);
//#endregion