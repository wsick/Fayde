/// <reference path="EasingFunctionBase.js"/>
/// CODE

//#region CircleEase
var CircleEase = Nullstone.Create("CircleEase", EasingFunctionBase);

CircleEase.Instance.EaseInCore = function (t) {
    return 1 - Math.sqrt(1 - (t * t));
};

Nullstone.FinishCreate(CircleEase);
//#endregion