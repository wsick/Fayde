/// <reference path="../Runtime/RefObject.js" />
/// CODE

//#region _TextLayoutGlyphCluster

function _TextLayoutGlyphCluster(text, font, selected) {
    RefObject.call(this);
    this._Text = text;
    this._Selected = selected == true;
    this._Advance = Surface.MeasureText(text, font).Width;
}
_TextLayoutGlyphCluster.InheritFrom(RefObject);

_TextLayoutGlyphCluster.prototype._Render = function (ctx, origin, attrs, x, y) {
    if (this._Text.length == 0 || this._Advance == 0.0)
        return;
    var font = attrs.GetFont();
    var y0 = font._Ascender();
    ctx.Transform(new TranslationMatrix(x, y - y0));

    var brush;
    var area;
    if (this._Selected && (brush = attrs.GetBackground(true))) {
        area = new Rect(origin.X, origin.Y, this._Advance, font.GetActualHeight());
        ctx.Fill(area, brush); //selection background
    }
    if (!(brush = attrs.GetForeground(this._Selected)))
        return;
    ctx.CustomRender(_TextLayoutGlyphCluster.Painter, this._Text, attrs.GetForeground(), attrs.GetFont());
    if (attrs.IsUnderlined()) {
        //TODO: Underline
    }
};
_TextLayoutGlyphCluster.Painter = function (canvasCtx, text, foreground, font) {
    canvasCtx.fillStyle = foreground._Translate(canvasCtx);
    canvasCtx.font = font._Translate();
    canvasCtx.textAlign = "left";
    canvasCtx.textBaseline = "top";
    canvasCtx.fillText(text, 0, 0);
};

//#endregion
