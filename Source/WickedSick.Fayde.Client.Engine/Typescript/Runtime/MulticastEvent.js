var MulticastEvent = (function () {
    function MulticastEvent() {
        this._Listeners = [];
    }
    MulticastEvent.prototype.Subscribe = function (callback, closure) {
        this._Listeners.push({
            Closure: closure,
            Callback: callback
        });
    };
    MulticastEvent.prototype.Unsubscribe = function (callback, closure) {
        var listeners = this._Listeners;
        var len = listeners.length;
        var listener = null;
        var i = 0;
        while(i < len) {
            listener = listeners[i];
            if(listener.Closure === closure && listener.Callback === callback) {
                listeners.splice(i, 1);
            } else {
                i++;
            }
        }
    };
    MulticastEvent.prototype.Raise = function (sender, args) {
        var listeners = this._Listeners;
        var len = listeners.length;
        var listener = null;
        for(var i = 0; i < len; i++) {
            listener = listeners[i];
            listener.Callback.call(listener.Closure, sender, args);
        }
    };
    MulticastEvent.prototype.RaiseAsync = function (sender, args) {
        var _this = this;
        window.setTimeout(function () {
            return _this.Raise(sender, args);
        }, 1);
    };
    return MulticastEvent;
})();
Nullstone.RegisterType(MulticastEvent, "MulticastEvent");
//@ sourceMappingURL=MulticastEvent.js.map
