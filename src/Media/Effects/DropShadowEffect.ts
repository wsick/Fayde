/// <reference path="Effect.ts" />
/// <reference path="../../Primitives/Color.ts" />

module Fayde.Media.Effects {
    export class DropShadowEffect extends Effect {
        static MAX_BLUR_RADIUS: number = 20;
        static MAX_SHADOW_DEPTH: number = 300;

        static BlurRadiusProperty: DependencyProperty = DependencyProperty.Register("BlurRadius", () => Number, DropShadowEffect, 5.0, (d, args) => (<Media.Effects.Effect>d)._EffectChanged(args));
        static ColorProperty: DependencyProperty = DependencyProperty.Register("Color", () => Color, DropShadowEffect, Color.KnownColors.Black, (d, args) => (<Media.Effects.Effect>d)._EffectChanged(args));
        static DirectionProperty: DependencyProperty = DependencyProperty.Register("Direction", () => Number, DropShadowEffect, 315.0, (d, args) => (<Media.Effects.Effect>d)._EffectChanged(args));
        static OpacityProperty: DependencyProperty = DependencyProperty.Register("Opacity", () => Number, DropShadowEffect, 1.0, (d, args) => (<Media.Effects.Effect>d)._EffectChanged(args));
        static ShadowDepthProperty: DependencyProperty = DependencyProperty.Register("ShadowDepth", () => Number, DropShadowEffect, 5.0, (d, args) => (<Media.Effects.Effect>d)._EffectChanged(args));
        BlurRadius: number;
        Color: Color;
        Direction: number;
        Opacity: number;
        ShadowDepth: number;

        Padding(): Thickness {
            var radius = Math.min(this.BlurRadius, DropShadowEffect.MAX_BLUR_RADIUS);
            var depth = Math.min(Math.max(0, this.ShadowDepth), DropShadowEffect.MAX_SHADOW_DEPTH);
            var direction = this.Direction * Math.PI / 180.0;
            var width = Math.ceil(radius);

            var offsetX = Math.cos(direction) * depth;
            var offsetY = Math.sin(direction) * depth;

            var left = -offsetX + width;
            var top = offsetY + width;
            var right = offsetX + width;
            var bottom = -offsetY + width;

            return new Thickness(left < 1.0 ? 1.0 : Math.ceil(left),
                top < 1.0 ? 1.0 : Math.ceil(top),
                right < 1.0 ? 1.0 : Math.ceil(right),
                bottom < 1.0 ? 1.0 : Math.ceil(bottom));
        }
        GetPadding(thickness: Thickness): boolean {
            var radius = Math.min(this.BlurRadius, DropShadowEffect.MAX_BLUR_RADIUS);
            var depth = Math.min(Math.max(0, this.ShadowDepth), DropShadowEffect.MAX_SHADOW_DEPTH);
            var direction = this.Direction * Math.PI / 180.0;
            var width = Math.ceil(radius);

            var offsetX = Math.cos(direction) * depth;
            var offsetY = Math.sin(direction) * depth;

            var left = -offsetX + width;
            var top = offsetY + width;
            var right = offsetX + width;
            var bottom = -offsetY + width;

            var l = left < 1.0 ? 1.0 : Math.ceil(left);
            var t = top < 1.0 ? 1.0 : Math.ceil(top);
            var r = right < 1.0 ? 1.0 : Math.ceil(right);
            var b = bottom < 1.0 ? 1.0 : Math.ceil(bottom);
            var flag = false;
            if (thickness.Left !== l) {
                thickness.Left = l;
                flag = true;
            }
            if (thickness.Top !== t) {
                thickness.Top = t;
                flag = true;
            }
            if (thickness.Right !== r) {
                thickness.Right = r;
                flag = true;
            }
            if (thickness.Bottom !== b) {
                thickness.Bottom = b;
                flag = true;
            }
            return flag;
        }
        PreRender(ctx: RenderContextEx) {
            var color = this.Color;
            var opacity = color.A * this.Opacity;

            var radius = Math.min(this.BlurRadius, DropShadowEffect.MAX_BLUR_RADIUS);
            var depth = Math.min(Math.max(0, this.ShadowDepth), DropShadowEffect.MAX_SHADOW_DEPTH);
            var direction = this.Direction * Math.PI / 180.0;
            var offsetX = Math.cos(direction) * depth;
            var offsetY = -Math.sin(direction) * depth;

            ctx.shadowColor = "rgba(" + color.R + "," + color.G + "," + color.B + "," + opacity + ")";
            ctx.shadowBlur = radius;
            ctx.shadowOffsetX = offsetX;
            ctx.shadowOffsetY = offsetY;
        }
    }
    Fayde.RegisterType(DropShadowEffect, "Fayde.Media.Effects", Fayde.XMLNS);
}