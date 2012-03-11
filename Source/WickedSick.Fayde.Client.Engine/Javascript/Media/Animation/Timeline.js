/// <reference path="../../Runtime/Nullstone.js" />
/// <reference path="../../Core/DependencyObject.js"/>
/// CODE
/// <reference path="../../Primitives/Duration.js"/>

//#region Timeline
var Timeline = Nullstone.Create("Timeline", DependencyObject);

Timeline.Instance.Init = function () {
    this.Init$DependencyObject();
    this.Completed = new MulticastEvent();
    this.Reset();
};

//#region DEPENDENCY PROPERTIES

Timeline.BeginTimeProperty = DependencyProperty.Register("BeginTime", function () { return TimeSpan; }, Timeline);
Timeline.Instance.GetBeginTime = function () {
    ///<returns type="TimeSpan"></returns>
    return this.GetValue(Timeline.BeginTimeProperty);
};
Timeline.Instance.SetBeginTime = function (value) {
    ///<param name="value" type="TimeSpan"></param>
    this.SetValue(Timeline.BeginTimeProperty, value);
};

Timeline.DurationProperty = DependencyProperty.Register("Duration", function () { return Duration; }, Timeline);
Timeline.Instance.GetDuration = function () {
    ///<returns type="Duration"></returns>
    return this.GetValue(Timeline.DurationProperty);
};
Timeline.Instance.SetDuration = function (value) {
    ///<param name="value" type="Duration"></param>
    this.SetValue(Timeline.DurationProperty, value);
};

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
    var beginTime = this.GetBeginTime();
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
        Progress: 1.0
    };

    var duration = this.GetDuration();
    if (duration != null && duration.HasTimeSpan()) {
        var elapsedMs = nowTime - this._BeginStep;
        var durMs = duration.GetTimeSpan().GetMilliseconds();
        if (durMs > 0) {
            clockData.Progress = elapsedMs / durMs;
            if (clockData.Progress > 1.0)
                clockData.Progress = 1.0;
        }
    }

    return clockData;
};
Timeline.Instance.OnDurationReached = function () {
    this.Completed.Raise(this, {});
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
        if (clockData.Progress === 1.0) {
            this.UpdateInternal(clockData);
            this.OnDurationReached();
            return;
        }
        this.UpdateInternal(clockData);
    } finally {
        this._LastStep = nowTime;
    }
};
Timeline.Instance.UpdateInternal = function (nowTime) { };

Nullstone.FinishCreate(Timeline);
//#endregion