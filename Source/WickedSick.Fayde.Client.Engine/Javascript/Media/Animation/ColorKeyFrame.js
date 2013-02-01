/// <reference path="KeyFrame.js"/>
/// <reference path="KeyFrameCollection.js"/>
/// <reference path="../../Primitives/KeyTime.js"/>
/// <reference path="../../Primitives/Color.js"/>
/// <reference path="IEasingFunction.js"/>
/// CODE

(function (namespace) {
    var ColorKeyFrame = Nullstone.Create("ColorKeyFrame", namespace.KeyFrame);

    //#region Properties

    ColorKeyFrame.KeyTimeProperty = DependencyProperty.Register("KeyTime", function () { return KeyTime; }, ColorKeyFrame);
    ColorKeyFrame.ValueProperty = DependencyProperty.Register("Value", function () { return Color; }, ColorKeyFrame);

    Nullstone.AutoProperties(ColorKeyFrame, [
        ColorKeyFrame.KeyTimeProperty,
        ColorKeyFrame.ValueProperty
    ]);

    //#endregion

    namespace.ColorKeyFrame = Nullstone.FinishCreate(ColorKeyFrame);
})(Nullstone.Namespace("Fayde.Media.Animation"));

(function (namespace) {
    var ColorKeyFrameCollection = Nullstone.Create("ColorKeyFrameCollection", namespace.KeyFrameCollection);
    ColorKeyFrameCollection.Instance.IsElementType = function (value) {
        return value instanceof namespace.ColorKeyFrame;
    };
    namespace.ColorKeyFrameCollection = Nullstone.FinishCreate(ColorKeyFrameCollection);
})(Nullstone.Namespace("Fayde.Media.Animation"));

(function (namespace) {
    var DiscreteColorKeyFrame = Nullstone.Create("DiscreteColorKeyFrame", namespace.ColorKeyFrame);
    DiscreteColorKeyFrame.Instance.InterpolateValue = function (baseValue, keyFrameProgress) {
        if (keyFrameProgress >= 1.0)
            return this.Value;
        return baseValue;
    };
    namespace.DiscreteColorKeyFrame = Nullstone.FinishCreate(DiscreteColorKeyFrame);
})(Nullstone.Namespace("Fayde.Media.Animation"));

(function (namespace) {
    var EasingColorKeyFrame = Nullstone.Create("EasingColorKeyFrame", namespace.ColorKeyFrame);

    //#region Properties

    EasingColorKeyFrame.EasingFunctionProperty = DependencyProperty.Register("EasingFunction", function () { return namespace.IEasingFunction; }, EasingColorKeyFrame);

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
})(Nullstone.Namespace("Fayde.Media.Animation"));

(function (namespace) {
    var LinearColorKeyFrame = Nullstone.Create("LinearColorKeyFrame", namespace.ColorKeyFrame);
    LinearColorKeyFrame.Instance.InterpolateValue = function (baseValue, keyFrameProgress) {
        return Color.LERP(baseValue, this.Value, keyFrameProgress);
    };
    namespace.LinearColorKeyFrame = Nullstone.FinishCreate(LinearColorKeyFrame);
})(Nullstone.Namespace("Fayde.Media.Animation"));

(function (namespace) {
    var SplineColorKeyFrame = Nullstone.Create("SplineColorKeyFrame", namespace.ColorKeyFrame);

    //#region Properties

    SplineColorKeyFrame.KeySplineProperty = DependencyProperty.Register("KeySpline", function () { return namespace.KeySpline; }, SplineColorKeyFrame);

    Nullstone.AutoProperties(SplineColorKeyFrame, [
        SplineColorKeyFrame.KeySplineProperty
    ]);

    //#endregion

    SplineColorKeyFrame.Instance.InterpolateValue = function (baseValue, keyFrameProgress) {
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

        return Color.LERP(start, end, splineProgress);
    };

    namespace.SplineColorKeyFrame = Nullstone.FinishCreate(SplineColorKeyFrame);
})(Nullstone.Namespace("Fayde.Media.Animation"));
