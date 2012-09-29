/// <reference path="PointKeyFrame.js"/>
/// CODE

//#region DiscretePointKeyFrame
var DiscretePointKeyFrame = Nullstone.Create("DiscretePointKeyFrame", PointKeyFrame);

DiscretePointKeyFrame.Instance.InterpolateValue = function (baseValue, keyFrameProgress) {
    if (keyFrameProgress >= 1.0)
        return this.Value;
    return baseValue;
};

Nullstone.FinishCreate(DiscretePointKeyFrame);
//#endregion