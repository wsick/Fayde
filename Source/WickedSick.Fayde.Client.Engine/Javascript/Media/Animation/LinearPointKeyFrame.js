/// <reference path="PointKeyFrame.js"/>
/// CODE
/// <reference path="../../Primitives/Point.js"/>

(function (namespace) {
    var LinearPointKeyFrame = Nullstone.Create("LinearPointKeyFrame", PointKeyFrame);

    LinearPointKeyFrame.Instance.InterpolateValue = function (baseValue, keyFrameProgress) {
        return Point.LERP(baseValue, this.Value, keyFrameProgress);
    };

    namespace.LinearPointKeyFrame = Nullstone.FinishCreate(LinearPointKeyFrame);
})(window);