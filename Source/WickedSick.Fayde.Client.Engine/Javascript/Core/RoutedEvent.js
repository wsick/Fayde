/// CODE

(function (namespace) {
    function RoutedEvent() {
        this._Listeners = [];
    }

    RoutedEvent.prototype.Subscribe = function (callback, closure) {
        /// <param name="callback" type="Function"></param>
        if (!(callback instanceof Function))
            throw new InvalidOperationException("Callback must be a function!");
        this._Listeners.push({ Callback: callback, Closure: closure });
    };
    RoutedEvent.prototype.SubscribeSpecific = function (callback, closure, matchFunc, matchClosure) {
        this._Listeners.push({ Callback: callback, Closure: closure, MatchFunc: matchFunc, MatchClosure: matchClosure });
    };
    RoutedEvent.prototype.Unsubscribe = function (callback, closure, matchClosure) {
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
    RoutedEvent.prototype.Raise = function (sender, args) {
        var listeners = this._Listeners;
        for (var i in listeners) {
            var listener = listeners[i];
            if (listener.MatchFunc && !listener.MatchFunc.call(listener.MatchClosure, sender, args))
                continue;
            listener.Callback.call(listener.Closure, sender, args);
        }
    };
    RoutedEvent.prototype.RaiseAsync = function (sender, args) {
        var me = this;
        setTimeout(function () { me.Raise(sender, args); }, 1);
    };

    namespace.RoutedEvent = RoutedEvent;
})(window);