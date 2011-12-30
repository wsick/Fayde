Console.prototype = new Object;
Console.prototype.constructor = Console;
function Console() {
    this._Queue = new Array();
}
Console.prototype.Init = function (selector) {
    this._TextBox = $(selector);
    if (this._TextBox) {
        var msg;
        while (msg = this._Dequeue()) {
            this.WriteLine("[PRE] " + msg);
        }
    }
};
Console.prototype._Dequeue = function () {
    if (this._Queue.length < 1)
        return null;
    var m = this._Queue[0];
    this._Queue.shift();
    return m;
};
Console.prototype._Enqueue = function (message) {
    this._Queue.push(message);
};
Console.prototype.WriteLine = function (message) {
    if (this._TextBox)
        this._TextBox.append("> " + message + "<br />");
    else
        this._Enqueue(message);
};
var _Console = new Console();

function AbstractMethod(method) {
    _Console.WriteLine("Abstract Method. [" + method + "]");
}

function NotImplemented(method) {
    _Console.WriteLine("Not Implemented. [" + method + "]");
}