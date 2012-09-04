/// <reference path="../../Core/DependencyObject.js"/>
/// CODE
/// <reference path="../../Primitives/Duration.js"/>
/// <reference path="RepeatBehavior.js"/>
/// <reference path="Enums.js"/>

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
Timeline.SpeedRatioProperty = DependencyProperty.Register("SpeedRatio", function () { return Number; }, Timeline, 1.0);
Timeline.FillBehaviorProperty = DependencyProperty.Register("FillBehavior", function () { return new Enum(FillBehavior); }, Timeline, FillBehavior.HoldEnd);

Nullstone.AutoProperties(Timeline, [
    Timeline.AutoReverseProperty,
    Timeline.BeginTimeProperty,
    Timeline.DurationProperty,
    Timeline.RepeatBehaviorProperty,
    Timeline.SpeedRatioProperty,
    Timeline.FillBehaviorProperty
]);

Nullstone.Property(Timeline, "HasManualTarget", {
    get: function () {
        return this._ManualTarget != null;
    }
});
Nullstone.Property(Timeline, "ManualTarget", {
    get: function () {
        return this._ManualTarget;
    }
});

//#endregion

Timeline.Instance.Reset = function () {
    this._TicksPaused = 0;
    this._IsFirstUpdate = true;
    delete this._BeginTicks;
    this._HasBegun = false;
};

Timeline.Instance.Pause = function () {
    if (this._IsPaused)
        return;
    this._BeginPauseTime = new Date().getTime();
    this._IsPaused = true;
};
Timeline.Instance.Resume = function () {
    if (!this._IsPaused)
        return;
    this._IsPaused = false;
    var nowTime = new Date().getTime();
    this._TicksPaused = nowTime - this._BeginPauseTime;
};
Timeline.Instance.Stop = function () {
    this.Reset();
};

Timeline.Instance.OnCompleted = function () {
    var fill = this.FillBehavior;
    switch (fill) {
        case FillBehavior.HoldEnd:
            break;
        case FillBehavior.Stop:
            this.Stop();
            break;
    }
    this.Completed.Raise(this, new EventArgs());
};

Timeline.Instance.Update = function (nowTime) {
    var clockData = this.CreateClockData(nowTime);
    if (!clockData)
        return;
    if (this._IsPaused)
        return;
    this.UpdateInternal(clockData);
    if (clockData.Completed)
        this.OnCompleted();
};
Timeline.Instance.UpdateInternal = function (clockData) { };

//#region Clock

Timeline.Instance.CreateClockData = function (nowTime) {
    if (this._IsFirstUpdate) {
        this._InitialStep = nowTime;
        this._HasBegun = false;
        this._IsFirstUpdate = false;
    }
    if (!this._HasBegun) {
        if (!this.IsAfterBeginTime(nowTime))
            return;
        this._BeginTicks = nowTime;
        this._HasBegun = true;
    }

    var clockData = {
        CurrentTime: new TimeSpan(nowTime - this._BeginTicks - this._TicksPaused),
        Progress: 0.0,
        Completed: false
    };

    var duration = this.GetNaturalDuration();
    if (!duration || duration.IsAutomatic) {
        clockData.Progress = 1.0;
        clockData.Completed = true;
    } else if (duration.HasTimeSpan) {
        var elapsedTicks = clockData.CurrentTime._Ticks;
        var durTicks = duration.TimeSpan._Ticks;
        if (this.AutoReverse === true) {
            // Progress - Graph that repeats 3 times has shape: /\/\/\/\/\/\
            clockData.Progress = 1 - (Math.abs((elapsedTicks % (durTicks + durTicks)) - durTicks) / durTicks);
        } else {
            // Progress - Graph that repeats 3 times has shape: //////
            clockData.Progress = (elapsedTicks / durTicks) - Math.floor(elapsedTicks / durTicks);
        }

        var repeat = this.RepeatBehavior;
        if (repeat.IsForever) {
        } else if (repeat.HasCount) {
            if (Math.floor(elapsedTicks / durTicks) > repeat.Count) {
                clockData.Progress = 1.0;
                clockData.Completed = true;
            }
        } else if (repeat.HasDuration) {
            if (elapsedTicks > repeat.Duration.TimeSpan._Ticks) {
                clockData.Progress = 1.0;
                clockData.Completed = true;
            }
        }
    }
    // else if (duration.IsForever) { // do nothing }

    return clockData;
};
Timeline.Instance.IsAfterBeginTime = function (nowTime) {
    var beginTime = this.BeginTime;
    if (beginTime == null)
        return true;
    var beginTicks = beginTime._Ticks;
    if (beginTicks <= 0)
        return true;
    var elapsedTicks = nowTime - this._InitialStep;
    if (elapsedTicks < beginTicks)
        return false;
    return true;
};
Timeline.Instance.GetNaturalDuration = function () {
    var d = this.Duration;
    if (d.IsAutomatic)
        return this.GetNaturalDurationCore();
    return d;
};
Timeline.Instance.GetNaturalDurationCore = function () {
    return Duration.CreateAutomatic();
};

//#endregion

Nullstone.FinishCreate(Timeline);
//#endregion