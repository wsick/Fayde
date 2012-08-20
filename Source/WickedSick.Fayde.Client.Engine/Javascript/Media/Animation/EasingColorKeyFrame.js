/// <reference path="ColorKeyFrame.js"/>
/// CODE
/// <reference path="IEasingFunction.js"/>

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

    var r = start.R + (end.R - start.R) * keyFrameProgress;
    var g = start.G + (end.G - start.G) * keyFrameProgress;
    var b = start.B + (end.B - start.B) * keyFrameProgress;
    var a = start.A + (end.A - start.A) * keyFrameProgress;
    return new Color(r, b, g, a);
};

Nullstone.FinishCreate(EasingColorKeyFrame);
//#endregion