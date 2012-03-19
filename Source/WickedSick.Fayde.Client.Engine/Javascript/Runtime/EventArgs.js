/// <reference path="Nullstone.js"/>

//#region EventArgs
var EventArgs = Nullstone.Create("EventArgs");

Nullstone.FinishCreate(EventArgs);
//#endregion

//#region MouseEventArgs
var MouseEventArgs = Nullstone.Create("MouseEventArgs", EventArgs, 1);

MouseEventArgs.Instance.Init = function (absolutePos) {
    this._AbsolutePosition = absolutePos;
};

MouseEventArgs.Instance.GetPosition = function (relativeTo) {
    /// <param name="relativeTo" type="UIElement"></param>
    if (relativeTo._IsAttached)
        "".toString(); //TODO: ProcessDirtyElements on surface
    var p = new Point(this._AbsolutePosition.X, this._AbsolutePosition.Y);
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

//#region KeyEventArgs
var KeyEventArgs = Nullstone.Create("KeyEventArgs", EventArgs, 2);

KeyEventArgs.Instance.Init = function (modifiers, keyCode) {
    this.Modifiers = modifiers;
    this.KeyCode = keyCode;
};

Nullstone.FinishCreate(KeyEventArgs);
//#endregion