/// <reference path="../../Core/DependencyObject.js"/>
/// <reference path="Enums.js"/>
/// <reference path="IEasingFunction.js"/>
/// CODE

(function (namespace) {
    var EasingFunctionBase = Nullstone.Create("EasingFunctionBase", Fayde.DependencyObject, undefined, [namespace.IEasingFunction]);

    //#region Properties

    EasingFunctionBase.EasingModeProperty = DependencyProperty.Register("EasingMode", function () { return new Enum(namespace.EasingMode); }, EasingFunctionBase);

    Nullstone.AutoProperties(EasingFunctionBase, [
        EasingFunctionBase.EasingModeProperty
    ]);

    //#endregion

    EasingFunctionBase.Instance.Ease = function (normalizedTime) {
        /// <param name="normalizedTime" type="Number"></param>
        /// <returns type="Number" />
        var easingMode = this.EasingMode;
        switch (easingMode) {
            case namespace.EasingMode.EaseIn:
                return this.EaseInCore(normalizedTime);
            case namespace.EasingMode.EaseOut:
                return this.EaseInCore(1.0 - normalizedTime);
            case namespace.EasingMode.EaseInOut:
                return normalizedTime <= 0.5 ?
                    this.EaseInCore(normalizedTime * 2) * 0.5 :
                    1.0 - this.EaseInCore(((1.0 - normalizedTime) * 2) * 0.5);
            default:
                return 0.0;
        }

    };
    EasingFunctionBase.Instance.EaseInCore = function (t) { };

    namespace.EasingFunctionBase = Nullstone.FinishCreate(EasingFunctionBase);
})(Nullstone.Namespace("Fayde.Media.Animation"));
