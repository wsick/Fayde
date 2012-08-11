/// <reference path="Effect.js"/>
/// <reference path="../../Primitives/Color.js"/>
/// CODE

//#region DropShadowEffect
var DropShadowEffect = Nullstone.Create("DropShadowEffect", Effect);

//#region Properties

DropShadowEffect.BlurRadiusProperty = DependencyProperty.Register("BlurRadius", function () { return Number; }, DropShadowEffect);
DropShadowEffect.ColorProperty = DependencyProperty.Register("Color", function () { return Color; }, DropShadowEffect);
DropShadowEffect.DirectionProperty = DependencyProperty.Register("Direction", function () { return Number; }, DropShadowEffect);
DropShadowEffect.OpacityProperty = DependencyProperty.Register("Opacity", function () { return Number; }, DropShadowEffect);
DropShadowEffect.ShadowDepthProperty = DependencyProperty.Register("ShadowDepth", function () { return Number; }, DropShadowEffect);

Nullstone.AutoProperties(DropShadowEffect, [
    DropShadowEffect.BlurRadiusProperty,
    DropShadowEffect.ColorProperty,
    DropShadowEffect.DirectionProperty,
    DropShadowEffect.OpacityProperty,
    DropShadowEffect.ShadowDepthProperty
]);

//#endregion

Nullstone.FinishCreate(DropShadowEffect);
//#endregion