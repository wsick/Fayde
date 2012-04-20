/// <reference path="../../Runtime/EventArgs.js"/>
/// CODE

//#region ScrollEventArgs
var ScrollEventArgs = Nullstone.Create("ScrollEventArgs", EventArgs, 2);

ScrollEventArgs.Instance.Init = function (scrollEventType, value) {
    this.ScrollEventType = scrollEventType;
    this.Value = value;
};

Nullstone.FinishCreate(ScrollEventArgs);
//#endregion