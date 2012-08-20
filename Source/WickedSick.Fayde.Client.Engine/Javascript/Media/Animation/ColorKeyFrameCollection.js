/// <reference path="KeyFrameCollection.js"/>
/// CODE
/// <reference path="ColorKeyFrame.js"/>

//#region ColorKeyFrameCollection
var ColorKeyFrameCollection = Nullstone.Create("ColorKeyFrameCollection", KeyFrameCollection);

ColorKeyFrameCollection.Instance.IsElementType = function (value) {
    return value instanceof ColorKeyFrame;
};

Nullstone.FinishCreate(ColorKeyFrameCollection);
//#endregion