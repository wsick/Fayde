/// <reference path="RefObject.js"/>

//#region EventArgs

function EventArgs() {
    RefObject.call(this);
}
EventArgs.InheritFrom(RefObject);

//#endregion

//#region MouseEventArgs

function MouseEventArgs(absolutePos) {
    EventArgs.call(this);
    this._AbsolutePosition = absolutePos;
}
MouseEventArgs.InheritFrom(EventArgs);

MouseEventArgs.prototype.GetPosition = function (/* UIElement */relativeTo) {
    if (relativeTo._IsAttached)
        "".toString(); //TODO: ProcessDirtyElements on surface
    var p = new Point(this._AbsolutePosition.X, this._AbsolutePosition.Y);
    relativeTo._TransformPoint(p);
    return p;
};

//#endregion

//#region MouseButtonEventArgs

function MouseButtonEventArgs(absolutePos) {
    MouseEventArgs.call(this, absolutePos);
}
MouseButtonEventArgs.InheritFrom(MouseEventArgs);

//#endregion