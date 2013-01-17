/// <reference path="EasingFunctionBase.js"/>
/// CODE

(function (namespace) {
    var CircleEase = Nullstone.Create("CircleEase", EasingFunctionBase);

    CircleEase.Instance.EaseInCore = function (t) {
        return 1 - Math.sqrt(1 - (t * t));
    };

    namespace.CircleEase = Nullstone.FinishCreate(CircleEase);
})(window);