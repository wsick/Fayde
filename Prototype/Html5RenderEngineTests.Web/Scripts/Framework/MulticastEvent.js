/// <reference path="Debug.js"/>

MulticastEvent.prototype = new Object;
MulticastEvent.prototype.constructor = MulticastEvent;
function MulticastEvent() {
    this._Listeners = new Array();
}
MulticastEvent.prototype.Subscribe = function (callback) {
    this._Listeners.push(callback);
};
MulticastEvent.prototype.Unsubscribe = function (callback) {
    for (var i in this._Listeners) {
        if (this._Listeners[i] === callback) {
            this._Listeners.splice(i, 1);
            return;
        }
    }
};
MulticastEvent.prototype.Raise = function (sender, args) {
    var listeners = this._Listeners;
    for (var i in listeners) {
        listeners[i](sender, args);
    }
};