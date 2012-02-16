/// <reference path="../Runtime/RefObject.js" />
/// <reference path="Rect.js"/>
/// CODE

//#region Clip

function Clip(rect) {
    Rect.call(this);
    var rounded = rect.RoundOut();
    this.X = rounded.X;
    this.Y = rounded.Y;
    this.Width = rounded.Width;
    this.Height = rounded.Height;
}
Clip.InheritFrom(Rect);

//#endregion
