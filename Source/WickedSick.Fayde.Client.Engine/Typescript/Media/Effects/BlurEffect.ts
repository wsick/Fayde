/// <reference path="Effect.ts" />
/// CODE

module Fayde.Media.Effects {
    export class BlurEffect extends Effect {
        static RadiusProperty: DependencyProperty = DependencyProperty.Register("Radius", () => Number, BlurEffect);
        Radius: number;
    }
    Nullstone.RegisterType(BlurEffect, "BlurEffect");
}