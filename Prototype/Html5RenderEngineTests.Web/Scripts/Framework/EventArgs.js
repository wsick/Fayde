/// <reference path="RefObject.js"/>

//#region MouseEventArgs

MouseEventArgs.prototype = new RefObject;
MouseEventArgs.prototype.constructor = MouseEventArgs;
function MouseEventArgs(absolutePos) {
    RefObject.call(this);
    this._AbsolutePosition = absolutePos;
}
MouseEventArgs.GetBaseClass = function () { return RefObject; };

MouseEventArgs.prototype.GetPosition = function (/* UIElement */relativeTo) {
    if (relativeTo._IsAttached)
        "".toString(); //TODO: ProcessDirtyElements on surface
    var p = new Point(this._AbsolutePosition.X, this._AbsolutePosition.Y);
    relativeTo._TransformPoint(p);
    return p;
};

//#endregion

//#region MouseButtonEventArgs

MouseButtonEventArgs.prototype = new MouseEventArgs;
MouseButtonEventArgs.prototype.constructor = MouseButtonEventArgs;
function MouseButtonEventArgs(absolutePos) {
    MouseEventArgs.call(this, absolutePos);
}
MouseButtonEventArgs.GetBaseClass = function () { return MouseEventArgs; };

//#endregion