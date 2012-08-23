/// <reference path="../Runtime/Nullstone.js" />
/// CODE
/// <reference path="../Engine/RenderContext.js"/>

//#region _TextLayoutGlyphCluster
var _TextLayoutGlyphCluster = Nullstone.Create("_TextLayoutGlyphCluster", null, 3);

_TextLayoutGlyphCluster.Instance.Init = function (text, font, selected) {
    this._Text = text;
    this._Selected = selected == true;
    this._Advance = Surface.MeasureText(text, font).Width;
};

_TextLayoutGlyphCluster.Instance._Render = function (ctx, origin, attrs, x, y) {
    /// <param name="ctx" type="_RenderContext"></param>
    if (this._Text.length == 0 || this._Advance == 0.0)
        return;
    var font = attrs.GetFont();
    var y0 = font._Ascender();
    ctx.Transform(Matrix.CreateTranslate(x, y - y0));

    var brush;
    var fontHeight = font.GetActualHeight();
    var area = new Rect(origin.X, origin.Y, this._Advance, fontHeight);
    if (this._Selected && (brush = attrs.GetBackground(true))) {
        ctx.FillRect(brush, area); //selection background
    }
    if (!(brush = attrs.GetForeground(this._Selected)))
        return;

    var canvasCtx = ctx.GetCanvasContext();
    brush.SetupBrush(canvasCtx, area);
    var brushHtml5 = brush.ToHtml5Object();
    canvasCtx.fillStyle = brushHtml5;
    canvasCtx.font = font.ToHtml5Object();
    canvasCtx.textAlign = "left";
    canvasCtx.textBaseline = "top";
    canvasCtx.fillText(this._Text, 0, 0);
    DrawDebug("Text: " + this._Text + " [" + canvasCtx.fillStyle.toString() + "]");

    if (attrs.IsUnderlined()) {
        canvasCtx.beginPath();
        canvasCtx.moveTo(0, fontHeight);
        canvasCtx.lineTo(this._Advance, fontHeight);
        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = brushHtml5;
        canvasCtx.stroke();
    }
};

Nullstone.FinishCreate(_TextLayoutGlyphCluster);
//#endregion