/// <reference path="../Runtime/Nullstone.js" />
/// CODE

//#region _TextLayoutLine
var _TextLayoutLine = Nullstone.Create("_TextLayoutLine", null, 3);

_TextLayoutLine.Instance.Init = function (layout, start, offset) {
    this._Runs = new Array();
    this._Layout = layout;
    this._Start = start;
    this._Offset = offset;
    this._Advance = 0.0; //after layout, will contain horizontal distance this line advances
    this._Descend = 0.0;
    this._Height = 0.0;
    this._Width = 0.0;
    this._Length = 0;
};

_TextLayoutLine.Instance._Render = function (ctx, origin, left, top) {
    var run;
    var x0 = left;
    //var y0 = top + this._Height + this._Descend; //not using this: we set html5 canvas to render top-left corner of text at x,y
    var y0 = top;

    for (var i = 0; i < this._Runs.length; i++) {
        run = this._Runs[i];
        run._Render(ctx, origin, x0, y0);
        x0 += run._Advance;
    }
};
_TextLayoutLine.Instance.__Debug = function (allText) {
    var t = "";
    t += "\t\tRuns: " + this._Runs.length.toString() + "\n";
    for (var i = 0; i < this._Runs.length; i++) {
        t += "\t\t\tRun " + i.toString() + ": ";
        t += this._Runs[i].__Debug(allText);
        t += "\n";
    }
    return t;
};

Nullstone.FinishCreate(_TextLayoutLine);
//#endregion