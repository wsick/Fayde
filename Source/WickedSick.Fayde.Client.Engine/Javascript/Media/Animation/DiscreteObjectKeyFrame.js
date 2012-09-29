/// <reference path="ObjectKeyFrame.js"/>
/// CODE

//#region DiscreteObjectKeyFrame
var DiscreteObjectKeyFrame = Nullstone.Create("DiscreteObjectKeyFrame", ObjectKeyFrame);

DiscreteObjectKeyFrame.Instance.InterpolateValue = function (baseValue, keyFrameProgress) {
    if (keyFrameProgress >= 1.0)
        return this.ConvertedValue;
    return baseValue;
};

Nullstone.FinishCreate(DiscreteObjectKeyFrame);
//#endregion