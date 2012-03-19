/// <reference path="EventArgs.js"/>
/// CODE

//#region RoutedEventArgs
var RoutedEventArgs = Nullstone.Create("RoutedEventArgs", EventArgs);

RoutedEventArgs.Instance.Init = function () {
    this.Handled = false;
};

Nullstone.FinishCreate(RoutedEventArgs);
//#endregion