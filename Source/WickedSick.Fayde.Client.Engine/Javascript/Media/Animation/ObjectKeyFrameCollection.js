/// <reference path="KeyFrameCollection.js"/>
/// CODE
/// <reference path="ObjectKeyFrame.js"/>

//#region ObjectKeyFrameCollection

function ObjectKeyFrameCollection() {
    if (!Nullstone.IsReady)
        return;
    this.$super();
}
Nullstone.Extend(ObjectKeyFrameCollection, "ObjectKeyFrameCollection", KeyFrameCollection);

ObjectKeyFrameCollection.prototype.IsElementType = function (value) {
    return value instanceof ObjectKeyFrame;
};

//#endregion