/// <reference path="Nullstone.js"/>
/// CODE

(function (namespace) {
    function MulticastEvent() {
        this._Listeners = [];
    }

    MulticastEvent.prototype.Subscribe = function (callback, closure) {
        /// <param name="callback" type="Function"></param>
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
                if (listener.Closure && closure && !Nullstone.RefEquals(listener.Closure, closure))
                    continue;
                if (listener.MatchClosure && matchClosure && !Nullstone.RefEquals(listener.MatchClosure, matchClosure))
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

    namespace.MulticastEvent = MulticastEvent;
})(window);