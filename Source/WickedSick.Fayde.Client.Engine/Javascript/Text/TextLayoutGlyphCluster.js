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
    var area;
    if (this._Selected && (brush = attrs.GetBackground(true))) {
        area = new Rect(origin.X, origin.Y, this._Advance, font.GetActualHeight());
        ctx.FillRect(brush, area); //selection background
    }
    if (!(brush = attrs.GetForeground(this._Selected)))
        return;

    var canvasCtx = ctx.GetCanvasContext();
    brush.SetupBrush(canvasCtx);
    canvasCtx.fillStyle = brush.ToHtml5Object();
    canvasCtx.font = font.ToHtml5Object();
    canvasCtx.textAlign = "left";
    canvasCtx.textBaseline = "top";
    canvasCtx.fillText(this._Text, 0, 0);

    if (attrs.IsUnderlined()) {
        //TODO: Underline
    }
};

Nullstone.FinishCreate(_TextLayoutGlyphCluster);
//#endregion