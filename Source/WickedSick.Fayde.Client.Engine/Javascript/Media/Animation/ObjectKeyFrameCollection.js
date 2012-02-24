/// <reference path="KeyFrameCollection.js"/>
/// CODE
/// <reference path="ObjectKeyFrame.js"/>

//#region ObjectKeyFrameCollection

function ObjectKeyFrameCollection() {
    KeyFrameCollection.call(this);
}
ObjectKeyFrameCollection.InheritFrom(KeyFrameCollection);

ObjectKeyFrameCollection.prototype.IsElementType = function (value) {
    return value instanceof ObjectKeyFrame;
};

//#endregion