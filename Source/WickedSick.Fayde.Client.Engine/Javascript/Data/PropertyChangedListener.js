/// <reference path="../Runtime/Nullstone.js" />
/// CODE

//#region PropertyChangedListener

//Dependency Property changes only
function PropertyChangedListener(source, propd, closure, func) {
    /// <param name="source" type="DependencyObject"></param>
    /// <param name="propd" type="DependencyProperty"></param>
    /// <param name="closure" type="RefObject"></param>
    /// <param name="func" type="Function"></param>
    if (!Nullstone.IsReady)
        return;
    this._Source = source;
    this._Property = propd;
    this._Closure = closure;
    this._Func = func;
    this._Source.PropertyChanged.Subscribe(this.OnPropertyChangedInternal, this);
}
Nullstone.Create(PropertyChangedListener, "PropertyChangedListener");

PropertyChangedListener.prototype.Detach = function () {
    if (this._Source != null) {
        this._Source.PropertyChanged.Unsubscribe(this, this.OnPropertyChangedInternal);
        this._Source = null;
        this._Closure = null;
        this._Func = null;
    }
};
PropertyChangedListener.prototype.OnPropertyChangedInternal = function (s, e) {
    if (e.Property !== this._Property)
        return;
    if (this._Closure != null && this._Func != null)
        this._Func.call(this._Closure, s, e);
};

//#endregion