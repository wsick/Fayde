/// <reference path="TypeManagement.ts" />

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
        for (var i = 0, listeners = this._Listeners; i < listeners.length; i++) {
            var listener = listeners[i];
            if (listener.Closure === closure && listener.Callback === callback) {
                listeners.splice(i, 1);
                i--;
            }
        }
    }
    Raise(sender: any, args: T) {
        for (var i = 0, listeners = this._Listeners.slice(0), len = listeners.length; i < len; i++) {
            var listener = listeners[i];
            listener.Callback.call(listener.Closure, sender, args);
        }
    }
    RaiseAsync(sender: any, args: T) {
        window.setTimeout(() => this.Raise(sender, args), 1);
    }
}
Fayde.RegisterType(MulticastEvent, "Fayde");
