/// <reference path="DoubleKeyFrame.js"/>
/// <reference path="IEasingFunction.js"/>
/// CODE

//#region EasingDoubleKeyFrame
var EasingDoubleKeyFrame = Nullstone.Create("EasingDoubleKeyFrame", DoubleKeyFrame);

//#region Properties

EasingDoubleKeyFrame.EasingFunctionProperty = DependencyProperty.Register("EasingFunction", function () { return IEasingFunction; }, EasingDoubleKeyFrame);

Nullstone.AutoProperties(EasingDoubleKeyFrame, [
    EasingDoubleKeyFrame.EasingFunctionProperty
]);

//#endregion

Nullstone.FinishCreate(EasingDoubleKeyFrame);
//#endregion