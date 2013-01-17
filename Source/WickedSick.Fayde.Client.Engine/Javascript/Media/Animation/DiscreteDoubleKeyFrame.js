/// <reference path="DoubleKeyFrame.js"/>
/// CODE

(function (namespace) {
    var DiscreteDoubleKeyFrame = Nullstone.Create("DiscreteDoubleKeyFrame", DoubleKeyFrame);

    DiscreteDoubleKeyFrame.Instance.InterpolateValue = function (baseValue, keyFrameProgress) {
        if (keyFrameProgress >= 1.0)
            return this.Value;
        return baseValue;
    };

    namespace.DiscreteDoubleKeyFrame = Nullstone.FinishCreate(DiscreteDoubleKeyFrame);
})(window);