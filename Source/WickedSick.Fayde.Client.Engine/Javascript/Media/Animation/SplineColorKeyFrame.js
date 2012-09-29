/// <reference path="ColorKeyFrame.js"/>
/// <reference path="KeySpline.js"/>
/// CODE

//#region SplineColorKeyFrame
var SplineColorKeyFrame = Nullstone.Create("SplineColorKeyFrame", ColorKeyFrame);

//#region Properties

SplineColorKeyFrame.KeySplineProperty = DependencyProperty.Register("KeySpline", function () { return KeySpline; }, SplineColorKeyFrame);

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

Nullstone.FinishCreate(SplineColorKeyFrame);
//#endregion