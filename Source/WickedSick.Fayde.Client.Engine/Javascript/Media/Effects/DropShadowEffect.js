/// <reference path="Effect.js"/>
/// <reference path="../../Primitives/Color.js"/>
/// CODE
/// <reference path="../../Primitives/Thickness.js"/>
/// <reference path="../../Engine/RenderContext.js"/>

//#region DropShadowEffect
var DropShadowEffect = Nullstone.Create("DropShadowEffect", Effect);

DropShadowEffect.MAX_BLUR_RADIUS = 20;
DropShadowEffect.MAX_SHADOW_DEPTH = 300;

//#region Properties

DropShadowEffect.BlurRadiusProperty = DependencyProperty.Register("BlurRadius", function () { return Number; }, DropShadowEffect, 5.0);
DropShadowEffect.ColorProperty = DependencyProperty.Register("Color", function () { return Color; }, DropShadowEffect, Color.KnownColors.Black);
DropShadowEffect.DirectionProperty = DependencyProperty.Register("Direction", function () { return Number; }, DropShadowEffect, 315.0);
DropShadowEffect.OpacityProperty = DependencyProperty.Register("Opacity", function () { return Number; }, DropShadowEffect, 1.0);
DropShadowEffect.ShadowDepthProperty = DependencyProperty.Register("ShadowDepth", function () { return Number; }, DropShadowEffect, 5.0);

Nullstone.AutoProperties(DropShadowEffect, [
    DropShadowEffect.BlurRadiusProperty,
    DropShadowEffect.ColorProperty,
    DropShadowEffect.DirectionProperty,
    DropShadowEffect.OpacityProperty,
    DropShadowEffect.ShadowDepthProperty
]);

//#endregion

DropShadowEffect.Instance.Padding = function () {
    /// <returns type="Thickness" />
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
    
};
DropShadowEffect.Instance.PreRender = function (ctx) {
    /// <param name="ctx" type="_RenderingContext"></param>
    var color = this.Color;
    var opacity = color.A * this.Opacity;

    var radius = Math.min(this.BlurRadius, DropShadowEffect.MAX_BLUR_RADIUS);
    var depth = Math.min(Math.max(0, this.ShadowDepth), DropShadowEffect.MAX_SHADOW_DEPTH);
    var direction = this.Direction * Math.PI / 180.0;
    var offsetX = Math.cos(direction) * depth;
    var offsetY = Math.sin(direction) * depth;

    var canvasCtx = ctx.GetCanvasContext();

    canvasCtx.shadowColor = "rgba(" + color.R + "," + color.G + "," + color.B + "," + opacity + ")";
    canvasCtx.shadowBlur = radius;
    canvasCtx.shadowOffsetX = offsetX;
    canvasCtx.shadowOffsetY = offsetY;
};

Nullstone.FinishCreate(DropShadowEffect);
//#endregion