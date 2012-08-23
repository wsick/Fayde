/// <reference path="RoutedEventArgs.js"/>
/// CODE

//#region RequestBringIntoViewEventArgs
var RequestBringIntoViewEventArgs = Nullstone.Create("RequestBringIntoViewEventArgs", RoutedEventArgs, 2);

RequestBringIntoViewEventArgs.Instance.Init = function (targetObject, targetRect) {
    this.Init$RoutedEventArgs();
    this.TargetObject = targetObject;
    this.TargetRect = targetRect;
};

Nullstone.FinishCreate(RequestBringIntoViewEventArgs);
//#endregion