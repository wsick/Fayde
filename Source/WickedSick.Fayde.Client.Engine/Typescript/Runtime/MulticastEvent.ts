/// <reference path="../Runtime/Nullstone.ts" />
/// CODE
/// <reference path="EventArgs.ts" />

interface IEventListener {
    Closure: any;
    Callback: (sender: any, e: EventArgs) => void;
}

class MulticastEvent {
    private _Listeners: IEventListener[] = [];
    Subscribe(callback: (sender: any, e: EventArgs) => void , closure: any) {
        this._Listeners.push({ Closure: closure, Callback: callback });
    }
    Unsubscribe(callback: (sender: any, e: EventArgs) => void , closure: any) {
        var listeners = this._Listeners;
        var len = listeners.length;
        var listener: IEventListener = null;
        var i = 0;
        while (i < len) {
            listener = listeners[i];
            if (listener.Closure === closure && listener.Callback === callback)
                listeners.splice(i, 1);
            else
                i++;
        }
    }
    Raise(sender: any, args: EventArgs) {
        var listeners = this._Listeners;
        var len = listeners.length;
        var listener: IEventListener = null;
        for (var i = 0; i < len; i++) {
            listener = listeners[i];
            listener.Callback.call(listener.Closure, sender, args);
        }
    }
    RaiseAsync(sender: any, args: EventArgs) {
        window.setTimeout(() => this.Raise(sender, args), 1);
    }
}
Nullstone.RegisterType(MulticastEvent, "MulticastEvent");