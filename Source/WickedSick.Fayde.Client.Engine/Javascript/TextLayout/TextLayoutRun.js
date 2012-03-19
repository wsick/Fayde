/// <reference path="../Runtime/Nullstone.js" />
/// CODE

//#region _TextLayoutRun
var _TextLayoutRun = Nullstone.Create("_TextLayoutRun", null, 3);

_TextLayoutRun.Instance.Init = function (line, attrs, start) {
    this._Clusters = new Array();
    this._Attrs = attrs;
    this._Start = start;
    this._Line = line;
    this._Advance = 0.0; //after layout, will contain horizontal distance this run advances
    this._Length = 0;
};

_TextLayoutRun.Instance._GenerateCache = function () {
    var selectionLength = this._Line._Layout.GetSelectionLength();
    var selectionStart = this._Line._Layout.GetSelectionStart();
    var text = this._Line._Layout.GetText();
    var font = this._Attrs.GetFont();

    var len;
    var index = this._Start;
    //glyph before selection
    if (selectionLength === 0 || this._Start < selectionStart) {
        len = selectionLength > 0 ? Math.min(selectionStart - this._Start, this._Length) : this._Length;
        this._Clusters.push(new _TextLayoutGlyphCluster(text.substr(this._Start, len), font));
        index += len;
    }

    //glyph with selection
    var selectionEnd = selectionStart + selectionLength;
    var runEnd = this._Start + this._Length;
    if (index < runEnd && index < selectionEnd) {
        len = Math.min(runEnd - index, selectionEnd - index);
        this._Clusters.push(new _TextLayoutGlyphCluster(text.substr(index, len), font, true));
        index += len;
    }

    //glyph after selection
    if (index < runEnd) {
        len = runEnd - index;
        this._Clusters.push(new _TextLayoutGlyphCluster(text.substr(index, len), font));
        index += len;
    }
};
_TextLayoutRun.Instance._ClearCache = function () {
    this._Clusters = [];
};
_TextLayoutRun.Instance._Render = function (ctx, origin, x, y) {
    var x0 = x;
    if (this._Clusters.length === 0)
        this._GenerateCache();

    for (var i = 0; i < this._Clusters.length; i++) {
        var cluster = this._Clusters[i];
        ctx.Save();
        cluster._Render(ctx, origin, this._Attrs, x0, y);
        ctx.Restore();
        x0 += cluster._Advance;
    }
};
_TextLayoutRun.Instance.__Debug = function (allText) {
    return allText.substr(this._Start, this._Length);
};

Nullstone.FinishCreate(_TextLayoutRun);
//#endregion