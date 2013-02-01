/// <reference path="KeyFrame.js"/>
/// <reference path="KeyFrameCollection.js"/>
/// <reference path="../../Primitives/KeyTime.js"/>
/// <reference path="../../Primitives/Point.js"/>
/// CODE

(function (namespace) {
    var PointKeyFrame = Nullstone.Create("PointKeyFrame", namespace.KeyFrame);

    //#region Properties

    PointKeyFrame.KeyTimeProperty = DependencyProperty.Register("KeyTime", function () { return KeyTime; }, PointKeyFrame);
    PointKeyFrame.ValueProperty = DependencyProperty.Register("Value", function () { return Point; }, PointKeyFrame);

    Nullstone.AutoProperties(PointKeyFrame, [
        PointKeyFrame.KeyTimeProperty,
        PointKeyFrame.ValueProperty
    ]);

    //#endregion

    namespace.PointKeyFrame = Nullstone.FinishCreate(PointKeyFrame);
})(Nullstone.Namespace("Fayde.Media.Animation"));

(function (namespace) {
    var PointKeyFrameCollection = Nullstone.Create("PointKeyFrameCollection", namespace.KeyFrameCollection);
    PointKeyFrameCollection.Instance.IsElementType = function (value) {
        return value instanceof namespace.PointKeyFrame;
    };
    namespace.PointKeyFrameCollection = Nullstone.FinishCreate(PointKeyFrameCollection);
})(Nullstone.Namespace("Fayde.Media.Animation"));

(function (namespace) {
    var DiscretePointKeyFrame = Nullstone.Create("DiscretePointKeyFrame", namespace.PointKeyFrame);
    DiscretePointKeyFrame.Instance.InterpolateValue = function (baseValue, keyFrameProgress) {
        if (keyFrameProgress >= 1.0)
            return this.Value;
        return baseValue;
    };
    namespace.DiscretePointKeyFrame = Nullstone.FinishCreate(DiscretePointKeyFrame);
})(Nullstone.Namespace("Fayde.Media.Animation"));

(function (namespace) {
    var SplinePointKeyFrame = Nullstone.Create("SplinePointKeyFrame", namespace.PointKeyFrame);

    //#region Properties

    SplinePointKeyFrame.KeySplineProperty = DependencyProperty.Register("KeySpline", function () { return namespace.KeySpline; }, SplinePointKeyFrame);

    Nullstone.AutoProperties(SplinePointKeyFrame, [
        SplinePointKeyFrame.KeySplineProperty
    ]);

    //#endregion

    SplinePointKeyFrame.Instance.InterpolateValue = function (baseValue, keyFrameProgress) {
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

        return Point.LERP(start, end, splineProgress);
    };

    namespace.SplinePointKeyFrame = Nullstone.FinishCreate(SplinePointKeyFrame);
})(Nullstone.Namespace("Fayde.Media.Animation"));

(function (namespace) {
    var LinearPointKeyFrame = Nullstone.Create("LinearPointKeyFrame", namespace.PointKeyFrame);
    LinearPointKeyFrame.Instance.InterpolateValue = function (baseValue, keyFrameProgress) {
        return Point.LERP(baseValue, this.Value, keyFrameProgress);
    };
    namespace.LinearPointKeyFrame = Nullstone.FinishCreate(LinearPointKeyFrame);
})(Nullstone.Namespace("Fayde.Media.Animation"));

(function (namespace) {
    var EasingPointKeyFrame = Nullstone.Create("EasingPointKeyFrame", namespace.PointKeyFrame);

    //#region Properties

    EasingPointKeyFrame.EasingFunctionProperty = DependencyProperty.Register("EasingFunction", function () { return namespace.IEasingFunction; }, EasingPointKeyFrame);

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
})(Nullstone.Namespace("Fayde.Media.Animation"));
