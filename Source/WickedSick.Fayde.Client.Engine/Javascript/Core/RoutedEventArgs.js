/// <reference path="../Runtime/EventArgs.js"/>
/// CODE

(function (namespace) {
    var RoutedEventArgs = Nullstone.Create("RoutedEventArgs", EventArgs);

    Nullstone.AutoProperties(RoutedEventArgs, [
        "Handled",
        "Source"
    ]);

    RoutedEventArgs.Instance.Init = function () {
        this.Handled = false;
    };

    namespace.RoutedEventArgs = Nullstone.FinishCreate(RoutedEventArgs);
})(window);