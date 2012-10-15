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
DirtyDebug.UpTiming = [];
DirtyDebug.DownTiming = [];
DirtyDebug.Dump = function () {
    return "Down" + DumpTiming(DirtyDebug.DownTiming) + " Up" + DumpTiming(DirtyDebug.UpTiming);
}
function DumpTiming(arr) {
    var min;
    var max;
    var total;

    for (var i = 0; i < arr.length; i++) {
        if (i === 0) {
            min = arr[i];
            max = arr[i];
            total = arr[i];
        } else {
            min = Math.min(arr[i], min);
            max = Math.max(arr[i], max);
            total += arr[i];
        }
    }
    var avg = total / arr.length;
    var stddev = 0;
    for (var i = 0; i < arr.length; i++) {
        stddev += (arr[i] - avg) * (arr[i] - avg);
    }
    stddev = Math.sqrt(stddev / arr.length);

    return "[Min: " + min + "; Max: " + max + "; Avg: " + avg + "; StdDev: " + stddev + "; Total: " + total + "; Count: " + arr.length + "]";;
}

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
function TransformDebug(message, matrix) {
    if (true)
        return;
    var last = TransformDebug.Last;
    if (last && mat3.equal(last, matrix))
        return;
    TransformDebug.Last = matrix;

    if (window.console && console.log)
        console.log("TRANSFORM: " + message + " --> " + matrix.toString());
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