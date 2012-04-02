/// <reference path="../Runtime/Nullstone.js" />
/// CODE

//#region _TextLayoutGlyphCluster
var _TextLayoutGlyphCluster = Nullstone.Create("_TextLayoutGlyphCluster", null, 3);

_TextLayoutGlyphCluster.Instance.Init = function (text, font, selected) {
    this._Text = text;
    this._Selected = selected == true;
    this._Advance = Surface.MeasureText(text, font).Width;
};

_TextLayoutGlyphCluster.Instance._Render = function (ctx, origin, attrs, x, y) {
    if (this._Text.length == 0 || this._Advance == 0.0)
        return;
    var font = attrs.GetFont();
    var y0 = font._Ascender();
    ctx.Transform(new TranslationMatrix(x, y - y0));

    var brush;
    var area;
    if (this._Selected && (brush = attrs.GetBackground(true))) {
        area = new Rect(origin.X, origin.Y, this._Advance, font.GetActualHeight());
        ctx.FillRect(brush, area); //selection background
    }
    if (!(brush = attrs.GetForeground(this._Selected)))
        return;
    ctx.CustomRender(_TextLayoutGlyphCluster._Painter, this._Text, brush, attrs.GetFont());
    if (attrs.IsUnderlined()) {
        //TODO: Underline
    }
};
_TextLayoutGlyphCluster._Painter = function (args) {
    var canvasCtx = args[0];
    var text = args[1];
    var foreground = args[2];
    var font = args[3];
    
    foreground.SetupBrush(canvasCtx);
    canvasCtx.fillStyle = foreground.ToHtml5Object();
    canvasCtx.font = font.ToHtml5Object();
    canvasCtx.textAlign = "left";
    canvasCtx.textBaseline = "top";
    canvasCtx.fillText(text, 0, 0);
};

Nullstone.FinishCreate(_TextLayoutGlyphCluster);
//#endregion