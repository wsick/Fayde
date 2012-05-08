/// <reference path="../../Runtime/Nullstone.js"/>
/// CODE

//#region AnimationStorage
var AnimationStorage = Nullstone.Create("AnimationStorage", null, 3);

AnimationStorage.Instance.Init = function (timeline, targetobj, targetprop) {
    /// <param name="timeline" type="Timeline"></param>
    /// <param name="targetobj" type="DependencyObject"></param>
    /// <param name="targetprop" type="DependencyProperty"></param>
    this._Timeline = timeline;
    this._TargetObj = targetobj;
    this._TargetProp = targetprop;

    var prevStorage = targetobj._AttachAnimationStorage(targetprop, this);

    this._BaseValue = this._TargetObj._GetValue(this._TargetProp);
    if (this._BaseValue === undefined) {
        var targetType = this._TargetProp.GetTargetType();
        if (targetType === Number)
            this._BaseValue = 0;
        else if (targetType === String)
            this._BaseValue = "";
        else
            this._BaseValue = new targetType();
    }

    if (prevStorage != null)
        this.SetStopValue(prevStorage.GetStopValue());
    else
        this.SetStopValue(targetobj._ReadLocalValue(targetprop));
};

AnimationStorage.Instance.GetStopValue = function () {
    return this._StopValue;
};
AnimationStorage.Instance.SetStopValue = function (value) {
    this._StopValue = value;
};

AnimationStorage.Instance.Enable = function () {
    //Attach target handler
    this._Disabled = false;
    this.ApplyCurrentValue();
};
AnimationStorage.Instance.Disable = function () {
    //Detach target handler
    this._Disabled = true;
};

AnimationStorage.Instance.Stop = function () {
    this.DetachFromObject();
    this.ResetPropertyValue();
};
AnimationStorage.Instance.DetachFromObject = function () {
    if (this._TargetObj == null || this._TargetProp == null)
        return;
    this._TargetObj._DetachAnimationStorage(this._TargetProp, this);
};
AnimationStorage.Instance.ResetPropertyValue = function () {
    if (this._TargetObj == null || this._TargetProp == null)
        return;
    this._TargetObj._SetValue(this._TargetProp, this.GetStopValue());
};

AnimationStorage.Instance.UpdateCurrentValueAndApply = function (progress) {
    if (this._Disabled)
        return;
    if (this._TargetObj == null)
        return;
    this._CurrentValue = this._Timeline._GetCurrentValue(this._BaseValue, this._StopValue !== undefined ? this._StopValue : this._BaseValue, progress);
    this.ApplyCurrentValue();
};
AnimationStorage.Instance.ApplyCurrentValue = function () {
    if (this._CurrentValue == null)
        return;
    this._TargetObj._SetValue(this._TargetProp, this._CurrentValue);
};

Nullstone.FinishCreate(AnimationStorage);
//#endregion