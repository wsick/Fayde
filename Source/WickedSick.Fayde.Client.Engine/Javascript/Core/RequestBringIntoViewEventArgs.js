/// <reference path="RoutedEventArgs.js"/>
/// CODE

(function (namespace) {
    var DependencyObject = Nullstone.Create("DependencyObject", RoutedEventArgs, 2);

    RequestBringIntoViewEventArgs.Instance.Init = function (targetObject, targetRect) {
        this.Init$RoutedEventArgs();
        this.TargetObject = targetObject;
        this.TargetRect = targetRect;
    };

    namespace.DependencyObject = Nullstone.FinishCreate(DependencyObject);
})(window);