/// <reference path="../../Core/DependencyObject.ts" />
/// <reference path="../GeneralTransform.ts" />

module Fayde.Media.Effects {
    export class Effect extends DependencyObject {
        static EffectMappingProperty: DependencyProperty = DependencyProperty.Register("EffectMapping", () => GeneralTransform, Effect, undefined, React);
        EffectMapping: GeneralTransform;

        Padding(): Thickness { return new Thickness(); }
        GetPadding(thickness: Thickness): boolean { return false; }
        PreRender(ctx: RenderContextEx) {
            //Abstract Method
        }
    }
    Fayde.RegisterType(Effect, "Fayde.Media.Effects", Fayde.XMLNS);
}