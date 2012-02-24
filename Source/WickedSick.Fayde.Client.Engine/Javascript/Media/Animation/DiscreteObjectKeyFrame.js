/// <reference path="ObjectKeyFrame.js"/>
/// CODE

//#region DiscreteObjectKeyFrame

function DiscreteObjectKeyFrame() {
    ObjectKeyFrame.call(this);
}
DiscreteObjectKeyFrame.InheritFrom(ObjectKeyFrame);

DiscreteObjectKeyFrame.prototype.InterpolateValue = function (baseValue, keyFrameProgress) {
    if (keyFrameProgress >= 1.0) {
        return this.GetValue_Prop();
    }
    return baseValue;
};

//#endregion