/// <reference path="../../Runtime/EventArgs.js"/>
/// CODE

//#region ScrollEventArgs
var ScrollEventArgs = Nullstone.Create("ScrollEventArgs", EventArgs, 2);

ScrollEventArgs.Instance.Init = function (scrollEventType, currentValue) {
    this.ScrollEventType = scrollEventType;
    this.CurrentValue = currentValue;
};

Nullstone.FinishCreate(ScrollEventArgs);
//#endregion