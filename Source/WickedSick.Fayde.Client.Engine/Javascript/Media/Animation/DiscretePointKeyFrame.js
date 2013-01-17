/// <reference path="PointKeyFrame.js"/>
/// CODE

(function (namespace) {
    var DiscretePointKeyFrame = Nullstone.Create("DiscretePointKeyFrame", PointKeyFrame);

    DiscretePointKeyFrame.Instance.InterpolateValue = function (baseValue, keyFrameProgress) {
        if (keyFrameProgress >= 1.0)
            return this.Value;
        return baseValue;
    };

    namespace.DiscretePointKeyFrame = Nullstone.FinishCreate(DiscretePointKeyFrame);
})(window);