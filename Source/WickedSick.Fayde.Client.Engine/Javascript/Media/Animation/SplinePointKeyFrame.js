/// <reference path="PointKeyFrame.js"/>
/// <reference path="KeySpline.js"/>
/// CODE

//#region SplinePointKeyFrame
var SplinePointKeyFrame = Nullstone.Create("SplinePointKeyFrame", PointKeyFrame);

//#region Properties

SplinePointKeyFrame.KeySplineProperty = DependencyProperty.Register("KeySpline", function () { return KeySpline; }, SplinePointKeyFrame);

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

Nullstone.FinishCreate(SplinePointKeyFrame);
//#endregion