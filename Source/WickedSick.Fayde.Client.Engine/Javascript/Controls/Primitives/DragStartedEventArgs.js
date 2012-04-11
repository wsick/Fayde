/// <reference path="../../Runtime/RoutedEventArgs.js"/>
/// CODE

//#region DragStartedEventArgs
var DragStartedEventArgs = Nullstone.Create("DragStartedEventArgs", RoutedEventArgs, 2);

DragStartedEventArgs.Instance.Init = function (horizontal, vertical) {
    this.HorizontalOffset = horizontal;
    this.VerticalOffset = vertical;
};

Nullstone.FinishCreate(DragStartedEventArgs);
//#endregion