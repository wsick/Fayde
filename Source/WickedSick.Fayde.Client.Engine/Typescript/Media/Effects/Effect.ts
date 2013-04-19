/// <reference path="../../Runtime/Nullstone.ts" />
/// <reference path="../../Core/DependencyObject.ts" />
/// <reference path="../GeneralTransform.ts" />
/// CODE
/// <reference path="../../Primitives/Thickness.ts" />
/// <reference path="../../Engine/RenderContext.ts" />

module Fayde.Media.Effects {
    export class Effect extends DependencyObject {
        static EffectMappingProperty: DependencyProperty = DependencyProperty.Register("EffectMapping", () => GeneralTransform, Effect);
        EffectMapping: GeneralTransform;

        Padding(): Thickness { return new Thickness(); }
        GetPadding(thickness: Thickness): bool { return false; }
        PreRender(ctx: RenderContext) {
            //Abstract Method
        }
    }
    Nullstone.RegisterType(Effect, "Effect");
}