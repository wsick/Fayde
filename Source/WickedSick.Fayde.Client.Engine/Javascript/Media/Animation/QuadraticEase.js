/// <reference path="EasingFunctionBase.js"/>
/// CODE

//#region QuadraticEase
var QuadraticEase = Nullstone.Create("QuadraticEase", EasingFunctionBase);

QuadraticEase.Instance.EaseInCore = function (t) {
    return t * t;
};

Nullstone.FinishCreate(QuadraticEase);
//#endregion