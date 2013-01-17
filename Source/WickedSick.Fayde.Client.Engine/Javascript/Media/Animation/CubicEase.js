/// <reference path="EasingFunctionBase.js"/>
/// CODE

(function (namespace) {
    var CubicEase = Nullstone.Create("CubicEase", EasingFunctionBase);

    CubicEase.Instance.EaseInCore = function (t) {
        return t * t * t;
    };

    namespace.CubicEase = Nullstone.FinishCreate(CubicEase);
})(window);