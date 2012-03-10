/// <reference path="../Runtime/Nullstone.js" />
/// CODE

//#region NPCListener

function NPCListener(source, closure, func) {
    if (!Nullstone.IsReady)
        return;
    this._Source = source;
    this._Closure = closure;
    this._Func = func;

    if (this._Source)
        this._Source.PropertyChanged.Subscribe(this._Func, this._Closure);
}
Nullstone.Create(NPCListener, "NPCListener");

NPCListener.prototype.Detach = function () {
    this._Source.PropertyChanged.Unsubscribe(this._Closure, this._Func);
};

//#endregion