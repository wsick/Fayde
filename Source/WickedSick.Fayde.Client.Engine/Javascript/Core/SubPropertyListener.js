/// <reference path="../Runtime/Nullstone.js"/>
/// CODE
/// <reference path="DependencyObject.js"/>

(function (namespace) {
    var SubPropertyListener = Nullstone.Create("SubPropertyListener", undefined, 2);

    SubPropertyListener.Instance.Init = function (dobj, propd) {
        this._Dobj = dobj;
        this._Propd = propd;
    };
    SubPropertyListener.Instance.OnSubPropertyChanged = function (sender, args) {
        this._Dobj._OnSubPropertyChanged(this._Propd, sender, args);
    };
    //SubPropertyListener.Instance.Unsubscribe = function () {
    //this._Dobj.PropertyChanged.Unsubscribe(this.OnSubPropertyChanged, this);
    //};

    namespace.SubPropertyListener = Nullstone.FinishCreate(SubPropertyListener);
})(window);