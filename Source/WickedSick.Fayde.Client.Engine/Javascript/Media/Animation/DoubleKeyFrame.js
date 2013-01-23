/// <reference path="KeyFrame.js"/>
/// <reference path="KeyFrameCollection.js"/>
/// <reference path="../../Primitives/KeyTime.js"/>
/// CODE

(function (namespace) {
    var DoubleKeyFrame = Nullstone.Create("DoubleKeyFrame", namespace.KeyFrame);

    //#region Properties

    DoubleKeyFrame.KeyTimeProperty = DependencyProperty.Register("KeyTime", function () { return KeyTime; }, DoubleKeyFrame);
    DoubleKeyFrame.ValueProperty = DependencyProperty.Register("Value", function () { return Number; }, DoubleKeyFrame);

    Nullstone.AutoProperties(DoubleKeyFrame, [
        DoubleKeyFrame.KeyTimeProperty,
        DoubleKeyFrame.ValueProperty
    ]);

    //#endregion

    namespace.DoubleKeyFrame = Nullstone.FinishCreate(DoubleKeyFrame);
})(Nullstone.Namespace("Fayde.Media.Animation"));

(function (namespace) {
    var DoubleKeyFrameCollection = Nullstone.Create("DoubleKeyFrameCollection", namespace.KeyFrameCollection);
    DoubleKeyFrameCollection.Instance.IsElementType = function (value) {
        return value instanceof namespace.DoubleKeyFrame;
    };
    namespace.DoubleKeyFrameCollection = Nullstone.FinishCreate(DoubleKeyFrameCollection);
})(Nullstone.Namespace("Fayde.Media.Animation"));

(function (namespace) {
    var DiscreteDoubleKeyFrame = Nullstone.Create("DiscreteDoubleKeyFrame", namespace.DoubleKeyFrame);
    DiscreteDoubleKeyFrame.Instance.InterpolateValue = function (baseValue, keyFrameProgress) {
        if (keyFrameProgress >= 1.0)
            return this.Value;
        return baseValue;
    };
    namespace.DiscreteDoubleKeyFrame = Nullstone.FinishCreate(DiscreteDoubleKeyFrame);
})(Nullstone.Namespace("Fayde.Media.Animation"));

(function (namespace) {
    var SplineDoubleKeyFrame = Nullstone.Create("SplineDoubleKeyFrame", namespace.DoubleKeyFrame);

    //#region Properties

    SplineDoubleKeyFrame.KeySplineProperty = DependencyProperty.Register("KeySpline", function () { return namespace.KeySpline; }, SplineDoubleKeyFrame);

    Nullstone.AutoProperties(SplineDoubleKeyFrame, [
        SplineDoubleKeyFrame.KeySplineProperty
    ]);

    //#endregion

    SplineDoubleKeyFrame.Instance.InterpolateValue = function (baseValue, keyFrameProgress) {
        if (keyFrameProgress >= 1.0)
            return this.Value;

        var start = baseValue;
        var end = this.Value;
        var splineProgress = keyFrameProgress;
        var keySpline = this.KeySpline;
        if (keySpline)
            splineProgress = keySpline.GetSplineProgress(keyFrameProgress);

        if (isNaN(start))
            start = 0;
        if (isNaN(end))
            end = 0;

        return start + (end - start) * splineProgress;
    };

    namespace.SplineDoubleKeyFrame = Nullstone.FinishCreate(SplineDoubleKeyFrame);
})(Nullstone.Namespace("Fayde.Media.Animation"));

(function (namespace) {
    var LinearDoubleKeyFrame = Nullstone.Create("LinearDoubleKeyFrame", namespace.DoubleKeyFrame);
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
})(Nullstone.Namespace("Fayde.Media.Animation"));

(function (namespace) {
    var EasingDoubleKeyFrame = Nullstone.Create("EasingDoubleKeyFrame", namespace.DoubleKeyFrame);

    //#region Properties

    EasingDoubleKeyFrame.EasingFunctionProperty = DependencyProperty.Register("EasingFunction", function () { return namespace.IEasingFunction; }, EasingDoubleKeyFrame);

    Nullstone.AutoProperties(EasingDoubleKeyFrame, [
        EasingDoubleKeyFrame.EasingFunctionProperty
    ]);

    //#endregion

    EasingDoubleKeyFrame.Instance.InterpolateValue = function (baseValue, keyFrameProgress) {
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

    namespace.EasingDoubleKeyFrame = Nullstone.FinishCreate(EasingDoubleKeyFrame);
})(Nullstone.Namespace("Fayde.Media.Animation"));
