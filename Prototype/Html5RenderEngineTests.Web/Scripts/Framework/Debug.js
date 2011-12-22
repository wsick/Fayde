/// <reference path="/Scripts/fauxconsole.js"/>

Console.prototype = new Object;
Console.prototype.constructor = Console;
function Console() {
}
Console.prototype.Init = function (selector) {
    this._TextBox = $(selector);
};
Console.prototype.WriteLine = function (message) {
    this._TextBox.append("> " + message + "<br />");
};
var _Console = new Console();

function AbstractMethod(method) {
    _Console.WriteLine("Abstract Method. [" + method + "]");
}

function NotImplemented(method) {
    _Console.WriteLine("Not Implemented. [" + method + "]");
}