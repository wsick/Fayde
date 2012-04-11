/// <reference path="RoutedEventArgs.js"/>
/// CODE

//#region RoutedPropertyChangedEventArgs
var RoutedPropertyChangedEventArgs = Nullstone.Create("RoutedPropertyChangedEventArgs", RoutedEventArgs, 2);

RoutedPropertyChangedEventArgs.Instance.Init = function (oldValue, newValue) {
    this.OldValue = oldValue;
    this.NewValue = newValue;
};

Nullstone.FinishCreate(RoutedPropertyChangedEventArgs);
//#endregion