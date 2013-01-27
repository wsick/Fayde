/// <reference path="../../Core/RoutedEventArgs.js"/>
/// CODE

(function (namespace) {
    var DragStartedEventArgs = Nullstone.Create("DragStartedEventArgs", Fayde.RoutedEventArgs, 2);

    DragStartedEventArgs.Instance.Init = function (horizontal, vertical) {
        this.Init$RoutedEventArgs();
        this.HorizontalOffset = horizontal;
        this.VerticalOffset = vertical;
    };

    namespace.DragStartedEventArgs = Nullstone.FinishCreate(DragStartedEventArgs);
})(Nullstone.Namespace("Fayde.Controls.Primitives"));