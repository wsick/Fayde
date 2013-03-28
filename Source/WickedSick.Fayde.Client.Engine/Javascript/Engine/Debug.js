var traces = {
    //Layout
    layout: false,
    transform: false,
    //Render
    draw: false,
    render: false,
    text: false,
    //Input
    keyboard: false,
    focus: false,
    //Animations
    vsm: false,
    animation: false,
    //Core
    parser: false
};



var DebugLevel = {
    Debug: 0,
    Info: 1,
    Warn: 2,
    Error: 3,
    Fatal: 4
};

var canProfile = false;
function profile() {
    if (!canProfile)
        return;
    if (window.console && console.profile)
        console.profile();
}
function profileEnd() {
    if (!canProfile)
        return;
    if (window.console && console.profileEnd) {
        console.profileEnd();
    }
}

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



function LayoutDebug() { }
function TransformDebug() { }
function DrawDebug() { }
function RenderDebug() { }
RenderDebug.Indent = function () { }
RenderDebug.Unindent = function () { }
function TextDebug() { }
function KeyboardDebug() { }
function FocusDebug() { }
function AnimationDebug() { }
function VsmDebug() { }
function ParserDebug() {}

function initFaydeTraces() {
    if (!window.console || !console.log)
        return;

    if (traces.draw)
        this.DrawDebug = function (message) { console.log("DRAW: " + message); };
    if (traces.render) {
        var tabs = "";
        this.RenderDebug = function (message) { console.log(tabs + "RENDER: " + message); };
        RenderDebug.Indent = function () {
            tabs += "\t";
        };
        RenderDebug.Unindent = function () {
            tabs = tabs.slice(1);
        };
    }
    if (traces.text)
        function TextDebug(message) { console.log("TEXT: " + message); };
    if (traces.layout)
        this.LayoutDebug = function (message) { console.log("LAYOUT: " + message); };
    if (traces.transform)
        this.TransformDebug = function (message, matrix) {
            var last = TransformDebug.Last;
            if (last && mat3.equal(last, matrix))
                return;
            TransformDebug.Last = matrix;

            console.log("TRANSFORM: " + message + " --> " + matrix.toString());
        };
    if (traces.keyboard)
        this.KeyboardDebug = function (message) { console.log("KEYBOARD: " + message); };
    if (traces.focus)
        FocusDebug = function (message) { console.log("FOCUS: " + message); };
    if (traces.animation)
        this.AnimationDebug = function (func) { console.log("ANIMATION: " + func()); };
    if (traces.vsm)
        this.VsmDebug = function (message) { console.log("VSM: " + message); };
    if (traces.parser)
        this.ParserDebug = function (message) { console.log("PARSER: " + message); };
}
initFaydeTraces.call(this);