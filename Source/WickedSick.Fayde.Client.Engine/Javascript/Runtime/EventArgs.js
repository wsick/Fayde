/// <reference path="Nullstone.js"/>

//#region EventArgs

function EventArgs() {
}
Nullstone.Create(EventArgs, "EventArgs");

//#endregion

//#region MouseEventArgs

function MouseEventArgs(absolutePos) {
    if (!Nullstone.IsReady)
        return;
    this.$super();
    this._AbsolutePosition = absolutePos;
}
Nullstone.Extend(MouseEventArgs, "MouseEventArgs", EventArgs);

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
    if (!Nullstone.IsReady)
        return;
    this.$super(absolutePos);
}
Nullstone.Extend(MouseButtonEventArgs, "MouseButtonEventArgs", MouseEventArgs);

//#endregion