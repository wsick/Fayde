/// <reference path="Debug.js"/>

MulticastEvent.prototype = new Object;
MulticastEvent.prototype.constructor = MulticastEvent;
function MulticastEvent() {
    this._Listeners = new Array();
}
MulticastEvent.prototype.Subscribe = function (callback, closure) {
    this._Listeners.push({ Callback: callback, Closure: closure });
};
MulticastEvent.prototype.Unsubscribe = function (callback, closure) {
    for (var i in this._Listeners) {
        if (this._Listeners[i].Callback === callback) {
            this._Listeners.splice(i, 1);
            return;
        }
    }
};
MulticastEvent.prototype.Raise = function (sender, args) {
    var listeners = this._Listeners;
    for (var i in listeners) {
        var listener = listeners[i];
        listener.Callback.call(listener.Closure, sender, args);
    }
};