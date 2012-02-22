/// <reference path="../../Runtime/RefObject.js"/>
/// <reference path="Timeline.js"/>
/// CODE

//#region Animation

function Animation() {
    Timeline.call(this);
}
Animation.InheritFrom(Timeline);

//#endregion

Animation.prototype.HookupStorage = function (targetObj, targetProp) {
    /// <param name="targetObj" type="DependencyObject"></param>
    /// <param name="targetProp" type="DependencyProperty"></param>
    /// <returns type="AnimationStorage" />
    this._Storage = new AnimationStorage(this, targetObj, targetProp);
    return this._Storage;
};

Animation.prototype.UpdateInternal = function (nowTime) {
    if (this._Storage == null)
        return;
    var progress = 1.0;
    if (nowTime === Number.POSITIVE_INFINITY)
        progress = this.GetCurrentProgress(nowTime);
    this._Storage.UpdateCurrentValueAndApply(progress);
};

Animation.prototype._GetTargetValue = function (defaultOriginValue) { return null; };
Animation.prototype._GetCurrentValue = function (defaultOriginValue, defaultDestinationValue, progress) { return null; };