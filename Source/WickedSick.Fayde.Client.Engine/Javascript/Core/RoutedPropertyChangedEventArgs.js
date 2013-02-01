/// <reference path="RoutedEventArgs.js"/>
/// CODE

(function (Fayde) {
    var RoutedPropertyChangedEventArgs = Nullstone.Create("RoutedPropertyChangedEventArgs", Fayde.RoutedEventArgs, 2);

    RoutedPropertyChangedEventArgs.Instance.Init = function (oldValue, newValue) {
        this.Init$RoutedEventArgs();
        this.OldValue = oldValue;
        this.NewValue = newValue;
    };

    Fayde.RoutedPropertyChangedEventArgs = Nullstone.FinishCreate(RoutedPropertyChangedEventArgs);
})(Nullstone.Namespace("Fayde"));