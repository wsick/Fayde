/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Rect.js"/>
/// CODE

//#region Clip
var Clip = Nullstone.Create("Clip", undefined, 1);

Clip.Instance.Init = function (rect) {
    var rounded = rect.RoundOut();
    this.X = rounded.X;
    this.Y = rounded.Y;
    this.Width = rounded.Width;
    this.Height = rounded.Height;
};

Nullstone.FinishCreate(Clip);
//#endregion