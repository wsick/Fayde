/// <reference path="../Runtime/TypeManagement.ts" />

class Clip {
    X: number;
    Y: number;
    Width: number;
    Height: number;
    constructor(r: rect) {
        var rounded = rect.roundOut(rect.copyTo(r));
        this.X = rounded.X;
        this.Y = rounded.Y;
        this.Width = rounded.Width;
        this.Height = rounded.Height;
    }
}
Fayde.RegisterType(Clip, "window", Fayde.XMLNSX);
