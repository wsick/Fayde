/// <reference path="RefObject.js"/>
/// CODE
/// <reference path="Debug.js"/>

//#region MulticastEvent

function MulticastEvent() {
    RefObject.call(this);
    this._Listeners = new Array();
}
MulticastEvent.InheritFrom(RefObject);

MulticastEvent.prototype.Subscribe = function (callback, closure) {
    /// <param name="callback" type="Function"></param>
    /// <param name="closure" type="RefObject"></param>
    if (!(callback instanceof Function))
        throw new InvalidOperationException("Callback must be a function!");
    this._Listeners.push({ Callback: callback, Closure: closure });
};
MulticastEvent.prototype.SubscribeSpecific = function (callback, closure, matchFunc, matchClosure) {
    this._Listeners.push({ Callback: callback, Closure: closure, MatchFunc: matchFunc, MatchClosure: matchClosure });
};
MulticastEvent.prototype.Unsubscribe = function (callback, closure, matchClosure) {
    for (var i in this._Listeners) {
        var listener = this._Listeners[i];
        if (listener.Callback === callback) {
            if (listener.Closure && closure && !RefObject.RefEquals(listener.Closure, closure))
                continue;
            if (listener.MatchClosure && matchClosure && !RefObject.RefEquals(listener.MatchClosure, matchClosure))
                continue;
            this._Listeners.splice(i, 1);
            return;
        }
    }
};
MulticastEvent.prototype.Raise = function (sender, args) {
    var listeners = this._Listeners;
    for (var i in listeners) {
        var listener = listeners[i];
        if (listener.MatchFunc && !listener.MatchFunc.call(listener.MatchClosure, sender, args))
            continue;
        listener.Callback.call(listener.Closure, sender, args);
    }
};
MulticastEvent.prototype.RaiseAsync = function (sender, args) {
    var me = this;
    setTimeout(function () { me.Raise(sender, args); }, 1);
};

//#endregion