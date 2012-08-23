/// <reference path="../../Core/RoutedEventArgs.js"/>
/// CODE

//#region DragDeltaEventArgs
var DragDeltaEventArgs = Nullstone.Create("DragDeltaEventArgs", RoutedEventArgs, 2);

DragDeltaEventArgs.Instance.Init = function (horizontal, vertical) {
    this.Init$RoutedEventArgs();
    this.HorizontalChange = horizontal;
    this.VerticalChange = vertical;
};

Nullstone.FinishCreate(DragDeltaEventArgs);
//#endregion