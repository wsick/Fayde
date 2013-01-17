/// <reference path="EasingFunctionBase.js"/>
/// CODE

(function (namespace) {
    var BackEase = Nullstone.Create("BackEase", EasingFunctionBase);

    //#region Properties

    BackEase.AmplitudeProperty = DependencyProperty.Register("Amplitude", function () { return Number; }, BackEase);

    Nullstone.AutoProperties(BackEase, [
        BackEase.AmplitudeProperty
    ]);

    //#endregion

    BackEase.Instance.EaseInCore = function (t) {
        var a = this.Amplitude;
        return (t * t * t) - (t * a * Math.sin(t * Math.PI));
    };

    namespace.BackEase = Nullstone.FinishCreate(BackEase);
})(window);