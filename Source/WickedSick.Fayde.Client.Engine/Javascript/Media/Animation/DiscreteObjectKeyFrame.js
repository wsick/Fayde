/// <reference path="ObjectKeyFrame.js"/>
/// CODE

//#region DiscreteObjectKeyFrame

function DiscreteObjectKeyFrame() {
    if (!Nullstone.IsReady)
        return;
    this.$super();
}
Nullstone.Extend(DiscreteObjectKeyFrame, "DiscreteObjectKeyFrame", ObjectKeyFrame);

DiscreteObjectKeyFrame.prototype.InterpolateValue = function (baseValue, keyFrameProgress) {
    if (keyFrameProgress >= 1.0) {
        return this.GetConvertedValue();
    }
    return baseValue;
};

//#endregion