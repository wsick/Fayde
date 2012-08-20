/// <reference path="EasingFunctionBase.js"/>
/// CODE

//#region BackEase
var BackEase = Nullstone.Create("BackEase", EasingFunctionBase);

//#region Properties

BackEase.AmplitudeProperty = DependencyProperty.Register("Amplitude", function() { return Number; }, BackEase);

Nullstone.AutoProperties(BackEase, [
    BackEase.AmplitudeProperty
]);

//#endregion

Nullstone.FinishCreate(BackEase);
//#endregion