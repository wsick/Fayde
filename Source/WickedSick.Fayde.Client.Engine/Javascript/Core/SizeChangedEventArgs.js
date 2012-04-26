/// <reference path="../Runtime/RoutedEventArgs.js"/>
/// CODE
/// <reference path="../Primitives/Size.js"/>

//#region SizeChangedEventArgs
var SizeChangedEventArgs = Nullstone.Create("SizeChangedEventArgs", RoutedEventArgs, 2);

SizeChangedEventArgs.Instance.Init = function (prevSize, newSize) {
    /// <param name="prevSize" type="Size"></param>
    /// <param name="newSize" type="Size"></param>
    this.PreviousSize = prevSize.Copy();
    this.NewSize = newSize.Copy();
};

Nullstone.FinishCreate(SizeChangedEventArgs);
//#endregion