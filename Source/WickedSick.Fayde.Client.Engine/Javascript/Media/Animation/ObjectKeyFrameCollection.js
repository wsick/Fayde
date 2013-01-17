/// <reference path="KeyFrameCollection.js"/>
/// CODE
/// <reference path="ObjectKeyFrame.js"/>

(function (namespace) {
    var ObjectKeyFrameCollection = Nullstone.Create("ObjectKeyFrameCollection", KeyFrameCollection);

    ObjectKeyFrameCollection.Instance.IsElementType = function (value) {
        return value instanceof ObjectKeyFrame;
    };

    namespace.ObjectKeyFrameCollection = Nullstone.FinishCreate(ObjectKeyFrameCollection);
})(window);