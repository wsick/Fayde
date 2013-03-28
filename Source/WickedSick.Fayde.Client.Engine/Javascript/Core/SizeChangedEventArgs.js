/// <reference path="RoutedEventArgs.js"/>
/// CODE
/// <reference path="../Primitives.js"/>

(function (Fayde) {
    var SizeChangedEventArgs = Nullstone.Create("SizeChangedEventArgs", Fayde.RoutedEventArgs, 2);

    SizeChangedEventArgs.Instance.Init = function (prevSize, newSize) {
        /// <param name="prevSize" type="size"></param>
        /// <param name="newSize" type="size"></param>
        this.Init$RoutedEventArgs();
        this.PreviousSize = size.clone(prevSize);
        this.NewSize = size.clone(newSize);
    };

    Fayde.SizeChangedEventArgs = Nullstone.FinishCreate(SizeChangedEventArgs);
})(Nullstone.Namespace("Fayde"));