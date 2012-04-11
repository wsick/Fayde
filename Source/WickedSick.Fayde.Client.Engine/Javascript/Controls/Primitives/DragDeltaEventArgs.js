/// <reference path="../../Runtime/RoutedEventArgs.js"/>
/// CODE

//#region DragDeltaEventArgs
var DragDeltaEventArgs = Nullstone.Create("DragDeltaEventArgs", RoutedEventArgs, 2);

DragDeltaEventArgs.Instance.Init = function (horizontal, vertical) {
    this.HorizontalChange = horizontal;
    this.VerticalChange = vertical;
};

Nullstone.FinishCreate(DragDeltaEventArgs);
//#endregion