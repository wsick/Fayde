/// <reference path="../Runtime/Nullstone.ts" />
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
    return Clip;
})();
Nullstone.RegisterType(Clip, "Clip");
//@ sourceMappingURL=Clip.js.map
