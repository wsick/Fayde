/// CODE
/// <reference path="rect.ts" />

class Clip {
    static _TypeName = "Clip";
    X: number;
    Y: number;
    Width: number;
    Height: number;
    constructor(r: rect) {
        var rounded = rect.roundOut(rect.clone(r));
        this.X = rounded.X;
        this.Y = rounded.Y;
        this.Width = rounded.Width;
        this.Height = rounded.Height;
    }
}