/// <reference path="../../Core/RoutedEventArgs.js"/>
/// CODE

(function (namespace) {
    var DragCompletedEventArgs = Nullstone.Create("DragCompletedEventArgs", RoutedEventArgs, 3);

    DragCompletedEventArgs.Instance.Init = function (horizontal, vertical, canceled) {
        this.Init$RoutedEventArgs();
        this.HorizontalChange = horizontal;
        this.VerticalChange = vertical;
        this.Canceled = canceled;
    };

    namespace.DragCompletedEventArgs = Nullstone.FinishCreate(DragCompletedEventArgs);
})(Nullstone.Namespace("Fayde.Controls.Primitives"));