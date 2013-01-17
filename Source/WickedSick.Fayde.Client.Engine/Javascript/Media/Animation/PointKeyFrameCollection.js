/// <reference path="KeyFrameCollection.js"/>
/// CODE
/// <reference path="PointKeyFrame.js"/>

(function (namespace) {
    var PointKeyFrameCollection = Nullstone.Create("PointKeyFrameCollection", KeyFrameCollection);

    PointKeyFrameCollection.Instance.IsElementType = function (value) {
        return value instanceof PointKeyFrame;
    };

    namespace.PointKeyFrameCollection = Nullstone.FinishCreate(PointKeyFrameCollection);
})(window);