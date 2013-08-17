/// <reference path="Effect.ts" />
/// CODE

module Fayde.Media.Effects {
    export class BlurEffect extends Effect {
        static RadiusProperty: DependencyProperty = DependencyProperty.Register("Radius", () => Number, BlurEffect, undefined, (d, args) => (<Media.Effects.Effect>d)._EffectChanged(args));
        Radius: number;
    }
    Fayde.RegisterType(BlurEffect, {
    	Name: "BlurEffect",
    	Namespace: "Fayde.Media.Effects",
    	XmlNamespace: Fayde.XMLNS
    });
}