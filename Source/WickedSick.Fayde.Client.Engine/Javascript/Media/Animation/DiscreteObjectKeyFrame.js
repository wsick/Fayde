/// <reference path="ObjectKeyFrame.js"/>
/// CODE

(function (namespace) {
    var DiscreteObjectKeyFrame = Nullstone.Create("DiscreteObjectKeyFrame", ObjectKeyFrame);

    DiscreteObjectKeyFrame.Instance.InterpolateValue = function (baseValue, keyFrameProgress) {
        if (keyFrameProgress >= 1.0)
            return this.ConvertedValue;
        return baseValue;
    };

    namespace.DiscreteObjectKeyFrame = Nullstone.FinishCreate(DiscreteObjectKeyFrame);
})(window);