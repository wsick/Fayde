/// <reference path="ColorKeyFrame.js"/>
/// CODE
/// <reference path="IEasingFunction.js"/>

//#region EasingColorKeyFrame
var EasingColorKeyFrame = Nullstone.Create("EasingColorKeyFrame", ColorKeyFrame);

//#region Properties

EasingColorKeyFrame.EasingFunctionProperty = DependencyProperty.Register("EasingFunction", function () { return IEasingFunction; }, EasingColorKeyFrame);

Nullstone.AutoProperties(EasingColorKeyFrame, [
    EasingColorKeyFrame.EasingFunctionProperty
]);

//#endregion

Nullstone.FinishCreate(EasingColorKeyFrame);
//#endregion