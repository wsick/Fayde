/// <reference path="../Runtime/Nullstone.js" />
/// CODE

(function (namespace) {
    var NPCListener = Nullstone.Create("NPCListener", null, 3);

    NPCListener.Instance.Init = function (source, closure, func) {
        this._Source = source;
        this._Closure = closure;
        this._Func = func;

        if (this._Source)
            this._Source.PropertyChanged.Subscribe(this._Func, this._Closure);
    };

    NPCListener.Instance.Detach = function () {
        this._Source.PropertyChanged.Unsubscribe(this._Closure, this._Func);
    };

    namespace.NPCListener = Nullstone.FinishCreate(NPCListener);
})(Nullstone.Namespace("Fayde.Data"));