/// <reference path="/Scripts/jquery-1.7.js"/>

var DebugLevel = {
    Info: 0,
    Debug: 1,
    Warn: 2,
    Error: 3,
    Fatal: 4
};

Console.prototype = new Object;
Console.prototype.constructor = Console;
function Console(level) {
    this._Queue = new Array();
    this._Level = level;
}
Console.GetBaseClass = function () { return Object; };

Console.prototype.Init = function (selector) {
    this._TextBox = $(selector);
    if (this._TextBox)
        this._Flush();
};
Console.prototype._Flush = function () {
    var data;
    while (data = this._Dequeue()) {
        this.WriteLineInternal("[PRE] " + data.Message, data.Color);
    }
    this.ScrollToEnd();
}
Console.prototype._Dequeue = function () {
    if (this._Queue.length < 1)
        return null;
    var m = this._Queue[0];
    this._Queue.shift();
    return m;
};
Console.prototype._Enqueue = function (data) {
    this._Queue.push(data);
};
Console.prototype.WriteLine = function (message, color) {
    if (this.WriteLineInternal(message, color)) {
        this.ScrollToEnd();
    }
};
Console.prototype.WriteLineInternal = function (message, color) {
    if (!this._TextBox) {
        this._Enqueue({ Message: message, Color: color });
        return false;
    }

    this._TextBox.append("> ");
    if (color)
        this._TextBox.append("<span style=\"color: " + color + ";\">" + message + "</span>");
    else
        this._TextBox.append(message);
    this._TextBox.append("<br />");
    return true;
};
Console.prototype.ScrollToEnd = function () {
    var offset = this._TextBox.children().last().offset();
    if (!offset)
        return;
    var end = offset.top;
    this._TextBox[0].scrollTop = end;
};
var _Console = new Console(DebugLevel.Info);

function AbstractMethod(method) {
    Warn("Abstract Method [" + method + "]");
}

function NotImplemented(method) {
    Warn("Not Implemented [" + method + "]");
}

function Info(message) {
    if (_Console._Level <= DebugLevel.Info)
        _Console.WriteLine("<i>INFO</i>: " + message);
}
function Debug(message) {
    if (_Console._Level <= DebugLevel.Debug)
        _Console.WriteLine("<i>DEBUG</i>: " + message);
}
function Warn(message) {
    if (_Console._Level <= DebugLevel.Warn)
        _Console.WriteLine("<i>WARN</i>: " + message, "#FF6A00");
}
function Error(error) {
    if (_Console._Level <= DebugLevel.Error)
        _Console.WriteLine("<b>ERROR</b>: " + error.toString(), "#0026FF");
}
function Fatal(error) {
    if (_Console._Level <= DebugLevel.Fatal)
        _Console.WriteLine("<b>FATAL</b>: " + error.toString(), "#FF0000");
    App.Instance._Stop();
}