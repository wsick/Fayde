/// <reference path="../../Runtime/Nullstone.ts" />
/// <reference path="../../Core/DependencyObject.ts" />
/// <reference path="../GeneralTransform.ts" />
/// CODE
/// <reference path="../../Primitives/Thickness.ts" />
/// <reference path="../../Engine/RenderContext.ts" />

module Fayde.Media.Effects {
    export interface IEffectListener {
        EffectChanged(effect: Media.Effects.Effect);
    }

    export class Effect extends DependencyObject {
        private _Listener: Media.Effects.IEffectListener;

        static EffectMappingProperty: DependencyProperty = DependencyProperty.Register("EffectMapping", () => GeneralTransform, Effect, undefined, (d, args) => (<Media.Effects.Effect>d)._EffectChanged(args));
        EffectMapping: GeneralTransform;

        Padding(): Thickness { return new Thickness(); }
        GetPadding(thickness: Thickness): boolean { return false; }
        PreRender(ctx: RenderContext) {
            //Abstract Method
        }

        Listen(listener: Media.Effects.IEffectListener) { this._Listener = listener; }
        Unlisten(listener: Media.Effects.IEffectListener) { if (this._Listener === listener) this._Listener = null; }
        _EffectChanged(args: IDependencyPropertyChangedEventArgs) {
            var listener = this._Listener;
            if (listener) listener.EffectChanged(this);
        }
    }
    Fayde.RegisterType(Effect, {
    	Name: "Effect",
    	Namespace: "Fayde.Media.Effects",
    	XmlNamespace: Fayde.XMLNS
    });
}