/// <reference path="ColorKeyFrame.js"/>
/// CODE
/// <reference path="../../Primitives/Color.js"/>

//#region LinearColorKeyFrame
var LinearColorKeyFrame = Nullstone.Create("LinearColorKeyFrame", ColorKeyFrame);

LinearColorKeyFrame.Instance.InterpolateValue = function (baseValue, keyFrameProgress) {
    return Color.LERP(baseValue, this.Value, keyFrameProgress);
};

Nullstone.FinishCreate(LinearColorKeyFrame);
//#endregion