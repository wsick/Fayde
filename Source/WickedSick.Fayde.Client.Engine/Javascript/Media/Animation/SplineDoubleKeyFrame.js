/// <reference path="DoubleKeyFrame.js"/>
/// <reference path="KeySpline.js"/>
/// CODE

//#region SplineDoubleKeyFrame
var SplineDoubleKeyFrame = Nullstone.Create("SplineDoubleKeyFrame", DoubleKeyFrame);

//#region Properties

SplineDoubleKeyFrame.KeySplineProperty = DependencyProperty.Register("KeySpline", function () { return KeySpline; }, SplineDoubleKeyFrame);

Nullstone.AutoProperties(SplineDoubleKeyFrame, [
    SplineDoubleKeyFrame.KeySplineProperty
]);

//#endregion

SplineDoubleKeyFrame.Instance.InterpolateValue = function (baseValue, keyFrameProgress) {
    if (keyFrameProgress >= 1.0)
        return this.Value;

    var start = baseValue;
    var end = this.Value;
    var splineProgress = this.KeySpline.GetSplineProgress(keyFrameProgress);

    if (isNaN(start))
        start = 0;
    if (isNaN(end))
        end = 0;

    return start + (end - start) * splineProgress;
};

Nullstone.FinishCreate(SplineDoubleKeyFrame);
//#endregion