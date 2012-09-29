/// <reference path="PointKeyFrame.js"/>
/// CODE
/// <reference path="../../Primitives/Point.js"/>

//#region LinearPointKeyFrame
var LinearPointKeyFrame = Nullstone.Create("LinearPointKeyFrame", PointKeyFrame);

LinearPointKeyFrame.Instance.InterpolateValue = function (baseValue, keyFrameProgress) {
    return Point.LERP(baseValue, this.Value, keyFrameProgress);
};

Nullstone.FinishCreate(LinearPointKeyFrame);
//#endregion