/// <reference path="Effect.ts" />

module Fayde.Media.Effects {
    export class BlurEffect extends Effect {
        static RadiusProperty: DependencyProperty = DependencyProperty.Register("Radius", () => Number, BlurEffect, undefined, (d, args) => (<Media.Effects.Effect>d)._EffectChanged(args));
        Radius: number;
    }
    Fayde.RegisterType(BlurEffect, "Fayde.Media.Effects", Fayde.XMLNS);
}