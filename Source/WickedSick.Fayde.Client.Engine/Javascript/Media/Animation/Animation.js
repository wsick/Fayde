/// <reference path="../../Runtime/Nullstone.js"/>
/// <reference path="Timeline.js"/>
/// CODE

//#region Animation
var Animation = Nullstone.Create("Animation", Timeline);

Animation.Instance.Resolve = function () { return true; };

Animation.Instance.HookupStorage = function (targetObj, targetProp) {
    /// <param name="targetObj" type="DependencyObject"></param>
    /// <param name="targetProp" type="DependencyProperty"></param>
    /// <returns type="AnimationStorage" />
    this._Storage = new AnimationStorage(this, targetObj, targetProp);
    return this._Storage;
};
Animation.Instance.Stop = function () {
    if (this._Storage == null)
        return;
    this._Storage.Stop();
};

Animation.Instance.UpdateInternal = function (clockData) {
    if (this._Storage != null)
        this._Storage.UpdateCurrentValueAndApply(clockData);
};

Animation.Instance._GetTargetValue = function (defaultOriginValue) { return null; };
Animation.Instance._GetCurrentValue = function (defaultOriginValue, defaultDestinationValue, clockData) { return null; };


Nullstone.FinishCreate(Animation);
//#endregion