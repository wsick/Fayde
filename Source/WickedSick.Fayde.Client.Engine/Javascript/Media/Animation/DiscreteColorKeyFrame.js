/// <reference path="ColorKeyFrame.js"/>
/// CODE

//#region DiscreteColorKeyFrame
var DiscreteColorKeyFrame = Nullstone.Create("DiscreteColorKeyFrame", ColorKeyFrame);

DiscreteColorKeyFrame.Instance.InterpolateValue = function (baseValue, keyFrameProgress) {
    if (keyFrameProgress >= 1.0)
        return this.Value;
    return baseValue;
};

Nullstone.FinishCreate(DiscreteColorKeyFrame);
//#endregion