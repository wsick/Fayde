/// <reference path="ColorKeyFrame.js"/>
/// <reference path="IEasingFunction.js"/>
/// CODE

//#region EasingColorKeyFrame
var EasingColorKeyFrame = Nullstone.Create("EasingColorKeyFrame", ColorKeyFrame);

//#region Properties

EasingColorKeyFrame.EasingFunctionProperty = DependencyProperty.Register("EasingFunction", function () { return IEasingFunction; }, EasingColorKeyFrame);

Nullstone.AutoProperties(EasingColorKeyFrame, [
    EasingColorKeyFrame.EasingFunctionProperty
]);

//#endregion

EasingColorKeyFrame.Instance.InterpolateValue = function (baseValue, keyFrameProgress) {
    if (keyFrameProgress >= 1.0)
        return this.Value;

    var start = baseValue;
    var end = this.Value;

    var easingFunction = this.EasingFunction;
    if (easingFunction)
        keyFrameProgress = easingFunction.Ease(keyFrameProgress);

    return Color.LERP(start, end, keyFrameProgress);
};

Nullstone.FinishCreate(EasingColorKeyFrame);
//#endregion