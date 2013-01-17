/// <reference path="DoubleKeyFrame.js"/>
/// CODE

(function (namespace) {
    var LinearDoubleKeyFrame = Nullstone.Create("LinearDoubleKeyFrame", DoubleKeyFrame);

    LinearDoubleKeyFrame.Instance.InterpolateValue = function (baseValue, keyFrameProgress) {
        var start = baseValue;
        var end = this.Value;
        if (isNaN(start))
            start = 0;
        if (isNaN(end))
            end = 0;
        return start + (end - start) * keyFrameProgress;
    };

    namespace.LinearDoubleKeyFrame = Nullstone.FinishCreate(LinearDoubleKeyFrame);
})(window);