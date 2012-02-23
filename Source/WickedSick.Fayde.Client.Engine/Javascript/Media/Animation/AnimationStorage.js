/// <reference path="../../Runtime/RefObject.js"/>
/// CODE

//#region AnimationStorage

function AnimationStorage(timeline, targetobj, targetprop) {
    /// <param name="timeline" type="Timeline"></param>
    /// <param name="targetobj" type="DependencyObject"></param>
    /// <param name="targetprop" type="DependencyProperty"></param>
    RefObject.call(this);
    if (!IsDocumentReady())
        return;
    this._Timeline = timeline;
    this._TargetObj = targetobj;
    this._TargetProp = targetprop;

    var prevStorage = targetobj._AttachAnimationStorage(targetprop, this);

    this._BaseValue = this._TargetObj.GetValue(this._TargetProp);
    if (this._BaseValue === undefined) {
        var targetType = this._TargetProp.GetTargetType();
        if (targetType === Number)
            this._BaseValue = 0;
        else if (targetType === RefObject)
            this._BaseValue = new targetType();
        else if (targetType === String)
            this._BaseValue = "";
    }

    if (prevStorage != null)
        this.SetStopValue(prevStorage.GetStopValue());
    else
        this.SetStopValue(targetobj.ReadLocalValue(targetprop));
}
AnimationStorage.InheritFrom(RefObject);

AnimationStorage.prototype.GetStopValue = function () {
    return this._StopValue;
};
AnimationStorage.prototype.SetStopValue = function (value) {
    this._StopValue = value;
};

AnimationStorage.prototype.Enable = function () {
    NotImplemented("AnimationStorage.Enable");
};
AnimationStorage.prototype.Disable = function () {
    NotImplemented("AnimationStorage.Disable");
};

AnimationStorage.prototype.Stop = function () {
    this.DetachFromObject();
    this.ResetPropertyValue();
};
AnimationStorage.prototype.DetachFromObject = function () {
    if (this._TargetObj == null || this._TargetProp == null)
        return;
    this._TargetObj._DetachAnimationStorage(this._TargetProp, this);
};
AnimationStorage.prototype.ResetPropertyValue = function () {
    if (this._TargetObj == null || this._TargetProp == null)
        return;
    this._TargetObj.SetValue(this._TargetProp, this.GetStopValue());
};

AnimationStorage.prototype.UpdateCurrentValueAndApply = function (progress) {
    if (this._TargetObj == null)
        return;
    this._CurrentValue = this._Timeline._GetCurrentValue(this._BaseValue, this._StopValue !== undefined ? this._StopValue : this._BaseValue, progress);
    this.ApplyCurrentValue();
};
AnimationStorage.prototype.ApplyCurrentValue = function () {
    if (this._CurrentValue == null)
        return;
    this._TargetObj.SetValue(this._TargetProp, this._CurrentValue);
};

//#endregion