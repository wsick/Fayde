var DebugLevel = {
    Debug: 0,
    Info: 1,
    Warn: 2,
    Error: 3,
    Fatal: 4
};

//#region HUD

HUD.prototype = new Object;
HUD.prototype.constructor = HUD;
function HUD(jSelector) {
    this._Selector = jSelector;
};
HUD.prototype.SetMessage = function (message) {
    $(this._Selector)[0].innerText = message;
};

var HUDs = [];

//#endregion

function AbstractMethod(method) {
    Warn("Abstract Method [" + method + "]");
}
function NotImplemented(method) {
    Warn("Not Implemented [" + method + "]");
}

function DirtyDebug(message) {
    if (true)
        return;
    if (window.console && console.log) {
        var tabs = "";
        for (var i = 0; i < DirtyDebug.Level; i++) {
            tabs += "\t";
        }
        console.log("DIRTY: " + tabs + message);
    }
}
DirtyDebug.Level = 0;
function KeyboardDebug(message) {
    if (false)
        return;
    if (window.console && console.log)
        console.log("KEYBOARD: " + message);
}
function AnimationDebug(message) {
    if (true)
        return;
    if (window.console && console.log)
        console.log("ANIMATION: " + message);
}
function VsmDebug(message) {
    if (true)
        return;
    if (window.console && console.log)
        console.log("VSM: " + message);
}
function LayoutDebug(message) {
    if (true)
        return;
    if (window.console && console.log)
        console.log("LAYOUT: " + message);
}
function DrawDebug(message) {
    if (true)
        return;
    if (window.console && console.log)
        console.log("DRAW: " + message);
}
function RenderDebug(message) {
    if (true)
        return;
    if (window.console && console.log)
        console.log("RENDER: " + message);
}
function ParserDebug(message) {
    if (true)
        return;
    if (window.console && console.log)
        console.log("PARSER: " + message);
}
function FocusDebug(message) {
    if (true)
        return;
    if (window.console && console.log)
        console.log("FOCUS: " + message);
}
function TextDebug(message) {
    if (true)
        return;
    if (window.console && console.log)
        console.log("TEXT: " + message);
}
function Debug(message) {
    if (window.console && console.log)
        console.log(message);
}
function Info(message) {
    if (window.console && console.info)
        console.info(message);
}
function Warn(message) {
    if (window.console && console.warn)
        console.warn(message);
}
function Error(error) {
    if (window.console && console.error)
        console.error(error.toString());
}
function Fatal(error) {
    if (window.console && console.error)
        console.error("FATAL: " + error.toString());
    App.Instance._Stop();
}

function RegisterHUD(id, jSelector) {
    HUDs[id] = new HUD(jSelector);
};
function HUDUpdate(id, message) {
    var hud = HUDs[id];
    if (!hud)
        return;
    hud.SetMessage(message);
}