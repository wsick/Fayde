/// <reference path="EasingFunctionBase.js"/>
/// CODE

//#region QuinticEase
var QuinticEase = Nullstone.Create("QuinticEase", EasingFunctionBase);

QuinticEase.Instance.EaseInCore = function (t) {
    return t * t * t * t * t;
};

Nullstone.FinishCreate(QuinticEase);
//#endregion