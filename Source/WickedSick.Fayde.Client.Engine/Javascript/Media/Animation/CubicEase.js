/// <reference path="EasingFunctionBase.js"/>
/// CODE

//#region CubicEase
var CubicEase = Nullstone.Create("CubicEase", EasingFunctionBase);

CubicEase.Instance.EaseInCore = function (t) {
    return t * t * t;
};

Nullstone.FinishCreate(CubicEase);
//#endregion