/// CODE

//#region NPCListener

function NPCListener(source, closure, func) {
    RefObject.call(this);
    this._Source = source;
    this._Closure = closure;
    this._Func = func;

    if (this._Source)
        this._Source.PropertyChanged.Subscribe(this._Func, this._Closure);
}
NPCListener.InheritFrom(RefObject);

NPCListener.prototype.Detach = function () {
    this._Source.PropertyChanged.Unsubscribe(this._Closure, this._Func);
};

//#endregion