/// <reference path="Nullstone.js"/>
/// CODE
/// <reference path="../Core/Input/KeyboardEventArgs.js"/>

/// Good Resource: http://unixpapa.com/js/key.html

//#region KeyInterop
var KeyInterop = Nullstone.Create("KeyInterop");

KeyInterop.Instance.RegisterEvents = function () {
    var interop = this;
    document.onkeypress = function (e) {
        var args = interop.CreateArgsPress(window.event ? window.event : e);
        if (args) {
            KeyboardDebug("[Press] - " + e.keyCode);
            interop.Surface._HandleKeyDown(args);
        }
    };
    document.onkeydown = function (e) {
        var args = interop.CreateArgsDown(window.event ? window.event : e);
        if (args) {
            KeyboardDebug("[Down] - " + e.keyCode);
            interop.Surface._HandleKeyDown(args);
        }
    };
};

KeyInterop.Instance.CreateArgsPress = function (e) {
    var modifiers = {
        Shift: e.shiftKey,
        Ctrl: e.ctrlKey,
        Alt: e.altKey
    };
    return new KeyEventArgs(modifiers, e.keyCode);
};
KeyInterop.Instance.CreateArgsDown = function (e) {
    var modifiers = {
        Shift: e.shiftKey,
        Ctrl: e.ctrlKey,
        Alt: e.altKey
    };
    return new KeyEventArgs(modifiers, e.keyCode);
};

Nullstone.FinishCreate(KeyInterop);
//#endregion

KeyInterop.CreateInterop = function (surface) {
    //Figure out which KeyInterop
    var interop;
    if (navigator.appName === "Microsoft Internet Explorer")
        interop = new IEKeyInterop();
    else if (navigator.appName === "Netscape")
        interop = new NetscapeKeyInterop();
    else
        interop = new KeyInterop();
    interop.Surface = surface;
    return interop;
};

//#region IEKeyInterop
var IEKeyInterop = Nullstone.Create("IEKeyInterop", KeyInterop);

IEKeyInterop.Instance.CreateArgsPress = function (e) {
    var modifiers = {
        Shift: e.shiftKey,
        Ctrl: e.ctrlKey,
        Alt: e.altKey
    };
    return new KeyEventArgs(modifiers);
};
IEKeyInterop.Instance.CreateArgsDown = function (e) {
    if (e.char != null)
        return null;
    var modifiers = {
        Shift: e.shiftKey,
        Ctrl: e.ctrlKey,
        Alt: e.altKey
    };
    return new KeyEventArgs(modifiers);
};

Nullstone.FinishCreate(IEKeyInterop);
//#endregion

//#region NetscapeKeyInterop
var NetscapeKeyInterop = Nullstone.Create("NetscapeKeyInterop", KeyInterop);

NetscapeKeyInterop.Instance.CreateArgsPress = function (e) {
};
NetscapeKeyInterop.Instance.CreateArgsDown = function (e) {
};

Nullstone.FinishCreate(NetscapeKeyInterop);
//#endregion