/// <reference path="Effect.js"/>
/// CODE

//#region BlurEffect
var BlurEffect = Nullstone.Create("BlurEffect", Effect);

//#region Properties

BlurEffect.RadiusProperty = DependencyProperty.Register("Radius", function () { return Number; }, BlurEffect);

Nullstone.AutoProperties(BlurEffect, [
    BlurEffect.RadiusProperty
]);

//#endregion

Nullstone.FinishCreate(BlurEffect);
//#endregion