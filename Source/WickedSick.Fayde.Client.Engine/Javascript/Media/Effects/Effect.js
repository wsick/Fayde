/// <reference path="../../Core/DependencyObject.js"/>
/// CODE
/// <reference path="../../Primitives/Thickness.js"/>

//#region Effect
var Effect = Nullstone.Create("Effect", DependencyObject);

//#region Properties

Effect.EffectMappingProperty = DependencyProperty.Register("EffectMapping", function () { return GeneralTransform; }, Effect);

Nullstone.AutoProperties(Effect, [
    Effect.EffectMappingProperty
]);

//#endregion

Effect.Instance.Padding = function () {
    return new Thickness();
};

Effect.Instance.PreRender = function (ctx) {
    AbstractMethod("Effect.PreRender");
};

Nullstone.FinishCreate(Effect);
//#endregion