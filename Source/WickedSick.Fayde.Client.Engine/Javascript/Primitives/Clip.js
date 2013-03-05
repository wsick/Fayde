/// <reference path="../Runtime/Nullstone.js" />
/// CODE
/// <reference path="../Primitives.js"/>

(function (namespace) {
    var Clip = Nullstone.Create("Clip", undefined, 1);

    Clip.Instance.Init = function (irect) {
        var rounded = rect.clone(irect);
        rect.roundOut(rounded);
        this.X = rounded.X;
        this.Y = rounded.Y;
        this.Width = rounded.Width;
        this.Height = rounded.Height;
    };

    namespace.Clip = Nullstone.FinishCreate(Clip);
})(window);