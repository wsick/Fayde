/// <reference path="../../Core/RoutedEventArgs.js"/>
/// CODE

//#region DragCompletedEventArgs
var DragCompletedEventArgs = Nullstone.Create("DragCompletedEventArgs", RoutedEventArgs, 3);

DragCompletedEventArgs.Instance.Init = function (horizontal, vertical, canceled) {
    this.Init$RoutedEventArgs();
    this.HorizontalChange = horizontal;
    this.VerticalChange = vertical;
    this.Canceled = canceled;
};

Nullstone.FinishCreate(DragCompletedEventArgs);
//#endregion