/// <reference path="../../Core/RoutedEventArgs.js"/>
/// CODE

(function (namespace) {
    var DragDeltaEventArgs = Nullstone.Create("DragDeltaEventArgs", Fayde.RoutedEventArgs, 2);

    DragDeltaEventArgs.Instance.Init = function (horizontal, vertical) {
        this.Init$RoutedEventArgs();
        this.HorizontalChange = horizontal;
        this.VerticalChange = vertical;
    };

    namespace.DragDeltaEventArgs = Nullstone.FinishCreate(DragDeltaEventArgs);
})(Nullstone.Namespace("Fayde.Controls.Primitives"));