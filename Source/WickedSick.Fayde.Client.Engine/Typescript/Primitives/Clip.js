/// CODE
/// <reference path="rect.ts" />
var Clip = (function () {
    function Clip(r) {
        var rounded = rect.roundOut(rect.clone(r));
        this.X = rounded.X;
        this.Y = rounded.Y;
        this.Width = rounded.Width;
        this.Height = rounded.Height;
    }
    Clip._TypeName = "Clip";
    return Clip;
})();
//@ sourceMappingURL=Clip.js.map
