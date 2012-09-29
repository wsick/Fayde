/// <reference path="EasingFunctionBase.js"/>
/// CODE

//#region PowerEase
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

Nullstone.FinishCreate(PowerEase);
//#endregion