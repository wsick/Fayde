/// <reference path="../../Core/DependencyObject.js"/>
/// CODE
/// <reference path="../../Primitives/Duration.js"/>
/// <reference path="RepeatBehavior.js"/>
/// <reference path="Enums.js"/>

(function (namespace) {
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
    Timeline.RepeatBehaviorProperty = DependencyProperty.Register("RepeatBehavior", function () { return namespace.RepeatBehavior; }, Timeline, namespace.RepeatBehavior.FromIterationCount(1));
    Timeline.SpeedRatioProperty = DependencyProperty.Register("SpeedRatio", function () { return Number; }, Timeline, 1.0);
    Timeline.FillBehaviorProperty = DependencyProperty.Register("FillBehavior", function () { return new Enum(namespace.FillBehavior); }, Timeline, namespace.FillBehavior.HoldEnd);

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
            case namespace.FillBehavior.HoldEnd:
                this.Disable();
                break;
            case namespace.FillBehavior.Stop:
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

    Timeline.Instance.Disable = function () { };

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

        var elapsedTicks = nowTime - this._BeginTicks - this._TicksPaused;
        var currentTimeTicks = elapsedTicks;
        var progress = 0.0;
        var completed = false;

        var duration = this.GetNaturalDuration();
        if (!duration || duration.IsAutomatic) {
            progress = 1.0;
            completed = true;
        } else if (duration.HasTimeSpan) {
            var d = duration.TimeSpan._Ticks;
            if (d === 0) {
                progress = 1.0;
            } else if (this.AutoReverse === true) {
                d = d / 2;
                // Progress - Graph that repeats 3 times has shape: /\/\/\/\/\/\
                progress = 1 - (Math.abs((elapsedTicks % (d + d)) - d) / d);
            } else {
                // Progress - Graph that repeats 3 times has shape: //////
                progress = (elapsedTicks / d) - Math.floor(elapsedTicks / d);
            }

            var repeat = this.RepeatBehavior;
            if (repeat.IsForever) {
            } else if (repeat.HasCount) {
                if ((d === 0) || (Math.floor(elapsedTicks / d) >= repeat.Count)) {
                    progress = 1.0;
                    completed = true;
                }
            } else if (repeat.HasDuration) {
                if (elapsedTicks >= repeat.Duration.TimeSpan._Ticks) {
                    progress = 1.0;
                    completed = true;
                }
            }

            if (d !== 0)
                currentTimeTicks = progress * d; //normalizes CurrentTime within [0,duration] constraints
        }
        // else if (duration.IsForever) { // do nothing }

        return {
            CurrentTime: new TimeSpan(currentTimeTicks),
            Progress: progress,
            Completed: completed
        };
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

    namespace.Timeline = Nullstone.FinishCreate(Timeline);
})(Nullstone.Namespace("Fayde.Media.Animation"));

(function (namespace) {
    var TimelineCollection = Nullstone.Create("TimelineCollection", Collection);
    namespace.TimelineCollection = Nullstone.FinishCreate(TimelineCollection);
})(Nullstone.Namespace("Fayde.Media.Animation"));
