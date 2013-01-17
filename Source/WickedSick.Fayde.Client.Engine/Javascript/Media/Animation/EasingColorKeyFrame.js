/// <reference path="ColorKeyFrame.js"/>
/// <reference path="IEasingFunction.js"/>
/// CODE

(function (namespace) {
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

    namespace.EasingColorKeyFrame = Nullstone.FinishCreate(EasingColorKeyFrame);
})(window);