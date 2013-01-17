/// <reference path="KeyFrameCollection.js"/>
/// CODE
/// <reference path="DoubleKeyFrame.js"/>

(function (namespace) {
    var DoubleKeyFrameCollection = Nullstone.Create("DoubleKeyFrameCollection", KeyFrameCollection);

    DoubleKeyFrameCollection.Instance.IsElementType = function (value) {
        return value instanceof DoubleKeyFrame;
    };

    namespace.DoubleKeyFrameCollection = Nullstone.FinishCreate(DoubleKeyFrameCollection);
})(window);