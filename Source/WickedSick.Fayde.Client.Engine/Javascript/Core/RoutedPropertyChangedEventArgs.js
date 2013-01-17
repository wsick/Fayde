/// <reference path="RoutedEventArgs.js"/>
/// CODE

(function (namespace) {
    var RoutedPropertyChangedEventArgs = Nullstone.Create("RoutedPropertyChangedEventArgs", RoutedEventArgs, 2);

    RoutedPropertyChangedEventArgs.Instance.Init = function (oldValue, newValue) {
        this.Init$RoutedEventArgs();
        this.OldValue = oldValue;
        this.NewValue = newValue;
    };

    namespace.RoutedPropertyChangedEventArgs = Nullstone.FinishCreate(RoutedPropertyChangedEventArgs);
})(window);