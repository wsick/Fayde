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

Nullstone.FinishCreate(SplineDoubleKeyFrame);
//#endregion