/// <reference path="EasingFunctionBase.js"/>
/// CODE

(function (namespace) {
    var SineEase = Nullstone.Create("SineEase", EasingFunctionBase);

    SineEase.Instance.EaseInCore = function (t) {
        return 1 - (Math.sin(1 - t) * (Math.PI / 2));
    };

    namespace.SineEase = Nullstone.FinishCreate(SineEase);
})(window);