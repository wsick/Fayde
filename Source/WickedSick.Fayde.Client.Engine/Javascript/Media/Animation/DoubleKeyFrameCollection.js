/// <reference path="KeyFrameCollection.js"/>
/// CODE
/// <reference path="DoubleKeyFrame.js"/>

//#region DoubleKeyFrameCollection
var DoubleKeyFrameCollection = Nullstone.Create("DoubleKeyFrameCollection", KeyFrameCollection);

DoubleKeyFrameCollection.Instance.IsElementType = function (value) {
    return value instanceof DoubleKeyFrame;
};

Nullstone.FinishCreate(DoubleKeyFrameCollection);
//#endregion