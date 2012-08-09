/// <reference path="Control.js"/>
/// CODE

//#region ProgressBar
var ProgressBar = Nullstone.Create("ProgressBar", Control);

ProgressBar.Instance.Init = function () {
    this.Init$Control();
    this.DefaultStyleKey = this.constructor;
    NotImplemented("ProgressBar");
};

Nullstone.FinishCreate(ProgressBar);
//#endregion