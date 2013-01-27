/// <reference path="../RoutedEventArgs.js"/>
/// CODE
/// <reference path="../../Primitives/Point.js"/>

(function (namespace) {
    var MouseEventArgs = Nullstone.Create("MouseEventArgs", Fayde.RoutedEventArgs, 1);

    MouseEventArgs.Instance.Init = function (absolutePos) {
        this.Init$RoutedEventArgs();
        this._AbsolutePosition = absolutePos;
    };

    MouseEventArgs.Instance.GetPosition = function (relativeTo) {
        /// <param name="relativeTo" type="UIElement"></param>
        var p = new Point(this._AbsolutePosition.X, this._AbsolutePosition.Y);
        if (relativeTo == null)
            return p;
        if (!(relativeTo instanceof UIElement))
            throw new ArgumentException("Specified relative object must be a UIElement.");
        if (relativeTo._IsAttached)
            "".toString(); //TODO: ProcessDirtyElements on surface
        relativeTo._TransformPoint(p);
        return p;
    };

    namespace.MouseEventArgs = Nullstone.FinishCreate(MouseEventArgs);
})(Nullstone.Namespace("Fayde.Input"));

(function (namespace) {
    var MouseButtonEventArgs = Nullstone.Create("MouseButtonEventArgs", namespace.MouseEventArgs, 1);

    MouseButtonEventArgs.Instance.Init = function (absolutePos) {
        this.Init$MouseEventArgs(absolutePos);
    };

    namespace.MouseButtonEventArgs = Nullstone.FinishCreate(MouseButtonEventArgs);
})(Nullstone.Namespace("Fayde.Input"));

(function (namespace) {
    var MouseWheelEventArgs = Nullstone.Create("MouseWheelEventArgs", namespace.MouseEventArgs, 2);

    MouseWheelEventArgs.Instance.Init = function (absolutePos, delta) {
        this.Init$MouseEventArgs(absolutePos);
        this.Delta = delta;
    };

    namespace.MouseWheelEventArgs = Nullstone.FinishCreate(MouseWheelEventArgs);
})(Nullstone.Namespace("Fayde.Input"));