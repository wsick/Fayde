/// <reference path="Effect.js"/>
/// CODE

(function (namespace) {
    var BlurEffect = Nullstone.Create("BlurEffect", namespace.Effect);

    //#region Properties

    BlurEffect.RadiusProperty = DependencyProperty.Register("Radius", function () { return Number; }, BlurEffect);

    Nullstone.AutoProperties(BlurEffect, [
        BlurEffect.RadiusProperty
    ]);

    //#endregion

    namespace.BlurEffect = Nullstone.FinishCreate(BlurEffect);
})(Nullstone.Namespace("Fayde.Media.Effects"));