/// <reference path="PointKeyFrame.js"/>
/// <reference path="IEasingFunction.js"/>
/// CODE

(function (namespace) {
    var EasingPointKeyFrame = Nullstone.Create("EasingPointKeyFrame", PointKeyFrame);

    //#region Properties

    EasingPointKeyFrame.EasingFunctionProperty = DependencyProperty.Register("EasingFunction", function () { return IEasingFunction; }, EasingPointKeyFrame);

    Nullstone.AutoProperties(EasingPointKeyFrame, [
        EasingPointKeyFrame.EasingFunctionProperty
    ]);

    //#endregion

    EasingPointKeyFrame.Instance.InterpolateValue = function (baseValue, keyFrameProgress) {
        if (keyFrameProgress >= 1.0)
            return this.Value;

        var start = baseValue;
        var end = this.Value;

        var easingFunction = this.EasingFunction;
        if (easingFunction)
            keyFrameProgress = easingFunction.Ease(keyFrameProgress);

        return Point.LERP(start, end, keyFrameProgress);
    };

    namespace.EasingPointKeyFrame = Nullstone.FinishCreate(EasingPointKeyFrame);
})(window);