/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Rect.js"/>
/// CODE

//#region Clip

function Clip(rect) {
    if (!Nullstone.IsReady)
        return;
    this.$super();
    var rounded = rect.RoundOut();
    this.X = rounded.X;
    this.Y = rounded.Y;
    this.Width = rounded.Width;
    this.Height = rounded.Height;
}
Nullstone.Extend(Clip, "Clip", Rect);

//#endregion
