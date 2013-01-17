/// <reference path="EasingFunctionBase.js"/>
/// CODE

(function (namespace) {
    var QuarticEase = Nullstone.Create("QuarticEase", EasingFunctionBase);

    QuarticEase.Instance.EaseInCore = function (t) {
        return t * t * t * t;
    };

    namespace.QuarticEase = Nullstone.FinishCreate(QuarticEase);
})(window);