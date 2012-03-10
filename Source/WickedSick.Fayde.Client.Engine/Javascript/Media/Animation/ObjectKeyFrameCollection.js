/// <reference path="KeyFrameCollection.js"/>
/// CODE
/// <reference path="ObjectKeyFrame.js"/>

//#region ObjectKeyFrameCollection
var ObjectKeyFrameCollection = Nullstone.Create("ObjectKeyFrameCollection", KeyFrameCollection);

ObjectKeyFrameCollection.Instance.IsElementType = function (value) {
    return value instanceof ObjectKeyFrame;
};

Nullstone.FinishCreate(ObjectKeyFrameCollection);
//#endregion