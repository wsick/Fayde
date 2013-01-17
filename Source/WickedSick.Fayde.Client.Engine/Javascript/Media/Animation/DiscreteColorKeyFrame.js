/// <reference path="ColorKeyFrame.js"/>
/// CODE

(function (namespace) {
    var DiscreteColorKeyFrame = Nullstone.Create("DiscreteColorKeyFrame", ColorKeyFrame);

    DiscreteColorKeyFrame.Instance.InterpolateValue = function (baseValue, keyFrameProgress) {
        if (keyFrameProgress >= 1.0)
            return this.Value;
        return baseValue;
    };

    namespace.DiscreteColorKeyFrame = Nullstone.FinishCreate(DiscreteColorKeyFrame);
})(window);