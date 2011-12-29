/// <reference path="/Scripts/fauxconsole.js"/>

var queue = new Array();
Console.prototype = new Object;
Console.prototype.constructor = Console;
function Console() {
}
Console.prototype.Init = function (selector) {
    this._TextBox = $(selector);
    if (this._TextBox) {
        while (queue.length > 0) {
            this.WriteLine("[PRE] " + queue[0]);
            queue.shift();
        }
    }
};
Console.prototype.WriteLine = function (message) {
    if (this._TextBox)
        this._TextBox.append("> " + message + "<br />");
    else
        queue.push(message);
};
var _Console = new Console();

function AbstractMethod(method) {
    _Console.WriteLine("Abstract Method. [" + method + "]");
}

function NotImplemented(method) {
    _Console.WriteLine("Not Implemented. [" + method + "]");
}