/// <reference path="Effect.ts" />
/// CODE

module Fayde.Media.Effects {
    export class BlurEffect extends Effect {
        static RadiusProperty: DependencyProperty = DependencyProperty.Register("Radius", () => Number, BlurEffect, undefined, (d, args) => (<Media.Effects.Effect>d)._EffectChanged(args));
        Radius: number;
    }
    Nullstone.RegisterType(BlurEffect, "BlurEffect");
}