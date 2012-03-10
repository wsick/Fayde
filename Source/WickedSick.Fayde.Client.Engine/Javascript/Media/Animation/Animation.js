/// <reference path="../../Runtime/Nullstone.js"/>
/// <reference path="Timeline.js"/>
/// CODE

//#region Animation

function Animation() {
    if (!Nullstone.IsReady)
        return;
    this.$super();
}
Nullstone.Extend(Animation, "Animation", Timeline);

//#endregion

Animation.prototype.Resolve = function () { return true; };

Animation.prototype.HookupStorage = function (targetObj, targetProp) {
    /// <param name="targetObj" type="DependencyObject"></param>
    /// <param name="targetProp" type="DependencyProperty"></param>
    /// <returns type="AnimationStorage" />
    this._Storage = new AnimationStorage(this, targetObj, targetProp);
    return this._Storage;
};
Animation.prototype.Stop = function () {
    if (this._Storage == null)
        return;
    this._Storage.Stop();
};

Animation.prototype.UpdateInternal = function (clockData) {
    if (this._Storage != null)
        this._Storage.UpdateCurrentValueAndApply(clockData);
};

Animation.prototype._GetTargetValue = function (defaultOriginValue) { return null; };
Animation.prototype._GetCurrentValue = function (defaultOriginValue, defaultDestinationValue, clockData) { return null; };