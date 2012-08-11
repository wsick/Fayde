/// <reference path="KeyFrame.js"/>
/// <reference path="../../Primitives/KeyTime.js"/>
/// CODE

//#region DoubleKeyFrame
var DoubleKeyFrame = Nullstone.Create("DoubleKeyFrame", KeyFrame);

//#region Properties

DoubleKeyFrame.KeyTimeProperty = DependencyProperty.Register("KeyTime", function () { return KeyTime; }, DoubleKeyFrame);
DoubleKeyFrame.ValueProperty = DependencyProperty.Register("Value", function () { return Number; }, DoubleKeyFrame);

Nullstone.AutoProperties(DoubleKeyFrame, [
    DoubleKeyFrame.KeyTimeProperty,
    DoubleKeyFrame.ValueProperty
]);

//#endregion

Nullstone.FinishCreate(DoubleKeyFrame);
//#endregion