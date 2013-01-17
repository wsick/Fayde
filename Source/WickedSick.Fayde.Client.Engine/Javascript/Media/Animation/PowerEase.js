/// <reference path="EasingFunctionBase.js"/>
/// CODE

(function (namespace) {
    var PowerEase = Nullstone.Create("PowerEase", EasingFunctionBase);

    //#region Properties

    PowerEase.PowerProperty = DependencyProperty.Register("Power", function () { return Number; }, PowerEase);

    Nullstone.AutoProperties(PowerEase, [
        PowerEase.PowerProperty
    ]);

    //#endregion

    PowerEase.Instance.EaseInCore = function (t) {
        return Math.pow(t, this.Power);
    };

    namespace.PowerEase = Nullstone.FinishCreate(PowerEase);
})(window);