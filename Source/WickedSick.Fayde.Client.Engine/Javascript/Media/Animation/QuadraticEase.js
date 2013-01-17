/// <reference path="EasingFunctionBase.js"/>
/// CODE

(function (namespace) {
    var QuadraticEase = Nullstone.Create("QuadraticEase", EasingFunctionBase);

    QuadraticEase.Instance.EaseInCore = function (t) {
        return t * t;
    };

    namespace.QuadraticEase = Nullstone.FinishCreate(QuadraticEase);
})(window);