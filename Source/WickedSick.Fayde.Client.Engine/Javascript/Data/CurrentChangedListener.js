/// CODE

//#region CurrentChangedListener

function CurrentChangedListener(source, closure, func) {
    /// <param name="source" type="ICollectionView"></param>
    /// <param name="closure" type="RefObject"></param>
    /// <param name="func" type="Function"></param>
    RefObject.call(this);

    if (!source)
        return;

    this._Source = source;
    this._Closure = closure;
    this._Func = func;
    this._Source.CurrentChanged.Subscribe(this, this.OnCurrentChangedInternal);
}
CurrentChangedListener.InheritFrom(RefObject);

CurrentChangedListener.prototype.Detach = function () {
    if (this._Source != null) {
        this._Source.CurrentChanged.Unsubscribe(this, this.OnCurrentChangedInternal);
        this._Source = null;
        this._Closure = null;
        this._Func = null;
    }
};
CurrentChangedListener.prototype.OnCurrentChangedInternal = function (s, e) {
    if (this._Closure != null && this._Func != null)
        this._Func.call(this._Closure, s, e);
};

//#endregion