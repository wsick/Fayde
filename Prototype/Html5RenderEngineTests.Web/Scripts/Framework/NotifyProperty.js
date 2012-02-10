/// <reference path="RefObject.js"/>
/// <reference path="EventArgs.js"/>
/// <reference path="MulticastEvent.js"/>

//#region PropertyChangedEventArgs

function PropertyChangedEventArgs() {
    EventArgs.call(this);
}
PropertyChangedEventArgs.InheritFrom(EventArgs);

PropertyChangedEventArgs.prototype.GetPropertyName = function () {
    return this._PropertyName;
};
PropertyChangedEventArgs.prototype.SetPropertyName = function (/* String */value) {
    this._PropertyName = value;
};

//#endregion

//#region INotifyPropertyChanged

function INotifyPropertyChanged() {
    RefObject.call(this);
    this.PropertyChanged = new MulticastEvent();
}
INotifyPropertyChanged.InheritFrom(RefObject);
INotifyPropertyChanged.prototype.RaisePropertyChanged = function (propertyName) {
    this.PropertyChanged.Raise(this, new PropertyChangedEventArgs(propertyName));
};

//#endregion

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

//#region PropertyChangedListener

//Dependency Property changes only
function PropertyChangedListener(source, propd, closure, func) {
    /// <param name="source" type="DependencyObject"></param>
    /// <param name="propd" type="DependencyProperty"></param>
    /// <param name="closure" type="RefObject"></param>
    /// <param name="func" type="Function"></param>
    RefObject.call(this);

    if (!source)
        return;

    this._Source = source;
    this._Property = propd;
    this._Closure = closure;
    this._Func = func;
    this._Source.PropertyChanged.Subscribe(this.OnPropertyChangedInternal, this);
}
PropertyChangedListener.InheritFrom(RefObject);

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