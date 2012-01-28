/// <reference path="RefObject.js"/>

//#region EventArgs

EventArgs.prototype = new RefObject;
EventArgs.prototype.constructor = EventArgs;
function EventArgs() {
    RefObject.call(this);
}
EventArgs.GetBaseClass = function () { return RefObject; };

//#endregion

//#region MouseEventArgs

MouseEventArgs.prototype = new EventArgs;
MouseEventArgs.prototype.constructor = MouseEventArgs;
function MouseEventArgs(absolutePos) {
    EventArgs.call(this);
    this._AbsolutePosition = absolutePos;
}
MouseEventArgs.GetBaseClass = function () { return EventArgs; };

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