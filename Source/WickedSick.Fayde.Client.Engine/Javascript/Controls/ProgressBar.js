/// <reference path="Primitives/RangeBase.js"/>
/// CODE

//#region ProgressBar
var ProgressBar = Nullstone.Create("ProgressBar", RangeBase);

ProgressBar.Instance.Init = function () {
    this.Init$Control();
    this.DefaultStyleKey = this.constructor;
    NotImplemented("ProgressBar");
};

Nullstone.FinishCreate(ProgressBar);
//#endregion