/// <reference path="RoutedEventArgs.js"/>
/// CODE

(function (Fayde) {
    var RequestBringIntoViewEventArgs = Nullstone.Create("RequestBringIntoViewEventArgs", Fayde.RoutedEventArgs, 2);

    RequestBringIntoViewEventArgs.Instance.Init = function (targetObject, targetRect) {
        this.Init$RoutedEventArgs();
        this.TargetObject = targetObject;
        this.TargetRect = targetRect;
    };

    Fayde.RequestBringIntoViewEventArgs = Nullstone.FinishCreate(RequestBringIntoViewEventArgs);
})(Nullstone.Namespace("Fayde"));