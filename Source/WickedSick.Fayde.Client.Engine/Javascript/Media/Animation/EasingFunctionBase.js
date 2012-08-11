/// <reference path="../../Core/DependencyObject.js"/>
/// <reference path="Enums.js"/>
/// <reference path="IEasingFunction.js"/>
/// CODE

//#region EasingFunctionBase
var EasingFunctionBase = Nullstone.Create("EasingFunctionBase", DependencyObject, undefined, [IEasingFunction]);

//#region Properties

EasingFunctionBase.EasingModeProperty = DependencyProperty.Register("EasingMode", function () { return new Enum(EasingMode); }, EasingFunctionBase);

Nullstone.AutoProperties(EasingFunctionBase, [
    EasingFunctionBase.EasingModeProperty
]);

//#endregion

EasingFunctionBase.Instance.Ease = function (normalizedTime) {
    /// <param name="normalizedTime" type="Number"></param>
    NotImplemented("EasingFunctionBase.Ease");
};

Nullstone.FinishCreate(EasingFunctionBase);
//#endregion