/// <reference path="/Scripts/kinetic-v2.3.2.js"/>

Surface.prototype = new Object();
Surface.prototype.constructor = Surface;
/*
function Surface(containerId, width, height) {
    this._Stage = new Kinetic.Stage(containerId, width, height);
}
*/
function Surface() {
}
Surface.prototype.Init = function (canvasId) {
    this._Canvas = document.getElementById(canvasId);
    this._Ctx = this._Canvas.getContext("2d");
};
Surface.prototype._Attach = function (/* UIElement */element) {
};
Surface.prototype._AttachLayer = function (/* UIElement */layer) {
};
Surface.prototype.Paint = function (ctx) {
    var renderList = new Array();
    var layerCount = 0;
    if (this._Layers)
        layerCount = this._Layers.GetCount();
};
Surface.prototype.DrawRectangle = function (backgroundBrush, borderBrush, boundingRect, thickness, cornerRadius, pathOnly) {
    var pathRect = boundingRect.GrowByThickness(thickness.Half().Negate());

    this._Ctx.beginPath();
    if (cornerRadius.IsZero()) {
        this._Ctx.rect(pathRect.Left, pathRect.Top, pathRect.Width, pathRect.Height);
    } else {
        var left = pathRect.Left;
        var top = pathRect.Top;
        var right = pathRect.Left + pathRect.Width;
        var bottom = pathRect.Top + pathRect.Height;

        this._Ctx.moveTo(left + cornerRadius.TopLeft, top);
        //top edge
        this._Ctx.lineTo(right - cornerRadius.TopRight, top);
        //top right arc
        if (cornerRadius.TopRight > 0)
            this._Ctx.arcTo(right, top, right, top + cornerRadius.TopRight, cornerRadius.TopRight);
        //right edge
        this._Ctx.lineTo(right, bottom - cornerRadius.BottomRight);
        //bottom right arc
        if (cornerRadius.BottomRight > 0)
            this._Ctx.arcTo(right, bottom, right - cornerRadius.BottomRight, bottom, cornerRadius.BottomRight);
        //bottom edge
        this._Ctx.lineTo(left + cornerRadius.BottomLeft, bottom);
        //bottom left arc
        if (cornerRadius.BottomLeft > 0)
            this._Ctx.arcTo(left, bottom, left, bottom - cornerRadius.BottomLeft, cornerRadius.BottomLeft);
        //left edge
        this._Ctx.lineTo(left, top + cornerRadius.TopRight);
        //top left arc
        if (cornerRadius.TopLeft > 0)
            this._Ctx.arcTo(left, top, left + cornerRadius.TopLeft, top, cornerRadius.TopLeft);
    }
    if (backgroundBrush) {
        this._Ctx.fillStyle = backgroundBrush._TranslateToHtml5();
        this._Ctx.fill();
    }
    if (borderBrush && !thickness.IsEmpty()) {
        this._Ctx.lineWidth = thickness;
        this._Ctx.strokeStyle = borderBrush._TranslateToHtml5();
        this._Ctx.stroke();
    }
    this._Ctx.closePath();
};