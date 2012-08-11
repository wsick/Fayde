/// <reference path="../../Core/DependencyObject.js"/>
/// CODE

//#region Effect
var Effect = Nullstone.Create("Effect", DependencyObject);

//#region Properties

Effect.EffectMappingProperty = DependencyProperty.Register("EffectMapping", function () { return GeneralTransform; }, Effect);

Nullstone.AutoProperties(Effect, [
    Effect.EffectMappingProperty
]);

//#endregion

Nullstone.FinishCreate(Effect);
//#endregion