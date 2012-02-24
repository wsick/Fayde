/// <reference path="../../Runtime/RefObject.js" />
/// <reference path="../../Core/DependencyObject.js"/>
/// CODE
/// <reference path="../../Primitives/Duration.js"/>

//#region Timeline

function Timeline() {
    DependencyObject.call(this);
    if (!IsDocumentReady())
        return;
    this.Completed = new MulticastEvent();
    this.Reset();
}
Timeline.InheritFrom(DependencyObject);

//#region DEPENDENCY PROPERTIES

Timeline.BeginTimeProperty = DependencyProperty.Register("BeginTime", function () { return TimeSpan; }, Timeline);
Timeline.prototype.GetBeginTime = function () {
    ///<returns type="TimeSpan"></returns>
    return this.GetValue(Timeline.BeginTimeProperty);
};
Timeline.prototype.SetBeginTime = function (value) {
    ///<param name="value" type="TimeSpan"></param>
    this.SetValue(Timeline.BeginTimeProperty, value);
};

Timeline.DurationProperty = DependencyProperty.Register("Duration", function () { return Duration; }, Timeline);
Timeline.prototype.GetDuration = function () {
    ///<returns type="Duration"></returns>
    return this.GetValue(Timeline.DurationProperty);
};
Timeline.prototype.SetDuration = function (value) {
    ///<param name="value" type="Duration"></param>
    this.SetValue(Timeline.DurationProperty, value);
};

//#endregion

Timeline.prototype.HasManualTarget = function () {
    return this._ManualTarget != null;
};
Timeline.prototype.GetManualTarget = function () {
    return this._ManualTarget;
};

Timeline.prototype.Reset = function () {
    this._IsFirstUpdate = true;
    this._BeginStep = null;
    this._HasReachedBeg = false;
};
Timeline.prototype.IsAfterBeginTime = function (nowTime) {
    var beginTime = this.GetBeginTime();
    if (beginTime == null || beginTime.IsZero())
        return true;
    var ts = new TimeSpan();
    ts.AddMilliseconds(nowTime - this._InitialStep);
    if (ts.CompareTo(beginTime) < 0)
        return false;
    return true;
};
Timeline.prototype.CreateClockData = function (nowTime) {
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
Timeline.prototype.OnDurationReached = function () {
    this.Completed.Raise(this, {});
};

Timeline.prototype.Update = function (nowTime) {
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
Timeline.prototype.UpdateInternal = function (nowTime) { };

//#endregion