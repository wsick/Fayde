/// <reference path="DoubleKeyFrame.js"/>
/// CODE

//#region DiscreteDoubleKeyFrame
var DiscreteDoubleKeyFrame = Nullstone.Create("DiscreteDoubleKeyFrame", DoubleKeyFrame);

DiscreteDoubleKeyFrame.Instance.InterpolateValue = function (baseValue, keyFrameProgress) {
    if (keyFrameProgress >= 1.0)
        return this.Value;
    return baseValue;
};

Nullstone.FinishCreate(DiscreteDoubleKeyFrame);
//#endregion