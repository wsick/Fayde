/// <reference path="../../Core/RoutedEventArgs.js"/>
/// CODE

//#region DragStartedEventArgs
var DragStartedEventArgs = Nullstone.Create("DragStartedEventArgs", RoutedEventArgs, 2);

DragStartedEventArgs.Instance.Init = function (horizontal, vertical) {
    this.Init$RoutedEventArgs();
    this.HorizontalOffset = horizontal;
    this.VerticalOffset = vertical;
};

Nullstone.FinishCreate(DragStartedEventArgs);
//#endregion