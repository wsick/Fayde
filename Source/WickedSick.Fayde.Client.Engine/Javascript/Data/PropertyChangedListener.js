/// <reference path="../Runtime/Nullstone.js" />
/// CODE

//#region PropertyChangedListener
var PropertyChangedListener = Nullstone.Create("PropertyChangedListener", null, 4);

//Dependency Property changes only
PropertyChangedListener.Instance.Init = function (source, propd, closure, func) {
    /// <param name="source" type="DependencyObject"></param>
    /// <param name="propd" type="DependencyProperty"></param>
    /// <param name="closure" type="Object"></param>
    /// <param name="func" type="Function"></param>
    this._Source = source;
    this._Property = propd;
    this._Closure = closure;
    this._Func = func;
    this._Source.PropertyChanged.Subscribe(this.OnPropertyChangedInternal, this);
};

PropertyChangedListener.Instance.Detach = function () {
    if (this._Source != null) {
        this._Source.PropertyChanged.Unsubscribe(this, this.OnPropertyChangedInternal);
        this._Source = null;
        this._Closure = null;
        this._Func = null;
    }
};
PropertyChangedListener.Instance.OnPropertyChangedInternal = function (s, e) {
    if (e.Property !== this._Property)
        return;
    if (this._Closure != null && this._Func != null)
        this._Func.call(this._Closure, s, e);
};

Nullstone.FinishCreate(PropertyChangedListener);
//#endregion