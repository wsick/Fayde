/// <reference path="../../Runtime/RefObject.js" />
/// <reference path="../../Core/DependencyObject.js"/>
/// CODE
/// <reference path="../../Primitives/Duration.js"/>

//#region Timeline

function Timeline() {
    DependencyObject.call(this);
    this.Completed = new MulticastEvent();
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

Timeline.prototype.GetCurrentProgress = function (nowTime) {
    if (nowTime === Number.POSITIVE_INFINITY)
        return 1.0;
    var elapsedMs = nowTime - this._BeginStep;
    var progress = elapsedMs / this.GetDuration().GetTimeSpan().GetMilliseconds();
    if (progress > 1.0)
        progress = 1.0;
    return progress;
};

Timeline.prototype.HasManualTarget = function () {
    return this._ManualTarget != null;
};
Timeline.prototype.GetManualTarget = function () {
    return this._ManualTarget;
};

Timeline.prototype.HookupStorage = function (targetObj, targetProp) {
    /// <param name="targetObj" type="DependencyObject"></param>
    /// <param name="targetProp" type="DependencyProperty"></param>
    /// <returns type="AnimationStorage" />
    this._Storage = new AnimationStorage(this, targetObj, targetProp);
    return this._Storage;
};

Timeline.prototype.InitializeTimes = function (now) {
    this._InitialStep = now;
    var beginTime = this.GetBeginTime();
    this._ReachedBeginTime = beginTime == null || beginTime.IsZero();
    if (this._ReachedBeginTime)
        this._BeginStep = now;
};
Timeline.prototype.HasReachedBeginTime = function (nowTime) {
    if (this._ReachedBeginTime)
        return true;

    var beginTime = this.GetBeginTime();
    if (beginTime != null) {
        var ts = new TimeSpan();
        ts.AddMilliseconds(nowTime - this._InitialStep);
        if (ts.CompareTo(beginTime) < 0)
            return false;
    }

    this._BeginStep = new Date().getTime();
    this._ReachedBeginTime = true;
    return true;
};
Timeline.prototype.HasNoDuration = function () {
    return this.GetDuration() == null;
};
Timeline.prototype.HasReachedDuration = function (nowTime) {
    var duration = this.GetDuration();
    if (!duration.HasTimeSpan())
        return false;
    if (this.GetCurrentProgress() < 1.0)
        return false;
    return true;
};
Timeline.prototype.OnDurationReached = function () { };
Timeline.prototype.Update = function (nowTime) {
    if (this._Storage == null)
        return;
    var progress = 1.0;
    if (nowTime === Number.POSITIVE_INFINITY)
        progress = this.GetCurrentProgress(nowTime);
    this._Storage.UpdateCurrentValueAndApply(progress);
};

Timeline.prototype._GetTargetValue = function (defaultOriginValue) { };
Timeline.prototype._GetCurrentValue = function (defaultOriginValue, defaultDestinationValue, progress) { };

//#endregion
