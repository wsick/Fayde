/// <reference path="../Runtime/EventArgs.js"/>
/// CODE

//#region RoutedEventArgs
var RoutedEventArgs = Nullstone.Create("RoutedEventArgs", EventArgs);

Nullstone.AutoProperties(RoutedEventArgs, [
    "Handled",
    "Source"
]);

RoutedEventArgs.Instance.Init = function () {
    this.Handled = false;
};

Nullstone.FinishCreate(RoutedEventArgs);
//#endregion