/// <reference path="EasingFunctionBase.js"/>
/// CODE

(function (namespace) {
    var ExponentialEase = Nullstone.Create("ExponentialEase", EasingFunctionBase);

    //#region Properties

    ExponentialEase.ExponentProperty = DependencyProperty.Register("Exponent", function () { return Number; }, ExponentialEase);

    Nullstone.AutoProperties(ExponentialEase, [
        ExponentialEase.ExponentProperty
    ]);

    //#endregion

    ExponentialEase.Instance.EaseInCore = function (t) {
        var e = this.Exponent;
        return (Math.exp(e * t) - 1) / (Math.exp(e) - 1);
    };

    namespace.ExponentialEase = Nullstone.FinishCreate(ExponentialEase);
})(window);