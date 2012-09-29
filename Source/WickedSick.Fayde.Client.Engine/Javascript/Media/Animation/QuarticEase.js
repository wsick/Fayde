/// <reference path="EasingFunctionBase.js"/>
/// CODE

//#region QuarticEase
var QuarticEase = Nullstone.Create("QuarticEase", EasingFunctionBase);

QuarticEase.Instance.EaseInCore = function (t) {
    return t * t * t * t;
};

Nullstone.FinishCreate(QuarticEase);
//#endregion