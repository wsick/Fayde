/// <reference path="../../Runtime/RoutedEventArgs.js"/>
/// CODE

//#region DragCompletedEventArgs
var DragCompletedEventArgs = Nullstone.Create("DragCompletedEventArgs", RoutedEventArgs, 3);

DragCompletedEventArgs.Instance.Init = function (horizontal, vertical, canceled) {
    this.HorizontalChange = horizontal;
    this.VerticalChange = vertical;
    this.Canceled = canceled;
};

Nullstone.FinishCreate(DragCompletedEventArgs);
//#endregion