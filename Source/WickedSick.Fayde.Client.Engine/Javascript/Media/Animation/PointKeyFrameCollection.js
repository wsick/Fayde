/// <reference path="KeyFrameCollection.js"/>
/// CODE
/// <reference path="PointKeyFrame.js"/>

//#region PointKeyFrameCollection
var PointKeyFrameCollection = Nullstone.Create("PointKeyFrameCollection", KeyFrameCollection);

PointKeyFrameCollection.Instance.IsElementType = function (value) {
    return value instanceof PointKeyFrame;
};

Nullstone.FinishCreate(PointKeyFrameCollection);
//#endregion