/// <reference path="DoubleKeyFrame.js"/>
/// <reference path="IEasingFunction.js"/>
/// CODE

//#region EasingDoubleKeyFrame
var EasingDoubleKeyFrame = Nullstone.Create("EasingDoubleKeyFrame", DoubleKeyFrame);

//#region Properties

EasingDoubleKeyFrame.EasingFunctionProperty = DependencyProperty.Register("EasingFunction", function () { return IEasingFunction; }, EasingDoubleKeyFrame);

Nullstone.AutoProperties(EasingDoubleKeyFrame, [
    EasingDoubleKeyFrame.EasingFunctionProperty
]);

//#endregion

SplineDoubleKeyFrame.Instance.InterpolateValue = function (baseValue, keyFrameProgress) {
    if (keyFrameProgress >= 1.0)
        return this.Value;

    var start = baseValue;
    var end = this.Value;

    var easingFunction = this.EasingFunction;
    if (easingFunction)
        keyFrameProgress = easingFunction.Ease(keyFrameProgress);

    if (isNaN(start))
        start = 0;
    if (isNaN(end))
        end = 0;

    return start + (end - start) * keyFrameProgress;
};

Nullstone.FinishCreate(EasingDoubleKeyFrame);
//#endregion