/// <reference path="EasingFunctionBase.js"/>
/// CODE

(function (namespace) {
    var QuinticEase = Nullstone.Create("QuinticEase", EasingFunctionBase);

    QuinticEase.Instance.EaseInCore = function (t) {
        return t * t * t * t * t;
    };

    namespace.QuinticEase = Nullstone.FinishCreate(QuinticEase);
})(window);