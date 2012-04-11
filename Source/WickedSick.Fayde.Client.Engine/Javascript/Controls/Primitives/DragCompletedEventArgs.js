/// <reference path="../../Runtime/RoutedEventArgs.js"/>
/// CODE

//#region DragCompletedEventArgs
var DragCompletedEventArgs = Nullstone.Create("DragCompletedEventArgs", RoutedEventArgs, 3);

DragCompletedEventArgs.Instance.Init = function (horizontal, vertical, canceled) {
    this.Canceled = canceled;
    this.HorizontalChange = horizontalChange;
    this.VerticalChange = verticalChange;
};

Nullstone.FinishCreate(DragCompletedEventArgs);
//#endregion