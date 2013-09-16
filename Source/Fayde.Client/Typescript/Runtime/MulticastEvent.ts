/// <reference path="../Runtime/Nullstone.ts" />
/// CODE
/// <reference path="EventArgs.ts" />

interface IEventListener<T extends EventArgs> {
    Closure: any;
    Callback: (sender: any, e: T) => void;
}

class MulticastEvent<T extends EventArgs> {
    private _Listeners: IEventListener<T>[] = [];
    Subscribe(callback: (sender: any, e: T) => void , closure: any) {
        this._Listeners.push({ Closure: closure, Callback: callback });
    }
    Unsubscribe(callback: (sender: any, e: T) => void , closure: any) {
        var listeners = this._Listeners;
        var len = listeners.length;
        var listener: IEventListener<T> = null;
        var i = 0;
        while (i < len) {
            listener = listeners[i];
            if (listener.Closure === closure && listener.Callback === callback) {
                listeners.splice(i, 1);
                len--;
            }
            else
                i++;
        }
    }
    Raise(sender: any, args: T) {
        var listeners = this._Listeners.slice(0);
        var len = listeners.length;
        var listener: IEventListener<T> = null;
        for (var i = 0; i < len; i++) {
            listener = listeners[i];
            listener.Callback.call(listener.Closure, sender, args);
        }
    }
    RaiseAsync(sender: any, args: T) {
        window.setTimeout(() => this.Raise(sender, args), 1);
    }
}
Fayde.RegisterType(MulticastEvent, {
	Name: "MulticastEvent",
	Namespace: "Fayde"
});