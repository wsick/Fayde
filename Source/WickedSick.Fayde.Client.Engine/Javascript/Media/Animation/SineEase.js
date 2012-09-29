/// <reference path="EasingFunctionBase.js"/>
/// CODE

//#region SineEase
var SineEase = Nullstone.Create("SineEase", EasingFunctionBase);

SineEase.Instance.EaseInCore = function (t) {
    return 1 - (Math.sin(1 - t) * (Math.PI / 2));
};

Nullstone.FinishCreate(SineEase);
//#endregion