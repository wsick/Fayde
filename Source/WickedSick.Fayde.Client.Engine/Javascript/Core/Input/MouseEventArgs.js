/// <reference path="../RoutedEventArgs.js"/>
/// CODE
/// <reference path="../../Primitives/Point.js"/>

//#region MouseEventArgs
var MouseEventArgs = Nullstone.Create("MouseEventArgs", RoutedEventArgs, 1);

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

Nullstone.FinishCreate(MouseEventArgs);
//#endregion

//#region MouseButtonEventArgs
var MouseButtonEventArgs = Nullstone.Create("MouseButtonEventArgs", MouseEventArgs, 1);

MouseButtonEventArgs.Instance.Init = function (absolutePos) {
    this.Init$MouseEventArgs(absolutePos);
};

Nullstone.FinishCreate(MouseButtonEventArgs);
//#endregion

//#region MouseWheelEventArgs
var MouseWheelEventArgs = Nullstone.Create("MouseWheelEventArgs", MouseEventArgs, 2);

MouseWheelEventArgs.Instance.Init = function (absolutePos, delta) {
    this.Init$MouseEventArgs(absolutePos);
    this.Delta = delta;
};

Nullstone.FinishCreate(MouseWheelEventArgs);
//#endregion