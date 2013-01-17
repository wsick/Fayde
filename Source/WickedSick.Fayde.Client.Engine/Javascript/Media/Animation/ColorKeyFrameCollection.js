/// <reference path="KeyFrameCollection.js"/>
/// CODE
/// <reference path="ColorKeyFrame.js"/>

(function (namespace) {
    var ColorKeyFrameCollection = Nullstone.Create("ColorKeyFrameCollection", KeyFrameCollection);

    ColorKeyFrameCollection.Instance.IsElementType = function (value) {
        return value instanceof ColorKeyFrame;
    };

    namespace.ColorKeyFrameCollection = Nullstone.FinishCreate(ColorKeyFrameCollection);
})(window);