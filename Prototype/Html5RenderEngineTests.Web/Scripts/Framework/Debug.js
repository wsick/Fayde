/// <reference path="/Scripts/jquery-1.7.js"/>

Console.prototype = new Object;
Console.prototype.constructor = Console;
function Console() {
    this._Queue = new Array();
}
Console.prototype.Init = function (selector) {
    this._TextBox = $(selector);
    if (this._TextBox)
        this._Flush();
};
Console.prototype._Flush = function () {
    var data;
    while (data = this._Dequeue()) {
        this.WriteLine("[PRE] " + data.Message, data.Color);
    }
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
    if (this._TextBox) {
        this._TextBox.append("> ");
        if (color)
            this._TextBox.append("<span style=\"color: " + color + ";\">" + message + "</span>");
        else
            this._TextBox.append(message);
        this._TextBox.append("<br />");

        var end = this._TextBox.children().last().offset().top;
        this._TextBox[0].scrollTop = end;
    }
    else
        this._Enqueue({ Message: message, Color: color });
};
var _Console = new Console();

function AbstractMethod(method) {
    _Console.WriteLine("Abstract Method. [" + method + "]");
}

function NotImplemented(method) {
    _Console.WriteLine("Not Implemented. [" + method + "]");
}

function Fatal(error) {
    _Console.WriteLine("<b>FATAL</b>: " + error.toString(), "#ff0000");
    App.Instance._Stop();
}