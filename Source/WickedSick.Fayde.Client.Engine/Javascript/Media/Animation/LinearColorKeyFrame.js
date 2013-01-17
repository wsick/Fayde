/// <reference path="ColorKeyFrame.js"/>
/// CODE
/// <reference path="../../Primitives/Color.js"/>

(function (namespace) {
    var LinearColorKeyFrame = Nullstone.Create("LinearColorKeyFrame", ColorKeyFrame);

    LinearColorKeyFrame.Instance.InterpolateValue = function (baseValue, keyFrameProgress) {
        return Color.LERP(baseValue, this.Value, keyFrameProgress);
    };

    namespace.LinearColorKeyFrame = Nullstone.FinishCreate(LinearColorKeyFrame);
})(window);