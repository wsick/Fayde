/// <reference path="RoutedEventArgs.js"/>
/// CODE

(function (namespace) {
    var RequestBringIntoViewEventArgs = Nullstone.Create("RequestBringIntoViewEventArgs", Fayde.RoutedEventArgs, 2);

    RequestBringIntoViewEventArgs.Instance.Init = function (targetObject, targetRect) {
        this.Init$RoutedEventArgs();
        this.TargetObject = targetObject;
        this.TargetRect = targetRect;
    };

    namespace.RequestBringIntoViewEventArgs = Nullstone.FinishCreate(RequestBringIntoViewEventArgs);
})(window);